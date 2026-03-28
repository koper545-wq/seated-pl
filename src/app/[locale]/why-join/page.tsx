"use client";

import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  ChefHat,
  Building2,
  Sparkles,
  Utensils,
  GraduationCap,
  Wine,
  Heart,
  ShieldCheck,
  CreditCard,
  Star,
  Search,
  CheckCircle,
  Flame,
  TrendingUp,
  CalendarCheck,
  Megaphone,
  UserCircle,
  Clock,
  Calendar,
  Banknote,
  Target,
  Award,
  BarChart3,
  MessageSquare,
  ArrowRight,
  Check,
} from "lucide-react";
import { AnimatedBlob } from "@/components/ui/organic-blob";

type Audience = "guest" | "host" | "restaurant";

export default function WhyJoinPage() {
  const [audience, setAudience] = useState<Audience>("guest");
  const deckRef = useRef<HTMLDivElement>(null);

  const selectAudience = (a: Audience) => {
    setAudience(a);
    setTimeout(() => {
      deckRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 to-muted/50 py-20 md:py-28 relative overflow-hidden">
        <AnimatedBlob variant={1} className="-right-16 top-8 w-[280px] h-[280px] hidden md:block z-0" opacity={0.10} duration={24} rotate={[-4, 4]} />
        <AnimatedBlob variant={4} className="-left-20 bottom-4 w-[250px] h-[250px] hidden md:block z-0" opacity={0.12} duration={20} rotate={[-3, 3]} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Seated.pl
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Dlaczego warto dołączyć
            <br />
            <span className="text-primary">do Seated?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Platforma kulinarnych doświadczeń, która łączy pasjonatów jedzenia we
            Wrocławiu
          </p>
        </div>
      </section>

      {/* AUDIENCE PICKER */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <AnimatedBlob variant={8} className="-right-24 top-1/2 -translate-y-1/2 w-[220px] h-[220px] hidden lg:block z-0" opacity={0.08} duration={26} rotate={[-3, 3]} />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-center text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider">
            Kim jesteś?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                {
                  key: "guest" as Audience,
                  icon: Users,
                  title: "Jestem Gościem",
                  sub: "Szukam kulinarnych przygód",
                },
                {
                  key: "host" as Audience,
                  icon: ChefHat,
                  title: "Jestem Hostem",
                  sub: "Chcę gotować dla ludzi",
                },
                {
                  key: "restaurant" as Audience,
                  icon: Building2,
                  title: "Jestem Restauracją",
                  sub: "Chcę organizować wydarzenia",
                },
              ] as const
            ).map((card) => (
              <button
                key={card.key}
                onClick={() => selectAudience(card.key)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer text-left ${
                  audience === card.key
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-white hover:border-border hover:shadow-sm"
                }`}
              >
                <card.icon
                  className={`w-8 h-8 mb-3 ${audience === card.key ? "text-primary" : "text-muted-foreground/70"}`}
                />
                <div className="font-bold text-foreground">{card.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{card.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PITCH DECK */}
      <div ref={deckRef}>
        {audience === "guest" && <GuestDeck />}
        {audience === "host" && <HostDeck />}
        {audience === "restaurant" && <RestaurantDeck />}
      </div>
    </div>
  );
}

/* ============================================================
   GUEST PITCH DECK
   ============================================================ */
function GuestDeck() {
  return (
    <>
      {/* G1 — Discovery */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Odkryj to, czego nie znajdziesz nigdzie indziej
              </h2>
              <p className="text-lg text-muted-foreground">
                Supper clubs w prywatnych domach. Warsztaty z szefami kuchni.
                Degustacje win w loftach. To nie restauracja — to przygoda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Utensils, label: "Supper Club", color: "amber" },
                { icon: GraduationCap, label: "Warsztaty", color: "blue" },
                { icon: Wine, label: "Degustacje", color: "purple" },
                { icon: ChefHat, label: "Pop-up", color: "rose" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border border-border p-5 text-center bg-white hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      item.color === "amber"
                        ? "bg-primary/10"
                        : item.color === "blue"
                          ? "bg-blue-100"
                          : item.color === "purple"
                            ? "bg-purple-100"
                            : "bg-rose-100"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        item.color === "amber"
                          ? "text-primary"
                          : item.color === "blue"
                            ? "text-blue-600"
                            : item.color === "purple"
                              ? "text-purple-600"
                              : "text-rose-600"
                      }`}
                    />
                  </div>
                  <div className="font-medium text-foreground text-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* G2 — Community */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 mx-auto">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Poznaj ludzi, którzy kochają jedzenie tak jak Ty
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kameralne grupy 6–12 osób. Wspólny stół. Nowe znajomości i rozmowy o
            tym, co najsmaczniejsze.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "500+", label: "gości na platformie" },
              { value: "50+", label: "zorganizowanych wydarzeń" },
              { value: "4.9", label: "średnia ocena" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G3 — Safety */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Bezpiecznie i przejrzyście
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                color: "green",
                title: "Zweryfikowani hosty",
                desc: "Każdy host przechodzi weryfikację i rozmowę z naszym zespołem",
              },
              {
                icon: CreditCard,
                color: "blue",
                title: "Bezpieczne płatności",
                desc: "Płacisz online. Pełny zwrot jeśli wydarzenie się nie odbędzie",
              },
              {
                icon: Star,
                color: "amber",
                title: "Prawdziwe opinie",
                desc: "Oceny od uczestników, którzy naprawdę tam byli",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-6 text-center"
              >
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    item.color === "green"
                      ? "bg-green-100"
                      : item.color === "blue"
                        ? "bg-blue-100"
                        : "bg-primary/10"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.color === "green"
                        ? "text-green-600"
                        : item.color === "blue"
                          ? "text-blue-600"
                          : "text-primary"
                    }`}
                  />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G4 — Exclusivity */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Flame className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            To nie jest kolejna restauracja
          </h2>
          <p className="text-lg text-muted-foreground/50 mb-8 max-w-xl mx-auto">
            Maksymalnie 12 miejsc. Osobisty kontakt z hostem. Menu stworzone
            specjalnie na ten wieczór.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { value: "6–12", label: "miejsc" },
              { value: "1", label: "wyjątkowe menu" },
              { value: "100%", label: "kameralności" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G5 — How it works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Trzy proste kroki
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                icon: Search,
                title: "Przeglądaj",
                desc: "Znajdź wydarzenie, które Cię interesuje",
              },
              {
                n: "2",
                icon: CreditCard,
                title: "Zarezerwuj",
                desc: "Opłać miejsce online w 2 minuty",
              },
              {
                n: "3",
                icon: Utensils,
                title: "Delektuj się",
                desc: "Przyjdź, jedz, poznawaj ludzi",
              },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.n}
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G6 — CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Odkryj wydarzenia we Wrocławiu
          </h2>
          <p className="text-primary/30 mb-8 text-lg">
            Dołącz do 500+ osób, które już odkryły nowe smaki
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button
                size="lg"
                variant="secondary"
                className="text-primary font-semibold"
              >
                Przeglądaj wydarzenia
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Załóż konto
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   HOST PITCH DECK
   ============================================================ */
function HostDeck() {
  return (
    <>
      {/* H1 — Earnings */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Zarabiaj robiąc to, co kochasz
              </h2>
              <p className="text-lg text-muted-foreground">
                Gotujesz dla znajomych i wszyscy mówią, że powinieneś otworzyć
                restaurację? Na Seated nie musisz. Wystarczy Twoja kuchnia i
                pasja.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-orange-50 border border-primary/20 rounded-xl p-6">
              <div className="text-sm font-medium text-primary mb-4">
                Przykładowy wieczór
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>8 gości × 150 zł</span>
                  <span className="font-bold">1 200 zł</span>
                </div>
                <div className="border-t border-primary/20" />
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Prowizja platformy (15%)</span>
                  <span>−180 zł</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Twój przychód</span>
                  <span className="font-bold">1 020 zł</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Szacunkowe składniki</span>
                  <span>~300 zł</span>
                </div>
                <div className="border-t border-primary/20" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-green-700">Twój zysk</span>
                  <span className="font-bold text-green-700">~720 zł</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2 — No formalities */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Zero formalności na start
            </h2>
            <p className="text-lg text-muted-foreground">
              Nie potrzebujesz lokalu, licencji gastro ani działalności. Gotujesz
              u siebie, na swoich zasadach.
            </p>
          </div>
          <div className="space-y-3 max-w-lg mx-auto mb-8">
            {[
              "Nie potrzebujesz działalności gospodarczej",
              "Nie potrzebujesz licencji gastronomicznej",
              "Nie potrzebujesz lokalu — gotujesz w domu",
              "Wystarczy pasja i umiejętności",
              "My pomagamy z resztą",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center text-sm text-blue-700 max-w-lg mx-auto">
            Weryfikacja trwa 48h. Krótka rozmowa z naszym zespołem i gotowe!
          </div>
        </div>
      </section>

      {/* H3 — Platform handles it */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Ty gotujesz.
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12">
            My zajmujemy się resztą.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                color: "green",
                title: "Płatności",
                desc: "Goście płacą przez platformę. Pieniądze trafiają na Twoje konto w 3 dni",
              },
              {
                icon: CalendarCheck,
                color: "blue",
                title: "Rezerwacje",
                desc: "Automatyczny system rezerwacji, przypomnienia dla gości, zarządzanie listą",
              },
              {
                icon: Megaphone,
                color: "purple",
                title: "Marketing",
                desc: "Twoje wydarzenia widoczne dla tysięcy food lovers. Darmowa promocja",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-6 text-center"
              >
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    item.color === "green"
                      ? "bg-green-100"
                      : item.color === "blue"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.color === "green"
                        ? "text-green-600"
                        : item.color === "blue"
                          ? "text-blue-600"
                          : "text-purple-600"
                    }`}
                  />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H4 — Personal brand */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white border border-border rounded-xl p-6 shadow-sm max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Anna K.</div>
                    <div className="text-xs text-primary font-medium">
                      Superhost
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= 4 ? "text-primary fill-primary" : "text-primary fill-primary"}`}
                    />
                  ))}
                  <span className="text-sm font-medium text-muted-foreground ml-1">
                    4.9
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  23 wydarzenia · 180+ gości
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Włoska", "Fusion", "Desery"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <UserCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Zbuduj swoją markę osobistą
              </h2>
              <p className="text-lg text-muted-foreground">
                Twój profil na Seated to Twoje portfolio kulinarne. Zbieraj
                opinie, buduj reputację, przyciągaj stałych gości.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* H5 — Flexibility */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Gotujesz kiedy chcesz, ile chcesz
            </h2>
            <p className="text-lg text-muted-foreground">
              Raz w miesiącu czy co tydzień — Ty decydujesz.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Calendar,
                title: "Twój grafik",
                desc: "Gotujesz gdy masz czas i ochotę",
              },
              {
                icon: Banknote,
                title: "Twoje ceny",
                desc: "Sam ustalasz ile kosztuje miejsce",
              },
              {
                icon: Users,
                title: "Twoja pojemność",
                desc: "Od 4 do 12 gości — Ty decydujesz",
              },
              {
                icon: Utensils,
                title: "Twoje menu",
                desc: "Pełna wolność w tworzeniu menu",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-5 text-center"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H6 — CTA */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ChefHat className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gotowy, żeby gotować dla ludzi?
          </h2>
          <p className="text-muted-foreground/50 mb-8 text-lg">
            Wypełnij krótki formularz. Weryfikacja trwa 48h. Twoje pierwsze
            wydarzenie może być już w przyszłym tygodniu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=host">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary text-white font-semibold"
              >
                Zostań hostem
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/faq/hosts">
              <Button
                size="lg"
                variant="outline"
                className="border-muted-foreground text-muted-foreground/50 hover:bg-white/10"
              >
                FAQ dla hostów
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Ponad 50 hostów już gotuje na Seated
          </p>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   RESTAURANT PITCH DECK
   ============================================================ */
function RestaurantDeck() {
  return (
    <>
      {/* R1 — Revenue */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nowe źródło przychodu.
                <br />
                Zero inwestycji.
              </h2>
              <p className="text-lg text-muted-foreground">
                Organizuj ekskluzywne wydarzenia w swoim lokalu. Chef&apos;s
                table, degustacje, warsztaty — bez remontu, bez nowego personelu.
              </p>
            </div>
            <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <div className="text-sm text-muted-foreground mb-4 font-medium">
                Porównanie czwartku
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Zwykły czwartek</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 bg-muted rounded-full h-3">
                      <div className="bg-muted-foreground h-3 rounded-full w-[40%]" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      40%
                    </span>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="text-sm text-primary">
                    Czwartek z wydarzeniem Seated
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 bg-primary/20 rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full w-full" />
                    </div>
                    <span className="text-sm font-bold text-primary">
                      100%
                    </span>
                  </div>
                  <div className="text-right text-sm text-primary mt-2 font-medium">
                    12 osób × 250 zł = 3 000 zł
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R2 — Community */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 mx-auto">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dotknij społeczności foodies
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nasi goście to świadomi food lovers. Nie porównują cen — szukają
            jakości i wyjątkowych doświadczeń.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "500+", label: "aktywnych gości we Wrocławiu" },
              { value: "150 zł", label: "średnia wartość rezerwacji" },
              { value: "92%", label: "gości wraca na kolejne wydarzenie" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-border rounded-xl p-5"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/70 mt-6">
            Twoje wydarzenia widzą tysiące osób przeglądających platformę — za
            darmo
          </p>
        </div>
      </section>

      {/* R3 — Off-peak */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 mx-auto">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Poniedziałek pusty? Nie z nami.
            </h2>
            <p className="text-lg text-muted-foreground">
              Organizuj wydarzenia w godzinach i dniach, gdy lokal świeci
              pustkami.
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 min-w-[500px]">
              {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground pb-2"
                >
                  {day}
                </div>
              ))}
              {[
                { day: "Pon", event: true },
                { day: "Wt", event: true },
                { day: "Śr", event: false },
                { day: "Czw", event: false },
                { day: "Pt", event: false },
                { day: "Sob", event: false },
                { day: "Ndz", event: true },
              ].map((d) => (
                <div
                  key={d.day}
                  className={`rounded-lg p-3 text-center text-xs ${
                    d.event
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-muted/50 border border-border/50"
                  }`}
                >
                  <div className="h-8 flex items-center justify-center">
                    {d.event ? (
                      <span className="text-primary font-medium">
                        Seated
                      </span>
                    ) : (
                      <span className="text-muted-foreground/70">Normalna obsługa</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* R4 — Prestige */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ekskluzywne wydarzenia budują prestiż
          </h2>
          <p className="text-muted-foreground/50 mb-10 text-lg max-w-2xl mx-auto">
            Twoja restauracja staje się miejscem docelowym, nie przypadkowym
            wyborem.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Award,
                title: "Kolacja Degustacyjna",
                desc: "Limitowane miejsca, wyjątkowe menu",
              },
              {
                icon: Wine,
                title: "Wine Dinner",
                desc: "Kolacja z doborem win",
              },
              {
                icon: GraduationCap,
                title: "Warsztaty",
                desc: "Naucz gości swoich technik",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-muted-foreground/30 rounded-xl p-5"
              >
                <item.icon className="w-7 h-7 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R5 — Data & Reviews */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Poznaj swoich gości lepiej
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Panel hosta daje Ci wgląd w dane, opinie i statystyki.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: Star,
                    text: "Szczegółowe recenzje po każdym wydarzeniu",
                  },
                  {
                    icon: BarChart3,
                    text: "Statystyki: przychody, popularność, trendy",
                  },
                  {
                    icon: MessageSquare,
                    text: "Bezpośredni kontakt z zaangażowaną społecznością",
                  },
                  {
                    icon: TrendingUp,
                    text: "Insighty: co się podoba, co poprawić",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <div className="text-sm text-muted-foreground mb-4 font-medium">
                Panel restauracji
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.8</div>
                  <div className="text-xs text-muted-foreground">Średnia ocena</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-xs text-muted-foreground">Wydarzeń</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">96</div>
                  <div className="text-xs text-muted-foreground">Gości</div>
                </div>
              </div>
              <div className="space-y-2">
                {[85, 72, 60, 45].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground/70 w-16">
                      {["Sty", "Lut", "Mar", "Kwi"][i]}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R6 — CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gotowy na nowy rozdział dla Twojej restauracji?
          </h2>
          <p className="text-primary/30 mb-8 text-lg">
            Wypełnij formularz. Nasz zespół skontaktuje się w ciągu 48h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=host">
              <Button
                size="lg"
                variant="secondary"
                className="text-primary font-semibold"
              >
                Zarejestruj restaurację
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="mailto:kontakt@seated.pl">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Umów rozmowę
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-primary/50">
            <span>15% prowizji</span>
            <span>·</span>
            <span>Bez opłat stałych</span>
            <span>·</span>
            <span>Rezygnacja w każdej chwili</span>
          </div>
        </div>
      </section>
    </>
  );
}
