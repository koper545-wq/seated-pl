"use client";

import { use, useState } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  getAdminUserById,
  userRoleLabels,
  getBookingsByGuestId,
  bookingStatusLabels,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = getAdminUserById(id);
  const bookings = user ? getBookingsByGuestId(user.id) : [];

  const [adminNotes, setAdminNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="p-8 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Nie znaleziono użytkownika
          </h1>
          <p className="text-muted-foreground mb-6">
            Użytkownik o podanym ID nie istnieje
          </p>
          <Link href="/admin/users">
            <Button>Wróć do listy</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleBlock = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Użytkownik zablokowany! (demo)");
    setIsProcessing(false);
  };

  const handleUnblock = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Użytkownik odblokowany! (demo)");
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Użytkownik usunięty! (demo)");
    setIsProcessing(false);
  };

  const handleRoleChange = async (newRole: string) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Rola zmieniona na: ${newRole}! (demo)`);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="sm">
              ← Wróć
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              userRoleLabels[user.role].color
            }`}
          >
            {userRoleLabels[user.role].label}
          </span>
          {!user.isActive && (
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700">
              Zablokowany
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>👤</span> Profil użytkownika
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl ${
                    user.role === "host"
                      ? "bg-primary/10"
                      : user.role === "admin"
                      ? "bg-purple-100"
                      : "bg-muted"
                  }`}
                >
                  {user.avatar ||
                    (user.role === "host"
                      ? "👨‍🍳"
                      : user.role === "admin"
                      ? "👑"
                      : "👤")}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                      Imię
                    </p>
                    <p className="text-foreground">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                      Nazwisko
                    </p>
                    <p className="text-foreground">{user.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                      Miasto
                    </p>
                    <p className="text-foreground">{user.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📊</span> Aktywność
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">
                    Dołączył
                  </p>
                  <p className="font-medium text-foreground">
                    {format(user.createdAt, "d MMM yyyy", { locale: pl })}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">
                    Ostatnio aktywny
                  </p>
                  <p className="font-medium text-foreground">
                    {user.lastLoginAt
                      ? format(user.lastLoginAt, "d MMM yyyy", { locale: pl })
                      : "Nigdy"}
                  </p>
                </div>
                {user.role === "host" && (
                  <>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-xs text-primary uppercase tracking-wide mb-1">
                        Wydarzenia
                      </p>
                      <p className="font-bold text-primary text-xl">
                        {user.eventsHosted || 0}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 uppercase tracking-wide mb-1">
                        Przychód
                      </p>
                      <p className="font-bold text-green-700 text-xl">
                        {((user.totalRevenue || 0) / 100).toLocaleString()} zł
                      </p>
                    </div>
                  </>
                )}
                {user.role === "guest" && (
                  <>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 uppercase tracking-wide mb-1">
                        Uczestnictwo
                      </p>
                      <p className="font-bold text-blue-700 text-xl">
                        {user.eventsAttended || 0}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-xs text-purple-600 uppercase tracking-wide mb-1">
                        Rezerwacje
                      </p>
                      <p className="font-bold text-purple-700 text-xl">
                        {bookings.length}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bookings (for guests) */}
          {user.role === "guest" && bookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>🎫</span> Historia rezerwacji
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${booking.event.imageGradient} flex items-center justify-center text-xl`}
                        >
                          🍴
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.event.dateFormatted}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {(booking.totalPrice / 100).toLocaleString()} zł
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.ticketCount} bilet
                            {booking.ticketCount > 1 ? "y" : ""}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            bookingStatusLabels[booking.status].color
                          }`}
                        >
                          {bookingStatusLabels[booking.status].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Weryfikacja</span>
                {user.isVerified ? (
                  <span className="text-green-600 font-medium">
                    ✓ Zweryfikowany
                  </span>
                ) : (
                  <span className="text-yellow-600 font-medium">
                    ○ Niezweryfikowany
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Konto</span>
                {user.isActive ? (
                  <span className="text-blue-600 font-medium">● Aktywne</span>
                ) : (
                  <span className="text-red-600 font-medium">○ Zablokowane</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">👥 Rola</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                defaultValue={user.role}
                onValueChange={handleRoleChange}
                disabled={user.role === "admin"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Gość</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {user.role === "admin" && (
                <p className="text-xs text-muted-foreground mt-2">
                  Nie można zmienić roli admina
                </p>
              )}
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Notatki</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Dodaj notatki o użytkowniku..."
                rows={4}
              />
              <Button className="w-full mt-3" variant="outline" size="sm">
                Zapisz notatkę
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.role === "guest" && (
                <Link href={`/profile/${user.id}`} target="_blank">
                  <Button className="w-full" variant="outline">
                    👁️ Zobacz profil publiczny
                  </Button>
                </Link>
              )}

              {!user.isVerified && (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  ✓ Zweryfikuj email
                </Button>
              )}

              {user.isActive ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full"
                      variant="destructive"
                      disabled={isProcessing || user.role === "admin"}
                    >
                      🚫 Zablokuj użytkownika
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Zablokować użytkownika?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {user.firstName} {user.lastName} nie będzie mógł się
                        zalogować ani korzystać z platformy.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBlock}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Tak, zablokuj
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleUnblock}
                  disabled={isProcessing}
                >
                  ✓ Odblokuj użytkownika
                </Button>
              )}

              <hr className="my-2" />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled={isProcessing || user.role === "admin"}
                  >
                    🗑️ Usuń konto
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Usunąć konto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ta akcja jest nieodwracalna. Wszystkie dane użytkownika{" "}
                      {user.firstName} {user.lastName} zostaną trwale usunięte.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Anuluj</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Tak, usuń konto
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📞 Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                ✉️ Wyślij email
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
