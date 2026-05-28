import { NextRequest, NextResponse } from "next/server";
import { getPaymentClient } from "@/lib/mercadopago";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyEmail, notifyWhatsApp } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook IPN/Webhooks de MercadoPago.
 * Acepta el formato nuevo (topic=payment, id=...) y el viejo (type=payment).
 */
export async function POST(req: NextRequest) {
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const url = req.nextUrl;
  const topic = body?.type ?? body?.topic ?? url.searchParams.get("topic");
  const id =
    body?.data?.id ??
    body?.id ??
    url.searchParams.get("id") ??
    url.searchParams.get("data.id");

  // MP retesta el webhook con HEAD/GET — devolvemos 200 sin procesar.
  if (!topic || topic !== "payment" || !id) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const payments = getPaymentClient();
    const payment = await payments.get({ id: String(id) });

    const orderId = (payment.external_reference as string) || "";
    const status = String(payment.status ?? "pending") as
      | "approved"
      | "pending"
      | "in_process"
      | "rejected"
      | "cancelled";

    // Persistir en Supabase
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
      console.warn("[webhook] supabase update fallido:", (e as Error).message);
    }

    // Notificaciones si quedó aprobado
    if (status === "approved") {
      const email = (payment.payer as any)?.email as string | undefined;
      if (email) {
        await notifyEmail({
          to: email,
          subject: `Tu pago fue aprobado — Orden ${orderId}`,
          html: emailTemplate(orderId, payment.transaction_amount ?? 0),
        });
      }
      const adminPhone = process.env.ADMIN_WHATSAPP_PHONE;
      if (adminPhone) {
        await notifyWhatsApp({
          to: adminPhone,
          body: `✅ Pago aprobado\nOrden: ${orderId}\nMonto: $${payment.transaction_amount}\nEmail: ${email}`,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[webhook] error:", e?.message);
    // Devolvemos 200 para que MP no reintente indefinidamente si el error es nuestro.
    return NextResponse.json({ ok: false, error: e?.message ?? "error" });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
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
        Recibimos tu pago correctamente. Estamos procesando tu Informe de Dominio
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
