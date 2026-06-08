"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Banknote,
  Wallet,
  Copy,
  ShieldCheck,
  Lock,
  FileCheck2,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatARS } from "@/lib/utils";
import type { LeadInput } from "@/lib/validations";
import type { Service } from "@/lib/services";

type Method = "transferencia" | "qr" | "mercadopago" | "tarjeta";

// Orden importante: transferencia y QR primero (flujo principal solicitado por el cliente).
const methods: { id: Method; label: string; icon: any; desc: string; badge?: string }[] = [
  { id: "transferencia", label: "Transferencia", icon: Banknote, desc: "Alias / CBU", badge: "Recomendado" },
  { id: "qr", label: "QR", icon: QrCode, desc: "Escaneá y pagá" },
  { id: "mercadopago", label: "MercadoPago", icon: Wallet, desc: "Con tu cuenta MP" },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard, desc: "Débito / Crédito" },
];

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  lead: LeadInput | null;
  /** Servicio que el cliente eligió en el form. */
  service: Service;
};

type CheckoutResp = {
  ok: boolean;
  orderId?: string;
  serviceTitle?: string;
  amount?: number;
  initPoint?: string;
  preferenceId?: string;
  qrBase64?: string;
  qrUrl?: string | null;
  alias?: string;
  cbu?: string;
  titular?: string;
  banco?: string;
  error?: string;
};

export function CheckoutModal({ open, onOpenChange, lead, service }: Props) {
  const price = service.priceARS ?? 0;
  const [method, setMethod] = useState<Method>("transferencia");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CheckoutResp | null>(null);

  useEffect(() => {
    if (!open) {
      setMethod("transferencia");
      setData(null);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !lead) return;
    let cancel = false;
    const run = async () => {
      setLoading(true);
      setData(null);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, method }),
        });
        const json = (await res.json()) as CheckoutResp;
        if (!cancel) {
          if (!json.ok) {
            toast.error(json.error ?? "No pudimos generar el checkout");
          }
          setData(json);
        }
      } catch {
        if (!cancel) toast.error("Error de conexión. Probá de nuevo.");
      } finally {
        if (!cancel) setLoading(false);
      }
    };
    run();
    return () => {
      cancel = true;
    };
  }, [open, lead, method]);

  const summary = useMemo(
    () => (
      <div className="rounded-xl border border-ink-300 bg-ink-100/60 p-4 space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-700 font-medium">{service.title}</span>
          <span className="font-semibold text-brand-950">{formatARS(price)}</span>
        </div>
        {lead?.patente && (
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>Patente</span>
            <span className="font-mono tracking-widest text-brand-950">{lead.patente}</span>
          </div>
        )}
        {lead?.email && (
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>Email</span>
            <span className="text-brand-950 truncate max-w-[60%]">{lead.email}</span>
          </div>
        )}
        <div className="pt-2 mt-2 border-t border-ink-300 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-950">Total a pagar</span>
          <span className="text-lg font-extrabold text-brand-950">{formatARS(price)}</span>
        </div>
      </div>
    ),
    [lead, price, service.title]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[680px] p-0">
        <div className="bg-brand-950 text-white px-6 py-4 flex items-center gap-3 rounded-t-2xl">
          <div className="h-9 w-9 rounded-md bg-brand-700 flex items-center justify-center">
            <Lock className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <DialogTitle className="text-white text-base">Pago seguro</DialogTitle>
            <p className="text-xs text-white/70">
              Elegí cómo querés pagar — recibís el informe en 10–15 minutos
            </p>
          </div>
        </div>

        <div className="p-6 pt-2 space-y-5">
          {summary}

          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-ink-500 mb-2">
              Método de pago
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {methods.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                      active
                        ? "border-brand-700 bg-brand-50 shadow-soft"
                        : "border-ink-300 bg-white hover:border-brand-700/40"
                    }`}
                  >
                    {m.badge && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-success text-white font-bold">
                        {m.badge}
                      </span>
                    )}
                    <m.icon className={`h-5 w-5 ${active ? "text-brand-700" : "text-ink-700"}`} />
                    <span className={`text-xs font-semibold ${active ? "text-brand-950" : "text-ink-700"}`}>
                      {m.label}
                    </span>
                    <span className="text-[10px] text-ink-500 leading-tight">{m.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={method + (loading ? "_loading" : "_ready")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <CheckoutSkeleton />
              ) : (
                <MethodPanel method={method} data={data} lead={lead} price={price} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="rounded-xl bg-success-50 border border-success/20 p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
            <p className="text-xs text-ink-700 leading-relaxed">
              Tu pago se procesa de forma cifrada. No almacenamos datos de tu tarjeta.
              Recibirás el informe por <strong>email y WhatsApp</strong> entre 10 y 15 minutos.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="rounded-xl border border-ink-300 p-5 space-y-3">
      <div className="flex items-center gap-2 text-ink-500 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Preparando el pago…
      </div>
      <div className="h-3 w-2/3 rounded bg-gradient-to-r from-ink-100 via-ink-300/50 to-ink-100 bg-[length:1000px_100%] animate-shimmer" />
      <div className="h-3 w-1/2 rounded bg-gradient-to-r from-ink-100 via-ink-300/50 to-ink-100 bg-[length:1000px_100%] animate-shimmer" />
      <div className="h-12 w-full rounded-lg bg-gradient-to-r from-ink-100 via-ink-300/50 to-ink-100 bg-[length:1000px_100%] animate-shimmer" />
    </div>
  );
}

function buildWaComprobante(orderId: string, amount: number, patente?: string) {
  const phone = (process.env.NEXT_PUBLIC_WA_PHONE ?? "5493515724733").replace(/\D/g, "");
  const msg =
    `Hola! Adjunto el comprobante de pago del Informe de Dominio.\n` +
    `Orden: ${orderId}\n` +
    (patente ? `Patente: ${patente}\n` : "") +
    `Monto: $${amount.toLocaleString("es-AR")}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function MethodPanel({
  method,
  data,
  lead,
  price,
}: {
  method: Method;
  data: CheckoutResp | null;
  lead: LeadInput | null;
  price: number;
}) {
  if (!data || !data.ok) {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
        {data?.error ?? "No pudimos preparar el checkout. Probá nuevamente."}
      </div>
    );
  }

  const orderId = data.orderId ?? "—";
  const amount = data.amount ?? price;
  const waUrl = buildWaComprobante(orderId, amount, lead?.patente);

  // MercadoPago / Tarjeta: redirección clásica
  if (method === "mercadopago" || method === "tarjeta") {
    return (
      <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-4">
        <OrderHeader orderId={orderId} />
        <p className="text-sm text-ink-700 leading-relaxed">
          {method === "tarjeta"
            ? "Vas a ser redirigido al checkout seguro de MercadoPago para pagar con tarjeta de débito o crédito."
            : "Vas a ser redirigido a MercadoPago para pagar con tu cuenta, tarjeta o dinero disponible."}
        </p>
        <Button asChild size="lg" className="w-full">
          <a href={data.initPoint} rel="noopener noreferrer">
            Ir a pagar {method === "tarjeta" ? "con tarjeta" : "con MercadoPago"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <DeliveryHint />
      </div>
    );
  }

  // QR
  if (method === "qr") {
    return (
      <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-4">
        <OrderHeader orderId={orderId} />
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-stretch">
          <div className="shrink-0 p-3 rounded-xl bg-white border border-ink-300 shadow-soft">
            {data.qrUrl ? (
              <img src={data.qrUrl} alt="QR para pagar" className="h-44 w-44 object-contain" />
            ) : data.qrBase64 ? (
              <img
                src={`data:image/png;base64,${data.qrBase64}`}
                alt="QR para pagar"
                className="h-44 w-44 object-contain"
              />
            ) : (
              <PlaceholderQR />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-brand-950">Escaneá con tu app de pago</h4>
            <p className="text-sm text-ink-700 mt-1">
              MercadoPago, Modo, Galicia, BNA+, Naranja X, Personal Pay y cualquier billetera con QR interoperable.
            </p>
            <div className="mt-3 grid gap-1.5 text-xs">
              <KV k="Alias" v={data.alias ?? "—"} copy />
              <KV k="Monto" v={formatARS(amount)} />
              <KV k="Orden" v={orderId} />
            </div>
          </div>
        </div>
        <SendComprobanteStep waUrl={waUrl} />
        <DeliveryHint />
      </div>
    );
  }

  // Transferencia
  return (
    <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-4">
      <OrderHeader orderId={orderId} />
      <div className="grid gap-2.5">
        <CopyRow label="Titular" value={data.titular ?? "Gestoría Córdoba"} />
        <CopyRow label="Banco / Billetera" value={data.banco ?? "Mercado Pago"} />
        <CopyRow label="Alias" value={data.alias ?? "GESTORIA.CBA.MP"} primary />
        <CopyRow label="CBU / CVU" value={data.cbu ?? "0000003100012345678901"} />
        <CopyRow label="Monto exacto" value={formatARS(amount)} primary />
        <CopyRow label="N° de orden / concepto" value={orderId} />
      </div>
      <SendComprobanteStep waUrl={waUrl} />
      <DeliveryHint />
    </div>
  );
}

function OrderHeader({ orderId }: { orderId: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <div className="flex items-center gap-2 text-ink-700">
        <FileCheck2 className="h-4 w-4 text-brand-700" />
        <span>Orden</span>
        <span className="font-mono text-brand-950 font-semibold">{orderId}</span>
      </div>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-warning/10 text-warning text-[11px] font-bold">
        <Clock className="h-3 w-3" /> Esperando pago
      </span>
    </div>
  );
}

function DeliveryHint() {
  return (
    <p className="text-[11px] text-center text-ink-500 flex items-center justify-center gap-1.5">
      <Clock className="h-3 w-3" />
      Una vez verificado el pago, recibís el informe entre 10 y 15 minutos.
    </p>
  );
}

function SendComprobanteStep({ waUrl }: { waUrl: string }) {
  return (
    <div className="rounded-xl bg-brand-50 border border-brand-100 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">
        Paso 2 — Enviar comprobante
      </p>
      <p className="text-sm text-brand-950 leading-relaxed mb-3">
        Una vez realizado el pago, envianos el comprobante por WhatsApp con el
        número de orden para liberar tu informe.
      </p>
      <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#1ebe5b]">
        <a href={waUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4" />
          Enviar comprobante por WhatsApp
        </a>
      </Button>
    </div>
  );
}

function KV({ k, v, copy }: { k: string; v: string; copy?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-ink-100 border border-ink-300/60">
      <span className="text-ink-500">{k}</span>
      <span className="font-mono text-brand-950 truncate">{v}</span>
      {copy && (
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(v);
            toast.success(`${k} copiado`);
          }}
          className="text-ink-500 hover:text-brand-700"
          aria-label={`Copiar ${k}`}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function CopyRow({
  label,
  value,
  primary,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copiado`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("No se pudo copiar");
    }
  };
  return (
    <div
      className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${
        primary
          ? "bg-brand-50 border-brand-100"
          : "bg-ink-100 border-ink-300/60"
      }`}
    >
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-ink-500">
          {label}
        </div>
        <div
          className={`text-sm font-mono truncate ${
            primary ? "text-brand-700 font-bold text-base" : "text-brand-950"
          }`}
        >
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-ink-300 text-xs font-semibold text-brand-950 hover:bg-brand-50 hover:border-brand-700/30 transition-colors shrink-0"
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Copiado
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copiar
          </>
        )}
      </button>
    </div>
  );
}

function PlaceholderQR() {
  return (
    <div className="h-44 w-44 grid grid-cols-12 gap-px bg-white">
      {Array.from({ length: 144 }).map((_, i) => (
        <div
          key={i}
          className={
            (i * 7) % 3 === 0 || (i * 11) % 5 === 0 ? "bg-brand-950" : "bg-white"
          }
        />
      ))}
    </div>
  );
}
