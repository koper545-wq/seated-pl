"use client";
import Image from "next/image";

type BlobVariant = "terra" | "sage" | "cream" | "hero" | "accent";

interface OrganicBlobProps {
  variant: BlobVariant;
  className?: string;
}

const blobSrc: Record<BlobVariant, string> = {
  terra: "/blob-terra.svg",
  sage: "/blob-sage.svg",
  cream: "/blob-cream.svg",
  hero: "/splash-hero.svg",
  accent: "/splash-accent.svg",
};

export function OrganicBlob({ variant, className = "" }: OrganicBlobProps) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`} aria-hidden="true">
      <Image src={blobSrc[variant]} alt="" fill className="object-contain" />
    </div>
  );
}
