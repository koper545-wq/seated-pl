import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-8xl font-bold tracking-tight text-primary">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Ups! Tej strony nie znaleźliśmy
        </h2>

        <p className="mt-2 max-w-md text-muted-foreground">
          Strona której szukasz nie istnieje lub została przeniesiona.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
