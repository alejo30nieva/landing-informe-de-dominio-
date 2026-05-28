import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://informe-dominio-cordoba.vercel.app";
  return [
    { url: `${url}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
