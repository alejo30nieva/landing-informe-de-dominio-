/**
 * Catálogo de servicios de la gestoría automotor.
 * El mensaje de WhatsApp viene pre-cargado por cada servicio.
 */

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  price?: string;
  delivery: string;
  icon: string; // nombre de ícono Lucide
  category: "informes" | "transferencias" | "documentacion" | "tramites";
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "informe-dominio",
    title: "Informe de Dominio Automotor",
    shortDesc:
      "Estado legal y registral completo del vehículo: titular, deudas, embargos, inhibiciones.",
    longDesc:
      "Documento oficial obtenido del Registro Nacional de la Propiedad del Automotor. Imprescindible antes de comprar un usado.",
    price: "Desde $6.900",
    delivery: "10–15 minutos",
    icon: "FileText",
    category: "informes",
    featured: true,
  },
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
    featured: true,
  },
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
    slug: "informe-historico-titulares",
    title: "Histórico de Titulares",
    shortDesc:
      "Listado completo de todos los titulares que tuvo el vehículo.",
    longDesc:
      "Ideal para verificar la trazabilidad antes de comprar un usado de varios dueños.",
    price: "Desde $5.900",
    delivery: "15 a 30 minutos",
    icon: "Users",
    category: "informes",
  },
  {
    slug: "informe-deudas-multas",
    title: "Multas y Patentes Adeudadas",
    shortDesc:
      "Verificación de deudas de patente y multas vigentes en todo el país.",
    longDesc:
      "Buscamos en jurisdicciones provinciales y municipales asociadas al dominio.",
    price: "Desde $4.900",
    delivery: "10 a 20 minutos",
    icon: "Banknote",
    category: "informes",
  },
  {
    slug: "informe-embargos",
    title: "Embargos e Inhibiciones",
    shortDesc:
      "Detectamos restricciones judiciales que impiden la transferencia.",
    longDesc:
      "Consulta directa al Registro Nacional para detectar cualquier medida cautelar.",
    delivery: "10 a 15 minutos",
    icon: "Gavel",
    category: "informes",
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
    price: "Desde $3.900",
    delivery: "Mismo día",
    icon: "Calculator",
    category: "informes",
  },
  {
    slug: "informe-compra-segura",
    title: "Informe para Compra Segura",
    shortDesc:
      "Paquete completo: dominio + deudas + embargos + histórico de titulares.",
    longDesc:
      "Recomendado antes de cualquier compra. Incluye asesoramiento por WhatsApp.",
    price: "Desde $9.900",
    delivery: "15 a 25 minutos",
    icon: "ShoppingCart",
    category: "informes",
    featured: true,
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function buildWaUrl(service: Service): string {
  const phone =
    process.env.NEXT_PUBLIC_WA_PHONE ?? "5493515724733";
  const msg = `Hola! Quería consultar por el servicio: ${service.title}.`;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}
