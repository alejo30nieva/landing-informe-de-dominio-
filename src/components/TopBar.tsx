import {
  ShieldCheck,
  BadgeCheck,
  MessageCircle,
  UserCheck,
  Lock,
  Clock,
  CreditCard,
  MapPin,
} from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Servicio privado e independiente" },
  { icon: UserCheck, label: "Atención personalizada" },
  { icon: BadgeCheck, label: "Mandataria matriculada" },
  { icon: MessageCircle, label: "Atención por WhatsApp" },
  { icon: Lock, label: "Datos protegidos · SSL" },
  { icon: Clock, label: "Entrega 10–15 minutos" },
  { icon: CreditCard, label: "Pago seguro MercadoPago" },
  { icon: MapPin, label: "Válido en toda Argentina" },
];

export function TopBar() {
  return (
    <div className="bg-brand-950 text-white/90 text-[12.5px] overflow-hidden marquee-wrapper">
      {/*
        Marquee continuo: el contenido se duplica y la animación traduce
        -50% (justo el ancho de UNA copia) creando un loop seamless.
      */}
      <div className="flex w-max animate-marquee marquee-track">
        {[0, 1].map((copyIdx) => (
          <ul
            key={copyIdx}
            className="flex items-center shrink-0"
            aria-hidden={copyIdx === 1}
          >
            {items.map(({ icon: Icon, label }, idx) => (
              <li
                key={`${copyIdx}-${idx}`}
                className="inline-flex items-center gap-1.5 px-5 py-2 shrink-0 whitespace-nowrap"
              >
                <Icon className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                <span>{label}</span>
                <span className="text-white/30 ml-5" aria-hidden="true">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
