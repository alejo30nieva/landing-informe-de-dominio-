import { SampleWrapper, SampleSection, Field, FieldGrid } from "./SampleWrapper";

/**
 * Mockup del Informe de Infracciones (SUATS - Sistema Unificado).
 * Patente y solicitante modificados; importes mantenidos como referencia.
 *
 * Responsive: tabla en sm+, cards verticales en mobile.
 */
const infracciones = [
  ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "20511", "$31.715,37"],
  ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "G1", "$62.035,92"],
  ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "H1", "$38.058,44"],
  ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "20290", "$6.812,64"],
  ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "G1", "$62.035,92"],
  ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "H1", "$18.664,88"],
] as const;

export function InformeMultasSample({ express = false }: { express?: boolean }) {
  return (
    <SampleWrapper>
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3 border-b border-ink-300 pb-3">
        <div className="h-10 w-10 sm:h-10 sm:w-10 shrink-0 rounded-md bg-success/20 flex items-center justify-center font-bold text-success text-[9px] sm:text-[10px]">
          SUATS
        </div>
        <div className="leading-tight flex-1 min-w-0">
          <div className="text-[9.5px] sm:text-[10.5px] text-ink-700 italic leading-snug">
            Sistema Unificado de Administraciones Tributarias Subnacionales
          </div>
          <h2 className="text-[13px] sm:text-[15px] font-bold text-brand-950 mt-0.5 flex items-center gap-1.5 flex-wrap">
            Informe de Infracciones
            {express && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-warning text-white text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider">
                EXPRESS
              </span>
            )}
          </h2>
        </div>
      </div>
      <div className="mt-2 text-[9.5px] sm:text-[10px] text-ink-500 text-right">
        Emisión: <strong className="text-brand-950">••/••/2026 ••:••:••</strong>
      </div>

      {/* Datos del dominio + solicitante */}
      <SampleSection title="DATOS DEL INFORME">
        <div className="text-center mb-3">
          <div className="text-[9.5px] uppercase tracking-widest font-semibold text-ink-500">
            Dominio
          </div>
          <div className="text-[18px] sm:text-[20px] font-mono font-bold tracking-widest text-brand-700 mt-0.5">
            AB123CD
          </div>
        </div>
        <FieldGrid>
          <Field
            label="Solicitante"
            value={<span>L••• B••• H•••••• [oculto]</span>}
            hidden
          />
          <Field label="Nº Control" value="51••0009" mono hidden />
        </FieldGrid>
      </SampleSection>

      {/* Referencias */}
      <div className="mt-4 text-[10px] sm:text-[10.5px] text-ink-700">
        <div className="text-ink-500 font-semibold mb-1">Referencias:</div>
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-300 shrink-0" />
            Pendiente de depósito
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70 shrink-0" />
            Pendiente de acreditación
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70 shrink-0" />
            Pendiente de radicación
          </span>
        </div>
      </div>

      {/* Infracciones — tabla en sm+, cards en mobile */}
      <SampleSection title="INFRACCIONES">
        <div className="text-[12px] sm:text-[12px] font-bold text-brand-950 mb-2">
          Córdoba
        </div>

        {/* Mobile: cards verticales */}
        <div className="sm:hidden space-y-2">
          {infracciones.map((row, i) => (
            <div
              key={i}
              className="border border-ink-300 rounded-md p-2.5 bg-white"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-brand-950">
                  {row[0]}
                </span>
                <span className="text-[13px] font-bold text-brand-950 whitespace-nowrap">
                  {row[5]}
                </span>
              </div>
              <div className="text-[10.5px] text-ink-700 flex items-center gap-1.5">
                <span className="truncate">{row[1]}</span>
                <span className="text-ink-500">·</span>
                <span className="shrink-0">{row[2]}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px]">
                <span className="text-ink-500">
                  Acta <span className="font-mono">{row[3]}</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">
                  Código {row[4]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* sm+: tabla clásica */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead className="bg-ink-100">
              <tr className="text-left text-ink-700">
                <th className="px-2 py-1.5 font-semibold">Fecha</th>
                <th className="px-2 py-1.5 font-semibold">Lugar</th>
                <th className="px-2 py-1.5 font-semibold">Hora</th>
                <th className="px-2 py-1.5 font-semibold">N° Acta</th>
                <th className="px-2 py-1.5 font-semibold">Código</th>
                <th className="px-2 py-1.5 font-semibold text-right">Importe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300/60">
              {infracciones.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-2 py-1.5 ${
                        j === 5 ? "text-right font-semibold text-brand-950" : "text-ink-700"
                      } ${j === 3 ? "font-mono" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-ink-100 border-t-2 border-ink-300">
                <td colSpan={5} className="px-2 py-1.5 text-right font-bold text-brand-950">
                  Total Córdoba
                </td>
                <td className="px-2 py-1.5 text-right font-bold text-brand-950">
                  $219.323,17
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Total — visible siempre */}
        <div className="mt-3 sm:hidden flex items-center justify-between gap-2 px-3 py-2 bg-ink-100 border-t-2 border-ink-300 rounded-md">
          <span className="text-[11px] font-bold text-brand-950">
            Total Córdoba
          </span>
          <span className="text-[14px] font-bold text-brand-950 whitespace-nowrap">
            $219.323,17
          </span>
        </div>

        <div className="mt-3 text-[10px] sm:text-[10.5px]">
          <div className="font-bold text-brand-950 mb-1">
            Códigos de infracción
          </div>
          <ul className="list-disc pl-5 space-y-0.5 text-ink-700">
            <li>20511 — conducir usando aparatos telefónicos</li>
            <li>20290 — sin cinturón de seguridad colocado</li>
            <li>G1, H1 — no especificada</li>
          </ul>
        </div>
      </SampleSection>

      {/* Jurisdicciones */}
      <SampleSection title="JURISDICCIONES CONSULTADAS">
        <div className="text-[10px] sm:text-[10.5px] text-ink-700 leading-relaxed">
          <strong className="text-brand-950 block">Municipalidades:</strong>
          G.C.B.A. (CABA), La Matanza, Lomas de Zamora, Tigre, Pilar, Córdoba,
          Rosario, Mendoza, Mar del Plata, Bahía Blanca, La Plata, San Miguel,
          Avellaneda, Lanús, Santiago del Estero, Tucumán, Salta, Jujuy,
          Posadas, Resistencia, Neuquén, Bariloche, Rio Gallegos, Ushuaia y +140 municipios.
        </div>
        <div className="mt-2 text-[10px] sm:text-[10.5px] text-ink-700">
          <strong className="text-brand-950 block">Provincias:</strong>
          Buenos Aires, Córdoba, Santa Fe, Mendoza, Entre Ríos, Río Negro,
          Misiones, Santiago del Estero, Chaco.
        </div>
      </SampleSection>

      {/* Total */}
      <div className="mt-4 sm:mt-5 bg-ink-100 border border-ink-300 rounded-md px-3 sm:px-4 py-3 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
        <span className="text-[12px] font-bold text-brand-950">
          TOTAL ADEUDADO
        </span>
        <span className="text-[20px] sm:text-[22px] font-extrabold text-success whitespace-nowrap">
          $219.323,17
        </span>
      </div>

      {/* Footer */}
      <div className="mt-3 text-center text-[9.5px] sm:text-[10px] text-ink-500 italic border-t border-ink-300 pt-2">
        NO VÁLIDO COMO COMPROBANTE DE PAGO
      </div>
    </SampleWrapper>
  );
}
