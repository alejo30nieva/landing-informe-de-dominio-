import type { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Botón de Arrepentimiento",
  description:
    "Ejercé tu derecho de arrepentimiento conforme Ley 24.240 y Resolución 424/2020.",
  alternates: { canonical: "/arrepentimiento" },
  robots: { index: true, follow: false },
};

export default function ArrepentimientoPage() {
  const waUrl = `https://wa.me/${COMPANY.waPhone}?text=${encodeURIComponent(
    "Hola, quiero ejercer el derecho de arrepentimiento. Datos:\nN° de orden:\nEmail:\nPatente:"
  )}`;
  const mailUrl = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    "Botón de Arrepentimiento"
  )}&body=${encodeURIComponent(
    "Hola, deseo ejercer el derecho de arrepentimiento.\n\nN° de orden:\nEmail registrado:\nPatente consultada:\nMotivo (opcional):"
  )}`;

  return (
    <LegalLayout
      title="Botón de Arrepentimiento"
      subtitle="Solicitá la cancelación de tu compra dentro de los 10 días corridos."
      updated="2026-01-01"
    >
      <p>
        Conforme al <strong>Art. 1110 del Código Civil y Comercial</strong> y la{" "}
        <strong>Ley 24.240 de Defensa del Consumidor</strong>, tenés derecho a
        revocar la operación dentro de los <strong>10 (diez) días corridos</strong>{" "}
        contados desde la celebración del contrato o desde la entrega del
        servicio, lo que ocurra último, sin necesidad de invocar causa alguna.
      </p>

      <h2>¿Cómo ejercer el derecho?</h2>
      <p>Podés hacerlo por cualquiera de los siguientes medios:</p>
      <ul>
        <li>WhatsApp al <strong>{COMPANY.waDisplay}</strong>.</li>
        <li>Email a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</li>
        <li>Correo postal a <strong>{COMPANY.address}</strong>.</li>
      </ul>

      <p>Por favor, incluí los siguientes datos para agilizar el proceso:</p>
      <ul>
        <li>Número de orden.</li>
        <li>Email registrado en la compra.</li>
        <li>Patente consultada.</li>
        <li>Motivo (opcional).</li>
      </ul>

      <div className="not-prose mt-6 grid sm:grid-cols-2 gap-3">
        <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#1ebe5b]">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> Solicitar por WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full">
          <a href={mailUrl}>
            <Mail className="h-4 w-4" /> Solicitar por Email
          </a>
        </Button>
      </div>

      <h2>Plazo de reembolso</h2>
      <p>
        Reintegraremos el monto abonado dentro de los 30 días corridos desde
        recibida tu solicitud, siempre que el informe aún no haya sido entregado.
        Si el informe ya fue entregado, el derecho de arrepentimiento no aplica
        por tratarse de un servicio digital cuyo cumplimiento comenzó con tu
        conformidad expresa.
      </p>

      <h2>Consultas</h2>
      <p>
        Si necesitás ayuda, escribinos por WhatsApp y te respondemos en el día.
      </p>
    </LegalLayout>
  );
}
