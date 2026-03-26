"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMVPMode } from "@/contexts/mvp-mode-context";
import { getMockUserId } from "@/components/dev/account-switcher";
import { mockUsers } from "@/lib/mock-data";
import { PersonalizedHero } from "./personalized-hero";
import { UpcomingBookingsSection } from "./upcoming-bookings-section";
import { HostQuickStats } from "./host-quick-stats";

type ActiveMode = "host" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  userRole: "guest" | "host" | "admin";
  userName: string;
}

interface HomepageContentProps {
  translations: {
    personalizedHero: Record<string, string>;
    upcomingBookings: Record<string, string>;
    hostStats: Record<string, string>;
  };
  children: React.ReactNode; // The default (anonymous) sections
  loggedInChildren: React.ReactNode; // Sections shown for both logged in and anonymous (categories, featured, testimonials, etc.)
}

export function HomepageContent({
  translations,
  children,
  loggedInChildren,
}: HomepageContentProps) {
  const { mvpMode, isLoaded: demoLoaded } = useMVPMode();
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!demoLoaded) return;

    if (mvpMode) {
      // Demo mode: check mock user
      const mockUserId = getMockUserId();
      const storedMode = typeof window !== "undefined"
        ? (localStorage.getItem("seated-active-mode") as ActiveMode | null)
        : null;

      if (mockUserId) {
        const user = mockUsers.find((u) => u.id === mockUserId);
        if (user) {
          const effectiveRole = storedMode || (user.role === "host" ? "host" : "guest");
          setAuthState({
            isLoggedIn: true,
            userRole: effectiveRole as "guest" | "host",
            userName: user.name,
          });
          setReady(true);
          return;
        }
      }
      // No mock user selected → anonymous
      setAuthState({ isLoggedIn: false, userRole: "guest", userName: "" });
      setReady(true);
      return;
    }

    // Live mode: check real session
    if (status === "loading") return;

    if (session?.user) {
      setAuthState({
        isLoggedIn: true,
        userRole: (session.user as { userType?: string }).userType === "HOST"
          ? "host"
          : "guest",
        userName: session.user.name || "User",
      });
    } else {
      setAuthState({ isLoggedIn: false, userRole: "guest", userName: "" });
    }
    setReady(true);
  }, [mvpMode, demoLoaded, session, status]);

  // Not ready yet — show anonymous version (no flash)
  if (!ready || !authState) {
    return (
      <>
        {children}
        {loggedInChildren}
      </>
    );
  }

  // Anonymous user — show full onboarding landing
  if (!authState.isLoggedIn) {
    return (
      <>
        {children}
        {loggedInChildren}
      </>
    );
  }

  // Logged-in user — show personalized landing
  return (
    <>
      <PersonalizedHero
        userRole={authState.userRole === "admin" ? "host" : authState.userRole}
        userName={authState.userName}
        t={translations.personalizedHero}
      />

      {/* Role-specific section */}
      {authState.userRole === "host" ? (
        <HostQuickStats t={translations.hostStats} />
      ) : (
        <UpcomingBookingsSection t={translations.upcomingBookings} />
      )}

      {/* Shared sections (categories, featured events, testimonials) */}
      {loggedInChildren}
    </>
  );
}
