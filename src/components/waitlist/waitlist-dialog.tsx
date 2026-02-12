"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, CheckCircle, Users, Loader2 } from "lucide-react";

interface WaitlistDialogProps {
  eventId: string;
  eventTitle: string;
  trigger?: React.ReactNode;
}

export function WaitlistDialog({
  eventId,
  eventTitle,
  trigger,
}: WaitlistDialogProps) {
  const t = useTranslations("waitlist");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, this would call an API
    setPosition(Math.floor(Math.random() * 5) + 1);
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset state after animation
    setTimeout(() => {
      setEmail("");
      setIsSuccess(false);
      setPosition(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="link" className="text-amber-600 p-0 h-auto">
            {t("joinWaitlist")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-600" />
                {t("title")}
              </DialogTitle>
              <DialogDescription>{t("description")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="waitlist-email">{t("email")}</Label>
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                <Bell className="h-4 w-4 shrink-0" />
                <span>{t("notifyWindow")}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("joining")}
                    </>
                  ) : (
                    t("join")
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{t("success")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("successDescription")}
              </p>

              {position && (
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm">
                  <Users className="h-4 w-4" />
                  {t("position", { position })}
                </div>
              )}
            </div>

            <Button onClick={handleClose} className="w-full">
              {t("close")}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
