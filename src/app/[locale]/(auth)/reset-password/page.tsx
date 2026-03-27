"use client";

import { Suspense, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle, ArrowLeft, KeyRound } from "lucide-react";
import { AnimatedBlob } from "@/components/ui/organic-blob";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-4">Nieprawidłowy link</h2>
          <p className="text-muted-foreground mb-6">
            Link do resetowania hasła jest nieprawidłowy lub wygasł.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/forgot-password">Poproś o nowy link</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-4">Hasło zmienione!</h2>
          <p className="text-muted-foreground mb-6">
            Twoje hasło zostało pomyślnie zmienione. Możesz się teraz zalogować.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/login">Zaloguj się</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      return;
    }

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Wystąpił błąd. Spróbuj ponownie.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Wystąpił błąd. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ustaw nowe hasło</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Wpisz nowe hasło do swojego konta
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nowe hasło</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 znaków"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Powtórz hasło</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Powtórz nowe hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Zmienianie hasła...
              </>
            ) : (
              "Zmień hasło"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:text-primary/90 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Wróć do logowania
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBlob variant={3} className="-right-16 top-[20%] w-[260px] h-[260px] hidden md:block z-0" opacity={0.10} duration={24} rotate={[-4, 4]} />
      <AnimatedBlob variant={5} className="-left-20 bottom-[15%] w-[240px] h-[240px] hidden md:block z-0" opacity={0.08} duration={22} rotate={[-3, 3]} />
      <div className="relative z-10 w-full flex items-center justify-center">
        <Suspense
          fallback={
            <Card className="w-full max-w-md">
              <CardContent className="pt-8 pb-8 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </CardContent>
            </Card>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
