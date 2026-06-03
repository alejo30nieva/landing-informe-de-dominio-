import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function LegalLayout({
  title,
  subtitle,
  children,
  updated,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-ink-100/40 min-h-[60vh] py-12 md:py-16">
        <div className="container mx-auto max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-ink-700">{subtitle}</p>
            )}
            {updated && (
              <p className="mt-2 text-xs text-ink-500">
                Última actualización: {updated}
              </p>
            )}
          </header>
          <article className="bg-white border border-ink-300 rounded-2xl shadow-soft p-6 md:p-10 prose-legal">
            {children}
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
