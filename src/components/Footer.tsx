import Link from "next/link";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  FileCheck2,
  ShieldCheck,
  Phone,
  ExternalLink,
} from "lucide-react";
import { COMPANY, SOURCES } from "@/lib/company";

export function Footer() {
  return (
    <footer id="contacto" className="bg-brand-950 text-white/90">
      <div className="container mx-auto py-14">
        {/* Bloque institucional principal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
                <FileCheck2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="font-bold text-white text-[15px]">
                  {COMPANY.tradeName}
                </div>
                <div className="text-[11px] text-white/60">
                  Informe de Dominio Automotor
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Mandataria matriculada en {COMPANY.city}. Tramitamos informes y
              gestiones del Registro Nacional Automotor de forma rápida, segura y
              100% online.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
              Datos protegidos — SSL
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white/60">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${COMPANY.waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 hover:text-white text-white/80 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 text-brand-500" />
                  <span>
                    WhatsApp
                    <br />
                    <span className="font-semibold">{COMPANY.waDisplay}</span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <Phone className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Teléfono
                  <br />
                  <span className="font-semibold">{COMPANY.waDisplay}</span>
                </span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <Mail className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Email
                  <br />
                  <span className="font-semibold">{COMPANY.email}</span>
                </span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Dirección
                  <br />
                  <span className="font-semibold">{COMPANY.address}</span>
                </span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <Clock className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Horarios
                  <br />
                  <span className="font-semibold">{COMPANY.hours}</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white/60">
              Enlaces rápidos
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/#que-es", label: "¿Qué es el informe?" },
                { href: "/servicios", label: "Servicios" },
                { href: "/ejemplos", label: "Ejemplos de informes" },
                { href: "/#faq", label: "Preguntas frecuentes" },
                { href: "/#formulario", label: "Consultar informe" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white/60">
              Medios de pago
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["MercadoPago", "Tarjetas", "Transferencia", "QR"].map((m) => (
                <div
                  key={m}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 text-center font-medium"
                >
                  {m}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/60 leading-relaxed">
              Pasarela cifrada PCI DSS. Aceptamos tarjetas de débito y crédito,
              transferencia, QR y dinero en cuenta de MercadoPago.
            </p>
          </div>
        </div>

        {/* Bloque legal (estilo institucional informe.com.ar) */}
        <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-8 text-xs text-white/70 leading-relaxed">
          <div>
            <p className="font-semibold text-white mb-2">{COMPANY.legalName}</p>
            <p className="mb-3">{COMPANY.address}</p>
            <p>
              Para dudas y consultas puede comunicarse al mail{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-brand-500 underline-offset-2 hover:underline">
                {COMPANY.email}
              </a>
              .
            </p>
            <p className="mt-3">
              LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de
              Órgano de Control de la Ley N° 25.326, tiene la atribución de
              atender las denuncias y reclamos que interpongan quienes resulten
              afectados en sus derechos por incumplimiento de las normas
              vigentes en materia de protección de datos personales.
            </p>
          </div>
          <div>
            <p>
              <strong className="text-white">Conforme Art. 6 Ley N° 25.326:</strong>{" "}
              (a) la finalidad para la que serán utilizados sus datos es la
              obtención del Informe de Dominio y la prestación de los servicios
              ofrecidos, siendo nuestra Compañía únicamente quien trate los
              datos para tales fines; (b) sus datos personales quedarán
              registrados en bases de datos internas de nuestra Compañía, quien
              será la responsable de dichas bases de datos frente a la Autoridad
              de Aplicación; (c) Ud. está proporcionando sus datos personales a
              nuestra Compañía en forma voluntaria; (d) la no proporción o
              inexactitud de sus datos personales hará que nuestra Compañía no
              pueda tratar sus datos para los fines aquí descriptos; (e) Ud.
              podrá ejercer sus derechos de acceso, rectificación y supresión de
              datos personales a través de cualquiera de los siguientes medios
              indicados en este Sitio: correo electrónico{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-brand-500 underline-offset-2 hover:underline">
                {COMPANY.email}
              </a>
              , correo postal: {COMPANY.address}.
            </p>
          </div>
        </div>

        {/* Disclaimer + Fuentes */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 space-y-3">
          <p>
            © {new Date().getFullYear()} {COMPANY.tradeName} — Es una
            organización privada. No poseemos relación alguna con la DNRPA, ni
            entidades estatales o gubernamentales de la República Argentina.
          </p>
          <p>
            <strong className="text-white/80">Fuentes:</strong>{" "}
            {SOURCES.map((s, i) => (
              <span key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 underline-offset-2 hover:underline inline-flex items-center gap-1"
                >
                  {s.label} <ExternalLink className="h-3 w-3" />
                </a>
                {i < SOURCES.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>

        {/* Bottom links */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/70">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/" className="hover:text-white transition-colors">
              Contacto
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/arrepentimiento" className="hover:text-white transition-colors">
              Botón de Arrepentimiento
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
          </div>
          <span className="inline-flex items-center gap-1.5 text-white/60">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
            Sitio cifrado · Datos protegidos
          </span>
        </div>
      </div>
    </footer>
  );
}
