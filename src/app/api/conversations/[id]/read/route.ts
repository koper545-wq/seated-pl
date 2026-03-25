import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/api/auth";
import { serverError } from "@/lib/api/errors";

// PATCH /api/conversations/[id]/read — mark messages as read
export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await requireAuth();
    if (result.error) return result.error;

    await db.message.updateMany({
      where: {
        conversationId: id,
        senderId: { not: result.user.id },
        isRead: false,
      },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/conversations/[id]/read error:", error);
    return serverError();
  }
}
