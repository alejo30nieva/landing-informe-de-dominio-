import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GUIAS } from "@/lib/guias";
import { JsonLd, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guías sobre Informes de Dominio y compra de autos usados",
  description:
    "Aprendé a verificar un auto antes de comprar, qué incluye un informe de dominio, cómo detectar deudas y embargos. Guías claras y prácticas.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE_URL },
          { name: "Guías", url: `${SITE_URL}/guias` },
        ])}
      />
      <TopBar />
      <Header />
      <main>
        <section className="bg-gradient-to-br from-brand-50 via-white to-white py-12 md:py-16 border-b border-ink-300/60">
          <div className="container mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <BookOpen className="h-3.5 w-3.5" />
              Guías y consejos
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-950 tracking-tight">
              Todo lo que necesitás saber antes de comprar
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              Guías claras para verificar un vehículo, entender los informes y
              comprar usados sin sorpresas.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {GUIAS.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guias/${g.slug}`}
                  className="group flex flex-col rounded-2xl border border-ink-300 bg-white p-6 hover:border-brand-700/30 hover:shadow-card transition-all"
                >
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-ink-500 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {g.readMin} min de lectura
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-brand-950 leading-tight group-hover:text-brand-700 transition-colors">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-700 leading-relaxed flex-1">
                    {g.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Leer guía
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
