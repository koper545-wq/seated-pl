"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventCard, type EventCardProps } from "@/components/events";
import { StaggerContainer, StaggerItem, FadeInUp } from "@/components/ui/motion";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

// Gradient palette for events without images
const EVENT_GRADIENTS = [
  "from-primary/15 to-orange-300",
  "from-rose-200 to-pink-300",
  "from-purple-200 to-violet-300",
  "from-orange-200 to-red-300",
  "from-green-200 to-teal-300",
  "from-yellow-200 to-primary/20",
  "from-blue-200 to-indigo-300",
  "from-emerald-200 to-cyan-300",
];

// Event type display labels
const EVENT_TYPE_LABELS: Record<string, string> = {
  SUPPER_CLUB: "Supper Club",
  CHEFS_TABLE: "Chef's Table",
  POPUP: "Pop-up",
  WORKSHOP: "Warsztaty",
  TASTING: "Degustacje",
  FOOD_TOUR: "Food Tour",
  ACTIVE_FOOD: "Active + Food",
  FARM_EXPERIENCE: "Farm Experience",
  OTHER: "Inne",
};

const mockEvents: EventCardProps[] = [
  {
    id: "1",
    title: "Italian Dinner at Anna's - Tuscan Flavors",
    type: "Supper Club",
    date: "Sat, Feb 15 · 7:00 PM",
    location: "Old Town, Wroclaw",
    price: 150,
    spotsLeft: 4,
    imageGradient: "from-primary/15 to-orange-300",
  },
  {
    id: "2",
    title: "Sushi Masterclass - From Basics to Master",
    type: "Workshops",
    date: "Tue, Feb 18 · 6:00 PM",
    location: "Nadodrze, Wroclaw",
    price: 200,
    spotsLeft: 6,
    imageGradient: "from-rose-200 to-pink-300",
  },
  {
    id: "3",
    title: "Georgian Natural Wines - Tasting",
    type: "Tastings",
    date: "Fri, Feb 22 · 8:00 PM",
    location: "Downtown, Wroclaw",
    price: 120,
    spotsLeft: 2,
    imageGradient: "from-purple-200 to-violet-300",
  },
  {
    id: "4",
    title: "Thai Street Food Pop-up",
    type: "Pop-up",
    date: "Sat, Mar 1 · 6:00 PM",
    location: "Przedmiescie Olawskie",
    price: 89,
    spotsLeft: 0,
    imageGradient: "from-orange-200 to-red-300",
  },
  {
    id: "5",
    title: "Run + Brunch - Morning Energy",
    type: "Active + Food",
    date: "Sun, Mar 2 · 9:00 AM",
    location: "Szczytnicki Park",
    price: 75,
    spotsLeft: 12,
    imageGradient: "from-green-200 to-teal-300",
  },
  {
    id: "6",
    title: "Georgian Khinkali - Dumpling Workshop",
    type: "Workshops",
    date: "Wed, Mar 5 · 6:30 PM",
    location: "Olbin, Wroclaw",
    price: 160,
    spotsLeft: 8,
    imageGradient: "from-yellow-200 to-primary/20",
  },
];

interface FeaturedEventsSectionProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  noEventsTitle: string;
  noEventsDescription: string;
  ctaSecondaryLabel: string;
}

export function FeaturedEventsSection({
  title,
  subtitle,
  viewAllLabel,
  noEventsTitle,
  noEventsDescription,
  ctaSecondaryLabel,
}: FeaturedEventsSectionProps) {
  const { mvpMode, isLoaded } = useMVPMode();
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (mvpMode) {
      // Demo mode: use mock data
      setEvents(mockEvents);
      setLoading(false);
      return;
    }

    // Real mode: fetch from API
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=6");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const mapped: EventCardProps[] = (data.events || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event: any, index: number) => ({
            id: event.id,
            title: event.title,
            type: EVENT_TYPE_LABELS[event.eventType] || event.eventType,
            date: new Date(event.date).toLocaleDateString("pl-PL", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
            location: event.locationPublic || "Wroclaw",
            price: event.price / 100, // grosze to PLN
            spotsLeft: event.spotsLeft,
            imageGradient: EVENT_GRADIENTS[index % EVENT_GRADIENTS.length],
            imageUrl: event.images?.[0] || undefined,
          })
        );

        setEvents(mapped);
      } catch (error) {
        console.error("Failed to fetch featured events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [mvpMode, isLoaded]);

  return (
    <section className="relative py-16 bg-muted/30 overflow-hidden">
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[450px] h-[400px] pointer-events-none select-none hidden md:block opacity-20 z-0" aria-hidden="true">
        <img src="/blob-terra.svg" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <FadeInUp duration={0.4} distance={15}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">{viewAllLabel}</Link>
            </Button>
          </div>
        </FadeInUp>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : events.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard {...event} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{noEventsTitle}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {noEventsDescription}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/become-host">{ctaSecondaryLabel}</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
