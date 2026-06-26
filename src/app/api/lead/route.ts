import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateOrderId } from "@/lib/utils";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Endpoint para guardar leads sin pasar por el checkout
 * (por ej. carrito abandonado, retargeting, etc.).
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`lead:${ip}`, 6, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes" },
      { status: 429 }
    );
  }

  let parsed;
  try {
    parsed = leadSchema.safeParse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos" },
      { status: 400 }
    );
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: false, error: "Spam detectado" }, { status: 400 });
  }

  const orderId = generateOrderId();
  try {
    const supa = getSupabaseAdmin();
    const { error } = await supa.from("leads").insert({
      order_id: orderId,
      nombre: parsed.data.nombre,
      patente: parsed.data.patente,
      dni: parsed.data.dni,
      email: parsed.data.email,
      telefono: parsed.data.telefono,
      amount: 0,
      status: "pending",
      source: "lead-form",
      user_agent: req.headers.get("user-agent") ?? null,
      ip,
    });
    if (error) throw error;
  } catch (e: any) {
    console.warn("[lead] supa error:", e?.message);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId });
}
