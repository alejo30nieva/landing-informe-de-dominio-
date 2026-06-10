import { SampleWrapper, SampleSection, Field, FieldGrid } from "./SampleWrapper";

/**
 * Mockup del Informe de Estado de Dominio e Histórico de Titularidad (DNRPA).
 * Todos los datos personales y dominios fueron anonimizados o sustituidos.
 *
 * Responsive: una columna en mobile, dos en sm+.
 */
export function InformeHistoricoSample() {
  return (
    <SampleWrapper>
      {/* Header DNRPA */}
      <div className="text-center text-[9.5px] sm:text-[10.5px] text-ink-700 italic leading-tight">
        Dirección Nacional de los Registros Nacionales de la Propiedad del Automotor
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>y de Créditos Prendarios
        <br />
        Ministerio de Justicia · Presidencia de la Nación
      </div>
      <h2 className="mt-2 sm:mt-3 text-center text-[13px] sm:text-[15px] font-bold text-brand-950 leading-tight">
        Informe de Estado de Dominio
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> e </span>
        <span className="sm:hidden">e </span>
        Histórico de Titularidad
      </h2>

      {/* DATOS DE DOMINIO */}
      <SampleSection title="DATOS DE DOMINIO">
        <div className="text-center mb-3">
          <div className="text-[9.5px] uppercase tracking-widest font-semibold text-ink-500">
            Dominio
          </div>
          <div className="text-[18px] sm:text-[20px] font-mono font-bold tracking-widest text-brand-700 mt-0.5">
            AB123CD
          </div>
        </div>
        <FieldGrid>
          <Field label="Procedencia" value="NACIONAL" />
          <Field label="NroCertificado" value="048-000••••••/2023" mono />
          <Field label="Inscripción Inicial" value="30/10/2023" />
          <Field label="Código Automotor" value="048 - 17-CS" mono />
          <Field label="Fábrica" value="FCA AUTOMOBILES ARG. S.A." />
          <Field label="Marca" value="17 - FIAT" />
          <Field label="Modelo" value="CRONOS PRECISION 1.3 GSE CVT BZ" />
          <Field label="Tipo" value="SEDAN 4 PUERTAS" />
          <Field label="Nro. Motor" value="55282•••••••9512" mono hidden />
          <Field label="Nro. Chasis" value="8AP359AH•••••4198" mono hidden />
          <Field label="Fabricación" value="2023" />
          <Field label="Modelo Año" value="2023" />
          <Field label="Adquisición" value="24/10/2023" />
          <Field label="Uso" value="PRIVADO" />
          <Field label="Peso" value="1196 Kg" />
          <Field label="Carga" value="400 Kg" />
        </FieldGrid>
        <div className="mt-2.5 pt-2.5 border-t border-ink-300/60 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          <Field label="Cantidad de Placas" value="ORIGINAL" />
          <Field label="Oblea RTO" value="13006075 · VTO 30/10/2026" mono />
        </div>
      </SampleSection>

      {/* TITULAR */}
      <SampleSection title="TITULAR ACTUAL">
        <FieldGrid>
          <Field
            label="Nombre"
            value={<span>G••••• R•••• <span className="text-ink-500 italic">[oculto]</span></span>}
          />
          <Field label="% Titular" value="100 %" />
          <Field label="CUIT" value="20-••••••••-•" mono />
          <Field label="Tipo Doc" value="D.N.I." />
          <Field label="Nro Doc" value="33•••••3" mono hidden />
          <Field label="Estado Civil" value="SOLTERO" />
          <Field label="Nacimiento" value="••/••/1988" hidden />
          <Field label="Nacionalidad" value="ARGENTINA" />
        </FieldGrid>

        <div className="mt-3 bg-ink-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-brand-950 uppercase tracking-wider border border-ink-300 text-center">
          Domicilio
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          <Field label="Provincia" value="CORDOBA" />
          <Field label="Partido" value="••••• ••••" hidden />
          <Field label="Localidad" value="•••••••••" hidden />
          <Field label="C.P." value="5•••" hidden />
          <Field label="Calle" value="•••••••• ••••• ••" hidden />
          <Field label="Carácter del bien" value="PROPIO" />
          <Field label="Titular desde" value="19/08/2025" />
          <Field label="Adquisición" value="A TÍTULO ONEROSO" />
          <Field label="Titular Radicación" value="SÍ" />
          <Field label="Estipulación Terceros" value="NO" />
        </div>
      </SampleSection>

      {/* CEDULA */}
      <SampleSection title="CÉDULA VERDE">
        <FieldGrid>
          <Field label="Nº Cédula" value="AXO•••85" mono hidden />
          <Field label="Emisión" value="19/08/2025" />
          <Field label="Vencimiento" value="19/08/2026" />
        </FieldGrid>
      </SampleSection>

      {/* INHIBIDOS */}
      <SampleSection title="INHIBICIONES">
        <Field label="Fecha de Prioridad" value="20/04/2023" />
        <div className="mt-2 text-[10.5px] sm:text-[11px] font-semibold text-brand-950">
          Persona afectada
        </div>
        <FieldGrid>
          <Field label="Apellido y Nombre" value="G••••• R•••• [oculto]" hidden />
          <Field label="Documento" value="33•••••3" mono hidden />
        </FieldGrid>
        <div className="mt-2.5 bg-ink-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-brand-950 uppercase tracking-wider border border-ink-300 text-center">
          Datos del oficio
        </div>
        <div className="mt-2">
          <FieldGrid>
            <Field label="Jurisdicción" value="CORDOBA" />
            <Field label="Vencimiento" value="20/04/2028" />
            <Field label="Reinscripta" value="NO" />
            <Field label="Levantada" value="NO" />
          </FieldGrid>
          <div className="mt-2 text-[10px] sm:text-[10.5px] text-ink-700 break-words">
            <span className="text-ink-500">Carátula: </span>
            "DIR GRAL DE RENTAS C/ [oculto] S/ EJECUTIVO FISCAL-(EE-•••••••8) — OF.
            DE EJECUCION FISCAL-JUZG.1ºA.-[oculto]"
          </div>
          <div className="text-[10px] sm:text-[10.5px] text-ink-700 mt-1">
            <span className="text-ink-500">Anotación: </span>
            INGRESADA POR EL R.S 54008 CON EL NRO. 1045 EL 20/04/2023
          </div>
        </div>
      </SampleSection>

      {/* PRENDADO */}
      <SampleSection title="PRENDA">
        <FieldGrid>
          <Field label="Acreedor" value="FCA S.A. AHORRO PARA FINES" />
          <Field label="Grado" value="1" />
          <Field label="CUIT" value="30-69223905-5" mono />
          <Field label="Solicitud Tipo 03" value="11587593" mono />
          <Field label="Contrato Original" value="26/10/2023" />
          <Field label="Cuotas" value="77" />
          <Field label="Inscripción" value="30/10/2023" />
          <Field label="Monto" value="$ 6.608.452,23" />
          <Field label="Ajuste" value="SÍ" />
        </FieldGrid>
      </SampleSection>

      {/* Estado general */}
      <SampleSection title="ESTADO GENERAL">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {[
            ["Endoso", "NO POSEE"],
            ["Denuncia de Compra", "NO POSEE"],
            ["Denuncia de Venta", "NO POSEE"],
            ["Denuncia de Robo", "NO POSEE"],
            ["Medidas Judiciales", "NO POSEE"],
            ["Afectaciones", "NO POSEE"],
            ["Certificación de Dominio", "NO POSEE"],
            ["Piezas de Desarmadero", "NO POSEE"],
            ["Cesión de Derechos", "NO POSEE"],
            ["Trámites Pendientes", "NO POSEE"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-ink-100 border border-ink-300/70 rounded text-[10.5px] sm:text-[11px]"
            >
              <span className="text-ink-700 truncate">{k}</span>
              <span className="font-bold text-success shrink-0">{v}</span>
            </div>
          ))}
        </div>
      </SampleSection>

      {/* TITULARES HISTORICOS */}
      <SampleSection title="TITULARES HISTÓRICOS">
        <div className="border-l-2 border-brand-700 pl-2.5 sm:pl-3">
          <FieldGrid>
            <Field label="Desde" value="30/10/2023" />
            <Field label="Hasta" value="19/08/2025" />
            <Field label="CUIT" value="27-••••••••-•" mono hidden />
            <Field label="% Titularidad" value="100 %" />
            <Field label="Nombre" value="D••• M••• L•••• [oculto]" hidden />
            <Field label="Nro Doc" value="32•••••3" mono hidden />
            <Field label="Tipo Doc" value="D.N.I." />
            <Field label="Titular Radicación" value="SÍ" />
          </FieldGrid>
          <div className="mt-1.5 text-[10px] sm:text-[10.5px] text-ink-500">
            Domicilio: [oculto] — CORDOBA / [oculto]
          </div>
        </div>
      </SampleSection>

      {/* Footer DNRPA */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-ink-300 text-[9.5px] sm:text-[10px] text-ink-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span>Fecha de Impresión: ••/••/2026 ••:••:•• p.m.</span>
        <span className="font-mono">AB123CD · CodRS: 40•7 · Pag 1/3</span>
      </div>
      <div className="mt-2 text-[9px] sm:text-[9.5px] text-ink-500 text-center italic">
        La presente constancia expresa la situación jurídica del automotor a la
        fecha y hora de emisión.
      </div>
    </SampleWrapper>
  );
}
