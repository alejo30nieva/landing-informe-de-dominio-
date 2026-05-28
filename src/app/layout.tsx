import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://informe-dominio-cordoba.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Informe de Dominio Automotor — Córdoba | Gestoría Córdoba",
    template: "%s | Gestoría Córdoba",
  },
  description:
    "Solicitá tu Informe de Dominio Automotor 100% online. Conocé el estado legal, deudas, embargos e inhibiciones de cualquier vehículo en Argentina. Mandataria matriculada en Córdoba.",
  keywords: [
    "informe de dominio cordoba",
    "informe automotor",
    "verificación automotor",
    "estado legal vehículo",
    "informe dnrpa",
    "informe registral",
    "informe de dominio online",
    "comprar auto seguro",
    "deudas patente",
    "embargos vehículo",
  ],
  authors: [{ name: "Gestoría Córdoba" }],
  creator: "Gestoría Córdoba",
  publisher: "Gestoría Córdoba",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Gestoría Córdoba",
    title: "Informe de Dominio Automotor — Córdoba",
    description:
      "Verificá cualquier vehículo antes de comprar. Informe oficial 100% online, entrega rápida y atención por WhatsApp.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Informe de Dominio Automotor — Gestoría Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Informe de Dominio Automotor — Córdoba",
    description:
      "Verificá cualquier vehículo antes de comprar. 100% online, rápido y seguro.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
  category: "automotive",
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gestoría Córdoba — Informe de Dominio Automotor",
  description:
    "Tramitamos Informes de Dominio Automotor oficiales de forma 100% online en Argentina.",
  url: siteUrl,
  telephone: "+5493515724733",
  areaServed: { "@type": "Country", name: "Argentina" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  priceRange: "$$",
  serviceType: "Informe de Dominio Automotor",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: ["https://wa.me/5493515724733"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        {children}
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
