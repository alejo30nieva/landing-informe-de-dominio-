import { SampleWrapper, SampleSection, Field } from "./SampleWrapper";

/**
 * Mockup del Informe de Estado de Dominio e Histórico de Titularidad (DNRPA).
 * Todos los datos personales y dominios fueron anonimizados o sustituidos.
 */
export function InformeHistoricoSample() {
  return (
    <SampleWrapper>
      {/* Header DNRPA */}
      <div className="text-center text-[10.5px] text-ink-700 italic leading-tight">
        Dirección Nacional de los Registros Nacionales de la Propiedad del Automotor y de Créditos Prendarios
        <br />
        Ministerio de Justicia
        <br />
        Presidencia de la Nación
      </div>
      <h2 className="mt-3 text-center text-[16px] font-bold text-brand-950">
        Informe de Estado de Dominio e Historico de Titularidad
      </h2>

      {/* DATOS DE DOMINIO */}
      <SampleSection title="DATOS DE DOMINIO">
        <div className="text-[13px] font-bold mb-3">
          DOMINIO: <span className="font-mono">AB123CD</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <Field label="Procedencia" value="NACIONAL" />
          <Field label="NroCertificado" value="048-000••••••/2023" mono />
          <Field label="Fecha Inscripción Inicial" value="30/10/2023" />
          <Field label="Código Automotor" value="048 - 17-CS" mono />
          <Field label="Fabrica" value="048 - FCA AUTOMOBILES ARGENTINA S.A." />
          <Field label="Marca" value="17 - FIAT" />
          <Field label="Modelo" value="CS - CRONOS PRECISION 1.3 GSE CVT BZ" />
          <Field label="Tipo" value="12 - SEDAN 4 PUERTAS" />
          <Field label="Mca Motor" value="FIAT" />
          <Field label="Nro. Motor" value="55282•••••••9512" mono hidden />
          <Field label="Mca Chasis" value="FIAT" />
          <Field label="Nro Chasis" value="8AP359AH•••••4198" mono hidden />
          <Field label="Fabricación Año" value="2023" />
          <Field label="Modelo Año" value="2023" />
          <Field label="Fecha de Adquisición" value="24/10/2023" />
          <Field label="Uso" value="PRIVADO" />
          <Field label="Cantidad de Placas" value="ORIGINAL" />
          <Field label="Peso" value="1196 Kg" />
          <Field label="Carga" value="400 Kg" />
          <Field label="Número de Titulo" value="023••••31" mono hidden />
          <Field label="Oblea RTO Nro" value="13006075 — VTO 30/10/2026" mono />
        </div>
      </SampleSection>

      {/* TITULAR */}
      <SampleSection title="TITULAR">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <Field
            label="Nombre"
            value={
              <span>
                G••••• R•••• <span className="text-ink-500 italic">[oculto]</span>
              </span>
            }
          />
          <Field label="Porcentaje de Titular" value="100 %" />
          <Field label="Cuit" value="20-••••••••-•" mono />
          <Field label="TipoDoc" value="D.N.I." />
          <Field label="NroDoc" value="33•••••3" mono hidden />
          <Field label="Fecha Nacimiento" value="••/••/1988" hidden />
          <Field label="Estado Civil" value="SOLTERO" />
          <Field label="Nacionalidad" value="ARGENTINA" />
        </div>

        <div className="mt-3 bg-ink-100 px-3 py-1 text-[11px] font-bold text-brand-950 uppercase tracking-wider border border-ink-300">
          DOMICILIO
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-2">
          <Field label="Provincia" value="CORDOBA" />
          <Field label="Partido" value="••••• ••••" hidden />
          <Field label="Localidad" value="•••••••••" hidden />
          <Field label="Codigo Postal" value="5•••" hidden />
          <Field label="Calle" value="•••••••• ••••• ••" hidden />
          <Field label="Caracter del Bien" value="PROPIO" />
          <Field label="Titular Desde" value="19/08/2025" />
          <Field label="Adquisición" value="A TITULO ONEROSO" />
          <Field label="Estipulacion Terceros" value="NO" />
          <Field label="Titular de Radicación" value="SI" />
        </div>
      </SampleSection>

      {/* CEDULA */}
      <SampleSection title="CEDULA">
        <div className="grid grid-cols-3 gap-x-6 gap-y-1.5">
          <Field label="Nro Cedula" value="AXO•••85" mono hidden />
          <Field label="Fecha de Emisión" value="19/08/2025" />
          <Field label="Fecha de Vencimiento" value="19/08/2026" />
        </div>
      </SampleSection>

      {/* INHIBIDOS */}
      <SampleSection title="INHIBIDOS">
        <div className="text-[11px] mb-2">
          <Field label="Fecha de Prioridad" value="20/04/2023" />
        </div>
        <div className="text-[11px] font-semibold text-brand-950 mb-1">
          Datos de la Persona Afectada
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <Field label="Apellido y Nombre" value="G••••• R•••• [oculto]" hidden />
          <Field label="Documento" value="33•••••3" mono hidden />
          <Field label="Domicilio" value="•••••••• ••• 5• , [oculto]" hidden />
        </div>
        <div className="mt-2 bg-ink-100 px-3 py-1 text-[11px] font-bold text-brand-950 uppercase tracking-wider border border-ink-300">
          Datos del Oficio
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
          <Field label="Jurisdicción" value="CORDOBA" />
          <Field label="Fecha de Vencimiento" value="20/04/2028" />
          <Field label="Reinscripta" value="NO" />
          <Field label="Levantada" value="NO" />
        </div>
        <div className="mt-2 text-[10.5px] text-ink-700">
          <span className="text-ink-500">Carátula: </span>
          "DIR GRAL DE RENTAS C/ [oculto] S/ EJECUTIVO FISCAL-(EE-•••••••8) —
          OF. DE EJECUCION FISCAL-JUZG.1ºA.-[oculto]"
        </div>
        <div className="text-[10.5px] text-ink-700 mt-1">
          <span className="text-ink-500">Anotación: </span>
          INGRESADA POR EL R.S 54008 CON EL NRO. 1045 EL 20/04/2023
        </div>
      </SampleSection>

      {/* PRENDADO */}
      <SampleSection title="PRENDADO">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <Field label="Acreedor Prendario" value="FCA S.A. DE AHORRO PARA FINES DETERMINADOS" />
          <Field label="Prenda en Grado" value="1" />
          <Field label="Cuit" value="30-69223905-5" mono />
          <Field label="Solicitud Tipo 03" value="11587593" mono />
          <Field label="Fecha de Contrato Original" value="26/10/2023" />
          <Field label="Cuotas" value="77" />
          <Field label="Fecha de Inscripcion" value="30/10/2023" />
          <Field label="Monto" value="$ 6.608.452,23" />
          <Field label="Ajuste" value="SI" />
        </div>
      </SampleSection>

      {/* Estado general */}
      <SampleSection title="ESTADO GENERAL">
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          {[
            ["ENDOSO", "NO POSEE"],
            ["DENUNCIA DE COMPRA", "NO POSEE"],
            ["DENUNCIA DE VENTA", "NO POSEE"],
            ["DENUNCIA DE ROBO", "NO POSEE"],
            ["MEDIDAS JUDICIALES", "NO POSEE"],
            ["AFECTACIONES", "NO POSEE"],
            ["CERTIFICACION DE DOMINIO", "NO POSEE"],
            ["PIEZAS DE DESARMADERO", "NO POSEE"],
            ["CESION DE DERECHOS", "NO POSEE"],
            ["TRAMITES PENDIENTES", "NO POSEE"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between px-2.5 py-1.5 bg-ink-100 border border-ink-300/70 rounded"
            >
              <span className="text-ink-700 text-[11px]">{k}</span>
              <span className="font-bold text-success text-[11px]">{v}</span>
            </div>
          ))}
        </div>
      </SampleSection>

      {/* TITULARES HISTORICOS */}
      <SampleSection title="TITULARES HISTORICOS">
        <div className="border-l-2 border-brand-700 pl-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <Field label="Titular Desde" value="30/10/2023" />
            <Field label="Titular Hasta" value="19/08/2025" />
            <Field label="Cuit/Cuil" value="27-••••••••-•" mono hidden />
            <Field label="Porcentaje" value="100 %" />
            <Field label="Nombre" value="D••• M••• L•••• [oculto]" hidden />
            <Field label="NroDoc" value="32•••••3" mono hidden />
            <Field label="Tipo Doc" value="D.N.I." />
            <Field label="Titular de Radicacion" value="SI" />
          </div>
          <div className="mt-1.5 text-[10.5px] text-ink-500">
            Domicilio: [oculto] — CORDOBA / [oculto]
          </div>
        </div>
      </SampleSection>

      {/* Footer DNRPA */}
      <div className="mt-6 pt-4 border-t-2 border-ink-300 text-[10px] text-ink-500 flex items-center justify-between">
        <span>Fecha de Impresión: ••/••/2026 ••:••:•• p.m.</span>
        <span className="font-mono">AB123CD · CodRS: 40•7 · Pagina 1/3</span>
      </div>
      <div className="mt-2 text-[9.5px] text-ink-500 text-center italic">
        La presente constancia expresa la situación jurídica del automotor a la
        fecha y hora de emisión.
      </div>
    </SampleWrapper>
  );
}
