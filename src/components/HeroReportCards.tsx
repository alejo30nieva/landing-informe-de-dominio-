"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  User,
  AlertTriangle,
  CornerLeftUp,
  type LucideIcon,
} from "lucide-react";

/**
 * Foto del auto detrás de los informes (PNG recortado, fondo transparente,
 * ~1600px de ancho, en /public). Mientras sea null, los informes se muestran
 * solos sobre un halo suave — no queda ningún hueco.
 */
const CAR_IMAGE: { src: string; width: number; height: number } | null = null;

type Row = { icon: LucideIcon; tone: "ok" | "bad" | "neutral"; label: string };

type MiniReport = {
  title: [string, string];
  badge?: string;
  rows: Row[];
};

const REPORTS: MiniReport[] = [
  {
    title: ["Informe", "de Dominio"],
    badge: "Sin prenda",
    rows: [
      { icon: CheckCircle2, tone: "ok", label: "Estado registral" },
      { icon: CheckCircle2, tone: "ok", label: "Titular actual" },
      { icon: CheckCircle2, tone: "ok", label: "Denuncias" },
      { icon: CheckCircle2, tone: "ok", label: "Embargos" },
    ],
  },
  {
    title: ["Histórico", "de Titulares"],
    rows: [
      { icon: User, tone: "neutral", label: "1° Titular" },
      { icon: User, tone: "neutral", label: "2° Titular" },
      { icon: User, tone: "neutral", label: "3° Titular" },
      { icon: User, tone: "neutral", label: "4° Titular" },
    ],
  },
  {
    title: ["Multas", "Nacionales"],
    rows: [
      { icon: AlertTriangle, tone: "bad", label: "Infracción" },
      { icon: AlertTriangle, tone: "bad", label: "Infracción" },
      { icon: AlertTriangle, tone: "bad", label: "Infracción" },
      { icon: AlertTriangle, tone: "bad", label: "Infracción" },
    ],
  },
  {
    title: ["Informe", "de Persona"],
    rows: [
      { icon: User, tone: "neutral", label: "Nombre" },
      { icon: CheckCircle2, tone: "ok", label: "Fecha de nacimiento" },
      { icon: CheckCircle2, tone: "ok", label: "Domicilio" },
      { icon: CheckCircle2, tone: "ok", label: "Estado" },
    ],
  },
];

// Abanico: rotación y desplazamiento vertical de cada tarjeta.
const FAN = [
  { rotate: -7, y: 14 },
  { rotate: -2.5, y: 2 },
  { rotate: 2.5, y: 2 },
  { rotate: 7, y: 14 },
];

const TONE: Record<Row["tone"], string> = {
  ok: "text-success",
  bad: "text-danger",
  neutral: "text-brand-950",
};

function MiniCard({ report }: { report: MiniReport }) {
  return (
    <div className="w-[150px] rounded-xl bg-white p-3.5 shadow-[0_12px_30px_-12px_rgba(11,31,58,0.35)] ring-1 ring-ink-300/70">
      <Image
        src="/logo.jpg"
        alt=""
        width={1170}
        height={703}
        className="h-[18px] w-auto"
      />
      <div className="mt-2 text-[12.5px] font-extrabold uppercase leading-[1.15] tracking-tight text-brand-950">
        {report.title[0]}
        <br />
        {report.title[1]}
      </div>
      {report.badge && (
        <span className="mt-1.5 inline-block rounded bg-success px-1.5 py-0.5 text-[7.5px] font-bold uppercase tracking-wide text-white">
          {report.badge}
        </span>
      )}
      <ul className="mt-2 space-y-1.5">
        {report.rows.map((r, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <r.icon className={`h-3.5 w-3.5 shrink-0 ${TONE[r.tone]}`} />
            <span className="flex-1 truncate rounded bg-ink-100 px-1.5 py-0.5 text-[9px] text-ink-500">
              {r.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Informes de ejemplo en miniatura, en abanico, para el hero (solo desktop).
 * Le muestran al cliente qué recibe antes de pagar. Todo el bloque lleva a
 * /ejemplos. Son ilustrativos: no contienen datos reales.
 */
export function HeroReportCards() {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/ejemplos"
      aria-label="Ver ejemplos de informes"
      className="group relative mt-8 block max-w-[600px] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4"
    >
      <div
        aria-hidden
        className={
          CAR_IMAGE
            ? "relative h-[280px] xl:h-[360px]"
            : "relative h-[190px] xl:h-[245px]"
        }
      >
        {/* Halo suave detrás (y base del auto cuando haya foto) */}
        <div className="absolute inset-x-6 bottom-6 h-36 rounded-[100%] bg-brand-100/80 blur-2xl" />

        {CAR_IMAGE && (
          <Image
            src={CAR_IMAGE.src}
            alt=""
            width={CAR_IMAGE.width}
            height={CAR_IMAGE.height}
            sizes="600px"
            className="absolute left-1/2 top-0 w-[92%] -translate-x-1/2"
          />
        )}

        {/* 4 tarjetas ≈ 600px. Desde 1280px la columna mide ~590px (container
            máx. 1280, menos la barra de scroll de Windows); entre 1024 y 1279
            baja hasta ~468px → se achican. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center origin-bottom scale-75 xl:scale-[0.96]">
          {REPORTS.map((report, i) => (
            <motion.div
              key={report.title.join(" ")}
              className="-mx-1 first:ml-0 last:mr-0"
              style={{ zIndex: i === 1 || i === 2 ? 2 : 1 }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: FAN[i].y + 24, rotate: FAN[i].rotate }
              }
              animate={{ opacity: 1, y: FAN[i].y, rotate: FAN[i].rotate }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 0.25 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="transition-transform duration-200 ease-out group-hover:-translate-y-1">
                <MiniCard report={report} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-ink-500">
        <CornerLeftUp className="h-4 w-4 text-brand-700" aria-hidden />
        <span>
          <span className="font-semibold text-brand-700 group-hover:underline underline-offset-2">
            Ejemplos de informes
          </span>{" "}
          · Imágenes ilustrativas
        </span>
      </p>
    </Link>
  );
}
