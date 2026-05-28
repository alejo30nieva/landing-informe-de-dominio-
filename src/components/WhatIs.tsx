"use client";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, ShieldAlert, Banknote, Gavel, UserCheck, Car } from "lucide-react";

const includes = [
  { icon: UserCheck, label: "Titular registral actual" },
  { icon: Car, label: "Datos completos del vehículo" },
  { icon: ShieldAlert, label: "Embargos e inhibiciones" },
  { icon: Banknote, label: "Deudas patentes y multas" },
  { icon: Gavel, label: "Estado legal y registral" },
  { icon: FileText, label: "Histórico de transferencias" },
];

export function WhatIs() {
  return (
    <section id="que-es" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-widest text-brand-700 uppercase">
              ¿Qué es?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-950 tracking-tight">
              El Informe de Dominio te muestra todo lo que el Registro sabe del vehículo
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Es el documento oficial que certifica el estado{" "}
              <strong>legal, registral y patrimonial</strong> de un automotor.
              Te permite verificar quién es el verdadero titular, si tiene
              deudas, prendas, embargos o si fue dado de baja, evitando estafas
              al momento de comprar o transferir.
            </p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {includes.map((it) => (
                <li key={it.label} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-xl bg-brand-50 border border-brand-100">
              <p className="text-sm text-brand-950 leading-relaxed">
                <strong>¿Por qué es importante?</strong> Antes de comprar un
                auto usado, este informe es la única forma confiable de
                confirmar que el vehículo no tiene problemas ocultos y que el
                vendedor es el titular real.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-brand-700/10 to-transparent rounded-3xl blur-2xl -z-10" />
            <DocumentMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DocumentMockup() {
  return (
    <div className="relative mx-auto max-w-md aspect-[5/6] rounded-2xl bg-white border border-ink-300 shadow-elevate overflow-hidden">
      <div className="bg-brand-950 text-white px-6 py-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-brand-700 flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-white/70">
            Registro Nacional
          </div>
          <div className="text-sm font-semibold">Informe de Dominio Automotor</div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">
            Dominio
          </div>
          <div className="font-mono text-xl tracking-widest text-brand-950 mt-1">
            AB 123 CD
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FieldLine label="Marca" value="Toyota" />
          <FieldLine label="Modelo" value="Corolla XEI" />
          <FieldLine label="Año" value="2022" />
          <FieldLine label="Motor" value="2ZR-XXXXXX" />
        </div>
        <div className="border-t border-dashed border-ink-300 pt-3">
          <FieldLine label="Titular" value="••••••••• •••••••" />
        </div>
        <div className="space-y-1.5">
          <StatusRow label="Deudas de patente" ok />
          <StatusRow label="Multas" ok />
          <StatusRow label="Embargos" ok />
          <StatusRow label="Inhibiciones" ok />
          <StatusRow label="Prendas" warn />
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success-50 text-success text-[11px] font-semibold border border-success/20">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Documento verificado
        </div>
      </div>
    </div>
  );
}

function FieldLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">
        {label}
      </div>
      <div className="text-sm text-brand-950 font-medium mt-0.5">{value}</div>
    </div>
  );
}

function StatusRow({ label, ok, warn }: { label: string; ok?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-ink-700">{label}</span>
      <span
        className={
          ok
            ? "text-success font-semibold"
            : warn
            ? "text-warning font-semibold"
            : "text-ink-500"
        }
      >
        {ok ? "Sin novedades" : warn ? "Verificar" : "—"}
      </span>
    </div>
  );
}
