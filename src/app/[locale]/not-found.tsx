import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Search, CalendarDays } from "lucide-react";
import { AnimatedBlob } from "@/components/ui/organic-blob";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AnimatedBlob variant={1} className="absolute -top-20 -right-20 w-72 h-72 hidden md:block z-0" opacity={0.10} duration={22} rotate={[-3, 3]} />
      <AnimatedBlob variant={2} className="absolute -bottom-16 -left-16 w-64 h-64 hidden md:block z-0" opacity={0.08} duration={26} rotate={[-2, 2]} />
      <AnimatedBlob variant={6} className="absolute top-1/3 left-1/4 w-48 h-48 hidden md:block z-0" opacity={0.08} duration={30} rotate={[-4, 4]} />
      <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Search className="h-10 w-10 text-primary" />
      </div>

      <h1 className="relative z-10 text-8xl font-bold tracking-tight text-primary">404</h1>

      <h2 className="relative z-10 mt-4 text-2xl font-semibold text-foreground">
        Ups! Tej strony nie znaleźliśmy
      </h2>

      <p className="relative z-10 mt-2 max-w-md text-muted-foreground">
        Strona której szukasz nie istnieje lub została przeniesiona.
      </p>

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Wróć na stronę główną</Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/events">
            <CalendarDays className="mr-2 h-4 w-4" />
            Przeglądaj wydarzenia
          </Link>
        </Button>
      </div>
    </div>
  );
}
