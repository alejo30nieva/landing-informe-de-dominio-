"use client";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Lock, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Rápido",
    desc: "Recibí el informe en minutos directamente en tu casilla de email.",
  },
  {
    icon: ShieldCheck,
    title: "Confiable",
    desc: "Datos oficiales obtenidos desde el Registro Nacional Automotor.",
  },
  {
    icon: Lock,
    title: "Seguro",
    desc: "Pasarela cifrada y procesamiento PCI a través de MercadoPago.",
  },
  {
    icon: Headphones,
    title: "Atención real",
    desc: "Una persona te responde por WhatsApp en horario comercial.",
  },
];

export function Benefits() {
  return (
    <section className="py-14 md:py-20 bg-white border-y border-ink-300/60">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl bg-white border border-ink-300 hover:border-brand-700/30 hover:shadow-card transition-all"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-brand-950">{b.title}</h3>
              <p className="mt-1.5 text-sm text-ink-700 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
