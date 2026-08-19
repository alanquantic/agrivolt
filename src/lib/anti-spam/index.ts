// Orquestador de las capas anti-spam. Ejecutar al inicio del handler.
// Retorna `{ ok: true }` si el envío parece humano, o `{ ok: false, reason }`
// si debe rechazarse SILENCIOSAMENTE (200/201 con cuerpo de éxito, sin lanzar
// error al cliente para no dar señal al bot).

import { verifyFormToken } from './form-token'
import { checkText, checkEmail, checkPhone, checkFreeText } from './spam-validation'
import { rateLimit } from './rate-limit'

export const HONEYPOT_FIELD = 'company_website'
export const TOKEN_FIELD = 'form_token'

export type AntiSpamResult = { ok: true } | { ok: false; reason: string }

export type AntiSpamInput = {
  body: Record<string, unknown>
  // Nombres de campos a validar. Solo se valida lo que exista en `body`.
  fields: {
    name?: string
    company?: string
    email?: string
    phone?: string
    message?: string
  }
  // Clave para rate limit (típicamente email). Opcional.
  rateLimitKey?: string
}

export function runAntiSpamChecks(input: AntiSpamInput): AntiSpamResult {
  const { body, fields, rateLimitKey } = input

  // Capa 1 — Honeypot.
  const hp = body[HONEYPOT_FIELD]
  if (hp != null && String(hp).trim() !== '') {
    return { ok: false, reason: 'honeypot lleno' }
  }

  // Capa 2 — Token de tiempo firmado.
  const tokenResult = verifyFormToken(body[TOKEN_FIELD])
  if (!tokenResult.valid) {
    return { ok: false, reason: `token: ${tokenResult.reason}` }
  }

  // Capa 3 — Validación de texto.
  if (fields.name && typeof body[fields.name] === 'string') {
    const r = checkText('nombre', body[fields.name] as string, { min: 3, max: 120 })
    if (r) return { ok: false, reason: r }
  }
  if (fields.company && typeof body[fields.company] === 'string') {
    const r = checkText('empresa', body[fields.company] as string, { min: 4, max: 200 })
    if (r) return { ok: false, reason: r }
  }
  if (fields.email && typeof body[fields.email] === 'string') {
    const r = checkEmail(body[fields.email] as string)
    if (r) return { ok: false, reason: r }
  }
  if (fields.phone && typeof body[fields.phone] === 'string') {
    const r = checkPhone(body[fields.phone] as string)
    if (r) return { ok: false, reason: r }
  }
  if (fields.message && typeof body[fields.message] === 'string') {
    const r = checkFreeText(body[fields.message] as string)
    if (r) return { ok: false, reason: r }
  }

  // Capa 5 — Rate limit (best-effort).
  const rl = rateLimit(rateLimitKey)
  if (!rl.allowed) {
    return { ok: false, reason: `rate limit (${rl.count} en ventana)` }
  }

  return { ok: true }
}

// Helper para el patrón de "rechazo silencioso" — llama esto y devuelve.
export function logAndFakeSuccess(reason: string, tag = 'anti-spam'): void {
  console.warn(`[${tag}] Descartado: ${reason}`)
}
