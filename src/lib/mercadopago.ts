import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

export function getMpClient(): MercadoPagoConfig {
  if (_client) return _client;
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) throw new Error("Falta MP_ACCESS_TOKEN");
  _client = new MercadoPagoConfig({
    accessToken: token,
    options: { timeout: 8000, idempotencyKey: undefined },
  });
  return _client;
}

export function getPreferenceClient(): Preference {
  return new Preference(getMpClient());
}

export function getPaymentClient(): Payment {
  return new Payment(getMpClient());
}

export const INFORME_PRICE_ARS = Number(process.env.INFORME_PRICE_ARS ?? 6900);
