import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://informe-dominio-cordoba.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/success", "/pending"] }],
    sitemap: `${url}/sitemap.xml`,
  };
}
