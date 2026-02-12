"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, User, LogOut, Settings, Calendar, Users, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { currentGuestProfile } from "@/lib/mock-data";

export function Header() {
  const t = useTranslations("nav");

  // Mock session for development - using mock data instead of NextAuth
  const session = {
    user: {
      name: `${currentGuestProfile.firstName} ${currentGuestProfile.lastName}`,
      email: currentGuestProfile.email,
      image: currentGuestProfile.avatar,
    }
  };
  const isLoading = false;

  const navigation = [
    { name: t("events"), href: "/events" },
    { name: t("howItWorks"), href: "/how-it-works" },
    { name: t("becomeHost"), href: "/become-host" },
    { name: t("giftCards"), href: "/gift-cards" },
  ];

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-600">Seated</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />

            {isLoading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("dashboard")}
                </Link>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={session.user.image || undefined}
                          alt={session.user.name || "User"}
                        />
                        <AvatarFallback className="bg-amber-100 text-amber-700">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle className="text-left">{t("myAccount")}</SheetTitle>
                    </SheetHeader>
                    <div className="flex items-center gap-3 mt-6 pb-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={session.user.image || undefined}
                          alt={session.user.name || "User"}
                        />
                        <AvatarFallback className="bg-amber-100 text-amber-700 text-lg">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <nav className="flex flex-col space-y-1 mt-4">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>{t("profile")}</span>
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>{t("myBookings")}</span>
                      </Link>
                      <Link
                        href="/dashboard/homies"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <Users className="h-4 w-4" />
                        <span>{t("homies")}</span>
                      </Link>
                      <Link
                        href="/dashboard/wishlist"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{t("wishlist")}</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>{t("settings")}</span>
                      </Link>
                      <hr className="my-2" />
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-red-600 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t("logout")}</span>
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/register">{t("register")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-amber-600">
                    Seated
                  </SheetTitle>
                </SheetHeader>

                {session?.user && (
                  <div className="flex items-center gap-3 mt-6 pb-4 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-amber-100 text-amber-700">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-amber-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <hr className="my-2" />

                  {session?.user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-lg font-medium text-foreground hover:text-amber-600 transition-colors"
                      >
                        {t("dashboard")}
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="text-lg font-medium text-foreground hover:text-amber-600 transition-colors"
                      >
                        {t("myBookings")}
                      </Link>
                      <Link
                        href="/login"
                        className="text-lg font-medium text-red-600 hover:text-red-700 transition-colors text-left"
                      >
                        {t("logout")}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-lg font-medium text-foreground hover:text-amber-600 transition-colors"
                      >
                        {t("login")}
                      </Link>
                      <Button
                        asChild
                        className="bg-amber-600 hover:bg-amber-700 mt-2"
                      >
                        <Link href="/register">{t("register")}</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
