"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  bookingStatusLabels,
  mockBookings,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { Loader2 } from "lucide-react";

export default function GuestDashboardPage() {
  const { user, isLoading, effectiveRole, isMockUser, guestProfile } = useCurrentUser();
  const { mvpMode } = useMVPMode();
  const router = useRouter();
  const [apiBookings, setApiBookings] = useState<Array<{
    id: string;
    status: string;
    ticketCount: number;
    totalPrice: number;
    event: {
      id: string;
      title: string;
      date: string;
      dateFormatted?: string;
      imageGradient?: string;
      locationPublic?: string;
    };
  }> | null>(null);

  // Redirect to host dashboard if in host mode
  useEffect(() => {
    if (!isLoading && effectiveRole === "host") {
      router.push("/dashboard/host");
    }
  }, [isLoading, effectiveRole, router]);

  // Fetch bookings from API (or use mock data in demo mode)
  useEffect(() => {
    if (isLoading || effectiveRole === "host") return;

    if (mvpMode) {
      // In demo mode, convert mock bookings to the API shape expected by this component
      const guestBookings = mockBookings.filter((b) => b.guestId === "user-current");
      setApiBookings(guestBookings.map((b) => ({
        id: b.id,
        status: b.status.toUpperCase(),
        ticketCount: b.ticketCount,
        totalPrice: b.totalPrice * 100, // PLN → grosze
        event: {
          id: b.eventId,
          title: b.event.title,
          date: b.event.date.toISOString(),
          dateFormatted: b.event.dateFormatted,
          imageGradient: b.event.imageGradient,
          locationPublic: b.event.location,
        },
      })));
      return;
    }

    fetch("/api/bookings")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.bookings) setApiBookings(data.bookings);
      })
      .catch(console.error);
  }, [mvpMode, isLoading, effectiveRole]);

  // Show loading while checking user
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  // If in host mode, show nothing (redirect will happen)
  if (effectiveRole === "host") {
    return null;
  }

  // Build profile from real data
  const profile = {
    id: guestProfile?.id || (user as { id?: string })?.id || "user",
    firstName: guestProfile?.firstName || (user as { name?: string })?.name?.split(" ")[0] || "",
    lastName: guestProfile?.lastName || (user as { name?: string })?.name?.split(" ").slice(1).join(" ") || "",
    avatar: guestProfile?.avatarUrl || (user as { image?: string | null })?.image || "",
    bio: guestProfile?.bio || "",
    xp: guestProfile?.xp || 0,
    dietaryRestrictions: guestProfile?.dietaryRestrictions || [],
    eventsAttended: 0,
    reviewsWritten: 0,
    city: "Wrocław",
    memberSince: new Date(),
    isPublic: false,
  };

  const upcomingBookings = (apiBookings || []).filter(
    (b) => b.status === "APPROVED" && new Date(b.event.date) > new Date()
  );

  return (
    <div className="min-h-screen bg-muted/50 relative overflow-hidden">
      {/* Decorative blobs */}
      <AnimatedBlob variant={1} className="absolute -top-32 -right-32 w-96 h-96 hidden md:block z-0" opacity={0.07} duration={25} rotate={[-2, 2]} />
      <AnimatedBlob variant={4} className="absolute bottom-40 -left-40 w-80 h-80 hidden md:block z-0" opacity={0.06} duration={30} rotate={[-3, 3]} />

      {/* Header */}
      <header className="bg-white border-b border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-foreground">
              Seated
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                ⚙️ Ustawienia
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24 relative z-10">
        {/* Profile Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/70 to-orange-500 h-20" />
          <CardContent className="pt-0 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "👤"
                )}
              </div>
              <div className="flex-1 pb-2">
                <h1 className="text-xl font-bold text-foreground">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  📍 {profile.city} · Członek od{" "}
                  {format(profile.memberSince, "MMMM yyyy", { locale: pl })}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <p className="text-2xl font-bold text-foreground">
                  {upcomingBookings.length}
                </p>
                <p className="text-xs text-muted-foreground">Nadchodzące</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <p className="text-2xl font-bold text-foreground">
                  {(apiBookings || []).length}
                </p>
                <p className="text-xs text-muted-foreground">Rezerwacje</p>
              </div>
            </div>

            {/* Profile visibility */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2">
                <span>{profile.isPublic ? "🌐" : "🔒"}</span>
                <span className="text-sm text-muted-foreground">
                  Profil {profile.isPublic ? "publiczny" : "prywatny"}
                </span>
              </div>
              {profile.isPublic && (
                <Link href={`/profile/${profile.id}`}>
                  <Button variant="outline" size="sm">
                    Zobacz profil
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/events">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-center">
                <span className="text-3xl mb-2 block">🍽️</span>
                <p className="font-medium text-foreground">Odkryj wydarzenia</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Znajdź coś smacznego
                </p>
              </div>
            </Card>
          </Link>
          <Link href="/dashboard/bookings">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-center">
                <span className="text-3xl mb-2 block">🎫</span>
                <p className="font-medium text-foreground">Moje rezerwacje</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {upcomingBookings.length} nadchodzących
                </p>
              </div>
            </Card>
          </Link>
        </div>

        {/* Upcoming Events */}
        {upcomingBookings.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">
                Nadchodzące wydarzenia
              </h2>
              <Link
                href="/dashboard/bookings"
                className="text-sm text-primary"
              >
                Zobacz wszystkie →
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingBookings.slice(0, 2).map((booking) => {
                const eventTitle = booking.event.title;
                const eventDate = format(new Date(booking.event.date), "d MMMM yyyy", { locale: pl });
                const gradient = "from-primary/70 to-orange-500";
                const statusKey = booking.status.toLowerCase() as keyof typeof bookingStatusLabels;
                const statusInfo = bookingStatusLabels[statusKey] || { label: booking.status, color: "bg-gray-100 text-gray-700" };

                return (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shrink-0`}
                      >
                        🍴
                      </div>
                      <div className="flex-1 p-3">
                        <p className="font-medium text-foreground text-sm line-clamp-1">
                          {eventTitle}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {eventDate}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {booking.ticketCount}{" "}
                            {booking.ticketCount === 1 ? "bilet" : "bilety"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}


        {/* Become a Host CTA - hidden in MVP mode */}
        {!mvpMode && (
          <Card className="bg-gradient-to-r from-primary/5 to-orange-50 border-primary/20">
            <CardContent className="p-6 text-center">
              <span className="text-4xl mb-3 block">👨‍🍳</span>
              <h3 className="font-semibold text-foreground mb-1">
                Chcesz gotować dla innych?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Zostań hostem i zarabiaj dzieląc się swoją pasją do jedzenia
              </p>
              <Link href="/become-host">
                <Button className="bg-primary/50 hover:bg-primary">
                  Zostań hostem
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link
              href="/"
              className="flex flex-col items-center py-2 px-3 text-muted-foreground/70"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs mt-1">Start</span>
            </Link>
            <Link
              href="/events"
              className="flex flex-col items-center py-2 px-3 text-muted-foreground/70"
            >
              <span className="text-xl">🔍</span>
              <span className="text-xs mt-1">Szukaj</span>
            </Link>
            {!mvpMode && (
              <Link
                href="/dashboard/messages"
                className="flex flex-col items-center py-2 px-3 text-muted-foreground/70 relative"
              >
                <span className="text-xl">💬</span>
                <span className="text-xs mt-1">Wiadomości</span>
              </Link>
            )}
            <Link
              href="/dashboard/bookings"
              className="flex flex-col items-center py-2 px-3 text-muted-foreground/70"
            >
              <span className="text-xl">🎫</span>
              <span className="text-xs mt-1">Rezerwacje</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex flex-col items-center py-2 px-3 text-primary"
            >
              <span className="text-xl">👤</span>
              <span className="text-xs mt-1 font-medium">Profil</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
