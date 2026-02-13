"use client";

import { useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getBookingsByEventId,
  HostEvent,
  hostEventStatusLabels,
  getHostProfileByMockUserId,
} from "@/lib/mock-data";
import {
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  Eye,
  Edit,
  AlertCircle,
  CheckCircle,
  CalendarDays,
  FileText,
  History,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useMockUser } from "@/components/dev/account-switcher";
import { useEvents } from "@/contexts/events-context";

export default function HostDashboardPage() {
  const { user: mockUser, isLoading, effectiveRole } = useMockUser();
  const { getHostEvents, isLoaded: eventsLoaded } = useEvents();
  const router = useRouter();

  // Redirect to guest dashboard if in guest mode
  useEffect(() => {
    if (!isLoading && effectiveRole === "guest") {
      router.push("/dashboard");
    }
  }, [isLoading, effectiveRole, router]);

  // Show loading while checking user or events
  if (isLoading || !eventsLoaded) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto mb-2" />
          <p className="text-muted-foreground">Ładowanie panelu hosta...</p>
        </div>
      </div>
    );
  }

  // If in guest mode, show nothing (redirect will happen)
  if (effectiveRole === "guest") {
    return null;
  }

  const hostProfile = mockUser ? getHostProfileByMockUserId(mockUser.id) : null;

  // Use mock user's ID (they're a host in host mode)
  const hostId = mockUser?.id || "host-1";
  const hostEvents = getHostEvents(hostId);

  // Separate events by status/time
  const now = new Date();
  const upcomingEvents = hostEvents.filter(
    (e) => e.date >= now && (e.status === "published" || e.status === "pending_review")
  );
  const draftEvents = hostEvents.filter((e) => e.status === "draft");
  const pastEvents = hostEvents.filter(
    (e) => e.date < now || e.status === "completed"
  );

  // Calculate totals
  const totalRevenue = hostEvents.reduce((sum, e) => sum + e.revenue, 0);
  const totalGuests = hostEvents.reduce((sum, e) => sum + e.confirmedGuests, 0);
  const pendingBookings = hostEvents.reduce((sum, e) => sum + e.pendingBookings, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Panel Hosta</h1>
              <p className="text-muted-foreground">
                Zarządzaj swoimi wydarzeniami i gośćmi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/dashboard/host/calendar">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Kalendarz
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/host/messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Wiadomości
                </Link>
              </Button>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/dashboard/host/events/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Stwórz wydarzenie
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100">
                  <CalendarDays className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  <p className="text-xs text-muted-foreground">Nadchodzące</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingBookings}</p>
                  <p className="text-xs text-muted-foreground">Do akceptacji</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalGuests}</p>
                  <p className="text-xs text-muted-foreground">Gości łącznie</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">Przychód</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending bookings alert */}
        {pendingBookings > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-yellow-800">
                Masz {pendingBookings} oczekując
                {pendingBookings === 1 ? "ą" : "ych"} rezerwacj
                {pendingBookings === 1 ? "ę" : "i"}!
              </p>
              <p className="text-sm text-yellow-700">
                Szybka odpowiedź zwiększa Twoją ocenę.
              </p>
            </div>
            <Button asChild size="sm" variant="outline" className="border-yellow-300">
              <Link href="/dashboard/host/bookings">Zobacz wszystkie</Link>
            </Button>
          </div>
        )}

        {/* Events tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Nadchodzące
              {upcomingEvents.length > 0 && (
                <Badge className="bg-amber-600 text-white">
                  {upcomingEvents.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Szkice
              {draftEvents.length > 0 && (
                <Badge variant="secondary">{draftEvents.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historia
            </TabsTrigger>
          </TabsList>

          {/* Upcoming events */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <HostEventCard key={event.id} event={event} />
              ))
            ) : (
              <EmptyState
                icon={Calendar}
                title="Brak nadchodzących wydarzeń"
                description="Stwórz swoje pierwsze wydarzenie i zacznij przyjmować rezerwacje!"
                actionLabel="Stwórz wydarzenie"
                actionHref="/dashboard/host/events/new"
                actionIcon={Plus}
              />
            )}
          </TabsContent>

          {/* Draft events */}
          <TabsContent value="drafts" className="space-y-4">
            {draftEvents.length > 0 ? (
              draftEvents.map((event) => (
                <HostEventCard key={event.id} event={event} />
              ))
            ) : (
              <EmptyState
                icon={Calendar}
                title="Brak szkiców"
                description="Wszystkie Twoje wydarzenia są opublikowane."
              />
            )}
          </TabsContent>

          {/* Past events */}
          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <HostEventCard key={event.id} event={event} showActions={false} />
              ))
            ) : (
              <EmptyState
                icon={Calendar}
                title="Brak historii"
                description="Tu pojawią się Twoje zakończone wydarzenia."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Host event card component
interface HostEventCardProps {
  event: HostEvent;
  showActions?: boolean;
}

function HostEventCard({ event, showActions = true }: HostEventCardProps) {
  const statusInfo = hostEventStatusLabels[event.status];
  const bookings = getBookingsByEventId(event.id);
  const isPast = event.date < new Date() || event.status === "completed";

  return (
    <Card className={cn("overflow-hidden", isPast && "opacity-75")}>
      <div className="flex flex-col md:flex-row">
        {/* Event image/gradient */}
        <div
          className={cn(
            "w-full md:w-40 h-24 md:h-auto bg-gradient-to-br flex-shrink-0 relative",
            event.imageGradient
          )}
        >
          <Badge
            className={cn("absolute top-2 left-2", statusInfo.color)}
            variant="secondary"
          >
            {statusInfo.label}
          </Badge>
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            {/* Event info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {event.dateFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.confirmedGuests}/{event.capacity} gości
                </span>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 text-sm">
                {event.pendingBookings > 0 && (
                  <span className="flex items-center gap-1 text-yellow-600 font-medium">
                    <Clock className="h-4 w-4" />
                    {event.pendingBookings} oczekujących
                  </span>
                )}
                <span className="text-muted-foreground">
                  Przychód: <span className="font-medium text-foreground">{formatPrice(event.revenue)}</span>
                </span>
                <span className="text-muted-foreground">
                  Cena: <span className="font-medium text-foreground">{event.price} PLN</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex flex-row md:flex-col gap-2">
                <Button asChild variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <Link href={`/dashboard/host/events/${event.id}/guests`}>
                    <Users className="h-4 w-4 mr-1" />
                    Goście
                    {event.pendingBookings > 0 && (
                      <Badge className="ml-1 bg-white text-amber-600 h-5 px-1.5">
                        {event.pendingBookings}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/events/${event.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Podgląd
                  </Link>
                </Button>
                {event.status === "draft" && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/host/events/${event.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
