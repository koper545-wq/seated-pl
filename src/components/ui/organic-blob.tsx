"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const blobs = [
  "/blobs/blob-1.svg",   // 1: Terrakota #C05C36
  "/blobs/blob-2.svg",   // 2: Sage #6E8060
  "/blobs/blob-3.svg",   // 3: Terra mid #D9846A
  "/blobs/blob-4.svg",   // 4: Krem ciemny #EDE0CE
  "/blobs/blob-5.svg",   // 5: Szałwia jasna #D7E2CF
  "/blobs/blob-6.svg",   // 6: Terra jasna #F0D8CC
  "/blobs/blob-7.svg",   // 7: Warm gray #6B6560
  "/blobs/blob-8.svg",   // 8: Węgiel #1A1916
  "/blobs/blob-9.svg",   // 9: Złoty ciemny #B8860B
  "/blobs/blob-10.svg",  // 10: Brąz saddle #8B4513
  "/blobs/blob-11.svg",  // 11: Sienna #A0522D
  "/blobs/blob-12.svg",  // 12: Oliwka ciemna #556B2F
  "/blobs/blob-13.svg",  // 13: Piasek ciepły #E8C4A0
  "/blobs/blob-14.svg",  // 14: Kawa mleczna #9B7653
  "/blobs/blob-15.svg",  // 15: Peru #CD853F
  "/blobs/blob-16.svg",  // 16: Leśna zieleń #4A7C59
];

interface AnimatedBlobProps {
  /** Which blob variant (1-16) */
  variant?: number;
  /** Additional CSS classes for positioning */
  className?: string;
  /** Opacity (default 0.15) */
  opacity?: number;
  /** Animation duration in seconds (default 20) */
  duration?: number;
  /** Scale range for breathing animation */
  scale?: [number, number];
  /** Rotation range in degrees */
  rotate?: [number, number];
}

export function AnimatedBlob({
  variant = 1,
  className = "",
  opacity = 0.15,
  duration = 20,
  scale = [1, 1.05],
  rotate = [-3, 3],
}: AnimatedBlobProps) {
  const src = blobs[(variant - 1) % blobs.length];

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
      animate={{
        scale: [scale[0], scale[1], scale[0]],
        rotate: [rotate[0], rotate[1], rotate[0]],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image src={src} alt="" fill className="object-contain" />
    </motion.div>
  );
}

// Keep backward compat
export function OrganicBlob({
  variant,
  className,
}: {
  variant: string;
  className?: string;
}) {
  const map: Record<string, number> = {
    terra: 1,
    sage: 2,
    cream: 4,
    hero: 3,
    accent: 6,
  };
  return <AnimatedBlob variant={map[variant] || 1} className={className} />;
}
