"use client";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Banknote,
  Ban,
  Gavel,
  ShoppingCart,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Informe de dominio",
    desc: "Estado registral completo de cualquier vehículo.",
  },
  {
    icon: Users,
    title: "Histórico de titulares",
    desc: "Listado completo de todas las transferencias del vehículo.",
  },
  {
    icon: Banknote,
    title: "Multas y deudas",
    desc: "Verificación de patentes adeudadas y multas vigentes.",
  },
  {
    icon: Ban,
    title: "Inhibiciones",
    desc: "Detectá restricciones que impidan la transferencia.",
  },
  {
    icon: Gavel,
    title: "Embargos",
    desc: "Verificá si el vehículo tiene embargos judiciales.",
  },
  {
    icon: ShoppingCart,
    title: "Informe para compra segura",
    desc: "Paquete completo recomendado antes de comprar.",
  },
  {
    icon: Calculator,
    title: "Valuación fiscal",
    desc: "Valuación oficial para trámites y seguros.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-ink-100/50">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
            Soluciones integrales para tu vehículo
          </h2>
          <p className="mt-3 text-ink-700">
            Cubrimos todo lo que necesitás verificar antes de comprar, vender o
            transferir un automotor en Argentina.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#formulario"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              className="group relative p-6 rounded-2xl bg-white border border-ink-300 hover:border-brand-700/40 hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-500 group-hover:text-brand-700 transition-colors" />
              </div>
              <h3 className="mt-4 font-semibold text-brand-950">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-700 leading-relaxed">
                {s.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
