"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  guestLevels,
  hostLevels,
  xpActions,
  badges,
  rewards,
  getXPProgress,
  LevelInfo,
  MockBadge,
  Reward,
} from "@/lib/mock-data";
import {
  Trophy,
  Star,
  Gift,
  Zap,
  Users,
  ChefHat,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { AnimatedBlob } from "@/components/ui/organic-blob";
import { PageTransition, FadeInUp } from "@/components/ui/motion";

// Rarity colors
const rarityColors = {
  common: "border bg-muted/50",
  uncommon: "border-green-300 bg-green-50",
  rare: "border-blue-300 bg-blue-50",
  epic: "border-purple-300 bg-purple-50",
  legendary: "border-primary/40 bg-primary/5",
};

const rarityLabels = {
  common: { en: "Common", pl: "Zwykła" },
  uncommon: { en: "Uncommon", pl: "Niezwykła" },
  rare: { en: "Rare", pl: "Rzadka" },
  epic: { en: "Epic", pl: "Epicka" },
  legendary: { en: "Legendary", pl: "Legendarna" },
};

const badgeCategoryLabels: Record<string, { en: string; pl: string }> = {
  activity: { en: "Activity", pl: "Aktywność" },
  cuisine: { en: "Cuisine", pl: "Kuchnie" },
  social: { en: "Social", pl: "Społeczność" },
  seasonal: { en: "Seasonal", pl: "Sezonowe" },
  special: { en: "Special", pl: "Specjalne" },
  host_activity: { en: "Activity", pl: "Aktywność" },
  host_quality: { en: "Quality", pl: "Jakość" },
  host_community: { en: "Community", pl: "Społeczność" },
};

function LevelCard({ level, isCurrentExample }: { level: LevelInfo; isCurrentExample?: boolean }) {
  return (
    <Card className={`relative overflow-hidden ${isCurrentExample ? "ring-2 ring-primary/80" : ""}`}>
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${level.color}`} />
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-xl`}>
            {level.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{level.namePl}</span>
              <Badge variant="outline" className="text-xs">
                Poziom {level.level}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {level.minXP.toLocaleString()} - {level.maxXP === 999999 ? "∞" : level.maxXP.toLocaleString()} XP
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          {level.benefitsPl.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BadgeCard({ badge }: { badge: MockBadge }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`p-3 rounded-lg border-2 ${rarityColors[badge.rarity]} cursor-help transition-transform hover:scale-105`}>
            <div className="text-center">
              <span className="text-2xl block mb-1">{badge.icon}</span>
              <p className="font-medium text-xs text-foreground line-clamp-1">{badge.namePl}</p>
              <Badge variant="outline" className={`text-[10px] mt-1 ${badge.tier === "gold" ? "border-primary/40 text-primary" : badge.tier === "silver" ? "border-muted-foreground/50 text-muted-foreground" : "border-orange-300 text-orange-700"}`}>
                {badge.tier === "gold" ? "Złota" : badge.tier === "silver" ? "Srebrna" : "Brązowa"}
              </Badge>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{badge.icon}</span>
              <span className="font-bold">{badge.namePl}</span>
            </div>
            <p className="text-sm text-muted-foreground">{badge.descriptionPl}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Wymaganie:</span>
              <span>{badge.requirementPl}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Nagroda XP:</span>
              <span className="font-medium text-primary">+{badge.xpReward} XP</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Rzadkość:</span>
              <Badge variant="outline" className={`text-[10px] ${rarityColors[badge.rarity]}`}>
                {rarityLabels[badge.rarity].pl}
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function RewardCard({ reward }: { reward: Reward }) {
  const isXPPurchasable = !!reward.xpCost;
  const isTierLocked = !!reward.minTier;

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            {reward.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm">{reward.namePl}</h4>
            <p className="text-xs text-muted-foreground mt-1">{reward.descriptionPl}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          {isXPPurchasable ? (
            <Badge className="bg-primary/50 hover:bg-primary">
              <Zap className="w-3 h-3 mr-1" />
              {reward.xpCost?.toLocaleString()} XP
            </Badge>
          ) : isTierLocked ? (
            <Badge variant="outline" className="text-xs">
              Od poziomu: {reward.minTier === "regular" ? "Stały Bywalec" :
                reward.minTier === "insider" ? "Wtajemniczony" :
                reward.minTier === "vip" ? "VIP" :
                reward.minTier === "featured" ? "Wyróżniony" :
                reward.minTier === "star" ? "Gwiazda" :
                reward.minTier === "superhost" ? "Superhost" : reward.minTier}
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">Automatycznie</Badge>
          )}
          {reward.type === "discount" && (
            <span className="text-green-600 font-bold text-sm">-{reward.discountPercent}%</span>
          )}
          {reward.type === "voucher" && (
            <span className="text-green-600 font-bold text-sm">{reward.voucherValue} zł</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Example XP for demo
  const demoXP = 1250;
  const demoProgress = getXPProgress(demoXP, guestLevels);

  // Group badges by category
  const guestBadges = badges.filter(b => b.category === "guest");
  const hostBadges = badges.filter(b => b.category === "host");

  // Group rewards
  const guestRewards = rewards.filter(r => r.forRole === "guest" || r.forRole === "both");
  const hostRewards = rewards.filter(r => r.forRole === "host" || r.forRole === "both");
  const platformPerks = rewards.filter(r => !r.xpCost && r.isActive);
  const purchasableRewards = rewards.filter(r => r.xpCost && r.isActive);

  return (
    <PageTransition className="min-h-screen bg-muted/50 relative overflow-hidden">
      {/* Decorative blobs */}
      <AnimatedBlob variant={1} className="absolute top-80 -right-40 w-[500px] h-[500px] hidden md:block z-0" opacity={0.10} duration={24} rotate={[-3, 3]} />
      <AnimatedBlob variant={2} className="absolute bottom-60 -left-36 w-96 h-96 hidden md:block z-0" opacity={0.12} duration={30} rotate={[-2, 2]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-muted/50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInUp>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            System nagród Seated
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Zdobywaj XP, Odblokuj Nagrody
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Im więcej uczestniczysz w wydarzeniach i angażujesz się w społeczność,
            tym więcej benefitów odblokowujesz. Odkryj nasz system gamifikacji!
          </p>
          </FadeInUp>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Przegląd</span>
              </TabsTrigger>
              <TabsTrigger value="levels" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Poziomy</span>
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Odznaki</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Nagrody</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* How it works */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary/80" />
                    Jak działa system XP?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚡</span>
                      </div>
                      <h3 className="font-bold text-foreground mb-2">Zdobywaj XP</h3>
                      <p className="text-sm text-muted-foreground">
                        Za udział w wydarzeniach, opinie, polecenia znajomym i inne aktywności
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📈</span>
                      </div>
                      <h3 className="font-bold text-foreground mb-2">Awansuj na wyższe poziomy</h3>
                      <p className="text-sm text-muted-foreground">
                        Każdy poziom odblokowuje nowe benefity i przywileje na platformie
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎁</span>
                      </div>
                      <h3 className="font-bold text-foreground mb-2">Odbieraj nagrody</h3>
                      <p className="text-sm text-muted-foreground">
                        Wymieniaj XP na zniżki, vouchery i ekskluzywne perki
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo progress */}
              <Card className="bg-gradient-to-r from-primary/50 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-primary-foreground/80 text-sm">Przykład: Twoje XP</p>
                      <p className="text-3xl font-bold">{demoXP.toLocaleString()} XP</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-foreground/80 text-sm">Aktualny poziom</p>
                      <p className="text-xl font-bold flex items-center gap-2">
                        🌟 Entuzjasta
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Postęp do następnego poziomu</span>
                      <span>{demoProgress.current} / {demoProgress.max} XP</span>
                    </div>
                    <Progress value={demoProgress.percent} className="h-3 bg-primary/30" />
                    <p className="text-xs text-primary-foreground/80">
                      Jeszcze {demoProgress.max - demoProgress.current} XP do poziomu Wtajemniczony 💎
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick XP actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary/80" />
                    Jak szybko zdobyć XP?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {xpActions.filter(a => a.category !== "hosting").slice(0, 9).map(action => (
                      <div key={action.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          +{action.xp}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{action.actionPl}</p>
                          <p className="text-xs text-muted-foreground">{action.descriptionPl}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Levels Tab */}
            <TabsContent value="levels" className="space-y-8">
              {/* Guest Levels */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-foreground">Poziomy dla Gości</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {guestLevels.map((level, i) => (
                    <LevelCard key={level.level} level={level} isCurrentExample={i === 3} />
                  ))}
                </div>
              </div>

              {/* Host Levels */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <ChefHat className="w-6 h-6 text-primary/80" />
                  <h2 className="text-2xl font-bold text-foreground">Poziomy dla Hostów</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hostLevels.map(level => (
                    <LevelCard key={level.level} level={level} />
                  ))}
                </div>
              </div>

              {/* XP Actions for Hosts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-primary/80" />
                    Jak hosty zdobywają XP?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {xpActions.filter(a => a.category === "hosting" || a.category === "quality").map(action => (
                      <div key={action.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          +{action.xp}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{action.actionPl}</p>
                          <p className="text-xs text-muted-foreground">{action.descriptionPl}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-8">
              {/* Legend */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-medium text-foreground">Rzadkość:</span>
                    {Object.entries(rarityLabels).map(([key, label]) => (
                      <div key={key} className={`px-3 py-1 rounded-full border ${rarityColors[key as keyof typeof rarityColors]}`}>
                        {label.pl}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Guest Badges */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-foreground">Odznaki dla Gości</h2>
                  <Badge variant="outline">{guestBadges.length} odznak</Badge>
                </div>

                {/* Group by badge category */}
                {["activity", "cuisine", "social", "special", "seasonal"].map(cat => {
                  const catBadges = guestBadges.filter(b => b.badgeCategory === cat);
                  if (catBadges.length === 0) return null;
                  return (
                    <div key={cat} className="mb-6">
                      <h3 className="text-lg font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        {cat === "activity" && "🎯"}
                        {cat === "cuisine" && "🍽️"}
                        {cat === "social" && "👥"}
                        {cat === "special" && "✨"}
                        {cat === "seasonal" && "🗓️"}
                        {badgeCategoryLabels[cat]?.pl || cat}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {catBadges.map(badge => (
                          <BadgeCard key={badge.id} badge={badge} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Host Badges */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <ChefHat className="w-6 h-6 text-primary/80" />
                  <h2 className="text-2xl font-bold text-foreground">Odznaki dla Hostów</h2>
                  <Badge variant="outline">{hostBadges.length} odznak</Badge>
                </div>

                {["host_activity", "host_quality", "host_community"].map(cat => {
                  const catBadges = hostBadges.filter(b => b.badgeCategory === cat);
                  if (catBadges.length === 0) return null;
                  return (
                    <div key={cat} className="mb-6">
                      <h3 className="text-lg font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        {cat === "host_activity" && "🎪"}
                        {cat === "host_quality" && "⭐"}
                        {cat === "host_community" && "🤝"}
                        {badgeCategoryLabels[cat]?.pl || cat}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {catBadges.map(badge => (
                          <BadgeCard key={badge.id} badge={badge} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-8">
              {/* Platform Perks */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-foreground">Automatyczne Perki</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Te benefity odblokowujesz automatycznie wraz z awansem na wyższe poziomy.
                </p>

                <h3 className="text-lg font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Dla Gości
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {platformPerks.filter(r => r.forRole === "guest").map(reward => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Dla Hostów
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platformPerks.filter(r => r.forRole === "host").map(reward => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>
              </div>

              {/* Purchasable with XP */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Gift className="w-6 h-6 text-primary/80" />
                  <h2 className="text-2xl font-bold text-foreground">Wymień XP na nagrody</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Zdobyte XP możesz wymieniać na zniżki, vouchery i inne nagrody w sklepie nagród.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {purchasableRewards.map(reward => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-primary/5">
        <FadeInUp>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Gotowy na kulinarną przygodę?
          </h2>
          <p className="text-muted-foreground mb-8">
            Dołącz do społeczności Seated i zacznij zdobywać XP już dziś!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-primary/50 hover:bg-primary">
                Przeglądaj wydarzenia
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Załóż konto
              </Button>
            </Link>
          </div>
        </div>
        </FadeInUp>
      </section>
    </PageTransition>
  );
}
