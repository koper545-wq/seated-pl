import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/api/auth";
import { serverError } from "@/lib/api/errors";

// GET /api/conversations — list conversations for current user
export async function GET() {
  try {
    const result = await requireAuth();
    if (result.error) return result.error;
    const userId = result.user.id;

    const [conversations, unreadGroups] = await Promise.all([
      db.conversation.findMany({
        where: {
          OR: [{ hostId: userId }, { guestId: userId }],
        },
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
          booking: {
            select: {
              event: { select: { title: true } },
            },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { text: true, createdAt: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
      // Single query for all unread counts instead of N separate count() calls
      db.message.groupBy({
        by: ["conversationId"],
        where: {
          isRead: false,
          senderId: { not: userId },
          conversation: {
            OR: [{ hostId: userId }, { guestId: userId }],
          },
        },
        _count: { id: true },
      }),
    ]);

    // Build lookup map for O(1) access
    const unreadMap = new Map(
      unreadGroups.map((g) => [g.conversationId, g._count.id])
    );

    const items = conversations.map((c) => ({
      id: c.id,
      hostId: c.hostId,
      hostName:
        c.host.hostProfile?.businessName ||
        [c.host.guestProfile?.firstName, c.host.guestProfile?.lastName]
          .filter(Boolean)
          .join(" ") ||
        "Host",
      hostAvatar:
        c.host.hostProfile?.avatarUrl ||
        c.host.guestProfile?.avatarUrl ||
        null,
      guestId: c.guestId,
      guestName:
        [c.guest.guestProfile?.firstName, c.guest.guestProfile?.lastName]
          .filter(Boolean)
          .join(" ") || "Gość",
      guestAvatar: c.guest.guestProfile?.avatarUrl || null,
      bookingId: c.bookingId,
      eventTitle: c.booking?.event?.title || null,
      lastMessage: c.messages[0]?.text || null,
      lastMessageAt: c.messages[0]?.createdAt?.toISOString() || null,
      unreadCount: unreadMap.get(c.id) || 0,
      createdAt: c.createdAt.toISOString(),
    }));

    return NextResponse.json({ conversations: items });
  } catch (error) {
    console.error("GET /api/conversations error:", error);
    return serverError();
  }
}
