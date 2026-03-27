import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/checkout/"],
      },
    ],
    sitemap: "https://seated-pl.vercel.app/sitemap.xml",
  };
}
