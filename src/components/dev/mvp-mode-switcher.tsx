"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { cn } from "@/lib/utils";
import { DevAccountSwitcher } from "./account-switcher";

export function MVPModeSwitcher() {
  const { mvpMode, toggleMVPMode, isLoaded } = useMVPMode();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* Dev Account Switcher - only in demo mode */}
      {mvpMode && <DevAccountSwitcher />}

      {/* Mode toggle - always visible */}
      <div className="fixed bottom-4 left-20 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMVPMode}
                className={cn(
                  "gap-2 transition-all",
                  mvpMode
                    ? "bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-700"
                    : "bg-red-50 border-red-300 hover:bg-red-100 text-red-700"
                )}
              >
                {mvpMode ? (
                  <>
                    <span className="text-sm">🎭</span>
                    <span className="text-xs font-medium">Demo</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">🔴</span>
                    <span className="text-xs font-medium">Live</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              <p className="text-sm">
                {mvpMode
                  ? "Tryb demo - dane testowe"
                  : "Tryb live - prawdziwa baza danych"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Kliknij aby przełączyć
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
