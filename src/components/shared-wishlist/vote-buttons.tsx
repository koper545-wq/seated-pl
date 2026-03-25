"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

type VoteType = "interested" | "going" | "skip" | null;

interface VoteButtonsProps {
  eventId: string;
  wishlistId: string;
  currentVote?: VoteType;
  onVote?: (vote: VoteType) => void;
  size?: "sm" | "default";
}

export function VoteButtons({
  eventId,
  wishlistId,
  currentVote = null,
  onVote,
  size = "default",
}: VoteButtonsProps) {
  const [vote, setVote] = useState<VoteType>(currentVote);

  const handleVote = (newVote: VoteType) => {
    const finalVote = vote === newVote ? null : newVote;
    setVote(finalVote);
    onVote?.(finalVote);
  };

  const buttonSize = size === "sm" ? "h-8 px-2" : "h-10 px-4";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("going")}
        className={cn(
          buttonSize,
          "gap-1.5",
          vote === "going"
            ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
            : "text-muted-foreground hover:text-green-700"
        )}
      >
        <Check className={iconSize} />
        <span className={size === "sm" ? "text-xs" : "text-sm"}>Idę!</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("interested")}
        className={cn(
          buttonSize,
          "gap-1.5",
          vote === "interested"
            ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
            : "text-muted-foreground hover:text-primary"
        )}
      >
        <Star className={iconSize} />
        <span className={size === "sm" ? "text-xs" : "text-sm"}>Zainteresowany</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("skip")}
        className={cn(
          buttonSize,
          "gap-1.5",
          vote === "skip"
            ? "bg-muted text-muted-foreground hover:bg-muted hover:text-foreground"
            : "text-muted-foreground hover:text-muted-foreground"
        )}
      >
        <X className={iconSize} />
        <span className={size === "sm" ? "text-xs" : "text-sm"}>Pomijam</span>
      </Button>
    </div>
  );
}
