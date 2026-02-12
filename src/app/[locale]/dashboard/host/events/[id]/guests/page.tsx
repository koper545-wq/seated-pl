"use client";

import { useState, use } from "react";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
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
  getHostEventById,
  getBookingsByEventId,
  MockBooking,
  bookingStatusLabels,
  HostEvent,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Check,
  X,
  Mail,
  Phone,
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
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface EventGuestsPageProps {
  params: Promise<{ id: string }>;
}

export default function EventGuestsPage({ params }: EventGuestsPageProps) {
  const { id } = use(params);
  const event = getHostEventById(id);

  if (!event) {
    notFound();
  }

  const [bookings, setBookings] = useState<MockBooking[]>(
    getBookingsByEventId(id)
  );
  const [actionBooking, setActionBooking] = useState<{
    booking: MockBooking;
    action: "approve" | "decline";
  } | null>(null);

  // Separate bookings
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "approved");
  const declinedBookings = bookings.filter(
    (b) => b.status === "declined" || b.status === "cancelled"
  );

  // Calculate totals
  const totalGuests = confirmedBookings.reduce((sum, b) => sum + b.ticketCount, 0);
  const totalRevenue = confirmedBookings.reduce(
    (sum, b) => sum + b.totalPrice - b.platformFee,
    0
  );

  const handleAction = (booking: MockBooking, action: "approve" | "decline") => {
    setActionBooking({ booking, action });
  };

  const confirmAction = () => {
    if (actionBooking) {
      const { booking, action } = actionBooking;
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                status: action === "approve" ? "approved" : ("declined" as const),
                approvedAt: action === "approve" ? new Date() : undefined,
              }
            : b
        )
      );
      setActionBooking(null);
    }
  };

  const handleApproveAll = () => {
    setBookings((prev) =>
      prev.map((b) =>
        b.status === "pending"
          ? { ...b, status: "approved" as const, approvedAt: new Date() }
          : b
      )
    );
  };

  // Collect dietary info from confirmed bookings
  const dietaryInfo = confirmedBookings
    .filter((b) => b.dietaryInfo)
    .map((b) => ({ name: b.guestName, info: b.dietaryInfo!, tickets: b.ticketCount }));

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
            Wróć do panelu
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
                  {totalGuests}/{event.capacity} gości
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Drukuj listę
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Eksportuj
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/events/${event.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  Podgląd
                </Link>
              </Button>
              {/* Feedback button - show after event */}
              {event.date < new Date() && confirmedBookings.length > 0 && (
                <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <Link href={`/dashboard/host/events/${event.id}/feedback`}>
                    <Star className="h-4 w-4 mr-1" />
                    Oceń gości
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {pendingBookings.length}
              </p>
              <p className="text-xs text-muted-foreground">Oczekujące</p>
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
              <p className="text-3xl font-bold">{event.spotsLeft}</p>
              <p className="text-xs text-muted-foreground">Wolnych miejsc</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">
                {formatPrice(totalRevenue)}
              </p>
              <p className="text-xs text-muted-foreground">Przychód</p>
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
                  {pendingBookings.length === 1 ? "a" : pendingBookings.length < 5 ? "e" : "i"}{" "}
                  czeka na Twoją decyzję
                </p>
                <p className="text-sm text-yellow-700">
                  Łącznie {pendingBookings.reduce((s, b) => s + b.ticketCount, 0)} osób
                </p>
              </div>
            </div>
            <Button
              onClick={handleApproveAll}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
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
                  Oczekujące
                  {pendingBookings.length > 0 && (
                    <Badge className="bg-yellow-500">{pendingBookings.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="confirmed" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Potwierdzone
                  <Badge variant="secondary">{confirmedBookings.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="declined" className="flex items-center gap-2">
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
                      onApprove={() => handleAction(booking, "approve")}
                      onDecline={() => handleAction(booking, "decline")}
                      showActions
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={CheckCircle}
                    title="Brak oczekujących"
                    description="Wszystkie rezerwacje zostały rozpatrzone."
                    compact
                  />
                )}
              </TabsContent>

              {/* Confirmed */}
              <TabsContent value="confirmed" className="space-y-3">
                {confirmedBookings.length > 0 ? (
                  confirmedBookings.map((booking) => (
                    <GuestCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState
                    icon={Users}
                    title="Brak potwierdzonych gości"
                    description="Zaakceptuj rezerwacje, aby zobaczyć listę gości."
                    compact
                  />
                )}
              </TabsContent>

              {/* Declined */}
              <TabsContent value="declined" className="space-y-3">
                {declinedBookings.length > 0 ? (
                  declinedBookings.map((booking) => (
                    <GuestCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState
                    icon={UserX}
                    title="Brak odrzuconych"
                    description="Nie odrzuciłeś jeszcze żadnych rezerwacji."
                    compact
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - dietary info */}
          <div className="space-y-6">
            {/* Dietary summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-amber-600" />
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
                    Brak specjalnych wymagań dietetycznych.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Special requests */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-amber-600" />
                  Specjalne życzenia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {confirmedBookings.filter((b) => b.specialRequests).length > 0 ? (
                  <div className="space-y-3">
                    {confirmedBookings
                      .filter((b) => b.specialRequests)
                      .map((booking) => (
                        <div key={booking.id} className="text-sm">
                          <p className="font-medium">{booking.guestName}</p>
                          <p className="text-muted-foreground">
                            {booking.specialRequests}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Brak specjalnych życzeń od gości.
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
                  <span className="text-muted-foreground">Pojemność:</span>
                  <span>{event.capacity} osób</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potwierdzonych:</span>
                  <span className="text-green-600 font-medium">{totalGuests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wolnych miejsc:</span>
                  <span>{event.spotsLeft}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cena/os:</span>
                  <span>{event.price} PLN</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Przychód netto:</span>
                  <span className="text-amber-600">{formatPrice(totalRevenue)}</span>
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
                ? "Zaakceptować rezerwację?"
                : "Odrzucić rezerwację?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionBooking?.action === "approve" ? (
                <>
                  <strong>{actionBooking?.booking.guestName}</strong> (
                  {actionBooking?.booking.ticketCount}{" "}
                  {actionBooking?.booking.ticketCount === 1 ? "osoba" : "osoby"})
                  otrzyma email z potwierdzeniem i pełnym adresem wydarzenia.
                </>
              ) : (
                <>
                  <strong>{actionBooking?.booking.guestName}</strong> zostanie
                  powiadomiony o odrzuceniu rezerwacji.
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
              {actionBooking?.action === "approve" ? "Zaakceptuj" : "Odrzuć"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Guest card component
interface GuestCardProps {
  booking: MockBooking;
  onApprove?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

function GuestCard({
  booking,
  onApprove,
  onDecline,
  showActions = false,
}: GuestCardProps) {
  const statusInfo = bookingStatusLabels[booking.status];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-amber-100 text-amber-700">
              {booking.guestName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate">{booking.guestName}</h4>
              <Badge className={cn(statusInfo.color, "text-xs")} variant="secondary">
                {statusInfo.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {booking.ticketCount} {booking.ticketCount === 1 ? "os." : "os."}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground mb-2">
              <a
                href={`mailto:${booking.guestEmail}`}
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Mail className="h-3 w-3" />
                {booking.guestEmail}
              </a>
              {booking.guestPhone && (
                <a
                  href={`tel:${booking.guestPhone}`}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  <Phone className="h-3 w-3" />
                  {booking.guestPhone}
                </a>
              )}
            </div>

            {(booking.dietaryInfo || booking.specialRequests) && (
              <div className="text-sm space-y-1">
                {booking.dietaryInfo && (
                  <p className="flex items-start gap-1">
                    <UtensilsCrossed className="h-3 w-3 mt-1 text-amber-600" />
                    <span className="text-muted-foreground">{booking.dietaryInfo}</span>
                  </p>
                )}
                {booking.specialRequests && (
                  <p className="flex items-start gap-1">
                    <MessageSquare className="h-3 w-3 mt-1 text-blue-600" />
                    <span className="text-muted-foreground">{booking.specialRequests}</span>
                  </p>
                )}
              </div>
            )}

            <p className="text-sm font-medium text-amber-600 mt-2">
              {formatPrice(booking.totalPrice - booking.platformFee)}
            </p>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={onApprove}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={onDecline}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
