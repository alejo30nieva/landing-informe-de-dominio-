"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, MessageCircle, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function PendingInner() {
  const params = useSearchParams();
  const order = params.get("order") ?? "—";
  const status = params.get("status");

  return (
    <main className="container mx-auto py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto bg-white border border-ink-300 rounded-2xl shadow-elevate p-8 text-center"
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-warning/10 text-warning border-4 border-warning/20">
          <Clock className="h-9 w-9" />
        </div>

        <h1 className="mt-5 text-2xl md:text-3xl font-extrabold text-brand-950 tracking-tight">
          {status === "failure" ? "Pago no completado" : "Tu pago está pendiente"}
        </h1>
        <p className="mt-2 text-ink-700">
          {status === "failure"
            ? "Hubo un inconveniente al procesar el pago. Podés intentar de nuevo o pagar por transferencia."
            : "Estamos esperando la confirmación del pago. Cuando se acredite, te enviamos el informe de forma automática."}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ink-100 text-sm">
          <FileCheck2 className="h-4 w-4 text-brand-700" />
          <span className="text-ink-500">Orden</span>
          <span className="font-mono font-semibold text-brand-950">{order}</span>
        </div>

        <div className="mt-7 grid sm:grid-cols-2 gap-3">
          <Button asChild variant="outline" className="w-full">
            <a
              href={buildWhatsAppLink(`Hola, tengo un pago pendiente. Código: ${order}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
            </a>
          </Button>
          <Button asChild className="w-full">
            <Link href="/#formulario">Reintentar el pago</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

export default function PendingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container py-20 text-center text-ink-500">Cargando…</div>}>
        <PendingInner />
      </Suspense>
      <Footer />
    </>
  );
}
