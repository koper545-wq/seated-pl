import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Header, Footer } from "@/components/layout";
import { SessionProvider } from "@/components/providers";
import { MVPModeSwitcher } from "@/components/dev";
import { EventsProvider } from "@/contexts/events-context";
import { MVPModeProvider } from "@/contexts/mvp-mode-context";
import { BookingsProvider } from "@/contexts/bookings-context";

const BASE_URL = "https://seated-pl.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    pl: "Seated - Kulinarne doświadczenia we Wrocławiu",
    en: "Seated - Culinary Experiences in Wrocław",
  };

  const descriptions = {
    pl: "Odkryj wyjątkowe wydarzenia kulinarne - supper clubs, pop-upy, warsztaty gotowania i więcej. Dołącz do społeczności food lovers.",
    en: "Discover unique culinary events - supper clubs, pop-ups, cooking workshops and more. Join the food lovers community.",
  };

  const title = titles[locale as keyof typeof titles] || titles.pl;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.pl;
  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";
  const alternateLocale = locale === "pl" ? "en" : "pl";

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    manifest: "/manifest.json",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        pl: `${BASE_URL}/pl`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/pl`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: "Seated",
      locale: ogLocale,
      alternateLocale: alternateLocale === "pl" ? "pl_PL" : "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Seated - Kulinarne doświadczenia we Wrocławiu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Seated",
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      "mobile-web-app-capable": "yes",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "pl" | "en")) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Seated",
    url: BASE_URL,
    description: "Kulinarne doświadczenia we Wrocławiu",
    logo: `${BASE_URL}/opengraph-image`,
  };

  return (
    <html lang={locale}>
      <head>
        <meta name="application-name" content="Seated" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Seated" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#C05C36" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <MVPModeProvider>
              <EventsProvider>
                <BookingsProvider>
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                  <MVPModeSwitcher />
                </BookingsProvider>
              </EventsProvider>
            </MVPModeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
