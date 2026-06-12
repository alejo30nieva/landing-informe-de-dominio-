"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
  Clock,
  Eye,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES, buildWaUrl, formatPrice, type Service } from "@/lib/services";

const ICONS: Record<string, any> = {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
};

// Lista ordenada para destacar en la home (mismo orden que el form).
const HIGHLIGHTED_ORDER = [
  "informe-dominio",
  "informe-historico-titulares",
  "informe-nominal",
  "informe-multas",
  "informe-multas-express",
  "informe-compra-segura",
];

const INCLUDES: Record<string, string[]> = {
  "informe-dominio": [
    "Datos completos del vehículo",
    "Titular registral actual",
    "Embargos e inhibiciones",
    "Deudas y multas",
  ],
  "informe-historico-titulares": [
    "Todos los titulares (actuales y previos)",
    "Datos de inscripción",
    "Prendas y radicaciones",
    "Trazabilidad completa",
  ],
  "informe-nominal": [
    "Búsqueda por DNI / CUIT",
    "Vehículos en todo el país",
    "Activos e históricos",
    "Porcentaje de titularidad",
  ],
  "informe-multas": [
    "Más de 140 municipalidades",
    "9 provincias + CABA",
    "Detalle por jurisdicción",
    "Importes y vencimientos",
  ],
  "informe-multas-express": [
    "Prioridad en la cola",
    "Entrega <8 hs hábiles",
    "Mismas jurisdicciones",
    "Avisos por WhatsApp",
  ],
  "informe-compra-segura": [
    "Histórico de titulares completo",
    "Informe de Multas nacional",
    "Descuento por combo",
    "Recomendado para compra",
  ],
};

export function PricingTable() {
  const items = HIGHLIGHTED_ORDER.map((slug) =>
    SERVICES.find((s) => s.slug === slug)
  ).filter(Boolean) as Service[];

  return (
    <section id="informes" className="py-16 md:py-24 bg-ink-100/50 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            Tipos de informes
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
            Elegí el informe que necesitás
          </h2>
          <p className="mt-3 text-ink-700">
            Precios claros, sin sorpresas. Todos los informes se obtienen de
            fuentes oficiales y se entregan por email y WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((s, i) => {
            const Icon = ICONS[s.icon] ?? FileText;
            const price = formatPrice(s);
            const includes = INCLUDES[s.slug] ?? [];
            const isExpress = s.slug === "informe-multas-express";
            const isCombo = s.slug === "informe-compra-segura";
            const isFeatured = s.slug === "informe-historico-titulares";

            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all ${
                  isFeatured
                    ? "border-brand-700 shadow-elevate ring-1 ring-brand-700/20 lg:scale-[1.02]"
                    : "border-ink-300 hover:border-brand-700/30 hover:shadow-card"
                }`}
              >
                {/* Badges */}
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

                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      isFeatured
                        ? "bg-brand-700 text-white"
                        : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  {s.hasSample && (
                    <Link
                      href={`/ejemplos#${s.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
                    >
                      <Eye className="h-3 w-3" /> Ver ejemplo
                    </Link>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-brand-950 leading-tight">
                  {s.title}
                </h3>

                {/* Precio gigante */}
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-brand-950 tracking-tight">
                    {price}
                  </span>
                  <span className="text-xs text-ink-500">ARS</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-500">
                  <Clock className="h-3.5 w-3.5" />
                  {s.delivery}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                  {s.shortDesc}
                </p>

                {/* Includes list */}
                {includes.length > 0 && (
                  <ul className="mt-4 space-y-1.5 flex-1">
                    {includes.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2 text-[13px] text-ink-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-2">
                  {s.selectableInForm ? (
                    <Button asChild size="md" className="w-full">
                      <a href={`/?s=${s.slug}#formulario`}>
                        Solicitar
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild size="md" variant="outline" className="w-full">
                      <a href={buildWaUrl(s)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        Consultar
                      </a>
                    </Button>
                  )}
                  <a
                    href={buildWaUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-ink-300 text-[#1ebe5b] hover:bg-[#25D366]/10 font-medium text-xs transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Tengo una duda — WhatsApp
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-ink-700">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-brand-700 font-semibold hover:underline"
          >
            Ver todos los servicios de gestoría (+18)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
