import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Para que el contenido scrollee horizontalmente si supera el ancho */
  scrollable?: boolean;
};

/**
 * Marco visual de "hoja A4" + watermark "EJEMPLO" en diagonal.
 * Usado para mockups de informes con datos anonimizados.
 */
export function SampleWrapper({ children, scrollable = true }: Props) {
  return (
    <div className="relative">
      {/* Watermark diagonal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl z-10"
      >
        <span
          className="text-[18vw] sm:text-[120px] font-extrabold text-brand-700/[0.06] tracking-widest select-none"
          style={{ transform: "rotate(-22deg)" }}
        >
          EJEMPLO
        </span>
      </div>

      <div className="relative rounded-2xl border-2 border-ink-300 bg-white shadow-elevate overflow-hidden">
        {/* Banda superior con disclaimer */}
        <div className="bg-warning/15 border-b border-warning/30 px-4 py-2 text-[11px] text-ink-700 leading-snug">
          <strong className="text-warning">⚠️ VISTA PREVIA</strong> — Datos
          parcialmente ocultos o modificados con fines ilustrativos. El informe
          real que recibís contiene la información completa.
        </div>

        <div
          className={
            scrollable
              ? "overflow-x-auto"
              : ""
          }
        >
          <div className="min-w-[700px] p-6 md:p-10 text-[12px] text-ink-900 font-sans bg-white relative">
            {children}
          </div>
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
    <div className="mt-4 border border-ink-300 rounded-md">
      <div className="bg-ink-100 px-3 py-1.5 text-[11px] font-bold text-brand-950 uppercase tracking-wider text-center border-b border-ink-300">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

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
    <div className="flex items-baseline gap-1 text-[11.5px]">
      <span className="text-ink-500">{label}:</span>
      <span
        className={`text-brand-950 ${mono ? "font-mono" : "font-semibold"} ${
          hidden ? "blur-[3px] select-none" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
