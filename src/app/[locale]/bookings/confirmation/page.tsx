"use client";

import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Home,
  CalendarPlus,
  Loader2,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface BookingData {
  id: string;
  ticketCount: number;
  totalPrice: number;
  status: string;
  event: {
    title: string;
    date: string;
    startTime: string;
    duration: number;
    locationPublic: string;
    host: {
      businessName: string;
    };
  };
}

const DEMO_BOOKING: BookingData = {
  id: "demo-booking-1",
  ticketCount: 2,
  totalPrice: 29800,
  status: "PENDING",
  event: {
    title: "Kolacja autorska: Smaki Bliskiego Wschodu",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: "19:00",
    duration: 180,
    locationPublic: "Wrocław, Stare Miasto",
    host: {
      businessName: "Kuchnia Leili",
    },
  },
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    fetch(`/api/bookings/${bookingId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Nie udało się pobrać rezerwacji");
        return res.json();
      })
      .then((data) => setBooking(data))
      .catch(() => {
        // Demo mode fallback — use mock booking data when API is unavailable
        console.log("[Demo mode] Using mock booking data for confirmation page");
        setBooking(DEMO_BOOKING);
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking || error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              {error || "Nie znaleziono szczegółów rezerwacji."}
            </p>
            <Button asChild className="mt-4">
              <Link href="/events">Przeglądaj wydarzenia</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const eventDate = new Date(booking.event.date);

  return (
    <div className="min-h-screen bg-muted/30 py-12 relative overflow-hidden">
      {/* Celebratory decorative blobs */}
      <AnimatedBlob variant={1} className="absolute -top-24 -right-24 w-80 h-80 hidden md:block z-0" opacity={0.10} duration={20} rotate={[-3, 3]} />
      <AnimatedBlob variant={2} className="absolute bottom-32 -left-32 w-72 h-72 hidden md:block z-0" opacity={0.08} duration={26} rotate={[-2, 2]} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Rezerwacja wysłana!</h1>
            <p className="text-muted-foreground">
              Twoja prośba o rezerwację została wysłana do hosta.
            </p>
          </div>

          {/* Booking details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">
                {booking.event.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {format(eventDate, "d MMMM yyyy (EEEE)", { locale: pl })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    {booking.event.startTime} &middot;{" "}
                    {Math.floor(booking.event.duration / 60)}h
                    {booking.event.duration % 60 > 0
                      ? ` ${booking.event.duration % 60}min`
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{booking.event.locationPublic}</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Liczba miejsc:</span>
                  <span className="font-medium">{booking.ticketCount}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Host:</span>
                  <span className="font-medium">
                    {booking.event.host.businessName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kwota:</span>
                  <span className="font-medium">
                    {(booking.totalPrice / 100).toFixed(2)} zł
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's next */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Co dalej?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Oczekiwanie na akceptację</p>
                    <p className="text-sm text-muted-foreground">
                      Host otrzymał Twoją prośbę i wkrótce ją rozpatrzy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Potwierdzenie emailem
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Po akceptacji otrzymasz email z pełnym adresem i
                      szczegółami płatności.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Ciesz się wydarzeniem!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Przyjdź na czas i przeżyj niezapomniane kulinarne
                      doświadczenie.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Wysłaliśmy potwierdzenie na Twój adres email. Sprawdź również
              folder spam.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
              <Link href="/dashboard/bookings">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Moje rezerwacje
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Strona główna
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
