"use client";

import { type ReactNode } from "react";
import {
  FadeIn,
  FadeInUp,
  SlideIn,
  PageTransition,
} from "@/components/ui/motion";

export function EventPageTransition({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

export function EventHeroFadeIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn className={className}>{children}</FadeIn>
  );
}

export function EventInfoFadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <FadeInUp delay={delay} className={className}>
      {children}
    </FadeInUp>
  );
}

export function EventSidebarSlideIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SlideIn direction="right" delay={0.2} className={className}>
      {children}
    </SlideIn>
  );
}
