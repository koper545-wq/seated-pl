import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Search, CalendarDays } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Search className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-8xl font-bold tracking-tight text-primary">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Ups! Tej strony nie znaleźliśmy
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Strona której szukasz nie istnieje lub została przeniesiona.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
