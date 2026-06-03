import type { Metadata } from "next";
import {
  FileText,
  RefreshCcw,
  MapPin,
  ShieldAlert,
  BadgeCheck,
  FileCheck2,
  Car,
  Trash2,
  Users,
  Banknote,
  Gavel,
  ScanSearch,
  Wrench,
  Palette,
  Calculator,
  ShoppingCart,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { SERVICES, buildWaUrl, type Service } from "@/lib/services";

const ICONS: Record<string, any> = {
  FileText,
  RefreshCcw,
  MapPin,
  ShieldAlert,
  BadgeCheck,
  FileCheck2,
  Car,
  Trash2,
  Users,
  Banknote,
  Gavel,
  ScanSearch,
  Wrench,
  Palette,
  Calculator,
  ShoppingCart,
};

export const metadata: Metadata = {
  title: "Servicios de Gestoría Automotor",
  description:
    "Todos los servicios para tu vehículo: transferencias, informes, denuncia de venta, patentamiento, cambio de motor, valuación y más. Consultá por WhatsApp.",
  alternates: { canonical: "/servicios" },
};

const CATEGORIES: { id: Service["category"]; label: string }[] = [
  { id: "informes", label: "Informes" },
  { id: "transferencias", label: "Transferencias" },
  { id: "documentacion", label: "Documentación" },
  { id: "tramites", label: "Trámites" },
];

export default function ServiciosPage() {
  const featured = SERVICES.filter((s) => s.featured);

  return (
    <>
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand-50 via-white to-white py-14 md:py-20">
          <div className="container mx-auto text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <BadgeCheck className="h-3.5 w-3.5" />
              Mandataria matriculada
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-brand-950 tracking-tight">
              Todos los servicios para tu <span className="text-brand-700">vehículo</span>
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              Tramitamos transferencias, informes, patentamientos y todo lo que
              necesites del Registro Automotor. Atención personalizada por WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-ink-700">
                <CheckCircle2 className="h-4 w-4 text-success" /> Válido para toda Argentina
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-700">
                <Clock className="h-4 w-4 text-brand-700" /> Respuesta inmediata
              </span>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-950 mb-6 tracking-tight">
              Más solicitados
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((s) => (
                <ServiceCard key={s.slug} service={s} highlighted />
              ))}
            </div>
          </div>
        </section>

        {/* Catálogo por categoría */}
        {CATEGORIES.map((cat) => {
          const list = SERVICES.filter((s) => s.category === cat.id);
          if (list.length === 0) return null;
          return (
            <section key={cat.id} className="py-10 md:py-14 even:bg-ink-100/50">
              <div className="container mx-auto">
                <div className="flex items-end justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-950 tracking-tight">
                    {cat.label}
                  </h2>
                  <span className="text-xs text-ink-500 font-medium">{list.length} servicios</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {list.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA final */}
        <section className="py-16 md:py-20 bg-brand-950 text-white">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              ¿No encontraste lo que buscás?
            </h2>
            <p className="mt-3 text-white/80">
              Escribinos. Resolvemos consultas y trámites a medida en toda Argentina.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="xl" className="bg-[#25D366] hover:bg-[#1ebe5b]">
                <a
                  href="https://wa.me/5493515724733?text=Hola%2C%20necesito%20una%20consulta%20personalizada"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>
              <Button asChild size="xl" variant="secondary">
                <a href="/#formulario">Solicitar informe online</a>
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

function ServiceCard({
  service,
  highlighted,
}: {
  service: Service;
  highlighted?: boolean;
}) {
  const Icon = ICONS[service.icon] ?? FileText;
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition-all ${
        highlighted
          ? "border-brand-700/40 shadow-card"
          : "border-ink-300 hover:border-brand-700/30 hover:shadow-card"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-2.5 left-6 inline-flex items-center px-2 py-0.5 rounded-full bg-success text-white text-[10px] font-bold uppercase tracking-wider">
          Destacado
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        {service.price && (
          <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-1 rounded">
            {service.price}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-brand-950 leading-snug">{service.title}</h3>
      <p className="mt-1.5 text-sm text-ink-700 leading-relaxed flex-1">
        {service.shortDesc}
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-500">
        <Clock className="h-3.5 w-3.5" />
        {service.delivery}
      </div>
      <a
        href={buildWaUrl(service)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold text-sm transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        Consultar por WhatsApp
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
