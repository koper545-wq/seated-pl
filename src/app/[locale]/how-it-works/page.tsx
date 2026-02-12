import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CalendarCheck,
  Utensils,
  Star,
  Users,
  ChefHat,
  MapPin,
  Heart,
  Shield,
  Clock,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Znajdź wydarzenie",
    description:
      "Przeglądaj nasze wydarzenia kulinarne we Wrocławiu. Filtruj według typu kuchni, daty lub lokalizacji. Od kameralnych kolacji po warsztaty gotowania.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: CalendarCheck,
    title: "2. Zarezerwuj miejsce",
    description:
      "Wybierz dogodny termin i liczbę osób. Bezpieczna płatność online. Otrzymasz potwierdzenie i szczegóły wydarzenia na e-mail.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "3. Otrzymaj lokalizację",
    description:
      "24h przed wydarzeniem otrzymasz dokładny adres i instrukcje dojazdu. Większość wydarzeń odbywa się w prywatnych domach lub unikalnych lokalizacjach.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Utensils,
    title: "4. Ciesz się doświadczeniem",
    description:
      "Poznaj nowych ludzi, odkryj niesamowite smaki i ciesz się wyjątkową atmosferą. To więcej niż jedzenie - to doświadczenie.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Star,
    title: "5. Zostaw opinię",
    description:
      "Po wydarzeniu możesz ocenić hosta i podzielić się wrażeniami. Twoja opinia pomaga innym znaleźć najlepsze doświadczenia.",
    color: "bg-pink-100 text-pink-600",
  },
];

const features = [
  {
    icon: Shield,
    title: "Bezpieczne płatności",
    description:
      "Wszystkie transakcje są szyfrowane i chronione. Płacisz dopiero po potwierdzeniu rezerwacji.",
  },
  {
    icon: Users,
    title: "Zweryfikowani hosty",
    description:
      "Każdy host przechodzi weryfikację. Sprawdzamy doświadczenie, certyfikaty i opinie.",
  },
  {
    icon: Clock,
    title: "Elastyczne anulowanie",
    description:
      "Możesz anulować rezerwację do 48h przed wydarzeniem i otrzymać pełny zwrot.",
  },
  {
    icon: Heart,
    title: "Społeczność foodie",
    description:
      "Dołącz do społeczności miłośników jedzenia. Śledź ulubionych hostów i odkrywaj nowe smaki.",
  },
];

const eventTypes = [
  {
    title: "Supper Club",
    description: "Wielodaniowa kolacja w prywatnym domu hosta",
    emoji: "🍽️",
  },
  {
    title: "Chef's Table",
    description: "Ekskluzywne menu degustacyjne od profesjonalnego szefa kuchni",
    emoji: "👑",
  },
  {
    title: "Warsztaty",
    description: "Naucz się gotować od profesjonalistów",
    emoji: "👨‍🍳",
  },
  {
    title: "Degustacje",
    description: "Odkryj wina, sery, kawę i inne specjały",
    emoji: "🍷",
  },
  {
    title: "Pop-up",
    description: "Tymczasowe restauracje w nieoczekiwanych miejscach",
    emoji: "🎪",
  },
  {
    title: "Active + Food",
    description: "Połączenie aktywności fizycznej z kulinarnym doświadczeniem",
    emoji: "🏃",
  },
  {
    title: "Farm Experience",
    description: "Od pola do stołu - poznaj lokalne gospodarstwa",
    emoji: "🌾",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-stone-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Jak działa Seated?
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
            Odkryj unikalne doświadczenia kulinarne we Wrocławiu. Łączymy
            pasjonatów jedzenia z utalentowanymi hostami w kameralnej atmosferze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                Przeglądaj wydarzenia
              </Button>
            </Link>
            <Link href="/become-host">
              <Button size="lg" variant="outline">
                Zostań hostem
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-stone-900 mb-4">
            5 prostych kroków
          </h2>
          <p className="text-stone-600 text-center mb-12 max-w-2xl mx-auto">
            Od odkrycia do doświadczenia - cały proces jest prosty i intuicyjny
          </p>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center`}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>
                <Card className="flex-1 w-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-stone-600">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-stone-900 mb-4">
            Rodzaje wydarzeń
          </h2>
          <p className="text-stone-600 text-center mb-12 max-w-2xl mx-auto">
            Wybierz doświadczenie, które Cię interesuje
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((type) => (
              <Link
                key={type.title}
                href={`/events?type=${type.title.toLowerCase().replace(/ /g, "-")}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <span className="text-5xl mb-4 block">{type.emoji}</span>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-stone-600 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-stone-900 mb-4">
            Dlaczego Seated?
          </h2>
          <p className="text-stone-600 text-center mb-12 max-w-2xl mx-auto">
            Bezpieczeństwo i jakość są dla nas najważniejsze
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Hosts Section */}
      <section className="py-16 md:py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-6 text-amber-400" />
          <h2 className="text-3xl font-bold mb-4">Jesteś pasjonatem gotowania?</h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Dołącz do naszej społeczności hostów i podziel się swoją pasją z
            innymi. Zarabiaj robiąc to, co kochasz, i poznawaj niesamowitych ludzi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-host">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                Zostań hostem
              </Button>
            </Link>
            <Link href="/faq/hosts">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-stone-900"
              >
                FAQ dla hostów
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Gotowy na kulinarne przygody?
          </h2>
          <p className="text-stone-600 mb-8">
            Dołącz do tysięcy osób, które odkrywają Wrocław przez smaki.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
              Załóż darmowe konto
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
