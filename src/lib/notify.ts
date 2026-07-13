/**
 * Notificaciones por WhatsApp / Email.
 * Stubs no-bloqueantes: si no hay configuración se omiten sin romper.
 *
 * - WhatsApp: usa la Cloud API de Meta (WHATSAPP_TOKEN + WHATSAPP_PHONE_ID).
 * - Email: stub. Reemplazar por Resend/Sendgrid según preferencia.
 */

export async function notifyWhatsApp(opts: {
  to: string;
  body: string;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return { ok: true, skipped: true };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: opts.to,
          type: "text",
          text: { body: opts.body },
        }),
      }
    );
    if (!res.ok) return { ok: false, error: `WA ${res.status}` };
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "wa_error" };
  }
}

export async function notifyEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  // Default SEGURO: onboarding@resend.dev es el único remitente que Resend
  // permite sin verificar dominio. Nunca cae a un dominio inexistente.
  const from =
    process.env.RESEND_FROM ?? "Gestoría Córdoba <onboarding@resend.dev>";
  if (!apiKey) return { ok: true, skipped: true };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      // Incluimos el cuerpo de la respuesta de Resend para ver el motivo real
      // (ej: 403 "You can only send testing emails to your own email address").
      let detail = "";
      try {
        detail = await res.text();
      } catch {}
      return { ok: false, error: `RESEND ${res.status} ${detail.slice(0, 400)}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "email_error" };
  }
}
