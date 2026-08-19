// Rate limit STOPGAP. En Vercel Functions (serverless) un `Map` en memoria
// NO se comparte entre invocaciones ni entre instancias: en frío arranca
// vacío, y una función escalada horizontalmente tiene N mapas distintos.
//
// Sirve como freno soft cuando la misma instancia recibe múltiples envíos
// consecutivos (por ejemplo, un bot reintentando en un burst). Para límites
// reales usa Vercel KV, Upstash Redis, o una tabla en Neon con TTL.

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 24 * 60 * 60 * 1000)
const MAX_HITS = Number(process.env.RATE_LIMIT_MAX_HITS ?? 3)

const hits = new Map<string, number[]>()

export function rateLimit(
  key: string | undefined | null
): { allowed: boolean; count?: number } {
  if (!key) return { allowed: true }
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent)
    return { allowed: false, count: recent.length }
  }
  recent.push(now)
  hits.set(key, recent)
  return { allowed: true, count: recent.length }
}
