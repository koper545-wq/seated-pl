import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Mail,
  Calendar,
  MessageSquare,
  Home,
  ArrowRight,
} from "lucide-react";
import { AnimatedBlob } from "@/components/ui/organic-blob";

export default function HostApplicationSuccessPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-green-50 to-background py-12">
      <AnimatedBlob variant={2} className="absolute -top-20 -right-20 w-80 h-80 z-0" opacity={0.12} duration={20} rotate={[-3, 3]} />
      <AnimatedBlob variant={1} className="absolute bottom-10 -left-16 w-64 h-64 z-0" opacity={0.10} duration={26} rotate={[-4, 4]} />
      <AnimatedBlob variant={4} className="absolute top-1/2 right-1/3 w-48 h-48 z-0" opacity={0.08} duration={32} rotate={[-2, 2]} />
      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-lg mx-auto">
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-green-800">
              Dziękujemy za zgłoszenie!
            </h1>
            <p className="text-lg text-muted-foreground">
              Twoja aplikacja na hosta Seated została wysłana.
            </p>
          </div>

          {/* What happens next */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Co teraz?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="h-4 w-4 text-primary" />
                      <p className="font-medium">Potwierdzenie email</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Wysłaliśmy potwierdzenie na Twój adres email z numerem
                      zgłoszenia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="font-medium">Umówienie spotkania</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      W ciągu 48h skontaktujemy się, aby umówić spotkanie
                      weryfikacyjne w jednym z wybranych przez Ciebie terminów.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <p className="font-medium">Weryfikacja</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Podczas spotkania (online lub na żywo) omówimy Twoje plany
                      i odpowiemy na pytania. Sprawdzimy też miejsce wydarzeń.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-semibold">
                    4
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="font-medium">Start!</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Po pozytywnej weryfikacji Twoje konto zostanie aktywowane
                      i będziesz mógł/mogła stworzyć pierwsze wydarzenie!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application number */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Numer zgłoszenia</p>
                  <p className="font-mono font-semibold text-lg">
                    HOST-{new Date().getFullYear()}-
                    {String(Math.floor(Math.random() * 10000)).padStart(4, "0")}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  Skopiuj
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Masz pytania?</strong> Sprawdź nasze{" "}
              <a href="/faq/hosts" className="underline">
                FAQ dla hostów
              </a>{" "}
              lub napisz do nas na{" "}
              <a href="mailto:hosts@seated.pl" className="underline">
                hosts@seated.pl
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
              <Link href="/events">
                Przeglądaj wydarzenia
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Strona główna
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
