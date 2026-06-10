"use client";
import { useEffect, useMemo, useState } from "react";
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
  Banknote,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ServicePicker } from "@/components/ServicePicker";
import { leadSchema, type LeadInput } from "@/lib/validations";
import { maskPatente, formatARS } from "@/lib/utils";
import {
  getFormSelectableServices,
  getServiceBySlug,
  DEFAULT_FORM_SERVICE,
  type Service,
} from "@/lib/services";
import { CheckoutModal } from "@/components/CheckoutModal";

export function HeroForm() {
  const services = useMemo(() => getFormSelectableServices(), []);
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<LeadInput | null>(null);
  const [redirecting, setRedirecting] = useState(false);

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

  // Deep linking: ?s=<slug> en la URL → pre-selecciona ese informe + scroll al form.
  // Soporta los siguientes orígenes: PricingTable, /servicios, /ejemplos.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("s");
    if (!slug) return;
    const svc = getServiceBySlug(slug);
    if (svc?.selectableInForm) {
      setValue("serviceSlug", slug, { shouldValidate: true, shouldDirty: false });
      // Pequeño delay para asegurar que el DOM ya tiene la sección
      setTimeout(() => {
        document
          .getElementById("formulario")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, [setValue]);

  /**
   * Flujo principal: el cliente hace click en "PAGAR CON MERCADOPAGO"
   * y se redirige DIRECTO al checkout de MP, sin pasar por el modal.
   * Si MP falla por cualquier motivo, abrimos el modal con transferencia
   * preseleccionada como fallback.
   */
  const onSubmit = async (data: LeadInput) => {
    if (data.website) {
      toast.error("No pudimos procesar la solicitud");
      return;
    }
    setRedirecting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, method: "mercadopago" }),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        initPoint?: string;
        error?: string;
      } | null;

      if (json?.ok && json.initPoint) {
        // Redirect inmediato — el cliente entra a la página de pago de MP
        window.location.href = json.initPoint;
        return;
      }

      // Fallback: MP no está configurado o falló → abrir modal con
      // transferencia/QR como alternativa.
      toast.error(
        json?.error ??
          "No pudimos conectar con MercadoPago. Usá transferencia o QR."
      );
      setLead(data);
      setOpen(true);
    } catch {
      toast.error("Error de conexión. Probá nuevamente.");
      setLead(data);
      setOpen(true);
    } finally {
      setRedirecting(false);
    }
  };

  /** Flujo alternativo: abrir el modal con Transferencia/QR. */
  const onAltPayment = handleSubmit((data: LeadInput) => {
    if (data.website) return;
    setLead(data);
    setOpen(true);
  });

  return (
    <>
      <motion.div
        id="formulario"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-[420px] sm:max-w-md mx-auto lg:mx-0 lg:ml-auto scroll-mt-20"
      >
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-700/15 to-transparent rounded-3xl blur-2xl -z-10" />
        <div className="bg-white border border-ink-300 rounded-2xl shadow-elevate p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="inline-flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ShieldCheck className="h-4 sm:h-5 w-4 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-brand-950 leading-tight text-[15px] sm:text-base truncate">
                Pedí tu informe online
              </h3>
              <p className="text-[11px] sm:text-xs text-ink-500 truncate">
                100% online — pago seguro
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
            {/* Selector colapsable de tipo de informe (dropdown móvil-first) */}
            <Controller
              control={control}
              name="serviceSlug"
              render={({ field }) => (
                <ServicePicker
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

            <div className="pt-1">
              <PriceSummary service={selectedService} price={price} />

              {/* Botón PRIMARIO — redirect directo a MercadoPago */}
              <Button
                type="submit"
                size="xl"
                className="w-full px-4 sm:px-8 text-[15px] sm:text-base"
                loading={redirecting || isSubmitting}
                disabled={!isValid || isSubmitting || redirecting}
              >
                {redirecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                    <span className="truncate">Conectando con MercadoPago…</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">
                      <span className="sm:hidden">PAGAR CON MP</span>
                      <span className="hidden sm:inline">PAGAR CON MERCADOPAGO</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0" />
                  </>
                )}
              </Button>

              {/* Botón SECUNDARIO — Transferencia / QR (abre modal) */}
              <button
                type="button"
                onClick={onAltPayment}
                disabled={!isValid || isSubmitting || redirecting}
                className="mt-2 w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg border border-ink-300 bg-white text-brand-950 font-semibold text-[13px] hover:bg-ink-100 hover:border-brand-700/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-2"
              >
                <Banknote className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Transferencia o QR</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success text-white text-[9px] font-bold uppercase tracking-wider shrink-0">
                  0%
                </span>
              </button>

              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-ink-500">
                <MapPin className="h-3 w-3 text-brand-700 shrink-0" />
                Válido para toda la República Argentina
              </p>
            </div>

            <div className="pt-3 border-t border-ink-300/60 mt-1">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <PaymentBadge label="MercadoPago" />
                <PaymentBadge icon={<CreditCard className="h-3 w-3" />} label="Tarjetas" />
                <PaymentBadge icon={<QrCode className="h-3 w-3" />} label="QR" />
                <PaymentBadge label="Transferencia" />
              </div>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[10.5px] text-ink-500">
                <Lock className="h-3 w-3" /> Pago seguro cifrado por MercadoPago
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
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] sm:text-[11px] uppercase tracking-widest font-semibold text-ink-500">
            A pagar
          </div>
          <div className="text-[13px] sm:text-sm font-semibold text-brand-950 truncate">
            {service.title}
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-brand-950 whitespace-nowrap shrink-0">
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
    <div className="space-y-1">
      <Label className="flex items-center justify-between text-[12.5px] sm:text-sm">
        {label}
      </Label>
      <div className="relative">
        {children}
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error ? (
        <p className="text-[11px] text-danger">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-ink-500">{hint}</p>
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
