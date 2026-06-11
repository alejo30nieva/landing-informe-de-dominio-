import type { MetadataRoute } from "next";
import { GUIAS } from "@/lib/guias";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://landing-informe-de-dominio.vercel.app";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ejemplos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/arrepentimiento`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guiaPages: MetadataRoute.Sitemap = GUIAS.map((g) => ({
    url: `${base}/guias/${g.slug}`,
    lastModified: new Date(g.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...guiaPages];
}
