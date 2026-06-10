"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#informes", label: "Informes" },
  { href: "/#que-es", label: "¿Qué es?" },
  { href: "/servicios", label: "Gestoría" },
  { href: "/ejemplos", label: "Ejemplos" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-ink-300 shadow-soft"
          : "bg-white border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 max-w-full">
        <Link href="/" className="flex items-center gap-2 group min-w-0 flex-1 overflow-hidden">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white shadow-soft">
            <FileCheck2 className="h-5 w-5" />
          </span>
          <div className="leading-tight min-w-0 flex-1 overflow-hidden">
            <div className="font-bold text-brand-950 text-[14px] sm:text-[15px] tracking-tight truncate">
              Gestoría Córdoba
            </div>
            <div className="hidden xs:block text-[11px] text-ink-500 -mt-0.5 truncate">
              Informe de Dominio Automotor
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-700 hover:text-brand-700 transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild className="hidden md:inline-flex" size="sm">
            <a href="/#formulario">Consultar Informe</a>
          </Button>
          <button
            type="button"
            aria-label="Abrir menú"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-950 hover:bg-ink-100 shrink-0"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-300 bg-white">
          <div className="container mx-auto py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 rounded-lg text-ink-700 hover:bg-ink-100 font-medium"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2 w-full">
              <a href="/#formulario" onClick={() => setOpen(false)}>
                Consultar Informe
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
