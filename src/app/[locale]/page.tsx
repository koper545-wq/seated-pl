import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events";
import { FAQSection } from "@/components/faq-section";
import {
  PageTransition,
  FadeIn,
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { getTranslations } from "next-intl/server";
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
  LucideIcon,
} from "lucide-react";

interface Category {
  nameKey: string;
  descKey: string;
  slug: string;
  icon: LucideIcon;
  color: string;
}

const categories: Category[] = [
  {
    nameKey: "supperClub",
    descKey: "supperClubDesc",
    slug: "supper-club",
    icon: Utensils,
    color: "bg-primary/10 text-primary hover:bg-primary/15",
  },
  {
    nameKey: "chefsTable",
    descKey: "chefsTableDesc",
    slug: "chefs-table",
    icon: Crown,
    color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  },
  {
    nameKey: "popup",
    descKey: "popupDesc",
    slug: "popup",
    icon: ChefHat,
    color: "bg-rose-100 text-rose-700 hover:bg-rose-200",
  },
  {
    nameKey: "workshops",
    descKey: "workshopsDesc",
    slug: "warsztaty",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  {
    nameKey: "tastings",
    descKey: "tastingsDesc",
    slug: "degustacje",
    icon: Wine,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
  {
    nameKey: "activeFood",
    descKey: "activeFoodDesc",
    slug: "active-food",
    icon: Bike,
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  {
    nameKey: "farmExperience",
    descKey: "farmExperienceDesc",
    slug: "farm",
    icon: TreePine,
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  },
];

const mockEvents = [
  {
    id: "1",
    title: "Italian Dinner at Anna's - Tuscan Flavors",
    type: "Supper Club",
    date: "Sat, Feb 15 · 7:00 PM",
    location: "Old Town, Wrocław",
    price: 150,
    spotsLeft: 4,
    imageGradient: "from-primary/15 to-orange-300",
  },
  {
    id: "2",
    title: "Sushi Masterclass - From Basics to Master",
    type: "Workshops",
    date: "Tue, Feb 18 · 6:00 PM",
    location: "Nadodrze, Wrocław",
    price: 200,
    spotsLeft: 6,
    imageGradient: "from-rose-200 to-pink-300",
  },
  {
    id: "3",
    title: "Georgian Natural Wines - Tasting",
    type: "Tastings",
    date: "Fri, Feb 22 · 8:00 PM",
    location: "Downtown, Wrocław",
    price: 120,
    spotsLeft: 2,
    imageGradient: "from-purple-200 to-violet-300",
  },
  {
    id: "4",
    title: "Thai Street Food Pop-up",
    type: "Pop-up",
    date: "Sat, Mar 1 · 6:00 PM",
    location: "Przedmieście Oławskie",
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
    location: "Ołbin, Wrocław",
    price: 160,
    spotsLeft: 8,
    imageGradient: "from-yellow-200 to-primary/20",
  },
];

const benefitIcons = [Star, Shield, CreditCard];
const benefitKeys = ["verified", "secure", "transparent"] as const;

export default async function Home() {
  const t = await getTranslations("home");

  const testimonials = [
    {
      name: t("testimonials.items.0.name"),
      text: t("testimonials.items.0.text"),
      event: t("testimonials.items.0.event"),
      rating: 5,
    },
    {
      name: t("testimonials.items.1.name"),
      text: t("testimonials.items.1.text"),
      event: t("testimonials.items.1.event"),
      rating: 5,
    },
    {
      name: t("testimonials.items.2.name"),
      text: t("testimonials.items.2.text"),
      event: t("testimonials.items.2.event"),
      rating: 5,
    },
  ];

  const steps = [
    {
      step: "1",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      step: "2",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      step: "3",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
  ];

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn duration={0.4}>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10 border-primary/20">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  {t("hero.title")}{" "}
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>
              </FadeIn>
              <FadeInUp delay={0.15} duration={0.4} distance={15}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t("hero.subtitle")}
                </p>
              </FadeInUp>
              <FadeInUp delay={0.25} duration={0.4} distance={15}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/events">{t("hero.cta")}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/become-host">{t("hero.ctaSecondary")}</Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  {t("hero.stats", { count: "500" })}
                </p>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 container mx-auto px-4">
          <FadeInUp duration={0.4} distance={15}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t("categories.title")}
              </h2>
              <p className="text-muted-foreground">{t("categories.subtitle")}</p>
            </div>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <StaggerItem key={category.slug}>
                <Link href={`/events?type=${category.slug}`}>
                  <Card
                    className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20`}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div
                        className={`p-3 rounded-full ${category.color} mb-3 transition-colors`}
                      >
                        <category.icon className="h-6 w-6" />
                      </div>
                      <span className="font-medium text-sm">
                        {t(`categories.${category.nameKey}`)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 hidden md:block">
                        {t(`categories.${category.descKey}`)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <FadeInUp duration={0.4} distance={15}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t("featured.title")}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {t("featured.subtitle")}
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/events">{t("featured.viewAll")}</Link>
                </Button>
              </div>
            </FadeInUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard {...event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 container mx-auto px-4">
          <FadeInUp duration={0.4} distance={15}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t("benefits.title")}
              </h2>
              <p className="text-muted-foreground">{t("benefits.subtitle")}</p>
            </div>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefitKeys.map((key, index) => {
              const Icon = benefitIcons[index];
              return (
                <StaggerItem key={key}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {t(`benefits.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`benefits.${key}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <FadeInUp duration={0.4} distance={15}>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {t("howItWorks.title")}
                </h2>
                <p className="text-muted-foreground">{t("howItWorks.subtitle")}</p>
              </div>
            </FadeInUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((item, index) => (
                <StaggerItem key={item.step}>
                  <div className="relative text-center">
                    {index < 2 && (
                      <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-primary/15" />
                    )}
                    <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 relative z-10">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container mx-auto px-4">
          <FadeInUp duration={0.4} distance={15}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t("testimonials.title")}
              </h2>
              <p className="text-muted-foreground">{t("testimonials.subtitle")}</p>
            </div>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <Card className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary/60 text-primary/60"
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <FadeInUp duration={0.5} distance={20}>
          <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base h-12 px-8"
                  asChild
                >
                  <Link href="/become-host">{t("cta.button")}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/how-it-works">{t("cta.learnMore")}</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/70">
                {t("cta.stats", { count: "50" })}
              </p>
            </div>
          </section>
        </FadeInUp>
      </div>
    </PageTransition>
  );
}
