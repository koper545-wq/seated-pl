import type { MetadataRoute } from "next";

const BASE_URL = "https://seated-pl.vercel.app";

const locales = ["pl", "en"] as const;

const staticPages = [
  { path: "/", changeFrequency: "daily" as const, priority: 1.0 },
  { path: "/events", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/how-it-works", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/become-host", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/why-join", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/legal-brief", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/gift-cards", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/rewards", changeFrequency: "weekly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path === "/" ? "" : page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
