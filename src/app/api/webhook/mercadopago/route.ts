import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

import { getPaymentClient } from "@/lib/mercadopago";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyEmail, notifyWhatsApp } from "@/lib/notify";
import { cleanEnv } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook de Mercado Pago — eventos `payment`.
 *
 * Soporta:
 *  - Validación HMAC de la firma x-signature (recomendado por MP).
 *  - Formato nuevo (type=payment, data.id) y viejo (topic=payment, id).
 *  - Idempotencia: si ya marcamos el pago como approved/rejected y vuelve a
 *    llegar el mismo evento, no re-notificamos.
 *  - Retesteos HEAD/GET de MP devuelven 200 OK.
 *
 * Docs:
 *  https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
 */
export async function POST(req: NextRequest) {
  // Tomamos el raw body para verificar la firma (el SDK lo necesita textual).
  const rawBody = await req.text();
  let body: any = null;
  try {
    body = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    body = null;
  }

  const url = req.nextUrl;
  const topic = body?.type ?? body?.topic ?? url.searchParams.get("topic");
  const dataId =
    body?.data?.id ??
    body?.id ??
    url.searchParams.get("id") ??
    url.searchParams.get("data.id");

  // 1) Validación de firma (opcional pero recomendada).
  //    Si no está configurada la secret, se omite (compatibilidad con dev).
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (secret) {
    const signatureOk = verifyMpSignature({
      secret,
      xSignature: req.headers.get("x-signature"),
      xRequestId: req.headers.get("x-request-id"),
      dataId: String(dataId ?? ""),
    });
    if (!signatureOk) {
      // NO bloqueamos: abajo re-consultamos el pago directo a MP con NUESTRO
      // access_token (fuente de verdad). Un webhook falsificado no puede fabricar
      // un pago aprobado real. Si la firma no coincide (secret mal cargado en
      // Vercel) igual procesamos, para no perder notificaciones en silencio.
      console.warn(
        "[mp-webhook] firma inválida (¿MP_WEBHOOK_SECRET mal cargado?) — proceso igual validando el pago vía API de MP"
      );
    }
  }

  // 2) Eventos que NO son payment los ignoramos con 200 (MP los reenviaría sino).
  if (!topic || topic !== "payment" || !dataId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // 3) Consultamos el pago en MP (single source of truth).
  let payment: any;
  try {
    const payments = getPaymentClient();
    payment = await payments.get({ id: String(dataId) });
  } catch (e: any) {
    console.error("[mp-webhook] error consultando MP:", e?.message);
    // 200 para que MP no reintente indefinidamente
    return NextResponse.json({ ok: false, error: "mp_fetch_failed" });
  }

  const orderId = String(payment.external_reference ?? "");
  const status = String(payment.status ?? "pending") as
    | "approved"
    | "pending"
    | "in_process"
    | "rejected"
    | "cancelled";

  // 4) Traemos el lead completo (para idempotencia + datos del mensaje).
  let previousStatus: string | null = null;
  let lead: {
    nombre?: string;
    patente?: string;
    dni?: string;
    email?: string;
    telefono?: string;
    service_title?: string;
    status?: string;
  } | null = null;
  try {
    const supa = getSupabaseAdmin();
    if (orderId) {
      const { data } = await supa
        .from("leads")
        .select(
          "status, nombre, patente, dni, email, telefono, service_title"
        )
        .eq("order_id", orderId)
        .maybeSingle();
      lead = data ?? null;
      previousStatus = data?.status ?? null;
    }
  } catch (e) {
    console.warn("[mp-webhook] no se pudo leer el lead:", (e as Error).message);
  }

  // 5) Persistir update (best-effort).
  try {
    const supa = getSupabaseAdmin();
    const update: Record<string, any> = {
      status,
      payment_id: String(payment.id),
      payment_method: payment.payment_method_id ?? null,
      updated_at: new Date().toISOString(),
    };
    if (orderId) {
      await supa.from("leads").update(update).eq("order_id", orderId);
    } else {
      await supa.from("leads").update(update).eq("payment_id", String(payment.id));
    }
  } catch (e) {
    console.warn("[mp-webhook] supabase update fallido:", (e as Error).message);
  }

  // 6) Notificar SOLO si el estado cambió a uno terminal nuevo (idempotente).
  const isNewlyApproved =
    status === "approved" && previousStatus !== "approved";

  if (isNewlyApproved) {
    // Fusionamos datos: Supabase (lead) primero, metadata del pago como fallback.
    const meta = (payment.metadata as any) ?? {};
    const nombre = lead?.nombre ?? meta.nombre ?? "";
    const patente = lead?.patente ?? meta.patente ?? "";
    const dni = lead?.dni ?? meta.dni ?? "";
    const email =
      lead?.email ?? meta.email ?? (payment.payer as any)?.email ?? "";
    const telefono = lead?.telefono ?? meta.telefono ?? "";
    const servicio = lead?.service_title ?? meta.service_title ?? "Informe";
    const monto = payment.transaction_amount ?? 0;

    // Mensaje COMPLETO con todos los datos del formulario, para emitir el informe.
    const fullMsg =
      `✅ NUEVO PAGO APROBADO\n\n` +
      `🧾 Servicio: ${servicio}\n` +
      `👤 Nombre: ${nombre}\n` +
      `🚗 Patente: ${patente}\n` +
      `🪪 DNI: ${dni}\n` +
      `📱 Teléfono: ${telefono}\n` +
      `📧 Email: ${email}\n` +
      `💰 Monto: $${Number(monto).toLocaleString("es-AR")}\n` +
      `🔖 Código: ${orderId}`;

    console.log(
      `[mp-webhook] PAGO APROBADO ${orderId} — notificando gestoría (${servicio}, ${nombre})`
    );

    // 6a) WhatsApp AUTOMÁTICO a la gestoría (se envía sí o sí al aprobarse el pago).
    const adminPhone = cleanEnv(process.env.ADMIN_WHATSAPP_PHONE);
    if (adminPhone) {
      const wa = await notifyWhatsApp({ to: adminPhone, body: fullMsg });
      if (wa.ok && !wa.skipped) {
        console.log(`[mp-webhook] WhatsApp gestoría OK -> ${adminPhone}`);
      } else if (!wa.skipped) {
        console.warn("[mp-webhook] WhatsApp gestoría FALLÓ:", wa.error);
      }
    }

    // 6b) Email AUTOMÁTICO a la gestoría — con TODOS los datos para emitir el informe.
    //     Se envía a ADMIN_EMAIL (gestora) y ADEMÁS a RESEND_OWNER_EMAIL (el email
    //     dueño de la cuenta Resend) como copia GARANTIZADA: mientras el dominio no
    //     esté verificado en Resend, ese es el único inbox que Resend nunca rechaza.
    const adminHtml = adminEmailTemplate({
      servicio,
      nombre,
      patente,
      dni,
      telefono,
      email,
      monto: Number(monto),
      orderId: orderId || "—",
    });
    const adminSubject = `✅ Nuevo pago — ${servicio} — ${nombre} (${orderId})`;

    // Destinatario principal: la gestora. Enviado DESDE el dominio verificado
    // (pagos@informesdedominio.online) para que Resend lo entregue a cualquier
    // casilla. Forzamos el `from` acá para no depender de RESEND_FROM en Vercel.
    const gestoraEmail =
      cleanEnv(process.env.ADMIN_EMAIL) || "gestoriacordobaluci@gmail.com";
    const verifiedFrom = "Gestoría Córdoba <pagos@informesdedominio.online>";

    const rG = await notifyEmail({
      to: gestoraEmail,
      from: verifiedFrom,
      subject: adminSubject,
      html: adminHtml,
    });
    if (rG.ok && !rG.skipped) {
      console.log(`[mp-webhook] email gestoría OK -> ${gestoraEmail}`);
    } else if (!rG.skipped) {
      console.error(`[mp-webhook] email gestoría FALLÓ -> ${gestoraEmail}:`, rG.error);
    }

    // Copia de respaldo GARANTIZADA al dueño de la cuenta Resend (siempre entrega,
    // aún sin dominio verificado). Red de seguridad hasta confirmar que el envío
    // desde el dominio verificado llega. TODO: quitar cuando esté 100% confirmado.
    const OWNER_BACKUP = "alejonieva090@gmail.com";
    if (OWNER_BACKUP.toLowerCase() !== gestoraEmail.toLowerCase()) {
      const rB = await notifyEmail({
        to: OWNER_BACKUP,
        subject: `(respaldo) ${adminSubject}`,
        html: adminHtml,
      });
      if (rB.ok && !rB.skipped) {
        console.log(`[mp-webhook] email respaldo OK -> ${OWNER_BACKUP}`);
      } else if (!rB.skipped) {
        console.error(`[mp-webhook] email respaldo FALLÓ -> ${OWNER_BACKUP}:`, rB.error);
      }
    }

    // 6c) Email de confirmación al cliente.
    if (email) {
      const rc = await notifyEmail({
        to: email,
        subject: `Tu pago fue aprobado — Orden ${orderId}`,
        html: emailTemplate(orderId, monto),
      });
      if (rc.ok && !rc.skipped) {
        console.log(`[mp-webhook] email cliente OK -> ${email}`);
      } else if (!rc.skipped) {
        console.error(`[mp-webhook] email cliente FALLÓ -> ${email}:`, rc.error);
      }
    }
  } else {
    console.log(
      `[mp-webhook] evento ${orderId} status=${status} (prev=${previousStatus}) — sin notificar`
    );
  }

  return NextResponse.json({ ok: true, status, idempotent: !isNewlyApproved && status === "approved" });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

/**
 * Verifica la firma HMAC SHA-256 que MP manda en `x-signature`.
 *
 * Formato del header:
 *   ts=<timestamp>,v1=<hex_hash>
 *
 * Manifest a firmar:
 *   id:<data.id>;request-id:<x-request-id>;ts:<ts>;
 *
 * (Tomado de: developers MP → Webhooks → Validar el origen de la notificación)
 */
function verifyMpSignature(opts: {
  secret: string;
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string;
}): boolean {
  const { secret, xSignature, xRequestId, dataId } = opts;
  if (!xSignature || !dataId) return false;

  // Parse "ts=...,v1=..."
  const parts = Object.fromEntries(
    xSignature
      .split(",")
      .map((p) => p.trim().split("="))
      .filter((kv) => kv.length === 2)
  ) as Record<string, string>;

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${xRequestId ?? ""};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  // timingSafeEqual requiere mismo length
  if (expected.length !== v1.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(v1, "hex"));
  } catch {
    return false;
  }
}

/** Email interno para la gestoría con TODOS los datos del pedido pagado. */
function adminEmailTemplate(d: {
  servicio: string;
  nombre: string;
  patente: string;
  dni: string;
  telefono: string;
  email: string;
  monto: number;
  orderId: string;
}) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 0;color:#6B7280;font-size:13px;width:110px">${k}</td><td style="padding:6px 0;font-weight:700;color:#0B1F3A;font-size:14px">${v || "—"}</td></tr>`;
  return `<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#F5F7FA;padding:24px;color:#0B1F3A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB">
    <div style="background:#0B7A2F;color:#fff;padding:18px 24px">
      <strong style="font-size:16px">✅ Nuevo pago aprobado</strong>
    </div>
    <div style="padding:24px">
      <p style="color:#374151;font-size:14px;margin:0 0 12px">Datos del cliente para emitir el informe:</p>
      <table style="width:100%;border-collapse:collapse">
        ${row("Servicio", d.servicio)}
        ${row("Nombre", d.nombre)}
        ${row("Patente", d.patente)}
        ${row("DNI", d.dni)}
        ${row("Teléfono", d.telefono)}
        ${row("Email", d.email)}
        ${row("Monto", "$" + d.monto.toLocaleString("es-AR"))}
        ${row("Código", d.orderId)}
      </table>
    </div>
  </div>
</body></html>`;
}

function emailTemplate(orderId: string, amount: number) {
  return `<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#F5F7FA;padding:24px;color:#0B1F3A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB">
    <div style="background:#0B1F3A;color:#fff;padding:20px 24px">
      <strong style="font-size:16px">Gestoría Córdoba</strong>
      <div style="opacity:.8;font-size:12px">Informe de Dominio Automotor</div>
    </div>
    <div style="padding:24px">
      <h1 style="margin:0 0 8px;font-size:20px">¡Pago aprobado!</h1>
      <p style="color:#374151;font-size:14px;line-height:1.5">
        Recibimos tu pago correctamente. Estamos procesando tu Informe
        y te lo enviaremos a este mismo email en los próximos minutos.
      </p>
      <div style="margin-top:16px;padding:14px;border-radius:10px;background:#F2F6FF;border:1px solid #E8EFFE">
        <div style="font-size:11px;text-transform:uppercase;color:#6B7280">Orden</div>
        <div style="font-weight:700">${orderId}</div>
        <div style="font-size:11px;text-transform:uppercase;color:#6B7280;margin-top:6px">Monto</div>
        <div style="font-weight:700">$${amount.toLocaleString("es-AR")}</div>
      </div>
      <p style="color:#6B7280;font-size:12px;margin-top:18px">
        Si necesitás ayuda, escribinos por WhatsApp al +54 9 3515 72-4733.
      </p>
    </div>
  </div>
</body></html>`;
}
