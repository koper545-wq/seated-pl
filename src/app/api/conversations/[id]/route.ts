import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/api/auth";
import { notFound, forbidden, serverError } from "@/lib/api/errors";

// GET /api/conversations/[id] — single conversation with all messages
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await requireAuth();
    if (result.error) return result.error;

    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            hostProfile: { select: { businessName: true, avatarUrl: true } },
            guestProfile: { select: { firstName: true, lastName: true, avatarUrl: true } },
          },
        },
        guest: {
          select: {
            id: true,
            guestProfile: { select: { firstName: true, lastName: true, avatarUrl: true } },
          },
        },
        booking: { select: { event: { select: { title: true } } } },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                guestProfile: { select: { firstName: true, lastName: true, avatarUrl: true } },
                hostProfile: { select: { businessName: true, avatarUrl: true } },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) return notFound("Konwersacja nie znaleziona");

    // Verify user is a participant
    if (
      conversation.hostId !== result.user.id &&
      conversation.guestId !== result.user.id
    ) {
      return forbidden("Nie masz dostepu do tej konwersacji");
    }

    const hostName =
      conversation.host.hostProfile?.businessName ||
      [conversation.host.guestProfile?.firstName, conversation.host.guestProfile?.lastName]
        .filter(Boolean)
        .join(" ") ||
      "Host";

    const guestName =
      [conversation.guest.guestProfile?.firstName, conversation.guest.guestProfile?.lastName]
        .filter(Boolean)
        .join(" ") || "Gość";

    const messages = conversation.messages.map((m) => ({
      id: m.id,
      conversationId: m.conversationId,
      senderId: m.senderId,
      senderName:
        m.sender.hostProfile?.businessName ||
        [m.sender.guestProfile?.firstName, m.sender.guestProfile?.lastName]
          .filter(Boolean)
          .join(" ") ||
        "Użytkownik",
      senderAvatar:
        m.sender.hostProfile?.avatarUrl ||
        m.sender.guestProfile?.avatarUrl ||
        null,
      text: m.text,
      isRead: m.isRead,
      createdAt: m.createdAt.toISOString(),
    }));

    return NextResponse.json({
      id: conversation.id,
      hostId: conversation.hostId,
      hostName,
      hostAvatar:
        conversation.host.hostProfile?.avatarUrl ||
        conversation.host.guestProfile?.avatarUrl ||
        null,
      guestId: conversation.guestId,
      guestName,
      guestAvatar: conversation.guest.guestProfile?.avatarUrl || null,
      bookingId: conversation.bookingId,
      eventTitle: conversation.booking?.event?.title || null,
      messages,
    });
  } catch (error) {
    console.error("GET /api/conversations/[id] error:", error);
    return serverError();
  }
}
