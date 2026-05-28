"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Mail, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessInner() {
  const params = useSearchParams();
  const order = params.get("order") ?? "—";

  return (
    <main className="container mx-auto py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto bg-white border border-ink-300 rounded-2xl shadow-elevate p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success border-4 border-success/20"
        >
          <CheckCircle2 className="h-9 w-9" />
        </motion.div>

        <h1 className="mt-5 text-2xl md:text-3xl font-extrabold text-brand-950 tracking-tight">
          ¡Pago aprobado!
        </h1>
        <p className="mt-2 text-ink-700">
          Recibimos tu pago correctamente. Estamos procesando tu Informe de
          Dominio y te lo enviaremos en los próximos minutos por email y WhatsApp.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ink-100 text-sm">
          <FileCheck2 className="h-4 w-4 text-brand-700" />
          <span className="text-ink-500">Orden</span>
          <span className="font-mono font-semibold text-brand-950">{order}</span>
        </div>

        <div className="mt-7 grid sm:grid-cols-2 gap-3">
          <Button asChild variant="outline" className="w-full">
            <a
              href="https://wa.me/5493515724733?text=Hola%2C%20hice%20un%20pago%20de%20Informe%20de%20Dominio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
          </Button>
          <Button asChild className="w-full">
            <Link href="/">
              <Mail className="h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container py-20 text-center text-ink-500">Cargando…</div>}>
        <SuccessInner />
      </Suspense>
      <Footer />
    </>
  );
}
