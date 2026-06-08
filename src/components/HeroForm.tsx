"use client";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  MapPin,
  FileText,
  Users,
  Banknote,
  Zap,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { leadSchema, type LeadInput } from "@/lib/validations";
import { maskPatente, formatARS } from "@/lib/utils";
import {
  getFormSelectableServices,
  getServiceBySlug,
  DEFAULT_FORM_SERVICE,
  type Service,
} from "@/lib/services";
import { CheckoutModal } from "@/components/CheckoutModal";

const ICONS: Record<string, any> = {
  FileText,
  Users,
  Banknote,
  Zap,
  ShoppingCart,
};

export function HeroForm() {
  const services = useMemo(() => getFormSelectableServices(), []);
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<LeadInput | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields, dirtyFields },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      serviceSlug: DEFAULT_FORM_SERVICE,
      patente: "",
      email: "",
      telefono: "",
      cuit: "",
      terms: false as unknown as true,
      website: "",
    },
  });

  const patente = watch("patente");
  const selectedSlug = watch("serviceSlug") ?? DEFAULT_FORM_SERVICE;
  const selectedService =
    getServiceBySlug(selectedSlug) ?? services[0];
  const price = selectedService.priceARS ?? 0;

  const showOk = (name: keyof LeadInput) =>
    !errors[name] && (touchedFields as any)[name] && (dirtyFields as any)[name];

  const onSubmit = (data: LeadInput) => {
    if (data.website) {
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
        <div className="bg-white border border-ink-300 rounded-2xl shadow-elevate p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-950 leading-tight">
                Pedí tu informe online
              </h3>
              <p className="text-xs text-ink-500">100% online — pago seguro</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
            {/* Selector de tipo de informe */}
            <Controller
              control={control}
              name="serviceSlug"
              render={({ field }) => (
                <ServiceSelector
                  services={services}
                  value={field.value ?? DEFAULT_FORM_SERVICE}
                  onChange={field.onChange}
                />
              )}
            />

            <Field
              label="Patente del vehículo"
              error={errors.patente?.message}
              hint="Formato Mercosur o tradicional"
              ok={showOk("patente")}
            >
              <Input
                id="patente"
                inputMode="text"
                autoComplete="off"
                placeholder="AB123CD o ABC123"
                aria-invalid={!!errors.patente}
                invalid={!!errors.patente}
                {...register("patente")}
                onChange={(e) =>
                  setValue("patente", maskPatente(e.target.value), {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
                }
                value={patente ?? ""}
                className="font-mono tracking-widest uppercase pr-9"
              />
            </Field>

            <Field label="Email" error={errors.email?.message} ok={showOk("email")}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                aria-invalid={!!errors.email}
                invalid={!!errors.email}
                className="pr-9"
                {...register("email")}
              />
            </Field>

            <Field
              label="Teléfono / WhatsApp"
              error={errors.telefono?.message}
              hint="Te avisamos por WhatsApp cuando esté listo"
              ok={showOk("telefono")}
            >
              <Input
                id="telefono"
                inputMode="tel"
                autoComplete="tel"
                placeholder="351 234 5678"
                aria-invalid={!!errors.telefono}
                invalid={!!errors.telefono}
                className="pr-9"
                {...register("telefono")}
              />
            </Field>

            <Field
              label={
                <>
                  CUIT / CUIL{" "}
                  <span className="text-xs font-normal text-ink-500">— opcional</span>
                </>
              }
              error={errors.cuit?.message}
              ok={showOk("cuit")}
            >
              <Input
                id="cuit"
                inputMode="numeric"
                placeholder="20-12345678-9"
                aria-invalid={!!errors.cuit}
                invalid={!!errors.cuit}
                className="pr-9"
                {...register("cuit")}
              />
            </Field>

            {/* Honeypot anti-spam */}
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
                Leí y acepto los{" "}
                <a href="/terminos" className="text-brand-700 underline-offset-2 hover:underline">
                  Términos
                </a>{" "}
                y la{" "}
                <a href="/privacidad" className="text-brand-700 underline-offset-2 hover:underline">
                  Política de Privacidad
                </a>
                .
              </Label>
            </div>
            {errors.terms && (
              <p className="text-xs text-danger -mt-2">{errors.terms.message as string}</p>
            )}

            <div className="pt-2">
              <PriceSummary service={selectedService} price={price} />
              <Button
                type="submit"
                size="xl"
                className="w-full"
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
              >
                SOLICITAR INFORME
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-ink-500">
                <MapPin className="h-3.5 w-3.5 text-brand-700" />
                Válido para toda la República Argentina
              </p>
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

      <CheckoutModal
        open={open}
        onOpenChange={setOpen}
        lead={lead}
        service={selectedService}
      />
    </>
  );
}

function ServiceSelector({
  services,
  value,
  onChange,
}: {
  services: Service[];
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div>
      <Label className="mb-2 block">Elegí tu informe</Label>
      <div role="radiogroup" className="grid gap-2">
        {services.map((s) => {
          const Icon = ICONS[s.icon] ?? FileText;
          const active = value === s.slug;
          const isCombo = s.slug === "informe-compra-segura";
          const isExpress = s.slug === "informe-multas-express";
          return (
            <button
              key={s.slug}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(s.slug)}
              className={`relative w-full flex items-center gap-3 p-2.5 pl-3 rounded-xl border text-left transition-all ${
                active
                  ? "border-brand-700 bg-brand-50 shadow-soft"
                  : "border-ink-300 bg-white hover:border-brand-700/40"
              }`}
            >
              <span
                className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? "bg-brand-700 text-white"
                    : "bg-ink-100 text-brand-700"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-1.5">
                  <span className="font-semibold text-[13px] text-brand-950 truncate">
                    {s.shortLabel ?? s.title}
                  </span>
                  {isCombo && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success text-white text-[9px] font-bold uppercase tracking-wider">
                      Combo
                    </span>
                  )}
                  {isExpress && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-warning text-white text-[9px] font-bold uppercase tracking-wider">
                      <Zap className="h-2.5 w-2.5" /> Express
                    </span>
                  )}
                </span>
                <span className="block text-[11px] text-ink-500 mt-0.5 truncate">
                  {s.delivery}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-[14px] font-bold text-brand-950">
                  {s.priceARS ? `$${s.priceARS.toLocaleString("es-AR")}` : "—"}
                </span>
                <span
                  className={`mt-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full border ${
                    active
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-ink-300 bg-white"
                  }`}
                >
                  {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PriceSummary({ service, price }: { service: Service; price: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={service.slug}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="flex items-center justify-between gap-3 mb-3 p-3 rounded-lg bg-ink-100 border border-ink-300/60"
      >
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-ink-500">
            A pagar
          </div>
          <div className="text-sm font-semibold text-brand-950 truncate">
            {service.title}
          </div>
        </div>
        <div className="text-2xl font-extrabold text-brand-950 whitespace-nowrap">
          {formatARS(price)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  label,
  hint,
  error,
  ok,
  children,
}: {
  label: React.ReactNode;
  hint?: string;
  error?: string;
  ok?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center justify-between">{label}</Label>
      <div className="relative">
        {children}
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
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
