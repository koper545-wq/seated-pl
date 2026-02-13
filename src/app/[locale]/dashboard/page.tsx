"use client";

import { useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  currentGuestProfile,
  getGuestBadges,
  getGuestLevel,
  getBookingsByGuestId,
  bookingStatusLabels,
  guestWrittenReviews,
  getGuestProfileByMockUserId,
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
import { useMockUser } from "@/components/dev/account-switcher";
import { Loader2 } from "lucide-react";

export default function GuestDashboardPage() {
  const { user: mockUser, isLoading, effectiveRole } = useMockUser();
  const router = useRouter();

  // Redirect to host dashboard if in host mode
  useEffect(() => {
    if (!isLoading && effectiveRole === "host") {
      router.push("/dashboard/host");
    }
  }, [isLoading, effectiveRole, router]);

  // Show loading while checking user
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto mb-2" />
          <p className="text-stone-500">Ładowanie...</p>
        </div>
      </div>
    );
  }

  // If in host mode, show nothing (redirect will happen)
  if (effectiveRole === "host") {
    return null;
  }

  // Get profile based on mock user or fallback to default
  // For hosts in guest mode, get their guest profile
  const profile = mockUser
    ? (getGuestProfileByMockUserId(mockUser.id) || currentGuestProfile)
    : currentGuestProfile;
  const badges = getGuestBadges(profile.badges);
  const levelInfo = getGuestLevel(profile.xp);
  const bookings = getBookingsByGuestId(profile.id);
  const upcomingBookings = bookings.filter(
    (b) => b.status === "approved" && b.event.date > new Date()
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-stone-900">
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

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Profile Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-20" />
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
                <h1 className="text-xl font-bold text-stone-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-stone-500">
                  📍 {profile.city} · Członek od{" "}
                  {format(profile.memberSince, "MMMM yyyy", { locale: pl })}
                </p>
              </div>
            </div>

            {/* Level & XP */}
            <div className="bg-stone-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <p className="font-semibold text-stone-900">
                      Poziom {levelInfo.level}
                    </p>
                    <p className="text-xs text-stone-500">{levelInfo.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">{profile.xp} XP</p>
                  <p className="text-xs text-stone-500">
                    {levelInfo.progress}% do następnego
                  </p>
                </div>
              </div>
              <Progress value={levelInfo.progress} className="h-2" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">
                  {profile.eventsAttended}
                </p>
                <p className="text-xs text-stone-500">Wydarzenia</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">
                  {profile.reviewsWritten}
                </p>
                <p className="text-xs text-stone-500">Opinie</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">
                  {badges.length}
                </p>
                <p className="text-xs text-stone-500">Odznaki</p>
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-stone-700 mb-2">
                  Twoje odznaki
                </p>
                <TooltipProvider>
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge) => (
                      <Tooltip key={badge.id}>
                        <TooltipTrigger asChild>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${badge.color}`}
                          >
                            <span>{badge.icon}</span>
                            <span>{badge.namePl}</span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{badge.descriptionPl}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            )}

            {/* Profile visibility */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
              <div className="flex items-center gap-2">
                <span>{profile.isPublic ? "🌐" : "🔒"}</span>
                <span className="text-sm text-stone-700">
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
                <p className="font-medium text-stone-900">Odkryj wydarzenia</p>
                <p className="text-xs text-stone-500 mt-1">
                  Znajdź coś smacznego
                </p>
              </div>
            </Card>
          </Link>
          <Link href="/dashboard/bookings">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-center">
                <span className="text-3xl mb-2 block">🎫</span>
                <p className="font-medium text-stone-900">Moje rezerwacje</p>
                <p className="text-xs text-stone-500 mt-1">
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
              <h2 className="font-semibold text-stone-900">
                Nadchodzące wydarzenia
              </h2>
              <Link
                href="/dashboard/bookings"
                className="text-sm text-amber-600"
              >
                Zobacz wszystkie →
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingBookings.slice(0, 2).map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${booking.event.imageGradient} flex items-center justify-center text-2xl shrink-0`}
                    >
                      🍴
                    </div>
                    <div className="flex-1 p-3">
                      <p className="font-medium text-stone-900 text-sm line-clamp-1">
                        {booking.event.title}
                      </p>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {booking.event.dateFormatted}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            bookingStatusLabels[booking.status].color
                          }`}
                        >
                          {bookingStatusLabels[booking.status].label}
                        </span>
                        <span className="text-xs text-stone-500">
                          {booking.ticketCount}{" "}
                          {booking.ticketCount === 1 ? "bilet" : "bilety"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Recent Reviews */}
        {guestWrittenReviews.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-stone-900 mb-3">
              Twoje ostatnie opinie
            </h2>
            <div className="space-y-3">
              {guestWrittenReviews.slice(0, 2).map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-stone-900 text-sm">
                        {review.eventTitle}
                      </p>
                      <p className="text-xs text-stone-500">
                        u {review.hostName}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium text-sm">
                        {review.overallRating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {review.text}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Become a Host CTA */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6 text-center">
            <span className="text-4xl mb-3 block">👨‍🍳</span>
            <h3 className="font-semibold text-stone-900 mb-1">
              Chcesz gotować dla innych?
            </h3>
            <p className="text-sm text-stone-600 mb-4">
              Zostań hostem i zarabiaj dzieląc się swoją pasją do jedzenia
            </p>
            <Link href="/become-host">
              <Button className="bg-amber-500 hover:bg-amber-600">
                Zostań hostem
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link
              href="/"
              className="flex flex-col items-center py-2 px-3 text-stone-400"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs mt-1">Start</span>
            </Link>
            <Link
              href="/events"
              className="flex flex-col items-center py-2 px-3 text-stone-400"
            >
              <span className="text-xl">🔍</span>
              <span className="text-xs mt-1">Szukaj</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex flex-col items-center py-2 px-3 text-stone-400 relative"
            >
              <span className="text-xl">💬</span>
              <span className="text-xs mt-1">Wiadomości</span>
            </Link>
            <Link
              href="/dashboard/bookings"
              className="flex flex-col items-center py-2 px-3 text-stone-400"
            >
              <span className="text-xl">🎫</span>
              <span className="text-xs mt-1">Rezerwacje</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex flex-col items-center py-2 px-3 text-amber-600"
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
