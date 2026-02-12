import { Link } from "@/i18n/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header for auth pages */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-amber-600">
            Seated
          </Link>
        </div>
      </header>

      {/* Auth content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-muted/30">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Seated. Wszystkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}
