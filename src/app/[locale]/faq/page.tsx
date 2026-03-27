import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems, getFAQByCategory } from "@/lib/mock-data";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, HelpCircle, Calendar, ChefHat, CreditCard } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { AnimatedBlob } from "@/components/ui/organic-blob";

type CategoryId = "general" | "booking" | "hosts" | "payments";

interface Category {
  id: CategoryId;
  icon: LucideIcon;
}

const categoryData: Category[] = [
  { id: "general", icon: HelpCircle },
  { id: "booking", icon: Calendar },
  { id: "hosts", icon: ChefHat },
  { id: "payments", icon: CreditCard },
];

export default async function FAQPage() {
  const t = await getTranslations("faqPage");

  return (
    <PageTransition className="min-h-screen bg-muted/50 relative overflow-hidden">
      {/* Decorative blobs */}
      <AnimatedBlob variant={2} className="-right-20 top-16 w-[300px] h-[300px] hidden md:block z-0" opacity={0.10} duration={25} rotate={[-4, 4]} />
      <AnimatedBlob variant={6} className="-left-24 bottom-[20%] w-[260px] h-[260px] hidden md:block z-0" opacity={0.08} duration={20} rotate={[-3, 3]} />

      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-muted/50 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>
          <FadeInUp>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}{" "}
            <a
              href="mailto:kontakt@seated.pl"
              className="text-primary hover:underline"
            >
              {t("contactLink")}
            </a>
          </p>
          </FadeInUp>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-10">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categoryData.map((category) => (
            <StaggerItem key={category.id}>
            <a
              href={`#${category.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t(`categories.${category.id}.label`)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(`categories.${category.id}.description`)}
                  </p>
                </CardContent>
              </Card>
            </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 relative z-10">
        {categoryData.map((category) => {
          const items = getFAQByCategory(category.id);
          return (
            <FadeInUp key={category.id}>
            <section id={category.id} className="mb-12 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t(`categories.${category.id}.label`)}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-white rounded-lg border px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-foreground">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
            </FadeInUp>
          );
        })}

        {/* Contact CTA */}
        <FadeInUp>
        <Card className="bg-foreground text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t("contact.title")}
            </h3>
            <p className="text-muted-foreground/50 mb-6 max-w-md mx-auto">
              {t("contact.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:kontakt@seated.pl">
                <Button className="bg-primary/50 hover:bg-primary text-foreground">
                  {t("contact.writeToUs")}
                </Button>
              </a>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground"
                >
                  {t("contact.howItWorks")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </FadeInUp>
      </div>
    </PageTransition>
  );
}
