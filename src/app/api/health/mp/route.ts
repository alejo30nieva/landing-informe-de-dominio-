import { NextRequest, NextResponse } from "next/server";
import { getPreferenceClient, isMpConfigured, isMpInTestMode } from "@/lib/mercadopago";
import { cleanBaseUrl, cleanEnv } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Health check de la integración con Mercado Pago.
 *
 * GET /api/health/mp
 *  -> Verifica si MP_ACCESS_TOKEN está seteado y si el token funciona
 *     (crea una preferencia de prueba con monto $10 y la borra del response).
 *
 * Para ejecutar manualmente en producción agregá ?key=<MP_HEALTH_KEY>
 * (cualquier valor que coincida con la env). Si la env no existe el endpoint
 * queda abierto (útil para chequeo desde Vercel deploy).
 */
export async function GET(req: NextRequest) {
  const expectedKey = process.env.MP_HEALTH_KEY;
  const providedKey = req.nextUrl.searchParams.get("key");
  if (expectedKey && providedKey !== expectedKey) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const baseUrl = cleanBaseUrl(process.env.NEXT_PUBLIC_BASE_URL);
  const checks: Record<string, any> = {
    mpConfigured: isMpConfigured(),
    testMode: isMpInTestMode(),
    publicBaseUrl: baseUrl || null,
    publicBaseUrlValid: baseUrl.startsWith("https://"),
    webhookSignatureSecretSet: Boolean(cleanEnv(process.env.MP_WEBHOOK_SECRET)),
    supabaseSet: Boolean(
      cleanEnv(process.env.SUPABASE_URL) &&
        cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)
    ),
    // Notificación automática al aprobarse el pago
    notificaciones: {
      resendSet: Boolean(cleanEnv(process.env.RESEND_API_KEY)),
      resendFrom: cleanEnv(process.env.RESEND_FROM) || "(default onboarding@resend.dev)",
      resendOwnerEmail: cleanEnv(process.env.RESEND_OWNER_EMAIL) || null,
      adminEmailSet: Boolean(cleanEnv(process.env.ADMIN_EMAIL)),
      adminEmail: cleanEnv(process.env.ADMIN_EMAIL) || null,
      whatsappCloudSet: Boolean(
        cleanEnv(process.env.WHATSAPP_TOKEN) &&
          cleanEnv(process.env.WHATSAPP_PHONE_ID)
      ),
      googleSheetsSet: Boolean(cleanEnv(process.env.GOOGLE_SHEETS_WEBHOOK_URL)),
    },
    bank: {
      titularSet: Boolean(cleanEnv(process.env.BANK_TITULAR)),
      aliasSet: Boolean(cleanEnv(process.env.BANK_ALIAS)),
      cbuSet: Boolean(cleanEnv(process.env.BANK_CBU)),
      // detectamos placeholders sin limpiar
      hasPlaceholders: [
        process.env.BANK_TITULAR,
        process.env.BANK_ALIAS,
        process.env.BANK_CBU,
      ].some((v) => v && /[<>\[\]]/.test(v)),
    },
  };

  if (!checks.mpConfigured) {
    return NextResponse.json({
      ok: false,
      error: "MP_ACCESS_TOKEN no configurado",
      checks,
    });
  }

  // Probar creación de preferencia ($10 ARS para no gastar nada)
  try {
    const pref = getPreferenceClient();
    const test = await pref.create({
      body: {
        items: [
          {
            id: "healthcheck",
            title: "Healthcheck",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 10,
          },
        ],
        external_reference: "HEALTHCHECK",
      },
    });
    checks.preferenceCreated = Boolean(test.id);
    checks.preferenceId = test.id;
    checks.initPoint = test.init_point;
    checks.sandboxInitPoint = test.sandbox_init_point ?? null;
    return NextResponse.json({ ok: true, checks });
  } catch (e: any) {
    const mpData =
      e?.cause?.response?.data ??
      e?.response?.data ??
      e?.cause?.data ??
      e?.cause?.error ??
      null;
    return NextResponse.json(
      {
        ok: false,
        error: e?.message ?? "mp_test_failed",
        mpStatus: e?.status ?? e?.cause?.status ?? null,
        mpData,
        checks,
      },
      { status: 500 }
    );
  }
}
