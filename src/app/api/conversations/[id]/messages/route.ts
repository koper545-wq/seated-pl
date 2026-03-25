import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/api/auth";
import { badRequest, notFound, forbidden, serverError } from "@/lib/api/errors";

// POST /api/conversations/[id]/messages — send a message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await requireAuth();
    if (result.error) return result.error;

    const { text } = await request.json();
    if (!text?.trim()) return badRequest("Treść wiadomości jest wymagana");

    // Verify conversation exists and user is participant
    const conversation = await db.conversation.findUnique({
      where: { id },
      select: { hostId: true, guestId: true },
    });

    if (!conversation) return notFound("Konwersacja nie znaleziona");
    if (
      conversation.hostId !== result.user.id &&
      conversation.guestId !== result.user.id
    ) {
      return forbidden();
    }

    // Create the message
    const message = await db.message.create({
      data: {
        conversationId: id,
        senderId: result.user.id,
        text: text.trim(),
      },
    });

    // Touch conversation updatedAt
    await db.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(
      {
        id: message.id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        text: message.text,
        isRead: message.isRead,
        createdAt: message.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/conversations/[id]/messages error:", error);
    return serverError();
  }
}
