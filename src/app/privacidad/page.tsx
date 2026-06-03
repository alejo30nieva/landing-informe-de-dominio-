import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y tratamiento de datos personales conforme Ley 25.326.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: false },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      subtitle="Tratamiento de datos personales conforme Ley N° 25.326."
      updated="2026-01-01"
    >
      <p>
        <strong>{COMPANY.legalName}</strong>, con domicilio en {COMPANY.address},
        CUIT {COMPANY.cuit}, es responsable del tratamiento de los datos
        personales recolectados a través del presente Sitio.
      </p>

      <h2>1. Datos recolectados</h2>
      <p>Recolectamos los siguientes datos cuando contratás un servicio:</p>
      <ul>
        <li>Patente del vehículo a consultar.</li>
        <li>Email para envío del informe.</li>
        <li>Teléfono / WhatsApp para notificaciones.</li>
        <li>CUIT/CUIL (opcional, para facturación).</li>
        <li>
          Datos técnicos: IP, user-agent, fecha y hora de la solicitud (logs).
        </li>
      </ul>

      <h2>2. Finalidad del tratamiento</h2>
      <p>
        Conforme Art. 6 Ley N° 25.326: (a) la finalidad para la que serán
        utilizados sus datos es la obtención del Informe de Dominio y la
        prestación de los servicios contratados, siendo nuestra Compañía
        únicamente quien trate los datos para tales fines; (b) sus datos
        personales quedarán registrados en bases de datos internas de nuestra
        Compañía, quien será la responsable de dichas bases de datos frente a la
        Autoridad de Aplicación; (c) Ud. está proporcionando sus datos
        personales a nuestra Compañía en forma voluntaria; (d) la no proporción
        o inexactitud de sus datos personales hará que nuestra Compañía no
        pueda tratar sus datos para los fines aquí descriptos; (e) Ud. podrá
        ejercer sus derechos de acceso, rectificación y supresión de datos
        personales a través de cualquiera de los siguientes medios indicados en
        este Sitio: correo electrónico{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, correo postal:{" "}
        {COMPANY.address}.
      </p>

      <h2>3. Conservación</h2>
      <p>
        Conservamos los datos por el tiempo necesario para cumplir con la
        finalidad y con las obligaciones legales aplicables (mín. 5 años para
        registros contables).
      </p>

      <h2>4. Destinatarios</h2>
      <p>
        Los datos podrán ser compartidos exclusivamente con:
      </p>
      <ul>
        <li>Procesadores de pago (MercadoPago) para gestionar la transacción.</li>
        <li>Proveedores tecnológicos (hosting, email, base de datos).</li>
        <li>Autoridades competentes cuando exista obligación legal.</li>
      </ul>
      <p>
        No vendemos, alquilamos ni cedemos datos personales a terceros con
        fines publicitarios.
      </p>

      <h2>5. Seguridad</h2>
      <p>
        Implementamos medidas técnicas y organizativas razonables: cifrado en
        tránsito (HTTPS/TLS), control de accesos, registros de auditoría y
        políticas de retención.
      </p>

      <h2>6. Derechos del titular</h2>
      <p>
        Podés ejercer los derechos de acceso, rectificación y supresión enviando
        un email a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> o por
        correo postal al domicilio indicado. Responderemos dentro de los plazos
        legales.
      </p>

      <h2>7. Autoridad de control</h2>
      <p>
        La <strong>AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA</strong>, en su
        carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución
        de atender las denuncias y reclamos que interpongan quienes resulten
        afectados en sus derechos por incumplimiento de las normas vigentes en
        materia de protección de datos personales.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Utilizamos cookies estrictamente necesarias para el funcionamiento del
        sitio y, en su caso, cookies analíticas anonimizadas. Podés
        configurarlas desde tu navegador.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para consultas sobre privacidad:{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalLayout>
  );
}
