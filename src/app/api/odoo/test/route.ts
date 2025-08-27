import { NextRequest, NextResponse } from 'next/server'

// Configuración Odoo
const ODOO_CONFIG = {
  url: process.env.ODOO_URL || 'https://alpha-tauro.odoo.com',
  apiKey: process.env.ODOO_API_KEY,
  password: process.env.ODOO_PASSWORD,
  companyId: parseInt(process.env.ODOO_COMPANY_ID || '3'),
  database: process.env.ODOO_DATABASE || 'alpha-tauro',
  user: process.env.ODOO_USER || 'alan.avalos@alpha-tauro.com'
}

export async function GET(request: NextRequest) {
  console.log('🧪 Endpoint de prueba Odoo llamado')
  
  try {
    // Verificar variables de entorno
    const envCheck = {
      ODOO_URL: !!ODOO_CONFIG.url,
      ODOO_API_KEY: !!ODOO_CONFIG.apiKey,
      ODOO_PASSWORD: !!ODOO_CONFIG.password,
      ODOO_COMPANY_ID: !!ODOO_CONFIG.companyId,
      ODOO_DATABASE: !!ODOO_CONFIG.database,
      ODOO_USER: !!ODOO_CONFIG.user
    }

    const missingVars = Object.entries(envCheck)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key)

    if (missingVars.length > 0) {
      return NextResponse.json({
        ok: false,
        error: 'Variables de entorno faltantes',
        missing: missingVars,
        config: {
          url: ODOO_CONFIG.url,
          database: ODOO_CONFIG.database,
          user: ODOO_CONFIG.user,
          companyId: ODOO_CONFIG.companyId
        }
      }, { status: 500 })
    }

    // Intentar autenticación
    try {
      const authResponse = await fetch(`${ODOO_CONFIG.url}/web/session/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: ODOO_CONFIG.database,
            login: ODOO_CONFIG.user,
            password: ODOO_CONFIG.password
          }
        })
      })

      const authData = await authResponse.json()
      
      if (authData.error) {
        return NextResponse.json({
          ok: false,
          error: 'Error de autenticación con Odoo',
          details: authData.error.data?.message || authData.error.message,
          config: {
            url: ODOO_CONFIG.url,
            database: ODOO_CONFIG.database,
            user: ODOO_CONFIG.user
          }
        }, { status: 401 })
      }

      return NextResponse.json({
        ok: true,
        message: 'Conexión con Odoo exitosa',
        auth: {
          uid: authData.result.uid,
          user_context: authData.result.user_context,
          db: authData.result.db
        },
        config: {
          url: ODOO_CONFIG.url,
          database: ODOO_CONFIG.database,
          user: ODOO_CONFIG.user,
          companyId: ODOO_CONFIG.companyId
        },
        timestamp: new Date().toISOString()
      })

    } catch (authError) {
      return NextResponse.json({
        ok: false,
        error: 'Error conectando con Odoo',
        details: authError instanceof Error ? authError.message : 'Error desconocido',
        config: {
          url: ODOO_CONFIG.url,
          database: ODOO_CONFIG.database,
          user: ODOO_CONFIG.user
        }
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Error en endpoint de prueba Odoo:', error)
    return NextResponse.json({
      ok: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
