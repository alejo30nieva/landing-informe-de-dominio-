import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Marco visual de "hoja A4" + watermark "EJEMPLO" en diagonal.
 * Usado para mockups de informes con datos anonimizados.
 *
 * Responsive:
 *  - Desktop: padding amplio, look documento oficial.
 *  - Mobile: padding ajustado, sin scroll horizontal.
 */
export function SampleWrapper({ children }: Props) {
  return (
    <div className="relative">
      {/* Watermark diagonal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl z-10"
      >
        <span
          className="text-[28vw] sm:text-[18vw] md:text-[120px] font-extrabold text-brand-700/[0.06] tracking-widest select-none"
          style={{ transform: "rotate(-22deg)" }}
        >
          EJEMPLO
        </span>
      </div>

      <div className="relative rounded-2xl border-2 border-ink-300 bg-white shadow-elevate overflow-hidden">
        {/* Banda superior con disclaimer */}
        <div className="bg-warning/15 border-b border-warning/30 px-3 sm:px-4 py-2 text-[10.5px] sm:text-[11px] text-ink-700 leading-snug">
          <strong className="text-warning">⚠️ VISTA PREVIA</strong> — Datos
          parcialmente ocultos o modificados con fines ilustrativos.
        </div>

        {/* Content — sin min-w forzado, responsive natural */}
        <div className="p-3 sm:p-5 md:p-8 text-[12px] sm:text-[12px] text-ink-900 font-sans bg-white relative">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SampleSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3 sm:mt-4 border border-ink-300 rounded-md">
      <div className="bg-ink-100 px-2.5 sm:px-3 py-1.5 text-[10.5px] sm:text-[11px] font-bold text-brand-950 uppercase tracking-wider text-center border-b border-ink-300">
        {title}
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

/**
 * Campo "label: valor" responsivo.
 * - Mobile: label arriba (block), valor abajo (block).
 * - sm+: inline en la misma línea.
 */
export function Field({
  label,
  value,
  mono,
  hidden,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  hidden?: boolean;
}) {
  return (
    <div className="text-[11.5px] leading-tight py-0.5">
      <span className="text-ink-500 block sm:inline">{label}:</span>{" "}
      <span
        className={`text-brand-950 ${mono ? "font-mono" : "font-semibold"} ${
          hidden ? "blur-[3px] select-none" : ""
        } block sm:inline break-words`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Grid responsive para Fields:
 *  - Mobile: 1 columna (cada Field en su propia línea con label arriba).
 *  - sm+: 2 columnas.
 */
export function FieldGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-1.5">
      {children}
    </div>
  );
}
