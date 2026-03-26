"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  ChefHat,
} from "lucide-react";

interface HostQuickStatsProps {
  t: Record<string, string>;
}

interface HostEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  spotsLeft: number;
  capacity: number;
  bookingCount: number;
  daysUntil: number;
}

interface HostStats {
  totalEvents: number;
  upcomingEvents: number;
  totalGuests: number;
  revenueThisMonth: number;
  pendingBookings: number;
}

export function HostQuickStats({ t }: HostQuickStatsProps) {
  const { mvpMode, isLoaded } = useMVPMode();
  const [events, setEvents] = useState<HostEvent[]>([]);
  const [stats, setStats] = useState<HostStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (mvpMode) {
      // Demo data
      setStats({
        totalEvents: 12,
        upcomingEvents: 3,
        totalGuests: 87,
        revenueThisMonth: 4250,
        pendingBookings: 4,
      });
      setEvents([
        {
          id: "1",
          title: "Włoska Kolacja - Toskańskie Smaki",
          date: "Sob, 28 Mar",
          time: "19:00",
          location: "Stare Miasto, Wrocław",
          spotsLeft: 4,
          capacity: 12,
          bookingCount: 8,
          daysUntil: 2,
        },
        {
          id: "3",
          title: "Degustacja Win Gruzińskich",
          date: "Pt, 4 Kwi",
          time: "20:00",
          location: "Śródmieście, Wrocław",
          spotsLeft: 2,
          capacity: 10,
          bookingCount: 8,
          daysUntil: 9,
        },
        {
          id: "6",
          title: "Warsztaty Chinkali Gruzińskie",
          date: "Śr, 9 Kwi",
          time: "18:30",
          location: "Ołbin, Wrocław",
          spotsLeft: 8,
          capacity: 16,
          bookingCount: 8,
          daysUntil: 14,
        },
      ]);
      setLoading(false);
      return;
    }

    // Live mode
    async function fetchHostData() {
      try {
        const [statsRes, eventsRes] = await Promise.all([
          fetch("/api/host/stats"),
          fetch("/api/events?host=me&upcoming=true&limit=3"),
        ]);
        if (statsRes.ok) {
          const s = await statsRes.json();
          setStats(s);
        }
        if (eventsRes.ok) {
          const data = await eventsRes.json();
          const now = new Date();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setEvents((data.events || []).map((e: any) => {
            const eventDate = new Date(e.date);
            return {
              id: e.id,
              title: e.title,
              date: eventDate.toLocaleDateString("pl-PL", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }),
              time: e.startTime || "19:00",
              location: e.locationPublic || "Wrocław",
              spotsLeft: e.spotsLeft ?? e.capacity,
              capacity: e.capacity,
              bookingCount: e.capacity - (e.spotsLeft ?? e.capacity),
              daysUntil: Math.ceil(
                (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
              ),
            };
          }));
        }
      } catch {
        // Fail silently
      } finally {
        setLoading(false);
      }
    }
    fetchHostData();
  }, [mvpMode, isLoaded]);

  if (loading) return null;

  return (
    <section className="relative py-12 overflow-hidden">
      <AnimatedBlob
        variant={2}
        className="-left-16 top-1/3 w-[200px] h-[200px] hidden md:block z-0"
        opacity={0.10}
        duration={20}
        rotate={[-4, 4]}
      />
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats row */}
        {stats && (
          <FadeInUp duration={0.4} distance={15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.upcomingEvents}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.upcomingEvents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.pendingBookings}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.pendingBookings}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalGuests}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.totalGuests}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.revenueThisMonth} zł</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.revenueMonth}</div>
                </CardContent>
              </Card>
            </div>
          </FadeInUp>
        )}

        {/* Upcoming events + create new */}
        <FadeInUp duration={0.4} distance={15} delay={0.1}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.yourEvents}</h2>
              <p className="text-muted-foreground mt-1">{t.yourEventsSubtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/host">
                  {t.dashboard}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard/host/events/new">
                  <Plus className="mr-1 h-4 w-4" />
                  {t.newEvent}
                </Link>
              </Button>
            </div>
          </div>
        </FadeInUp>

        {events.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <StaggerItem key={event.id}>
                <Link href={`/dashboard/host/events/${event.id}/guests`}>
                  <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant={event.daysUntil <= 3 ? "default" : "secondary"}
                          className={event.daysUntil <= 3 ? "bg-primary/90" : ""}
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {event.daysUntil === 0
                            ? t.today
                            : event.daysUntil === 1
                            ? t.tomorrow
                            : `${event.daysUntil}d`}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="mr-1 h-3 w-3" />
                          {event.bookingCount}/{event.capacity}
                        </div>
                      </div>

                      <h3 className="font-semibold text-base mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          {event.date} · {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          {event.location}
                        </div>
                      </div>

                      {/* Fill bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{t.filled}</span>
                          <span className="font-medium">
                            {Math.round((event.bookingCount / event.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${(event.bookingCount / event.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.noEvents}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t.noEventsDescription}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/dashboard/host/events/new">
                  <Plus className="mr-2 h-5 w-5" />
                  {t.createFirst}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
