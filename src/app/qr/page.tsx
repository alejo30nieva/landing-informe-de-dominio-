"use client";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
  Download,
  MessageCircle,
  QrCode,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getFormSelectableServices,
  formatPrice,
  type Service,
} from "@/lib/services";
import { qrServiceWhatsAppLink, skuPrefix } from "@/lib/whatsapp";

const SVC_ICONS: Record<string, any> = {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
};

export default function QrPage() {
  const services = getFormSelectableServices();

  return (
    <>
      <Header />
      <main className="bg-ink-100/40 min-h-[60dvh]">
        <section className="container mx-auto py-10 sm:py-14 px-[max(1rem,env(safe-area-inset-left))]">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 print:hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
              <QrCode className="h-3.5 w-3.5" />
              Códigos QR
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
              Pedí tu informe escaneando
            </h1>
            <p className="mt-3 text-ink-700">
              Escaneá el QR del informe que necesitás y se abre WhatsApp con el
              mensaje listo. Ideal para imprimir o mostrar en el local.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="mt-5 inline-flex items-center gap-1.5 px-4 h-10 rounded-lg border border-ink-300 bg-white text-brand-950 font-semibold text-sm hover:bg-brand-50 hover:border-brand-700/40 transition-colors"
            >
              <Download className="h-4 w-4" />
              Imprimir todos
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {services.map((s) => (
              <QrCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function QrCard({ service }: { service: Service }) {
  const Icon = SVC_ICONS[service.icon] ?? FileText;
  const link = qrServiceWhatsAppLink(service);
  const price = formatPrice(service);
  const prefix = `GC-${skuPrefix(service.slug)}`;
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const canvas = canvasWrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${service.slug}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center rounded-2xl border border-ink-300 bg-white p-5 text-center break-inside-avoid">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700">
          {prefix}
        </span>
      </div>
      <h2 className="text-[15px] font-bold text-brand-950 leading-tight">
        {service.title}
      </h2>
      {price && (
        <div className="mt-0.5 text-lg font-extrabold text-brand-950">
          {price}
        </div>
      )}

      {/* QR — nítido, con margen de silencio y alto contraste */}
      <div
        ref={canvasWrapRef}
        className="mt-3 p-3 rounded-xl bg-white border border-ink-300 shadow-soft"
      >
        <QRCodeCanvas
          value={link}
          size={216}
          level="M"
          marginSize={2}
          fgColor="#0B1F3A"
          bgColor="#FFFFFF"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2 w-full print:hidden">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold text-sm transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Abrir WhatsApp
        </a>
        <button
          type="button"
          onClick={download}
          className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-ink-300 text-brand-950 font-medium text-xs hover:bg-ink-100 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Descargar PNG
        </button>
      </div>
    </div>
  );
}
