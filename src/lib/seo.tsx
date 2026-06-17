import { COMPANY } from "@/lib/company";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://landing-informe-de-dominio.vercel.app";

/**
 * Schema LocalBusiness / ProfessionalService enriquecido.
 * Mejora la chance de aparecer en el "knowledge panel" y resultados locales.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: `${COMPANY.tradeName} — Informe de Dominio Automotor`,
    alternateName: "Informe de Dominio Córdoba",
    description:
      "Tramitamos Informes de Dominio Automotor, Histórico de Titulares, Multas y Nominal de forma 100% online en Córdoba y toda Argentina. Entrega rápida por email y WhatsApp.",
    url: SITE_URL,
    telephone: "+5493515724733",
    priceRange: "$$",
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/favicon.svg`,
    areaServed: [
      { "@type": "City", name: "Córdoba" },
      { "@type": "Country", name: "Argentina" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Duarte Quirós 4051",
      addressLocality: "Córdoba",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
    email: "gestoriacordobaluci@gmail.com",
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.4201,
      longitude: -64.1888,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    serviceType: [
      "Informe de Dominio Automotor",
      "Informe Histórico de Titulares",
      "Informe Nominal",
      "Informe de Multas",
      "Verificación de vehículos",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://wa.me/5493515724733",
      "https://www.instagram.com/p/CPCJkdpgH1L/?igsh=aDZjbGpleGltc2lo",
    ],
  };
}

/** Schema WebSite con SearchAction (sitelinks searchbox). */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.tradeName,
    inLanguage: "es-AR",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

/**
 * Schema FAQPage — habilita los "rich snippets" desplegables en Google.
 * Las preguntas/respuestas deben coincidir con las que se ven en la página.
 */
export function faqSchema(
  items: { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Schema de un servicio con su precio (rich result de producto/servicio). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  priceARS?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "Argentina" },
    ...(opts.priceARS && {
      offers: {
        "@type": "Offer",
        price: String(opts.priceARS),
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        url: opts.url,
      },
    }),
  };
}

/** Breadcrumb para páginas internas. */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Schema de artículo para las guías del blog. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "es-AR",
    author: { "@type": "Organization", name: COMPANY.tradeName },
    publisher: {
      "@type": "Organization",
      name: COMPANY.tradeName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
