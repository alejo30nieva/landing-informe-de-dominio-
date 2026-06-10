import { SampleWrapper, SampleSection, Field, FieldGrid } from "./SampleWrapper";

/**
 * Mockup del Informe Nominal — listado de vehículos registrados a nombre
 * de una persona (búsqueda por DNI/CUIT en todo el país).
 *
 * Responsive: tabla en sm+, cards verticales en mobile.
 */
const vehiculos = [
  {
    d: "AB123CD",
    marca: "FIAT",
    modelo: "CRONOS PRECISION 1.3",
    anio: 2023,
    tipo: "SEDAN 4 PTAS",
    pct: "100%",
    desde: "10/2023",
    estado: "Activo" as const,
  },
  {
    d: "AE456FG",
    marca: "TOYOTA",
    modelo: "HILUX 4X4 SRX",
    anio: 2021,
    tipo: "PICK-UP",
    pct: "100%",
    desde: "07/2021",
    estado: "Activo" as const,
  },
  {
    d: "GHI789",
    marca: "VOLKSWAGEN",
    modelo: "GOL TREND",
    anio: 2015,
    tipo: "SEDAN 5 PTAS",
    pct: "50%",
    desde: "03/2015",
    estado: "Activo" as const,
  },
  {
    d: "JKL012",
    marca: "FORD",
    modelo: "FIESTA KINETIC",
    anio: 2012,
    tipo: "SEDAN 5 PTAS",
    pct: "100%",
    desde: "08/2012",
    estado: "Baja 2019" as const,
  },
];

export function InformeNominalSample() {
  return (
    <SampleWrapper>
      <div className="text-center text-[9.5px] sm:text-[10.5px] text-ink-700 italic leading-tight">
        Dirección Nacional de los Registros Nacionales
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> </span>
        de la Propiedad del Automotor
        <br />
        Búsqueda por CUIT/CUIL/DNI — Nivel Nacional
      </div>
      <h2 className="mt-2 sm:mt-3 text-center text-[13px] sm:text-[15px] font-bold text-brand-950">
        Informe Nominal de Titularidad
      </h2>

      <SampleSection title="DATOS DEL CONSULTADO">
        <FieldGrid>
          <Field label="Apellido y Nombre" value="P••• G••• [oculto]" hidden />
          <Field label="Tipo Doc" value="D.N.I." />
          <Field label="Nro Doc" value="28•••••6" mono hidden />
          <Field label="CUIT/CUIL" value="20-••••••••-•" mono hidden />
          <Field label="Nacimiento" value="••/••/19••" hidden />
          <Field label="Nacionalidad" value="ARGENTINA" />
        </FieldGrid>
      </SampleSection>

      <SampleSection title="VEHÍCULOS A SU NOMBRE">
        {/* Mobile: cards */}
        <div className="sm:hidden space-y-2.5">
          {vehiculos.map((v) => (
            <div
              key={v.d}
              className="border border-ink-300 rounded-md p-2.5 bg-white"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono font-bold text-brand-700 text-[14px] tracking-wider">
                  {v.d}
                </span>
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    v.estado === "Activo"
                      ? "bg-success/15 text-success"
                      : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {v.estado}
                </span>
              </div>
              <div className="text-[12px] font-semibold text-brand-950 leading-tight">
                {v.marca} {v.modelo}
              </div>
              <div className="mt-1 text-[10.5px] text-ink-700 flex items-center flex-wrap gap-x-3 gap-y-0.5">
                <span>
                  <span className="text-ink-500">Año:</span> {v.anio}
                </span>
                <span>
                  <span className="text-ink-500">Tipo:</span> {v.tipo}
                </span>
                <span>
                  <span className="text-ink-500">Titular:</span>{" "}
                  <span className="font-semibold">{v.pct}</span>
                </span>
                <span>
                  <span className="text-ink-500">Desde:</span> {v.desde}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* sm+: tabla */}
        <div className="hidden sm:block overflow-x-auto">
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
              {vehiculos.map((r) => (
                <tr key={r.d}>
                  <td className="px-2 py-1.5 font-mono font-bold text-brand-700">
                    {r.d}
                  </td>
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

        <div className="mt-3 text-[10px] sm:text-[10.5px] text-ink-500 italic">
          Total: 4 vehículos · 3 activos · 1 dado de baja
        </div>
      </SampleSection>

      <SampleSection title="OBSERVACIONES">
        <ul className="list-disc pl-5 space-y-1 text-[10.5px] sm:text-[11px] text-ink-700">
          <li>La búsqueda incluye registros activos e históricos en todo el país.</li>
          <li>
            Vehículos con porcentaje menor a 100% indican titularidad
            compartida (matrimonio, sucesión, etc.).
          </li>
          <li>
            Para detalle ampliado de cualquier dominio, solicitar Informe de
            Dominio o Histórico.
          </li>
        </ul>
      </SampleSection>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-ink-300 text-[9.5px] sm:text-[10px] text-ink-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span>Fecha de Emisión: ••/••/2026 ••:••:••</span>
        <span className="font-mono">CodRS: 40•7 · Pag 1/1</span>
      </div>
    </SampleWrapper>
  );
}
