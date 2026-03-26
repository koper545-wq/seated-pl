"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const blobs = [
  "/blobs/blob-1.svg",
  "/blobs/blob-2.svg",
  "/blobs/blob-3.svg",
  "/blobs/blob-4.svg",
  "/blobs/blob-5.svg",
  "/blobs/blob-6.svg",
  "/blobs/blob-7.svg",
  "/blobs/blob-8.svg",
];

interface AnimatedBlobProps {
  /** Which blob variant (1-8) */
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
