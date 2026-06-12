import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://landing-informe-de-dominio.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success", "/pending", "/qr"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
