"use client";

import { useState, useEffect } from "react";
import { mockUsers, MockUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, ChefHat, Store, LogOut, Bug } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const MOCK_USER_KEY = "seated-mock-user";

export function DevAccountSwitcher() {
  const { data: session } = useSession();
  const [currentMockUser, setCurrentMockUser] = useState<MockUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Load mock user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(MOCK_USER_KEY);
    if (stored) {
      const user = mockUsers.find((u) => u.id === stored);
      if (user) setCurrentMockUser(user);
    }
  }, []);

  const handleSelectUser = (user: MockUser) => {
    localStorage.setItem(MOCK_USER_KEY, user.id);
    setCurrentMockUser(user);
    setIsOpen(false);
    // Reload to apply changes
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem(MOCK_USER_KEY);
    setCurrentMockUser(null);
    signOut({ callbackUrl: "/" });
  };

  const getRoleIcon = (user: MockUser) => {
    if (user.role === "guest") return <User className="h-4 w-4" />;
    if (user.hostType === "restaurant") return <Store className="h-4 w-4" />;
    return <ChefHat className="h-4 w-4" />;
  };

  const getRoleBadgeColor = (user: MockUser) => {
    if (user.role === "guest") return "bg-blue-100 text-blue-700";
    if (user.hostType === "restaurant") return "bg-purple-100 text-purple-700";
    return "bg-amber-100 text-amber-700";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
          >
            <Bug className="h-4 w-4 text-yellow-600" />
            <span className="text-xs">
              {currentMockUser ? currentMockUser.name.split(" ")[0] : "Dev Login"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-yellow-600" />
            <span>Testowe konta (tylko dev)</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Guests section */}
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Goście
          </DropdownMenuLabel>
          {mockUsers
            .filter((u) => u.role === "guest")
            .map((user) => (
              <DropdownMenuItem
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={getRoleBadgeColor(user)}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{user.name}</span>
                    {currentMockUser?.id === user.id && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                        aktywny
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.description}
                  </p>
                </div>
                {getRoleIcon(user)}
              </DropdownMenuItem>
            ))}

          <DropdownMenuSeparator />

          {/* Hosts section */}
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Hosty
          </DropdownMenuLabel>
          {mockUsers
            .filter((u) => u.role === "host")
            .map((user) => (
              <DropdownMenuItem
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={getRoleBadgeColor(user)}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{user.name}</span>
                    {currentMockUser?.id === user.id && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                        aktywny
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.description}
                  </p>
                </div>
                {getRoleIcon(user)}
              </DropdownMenuItem>
            ))}

          {currentMockUser && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Wyloguj mock usera
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Hook to get current mock user
export function useMockUser(): MockUser | null {
  const [mockUser, setMockUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(MOCK_USER_KEY);
    if (stored) {
      const user = mockUsers.find((u) => u.id === stored);
      if (user) setMockUser(user);
    }
  }, []);

  return mockUser;
}

// Get mock user ID from localStorage (for server-side compatible usage)
export function getMockUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(MOCK_USER_KEY);
}
