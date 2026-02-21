import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/api/auth";
import { notFound, forbidden, badRequest, serverError } from "@/lib/api/errors";
import { BookingStatus } from "@prisma/client";

// GET /api/bookings/[id] — booking details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await requireAuth();
    if (result.error) return result.error;

    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            host: {
              include: {
                user: { select: { id: true, email: true } },
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            email: true,
            guestProfile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
                dietaryRestrictions: true,
                allergies: true,
              },
            },
          },
        },
        transactions: true,
      },
    });

    if (!booking) return notFound("Rezerwacja nie znaleziona");

    // Check access: guest or host of the event
    const isGuest = booking.guestId === result.user.id;
    const isHost = booking.event.host.userId === result.user.id;
    if (!isGuest && !isHost) return forbidden();

    return NextResponse.json(booking);
  } catch (error) {
    console.error("GET /api/bookings/[id] error:", error);
    return serverError();
  }
}

// PATCH /api/bookings/[id] — update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await requireAuth();
    if (result.error) return result.error;

    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            host: {
              include: {
                user: { select: { id: true, email: true } },
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            email: true,
            guestProfile: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
    });

    if (!booking) return notFound("Rezerwacja nie znaleziona");

    const isGuest = booking.guestId === result.user.id;
    const isHost = booking.event.host.userId === result.user.id;
    if (!isGuest && !isHost) return forbidden();

    const body = await request.json();
    const { action, reason } = body;

    switch (action) {
      case "approve": {
        if (!isHost) return forbidden("Tylko host może zatwierdzić rezerwację");
        if (booking.status !== "PENDING") return badRequest("Rezerwacja nie jest w statusie oczekującym");

        const updated = await db.booking.update({
          where: { id },
          data: {
            status: BookingStatus.APPROVED,
            approvedAt: new Date(),
          },
          include: { event: { include: { host: true } }, guest: true },
        });

        return NextResponse.json(updated);
      }

      case "decline": {
        if (!isHost) return forbidden("Tylko host może odrzucić rezerwację");
        if (booking.status !== "PENDING") return badRequest("Rezerwacja nie jest w statusie oczekującym");

        const updated = await db.booking.update({
          where: { id },
          data: {
            status: BookingStatus.DECLINED,
            cancelledAt: new Date(),
            cancelReason: reason || "Odrzucone przez hosta",
          },
        });

        // Restore spots
        await db.event.update({
          where: { id: booking.eventId },
          data: { spotsLeft: { increment: booking.ticketCount } },
        });

        return NextResponse.json(updated);
      }

      case "cancel": {
        // Both guest and host can cancel
        if (!["PENDING", "APPROVED"].includes(booking.status)) {
          return badRequest("Nie można anulować rezerwacji w tym statusie");
        }

        const updated = await db.booking.update({
          where: { id },
          data: {
            status: BookingStatus.CANCELLED,
            cancelledAt: new Date(),
            cancelReason: reason || (isHost ? "Anulowane przez hosta" : "Anulowane przez gościa"),
          },
        });

        // Restore spots
        await db.event.update({
          where: { id: booking.eventId },
          data: { spotsLeft: { increment: booking.ticketCount } },
        });

        return NextResponse.json(updated);
      }

      case "complete": {
        if (!isHost) return forbidden("Tylko host może oznaczyć jako zakończone");
        if (booking.status !== "APPROVED") return badRequest("Rezerwacja musi być zatwierdzona");

        const updated = await db.booking.update({
          where: { id },
          data: { status: BookingStatus.COMPLETED },
        });

        return NextResponse.json(updated);
      }

      default:
        return badRequest("Nieznana akcja. Użyj: approve, decline, cancel, complete");
    }
  } catch (error) {
    console.error("PATCH /api/bookings/[id] error:", error);
    return serverError();
  }
}
