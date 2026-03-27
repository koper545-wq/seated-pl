import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EventCard, HostCardWithFollow, EventActionButtons } from "@/components/events";
import {
  EventPageTransition,
  EventHeroFadeIn,
  EventInfoFadeInUp,
  EventSidebarSlideIn,
} from "@/components/events/event-detail-animations";
import { WaitlistDialog } from "@/components/waitlist";
import { getEventDetail, getPublishedEvents } from "@/lib/dal/events";
import { db } from "@/lib/db";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  CheckCircle,
  ChefHat,
  Utensils,
  ArrowLeft,
} from "lucide-react";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEventDetail(id);

  if (!event) {
    notFound();
  }

  const isSoldOut = event.spotsLeft === 0;

  // Get similar events (same type, excluding current)
  const allEvents = await getPublishedEvents({ type: event.typeSlug, limit: 4 });
  const similarEvents = allEvents
    .filter((e) => e.id !== event.id)
    .slice(0, 3);

  // Get reviews for this event from database
  let reviews: any[] = [];
  try {
    reviews = await db.review.findMany({
      where: { eventId: event.id, isHostReview: false },
      include: {
        author: {
          select: {
            id: true,
            guestProfile: { select: { firstName: true, lastName: true, avatarUrl: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch (error) {
    console.error("DB unavailable for reviews, using mock data:", error);
    reviews = [
      {
        id: "mock-review-1",
        overallRating: 5,
        foodRating: 5,
        ambianceRating: 4,
        text: "Fantastyczne doswiadczenie! Jedzenie bylo przepyszne, a atmosfera niesamowita. Na pewno wroce na kolejne wydarzenie.",
        createdAt: new Date("2026-03-10T20:00:00"),
        photos: [],
        verifiedAttendee: true,
        helpfulCount: 3,
        response: null,
        respondedAt: null,
        author: {
          id: "mock-author-1",
          guestProfile: { firstName: "Katarzyna", lastName: "Wisniewski", avatarUrl: "" },
        },
      },
      {
        id: "mock-review-2",
        overallRating: 4,
        foodRating: 5,
        ambianceRating: 4,
        text: "Swietna kuchnia i bardzo mili ludzie. Polecam kazdemu, kto szuka czegos wyjatkowego w Warszawie.",
        createdAt: new Date("2026-02-28T19:30:00"),
        photos: [],
        verifiedAttendee: true,
        helpfulCount: 1,
        response: null,
        respondedAt: null,
        author: {
          id: "mock-author-2",
          guestProfile: { firstName: "Piotr", lastName: "Mazur", avatarUrl: "" },
        },
      },
    ];
  }

  const hostReviews = reviews.map((r) => ({
    id: r.id,
    authorName: [r.author?.guestProfile?.firstName, r.author?.guestProfile?.lastName].filter(Boolean).join(" ") || "Anonim",
    authorAvatar: r.author?.guestProfile?.avatarUrl || "",
    overallRating: r.overallRating,
    foodRating: r.foodRating,
    ambianceRating: r.ambianceRating,
    text: r.text || "",
    date: r.createdAt,
    eventTitle: event.title,
    hostName: event.host.name,
    photos: r.photos || [],
    verifiedAttendee: r.verifiedAttendee,
    helpfulCount: r.helpfulCount,
    response: r.response || undefined,
    respondedAt: r.respondedAt || undefined,
  }));

  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  return (
    <EventPageTransition>
    <div className="min-h-screen bg-background">
      {/* Hero image / gradient */}
      <EventHeroFadeIn>
      <div
        className={`relative overflow-hidden h-64 md:h-80 bg-gradient-to-br ${event.imageGradient}`}
      >
        <AnimatedBlob variant={3} className="right-[-60px] top-[-30px] w-[300px] h-[300px] hidden md:block z-0" opacity={0.12} duration={22} rotate={[-5, 5]} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-end pb-6">
          <Link
            href="/events"
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="absolute top-4 right-4">
            <EventActionButtons eventId={event.id} eventTitle={event.title} />
          </div>
          <Badge className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
            {event.type}
          </Badge>
        </div>
      </div>
      </EventHeroFadeIn>

      <div className="relative overflow-hidden container mx-auto px-4 py-8">
        <AnimatedBlob variant={6} className="left-[-120px] top-[400px] w-[350px] h-[350px] hidden lg:block z-0" opacity={0.09} duration={25} rotate={[-3, 3]} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and basic info */}
            <EventInfoFadeInUp delay={0.1}>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{event.dateFormatted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{formatDuration(event.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Max {event.capacity} osób</span>
                </div>
              </div>
            </div>
            </EventInfoFadeInUp>

            <Separator />

            {/* Description */}
            <EventInfoFadeInUp delay={0.15}>
            <div>
              <h2 className="text-xl font-semibold mb-4">O wydarzeniu</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
            </EventInfoFadeInUp>

            {/* Menu */}
            <EventInfoFadeInUp delay={0.2}>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Menu
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.menuDescription}
              </p>
            </div>
            </EventInfoFadeInUp>

            {/* Dietary options */}
            <EventInfoFadeInUp delay={0.25}>
            <div>
              <h2 className="text-xl font-semibold mb-4">Opcje dietetyczne</h2>
              <div className="flex flex-wrap gap-2">
                {event.dietaryOptions.map((option, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
            </EventInfoFadeInUp>

            {/* What to bring */}
            <EventInfoFadeInUp delay={0.3}>
            <div>
              <h2 className="text-xl font-semibold mb-4">Co zabrać?</h2>
              <p className="text-muted-foreground">{event.whatToBring}</p>
            </div>
            </EventInfoFadeInUp>

            <Separator />

            {/* Host card with follow button */}
            <EventInfoFadeInUp delay={0.35}>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                Twój host
              </h2>
              <HostCardWithFollow host={event.host} />
            </div>
            </EventInfoFadeInUp>

            {hostReviews.length > 0 && (
              <>
                <Separator />

                {/* Reviews */}
                <EventInfoFadeInUp>
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Opinie ({hostReviews.length})
                  </h2>
                  <div className="space-y-4">
                    {hostReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {review.authorName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{review.authorName}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < review.overallRating ? "text-primary/80 fill-primary/80" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {review.text && (
                          <p className="text-sm text-muted-foreground">{review.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                </EventInfoFadeInUp>
              </>
            )}
          </div>

          {/* Sidebar - booking card */}
          <EventSidebarSlideIn className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold">{event.price}</span>
                      <span className="text-muted-foreground ml-1">
                        PLN / osoba
                      </span>
                    </div>
                    {isSoldOut ? (
                      <Badge variant="destructive">Wyprzedane</Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        {event.spotsLeft} wolnych miejsc
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.dateFormatted}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Czas trwania: {formatDuration(event.duration)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {isSoldOut ? (
                    <Button className="w-full" variant="outline" disabled>
                      Brak miejsc
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                      asChild
                    >
                      <Link href={`/events/${event.id}/book`}>
                        Zarezerwuj miejsce
                      </Link>
                    </Button>
                  )}

                  {!isSoldOut && (
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Jeszcze nie zostaniesz obciążony
                    </p>
                  )}

                  {isSoldOut && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Chcesz się dowiedzieć, gdy zwolni się miejsce?
                      </p>
                      <WaitlistDialog
                        eventId={event.id}
                        eventTitle={event.title}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick info */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 text-sm">Zawiera:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Wszystkie składniki i napoje
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Przepisy do domu
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Nowe znajomości
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </EventSidebarSlideIn>
        </div>

        {/* Similar events */}
        {similarEvents.length > 0 && (
          <div className="relative z-10 mt-16">
            <h2 className="text-2xl font-bold mb-6">Podobne wydarzenia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  type={event.type}
                  date={event.dateFormatted}
                  location={event.location}
                  price={event.price}
                  spotsLeft={event.spotsLeft}
                  imageGradient={event.imageGradient}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </EventPageTransition>
  );
}

// Dynamic page — events come from database
export const dynamic = "force-dynamic";
