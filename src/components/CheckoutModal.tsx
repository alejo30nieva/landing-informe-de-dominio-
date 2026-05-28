"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Banknote,
  Wallet,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  FileCheck2,
  Loader2,
  CheckCircle2,
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

type Method = "mercadopago" | "tarjeta" | "qr" | "transferencia";

const methods: { id: Method; label: string; icon: any; desc: string }[] = [
  { id: "mercadopago", label: "MercadoPago", icon: Wallet, desc: "Pagá con tu cuenta de MP" },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard, desc: "Débito / Crédito" },
  { id: "qr", label: "QR", icon: QrCode, desc: "Escaneá con tu app" },
  { id: "transferencia", label: "Transferencia", icon: Banknote, desc: "CBU / Alias" },
];

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  lead: LeadInput | null;
  price: number;
};

type CheckoutResp = {
  ok: boolean;
  orderId?: string;
  initPoint?: string;
  preferenceId?: string;
  qrBase64?: string;
  alias?: string;
  cbu?: string;
  titular?: string;
  banco?: string;
  error?: string;
};

export function CheckoutModal({ open, onOpenChange, lead, price }: Props) {
  const [method, setMethod] = useState<Method>("mercadopago");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CheckoutResp | null>(null);

  useEffect(() => {
    if (!open) {
      setMethod("mercadopago");
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
      } catch (e) {
        if (!cancel) {
          toast.error("Error de conexión. Probá de nuevo.");
        }
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
          <span className="text-ink-700">Informe de Dominio</span>
          <span className="font-semibold text-brand-950">{formatARS(price)}</span>
        </div>
        {lead?.patente && (
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>Patente</span>
            <span className="font-mono tracking-widest text-brand-950">
              {lead.patente}
            </span>
          </div>
        )}
        {lead?.email && (
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>Email</span>
            <span className="text-brand-950 truncate max-w-[60%]">{lead.email}</span>
          </div>
        )}
        <div className="pt-2 mt-2 border-t border-ink-300 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-950">Total</span>
          <span className="text-lg font-extrabold text-brand-950">{formatARS(price)}</span>
        </div>
      </div>
    ),
    [lead, price]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] p-0">
        <div className="bg-brand-950 text-white px-6 py-4 flex items-center gap-3 rounded-t-2xl">
          <div className="h-9 w-9 rounded-md bg-brand-700 flex items-center justify-center">
            <Lock className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <DialogTitle className="text-white text-base">
              Checkout seguro
            </DialogTitle>
            <p className="text-xs text-white/70">
              Pago cifrado y procesado por MercadoPago
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
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                      active
                        ? "border-brand-700 bg-brand-50 shadow-soft"
                        : "border-ink-300 bg-white hover:border-brand-700/40"
                    }`}
                  >
                    <m.icon
                      className={`h-5 w-5 ${active ? "text-brand-700" : "text-ink-700"}`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        active ? "text-brand-950" : "text-ink-700"
                      }`}
                    >
                      {m.label}
                    </span>
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
                <MethodPanel method={method} data={data} orderId={data?.orderId} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="rounded-xl bg-success-50 border border-success/20 p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
            <p className="text-xs text-ink-700 leading-relaxed">
              Tu pago se procesa de forma cifrada. No almacenamos datos de tu
              tarjeta. Recibirás el informe por email y WhatsApp apenas
              confirmemos el pago.
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

function MethodPanel({
  method,
  data,
  orderId,
}: {
  method: Method;
  data: CheckoutResp | null;
  orderId?: string;
}) {
  if (!data || !data.ok) {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
        {data?.error ?? "No pudimos preparar el checkout. Probá nuevamente."}
      </div>
    );
  }

  if (method === "mercadopago" || method === "tarjeta") {
    return (
      <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-4">
        <div className="flex items-center gap-2 text-sm text-ink-700">
          <FileCheck2 className="h-4 w-4 text-brand-700" />
          Orden <span className="font-mono text-brand-950">{orderId}</span>
        </div>
        <p className="text-sm text-ink-700 leading-relaxed">
          {method === "tarjeta"
            ? "Vas a ser redirigido al checkout seguro de MercadoPago para pagar con tarjeta de débito o crédito."
            : "Vas a ser redirigido al checkout de MercadoPago para pagar con tu cuenta, tarjeta o dinero disponible."}
        </p>
        <Button asChild size="lg" className="w-full">
          <a href={data.initPoint} rel="noopener noreferrer">
            Ir a pagar {method === "tarjeta" ? "con tarjeta" : "con MercadoPago"}
          </a>
        </Button>
        <p className="text-[11px] text-center text-ink-500">
          Al continuar aceptás los Términos del servicio.
        </p>
      </div>
    );
  }

  if (method === "qr") {
    return (
      <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div className="shrink-0 p-3 rounded-xl bg-white border border-ink-300 shadow-soft">
            {data.qrBase64 ? (
              <img
                src={`data:image/png;base64,${data.qrBase64}`}
                alt="QR para pagar"
                className="h-44 w-44 object-contain"
              />
            ) : (
              <PlaceholderQR />
            )}
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-brand-950">
              Escaneá con tu app de pago
            </h4>
            <p className="text-sm text-ink-700 mt-1 max-w-xs">
              MercadoPago, Modo, BNA+, Galicia, Naranja X, Personal Pay y otras.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-semibold">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Esperando pago…
            </div>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full">
          <a href={data.initPoint} target="_blank" rel="noopener noreferrer">
            Abrir checkout web
          </a>
        </Button>
      </div>
    );
  }

  // transferencia
  return (
    <div className="rounded-xl border border-ink-300 p-5 bg-white space-y-3">
      <CopyRow
        label="Titular"
        value={data.titular ?? "Gestoría Córdoba S.R.L."}
      />
      <CopyRow label="Banco" value={data.banco ?? "Banco Nación"} />
      <CopyRow label="Alias" value={data.alias ?? "GESTORIA.CBA.MP"} />
      <CopyRow label="CBU/CVU" value={data.cbu ?? "0000003100012345678901"} />
      <CopyRow label="Orden / Concepto" value={orderId ?? "—"} />
      <div className="rounded-lg bg-warning/10 border border-warning/30 p-3 text-xs text-ink-700 leading-relaxed">
        Realizá la transferencia por el monto exacto y enviá el comprobante por
        WhatsApp al <strong>+54 9 3515 72-4733</strong> incluyendo el número de
        orden. Verificamos el pago manualmente y te enviamos el informe.
      </div>
    </div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
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
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-ink-100 border border-ink-300/60">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-ink-500">
          {label}
        </div>
        <div className="text-sm font-mono text-brand-950 truncate">{value}</div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-ink-300 text-xs font-semibold text-brand-950 hover:bg-brand-50 hover:border-brand-700/30 transition-colors"
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
          className={`${
            (i * 7) % 3 === 0 || (i * 11) % 5 === 0 ? "bg-brand-950" : "bg-white"
          }`}
        />
      ))}
    </div>
  );
}
