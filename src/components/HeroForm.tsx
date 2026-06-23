"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Lock,
  Loader2,
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
  Mail,
  Phone,
  Car,
  IdCard,
  ChevronRight,
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
  getComboSavings,
  DEFAULT_FORM_SERVICE,
  type Service,
} from "@/lib/services";
import { CheckoutModal } from "@/components/CheckoutModal";
import { cn } from "@/lib/utils";

const SVC_ICONS: Record<string, any> = {
  FileText,
  Users,
  UserSearch,
  Banknote,
  Zap,
  ShoppingCart,
};

const TOTAL_STEPS = 6;

type StepKey = 1 | 2 | 3 | 4 | 5 | 6;
const STEP_TITLES: Record<StepKey, string> = {
  1: "Elegí tu informe",
  2: "¿Cómo te llamás?",
  3: "Patente del vehículo",
  4: "¿A qué email lo enviamos?",
  5: "Tu WhatsApp",
  6: "Confirmá y pagá",
};

const FIELDS_BY_STEP: Record<StepKey, (keyof LeadInput)[]> = {
  1: ["serviceSlug"],
  2: ["nombre"],
  3: ["patente"],
  4: ["email"],
  5: ["telefono"],
  6: ["cuit", "terms"],
};

export function HeroForm() {
  const services = useMemo(() => getFormSelectableServices(), []);
  const [step, setStep] = useState<StepKey>(1);
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<LeadInput | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      serviceSlug: DEFAULT_FORM_SERVICE,
      nombre: "",
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

  // Deep linking: ?s=<slug> en la URL → pre-selecciona y salta al paso 2
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("s");
    if (!slug) return;
    const svc = getServiceBySlug(slug);
    if (svc?.selectableInForm) {
      setValue("serviceSlug", slug, { shouldValidate: true });
      setStep(2);
      setTimeout(() => {
        document
          .getElementById("formulario")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, [setValue]);

  const goNext = async () => {
    const fields = FIELDS_BY_STEP[step];
    const valid = await trigger(fields);
    if (!valid) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => (s + 1) as StepKey);
    }
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as StepKey);
  };

  /** Submit final: redirige directo a MercadoPago. */
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
        window.location.href = json.initPoint;
        return;
      }
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

  /** Flujo alternativo (Transferencia/QR). */
  const onAltPayment = handleSubmit((data: LeadInput) => {
    if (data.website) return;
    setLead(data);
    setOpen(true);
  });

  // Submit cuando el usuario aprieta Enter o el botón final del paso 5
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <motion.div
        id="formulario"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-[min(100%,28rem)] mx-auto lg:mx-0 lg:ml-auto scroll-mt-20"
      >
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-700/15 to-transparent rounded-3xl blur-2xl -z-10" />
        <div className="bg-white border border-ink-300 rounded-2xl shadow-elevate overflow-hidden">
          {/* Header con back + progress.
              Quitamos el shield verde de la derecha para balancear el peso visual:
              antes el header tenía un ícono brillante a la derecha que generaba
              la sensación de "form leaning right". */}
          <div className="px-4 sm:px-5 pt-3.5 pb-3 flex items-center gap-3 border-b border-ink-300/60">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              aria-label="Volver"
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors -ml-1.5",
                step === 1
                  ? "text-ink-300 cursor-not-allowed opacity-0 pointer-events-none"
                  : "text-brand-700 hover:bg-brand-50"
              )}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 min-w-0 text-center">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-brand-700">
                Paso {step} de {TOTAL_STEPS}
              </div>
              <h3 className="text-[14px] font-semibold text-brand-950 truncate">
                {STEP_TITLES[step]}
              </h3>
            </div>
            {/* Espacio simétrico al back button para mantener el título realmente centrado */}
            <div className="h-11 w-11 shrink-0 -mr-1.5" aria-hidden="true" />
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-ink-100">
            <motion.div
              className="h-full bg-brand-700"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Step content */}
          <form
            onSubmit={handleFinalSubmit}
            className="p-5 min-h-[330px] flex flex-col"
            noValidate
          >
            {/* Honeypot anti-spam */}
            <div className="hidden" aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex-1"
              >
                {step === 1 && (
                  <StepService
                    services={services}
                    selectedSlug={selectedSlug}
                    onSelect={(slug) => {
                      setValue("serviceSlug", slug, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      // Auto-avanza al elegir un servicio
                      setTimeout(() => setStep(2), 280);
                    }}
                  />
                )}

                {step === 2 && (
                  <StepNombre
                    register={register}
                    error={errors.nombre?.message}
                    ok={showOk("nombre")}
                    onEnter={goNext}
                  />
                )}

                {step === 3 && (
                  <StepPatente
                    register={register}
                    error={errors.patente?.message}
                    ok={showOk("patente")}
                    value={patente ?? ""}
                    setValue={(v) =>
                      setValue("patente", v, {
                        shouldValidate: true,
                        shouldTouch: true,
                        shouldDirty: true,
                      })
                    }
                    onEnter={goNext}
                  />
                )}

                {step === 4 && (
                  <StepEmail
                    register={register}
                    error={errors.email?.message}
                    ok={showOk("email")}
                    onEnter={goNext}
                  />
                )}

                {step === 5 && (
                  <StepTelefono
                    register={register}
                    error={errors.telefono?.message}
                    ok={showOk("telefono")}
                    onEnter={goNext}
                  />
                )}

                {step === 6 && (
                  <StepConfirm
                    service={selectedService}
                    price={price}
                    getValues={getValues}
                    register={register}
                    errors={errors}
                    control={control}
                    okCuit={showOk("cuit")}
                    redirecting={redirecting || isSubmitting}
                    onAltPayment={onAltPayment}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navegación inferior — pasos 2-5 (el 1 auto-avanza y el 6 tiene su propio botón) */}
            {step >= 2 && step <= 5 && (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={goBack}
                  className="px-3"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  onClick={goNext}
                  size="lg"
                  className="flex-1"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>

          {/* Bottom info — siempre visible, súper compacto */}
          <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-ink-300/60 bg-ink-100/30">
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-500">
              <Lock className="h-3 w-3" />
              Pago seguro · MercadoPago
            </p>
          </div>
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

/* ──────────────────────────────────────────────────────────
 * PASOS
 * ────────────────────────────────────────────────────────── */

function StepService({
  services,
  selectedSlug,
  onSelect,
}: {
  services: Service[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const comboSavings = getComboSavings();
  return (
    <div>
      <p className="text-[12.5px] text-ink-700 mb-3">
        Tocá el informe que necesitás.
      </p>
      <div className="grid grid-cols-1 gap-2.5">
        {services.map((s) => {
          const Icon = SVC_ICONS[s.icon] ?? FileText;
          const active = s.slug === selectedSlug;
          const isCombo = s.slug === "informe-compra-segura";
          const isExpress = s.slug === "informe-multas-express";
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onSelect(s.slug)}
              className={cn(
                "relative w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all active:scale-[0.99]",
                active
                  ? "border-brand-700 bg-brand-50 shadow-soft ring-1 ring-brand-700/20"
                  : "border-ink-300 bg-white hover:border-brand-700/40 hover:shadow-soft"
              )}
            >
              <span
                className={cn(
                  "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-brand-700 text-white" : "bg-ink-100 text-brand-700"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 min-w-0 overflow-hidden">
                <span className="flex items-center gap-1.5 min-w-0">
                  <span className="font-semibold text-[13.5px] text-brand-950 truncate min-w-0">
                    {s.title}
                  </span>
                  {isExpress && (
                    <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-warning text-white text-[8.5px] font-bold uppercase">
                      <Zap className="h-2.5 w-2.5" />
                    </span>
                  )}
                  {isCombo && (
                    <span className="inline-flex items-center px-1 py-0.5 rounded bg-success text-white text-[8.5px] font-bold uppercase">
                      Combo
                    </span>
                  )}
                </span>
              </span>
              <span className="shrink-0 text-right">
                {isCombo && (
                  <span className="block text-[8.5px] font-bold uppercase tracking-wider text-brand-700 mb-0.5 whitespace-nowrap">
                    ★ Recomendado
                  </span>
                )}
                <span className="block text-[14px] font-bold text-brand-950 whitespace-nowrap">
                  {s.priceARS ? `$${s.priceARS.toLocaleString("es-AR")}` : "—"}
                </span>
                {isCombo && comboSavings > 0 && (
                  <span className="block text-[10.5px] font-bold text-success whitespace-nowrap mt-0.5">
                    Ahorrás ${comboSavings.toLocaleString("es-AR")}
                  </span>
                )}
              </span>
              {active && (
                <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[10.5px] text-center text-ink-500">
        Tocá un informe para continuar
      </p>
    </div>
  );
}

function StepNombre({
  register,
  error,
  ok,
  onEnter,
}: {
  register: any;
  error?: string;
  ok?: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div>
      <p className="text-[12.5px] text-ink-700 mb-3 flex items-center gap-1.5">
        <IdCard className="h-4 w-4 text-brand-700" />
        Para identificar tu pedido al instante.
      </p>
      <div className="relative">
        <Input
          {...register("nombre")}
          ref={(el: HTMLInputElement) => {
            register("nombre").ref(el);
            ref.current = el;
          }}
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          placeholder="Nombre y apellido"
          aria-invalid={!!error}
          invalid={!!error}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="h-14 pr-9"
        />
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-danger">{error}</p>}
    </div>
  );
}

function StepPatente({
  register,
  error,
  ok,
  value,
  setValue,
  onEnter,
}: {
  register: any;
  error?: string;
  ok?: boolean;
  value: string;
  setValue: (v: string) => void;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div>
      <p className="text-[12.5px] text-ink-700 mb-3 flex items-center gap-1.5">
        <Car className="h-4 w-4 text-brand-700" />
        Ingresá la patente que querés consultar.
      </p>
      <div className="relative">
        <Input
          {...register("patente")}
          ref={(el: HTMLInputElement) => {
            register("patente").ref(el);
            ref.current = el;
          }}
          inputMode="text"
          autoComplete="off"
          placeholder="AB123CD o ABC123"
          aria-invalid={!!error}
          invalid={!!error}
          value={value}
          onChange={(e) => setValue(maskPatente(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="font-mono tracking-widest uppercase text-center text-lg h-14 pr-9"
        />
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-[11px] text-danger">{error}</p>
      ) : (
        <p className="mt-1.5 text-[11px] text-ink-500">
          Formato Mercosur (AB123CD) o tradicional (ABC123)
        </p>
      )}
    </div>
  );
}

function StepEmail({
  register,
  error,
  ok,
  onEnter,
}: {
  register: any;
  error?: string;
  ok?: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div>
      <p className="text-[12.5px] text-ink-700 mb-3 flex items-center gap-1.5">
        <Mail className="h-4 w-4 text-brand-700" />
        Te enviaremos el informe por email.
      </p>
      <div className="relative">
        <Input
          {...register("email")}
          ref={(el: HTMLInputElement) => {
            register("email").ref(el);
            ref.current = el;
          }}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="tu@email.com"
          aria-invalid={!!error}
          invalid={!!error}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="h-14 pr-9"
        />
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-danger">{error}</p>}
    </div>
  );
}

function StepTelefono({
  register,
  error,
  ok,
  onEnter,
}: {
  register: any;
  error?: string;
  ok?: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div>
      <p className="text-[12.5px] text-ink-700 mb-3 flex items-center gap-1.5">
        <Phone className="h-4 w-4 text-brand-700" />
        Te avisamos por WhatsApp cuando esté listo.
      </p>
      <div className="relative">
        <Input
          {...register("telefono")}
          ref={(el: HTMLInputElement) => {
            register("telefono").ref(el);
            ref.current = el;
          }}
          inputMode="tel"
          autoComplete="tel"
          placeholder="351 234 5678"
          aria-invalid={!!error}
          invalid={!!error}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="h-14 pr-9"
        />
        {ok && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-[11px] text-danger">{error}</p>
      ) : (
        <p className="mt-1.5 text-[11px] text-ink-500">
          Código de área + número (sin 0 ni 15)
        </p>
      )}
    </div>
  );
}

function StepConfirm({
  service,
  price,
  getValues,
  register,
  errors,
  control,
  okCuit,
  redirecting,
  onAltPayment,
}: {
  service: Service;
  price: number;
  getValues: any;
  register: any;
  errors: any;
  control: any;
  okCuit?: boolean;
  redirecting: boolean;
  onAltPayment: () => void;
}) {
  const values = getValues();

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="rounded-xl bg-brand-50 border border-brand-100 p-3.5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10.5px] uppercase tracking-widest font-bold text-brand-700">
            Resumen
          </span>
          <span className="text-[18px] font-extrabold text-brand-950 whitespace-nowrap">
            {formatARS(price)}
          </span>
        </div>
        <div className="text-[13px] font-semibold text-brand-950 leading-tight truncate">
          {service.title}
        </div>
        <div className="mt-2 grid gap-1 text-[11.5px] text-ink-700">
          <SummaryLine label="Nombre" value={values.nombre} />
          <SummaryLine label="Patente" value={values.patente} mono />
          <SummaryLine label="Email" value={values.email} />
          <SummaryLine label="WhatsApp" value={values.telefono} />
        </div>
      </div>

      {/* CUIT opcional */}
      <div className="space-y-1">
        <Label className="flex items-center justify-between text-[12.5px]">
          <span>CUIT / CUIL</span>
          <span className="text-[11px] text-ink-500 font-normal">Opcional</span>
        </Label>
        <div className="relative">
          <Input
            id="cuit"
            inputMode="numeric"
            placeholder="20-12345678-9"
            aria-invalid={!!errors.cuit}
            invalid={!!errors.cuit}
            className="h-11 pr-9"
            {...register("cuit")}
          />
          {okCuit && (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
          )}
        </div>
        {errors.cuit && (
          <p className="text-[11px] text-danger">{errors.cuit.message}</p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2.5 pt-1">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <Checkbox
              id="terms"
              checked={!!field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              className="mt-0.5"
            />
          )}
        />
        <Label
          htmlFor="terms"
          className="text-[12px] leading-snug text-ink-700 font-normal"
        >
          Acepto los{" "}
          <a href="/terminos" className="text-brand-700 underline-offset-2 hover:underline">
            Términos
          </a>{" "}
          y la{" "}
          <a href="/privacidad" className="text-brand-700 underline-offset-2 hover:underline">
            Privacidad
          </a>
          .
        </Label>
      </div>
      {errors.terms && (
        <p className="text-[11px] text-danger -mt-1">
          {errors.terms.message as string}
        </p>
      )}

      {/* Pay buttons */}
      <div className="pt-1 space-y-2">
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 text-[14px]"
          loading={redirecting}
          disabled={redirecting}
        >
          {redirecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              Conectando…
            </>
          ) : (
            <>
              PAGAR CON MERCADOPAGO
              <ArrowRight className="h-4 w-4 shrink-0" />
            </>
          )}
        </Button>
        <button
          type="button"
          onClick={onAltPayment}
          disabled={redirecting}
          className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg border border-ink-300 bg-white text-brand-950 font-semibold text-[12.5px] hover:bg-ink-100 disabled:opacity-50 transition-colors"
        >
          <Banknote className="h-3.5 w-3.5 shrink-0" />
          <span>Transferencia o QR</span>
          <span className="inline-flex items-center px-1 py-0.5 rounded bg-success text-white text-[8.5px] font-bold uppercase shrink-0">
            0%
          </span>
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-[10.5px] text-ink-500 pt-1">
        <MapPin className="h-3 w-3 text-brand-700 shrink-0" />
        Válido para toda la República Argentina
      </p>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  mono,
}: {
  label: string;
  value?: string;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-ink-500 shrink-0">{label}</span>
      <span
        className={cn(
          "text-brand-950 font-semibold truncate text-right",
          mono && "font-mono tracking-wider"
        )}
      >
        {value}
      </span>
    </div>
  );
}
