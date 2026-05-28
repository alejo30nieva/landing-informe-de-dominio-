import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { leadSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getPreferenceClient, INFORME_PRICE_ARS } from "@/lib/mercadopago";
import { generateOrderId } from "@/lib/utils";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

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

  const orderId = generateOrderId();
  const amount = INFORME_PRICE_ARS;
  const { patente, email, cuit, method } = parsed.data;

  // 1) Persistimos lead (si está configurado Supabase). No bloqueamos si falla.
  let supaSaved = false;
  try {
    const supa = getSupabaseAdmin();
    const { error } = await supa.from("leads").insert({
      order_id: orderId,
      patente,
      email,
      cuit: cuit || null,
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

  // 2) Para transferencia devolvemos datos bancarios
  if (method === "transferencia") {
    return NextResponse.json({
      ok: true,
      orderId,
      titular: process.env.BANK_TITULAR ?? "Gestoría Córdoba",
      banco: process.env.BANK_NAME ?? "Banco Nación",
      alias: process.env.BANK_ALIAS ?? "GESTORIA.CBA.MP",
      cbu: process.env.BANK_CBU ?? "0000003100012345678901",
    });
  }

  // 3) MercadoPago (preferencia + redirect)
  try {
    const pref = getPreferenceClient();
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const preference = await pref.create({
      body: {
        items: [
          {
            id: orderId,
            title: `Informe de Dominio Automotor — ${patente}`,
            description: "Informe oficial registral",
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
          success: `${baseUrl}/success?order=${orderId}`,
          pending: `${baseUrl}/pending?order=${orderId}`,
          failure: `${baseUrl}/pending?order=${orderId}&status=failure`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
        metadata: { order_id: orderId, patente, email, cuit: cuit || "" },
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
    });

    // actualizar preference_id en Supabase (best-effort)
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
      preferenceId: preference.id,
      initPoint:
        process.env.NODE_ENV === "production"
          ? preference.init_point
          : preference.sandbox_init_point ?? preference.init_point,
      qrBase64: (preference as any)?.qr_code_base64 ?? null,
    });
  } catch (e: any) {
    console.error("[checkout] MP error:", e?.message);
    return NextResponse.json(
      {
        ok: false,
        orderId,
        error:
          "No pudimos generar el checkout de pago. Probá nuevamente en unos segundos.",
      },
      { status: 502 }
    );
  }
}
