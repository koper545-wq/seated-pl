import Link from "next/link";
import { AnimatedBlob } from "@/components/ui/organic-blob";

export default function RootNotFound() {
  return (
    <html lang="pl">
      <body className="relative overflow-hidden flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <AnimatedBlob variant={3} className="absolute -top-24 -left-24 w-80 h-80 z-0" opacity={0.10} duration={24} rotate={[-3, 3]} />
        <AnimatedBlob variant={5} className="absolute -bottom-20 -right-20 w-72 h-72 z-0" opacity={0.08} duration={28} rotate={[-2, 2]} />
        <AnimatedBlob variant={1} className="absolute top-1/2 right-1/4 w-56 h-56 z-0" opacity={0.08} duration={32} rotate={[-4, 4]} />

        <h1 className="relative z-10 text-8xl font-bold tracking-tight text-primary">404</h1>

        <h2 className="relative z-10 mt-4 text-2xl font-semibold text-foreground">
          Ups! Tej strony nie znaleźliśmy
        </h2>

        <p className="relative z-10 mt-2 max-w-md text-muted-foreground">
          Strona której szukasz nie istnieje lub została przeniesiona.
        </p>

        <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Wróć na stronę główną
          </Link>

          <Link
            href="/events"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Przeglądaj wydarzenia
          </Link>
        </div>
      </body>
    </html>
  );
}
