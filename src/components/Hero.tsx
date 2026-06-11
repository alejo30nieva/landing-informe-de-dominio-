"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Globe2, Lock, FileCheck2 } from "lucide-react";
import { HeroForm } from "@/components/HeroForm";

const bullets = [
  { icon: FileCheck2, text: "Información oficial y actualizada" },
  { icon: Clock, text: "Entrega rápida" },
  { icon: Globe2, text: "100% online" },
  { icon: ShieldCheck, text: "Seguro y confidencial" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, #1246D6 0, transparent 40%), radial-gradient(circle at 80% 0%, #0B1F3A 0, transparent 35%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-1/2 hidden lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(16px) saturate(0.9)",
          opacity: 0.15,
          maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
        }}
      />

      <div className="container mx-auto py-6 md:py-16 lg:py-24">
        {/* min-w-0 en el grid Y en cada celda evita que el contenido
            (títulos largos, precios whitespace-nowrap) fuerce las columnas
            más anchas que el viewport → causa real del overflow a la derecha. */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-center min-w-0">
          {/* Texto: en mobile va segundo, en desktop primero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1 min-w-0"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Mandataria matriculada — Córdoba
            </span>
            <h1 className="mt-5 text-[34px] sm:text-5xl lg:text-[56px] font-extrabold leading-[1.05] text-brand-950 tracking-tight break-words">
              Informe de Dominio{" "}
              <span className="text-brand-700">Automotor</span>
            </h1>
            <p className="mt-5 text-lg text-ink-700 max-w-xl leading-relaxed">
              Conocé el estado legal y registral de cualquier vehículo antes de{" "}
              <strong className="text-brand-950">comprar</strong>,{" "}
              <strong className="text-brand-950">vender</strong> o{" "}
              <strong className="text-brand-950">transferir</strong>.
            </p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-3 max-w-xl">
              {bullets.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 text-[15px] text-ink-700"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-start gap-3 p-4 rounded-xl bg-success-50 border border-success/20 max-w-xl">
              <Lock className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-brand-950">
                  Tus datos están protegidos
                </p>
                <p className="text-xs text-ink-700 mt-0.5">
                  Conexión cifrada, almacenamiento seguro y sin compartir
                  información con terceros.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form: en mobile va arriba (más importante), en desktop a la derecha.
              w-full + min-w-0 + el max-w-md mx-auto del propio form lo centran
              igual que las cards de PricingTable (mismo ancho de contenedor). */}
          <div className="order-1 lg:order-2 w-full min-w-0">
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}
