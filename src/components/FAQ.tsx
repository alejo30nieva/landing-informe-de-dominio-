"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto demora el informe?",
    a: "En la mayoría de los casos el informe se entrega entre 5 y 15 minutos después de confirmado el pago. En horarios pico o fines de semana puede demorar hasta 1 hora hábil.",
  },
  {
    q: "¿Cómo recibo el informe?",
    a: "El informe llega en formato PDF al email que indicaste en el formulario. Además te avisamos por WhatsApp apenas esté listo para que no se te pase.",
  },
  {
    q: "¿Qué incluye el informe?",
    a: "Datos completos del vehículo, titular registral, histórico de transferencias, deudas de patente, multas, embargos, inhibiciones, prendas y estado legal general según el Registro Nacional.",
  },
  {
    q: "¿Es oficial?",
    a: "Sí. La información proviene de fuentes oficiales del Registro Nacional de la Propiedad del Automotor. Nuestra mandataria está matriculada para realizar este tipo de consultas.",
  },
  {
    q: "¿Qué pasa después del pago?",
    a: "Recibís un email y mensaje de WhatsApp confirmando que tu pedido fue tomado. Nuestro equipo procesa el informe y te lo envía por los dos canales apenas esté listo.",
  },
  {
    q: "¿Puedo consultar cualquier vehículo?",
    a: "Sí. Podés consultar cualquier vehículo registrado en Argentina con sólo conocer la patente, tanto formato Mercosur (AB123CD) como formato tradicional (ABC123).",
  },
];

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
