import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GYM, SITE_URL } from "@/lib/constants";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${GYM.name} — Club de boxeo en Orihuela`,
    template: `%s · ${GYM.name}`,
  },
  description: GYM.description,
  keywords: [
    "boxeo Orihuela",
    "gimnasio de boxeo",
    "clases de boxeo Alicante",
    "Raven Boxing Club",
    "entrenamiento de boxeo",
  ],
  openGraph: {
    title: `${GYM.name} — Club de boxeo en Orihuela`,
    description: GYM.description,
    url: SITE_URL,
    siteName: GYM.name,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: GYM.name,
    description: GYM.description,
    image: `${SITE_URL}/images/logo.png`,
    telephone: GYM.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: GYM.addressLine,
      addressLocality: GYM.legalCity,
      addressRegion: "Alicante",
      postalCode: "03300",
      addressCountry: "ES",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "16:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GYM.ratingValue,
      reviewCount: GYM.ratingCount,
    },
  };

  return (
    <html
      lang="es"
      className={`${bodyFont.variable} ${headingFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-raven-bg text-raven-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster theme="dark" richColors position="bottom-right" />
      </body>
    </html>
  );
}
