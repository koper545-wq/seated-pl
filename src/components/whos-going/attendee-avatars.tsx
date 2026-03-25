"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventAttendee } from "@/lib/mock-data";

interface AttendeeAvatarsProps {
  attendees: EventAttendee[];
  maxDisplay?: number;
  size?: "sm" | "default" | "lg";
}

export function AttendeeAvatars({
  attendees,
  maxDisplay = 5,
  size = "default",
}: AttendeeAvatarsProps) {
  const displayAttendees = attendees.slice(0, maxDisplay);
  const remaining = attendees.length - maxDisplay;

  const sizeClasses = {
    sm: "h-6 w-6 text-xs -ml-2 first:ml-0",
    default: "h-8 w-8 text-sm -ml-3 first:ml-0",
    lg: "h-10 w-10 text-base -ml-3 first:ml-0",
  };

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {displayAttendees.map((attendee) => {
          const initials = attendee.userName
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <Tooltip key={attendee.id}>
              <TooltipTrigger asChild>
                <Avatar
                  className={`${sizeClasses[size]} border-2 border-white ring-2 ${
                    attendee.isHomie
                      ? "ring-primary/60"
                      : attendee.isMutualHomie
                      ? "ring-green-400"
                      : "ring-border"
                  }`}
                >
                  {attendee.userAvatar && (
                    <AvatarImage src={attendee.userAvatar} alt={attendee.userName} />
                  )}
                  <AvatarFallback
                    className={`${
                      attendee.isHomie
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{attendee.userName}</p>
                {attendee.isHomie && (
                  <p className="text-xs text-primary">Twój homie</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {remaining > 0 && (
          <Avatar
            className={`${sizeClasses[size]} border-2 border-white ring-2 ring-border`}
          >
            <AvatarFallback className="bg-muted text-muted-foreground">
              +{remaining}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </TooltipProvider>
  );
}
