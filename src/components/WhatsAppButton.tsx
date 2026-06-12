"use client";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const FLOATING_WA_LINK = buildWhatsAppLink(
  "Hola, quiero consultar un Informe de Dominio"
);

export function WhatsAppButton() {
  return (
    <motion.a
      href={FLOATING_WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 group"
    >
      <span className="absolute -inset-2 rounded-full bg-[#25D366]/30 blur-md animate-pulse" />
      <span className="relative inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white shadow-elevate ring-4 ring-white">
        <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden>
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.42.43-1.118 1.318-1.118 2.235 0 1.062.45 2.05.93 2.93.5 1.005 1.075 1.95 1.793 2.823.788.96 1.66 1.834 2.665 2.508 1.31.872 2.793 1.49 4.366 1.733.41.064.823.123 1.235.123.755 0 1.49-.06 2.13-.473.43-.272.797-.65.967-1.105.13-.355.13-.65.1-.715-.073-.13-.27-.215-.567-.358-.297-.157-1.77-.872-2.04-.973-.27-.085-.47-.143-.67.143-.187.286-.77.973-.946 1.175-.171.207-.343.23-.638.072z"/>
          <path d="M16.02 5.333C10.131 5.333 5.333 10.13 5.333 16.02c0 2.029.566 4.018 1.638 5.756l-1.094 4.004 4.105-1.077a10.66 10.66 0 0 0 6.038 1.857c5.89 0 10.687-4.797 10.687-10.687S21.91 5.333 16.02 5.333zm0 1.778c4.906 0 8.91 4.003 8.91 8.91 0 4.906-4.004 8.91-8.91 8.91a8.872 8.872 0 0 1-5.275-1.731l-.395-.282-2.425.636.652-2.378-.27-.41a8.879 8.879 0 0 1-1.498-4.745c0-4.907 4.003-8.91 8.91-8.91z"/>
        </svg>
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-brand-950 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat por WhatsApp
      </span>
    </motion.a>
  );
}
