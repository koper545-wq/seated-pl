import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events";
import { FAQSection } from "@/components/faq-section";
import {
  ChefHat,
  Wine,
  Utensils,
  GraduationCap,
  Bike,
  TreePine,
  Star,
  Shield,
  CreditCard,
  Crown,
} from "lucide-react";

const categories = [
  {
    name: "Supper Club",
    slug: "supper-club",
    icon: Utensils,
    color: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    description: "Intymne kolacje w domach",
  },
  {
    name: "Chef's Table",
    slug: "chefs-table",
    icon: Crown,
    color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    description: "Ekskluzywne menu od szefów kuchni",
  },
  {
    name: "Pop-up",
    slug: "popup",
    icon: ChefHat,
    color: "bg-rose-100 text-rose-700 hover:bg-rose-200",
    description: "Tymczasowe restauracje",
  },
  {
    name: "Warsztaty",
    slug: "warsztaty",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    description: "Naucz się gotować",
  },
  {
    name: "Degustacje",
    slug: "degustacje",
    icon: Wine,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    description: "Wina, piwa, whisky",
  },
  {
    name: "Active + Food",
    slug: "active-food",
    icon: Bike,
    color: "bg-green-100 text-green-700 hover:bg-green-200",
    description: "Sport i jedzenie",
  },
  {
    name: "Farm Experience",
    slug: "farm",
    icon: TreePine,
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    description: "Od pola do stołu",
  },
];

const mockEvents = [
  {
    id: "1",
    title: "Włoska Kolacja u Ani - Toskańskie Smaki",
    type: "Supper Club",
    date: "Sob, 15 Lut · 19:00",
    location: "Stare Miasto, Wrocław",
    price: 150,
    spotsLeft: 4,
    imageGradient: "from-amber-200 to-orange-300",
  },
  {
    id: "2",
    title: "Sushi Masterclass - Od Podstaw do Mistrza",
    type: "Warsztaty",
    date: "Wt, 18 Lut · 18:00",
    location: "Nadodrze, Wrocław",
    price: 200,
    spotsLeft: 6,
    imageGradient: "from-rose-200 to-pink-300",
  },
  {
    id: "3",
    title: "Naturalne Wina Gruzji - Degustacja",
    type: "Degustacje",
    date: "Pt, 22 Lut · 20:00",
    location: "Śródmieście, Wrocław",
    price: 120,
    spotsLeft: 2,
    imageGradient: "from-purple-200 to-violet-300",
  },
  {
    id: "4",
    title: "Thai Street Food Pop-up",
    type: "Pop-up",
    date: "Sob, 1 Mar · 18:00",
    location: "Przedmieście Oławskie",
    price: 89,
    spotsLeft: 0,
    imageGradient: "from-orange-200 to-red-300",
  },
  {
    id: "5",
    title: "Bieg + Brunch - Poranna Energia",
    type: "Active + Food",
    date: "Nd, 2 Mar · 09:00",
    location: "Park Szczytnicki",
    price: 75,
    spotsLeft: 12,
    imageGradient: "from-green-200 to-teal-300",
  },
  {
    id: "6",
    title: "Gruzińskie Chinkali - Warsztat Lepienia",
    type: "Warsztaty",
    date: "Śr, 5 Mar · 18:30",
    location: "Ołbin, Wrocław",
    price: 160,
    spotsLeft: 8,
    imageGradient: "from-yellow-200 to-amber-300",
  },
];

const testimonials = [
  {
    name: "Kasia M.",
    text: "Niesamowite doświadczenie! Kolacja u Ani była jak wizyta u przyjaciela, który okazał się mistrzem kuchni.",
    event: "Włoska Kolacja",
    rating: 5,
  },
  {
    name: "Tomek W.",
    text: "Warsztaty sushi otworzyły mi oczy na to, jak dużo jest do nauczenia. Wrócę po więcej!",
    event: "Sushi Masterclass",
    rating: 5,
  },
  {
    name: "Anna K.",
    text: "Degustacja win była prowadzona przez prawdziwego pasjonata. Poznałam historie, których nie znajdę w żadnym sklepie.",
    event: "Wina Naturalne",
    rating: 5,
  },
];

const benefits = [
  {
    icon: Star,
    title: "Zweryfikowani hosty",
    description:
      "Każdy host przechodzi weryfikację. Sprawdzamy miejsca i umiejętności.",
  },
  {
    icon: Shield,
    title: "Bezpieczne płatności",
    description:
      "Płacisz przez platformę. Pełny zwrot jeśli wydarzenie się nie odbędzie.",
  },
  {
    icon: CreditCard,
    title: "Transparentne ceny",
    description:
      "Wiesz dokładnie za co płacisz. Bez ukrytych opłat i niespodzianek.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-amber-50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
              Wrocław
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Odkryj wyjątkowe{" "}
              <span className="text-amber-600">doświadczenia kulinarne</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Supper clubs, pop-upy, warsztaty gotowania i więcej. Dołącz do
              społeczności food lovers i przeżyj niezapomniane chwile przy
              stole.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-base h-12 px-8"
                asChild
              >
                <Link href="/events">Przeglądaj wydarzenia</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-8"
                asChild
              >
                <Link href="/become-host">Zostań hostem</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Już <span className="font-semibold text-foreground">500+</span>{" "}
              osób odkryło nowe smaki we Wrocławiu
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Wybierz swoją przygodę
          </h2>
          <p className="text-muted-foreground">
            Od intymnych kolacji po aktywne spotkania - znajdź coś dla siebie
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/events?type=${category.slug}`}>
              <Card
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-200`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className={`p-3 rounded-full ${category.color} mb-3 transition-colors`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground mt-1 hidden md:block">
                    {category.description}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Nadchodzące wydarzenia
              </h2>
              <p className="text-muted-foreground mt-1">
                Rezerwuj miejsca zanim się skończą
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">Zobacz wszystkie</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Dlaczego Seated?
          </h2>
          <p className="text-muted-foreground">
            Tworzymy bezpieczne miejsce dla kulinarnych odkrywców
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Jak to działa?
            </h2>
            <p className="text-muted-foreground">
              Trzy proste kroki do kulinarnej przygody
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Znajdź wydarzenie",
                description:
                  "Przeglądaj kulinarne doświadczenia w Twoim mieście. Filtruj po typie, dacie i cenie.",
              },
              {
                step: "2",
                title: "Zarezerwuj miejsce",
                description:
                  "Bezpiecznie opłać rezerwację online. Pełny adres otrzymasz w potwierdzeniu.",
              },
              {
                step: "3",
                title: "Ciesz się!",
                description:
                  "Poznaj nowych ludzi, odkryj nowe smaki i przeżyj niezapomniane chwile przy stole.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-amber-200" />
                )}
                <div className="w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Co mówią uczestnicy
          </h2>
          <p className="text-muted-foreground">
            Prawdziwe opinie od prawdziwych food lovers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 text-sm italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{testimonial.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {testimonial.event}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Masz talent kulinarny? Podziel się nim!
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto text-lg">
            Zostań hostem i zacznij organizować własne wydarzenia kulinarne.
            Pomożemy Ci zacząć - od planowania po promocję.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-base h-12 px-8"
              asChild
            >
              <Link href="/become-host">Zostań hostem</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/how-it-works">Dowiedz się więcej</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-amber-200">
            Dołącz do <span className="font-semibold">50+</span> hostów we
            Wrocławiu
          </p>
        </div>
      </section>
    </div>
  );
}
