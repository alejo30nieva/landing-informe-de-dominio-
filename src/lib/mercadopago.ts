import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

export function getMpClient(): MercadoPagoConfig {
  if (_client) return _client;
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) throw new Error("Falta MP_ACCESS_TOKEN");
  _client = new MercadoPagoConfig({
    accessToken: token,
    options: { timeout: 10_000 },
  });
  return _client;
}

export function getPreferenceClient(): Preference {
  return new Preference(getMpClient());
}

export function getPaymentClient(): Payment {
  return new Payment(getMpClient());
}

/** Indica si MP está configurado (token presente). Útil para fallback UI. */
export function isMpConfigured(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

/** Detecta si el token es de test (sandbox). */
export function isMpInTestMode(): boolean {
  const tok = process.env.MP_ACCESS_TOKEN ?? "";
  return tok.startsWith("TEST-") || tok.includes("TEST_");
}

export const INFORME_PRICE_ARS = Number(process.env.INFORME_PRICE_ARS ?? 9900);
