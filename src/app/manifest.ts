import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gestoría Córdoba — Informe de Dominio Automotor",
    short_name: "Informe Dominio",
    description:
      "Solicitá tu Informe de Dominio Automotor 100% online en Córdoba y toda Argentina.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1F3A",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    lang: "es-AR",
    categories: ["business", "utilities"],
  };
}
