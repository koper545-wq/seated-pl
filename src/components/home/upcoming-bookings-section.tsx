"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { getMockUserId } from "@/components/dev/account-switcher";
import {
  mockBookings,
  mockEvents,
  type MockBooking,
} from "@/lib/mock-data";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Ticket,
} from "lucide-react";

interface UpcomingBookingsSectionProps {
  t: Record<string, string>;
}

interface UpcomingBooking {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketCount: number;
  hostName: string;
  daysUntil: number;
  imageGradient: string;
  eventId: string;
}

export function UpcomingBookingsSection({ t }: UpcomingBookingsSectionProps) {
  const { mvpMode, isLoaded } = useMVPMode();
  const [bookings, setBookings] = useState<UpcomingBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (mvpMode) {
      // Demo mode: get mock bookings for current user
      const mockUserId = getMockUserId() || "user-current";
      const now = new Date();

      const upcoming = mockBookings
        .filter(
          (b: MockBooking) =>
            b.guestId === mockUserId &&
            (b.status === "approved" || b.status === "pending") &&
            new Date(b.event.date) > now
        )
        .sort((a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime())
        .slice(0, 3)
        .map((b) => {
          const eventDate = new Date(b.event.date);
          const daysUntil = Math.ceil(
            (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          const event = mockEvents.find((e) => e.id === b.eventId);
          return {
            id: b.id,
            eventTitle: b.event.title,
            eventDate: eventDate.toLocaleDateString("pl-PL", {
              weekday: "short",
              day: "numeric",
              month: "short",
            }),
            eventTime: event?.startTime || "19:00",
            location: b.event.location,
            ticketCount: b.ticketCount,
            hostName: b.event.hostName,
            daysUntil,
            imageGradient: b.event.imageGradient,
            eventId: b.eventId,
          };
        });

      // If no real upcoming bookings in mock data, create some example ones
      if (upcoming.length === 0) {
        const exampleBookings: UpcomingBooking[] = [
          {
            id: "demo-1",
            eventTitle: "Włoska Kolacja u Ani - Toskańskie Smaki",
            eventDate: "Sob, 28 Mar",
            eventTime: "19:00",
            location: "Stare Miasto, Wrocław",
            ticketCount: 2,
            hostName: "Anna Kowalska",
            daysUntil: 2,
            imageGradient: "from-primary/15 to-orange-300",
            eventId: "1",
          },
          {
            id: "demo-2",
            eventTitle: "Warsztaty Sushi - Od Podstaw do Mistrza",
            eventDate: "Śr, 2 Kwi",
            eventTime: "18:00",
            location: "Nadodrze, Wrocław",
            ticketCount: 1,
            hostName: "Kenji Tanaka",
            daysUntil: 7,
            imageGradient: "from-rose-200 to-pink-300",
            eventId: "2",
          },
        ];
        setBookings(exampleBookings);
      } else {
        setBookings(upcoming);
      }
      setLoading(false);
      return;
    }

    // Live mode: fetch from API
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings?status=APPROVED&upcoming=true&limit=3");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const now = new Date();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = (data.bookings || []).map((b: any) => {
          const eventDate = new Date(b.event?.date || b.eventDate);
          const daysUntil = Math.ceil(
            (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          return {
            id: b.id,
            eventTitle: b.event?.title || "Wydarzenie",
            eventDate: eventDate.toLocaleDateString("pl-PL", {
              weekday: "short",
              day: "numeric",
              month: "short",
            }),
            eventTime: b.event?.startTime || "19:00",
            location: b.event?.locationPublic || "Wrocław",
            ticketCount: b.ticketCount || 1,
            hostName: b.event?.host?.name || "Host",
            daysUntil,
            imageGradient: "from-primary/15 to-orange-300",
            eventId: b.eventId,
          };
        });
        setBookings(mapped);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [mvpMode, isLoaded]);

  if (loading || bookings.length === 0) return null;

  return (
    <section className="relative py-12 overflow-hidden">
      <AnimatedBlob
        variant={4}
        className="-right-24 top-0 w-[250px] h-[250px] hidden md:block z-0"
        opacity={0.15}
        duration={24}
        rotate={[-3, 3]}
      />
      <div className="container mx-auto px-4 relative z-10">
        <FadeInUp duration={0.4} distance={15}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
              <p className="text-muted-foreground mt-1">{t.subtitle}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/bookings">
                {t.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <StaggerItem key={booking.id}>
              <Link href={`/events/${booking.eventId}`}>
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary overflow-hidden group">
                  <CardContent className="p-5">
                    {/* Countdown badge */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant={booking.daysUntil <= 3 ? "default" : "secondary"}
                        className={
                          booking.daysUntil <= 3
                            ? "bg-primary/90"
                            : ""
                        }
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {booking.daysUntil === 0
                          ? t.today
                          : booking.daysUntil === 1
                          ? t.tomorrow
                          : `${t.inDays} ${booking.daysUntil} ${t.days}`}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Ticket className="mr-1 h-3 w-3" />
                        {booking.ticketCount}x
                      </div>
                    </div>

                    {/* Event title */}
                    <h3 className="font-semibold text-base mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {booking.eventTitle}
                    </h3>

                    {/* Details */}
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        {booking.eventDate} · {booking.eventTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        {booking.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        {booking.hostName}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
