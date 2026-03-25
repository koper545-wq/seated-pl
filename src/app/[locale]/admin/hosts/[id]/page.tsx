"use client";

import { use, useState } from "react";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  getHostApplicationById,
  hostApplicationStatusLabels,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

export default function HostApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const application = getHostApplicationById(id);

  const [adminNotes, setAdminNotes] = useState(application?.adminNotes || "");
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(
    application?.interviewDate
  );
  const [isProcessing, setIsProcessing] = useState(false);

  if (!application) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="p-8 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Nie znaleziono aplikacji
          </h1>
          <p className="text-muted-foreground mb-6">
            Aplikacja o podanym ID nie istnieje
          </p>
          <Link href="/admin/hosts">
            <Button>Wróć do listy</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Aplikacja zaakceptowana! (demo)");
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Aplikacja odrzucona! (demo)");
    setIsProcessing(false);
  };

  const handleScheduleInterview = async () => {
    if (!interviewDate) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Rozmowa umówiona na ${format(interviewDate, "d MMMM yyyy HH:mm", { locale: pl })}! (demo)`);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/hosts">
            <Button variant="ghost" size="sm">
              ← Wróć
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Aplikacja: {application.firstName} {application.lastName}
            </h1>
            <p className="text-muted-foreground">ID: {application.id}</p>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            hostApplicationStatusLabels[application.status].color
          }`}
        >
          {hostApplicationStatusLabels[application.status].label}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>👤</span> Dane osobowe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Imię i nazwisko
                  </p>
                  <p className="text-foreground font-medium">
                    {application.firstName} {application.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-foreground">{application.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Telefon
                  </p>
                  <p className="text-foreground">{application.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Miasto
                  </p>
                  <p className="text-foreground">{application.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📍</span> Lokalizacja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Dzielnica
                  </p>
                  <p className="text-foreground">{application.neighborhood}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Pełny adres
                  </p>
                  <p className="text-foreground">{application.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience & Cuisine */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>👨‍🍳</span> Doświadczenie i kuchnia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">
                  Poziom doświadczenia
                </p>
                <span
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    application.experience === "experienced"
                      ? "bg-green-100 text-green-700"
                      : application.experience === "some"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {application.experience === "none" && "Brak doświadczenia"}
                  {application.experience === "some" && "Podstawowe doświadczenie"}
                  {application.experience === "experienced" && "Doświadczony"}
                </span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">
                  Typy kuchni
                </p>
                <div className="flex flex-wrap gap-2">
                  {application.cuisineTypes.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-3 py-1.5 bg-primary/5 text-primary rounded-full text-sm"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">
                  Planowane typy wydarzeń
                </p>
                <div className="flex flex-wrap gap-2">
                  {application.eventTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {type === "supper-club" && "Supper Club"}
                      {type === "warsztaty" && "Warsztaty"}
                      {type === "degustacje" && "Degustacje"}
                      {type === "popup" && "Pop-up"}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📝</span> O sobie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {application.bio}
              </p>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📸</span> Zdjęcia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {application.photos.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Brak załączonych zdjęć
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {application.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-muted rounded-lg"
                    >
                      <img
                        src={photo}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          {/* Status & Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                  Data złożenia
                </p>
                <p className="text-foreground">
                  {format(application.submittedAt, "d MMMM yyyy, HH:mm", {
                    locale: pl,
                  })}
                </p>
              </div>

              {application.reviewedAt && (
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                    Data rozpatrzenia
                  </p>
                  <p className="text-foreground">
                    {format(application.reviewedAt, "d MMMM yyyy, HH:mm", {
                      locale: pl,
                    })}
                  </p>
                </div>
              )}

              {application.interviewDate && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 uppercase tracking-wide">
                    Rozmowa umówiona
                  </p>
                  <p className="text-blue-900 font-medium">
                    {format(application.interviewDate, "d MMMM yyyy, HH:mm", {
                      locale: pl,
                    })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Notatki admina</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Dodaj notatki dotyczące aplikacji..."
                rows={4}
              />
              <Button className="w-full mt-3" variant="outline" size="sm">
                Zapisz notatkę
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          {application.status === "pending" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⚡ Akcje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Schedule Interview */}
                <div className="space-y-2">
                  <Label>Umów rozmowę weryfikacyjną</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {interviewDate
                          ? format(interviewDate, "d MMMM yyyy", { locale: pl })
                          : "Wybierz datę"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={interviewDate}
                        onSelect={setInterviewDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleScheduleInterview}
                    disabled={!interviewDate || isProcessing}
                  >
                    📅 Umów rozmowę
                  </Button>
                </div>

                <hr className="my-4" />

                {/* Approve */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isProcessing}
                    >
                      ✅ Akceptuj aplikację
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Zaakceptować aplikację?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {application.firstName} {application.lastName} otrzyma
                        status hosta i będzie mógł tworzyć wydarzenia na
                        platformie.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleApprove}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Tak, akceptuj
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Reject */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full"
                      variant="destructive"
                      disabled={isProcessing}
                    >
                      ❌ Odrzuć aplikację
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Odrzucić aplikację?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aplikacja {application.firstName} {application.lastName}{" "}
                        zostanie odrzucona. Upewnij się, że dodałeś notatkę z
                        powodem odrzucenia.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleReject}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Tak, odrzuć
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📞 Kontakt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={`mailto:${application.email}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                ✉️ Wyślij email
              </a>
              <a
                href={`tel:${application.phone}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                📱 Zadzwoń
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
