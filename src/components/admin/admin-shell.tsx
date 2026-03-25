"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/analytics", label: "Analityka", icon: "📈" },
  { href: "/admin/hosts", label: "Hosty", icon: "👨‍🍳" },
  { href: "/admin/events", label: "Wydarzenia", icon: "🎉" },
  { href: "/admin/users", label: "Użytkownicy", icon: "👥" },
  { href: "/admin/reports", label: "Zgłoszenia", icon: "🚨" },
  { href: "/admin/badges", label: "Odznaki", icon: "🏅" },
  { href: "/admin/vouchers", label: "Kupony", icon: "🎟️" },
  { href: "/admin/settings", label: "Ustawienia", icon: "⚙️" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/admin" && pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Header */}
      <header className="bg-foreground text-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu nawigacji</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <SheetHeader className="px-4 py-4 border-b bg-foreground text-white">
                    <SheetTitle className="text-left text-white">
                      Seated <span className="text-primary/60">Admin</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive(item.href)
                              ? "bg-primary/5 text-primary"
                              : "text-muted-foreground hover:bg-muted/50"
                          )}
                        >
                          <span className="text-xl">{item.icon}</span>
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← Wroc do strony
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/admin" className="text-xl font-bold">
                Seated <span className="text-primary/60">Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="hidden sm:inline text-sm text-muted-foreground/70 hover:text-white"
              >
                ← Wroc do strony
              </Link>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center text-sm font-bold">
                  A
                </span>
                <span className="text-sm hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border min-h-[calc(100vh-56px)] sticky top-14 hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
