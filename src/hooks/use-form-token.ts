import { useEffect, useRef, useState } from 'react'

// Fetch del token anti-spam con retry exponencial y refresh:
// - Al montar reintenta hasta 4 veces (1s, 2s, 4s, 8s).
// - Refresca cada 45 min (bajo el MAX_AGE de 2h del servidor).
// - Re-intenta cuando la pestaña vuelve a estar visible tras estar oculta.

const REFRESH_MS = 45 * 60 * 1000
const MAX_RETRIES = 4

export function useFormToken(endpoint = '/api/form-token'): string {
  const [token, setToken] = useState('')
  const attemptRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    let refreshTimer: ReturnType<typeof setTimeout> | undefined

    const fetchToken = async (): Promise<void> => {
      try {
        const res = await fetch(endpoint, { credentials: 'same-origin' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        if (data?.token) {
          setToken(String(data.token))
          attemptRef.current = 0
          refreshTimer = setTimeout(fetchToken, REFRESH_MS)
        } else {
          throw new Error('respuesta sin token')
        }
      } catch {
        if (cancelled) return
        attemptRef.current += 1
        if (attemptRef.current <= MAX_RETRIES) {
          const delay = Math.min(1000 * 2 ** (attemptRef.current - 1), 8000)
          refreshTimer = setTimeout(fetchToken, delay)
        }
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !token) {
        attemptRef.current = 0
        fetchToken()
      }
    }

    fetchToken()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      if (refreshTimer) clearTimeout(refreshTimer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  return token
}
