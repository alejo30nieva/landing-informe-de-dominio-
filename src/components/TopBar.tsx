import { ShieldCheck, BadgeCheck, MessageCircle, UserCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Servicio privado e independiente" },
  { icon: UserCheck, label: "Atención personalizada" },
  { icon: BadgeCheck, label: "Mandataria matriculada" },
  { icon: MessageCircle, label: "Atención por WhatsApp" },
];

export function TopBar() {
  return (
    <div className="bg-brand-950 text-white/90 text-[12.5px]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-y-1.5 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-brand-500" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/5493515724733"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 font-medium hover:text-white transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          +54 9 3515 72-4733
        </a>
      </div>
    </div>
  );
}
