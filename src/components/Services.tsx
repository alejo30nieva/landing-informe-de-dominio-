"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
  Calculator,
  Clock,
  Eye,
  MessageCircle,
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
  Calculator,
};

// Mostramos sólo los servicios de informes (los más vendidos online).
const HIGHLIGHTED = [
  "informe-dominio",
  "informe-historico-titulares",
  "informe-nominal",
  "informe-multas",
  "informe-multas-express",
  "informe-compra-segura",
];

export function Services() {
  const items = HIGHLIGHTED
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as Service[];

  return (
    <section id="servicios" className="py-16 md:py-24 bg-ink-100/50">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
            Tipos de informes que ofrecemos
          </h2>
          <p className="mt-3 text-ink-700">
            Elegí el informe que necesitás. Todos con datos oficiales, entrega
            por email y WhatsApp, y atención personalizada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((s, i) => {
            const Icon = ICONS[s.icon] ?? FileText;
            const price = formatPrice(s);
            const wa = buildWaUrl(s);
            const isExpress = s.slug === "informe-multas-express";
            const isCombo = s.slug === "informe-compra-segura";
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`group relative flex flex-col p-6 rounded-2xl bg-white border transition-all ${
                  s.featured
                    ? "border-brand-700/40 shadow-card"
                    : "border-ink-300 hover:border-brand-700/30 hover:shadow-card"
                }`}
              >
                {isExpress && (
                  <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning text-white text-[10px] font-bold uppercase tracking-wider">
                    <Zap className="h-3 w-3" /> Express
                  </span>
                )}
                {isCombo && (
                  <span className="absolute -top-2.5 left-6 inline-flex items-center px-2 py-0.5 rounded-full bg-success text-white text-[10px] font-bold uppercase tracking-wider">
                    Combo ahorro
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  {price && (
                    <span className="text-[13px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md whitespace-nowrap">
                      {price}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-semibold text-brand-950 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-700 leading-relaxed flex-1">
                  {s.shortDesc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-500">
                  <Clock className="h-3.5 w-3.5" />
                  {s.delivery}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild size="md" className="w-full">
                    <a href="#formulario">
                      Solicitar
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    {s.hasSample ? (
                      <Link
                        href={`/ejemplos#${s.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-ink-300 text-brand-700 hover:bg-brand-50 font-medium text-xs transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver ejemplo
                      </Link>
                    ) : (
                      <span />
                    )}
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-ink-300 text-[#1ebe5b] hover:bg-[#25D366]/10 font-medium text-xs transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-brand-700 font-semibold hover:underline"
          >
            Ver todos los servicios de gestoría
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
