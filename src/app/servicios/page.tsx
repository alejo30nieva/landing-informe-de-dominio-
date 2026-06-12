import type { Metadata } from "next";
import Link from "next/link";
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
  UserSearch,
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
  Zap,
  Eye,
  ShieldCheck,
} from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  SERVICES,
  buildWaUrl,
  formatPrice,
  type Service,
} from "@/lib/services";

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
  UserSearch,
  Banknote,
  Gavel,
  ScanSearch,
  Wrench,
  Palette,
  Calculator,
  ShoppingCart,
  Zap,
};

export const metadata: Metadata = {
  title: "Servicios de Gestoría Automotor",
  description:
    "Todos los servicios para tu vehículo: transferencias, informes, denuncia de venta, patentamiento, cambio de motor, valuación y más. Consultá por WhatsApp.",
  alternates: { canonical: "/servicios" },
};

const TRAMITE_CATEGORIES: { id: Service["category"]; label: string; desc: string }[] = [
  {
    id: "transferencias",
    label: "Transferencias",
    desc: "Cambio de titularidad y patentamientos.",
  },
  {
    id: "documentacion",
    label: "Documentación",
    desc: "Cédulas, autorizaciones y duplicados.",
  },
  {
    id: "tramites",
    label: "Otros Trámites",
    desc: "Bajas, cambios y verificaciones.",
  },
];

export default function ServiciosPage() {
  const informes = SERVICES.filter(
    (s) => s.category === "informes" && s.priceARS
  );

  return (
    <>
      <TopBar />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-brand-50 via-white to-white py-12 md:py-16 border-b border-ink-300/60">
          <div className="container mx-auto text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <BadgeCheck className="h-3.5 w-3.5" />
              Mandataria matriculada · Toda Argentina
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-brand-950 tracking-tight">
              Servicios para tu <span className="text-brand-700">vehículo</span>
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              Informes online con entrega inmediata y trámites presenciales
              de gestoría automotor en todo el país.
            </p>

            {/* Tabs anchors */}
            <nav className="mt-7 flex flex-wrap items-center justify-center gap-2">
              <a
                href="#informes-online"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Informes online
              </a>
              {TRAMITE_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-ink-300 text-xs font-semibold text-brand-950 hover:border-brand-700/40 hover:bg-brand-50 transition-colors"
                >
                  {cat.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* INFORMES ONLINE — con precios */}
        <section id="informes-online" className="py-14 md:py-20 bg-white scroll-mt-24">
          <div className="container mx-auto">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
                Informes online
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
                Comprá tu informe ahora
              </h2>
              <p className="mt-3 text-ink-700">
                Pago seguro, entrega por email y WhatsApp en minutos. Sin
                desplazamientos, sin papeleo.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {informes.map((s) => (
                <InformeCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* TRÁMITES — sin precio online */}
        {TRAMITE_CATEGORIES.map((cat, idx) => {
          const list = SERVICES.filter((s) => s.category === cat.id);
          if (list.length === 0) return null;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={`py-12 md:py-16 scroll-mt-24 ${
                idx % 2 === 0 ? "bg-ink-100/50" : "bg-white"
              }`}
            >
              <div className="container mx-auto">
                <div className="max-w-2xl mb-8">
                  <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
                    {cat.label}
                  </span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-brand-950 tracking-tight">
                    {cat.label}
                  </h2>
                  <p className="mt-2 text-ink-700">{cat.desc}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {list.map((s) => (
                    <TramiteCard key={s.slug} service={s} />
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

/** Card de un informe online — con precio destacado y CTA "Comprar online". */
function InformeCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? FileText;
  const price = formatPrice(service);
  const wa = buildWaUrl(service);
  const isExpress = service.slug === "informe-multas-express";
  const isCombo = service.slug === "informe-compra-segura";
  const isFeatured = service.slug === "informe-historico-titulares";

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all ${
        isFeatured
          ? "border-brand-700 shadow-elevate ring-1 ring-brand-700/20"
          : "border-ink-300 hover:border-brand-700/30 hover:shadow-card"
      }`}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-700 text-white text-[10px] font-bold uppercase tracking-wider">
          Más pedido
        </span>
      )}
      {isExpress && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning text-white text-[10px] font-bold uppercase tracking-wider">
          <Zap className="h-3 w-3" /> Express
        </span>
      )}
      {isCombo && (
        <span className="absolute -top-3 left-6 inline-flex items-center px-2 py-0.5 rounded-full bg-success text-white text-[10px] font-bold uppercase tracking-wider">
          Combo ahorro
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
            isFeatured ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        {service.hasSample && (
          <Link
            href={`/ejemplos#${service.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
          >
            <Eye className="h-3 w-3" /> Ver ejemplo
          </Link>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-brand-950 leading-tight">
        {service.title}
      </h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-3xl font-extrabold text-brand-950 tracking-tight">
          {price}
        </span>
        <span className="text-xs text-ink-500">ARS</span>
      </div>
      <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-500">
        <Clock className="h-3.5 w-3.5" />
        {service.delivery}
      </div>

      <p className="mt-3 text-sm text-ink-700 leading-relaxed flex-1">
        {service.shortDesc}
      </p>

      <div className="mt-5 flex flex-col gap-2">
        {service.selectableInForm ? (
          <Button asChild size="md" className="w-full">
            <a href={`/?s=${service.slug}#formulario`}>
              Comprar online
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button asChild size="md" variant="outline" className="w-full">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Consultar precio
            </a>
          </Button>
        )}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-ink-300 text-[#1ebe5b] hover:bg-[#25D366]/10 font-medium text-xs transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Tengo una duda
        </a>
      </div>
    </div>
  );
}

/** Card de trámite presencial — sin precio fijo, CTA único a WhatsApp. */
function TramiteCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? FileText;
  const wa = buildWaUrl(service);
  return (
    <div className="group relative flex flex-col rounded-2xl border border-ink-300 bg-white p-6 hover:border-brand-700/30 hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold tracking-wider text-ink-500 uppercase">
          Presencial
        </span>
      </div>
      <h3 className="mt-4 font-semibold text-brand-950 leading-snug">
        {service.title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-700 leading-relaxed flex-1">
        {service.shortDesc}
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-500">
        <Clock className="h-3.5 w-3.5" />
        {service.delivery}
      </div>
      <a
        href={wa}
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
