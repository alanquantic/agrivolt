import crypto from 'node:crypto'

// Token de tiempo firmado (HMAC-SHA256): `${ts}.${sig}`
//
// Verificación de dos secretos: FORM_SECRET (actual) + FORM_SECRET_PREVIOUS
// (durante rotación). Al rotar, mueve el valor viejo a FORM_SECRET_PREVIOUS
// durante MAX_AGE_MS (2 h) para no invalidar tokens ya emitidos.

const FORM_SECRET = process.env.FORM_SECRET || ''
const FORM_SECRET_PREVIOUS = process.env.FORM_SECRET_PREVIOUS || ''

const MIN_AGE_MS = Number(process.env.FORM_MIN_AGE_MS ?? 3_000)
const MAX_AGE_MS = Number(process.env.FORM_MAX_AGE_MS ?? 2 * 60 * 60 * 1000)

const IS_PROD = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'

let missingSecretWarned = false
function warnMissingSecret(where: 'issue' | 'verify') {
  if (missingSecretWarned) return
  missingSecretWarned = true
  const msg =
    `[anti-spam] FORM_SECRET no configurado (${where}). ` +
    (IS_PROD
      ? 'PRODUCCIÓN sin firma de token — capa 2 desactivada. Genera y define FORM_SECRET YA.'
      : 'Modo desarrollo — capa 2 desactivada.')
  if (IS_PROD) console.error(msg)
  else console.warn(msg)
}

function sign(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export function issueFormToken(): string {
  const ts = Date.now()
  if (!FORM_SECRET) {
    warnMissingSecret('issue')
    return `${ts}.unsigned`
  }
  return `${ts}.${sign(String(ts), FORM_SECRET)}`
}

export type VerifyResult = { valid: true } | { valid: false; reason: string }

export function verifyFormToken(token: unknown): VerifyResult {
  if (!FORM_SECRET) {
    warnMissingSecret('verify')
    return { valid: true }
  }
  if (typeof token !== 'string' || !token.includes('.')) {
    return { valid: false, reason: 'token ausente o malformado' }
  }
  const [tsStr, sig] = token.split('.')
  const ts = Number(tsStr)
  if (!Number.isFinite(ts) || !sig) {
    return { valid: false, reason: 'malformado' }
  }

  const secrets = [FORM_SECRET, FORM_SECRET_PREVIOUS].filter(Boolean)
  const sigBuf = safeBufferFromHex(sig)
  if (!sigBuf) return { valid: false, reason: 'firma no-hex' }

  const matches = secrets.some((s) => {
    const expected = safeBufferFromHex(sign(tsStr, s))
    return (
      expected && sigBuf.length === expected.length && crypto.timingSafeEqual(sigBuf, expected)
    )
  })
  if (!matches) return { valid: false, reason: 'firma inválida' }

  const age = Date.now() - ts
  if (age < MIN_AGE_MS) return { valid: false, reason: `demasiado rápido (${age}ms)` }
  if (age > MAX_AGE_MS) return { valid: false, reason: 'token vencido' }
  return { valid: true }
}

function safeBufferFromHex(hex: string): Buffer | null {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) return null
  return Buffer.from(hex, 'hex')
}
