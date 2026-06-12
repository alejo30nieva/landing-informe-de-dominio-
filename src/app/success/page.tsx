"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Home,
  FileCheck2,
  Copy,
  Check,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  postPurchaseWhatsAppLink,
  serviceTitleFromSlug,
  serviceSlugFromSku,
} from "@/lib/whatsapp";

function SuccessInner() {
  const params = useSearchParams();
  const sku = params.get("order") ?? "—";
  // El servicio viene en ?svc=; si no, lo derivamos del prefijo del SKU.
  const svcSlug = params.get("svc") ?? serviceSlugFromSku(sku);
  const serviceTitle = serviceTitleFromSlug(svcSlug);
  const waLink = postPurchaseWhatsAppLink(serviceTitle, sku);

  const [copied, setCopied] = useState(false);
  const copySku = async () => {
    try {
      await navigator.clipboard.writeText(sku);
      setCopied(true);
      toast.success("Código copiado");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <main className="container mx-auto py-10 sm:py-16 md:py-24 px-[max(1rem,env(safe-area-inset-left))]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[min(100%,36rem)] mx-auto bg-white border border-ink-300 rounded-2xl shadow-elevate p-6 sm:p-8 text-center"
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
        <p className="mt-2 text-ink-700 text-[15px] leading-relaxed">
          Recibimos tu pago del <strong className="text-brand-950">{serviceTitle}</strong>.
          Estamos procesándolo y te lo enviaremos en los próximos minutos por
          email y WhatsApp.
        </p>

        {/* CÓDIGO DE COMPRA — grande y destacado */}
        <div className="mt-6 rounded-xl bg-brand-50 border border-brand-100 p-4">
          <div className="text-[11px] uppercase tracking-widest font-bold text-brand-700">
            Tu código de compra
          </div>
          <button
            type="button"
            onClick={copySku}
            className="mt-1.5 inline-flex items-center gap-2 group"
            aria-label="Copiar código de compra"
          >
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-wider break-all">
              {sku}
            </span>
            {copied ? (
              <Check className="h-5 w-5 text-success shrink-0" />
            ) : (
              <Copy className="h-5 w-5 text-ink-500 group-hover:text-brand-700 shrink-0 transition-colors" />
            )}
          </button>
          <p className="mt-1 text-[11px] text-ink-500">
            Guardalo: identifica tu pedido al instante.
          </p>
        </div>

        {/* CTA principal: WhatsApp con mensaje + SKU */}
        <div className="mt-6 flex flex-col gap-2.5">
          <Button asChild size="lg" className="w-full h-12 bg-[#25D366] hover:bg-[#1ebe5b]">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">
              <Home className="h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-[12px] text-ink-500">
          <FileCheck2 className="h-3.5 w-3.5 text-brand-700" />
          Entrega estimada: 10 a 15 minutos
        </p>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="container py-20 text-center text-ink-500">Cargando…</div>
        }
      >
        <SuccessInner />
      </Suspense>
      <Footer />
    </>
  );
}
