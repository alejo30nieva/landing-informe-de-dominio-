import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de los servicios de Gestoría Córdoba.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: false },
};

export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      subtitle="Condiciones de uso del sitio y de los servicios contratados."
      updated="2026-01-01"
    >
      <p>
        El presente documento regula el uso del sitio web y los servicios
        ofrecidos por <strong>{COMPANY.legalName}</strong> (en adelante, "la
        Compañía"), con domicilio en {COMPANY.address}, CUIT {COMPANY.cuit}.
      </p>

      <h2>1. Naturaleza del servicio</h2>
      <p>
        La Compañía es una organización privada e independiente. No posee
        relación, vínculo ni representación con la Dirección Nacional de los
        Registros Nacionales de la Propiedad del Automotor y de Créditos
        Prendarios (DNRPA), ni con ninguna entidad estatal o gubernamental de la
        República Argentina.
      </p>
      <p>
        Los servicios consisten en la gestión, intermediación y/o consulta de
        información obtenida de fuentes oficiales por encargo del Usuario, con
        entrega online del documento solicitado.
      </p>

      <h2>2. Aceptación</h2>
      <p>
        El uso del sitio y/o la contratación de servicios implica el
        conocimiento y aceptación expresa de los presentes términos. Si no está
        de acuerdo, abstenerse de utilizar los servicios.
      </p>

      <h2>3. Datos del Usuario</h2>
      <p>
        El Usuario garantiza la veracidad y exactitud de los datos
        proporcionados (patente, email, teléfono, CUIT/CUIL). La Compañía no se
        responsabiliza por errores derivados de datos erróneos.
      </p>

      <h2>4. Precio y pago</h2>
      <p>
        Los precios figuran expresados en pesos argentinos. El pago se realiza
        a través de pasarelas externas (MercadoPago) o transferencia bancaria.
        El servicio se procesa una vez confirmado el pago.
      </p>

      <h2>5. Plazos de entrega</h2>
      <p>
        El plazo estimado de entrega del Informe es de 10 a 15 minutos desde la
        confirmación del pago, en horario hábil. En horarios no laborables,
        fines de semana o feriados, el plazo puede extenderse hasta el
        siguiente día hábil.
      </p>

      <h2>6. Cancelación y reembolso</h2>
      <p>
        El Usuario podrá ejercer el derecho de arrepentimiento dentro de los 10
        (diez) días corridos desde la contratación, siempre que el servicio no
        haya sido aún prestado, conforme al Art. 1110 del Código Civil y
        Comercial y la Ley 24.240 de Defensa del Consumidor. Para hacerlo,
        utilice el{" "}
        <a href="/arrepentimiento">Botón de Arrepentimiento</a>.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        La Compañía no garantiza la disponibilidad ininterrumpida del sitio. La
        información del Informe corresponde al momento de la consulta y puede
        variar posteriormente. La Compañía no responde por daños indirectos
        derivados del uso de la información.
      </p>

      <h2>8. Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, marcas, logos, diseños) son
        propiedad de la Compañía o cuentan con licencia para su uso. Queda
        prohibida su reproducción sin autorización.
      </p>

      <h2>9. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de la República Argentina. Para
        cualquier conflicto, las partes se someten a los Tribunales Ordinarios
        de la Ciudad de {COMPANY.city}, renunciando a cualquier otro fuero.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para dudas o reclamos: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> ·{" "}
        <a href={`https://wa.me/${COMPANY.waPhone}`} target="_blank" rel="noopener noreferrer">
          WhatsApp {COMPANY.waDisplay}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
