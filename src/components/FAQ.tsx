"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS as faqs } from "@/lib/faqs";

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-ink-100/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
              Preguntas Frecuentes
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
              Todo lo que necesitás saber
            </h2>
            <p className="mt-3 text-ink-700">
              Si te queda alguna duda, escribinos por WhatsApp y te respondemos al instante.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
