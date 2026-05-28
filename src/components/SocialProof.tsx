"use client";
import { motion } from "framer-motion";
import { Star, CheckCircle2, BadgeCheck, Award, Users, ShieldCheck } from "lucide-react";

const stats = [
  { value: "+15.000", label: "Informes gestionados" },
  { value: "4.9/5", label: "Calificación promedio" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "<15min", label: "Tiempo de entrega" },
];

const testimonials = [
  {
    name: "Martín G.",
    when: "10:34",
    text: "Quería comprar un Corolla usado y este informe me salvó. Tenía un embargo escondido. Súper recomendable.",
  },
  {
    name: "Lucía P.",
    when: "16:12",
    text: "Atención por WhatsApp espectacular. Me explicaron todo el informe y lo recibí en menos de 10 minutos.",
  },
  {
    name: "Diego R.",
    when: "09:05",
    text: "Profesionales y rápidos. Hice el informe el sábado a la noche y me llegó al toque. 100% recomendado.",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            Confianza
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
            Miles de personas ya nos eligieron
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-ink-300 text-center shadow-soft"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-brand-700">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-ink-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative rounded-2xl bg-[#E5DDD5] p-3 shadow-soft"
            >
              <div className="rounded-xl bg-[#DCF8C6] p-4">
                <div className="flex items-center justify-between text-[11px] text-ink-700/80 mb-1.5">
                  <span className="font-semibold text-brand-950">{t.name}</span>
                  <span>{t.when}</span>
                </div>
                <p className="text-[14px] text-ink-900 leading-relaxed">{t.text}</p>
                <div className="mt-2 flex items-center gap-1 justify-end">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <CheckCircle2 className="h-3.5 w-3.5 text-success ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Badge icon={ShieldCheck} label="SSL Encriptado" />
          <Badge icon={BadgeCheck} label="Mandataria Matriculada" />
          <Badge icon={Award} label="Atención profesional" />
          <Badge icon={Users} label="+15.000 clientes" />
        </div>
      </div>
    </section>
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
