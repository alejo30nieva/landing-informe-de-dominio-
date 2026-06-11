/**
 * Guías / artículos de blog para SEO orgánico (long-tail).
 * Cada guía apunta a un cluster de keywords con intención informacional
 * que después deriva al formulario (intención transaccional).
 */

export type GuiaBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "cta"; text: string };

export type Guia = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  datePublished: string;
  readMin: number;
  excerpt: string;
  blocks: GuiaBlock[];
};

export const GUIAS: Guia[] = [
  {
    slug: "como-verificar-un-auto-antes-de-comprar",
    title: "Cómo verificar un auto usado antes de comprar (guía 2026)",
    metaTitle: "Cómo verificar un auto usado antes de comprar | Guía 2026",
    description:
      "Guía paso a paso para verificar un auto usado antes de comprarlo en Argentina: deudas, embargos, titular real, prendas y estafas comunes. Evitá problemas.",
    keywords: [
      "como verificar un auto antes de comprar",
      "verificar auto usado",
      "como saber si un auto tiene deuda",
      "comprar auto usado seguro",
      "verificación automotor",
    ],
    datePublished: "2026-01-15",
    readMin: 6,
    excerpt:
      "Antes de seña­r un usado, verificá quién es el titular real, si tiene deudas, embargos o prendas. Te mostramos cómo hacerlo en minutos.",
    blocks: [
      {
        type: "p",
        text: "Comprar un auto usado en Argentina puede salir muy bien… o convertirse en una pesadilla si el vehículo arrastra deudas, embargos o no está a nombre de quien te lo vende. La buena noticia: hoy podés verificar todo en minutos, 100% online, antes de poner un peso.",
      },
      { type: "h2", text: "1. Verificá el titular registral real" },
      {
        type: "p",
        text: "El error más común es confiar en quien tiene el auto. El que te lo muestra no siempre es el titular. Un Informe de Dominio te dice exactamente a nombre de quién está inscripto el vehículo en el Registro Nacional. Si no coincide con el vendedor, frená la operación.",
      },
      { type: "h2", text: "2. Revisá deudas de patente y multas" },
      {
        type: "p",
        text: "Las deudas de patente y las multas viajan con el auto, no con el dueño anterior. Si comprás un vehículo con deudas, las heredás vos. Un Informe de Multas a nivel nacional te muestra todo lo adeudado en municipios y provincias.",
      },
      { type: "h2", text: "3. Confirmá que no tenga embargos ni inhibiciones" },
      {
        type: "p",
        text: "Un embargo o una inhibición impiden transferir el vehículo a tu nombre. Aunque pagues, no vas a poder ponerlo a tu nombre hasta que se levante. El Informe de Dominio detecta cualquier medida judicial vigente.",
      },
      { type: "h2", text: "4. Chequeá si tiene prenda" },
      {
        type: "p",
        text: "Una prenda significa que el auto está garantizando un crédito. Si el vendedor no terminó de pagarlo, el acreedor puede reclamarlo. Verificá siempre el estado de prenda antes de comprar.",
      },
      { type: "h2", text: "Checklist rápido antes de comprar" },
      {
        type: "ul",
        items: [
          "Titular registral = vendedor",
          "Sin deudas de patente ni multas",
          "Sin embargos ni inhibiciones",
          "Sin prenda activa",
          "Sin denuncia de robo",
          "Numeración de motor y chasis coincidente",
        ],
      },
      { type: "h2", text: "¿Cómo obtengo toda esta información?" },
      {
        type: "p",
        text: "Con la patente del vehículo. Solicitás un Informe de Dominio Automotor online, lo recibís por email y WhatsApp en 10–15 minutos, y revisás todos estos puntos de una sola vez.",
      },
      {
        type: "cta",
        text: "Verificá el auto que querés comprar ahora",
      },
    ],
  },
  {
    slug: "que-es-el-informe-de-dominio-automotor",
    title: "¿Qué es el Informe de Dominio Automotor y para qué sirve?",
    metaTitle: "¿Qué es el Informe de Dominio Automotor? | Guía completa",
    description:
      "Qué es el Informe de Dominio Automotor, qué datos incluye, para qué sirve y cuándo necesitás pedirlo. Explicado simple y con ejemplos.",
    keywords: [
      "que es el informe de dominio",
      "informe de dominio automotor",
      "informe dnrpa",
      "informe registral automotor",
      "para que sirve informe de dominio",
    ],
    datePublished: "2026-01-20",
    readMin: 5,
    excerpt:
      "El documento oficial que certifica el estado legal, registral y patrimonial de un vehículo. Te explicamos qué incluye y cuándo lo necesitás.",
    blocks: [
      {
        type: "p",
        text: "El Informe de Dominio Automotor es el documento oficial que certifica el estado legal, registral y patrimonial de un vehículo en Argentina. Se emite con la información del Registro Nacional de la Propiedad del Automotor (DNRPA).",
      },
      { type: "h2", text: "¿Qué datos incluye?" },
      {
        type: "ul",
        items: [
          "Datos del vehículo: marca, modelo, año, motor y chasis",
          "Titular registral actual y porcentaje de titularidad",
          "Histórico de titulares anteriores",
          "Deudas de patente y multas",
          "Embargos, inhibiciones y medidas judiciales",
          "Prendas y acreedores prendarios",
          "Denuncias de venta, compra o robo",
          "Estado de radicación",
        ],
      },
      { type: "h2", text: "¿Para qué sirve?" },
      { type: "h3", text: "Comprar un usado con seguridad" },
      {
        type: "p",
        text: "Es el uso más común. Antes de comprar verificás que el auto esté libre de deudas, que el vendedor sea el titular y que no tenga impedimentos para transferir.",
      },
      { type: "h3", text: "Antes de vender o transferir" },
      {
        type: "p",
        text: "Confirmás que el vehículo esté en condiciones de transferirse y anticipás cualquier deuda que debas regularizar.",
      },
      { type: "h3", text: "Trámites legales y sucesiones" },
      {
        type: "p",
        text: "Sirve como prueba del estado del vehículo en juicios, sucesiones, divorcios o cualquier trámite que requiera acreditar la titularidad.",
      },
      { type: "h2", text: "¿Cuánto tarda y cómo se obtiene?" },
      {
        type: "p",
        text: "Con la patente del vehículo lo solicitás online. Lo recibís en PDF por email y WhatsApp, generalmente en 10 a 15 minutos. No necesitás ir al registro ni sacar turno.",
      },
      {
        type: "cta",
        text: "Solicitá tu Informe de Dominio online",
      },
    ],
  },
  {
    slug: "informe-de-dominio-cordoba",
    title: "Informe de Dominio en Córdoba: cómo solicitarlo online",
    metaTitle: "Informe de Dominio Automotor en Córdoba — Online y rápido",
    description:
      "Cómo solicitar un Informe de Dominio Automotor en Córdoba 100% online. Mandataria matriculada, entrega en minutos por email y WhatsApp. Para toda Argentina.",
    keywords: [
      "informe de dominio cordoba",
      "informe automotor cordoba",
      "gestoria automotor cordoba",
      "informe dnrpa cordoba",
      "verificacion automotor cordoba",
    ],
    datePublished: "2026-01-25",
    readMin: 4,
    excerpt:
      "Si estás en Córdoba y necesitás un Informe de Dominio, podés pedirlo online sin moverte. Te contamos cómo y qué tener en cuenta.",
    blocks: [
      {
        type: "p",
        text: "Si vivís en Córdoba o estás por comprar un vehículo radicado en la provincia, podés pedir tu Informe de Dominio Automotor de forma 100% online, sin acercarte a un registro seccional ni sacar turno.",
      },
      { type: "h2", text: "¿Quién puede tramitarlo?" },
      {
        type: "p",
        text: "Cualquier persona, con sólo conocer la patente del vehículo. No hace falta ser el titular para solicitar un informe. Lo tramita una mandataria matriculada con acceso a las fuentes oficiales del Registro.",
      },
      { type: "h2", text: "Paso a paso para pedirlo online" },
      {
        type: "ol",
        items: [
          "Ingresá la patente del vehículo (formato Mercosur o tradicional)",
          "Completá tu email y WhatsApp",
          "Elegí el tipo de informe que necesitás",
          "Pagá con MercadoPago, tarjeta, transferencia o QR",
          "Recibí el informe en PDF en 10–15 minutos",
        ],
      },
      { type: "h2", text: "¿Sirve sólo para autos de Córdoba?" },
      {
        type: "p",
        text: "No. Aunque somos una gestoría con base en Córdoba, el servicio es válido para vehículos de toda la República Argentina. Consultás cualquier dominio del país.",
      },
      { type: "h2", text: "Atención personalizada por WhatsApp" },
      {
        type: "p",
        text: "A diferencia de las plataformas automáticas, te responde una persona real por WhatsApp en horario comercial. Si tenés dudas sobre qué informe necesitás o sobre los resultados, te asesoramos.",
      },
      {
        type: "cta",
        text: "Pedí tu Informe de Dominio en Córdoba",
      },
    ],
  },
];

export function getGuiaBySlug(slug: string) {
  return GUIAS.find((g) => g.slug === slug);
}
