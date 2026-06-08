import { SampleWrapper, SampleSection, Field } from "./SampleWrapper";

/**
 * Mockup del Informe Nominal — listado de vehículos registrados a nombre
 * de una persona (búsqueda por DNI/CUIT en todo el país).
 */
export function InformeNominalSample() {
  return (
    <SampleWrapper>
      <div className="text-center text-[10.5px] text-ink-700 italic leading-tight">
        Dirección Nacional de los Registros Nacionales de la Propiedad del Automotor
        <br />
        Búsqueda por CUIT/CUIL/DNI — Nivel Nacional
      </div>
      <h2 className="mt-3 text-center text-[16px] font-bold text-brand-950">
        Informe Nominal de Titularidad
      </h2>

      <SampleSection title="DATOS DEL CONSULTADO">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <Field label="Apellido y Nombre" value="P••• G••• [oculto]" hidden />
          <Field label="Tipo Doc" value="D.N.I." />
          <Field label="NroDoc" value="28•••••6" mono hidden />
          <Field label="CUIT/CUIL" value="20-••••••••-•" mono hidden />
          <Field label="Fecha Nacimiento" value="••/••/19••" hidden />
          <Field label="Nacionalidad" value="ARGENTINA" />
        </div>
      </SampleSection>

      <SampleSection title="VEHÍCULOS REGISTRADOS A SU NOMBRE">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead className="bg-ink-100">
              <tr className="text-left text-ink-700">
                <th className="px-2 py-1.5 font-semibold">Dominio</th>
                <th className="px-2 py-1.5 font-semibold">Marca</th>
                <th className="px-2 py-1.5 font-semibold">Modelo</th>
                <th className="px-2 py-1.5 font-semibold">Año</th>
                <th className="px-2 py-1.5 font-semibold">Tipo</th>
                <th className="px-2 py-1.5 font-semibold">% Titular</th>
                <th className="px-2 py-1.5 font-semibold">Desde</th>
                <th className="px-2 py-1.5 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300/60">
              {[
                {
                  d: "AB123CD",
                  marca: "FIAT",
                  modelo: "CRONOS PRECISION 1.3",
                  anio: 2023,
                  tipo: "SEDAN 4 PTAS",
                  pct: "100%",
                  desde: "10/2023",
                  estado: "Activo",
                },
                {
                  d: "AE456FG",
                  marca: "TOYOTA",
                  modelo: "HILUX 4X4 SRX",
                  anio: 2021,
                  tipo: "PICK-UP",
                  pct: "100%",
                  desde: "07/2021",
                  estado: "Activo",
                },
                {
                  d: "GHI789",
                  marca: "VOLKSWAGEN",
                  modelo: "GOL TREND",
                  anio: 2015,
                  tipo: "SEDAN 5 PTAS",
                  pct: "50%",
                  desde: "03/2015",
                  estado: "Activo",
                },
                {
                  d: "JKL012",
                  marca: "FORD",
                  modelo: "FIESTA KINETIC",
                  anio: 2012,
                  tipo: "SEDAN 5 PTAS",
                  pct: "100%",
                  desde: "08/2012",
                  estado: "Baja 2019",
                },
              ].map((r, i) => (
                <tr key={i}>
                  <td className="px-2 py-1.5 font-mono font-bold text-brand-700">{r.d}</td>
                  <td className="px-2 py-1.5">{r.marca}</td>
                  <td className="px-2 py-1.5">{r.modelo}</td>
                  <td className="px-2 py-1.5">{r.anio}</td>
                  <td className="px-2 py-1.5">{r.tipo}</td>
                  <td className="px-2 py-1.5 font-semibold">{r.pct}</td>
                  <td className="px-2 py-1.5">{r.desde}</td>
                  <td className="px-2 py-1.5">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        r.estado === "Activo"
                          ? "bg-success/15 text-success"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {r.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[10.5px] text-ink-500 italic">
          Total: 4 vehículos · 3 activos · 1 dado de baja
        </div>
      </SampleSection>

      <SampleSection title="OBSERVACIONES">
        <ul className="list-disc pl-5 space-y-1 text-[11px] text-ink-700">
          <li>La búsqueda incluye registros activos e históricos en todo el país.</li>
          <li>
            Vehículos con porcentaje menor a 100% indican titularidad compartida
            (matrimonio, sucesión, etc.).
          </li>
          <li>
            Para detalle ampliado de cualquiera de los dominios listados,
            solicitar Informe de Dominio o Histórico.
          </li>
        </ul>
      </SampleSection>

      <div className="mt-6 pt-4 border-t-2 border-ink-300 text-[10px] text-ink-500 flex items-center justify-between">
        <span>Fecha de Emisión: ••/••/2026 ••:••:••</span>
        <span className="font-mono">CodRS: 40•7 · Pagina 1/1</span>
      </div>
    </SampleWrapper>
  );
}
