/**
 * Catálogo de servicios de la gestoría automotor.
 * El mensaje de WhatsApp viene pre-cargado por cada servicio.
 */

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  priceARS?: number;
  delivery: string;
  icon: string; // nombre de ícono Lucide
  category: "informes" | "transferencias" | "documentacion" | "tramites";
  featured?: boolean;
  hasSample?: boolean; // tiene mockup en /ejemplos
  /** Si el cliente puede comprarlo directamente desde el formulario del hero. */
  selectableInForm?: boolean;
  /** Etiqueta corta para el selector (más compacto que el title). */
  shortLabel?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "informe-dominio",
    title: "Informe de Dominio Automotor",
    shortLabel: "Dominio",
    shortDesc:
      "Estado legal y registral completo del vehículo: titular, deudas, embargos, inhibiciones.",
    longDesc:
      "Documento oficial del Registro Nacional de la Propiedad del Automotor. Imprescindible antes de comprar un usado.",
    priceARS: 9900,
    delivery: "10–15 minutos",
    icon: "FileText",
    category: "informes",
    featured: true,
    hasSample: true,
    selectableInForm: true,
  },
  {
    slug: "informe-historico-titulares",
    title: "Informe Histórico de Titulares",
    shortLabel: "Histórico",
    shortDesc:
      "Informe del vehículo con información registral y todos los titulares/dueños que tuvo.",
    longDesc:
      "Documento DNRPA con la trazabilidad completa: titular actual, titulares anteriores, datos de inscripción, prendas, inhibiciones y radicaciones previas.",
    priceARS: 13900,
    delivery: "10–20 minutos",
    icon: "Users",
    category: "informes",
    featured: true,
    hasSample: true,
    selectableInForm: true,
  },
  {
    slug: "informe-nominal",
    title: "Informe Nominal",
    shortLabel: "Nominal",
    shortDesc:
      "Conocé qué vehículos figuran registrados a nombre de una persona en todo el país.",
    longDesc:
      "Búsqueda nacional cruzada por DNI o CUIT/CUIL. Útil para sucesiones, divorcios, juicios o auditorías patrimoniales.",
    priceARS: 10500,
    delivery: "15–30 minutos",
    icon: "UserSearch",
    category: "informes",
    featured: true,
    hasSample: true,
  },
  {
    slug: "informe-multas",
    title: "Informe de Multas",
    shortLabel: "Multas",
    shortDesc:
      "Consulta de multas a nivel nacional en municipalidades, provincias y CABA.",
    longDesc:
      "Sistema Unificado de Administraciones Tributarias Subnacionales (SUATS). Detalle por jurisdicción, fecha, lugar, código de infracción e importe.",
    priceARS: 17200,
    delivery: "20–40 minutos",
    icon: "Banknote",
    category: "informes",
    featured: true,
    hasSample: true,
    selectableInForm: true,
  },
  {
    slug: "informe-multas-express",
    title: "Informe de Multas EXPRESS",
    shortLabel: "Multas Express",
    shortDesc:
      "Consulta de multas con prioridad. Se entrega en menos de 8 horas hábiles.",
    longDesc:
      "Igual que el Informe de Multas pero con prioridad en la cola. Puede estar listo mucho antes según disponibilidad del sistema.",
    priceARS: 22600,
    delivery: "Hasta 8 hs hábiles",
    icon: "Zap",
    category: "informes",
    hasSample: true,
    selectableInForm: true,
  },
  {
    slug: "informe-compra-segura",
    title: "Combo Histórico + Multas",
    shortLabel: "Combo",
    shortDesc:
      "Histórico de titulares + Informe de Multas a nivel nacional. El combo ideal antes de comprar.",
    longDesc:
      "Paquete combinado con descuento: incluye el Informe Histórico de Titulares y el Informe de Multas a nivel nacional. Ahorrás vs. comprarlos por separado ($13.900 + $17.200 = $31.100).",
    priceARS: 27900,
    delivery: "30–60 minutos",
    icon: "ShoppingCart",
    category: "informes",
    featured: true,
    selectableInForm: true,
  },

  // Transferencias
  {
    slug: "transferencia",
    title: "Transferencia de Automotor",
    shortDesc:
      "Gestionamos el cambio de titularidad ante el Registro. Asesoramos y armamos la carpeta.",
    longDesc:
      "Te ayudamos con formularios 08, verificación policial, libre deuda y presentación en el Registro Seccional.",
    delivery: "5 a 15 días hábiles",
    icon: "RefreshCcw",
    category: "transferencias",
  },
  {
    slug: "patentamiento-0km",
    title: "Patentamiento 0 km",
    shortDesc:
      "Inscripción inicial de vehículo cero kilómetro ante el Registro.",
    longDesc:
      "Tramitamos la inscripción inicial, alta de patente, cédula verde y placas.",
    delivery: "5 a 20 días",
    icon: "Car",
    category: "transferencias",
  },

  // Documentación
  {
    slug: "cedula-azul",
    title: "Cédula Azul (autorización a conducir)",
    shortDesc:
      "Autorización oficial para que un tercero conduzca tu vehículo.",
    longDesc:
      "Tramitamos cédula para cónyuge, hijos, empleados o quien autorices.",
    delivery: "3 a 10 días hábiles",
    icon: "BadgeCheck",
    category: "documentacion",
  },
  {
    slug: "duplicado-cedula",
    title: "Duplicado / Triplicado de Cédula",
    shortDesc:
      "Reposición de cédula verde por extravío, robo o deterioro.",
    longDesc:
      "Gestionamos el formulario 02 y retirada de la nueva cédula.",
    delivery: "5 a 15 días hábiles",
    icon: "FileCheck2",
    category: "documentacion",
  },

  // Trámites
  {
    slug: "cambio-radicacion",
    title: "Cambio de Radicación",
    shortDesc:
      "Traslado del registro del vehículo a otra provincia o municipio.",
    longDesc:
      "Coordinamos baja del seccional origen, verificación y alta en el seccional destino.",
    delivery: "10 a 30 días",
    icon: "MapPin",
    category: "tramites",
  },
  {
    slug: "denuncia-venta",
    title: "Denuncia de Venta",
    shortDesc:
      "Te liberamos de responsabilidades civiles y patentes si vendiste y no te transfirieron.",
    longDesc:
      "Tramitamos el formulario 11 y la inscripción ante el Registro para que la denuncia surta efecto legal.",
    delivery: "3 a 7 días hábiles",
    icon: "ShieldAlert",
    category: "tramites",
    featured: true,
  },
  {
    slug: "baja-automotor",
    title: "Baja del Automotor",
    shortDesc:
      "Baja definitiva por desarme, robo o destrucción total.",
    longDesc:
      "Tramitamos la baja registral con verificación de chasis y motor cuando corresponda.",
    delivery: "10 a 30 días",
    icon: "Trash2",
    category: "tramites",
  },
  {
    slug: "verificacion-policial",
    title: "Verificación Policial / Digital",
    shortDesc:
      "Coordinamos turno y constatación de motor y chasis.",
    longDesc:
      "Te asesoramos en VPA, planta verificadora o verificación digital según provincia.",
    delivery: "Según turno disponible",
    icon: "ScanSearch",
    category: "tramites",
  },
  {
    slug: "cambio-motor",
    title: "Cambio de Motor",
    shortDesc:
      "Inscripción del cambio de motor con factura y verificación.",
    longDesc:
      "Presentación del formulario 04, factura de motor y verificación correspondiente.",
    delivery: "15 a 30 días",
    icon: "Wrench",
    category: "tramites",
  },
  {
    slug: "cambio-color",
    title: "Cambio de Color",
    shortDesc:
      "Inscripción registral del cambio de color del vehículo.",
    longDesc:
      "Tramitamos formularios y verificación para registrar el nuevo color.",
    delivery: "10 a 20 días",
    icon: "Palette",
    category: "tramites",
  },
  {
    slug: "valuacion-fiscal",
    title: "Valuación Fiscal",
    shortDesc:
      "Valuación oficial del vehículo para seguros, sucesiones o trámites.",
    longDesc:
      "Certificado de valuación según tabla oficial del Registro y AFIP.",
    priceARS: 4900,
    delivery: "Mismo día",
    icon: "Calculator",
    category: "informes",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function buildWaUrl(service: Service): string {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE ?? "5493515724733";
  const priceLine = service.priceARS
    ? ` (precio: $${service.priceARS.toLocaleString("es-AR")})`
    : "";
  const msg = `Hola! Quería consultar por el servicio: ${service.title}${priceLine}.`;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}

export function formatPrice(s: Service): string | undefined {
  if (!s.priceARS) return undefined;
  return `$${s.priceARS.toLocaleString("es-AR")}`;
}

/**
 * Orden de display en el formulario y la tabla de precios.
 * El combo va PRIMERO (recomendado); el nominal último (casi nadie lo pide).
 */
export const FORM_DISPLAY_ORDER = [
  "informe-compra-segura", // Combo — recomendado, primero
  "informe-dominio",
  "informe-historico-titulares",
  "informe-multas",
  "informe-multas-express",
  "informe-nominal", // último
];

/**
 * Servicios que pueden seleccionarse y comprarse desde el formulario del hero.
 * Devueltos con el combo primero (recomendado).
 */
export function getFormSelectableServices(): Service[] {
  const rank = (slug: string) => {
    const i = FORM_DISPLAY_ORDER.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  return SERVICES.filter((s) => s.selectableInForm).sort(
    (a, b) => rank(a.slug) - rank(b.slug)
  );
}

/** Ahorro del combo vs comprar Histórico + Multas por separado (en ARS). */
export function getComboSavings(): number {
  const combo = getServiceBySlug("informe-compra-segura")?.priceARS ?? 0;
  const hist = getServiceBySlug("informe-historico-titulares")?.priceARS ?? 0;
  const multas = getServiceBySlug("informe-multas")?.priceARS ?? 0;
  return Math.max(0, hist + multas - combo);
}

/** Slug por defecto del formulario. */
export const DEFAULT_FORM_SERVICE = "informe-dominio";
