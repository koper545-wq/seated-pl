import { notFound, redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { validateWaitlistToken, getWaitlistEntry } from "@/lib/mock-data";
import { getEventDetail } from "@/lib/dal/events";
import { BookingForm } from "@/components/bookings";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { ArrowLeft, Clock } from "lucide-react";
import { getWaitlistTimeRemaining } from "@/lib/waitlist";

interface BookingPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ waitlist?: string; token?: string }>;
}

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { id } = await params;
  const { waitlist: waitlistId, token } = await searchParams;
  const event = await getEventDetail(id);

  if (!event) {
    notFound();
  }

  // Check for waitlist token if event is sold out
  let isWaitlistBooking = false;
  let waitlistEntry = null;
  let timeRemaining = null;

  if (event.spotsLeft === 0) {
    // Check if user has valid waitlist token
    if (waitlistId && token) {
      const validEntry = validateWaitlistToken(waitlistId, token);
      if (validEntry) {
        isWaitlistBooking = true;
        waitlistEntry = validEntry;
        timeRemaining = getWaitlistTimeRemaining(waitlistId);

        // If expired, redirect
        if (timeRemaining?.expired) {
          redirect(`/events/${id}?error=waitlist_expired`);
        }
      } else {
        // Invalid or expired token
        redirect(`/events/${id}?error=invalid_waitlist`);
      }
    } else {
      // No waitlist token, redirect to event page
      redirect(`/events/${id}?error=sold_out`);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/events/${id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Wróć do wydarzenia
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="relative overflow-hidden container mx-auto px-4 py-8">
        <AnimatedBlob variant={4} className="right-[-80px] top-[-40px] w-[260px] h-[260px] hidden md:block z-0" opacity={0.10} duration={24} rotate={[-4, 4]} />
        <AnimatedBlob variant={2} className="left-[-100px] bottom-[100px] w-[220px] h-[220px] hidden lg:block z-0" opacity={0.08} duration={28} rotate={[-3, 3]} />
        <div className="relative z-10 max-w-xl mx-auto">
          {/* Waitlist booking banner */}
          {isWaitlistBooking && timeRemaining && (
            <div className="bg-gradient-to-r from-primary/5 to-green-50 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">
                    Miejsce zarezerwowane dla Ciebie!
                  </p>
                  <p className="text-sm text-primary">
                    Masz jeszcze <strong>{timeRemaining.formatted}</strong> na dokończenie rezerwacji
                  </p>
                </div>
              </div>
              {waitlistEntry && (
                <p className="text-xs text-primary mt-2 ml-13">
                  Rezerwacja dla: {waitlistEntry.ticketsWanted}{" "}
                  {waitlistEntry.ticketsWanted === 1 ? "osoby" : "osób"}
                </p>
              )}
            </div>
          )}

          <h1 className="text-2xl font-bold mb-2">Rezerwacja</h1>
          <p className="text-muted-foreground mb-8">
            Wypełnij formularz, aby zarezerwować miejsce
          </p>

          <BookingForm
            eventId={event.id}
            eventTitle={event.title}
            eventDate={event.dateFormatted.split("·")[0].trim()}
            eventTime={event.startTime}
            eventLocation={event.location}
            eventPrice={event.price}
            spotsLeft={isWaitlistBooking && waitlistEntry ? waitlistEntry.ticketsWanted : event.spotsLeft}
            hostName={event.host.name}
            isWaitlistBooking={isWaitlistBooking}
            waitlistEntryId={waitlistId}
            maxTickets={isWaitlistBooking && waitlistEntry ? waitlistEntry.ticketsWanted : undefined}
          />
        </div>
      </div>
    </div>
  );
}
