type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Rate limit en memoria por IP/clave. Suficiente para una sola instancia.
 * En producción multi-instancia conviene mover a Upstash/Redis.
 */
export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000
): { ok: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetIn: windowMs };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, remaining: 0, resetIn: bucket.resetAt - now };
  }
  return { ok: true, remaining: limit - bucket.count, resetIn: bucket.resetAt - now };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "anon";
}
