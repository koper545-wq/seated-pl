"use client";

import { useState, useEffect, use, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Check,
  X,
  Mail,
  UtensilsCrossed,
  MessageSquare,
  Download,
  Printer,
  AlertCircle,
  CheckCircle,
  UserCheck,
  UserX,
  Eye,
  Star,
  Flag,
  Loader2,
} from "lucide-react";
import { ReportDialog } from "@/components/reports";
import { cn, formatPrice } from "@/lib/utils";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { getBookingsByEventId, getHostEventById } from "@/lib/mock-data";

// ---------------------------------------------------------------------------
// Types matching the API response from GET /api/events/[id]/guests
// ---------------------------------------------------------------------------

interface GuestProfile {
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  dietaryRestrictions: string | null;
  allergies: string | null;
}

interface BookingGuest {
  id: string;
  email: string;
  guestProfile: GuestProfile | null;
}

interface BookingTransaction {
  type: string;
  amount: number;
  status: string;
  processedAt: string | null;
}

interface Booking {
  id: string;
  eventId: string;
  guestId: string;
  ticketCount: number;
  totalPrice: number; // in grosze
  platformFee: number; // in grosze
  status: "PENDING" | "APPROVED" | "DECLINED" | "CANCELLED" | "COMPLETED";
  dietaryInfo: string | null;
  specialRequests: string | null;
  createdAt: string;
  approvedAt: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  guest: BookingGuest;
  transactions: BookingTransaction[];
}

interface GuestsApiResponse {
  bookings: Booking[];
  eventTitle: string;
}

// ---------------------------------------------------------------------------
// Status labels (moved from mock-data, adapted for uppercase API statuses)
// ---------------------------------------------------------------------------

const bookingStatusLabels: Record<
  Booking["status"],
  { label: string; color: string }
> = {
  PENDING: { label: "Oczekuje", color: "bg-yellow-100 text-yellow-700" },
  APPROVED: { label: "Potwierdzona", color: "bg-green-100 text-green-700" },
  DECLINED: { label: "Odrzucona", color: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Anulowana", color: "bg-gray-100 text-gray-700" },
  COMPLETED: { label: "Zakonczona", color: "bg-blue-100 text-blue-700" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getGuestName(guest: BookingGuest): string {
  const first = guest.guestProfile?.firstName;
  const last = guest.guestProfile?.lastName;
  if (first || last) return [first, last].filter(Boolean).join(" ");
  return guest.email.split("@")[0];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

interface EventGuestsPageProps {
  params: Promise<{ id: string }>;
}

export default function EventGuestsPage({ params }: EventGuestsPageProps) {
  const { id: eventId } = use(params);
  const { mvpMode } = useMVPMode();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionBooking, setActionBooking] = useState<{
    booking: Booking;
    action: "approve" | "decline";
  } | null>(null);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  // Fetch guests data (or use mock data in demo mode)
  const fetchGuests = useCallback(async () => {
    if (mvpMode) {
      // Use mock data
      const mockEvent = getHostEventById(eventId);
      const mockBookings = getBookingsByEventId(eventId);
      setEventTitle(mockEvent?.title || "Wydarzenie");
      // Convert mock bookings to the Booking shape expected by this page
      setBookings(mockBookings.map((b) => ({
        id: b.id,
        eventId: b.eventId,
        guestId: b.guestId,
        ticketCount: b.ticketCount,
        totalPrice: b.totalPrice * 100, // PLN → grosze
        platformFee: b.platformFee * 100,
        status: b.status.toUpperCase() as Booking["status"],
        dietaryInfo: b.dietaryInfo || null,
        specialRequests: b.specialRequests || null,
        createdAt: b.createdAt.toISOString(),
        approvedAt: b.approvedAt ? b.approvedAt.toISOString() : null,
        cancelledAt: b.cancelledAt ? b.cancelledAt.toISOString() : null,
        cancelReason: b.cancelReason || null,
        guest: {
          id: b.guestId,
          email: b.guestEmail,
          guestProfile: {
            firstName: b.guestName.split(" ")[0] || null,
            lastName: b.guestName.split(" ").slice(1).join(" ") || null,
            avatarUrl: null,
            dietaryRestrictions: null,
            allergies: null,
          },
        },
        transactions: [],
      })));
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const res = await fetch(`/api/events/${eventId}/guests`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("Wydarzenie nie zostalo znalezione.");
          return;
        }
        if (res.status === 403) {
          setError("Brak dostepu do tego wydarzenia.");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data: GuestsApiResponse = await res.json();
      setBookings(data.bookings);
      setEventTitle(data.eventTitle);
    } catch {
      setError("Nie udalo sie pobrac listy gosci. Sprobuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId, mvpMode]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // Separate bookings by status
  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const confirmedBookings = bookings.filter(
    (b) => b.status === "APPROVED" || b.status === "COMPLETED"
  );
  const declinedBookings = bookings.filter(
    (b) => b.status === "DECLINED" || b.status === "CANCELLED"
  );

  // Calculate totals
  const totalGuests = confirmedBookings.reduce(
    (sum, b) => sum + b.ticketCount,
    0
  );
  const totalRevenue = confirmedBookings.reduce(
    (sum, b) => sum + (b.totalPrice - b.platformFee),
    0
  );

  // Dietary info from confirmed bookings
  const dietaryInfo = confirmedBookings
    .filter((b) => b.dietaryInfo || b.guest.guestProfile?.dietaryRestrictions || b.guest.guestProfile?.allergies)
    .map((b) => {
      const parts: string[] = [];
      if (b.dietaryInfo) parts.push(b.dietaryInfo);
      if (b.guest.guestProfile?.dietaryRestrictions)
        parts.push(b.guest.guestProfile.dietaryRestrictions);
      if (b.guest.guestProfile?.allergies)
        parts.push(`Alergie: ${b.guest.guestProfile.allergies}`);
      return {
        name: getGuestName(b.guest),
        info: parts.join(", "),
        tickets: b.ticketCount,
      };
    });

  // Handlers
  const handleAction = (booking: Booking, action: "approve" | "decline") => {
    setActionBooking({ booking, action });
  };

  const confirmAction = async () => {
    if (!actionBooking) return;
    const { booking, action } = actionBooking;

    setProcessingIds((prev) => new Set(prev).add(booking.id));
    setActionBooking(null);

    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      // Update local state
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                status: action === "approve" ? "APPROVED" : "DECLINED",
                approvedAt:
                  action === "approve" ? new Date().toISOString() : b.approvedAt,
              }
            : b
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} booking:`, err);
      setError(
        `Nie udalo sie ${action === "approve" ? "zaakceptowac" : "odrzucic"} rezerwacji. Sprobuj ponownie.`
      );
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(booking.id);
        return next;
      });
    }
  };

  const handleApproveAll = async () => {
    const pending = bookings.filter((b) => b.status === "PENDING");
    const ids = pending.map((b) => b.id);

    setProcessingIds(new Set(ids));

    const results = await Promise.allSettled(
      pending.map((b) =>
        fetch(`/api/bookings/${b.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "approve" }),
        })
      )
    );

    const succeededIds = new Set<string>();
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.ok) {
        succeededIds.add(ids[index]);
      }
    });

    setBookings((prev) =>
      prev.map((b) =>
        succeededIds.has(b.id)
          ? { ...b, status: "APPROVED", approvedAt: new Date().toISOString() }
          : b
      )
    );

    if (succeededIds.size < ids.length) {
      setError(
        `Nie udalo sie zaakceptowac ${ids.length - succeededIds.size} z ${ids.length} rezerwacji.`
      );
    }

    setProcessingIds(new Set());
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Ladowanie listy gosci...</p>
        </div>
      </div>
    );
  }

  // Error state (full-page)
  if (error && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
          <h2 className="text-xl font-semibold">Wystapil blad</h2>
          <p className="text-muted-foreground">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/host">Wroc do panelu</Link>
            </Button>
            <Button
              onClick={() => {
                setIsLoading(true);
                fetchGuests();
              }}
            >
              Sprobuj ponownie
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/dashboard/host"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Wroc do panelu
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{eventTitle}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {totalGuests} potwierdzonych gosci
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {bookings.length} rezerwacji lacznie
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Drukuj liste
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Eksportuj
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/events/${eventId}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  Podglad
                </Link>
              </Button>
              {confirmedBookings.length > 0 && (
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href={`/dashboard/host/events/${eventId}/feedback`}>
                    <Star className="h-4 w-4 mr-1" />
                    Ocen gosci
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Inline error banner */}
        {error && bookings.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 flex-1">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {pendingBookings.length}
              </p>
              <p className="text-xs text-muted-foreground">Oczekujace</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{totalGuests}</p>
              <p className="text-xs text-muted-foreground">Potwierdzonych</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{declinedBookings.length}</p>
              <p className="text-xs text-muted-foreground">Odrzuconych</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(totalRevenue)}
              </p>
              <p className="text-xs text-muted-foreground">Przychod</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending alert with approve all */}
        {pendingBookings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">
                  {pendingBookings.length} rezerwacj
                  {pendingBookings.length === 1
                    ? "a"
                    : pendingBookings.length < 5
                      ? "e"
                      : "i"}{" "}
                  czeka na Twoja decyzje
                </p>
                <p className="text-sm text-yellow-700">
                  Lacznie{" "}
                  {pendingBookings.reduce((s, b) => s + b.ticketCount, 0)} osob
                </p>
              </div>
            </div>
            <Button
              onClick={handleApproveAll}
              className="bg-green-600 hover:bg-green-700"
              disabled={processingIds.size > 0}
            >
              {processingIds.size > 0 ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Akceptuj wszystkie
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - bookings list */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Oczekujace
                  {pendingBookings.length > 0 && (
                    <Badge className="bg-yellow-500">
                      {pendingBookings.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="confirmed"
                  className="flex items-center gap-2"
                >
                  <UserCheck className="h-4 w-4" />
                  Potwierdzone
                  <Badge variant="secondary">{confirmedBookings.length}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="declined"
                  className="flex items-center gap-2"
                >
                  <UserX className="h-4 w-4" />
                  Odrzucone
                </TabsTrigger>
              </TabsList>

              {/* Pending */}
              <TabsContent value="pending" className="space-y-3">
                {pendingBookings.length > 0 ? (
                  pendingBookings.map((booking) => (
                    <GuestCard
                      key={booking.id}
                      booking={booking}
                      eventId={eventId}
                      eventTitle={eventTitle}
                      isProcessing={processingIds.has(booking.id)}
                      onApprove={() => handleAction(booking, "approve")}
                      onDecline={() => handleAction(booking, "decline")}
                      showActions
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={CheckCircle}
                    title="Brak oczekujacych"
                    description="Wszystkie rezerwacje zostaly rozpatrzone."
                    compact
                  />
                )}
              </TabsContent>

              {/* Confirmed */}
              <TabsContent value="confirmed" className="space-y-3">
                {confirmedBookings.length > 0 ? (
                  confirmedBookings.map((booking) => (
                    <GuestCard
                      key={booking.id}
                      booking={booking}
                      eventId={eventId}
                      eventTitle={eventTitle}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={Users}
                    title="Brak potwierdzonych gosci"
                    description="Zaakceptuj rezerwacje, aby zobaczyc liste gosci."
                    compact
                  />
                )}
              </TabsContent>

              {/* Declined */}
              <TabsContent value="declined" className="space-y-3">
                {declinedBookings.length > 0 ? (
                  declinedBookings.map((booking) => (
                    <GuestCard
                      key={booking.id}
                      booking={booking}
                      eventId={eventId}
                      eventTitle={eventTitle}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={UserX}
                    title="Brak odrzuconych"
                    description="Nie odrzuciles jeszcze zadnych rezerwacji."
                    compact
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - dietary info & summary */}
          <div className="space-y-6">
            {/* Dietary summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-primary" />
                  Wymagania dietetyczne
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dietaryInfo.length > 0 ? (
                  <div className="space-y-3">
                    {dietaryInfo.map((item, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">{item.info}</p>
                        {item.tickets > 1 && (
                          <p className="text-xs text-muted-foreground">
                            ({item.tickets} osoby)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Brak specjalnych wymagan dietetycznych.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Special requests */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Specjalne zyczenia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {confirmedBookings.filter((b) => b.specialRequests).length >
                0 ? (
                  <div className="space-y-3">
                    {confirmedBookings
                      .filter((b) => b.specialRequests)
                      .map((booking) => (
                        <div key={booking.id} className="text-sm">
                          <p className="font-medium">
                            {getGuestName(booking.guest)}
                          </p>
                          <p className="text-muted-foreground">
                            {booking.specialRequests}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Brak specjalnych zyczen od gosci.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Podsumowanie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rezerwacji:</span>
                  <span>{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potwierdzonych:</span>
                  <span className="text-green-600 font-medium">
                    {totalGuests} osob
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Oczekujacych:</span>
                  <span className="text-yellow-600 font-medium">
                    {pendingBookings.reduce((s, b) => s + b.ticketCount, 0)} osob
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Przychod netto:</span>
                  <span className="text-primary">
                    {formatPrice(totalRevenue)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Action confirmation dialog */}
      <AlertDialog
        open={actionBooking !== null}
        onOpenChange={(open) => !open && setActionBooking(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionBooking?.action === "approve"
                ? "Zaakceptowac rezerwacje?"
                : "Odrzucic rezerwacje?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionBooking?.action === "approve" ? (
                <>
                  <strong>
                    {actionBooking?.booking &&
                      getGuestName(actionBooking.booking.guest)}
                  </strong>{" "}
                  ({actionBooking?.booking.ticketCount}{" "}
                  {actionBooking?.booking.ticketCount === 1 ? "osoba" : "osoby"})
                  otrzyma email z potwierdzeniem i pelnym adresem wydarzenia.
                </>
              ) : (
                <>
                  <strong>
                    {actionBooking?.booking &&
                      getGuestName(actionBooking.booking.guest)}
                  </strong>{" "}
                  zostanie powiadomiony o odrzuceniu rezerwacji.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={
                actionBooking?.action === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {actionBooking?.action === "approve" ? "Zaakceptuj" : "Odrzuc"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GuestCard component
// ---------------------------------------------------------------------------

interface GuestCardProps {
  booking: Booking;
  eventId: string;
  eventTitle: string;
  isProcessing?: boolean;
  onApprove?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

function GuestCard({
  booking,
  eventId,
  eventTitle,
  isProcessing = false,
  onApprove,
  onDecline,
  showActions = false,
}: GuestCardProps) {
  const statusInfo = bookingStatusLabels[booking.status];
  const guestName = getGuestName(booking.guest);
  const netRevenue = booking.totalPrice - booking.platformFee;

  // Build dietary display string
  const dietaryParts: string[] = [];
  if (booking.dietaryInfo) dietaryParts.push(booking.dietaryInfo);
  if (booking.guest.guestProfile?.dietaryRestrictions)
    dietaryParts.push(booking.guest.guestProfile.dietaryRestrictions);
  if (booking.guest.guestProfile?.allergies)
    dietaryParts.push(`Alergie: ${booking.guest.guestProfile.allergies}`);
  const dietaryDisplay = dietaryParts.length > 0 ? dietaryParts.join(", ") : null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(guestName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate">{guestName}</h4>
              <Badge
                className={cn(statusInfo.color, "text-xs")}
                variant="secondary"
              >
                {statusInfo.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {booking.ticketCount} os.
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground mb-2">
              <a
                href={`mailto:${booking.guest.email}`}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Mail className="h-3 w-3" />
                {booking.guest.email}
              </a>
            </div>

            {(dietaryDisplay || booking.specialRequests) && (
              <div className="text-sm space-y-1">
                {dietaryDisplay && (
                  <p className="flex items-start gap-1">
                    <UtensilsCrossed className="h-3 w-3 mt-1 text-primary" />
                    <span className="text-muted-foreground">
                      {dietaryDisplay}
                    </span>
                  </p>
                )}
                {booking.specialRequests && (
                  <p className="flex items-start gap-1">
                    <MessageSquare className="h-3 w-3 mt-1 text-blue-600" />
                    <span className="text-muted-foreground">
                      {booking.specialRequests}
                    </span>
                  </p>
                )}
              </div>
            )}

            <p className="text-sm font-medium text-primary mt-2">
              {formatPrice(netRevenue)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {showActions && (
              <>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={onApprove}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onDecline}
                  disabled={isProcessing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            <ReportDialog
              reportType="guest"
              reportedEntityId={booking.guestId}
              reportedEntityName={guestName}
              eventId={eventId}
              eventTitle={eventTitle}
              bookingId={booking.id}
              reporterRole="host"
              trigger={
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Flag className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
