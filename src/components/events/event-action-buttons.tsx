"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { isEventSaved } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EventActionButtonsProps {
  eventId: string;
  eventTitle: string;
}

export function EventActionButtons({ eventId, eventTitle }: EventActionButtonsProps) {
  const currentUserId = "user-current";
  const [isSaved, setIsSaved] = useState(isEventSaved(currentUserId, eventId));
  const [showCopied, setShowCopied] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app, would call API
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: `Sprawdź to wydarzenie na Seated: ${eventTitle}`,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all",
                isSaved && "bg-rose-500 hover:bg-rose-600 text-white"
              )}
              onClick={handleSave}
            >
              <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isSaved ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
          </TooltipContent>
        </Tooltip>

        <Tooltip open={showCopied ? true : undefined}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showCopied ? "Link skopiowany!" : "Udostępnij"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
