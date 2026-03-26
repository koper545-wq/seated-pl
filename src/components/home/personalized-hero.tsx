"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Calendar, Plus, Utensils } from "lucide-react";

interface PersonalizedHeroProps {
  userRole: "guest" | "host";
  userName: string;
  t: Record<string, string>;
}

export function PersonalizedHero({ userRole, userName, t }: PersonalizedHeroProps) {
  const firstName = userName.split(" ")[0];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <AnimatedBlob
        variant={1}
        className="right-0 top-0 w-[300px] h-[300px] hidden md:block z-0"
        opacity={0.12}
        duration={22}
        rotate={[-5, 5]}
      />
      <AnimatedBlob
        variant={5}
        className="-left-16 bottom-10 w-[250px] h-[250px] hidden lg:block z-0"
        opacity={0.15}
        duration={26}
        scale={[0.95, 1.05]}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn duration={0.4}>
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10 border-primary/20">
              {t.badge}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t.greeting}, <span className="text-primary">{firstName}</span> 👋
            </h1>
          </FadeIn>
          <FadeInUp delay={0.15} duration={0.4} distance={15}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {userRole === "host" ? t.hostSubtitle : t.guestSubtitle}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.25} duration={0.4} distance={15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userRole === "host" ? (
                <>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/dashboard/host/events/new">
                      <Plus className="mr-2 h-5 w-5" />
                      {t.hostCta}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/dashboard/host">
                      <Calendar className="mr-2 h-5 w-5" />
                      {t.hostCtaSecondary}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/events">
                      <Utensils className="mr-2 h-5 w-5" />
                      {t.guestCta}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base h-12 px-8"
                    asChild
                  >
                    <Link href="/dashboard/bookings">
                      <Calendar className="mr-2 h-5 w-5" />
                      {t.guestCtaSecondary}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
