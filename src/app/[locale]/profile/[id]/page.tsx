"use client";

import { use } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  currentGuestProfile,
  getGuestBadges,
  getGuestLevel,
  getXPProgress,
  guestLevels,
  guestWrittenReviews,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedBlob } from "@/components/ui/organic-blob";

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // In real app, fetch profile by ID
  // For demo, use current profile
  const profile = currentGuestProfile;
  const badges = getGuestBadges(profile.badges);
  const levelInfo = getGuestLevel(profile.xp);
  const xpProgress = getXPProgress(profile.xp, guestLevels);

  // Check if profile is public
  if (!profile.isPublic) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
        <Card className="max-w-sm w-full text-center p-8">
          <span className="text-6xl mb-4 block">🔒</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Profil prywatny
          </h1>
          <p className="text-muted-foreground mb-6">
            Ten użytkownik ma ustawiony profil jako prywatny.
          </p>
          <Link href="/events">
            <Button>Przeglądaj wydarzenia</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-muted/50">
      <AnimatedBlob variant={1} className="absolute top-40 -right-20 w-72 h-72 hidden md:block z-0" opacity={0.08} duration={24} rotate={[-3, 3]} />
      <AnimatedBlob variant={5} className="absolute bottom-32 -left-16 w-56 h-56 hidden md:block z-0" opacity={0.10} duration={30} rotate={[-2, 2]} />
      {/* Header */}
      <header className="relative z-10 bg-white border-b border sticky top-0">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/events">
              <Button variant="ghost" size="sm">
                ← Wróć
              </Button>
            </Link>
            <h1 className="font-semibold text-foreground">Profil gościa</h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-lg mx-auto px-4 py-6 pb-8">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/70 to-orange-500 h-24" />
          <CardContent className="pt-0 -mt-12">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl mb-3">
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
              <h1 className="text-2xl font-bold text-foreground">
                {profile.firstName} {profile.lastName.charAt(0)}.
              </h1>
              <p className="text-muted-foreground">
                📍 {profile.city} · Członek od{" "}
                {format(profile.memberSince, "MMMM yyyy", { locale: pl })}
              </p>

              {/* Social Links */}
              {profile.socialLinks && (
                <div className="flex gap-3 mt-3">
                  {profile.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${profile.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-pink-500 transition-colors"
                    >
                      <span className="text-xl">📸</span>
                      <span className="text-sm ml-1">
                        @{profile.socialLinks.instagram}
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Level Card */}
            <div className="bg-gradient-to-r from-primary/5 to-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🏅</span>
                  <div>
                    <p className="font-bold text-foreground">
                      Poziom {levelInfo.level}
                    </p>
                    <p className="text-sm text-muted-foreground">{levelInfo.namePl}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {profile.xp}
                  </p>
                  <p className="text-xs text-muted-foreground">punktów XP</p>
                </div>
              </div>
              <Progress value={xpProgress.percent} className="h-2" />
              <p className="text-xs text-muted-foreground text-center mt-2">
                {xpProgress.percent}% do następnego poziomu
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <p className="text-3xl font-bold text-foreground">
                  {profile.eventsAttended}
                </p>
                <p className="text-sm text-muted-foreground">Wydarzeń</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <p className="text-3xl font-bold text-foreground">
                  {profile.reviewsWritten}
                </p>
                <p className="text-sm text-muted-foreground">Opinii</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <p className="text-3xl font-bold text-foreground">
                  {badges.length}
                </p>
                <p className="text-sm text-muted-foreground">Odznak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        {badges.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🏆</span> Zdobyte odznaki
              </h2>
              <TooltipProvider>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex items-center gap-2 p-3 rounded-xl ${badge.color} cursor-help`}
                        >
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{badge.namePl}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{badge.descriptionPl}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        )}

        {/* Tabs: Events & Reviews */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="events" className="flex-1">
              Wydarzenia ({profile.attendedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Opinie ({guestWrittenReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="space-y-3">
              {profile.attendedEvents.length === 0 ? (
                <Card className="p-8 text-center">
                  <span className="text-4xl mb-2 block">🍽️</span>
                  <p className="text-muted-foreground">Brak odbytych wydarzeń</p>
                </Card>
              ) : (
                profile.attendedEvents.map((event) => (
                  <Link href={`/events/${event.eventId}`} key={event.eventId}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex">
                        <div
                          className={`w-24 h-24 bg-gradient-to-br ${event.imageGradient} flex items-center justify-center text-3xl shrink-0`}
                        >
                          🍴
                        </div>
                        <div className="flex-1 p-4">
                          <p className="font-medium text-foreground line-clamp-1">
                            {event.eventTitle}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            u {event.hostName}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              {event.eventType}
                            </span>
                            <span className="text-xs text-muted-foreground/70">
                              {format(event.eventDate, "d MMM yyyy", {
                                locale: pl,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-3">
              {guestWrittenReviews.length === 0 ? (
                <Card className="p-8 text-center">
                  <span className="text-4xl mb-2 block">⭐</span>
                  <p className="text-muted-foreground">Brak napisanych opinii</p>
                </Card>
              ) : (
                guestWrittenReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">
                          {review.eventTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          u {review.hostName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                        <span className="text-primary/80">★</span>
                        <span className="font-medium text-primary">
                          {review.overallRating}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      {format(review.createdAt, "d MMMM yyyy", { locale: pl })}
                    </p>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Photos Gallery */}
        {profile.photos.length > 0 && (
          <section className="mt-6">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>📸</span> Zdjęcia z wydarzeń
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg overflow-hidden"
                >
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Favorite cuisines */}
        {profile.favoriteCategories.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>❤️</span> Ulubione kategorie
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteCategories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1.5 bg-primary/5 text-primary rounded-full text-sm"
                  >
                    {category === "supper-club" && "🍽️ Supper Club"}
                    {category === "warsztaty" && "👨‍🍳 Warsztaty"}
                    {category === "degustacje" && "🍷 Degustacje"}
                    {category === "popup" && "🎪 Pop-up"}
                    {category === "active-food" && "🏃 Active + Food"}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
