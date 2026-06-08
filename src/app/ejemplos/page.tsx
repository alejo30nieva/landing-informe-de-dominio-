import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  Clock,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Shield,
  Eye,
} from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { buildWaUrl, getServiceBySlug, formatPrice } from "@/lib/services";

import { InformeHistoricoSample } from "@/components/samples/InformeHistoricoSample";
import { InformeMultasSample } from "@/components/samples/InformeMultasSample";
import { InformeNominalSample } from "@/components/samples/InformeNominalSample";

export const metadata: Metadata = {
  title: "Ejemplos de Informes — Vista previa",
  description:
    "Mirá ejemplos reales de Informes de Dominio, Histórico, Nominal y Multas antes de comprar. Datos anonimizados con fines ilustrativos.",
  alternates: { canonical: "/ejemplos" },
};

const ITEMS = [
  {
    slug: "informe-historico-titulares",
    nav: "Histórico",
    icon: Users,
    color: "from-brand-700 to-brand-950",
  },
  {
    slug: "informe-multas",
    nav: "Multas",
    icon: Banknote,
    color: "from-success to-emerald-800",
  },
  {
    slug: "informe-multas-express",
    nav: "Multas Express",
    icon: Zap,
    color: "from-warning to-orange-600",
  },
  {
    slug: "informe-nominal",
    nav: "Nominal",
    icon: UserSearch,
    color: "from-brand-500 to-brand-800",
  },
] as const;

export default function EjemplosPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand-50 via-white to-white py-12 md:py-16 border-b border-ink-300/60">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <Eye className="h-3.5 w-3.5" />
              Vista previa con datos anonimizados
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-950 tracking-tight">
              Ejemplos de <span className="text-brand-700">Informes</span>
            </h1>
            <p className="mt-4 text-lg text-ink-700 max-w-2xl mx-auto">
              Así se ven los informes que recibís. Datos personales, dominios y
              números están parcialmente ocultos o modificados con fines
              ilustrativos.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-ink-700">
                <Shield className="h-4 w-4 text-success" /> Fuentes oficiales
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-700">
                <CheckCircle2 className="h-4 w-4 text-success" /> Toda Argentina
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-700">
                <Clock className="h-4 w-4 text-brand-700" /> Entrega rápida
              </span>
            </div>

            {/* Navegación rápida (anchors) */}
            <nav className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {ITEMS.map((it) => {
                const Icon = it.icon;
                return (
                  <a
                    key={it.slug}
                    href={`#${it.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-ink-300 text-xs font-semibold text-brand-950 hover:border-brand-700/40 hover:bg-brand-50 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5 text-brand-700" />
                    {it.nav}
                  </a>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Secciones */}
        <SampleSectionBlock
          slug="informe-historico-titulares"
          sample={<InformeHistoricoSample />}
        />
        <SampleSectionBlock
          slug="informe-multas"
          sample={<InformeMultasSample />}
          alt
        />
        <SampleSectionBlock
          slug="informe-multas-express"
          sample={<InformeMultasSample express />}
        />
        <SampleSectionBlock
          slug="informe-nominal"
          sample={<InformeNominalSample />}
          alt
        />

        {/* CTA final */}
        <section className="py-14 md:py-20 bg-brand-950 text-white">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              ¿Listo para tu informe?
            </h2>
            <p className="mt-3 text-white/80">
              Solicitalo en 1 minuto. Pago seguro y entrega en minutos por email
              y WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="xl">
                <Link href="/#formulario">
                  Solicitar informe
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="secondary">
                <a
                  href="https://wa.me/5493515724733?text=Hola%2C%20quiero%20consultar%20por%20un%20informe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

function SampleSectionBlock({
  slug,
  sample,
  alt,
}: {
  slug: string;
  sample: React.ReactNode;
  alt?: boolean;
}) {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  const price = formatPrice(service);
  const wa = buildWaUrl(service);

  return (
    <section
      id={slug}
      className={`py-12 md:py-16 ${alt ? "bg-ink-100/50" : "bg-white"} scroll-mt-24`}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
          {/* Sidebar info */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-ink-300 rounded-2xl shadow-soft p-6">
              <span className="text-[11px] font-bold tracking-widest text-brand-700 uppercase">
                {service.category === "informes" ? "Informe" : "Servicio"}
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-brand-950 tracking-tight leading-tight">
                {service.title}
              </h2>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                {service.longDesc}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {price && (
                  <div className="p-3 rounded-lg bg-brand-50 border border-brand-100">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-brand-700">
                      Precio
                    </div>
                    <div className="text-xl font-extrabold text-brand-950 mt-0.5">
                      {price}
                    </div>
                  </div>
                )}
                <div className="p-3 rounded-lg bg-ink-100 border border-ink-300/60">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-ink-500">
                    Entrega
                  </div>
                  <div className="text-sm font-bold text-brand-950 mt-0.5 leading-tight">
                    {service.delivery}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/#formulario">
                    Solicitar ahora
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Consultar por WhatsApp
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-[11px] text-ink-500 leading-relaxed">
                Pago por transferencia, QR, MercadoPago o tarjeta. Una vez
                acreditado, recibís el informe por email y WhatsApp.
              </p>
            </div>
          </div>

          {/* Sample */}
          <div>{sample}</div>
        </div>
      </div>
    </section>
  );
}
