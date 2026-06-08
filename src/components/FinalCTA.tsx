"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #1246D6 0, transparent 40%), radial-gradient(circle at 80% 80%, #3B73EE 0, transparent 40%)",
        }}
      />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Pago seguro · Entrega en minutos
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            ¿Estás por comprar un usado?
          </h2>
          <p className="mt-3 text-white/80 text-lg">
            Verificá el vehículo antes de cualquier seña. Te lo mandamos en 10 a
            15 minutos por email y WhatsApp.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="xl">
              <a href="#formulario">
                Solicitar mi informe
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <a
                href="https://wa.me/5493515724733?text=Hola%2C%20quiero%20consultar%20por%20un%20informe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
