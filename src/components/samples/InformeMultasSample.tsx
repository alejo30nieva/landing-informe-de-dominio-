import { SampleWrapper, SampleSection, Field } from "./SampleWrapper";

/**
 * Mockup del Informe de Infracciones (SUATS - Sistema Unificado).
 * Patente y solicitante modificados; importes mantenidos como referencia.
 */
export function InformeMultasSample({ express = false }: { express?: boolean }) {
  return (
    <SampleWrapper>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink-300 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-success/20 flex items-center justify-center font-bold text-success text-[10px]">
            SUATS
          </div>
          <div className="leading-tight">
            <div className="text-[10.5px] text-ink-700 italic">
              Sistema Unificado de Administraciones Tributarias Subnacionales
            </div>
            <h2 className="text-[15px] font-bold text-brand-950">
              Informe de Infracciones
              {express && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded bg-warning text-white text-[9px] font-bold uppercase tracking-wider">
                  EXPRESS
                </span>
              )}
            </h2>
          </div>
        </div>
        <div className="text-[10px] text-ink-500 text-right">
          Fecha de Emisión:
          <br />
          <strong className="text-brand-950">••/••/2026 ••:••:••</strong>
        </div>
      </div>

      {/* Datos del dominio */}
      <SampleSection title="DATOS DEL DOMINIO">
        <Field label="Dominio" value="AB123CD" mono />
      </SampleSection>

      {/* Datos del informe */}
      <SampleSection title="DATOS DEL INFORME">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <Field
            label="Solicitante"
            value={<span>L••• B••• H•••••• [oculto]</span>}
            hidden
          />
          <Field label="Nº de Control Interno" value="51••0009" mono hidden />
        </div>
      </SampleSection>

      {/* Referencias */}
      <div className="mt-4 text-[10.5px] text-ink-700 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="text-ink-500 font-semibold">Referencias:</span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          Pendiente de depósito
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          Pendiente de acreditación
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          Pendiente de radicación
        </span>
      </div>

      {/* Infracciones */}
      <SampleSection title="INFRACCIONES">
        <div className="text-[12px] font-bold text-brand-950 mb-2">Cordoba</div>
        <div className="overflow-x-auto">
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
              {[
                ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "20511", "$31.715,37"],
                ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "G1", "$62.035,92"],
                ["2024-01-19", "FRAGUEIRO 4507", "00:00:10", "103••079", "H1", "$38.058,44"],
                ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "20290", "$6.812,64"],
                ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "G1", "$62.035,92"],
                ["2023-08-01", "FRAGUEIRO 4507", "00:00:17", "102••082", "H1", "$18.664,88"],
              ].map((row, i) => (
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
                  Total Cordoba
                </td>
                <td className="px-2 py-1.5 text-right font-bold text-brand-950">
                  $219.323,17
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 text-[10.5px]">
          <div className="font-bold text-brand-950 mb-1">CÓDIGO DE INFRACCIONES</div>
          <ul className="list-disc pl-5 space-y-0.5 text-ink-700">
            <li>20511: conducir usando simultaneamente aparatos telefonicos</li>
            <li>G1: no especificada</li>
            <li>H1: no especificada</li>
            <li>20290: conducir o trasladar ocupante s/cinturon de seg. colocado</li>
          </ul>
        </div>
      </SampleSection>

      {/* Jurisdicciones */}
      <SampleSection title="JURISDICCIONES CONSULTADAS">
        <div className="text-[10.5px] text-ink-700 leading-relaxed">
          <strong className="text-brand-950">Municipalidades:</strong> G.C.B.A.
          (CABA), La Matanza, Lomas de Zamora, Tigre, Pilar, Cordoba, Rosario,
          Mendoza, Mar del Plata, Bahía Blanca, La Plata, San Miguel,
          Avellaneda, Tres de Febrero, Lanus, Berazategui, Santiago del Estero,
          San Miguel de Tucumán, Salta, Jujuy, Posadas, Resistencia,
          Corrientes, Neuquén, Bariloche, Rio Gallegos, Ushuaia y más de 140
          municipios.
        </div>
        <div className="mt-2 text-[10.5px] text-ink-700">
          <strong className="text-brand-950">Provincias:</strong> Buenos Aires,
          Córdoba, Santa Fe, Mendoza, Entre Ríos, Río Negro, Misiones,
          Santiago del Estero, Chaco.
        </div>
      </SampleSection>

      {/* Total */}
      <div className="mt-5 bg-ink-100 border border-ink-300 rounded-md px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-brand-950">TOTAL ADEUDADO:</span>
        <span className="font-extrabold text-success text-lg">$219.323,17</span>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[10px] text-ink-500 italic border-t border-ink-300 pt-2">
        NO VÁLIDO COMO COMPROBANTE DE PAGO
      </div>
    </SampleWrapper>
  );
}
