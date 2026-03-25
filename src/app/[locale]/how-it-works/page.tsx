import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { OrganicBlob } from "@/components/ui/organic-blob";
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
  LucideIcon,
} from "lucide-react";

interface Step {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: string;
}

const steps: Step[] = [
  {
    icon: Search,
    titleKey: "step1",
    descKey: "step1",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CalendarCheck,
    titleKey: "step2",
    descKey: "step2",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    titleKey: "step3",
    descKey: "step3",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Utensils,
    titleKey: "step4",
    descKey: "step4",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Star,
    titleKey: "step5",
    descKey: "step5",
    color: "bg-pink-100 text-pink-600",
  },
];

interface Feature {
  icon: LucideIcon;
  key: string;
}

const features: Feature[] = [
  { icon: Shield, key: "securePayments" },
  { icon: Users, key: "verifiedHosts" },
  { icon: Clock, key: "flexibleCancellation" },
  { icon: Heart, key: "foodieCommunity" },
];

const eventTypeKeys = [
  { key: "supperClub", emoji: "🍽️", slug: "supper-club" },
  { key: "chefsTable", emoji: "👑", slug: "chefs-table" },
  { key: "workshops", emoji: "👨‍🍳", slug: "warsztaty" },
  { key: "tastings", emoji: "🍷", slug: "degustacje" },
  { key: "popup", emoji: "🎪", slug: "popup" },
  { key: "activeFood", emoji: "🏃", slug: "active-food" },
  { key: "farmExperience", emoji: "🌾", slug: "farm" },
];

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorksPage");

  return (
    <PageTransition className="min-h-screen bg-muted/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-muted/50 py-16 md:py-24 overflow-hidden">
        <OrganicBlob variant="hero" className="right-0 top-0 w-[500px] h-[350px] opacity-50 hidden md:block" />
        <OrganicBlob variant="sage" className="-left-20 bottom-0 w-[300px] h-[250px] opacity-40 hidden lg:block" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button size="lg" className="bg-primary/50 hover:bg-primary">
                  {t("hero.cta")}
                </Button>
              </Link>
              <Link href="/become-host">
                <Button size="lg" variant="outline">
                  {t("hero.ctaSecondary")}
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <OrganicBlob variant="terra" className="-right-24 top-20 w-[350px] h-[300px] opacity-35 hidden md:block" />
        <OrganicBlob variant="sage" className="-left-24 bottom-20 w-[350px] h-[300px] opacity-30 hidden md:block" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            {t("steps.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("steps.subtitle")}
          </p>

          <StaggerContainer className="space-y-8">
            {steps.map((step, index) => (
              <StaggerItem key={step.titleKey}>
              <div
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
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(`steps.${step.titleKey}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`steps.${step.descKey}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex justify-center -my-4 relative z-10" aria-hidden="true">
        <img src="/splash-accent.svg" alt="" className="w-32 h-16 opacity-60" />
      </div>

      {/* Event Types Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            {t("eventTypes.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("eventTypes.subtitle")}
          </p>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypeKeys.map((type) => (
              <StaggerItem key={type.key}>
              <Link href={`/events?type=${type.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <span className="text-5xl mb-4 block">{type.emoji}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {t(`eventTypes.${type.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`eventTypes.${type.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex justify-center -my-4 relative z-10" aria-hidden="true">
        <img src="/splash-accent.svg" alt="" className="w-32 h-16 opacity-60" />
      </div>

      {/* Features Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            {t("features.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.key}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* For Hosts Section */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <FadeInUp>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-6 text-primary/60" />
          <h2 className="text-3xl font-bold mb-4">{t("forHosts.title")}</h2>
          <p className="text-muted-foreground/50 mb-8 max-w-2xl mx-auto">
            {t("forHosts.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-host">
              <Button
                size="lg"
                className="bg-primary/50 hover:bg-primary text-foreground"
              >
                {t("forHosts.cta")}
              </Button>
            </Link>
            <Link href="/faq/hosts">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-foreground"
              >
                {t("forHosts.ctaSecondary")}
              </Button>
            </Link>
          </div>
        </div>
        </FadeInUp>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-primary/5">
        <FadeInUp>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("cta.subtitle")}</p>
          <Link href="/register">
            <Button size="lg" className="bg-primary/50 hover:bg-primary">
              {t("cta.button")}
            </Button>
          </Link>
        </div>
        </FadeInUp>
      </section>
    </PageTransition>
  );
}
