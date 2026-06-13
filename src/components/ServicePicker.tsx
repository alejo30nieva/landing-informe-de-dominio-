"use client";
import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  Zap,
  FileText,
  Users,
  UserSearch,
  Banknote,
  ShoppingCart,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";

const ICONS: Record<string, any> = {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
};

type Props = {
  services: Service[];
  value: string;
  onChange: (slug: string) => void;
  /** Label arriba del trigger. */
  label?: string;
};

/**
 * Selector colapsable de informe.
 * - Tap en el trigger → abre el panel con todas las opciones.
 * - Tap en una opción → cambia el valor y cierra el panel.
 * - Click afuera / ESC → cierra sin cambiar.
 */
export function ServicePicker({ services, value, onChange, label = "Elegí tu informe" }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const listboxId = useId();

  const selected = services.find((s) => s.slug === value) ?? services[0];

  // Cierre por click afuera / ESC
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Al abrir en mobile, asegurar que el panel quede visible
  useEffect(() => {
    if (open && wrapperRef.current) {
      // Scroll suave para que el panel no quede cortado abajo en móvil
      setTimeout(() => {
        listRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 80);
    }
  }, [open]);

  function pick(slug: string) {
    onChange(slug);
    // pequeño delay para que se vea el check antes de cerrar
    setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <Label htmlFor={triggerId} className="mb-1.5 block text-[12.5px] sm:text-sm">
        {label}
      </Label>

      {/* TRIGGER (collapsed) */}
      <button
        id={triggerId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border bg-white text-left transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/30",
          open
            ? "border-brand-700 ring-1 ring-brand-700/20"
            : "border-ink-300 hover:border-brand-700/40"
        )}
      >
        <ServiceIcon service={selected} active />
        <span className="flex-1 min-w-0 overflow-hidden">
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="font-semibold text-[14px] text-brand-950 truncate min-w-0">
              {selected.title}
            </span>
            {selected.slug === "informe-multas-express" && (
              <BadgeExpress />
            )}
            {selected.slug === "informe-compra-segura" && (
              <BadgeCombo />
            )}
          </span>
        </span>
        <span className="text-right shrink-0">
          <span className="block text-[14px] sm:text-[15px] font-bold text-brand-950 whitespace-nowrap">
            {selected.priceARS ? `$${selected.priceARS.toLocaleString("es-AR")}` : "—"}
          </span>
          <span className="block text-[9.5px] sm:text-[10px] text-ink-500 uppercase font-semibold tracking-wider">
            Cambiar
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-brand-700 transition-transform shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {/* PANEL (expanded) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label={label}
            ref={listRef}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-30 left-0 right-0 mt-2 overflow-hidden rounded-xl bg-white border border-ink-300 shadow-elevate"
          >
            <div className="max-h-[60dvh] overflow-y-auto p-1">
              {services.map((s) => {
                const active = s.slug === value;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => pick(s.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors",
                      active
                        ? "bg-brand-50"
                        : "hover:bg-ink-100 active:bg-ink-100"
                    )}
                  >
                    <ServiceIcon service={s} active={active} />
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "font-semibold text-[13.5px] truncate",
                            active ? "text-brand-950" : "text-brand-950"
                          )}
                        >
                          {s.title}
                        </span>
                        {s.slug === "informe-multas-express" && <BadgeExpress />}
                        {s.slug === "informe-compra-segura" && <BadgeCombo />}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[14px] font-bold text-brand-950">
                        {s.priceARS ? `$${s.priceARS.toLocaleString("es-AR")}` : "—"}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full border ml-auto",
                          active
                            ? "border-brand-700 bg-brand-700 text-white"
                            : "border-ink-300 bg-white"
                        )}
                      >
                        {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceIcon({ service, active }: { service: Service; active?: boolean }) {
  const Icon = ICONS[service.icon] ?? FileText;
  return (
    <span
      className={cn(
        "shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
        active ? "bg-brand-700 text-white" : "bg-ink-100 text-brand-700"
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

function BadgeExpress() {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-warning text-white text-[9px] font-bold uppercase tracking-wider">
      <Zap className="h-2.5 w-2.5" /> Express
    </span>
  );
}

function BadgeCombo() {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success text-white text-[9px] font-bold uppercase tracking-wider">
      Combo
    </span>
  );
}
