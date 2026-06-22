import { z } from "zod";

const patenteRegex = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/;

export const leadSchema = z.object({
  serviceSlug: z
    .string()
    .min(1, "Elegí qué informe necesitás")
    .max(60),
  nombre: z
    .string()
    .min(2, "Ingresá tu nombre")
    .max(80, "Nombre demasiado largo")
    .transform((v) => v.trim()),
  patente: z
    .string()
    .min(6, "La patente debe tener al menos 6 caracteres")
    .max(7, "La patente no puede tener más de 7 caracteres")
    .transform((v) => v.toUpperCase().replace(/\s/g, ""))
    .refine((v) => patenteRegex.test(v), {
      message: "Formato inválido. Ej: ABC123 o AB123CD",
    }),
  email: z
    .string()
    .min(1, "Ingresá tu email")
    .email("Ingresá un email válido")
    .max(120, "Email demasiado largo")
    .transform((v) => v.toLowerCase().trim()),
  telefono: z
    .string()
    .min(8, "Ingresá un teléfono válido")
    .max(20, "Teléfono demasiado largo")
    .transform((v) => v.replace(/[^\d+]/g, ""))
    .refine((v) => /^(\+?54)?\d{10}$|^\+\d{10,14}$/.test(v), {
      message: "Ej: 351 234 5678 (cód. área + número)",
    }),
  cuit: z
    .string()
    .max(13, "CUIT/CUIL demasiado largo")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v.replace(/[^0-9]/g, "") : ""))
    .refine((v) => v === "" || /^\d{11}$/.test(v), {
      message: "CUIT/CUIL debe tener 11 dígitos",
    }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Debés aceptar los términos" }),
  }),
  // Honeypot — debe quedar vacío
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  nombre: z.string().min(2).max(80),
  email: z.string().email().max(120),
  mensaje: z.string().min(10).max(1000),
});
export type ContactInput = z.infer<typeof contactSchema>;
