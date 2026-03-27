"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { PageTransition, ScaleIn } from "@/components/ui/motion";
import { AnimatedBlob } from "@/components/ui/organic-blob";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Wystąpił błąd. Spróbuj ponownie.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError("Wystąpił błąd. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center px-4 relative overflow-hidden">
        <AnimatedBlob variant={2} className="-right-20 top-[15%] w-[280px] h-[280px] hidden md:block z-0" opacity={0.10} duration={22} rotate={[-4, 4]} />
        <AnimatedBlob variant={6} className="-left-16 bottom-[20%] w-[240px] h-[240px] hidden md:block z-0" opacity={0.09} duration={26} rotate={[-3, 3]} />
        <PageTransition className="relative z-10">
        <ScaleIn>
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Sprawdź swoją skrzynkę
            </h2>
            <p className="text-muted-foreground mb-6">
              Wysłaliśmy link do resetowania hasła na adres{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Jeśli nie widzisz wiadomości, sprawdź folder spam. Link jest ważny
              przez 1 godzinę.
            </p>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setError("");
                }}
              >
                Wyślij ponownie
              </Button>
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Wróć do logowania
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </ScaleIn>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBlob variant={2} className="-right-20 top-[15%] w-[280px] h-[280px] hidden md:block z-0" opacity={0.10} duration={22} rotate={[-4, 4]} />
      <AnimatedBlob variant={6} className="-left-16 bottom-[20%] w-[240px] h-[240px] hidden md:block z-0" opacity={0.09} duration={26} rotate={[-3, 3]} />
      <PageTransition className="relative z-10">
      <ScaleIn>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-3xl font-bold text-primary/80 mb-4 block">
            Seated
          </Link>
          <CardTitle className="text-2xl">Zresetuj hasło</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Podaj adres e-mail powiązany z Twoim kontem, a wyślemy Ci link do
            resetowania hasła.
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adres e-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary/50 hover:bg-primary"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                "Wyślij link resetujący"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-primary hover:text-primary inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Wróć do logowania
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Nie masz jeszcze konta?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary font-medium"
              >
                Zarejestruj się
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      </ScaleIn>
      </PageTransition>
    </div>
  );
}
