import { notFound, redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getEventById } from "@/lib/mock-data";
import { BookingForm } from "@/components/bookings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  // Check if event is sold out
  if (event.spotsLeft === 0) {
    redirect(`/events/${id}?error=sold_out`);
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
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
            spotsLeft={event.spotsLeft}
            hostName={event.host.name}
          />
        </div>
      </div>
    </div>
  );
}
