import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { GUIAS, getGuiaBySlug, type GuiaBlock } from "@/lib/guias";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guia = getGuiaBySlug(params.slug);
  if (!guia) return {};
  return {
    title: guia.metaTitle,
    description: guia.description,
    keywords: guia.keywords,
    alternates: { canonical: `/guias/${guia.slug}` },
    openGraph: {
      type: "article",
      title: guia.metaTitle,
      description: guia.description,
      url: `${SITE_URL}/guias/${guia.slug}`,
      publishedTime: guia.datePublished,
    },
  };
}

export default function GuiaPage({ params }: { params: { slug: string } }) {
  const guia = getGuiaBySlug(params.slug);
  if (!guia) notFound();

  const related = GUIAS.filter((g) => g.slug !== guia.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: guia.title,
            description: guia.description,
            url: `${SITE_URL}/guias/${guia.slug}`,
            datePublished: guia.datePublished,
          }),
          breadcrumbSchema([
            { name: "Inicio", url: SITE_URL },
            { name: "Guías", url: `${SITE_URL}/guias` },
            { name: guia.title, url: `${SITE_URL}/guias/${guia.slug}` },
          ]),
        ]}
      />
      <TopBar />
      <Header />
      <main className="bg-white">
        <article className="py-10 md:py-16">
          <div className="container mx-auto max-w-2xl">
            {/* Breadcrumb visible */}
            <nav className="flex items-center gap-1.5 text-[12px] text-ink-500 mb-5">
              <Link href="/" className="hover:text-brand-700">Inicio</Link>
              <span>/</span>
              <Link href="/guias" className="hover:text-brand-700">Guías</Link>
            </nav>

            <div className="inline-flex items-center gap-1.5 text-[12px] text-ink-500 font-medium mb-3">
              <Clock className="h-3.5 w-3.5" />
              {guia.readMin} min de lectura
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              {guia.title}
            </h1>

            <div className="prose-legal mt-6">
              {guia.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-ink-300">
                <h2 className="text-lg font-bold text-brand-950 mb-4">
                  Seguí leyendo
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/guias/${r.slug}`}
                      className="group rounded-xl border border-ink-300 p-4 hover:border-brand-700/30 hover:shadow-soft transition-all"
                    >
                      <h3 className="font-semibold text-brand-950 text-[15px] leading-snug group-hover:text-brand-700 transition-colors">
                        {r.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-700">
                        Leer <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Block({ block }: { block: GuiaBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "cta":
      return (
        <div className="not-prose my-8 rounded-2xl bg-brand-950 text-white p-6 text-center">
          <p className="text-lg font-bold mb-4">{block.text}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/#formulario">
                Solicitar informe
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a
                href="https://wa.me/5493515724733?text=Hola%2C%20quiero%20consultar%20por%20un%20informe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      );
    default:
      return null;
  }
}
