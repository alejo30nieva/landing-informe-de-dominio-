import { Mail, MessageCircle, MapPin, Clock, FileCheck2, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" className="bg-brand-950 text-white/90">
      <div className="container mx-auto py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
                <FileCheck2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="font-bold text-white text-[15px]">
                  Gestoría Córdoba
                </div>
                <div className="text-[11px] text-white/60">
                  Informe de Dominio Automotor
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Mandataria matriculada en Córdoba. Tramitamos informes oficiales
              del Registro Nacional Automotor de forma rápida, segura y 100% online.
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
                  href="https://wa.me/5493515724733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 hover:text-white text-white/80 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 text-brand-500" />
                  <span>
                    WhatsApp
                    <br />
                    <span className="font-semibold">+54 9 3515 72-4733</span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <Mail className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Email
                  <br />
                  <span className="font-semibold">contacto@gestoriacordoba.com</span>
                </span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Ubicación
                  <br />
                  <span className="font-semibold">Córdoba, Argentina</span>
                </span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-white/80">
                <Clock className="h-4 w-4 mt-0.5 text-brand-500" />
                <span>
                  Horarios
                  <br />
                  <span className="font-semibold">Lun a Vie 9 a 18 hs</span>
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
                { href: "#inicio", label: "Inicio" },
                { href: "#que-es", label: "¿Qué es el informe?" },
                { href: "#servicios", label: "Servicios" },
                { href: "#faq", label: "Preguntas frecuentes" },
                { href: "#formulario", label: "Consultar informe" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/75 hover:text-white transition-colors">
                    {l.label}
                  </a>
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

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} Gestoría Córdoba. Servicio privado e
            independiente. No representa al organismo público DNRPA.
          </p>
          <div className="flex items-center gap-4">
            <a href="#terminos" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="#privacidad" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
