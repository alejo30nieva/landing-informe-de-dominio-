import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { leadSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  getPreferenceClient,
  INFORME_PRICE_ARS,
  isMpConfigured,
} from "@/lib/mercadopago";
import { cleanEnv, cleanBaseUrl } from "@/lib/utils";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { getServiceBySlug, DEFAULT_FORM_SERVICE } from "@/lib/services";
import { buildSku } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = leadSchema.extend({
  method: z.enum(["mercadopago", "tarjeta", "qr", "transferencia"]),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`checkout:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Probá en un minuto." },
      { status: 429 }
    );
  }

  let parsed;
  try {
    const raw = await req.json();
    parsed = bodySchema.safeParse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida" },
      { status: 400 }
    );
  }
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot anti-spam
  if (parsed.data.website) {
    return NextResponse.json(
      { ok: false, error: "Spam detectado" },
      { status: 400 }
    );
  }

  // Resolución del servicio desde el catálogo (single source of truth)
  const service =
    getServiceBySlug(parsed.data.serviceSlug) ??
    getServiceBySlug(DEFAULT_FORM_SERVICE);
  if (!service || !service.priceARS) {
    return NextResponse.json(
      { ok: false, error: "Servicio inválido" },
      { status: 400 }
    );
  }

  // El orderId ES el código de compra (SKU) legible por servicio:
  // GC-DOM-XXXX, GC-HIST-XXXX, etc. Identifica el pedido al instante.
  const orderId = buildSku(service.slug);
  const amount = service.priceARS ?? INFORME_PRICE_ARS;
  const { nombre, patente, email, telefono, dni, method } = parsed.data;

  // 1) Persistimos lead (si está configurado Supabase). No bloqueamos si falla.
  let supaSaved = false;
  try {
    const supa = getSupabaseAdmin();
    const { error } = await supa.from("leads").insert({
      order_id: orderId,
      service_slug: service.slug,
      service_title: service.title,
      nombre,
      patente,
      dni,
      email,
      telefono,
      amount,
      status: "pending",
      payment_method: method,
      source: "landing",
      user_agent: req.headers.get("user-agent") ?? null,
      ip,
    });
    if (!error) supaSaved = true;
  } catch (e) {
    console.warn("[checkout] supabase no configurado o error:", (e as Error).message);
  }

  // 1b) Google Sheets (vía webhook de Apps Script). No bloquea si falla.
  await pushToGoogleSheets({
    fecha: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Cordoba" }),
    orden: orderId,
    servicio: service.title,
    nombre,
    patente,
    dni,
    telefono,
    email,
    monto: amount,
    metodo: method,
    estado: "pendiente",
  });

  // 2) Para transferencia / QR devolvemos datos bancarios.
  //    Sanitizamos los valores por si el usuario los cargó con < > o espacios.
  if (method === "transferencia" || method === "qr") {
    return NextResponse.json({
      ok: true,
      orderId,
      serviceTitle: service.title,
      amount,
      titular: cleanEnv(process.env.BANK_TITULAR, "Gestoría Córdoba"),
      banco: cleanEnv(process.env.BANK_NAME, "Mercado Pago"),
      alias: cleanEnv(process.env.BANK_ALIAS, "GESTORIA.CBA.MP"),
      cbu: cleanEnv(process.env.BANK_CBU, "0000003100012345678901"),
      qrUrl: cleanEnv(process.env.BANK_QR_URL) || "/qr-pago.png",
    });
  }

  // 3) MercadoPago (preferencia + redirect)
  if (!isMpConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        orderId,
        error:
          "MercadoPago aún no está configurado. Usá transferencia o QR mientras tanto.",
      },
      { status: 503 }
    );
  }

  try {
    const pref = getPreferenceClient();
    // MercadoPago EXIGE https en back_urls para que auto_return funcione.
    // Forzamos https aunque el host venga sin protocolo o como http (proxy Vercel).
    let baseUrl = cleanBaseUrl(process.env.NEXT_PUBLIC_BASE_URL) || `https://${req.nextUrl.host}`;
    if (baseUrl.startsWith("http://")) baseUrl = baseUrl.replace("http://", "https://");

    const preference = await pref.create({
      body: {
        items: [
          {
            id: orderId,
            title: `${service.title} — ${patente}`,
            description: service.shortDesc,
            quantity: 1,
            currency_id: "ARS",
            unit_price: amount,
            category_id: "services",
          },
        ],
        payer: { email },
        external_reference: orderId,
        statement_descriptor: "GestoriaCBA",
        back_urls: {
          // back_url limpia (solo el SKU) para máxima fiabilidad del auto_return.
          // Los datos completos del pedido se traen en /success desde Supabase.
          success: `${baseUrl}/success?order=${orderId}`,
          pending: `${baseUrl}/pending?order=${orderId}`,
          failure: `${baseUrl}/pending?order=${orderId}&status=failure`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
        metadata: {
          order_id: orderId,
          service_slug: service.slug,
          nombre,
          patente,
          dni,
          email,
          telefono,
        },
        payment_methods:
          method === "tarjeta"
            ? {
                excluded_payment_types: [
                  { id: "ticket" },
                  { id: "atm" },
                ],
                installments: 12,
              }
            : { installments: 12 },
      },
      // Idempotency-Key evita que el cliente recree la preferencia
      // si el request se duplica por refresh / red lenta / retry.
      requestOptions: { idempotencyKey: orderId },
    });

    if (supaSaved) {
      try {
        const supa = getSupabaseAdmin();
        await supa
          .from("leads")
          .update({ preference_id: preference.id })
          .eq("order_id", orderId);
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      orderId,
      serviceTitle: service.title,
      amount,
      preferenceId: preference.id,
      initPoint:
        process.env.NODE_ENV === "production"
          ? preference.init_point
          : preference.sandbox_init_point ?? preference.init_point,
      qrBase64: (preference as any)?.qr_code_base64 ?? null,
    });
  } catch (e: any) {
    // El SDK de MP envuelve la respuesta del API en e.cause / e.message.
    // Tomamos todo lo que podamos para que sea visible en Vercel Logs.
    const mpStatus =
      e?.status ?? e?.cause?.status ?? e?.response?.status ?? null;
    const mpData =
      e?.cause?.response?.data ??
      e?.response?.data ??
      e?.cause?.data ??
      e?.cause?.error ??
      null;
    const message = e?.message ?? "error desconocido";
    console.error("[checkout] MP error", {
      message,
      mpStatus,
      mpData,
      name: e?.name,
      orderId,
      hasToken: Boolean(process.env.MP_ACCESS_TOKEN),
      tokenPrefix: process.env.MP_ACCESS_TOKEN?.slice(0, 8),
      baseUrl: cleanBaseUrl(process.env.NEXT_PUBLIC_BASE_URL),
    });

    // Si el debug=1 viene en la query, devolvemos el detalle para diagnosticar.
    // Si no, mensaje genérico al cliente.
    const debug = req.nextUrl.searchParams.get("debug") === "1";
    return NextResponse.json(
      {
        ok: false,
        orderId,
        error:
          "No pudimos generar el checkout de pago. Probá nuevamente en unos segundos.",
        ...(debug && { mpStatus, mpData, message }),
      },
      { status: 502 }
    );
  }
}

/**
 * Envía el lead a una hoja de Google Sheets vía webhook de Apps Script.
 * El usuario crea un Apps Script (doPost) que agrega una fila, lo despliega
 * como Web App y pega la URL en GOOGLE_SHEETS_WEBHOOK_URL.
 * Best-effort: nunca bloquea ni rompe el checkout si falla o no está configurado.
 */
async function pushToGoogleSheets(row: Record<string, unknown>): Promise<void> {
  const url = cleanEnv(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      // Apps Script puede tardar; cortamos a 4s para no demorar el checkout.
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) {
    console.warn("[checkout] Google Sheets webhook falló:", (e as Error).message);
  }
}
