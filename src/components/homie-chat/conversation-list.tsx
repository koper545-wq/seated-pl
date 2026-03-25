"use client";

import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HomieConversation } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

interface ConversationListProps {
  conversations: HomieConversation[];
  currentUserId: string;
  emptyMessage?: string;
}

export function ConversationList({
  conversations,
  currentUserId,
  emptyMessage = "Brak rozmów",
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        // Get the other participant's info
        const otherIndex = conversation.participants.findIndex(
          (p) => p !== currentUserId
        );
        const otherUserId = conversation.participants[otherIndex];
        const otherName = conversation.participantNames[otherIndex] || "Użytkownik";
        const otherAvatar = conversation.participantAvatars[otherIndex];
        const unreadCount = conversation.unreadCount[currentUserId] || 0;

        const initials = otherName
          .split(" ")
          .map((n) => n[0])
          .join("");

        return (
          <Link
            key={conversation.id}
            href={`/dashboard/homies/chat/${otherUserId}`}
          >
            <Card
              className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                unreadCount > 0 ? "border-primary/20 bg-primary/5" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    {otherAvatar && (
                      <AvatarImage src={otherAvatar} alt={otherName} />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-semibold text-foreground truncate ${
                          unreadCount > 0 ? "font-bold" : ""
                        }`}
                      >
                        {otherName}
                      </span>
                      {conversation.lastMessageAt && (
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatDistanceToNow(conversation.lastMessageAt, {
                            addSuffix: false,
                            locale: pl,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm truncate ${
                          unreadCount > 0
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {conversation.lastMessage || "Brak wiadomości"}
                      </p>
                      {unreadCount > 0 && (
                        <Badge className="bg-primary/50 hover:bg-primary/50 flex-shrink-0">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
