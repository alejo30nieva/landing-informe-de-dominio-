import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Informe de Dominio Automotor — Gestoría Córdoba";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B1F3A 0%, #0E2A52 60%, #1246D6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1246D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            ✓
          </div>
          Gestoría Córdoba
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          Informe de Dominio
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#3B73EE" }}>
          Automotor
        </div>
        <div style={{ fontSize: 32, opacity: 0.85, marginTop: 28, maxWidth: 900 }}>
          Verificá cualquier vehículo antes de comprar · 100% online · Entrega en
          minutos
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
            fontSize: 24,
          }}
        >
          {["Toda Argentina", "Pago seguro", "Atención por WhatsApp"].map((t) => (
            <div
              key={t}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
