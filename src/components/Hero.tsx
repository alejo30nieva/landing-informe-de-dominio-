"use client";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, Lock } from "lucide-react";
import { HeroForm } from "@/components/HeroForm";
import { HeroReportCards } from "@/components/HeroReportCards";

const benefits = [
  { icon: Clock, title: "Entrega en 24 a 72 hs", desc: "Recibí tu informe por email." },
  { icon: ShieldCheck, title: "100% online", desc: "Hacé tu pedido desde cualquier lugar." },
  { icon: Lock, title: "Seguro y confidencial", desc: "Tus datos están protegidos." },
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
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-start min-w-0">
          {/* Texto: en mobile va segundo, en desktop primero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1 min-w-0"
          >
            {/* El keyword de SEO ("Informe de Dominio Automotor") queda dentro
                del h1 como antetítulo visible. */}
            <h1 className="text-brand-950">
              <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-brand-700">
                Informes de dominio automotor y de personas
              </span>
              <span className="mt-4 block text-[clamp(2.1rem,6.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight break-words">
                Consultá antes de comprar.{" "}
                <span className="text-brand-700">Decidí con seguridad.</span>
              </span>
            </h1>
            <p className="mt-5 text-lg text-ink-700 max-w-md leading-relaxed">
              Información oficial y actualizada para comprar, vender o
              transferir.
            </p>

            <ul className="mt-7 space-y-4 max-w-md">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-semibold text-brand-950">
                      {title}
                    </span>
                    <span className="block text-[13.5px] text-ink-500 mt-0.5">
                      {desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Informes de ejemplo en miniatura: solo desktop, en el celular
                el formulario va primero y ocupa el protagonismo. */}
            <div className="hidden lg:block">
              <HeroReportCards />
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
