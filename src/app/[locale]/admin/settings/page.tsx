"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Percent,
  Banknote,
  Calculator,
  Check,
  Loader2,
} from "lucide-react";
import {
  getPlatformSettings,
  updatePlatformSettings,
  calculateCommission,
  type PlatformSettings,
} from "@/lib/mock-data";

export default function AdminSettingsPage() {
  const t = useTranslations("admin.settings");

  const [settings, setSettings] = useState<PlatformSettings>(getPlatformSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Preview calculation
  const [previewPrice, setPreviewPrice] = useState(20000); // 200 PLN
  const [previewFee, setPreviewFee] = useState(0);

  useEffect(() => {
    // Calculate preview fee based on current form values
    const tempSettings = getPlatformSettings();
    const originalSettings = { ...tempSettings };

    // Temporarily update settings for preview calculation
    updatePlatformSettings(settings);
    const fee = calculateCommission(previewPrice);
    setPreviewFee(fee);

    // Restore original settings
    updatePlatformSettings(originalSettings);
  }, [settings, previewPrice]);

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update settings
    updatePlatformSettings(settings);

    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const formatPrice = (grosz: number) => {
    return (grosz / 100).toFixed(2) + " PLN";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          Konfiguruj ustawienia platformy
        </p>
      </div>

      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t("commission")}
          </CardTitle>
          <CardDescription>
            Ustaw prowizję pobieraną od każdej rezerwacji
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Commission Type */}
          <div className="space-y-3">
            <Label>{t("commissionType")}</Label>
            <RadioGroup
              value={settings.commissionType}
              onValueChange={(value: "percentage" | "fixed") =>
                setSettings({ ...settings, commissionType: value })
              }
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="percentage"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  settings.commissionType === "percentage"
                    ? "border-amber-600 bg-amber-50"
                    : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem value="percentage" id="percentage" />
                <Percent className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">{t("percentage")}</p>
                  <p className="text-sm text-muted-foreground">
                    Procent od ceny wydarzenia
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="fixed"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  settings.commissionType === "fixed"
                    ? "border-amber-600 bg-amber-50"
                    : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem value="fixed" id="fixed" />
                <Banknote className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">{t("fixed")}</p>
                  <p className="text-sm text-muted-foreground">
                    Stała kwota za rezerwację
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Commission Value */}
          <div className="space-y-2">
            <Label htmlFor="commissionValue">{t("commissionValue")}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="commissionValue"
                type="number"
                min="0"
                max={settings.commissionType === "percentage" ? 50 : 500}
                step={settings.commissionType === "percentage" ? 0.5 : 1}
                value={settings.commissionValue}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    commissionValue: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-32"
              />
              <span className="text-muted-foreground">
                {settings.commissionType === "percentage" ? "%" : "PLN"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Min/Max Commission */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minCommission">{t("minCommission")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="minCommission"
                  type="number"
                  min="0"
                  step="1"
                  value={(settings.minCommission || 0) / 100}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      minCommission: (parseFloat(e.target.value) || 0) * 100,
                    })
                  }
                  className="w-24"
                />
                <span className="text-muted-foreground">PLN</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimalna prowizja (opcjonalne)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCommission">{t("maxCommission")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="maxCommission"
                  type="number"
                  min="0"
                  step="1"
                  value={(settings.maxCommission || 0) / 100}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxCommission: (parseFloat(e.target.value) || 0) * 100,
                    })
                  }
                  className="w-24"
                />
                <span className="text-muted-foreground">PLN</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Maksymalna prowizja (opcjonalne)
              </p>
            </div>
          </div>

          <Separator />

          {/* Live Preview */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <Label>{t("preview")}</Label>
            </div>

            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <Label htmlFor="previewPrice" className="text-xs text-muted-foreground">
                  Cena wydarzenia
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="previewPrice"
                    type="number"
                    min="0"
                    step="10"
                    value={previewPrice / 100}
                    onChange={(e) =>
                      setPreviewPrice((parseFloat(e.target.value) || 0) * 100)
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground text-sm">PLN</span>
                </div>
              </div>

              <div className="text-2xl text-muted-foreground">→</div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Prowizja</p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatPrice(previewFee)}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {settings.commissionType === "percentage"
                ? `${settings.commissionValue}% z ${formatPrice(previewPrice)} = ${formatPrice(previewFee)}`
                : `Stała opłata: ${formatPrice(settings.commissionValue * 100)}`}
              {settings.minCommission && previewFee === settings.minCommission && (
                <span className="text-amber-600"> (minimalna prowizja)</span>
              )}
              {settings.maxCommission && previewFee === settings.maxCommission && (
                <span className="text-amber-600"> (maksymalna prowizja)</span>
              )}
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : saved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {t("saved")}
                </>
              ) : (
                t("save")
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ostatnia aktualizacja:</span>
            <span>
              {settings.updatedAt.toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
