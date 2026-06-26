import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order?id=GC-DOM-XXXX
 * Devuelve los datos del pedido (lead) para armar el mensaje de WhatsApp
 * personalizado en la pantalla de éxito. Solo campos de display, sin IP/UA.
 * Si Supabase no está configurado o no se encuentra, devuelve ok:false.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Falta id" }, { status: 400 });
  }

  try {
    const supa = getSupabaseAdmin();
    const { data, error } = await supa
      .from("leads")
      .select(
        "order_id, service_slug, service_title, nombre, patente, dni, email, telefono, amount, status"
      )
      .eq("order_id", id)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ ok: false, error: "No encontrado" });
    }

    return NextResponse.json({ ok: true, order: data });
  } catch (e) {
    // Supabase no configurado u otro error: el success usa el fallback.
    return NextResponse.json({ ok: false, error: "no_db" });
  }
}
