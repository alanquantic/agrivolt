import { NextResponse } from 'next/server'

// Configuración Odoo
const ODOO_CONFIG = {
  url: process.env.ODOO_URL || 'https://alpha-tauro.odoo.com',
  apiKey: process.env.ODOO_API_KEY,
  password: process.env.ODOO_PASSWORD,
  companyId: parseInt(process.env.ODOO_COMPANY_ID || '3'),
  database: process.env.ODOO_DATABASE || 'alpha-tauro',
  user: process.env.ODOO_USER || 'alan.avalos@alpha-tauro.com'
}

export async function GET() {
  console.log('🔍 Endpoint para obtener campos de crm.lead llamado')
  
  try {
    // Autenticación
    const authResponse = await fetch(`${ODOO_CONFIG.url}/web/session/authenticate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
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
        error: 'Error de autenticación',
        details: authData.error.data?.message || authData.error.message
      }, { status: 401 })
    }

    const cookies = authResponse.headers.get('set-cookie')

    // Obtener campos del modelo crm.lead
    const fieldsResponse = await fetch(`${ODOO_CONFIG.url}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': cookies || '',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'crm.lead',
          method: 'fields_get',
          args: [],
          kwargs: {}
        }
      })
    })

    const fieldsData = await fieldsResponse.json()
    
    if (fieldsData.error) {
      return NextResponse.json({
        ok: false,
        error: 'Error obteniendo campos',
        details: fieldsData.error.data?.message || fieldsData.error.message
      }, { status: 500 })
    }

    // Filtrar campos relacionados con email
    const emailFields = Object.entries(fieldsData.result)
      .filter(([fieldName, fieldInfo]) => 
        fieldName.toLowerCase().includes('email') || 
        fieldName.toLowerCase().includes('mail')
      )
      .map(([fieldName, fieldInfo]) => ({
        field: fieldName,
        type: (fieldInfo as Record<string, unknown>).type as string,
        string: (fieldInfo as Record<string, unknown>).string as string,
        required: (fieldInfo as Record<string, unknown>).required as boolean,
        readonly: (fieldInfo as Record<string, unknown>).readonly as boolean
      }))

    return NextResponse.json({
      ok: true,
      message: 'Campos de email encontrados en crm.lead',
      emailFields,
      allFields: Object.keys(fieldsData.result).sort(),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error obteniendo campos:', error)
    return NextResponse.json({
      ok: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
