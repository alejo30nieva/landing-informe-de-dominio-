import { COMPANY } from "@/lib/company";
import { getServiceBySlug, type Service } from "@/lib/services";

/**
 * Fuente ÚNICA del número de WhatsApp y de la lógica de armado de links.
 * Todo el sitio (botón flotante, post-compra, QRs, CTAs) usa esto.
 */
export const WHATSAPP_PHONE = (
  process.env.NEXT_PUBLIC_WA_PHONE ?? COMPANY.waPhone
).replace(/\D/g, "");

/**
 * Arma un link de WhatsApp con el texto SIEMPRE encodeado.
 * Espacios, acentos y saltos de línea se escapan con encodeURIComponent.
 */
export function buildWhatsAppLink(text: string, phone = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Prefijo de SKU por servicio. Identifica el tipo de informe a simple vista.
 *   GC-DOM · GC-HIST · GC-MUL · GC-MULEX · GC-COMBO · GC-NOM · GC-VAL
 */
const SKU_PREFIX: Record<string, string> = {
  "informe-dominio": "DOM",
  "informe-historico-titulares": "HIST",
  "informe-multas": "MUL",
  "informe-multas-express": "MULEX",
  "informe-compra-segura": "COMBO",
  "informe-nominal": "NOM",
  "valuacion-fiscal": "VAL",
};

export function skuPrefix(serviceSlug: string): string {
  return SKU_PREFIX[serviceSlug] ?? "GEN";
}

/**
 * Genera un código de compra único y legible por pedido.
 * Formato: GC-<PREFIJO>-<XXXX>  (ej: GC-DOM-7F3A)
 * El sufijo combina timestamp corto + random para ser único.
 */
export function buildSku(serviceSlug: string): string {
  const prefix = skuPrefix(serviceSlug);
  const ts = Date.now().toString(36).toUpperCase().slice(-3);
  const rnd = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `GC-${prefix}-${ts}${rnd}`;
}

/** Dado un SKU, intenta recuperar el slug del servicio por su prefijo. */
export function serviceSlugFromSku(sku: string | null | undefined): string | null {
  if (!sku) return null;
  const m = sku.match(/^GC-([A-Z]+)-/);
  if (!m) return null;
  const prefix = m[1];
  const entry = Object.entries(SKU_PREFIX).find(([, p]) => p === prefix);
  return entry ? entry[0] : null;
}

/**
 * Mensaje POST-COMPRA. El cliente ya pagó; incluye nombre + patente + SKU
 * para identificar el pedido al instante.
 */
export function postPurchaseMessage(opts: {
  serviceTitle: string;
  sku: string;
  nombre?: string;
  patente?: string;
}): string {
  const { serviceTitle, sku, nombre, patente } = opts;
  const saludo = nombre ? `¡Hola! Soy ${nombre}.` : "¡Hola!";
  const vehiculo = patente ? ` para la patente ${patente}` : "";
  return (
    `${saludo} Acabo de comprar el ${serviceTitle}${vehiculo}. ` +
    `Mi código de compra es ${sku}. Quedo atento al informe. ¡Gracias!`
  );
}

/**
 * Mensaje para los QR por servicio (pre-venta). Identifica el servicio
 * con su prefijo de SKU.
 */
export function qrServiceMessage(service: Service): string {
  const prefix = `GC-${skuPrefix(service.slug)}`;
  return (
    `¡Hola! Quiero pedir el ${service.title} (${prefix}). ` +
    `¿Me pasás los pasos?`
  );
}

/** Link de WhatsApp post-compra listo para el botón de la pantalla de éxito. */
export function postPurchaseWhatsAppLink(opts: {
  serviceTitle: string;
  sku: string;
  nombre?: string;
  patente?: string;
}): string {
  return buildWhatsAppLink(postPurchaseMessage(opts));
}

/** Link de WhatsApp para un QR de servicio. */
export function qrServiceWhatsAppLink(service: Service): string {
  return buildWhatsAppLink(qrServiceMessage(service));
}

/** Helper: dado un slug, devuelve el título legible (o un fallback). */
export function serviceTitleFromSlug(slug: string | null | undefined): string {
  if (!slug) return "informe";
  return getServiceBySlug(slug)?.title ?? "informe";
}
