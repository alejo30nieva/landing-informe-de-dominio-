"use client";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Award, Users, ShieldCheck } from "lucide-react";

const stats = [
  { value: "5.0", label: "Estrellas en Google" },
  { value: "100%", label: "Reseñas positivas" },
  { value: "2 días", label: "Resolución promedio" },
  { value: "Online", label: "Toda Argentina" },
];

/** Reseñas reales de Google (transcriptas de las capturas del perfil). */
const reviews = [
  {
    name: "Manuel Oliva",
    initial: "M",
    tag: "Local Guide",
    when: "Hace 4 meses",
    text:
      "La capacidad de solucionar que tiene esta gestora es impresionante, muy agradecido, la verdad impecable, la super recomiendo. Lo que me pudo llevar días, semanas o meses, ella en 2 días completamente solucionado. ¡Muchas gracias!",
    color: "#1A73E8",
  },
  {
    name: "Nicolas Orellana",
    initial: "N",
    when: "Hace 2 meses",
    text:
      "Excelente servicio, atentos, profesionales y rápido en la gestión de mi trámite.",
    color: "#0F9D58",
  },
  {
    name: "Carla Parieta",
    initial: "C",
    when: "Hace 1 año",
    text:
      "100% recomendables. Te asesoran en todas tus dudas. Excelente la atención.",
    color: "#A142F4",
  },
  {
    name: "Gustavo Andrés Sánchez",
    initial: "G",
    when: "Hace 1 semana",
    text: "100% recomendable, muy buena atención.",
    color: "#D93025",
  },
  {
    name: "Iván Buenar",
    initial: "I",
    when: "Hace 1 año",
    text: "¡Excelente atención!",
    color: "#F29900",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            Reseñas reales
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-ink-300 shadow-soft">
            <GoogleG />
            <span className="font-bold text-brand-950">5.0</span>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span className="text-sm text-ink-500">en Google</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-ink-300 text-center shadow-soft"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-700">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] sm:text-sm text-ink-500">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-ink-300 p-5 shadow-soft flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-brand-950 text-[14px] truncate flex items-center gap-1.5">
                    {r.name}
                    {r.tag && (
                      <span className="text-[10px] font-medium text-ink-500 shrink-0">
                        · {r.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ink-500">{r.when}</div>
                </div>
                <GoogleG />
              </div>
              <div className="mt-2.5 flex items-center gap-0.5">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-2.5 text-[14px] text-ink-800 leading-relaxed flex-1">
                {r.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Badge icon={ShieldCheck} label="SSL Encriptado" />
          <Badge icon={BadgeCheck} label="Mandataria Matriculada" />
          <Badge icon={Award} label="Atención profesional" />
          <Badge icon={Users} label="Reseñas verificadas" />
        </div>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-ink-300 text-sm text-ink-700 font-medium shadow-soft">
      <Icon className="h-4 w-4 text-brand-700" />
      {label}
    </div>
  );
}
