"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CreditCard, QrCode, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { leadSchema, type LeadInput } from "@/lib/validations";
import { maskPatente, formatARS } from "@/lib/utils";
import { CheckoutModal } from "@/components/CheckoutModal";

const PRICE = Number(process.env.NEXT_PUBLIC_INFORME_PRICE ?? 6900);

export function HeroForm() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<LeadInput | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      patente: "",
      email: "",
      cuit: "",
      terms: false as unknown as true,
      website: "",
    },
  });

  const patente = watch("patente");

  const onSubmit = (data: LeadInput) => {
    if (data.website) {
      // honeypot — silent reject
      toast.error("No pudimos procesar la solicitud");
      return;
    }
    setLead(data);
    setOpen(true);
  };

  return (
    <>
      <motion.div
        id="formulario"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
      >
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-700/15 to-transparent rounded-3xl blur-2xl -z-10" />
        <div className="bg-white border border-ink-300 rounded-2xl shadow-elevate p-6 md:p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-950 leading-tight">
                Consultá tu informe
              </h3>
              <p className="text-xs text-ink-500">100% online — pago seguro</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="patente">Patente del vehículo</Label>
              <Input
                id="patente"
                inputMode="text"
                autoComplete="off"
                placeholder="AB123CD o ABC123"
                aria-invalid={!!errors.patente}
                invalid={!!errors.patente}
                {...register("patente")}
                onChange={(e) => {
                  const masked = maskPatente(e.target.value);
                  setValue("patente", masked, {
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                value={patente ?? ""}
                className="font-mono tracking-widest uppercase"
              />
              {errors.patente ? (
                <p className="text-xs text-danger">{errors.patente.message}</p>
              ) : (
                <p className="text-xs text-ink-500">Formato Mercosur o tradicional</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                aria-invalid={!!errors.email}
                invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cuit" className="flex items-center justify-between">
                <span>CUIT / CUIL</span>
                <span className="text-xs font-normal text-ink-500">Opcional</span>
              </Label>
              <Input
                id="cuit"
                inputMode="numeric"
                placeholder="20-12345678-9"
                aria-invalid={!!errors.cuit}
                invalid={!!errors.cuit}
                {...register("cuit")}
              />
              {errors.cuit && (
                <p className="text-xs text-danger">{errors.cuit.message}</p>
              )}
            </div>

            {/* Honeypot anti-spam (oculto) */}
            <div className="hidden" aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={!!field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                  />
                )}
              />
              <Label htmlFor="terms" className="text-xs leading-relaxed text-ink-700 font-normal">
                Acepto los{" "}
                <a href="#terminos" className="text-brand-700 underline-offset-2 hover:underline">
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a href="#privacidad" className="text-brand-700 underline-offset-2 hover:underline">
                  Política de Privacidad
                </a>
                .
              </Label>
            </div>
            {errors.terms && (
              <p className="text-xs text-danger -mt-2">{errors.terms.message as string}</p>
            )}

            <div className="pt-2">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm text-ink-500">Costo del informe</span>
                <span className="text-xl font-bold text-brand-950">
                  {formatARS(PRICE)}
                </span>
              </div>
              <Button
                type="submit"
                size="xl"
                className="w-full"
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
              >
                CONSULTAR INFORME
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="pt-3 border-t border-ink-300/60 mt-3">
              <p className="text-[11px] text-center text-ink-500 mb-2 uppercase tracking-wider font-semibold">
                Medios de pago
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-ink-700">
                <PaymentBadge label="MercadoPago" />
                <PaymentBadge icon={<CreditCard className="h-3.5 w-3.5" />} label="Tarjetas" />
                <PaymentBadge icon={<QrCode className="h-3.5 w-3.5" />} label="QR" />
                <PaymentBadge label="Transferencia" />
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-500">
                <Lock className="h-3 w-3" /> Pago 100% seguro y cifrado
              </p>
            </div>
          </form>
        </div>
      </motion.div>

      <CheckoutModal open={open} onOpenChange={setOpen} lead={lead} price={PRICE} />
    </>
  );
}

function PaymentBadge({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-ink-100 text-[11px] font-medium text-ink-700 border border-ink-300/60">
      {icon}
      {label}
    </span>
  );
}
