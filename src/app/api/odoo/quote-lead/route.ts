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

// Función de autenticación con Odoo
async function authenticateOdoo() {
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
      throw new Error(`Error de autenticación: ${authData.error.data?.message || authData.error.message}`)
    }

    const cookies = authResponse.headers.get('set-cookie')
    
    return {
      ...authData.result,
      cookies: cookies
    }
  } catch (error) {
    console.error('Error autenticando con Odoo:', error)
    throw error
  }
}

// Función para crear leads en Odoo
async function createOdooLead(leadData: Record<string, unknown>) {
  try {
    const auth = await authenticateOdoo()
    
    const leadPayload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        model: 'crm.lead',
        method: 'create',
        args: [{
          name: leadData.name || 'Cotización AgriVolt',
          contact_name: leadData.contact_name,
          email_from: leadData.email,
          phone: leadData.phone || '',
          description: leadData.description || '',
          company_id: ODOO_CONFIG.companyId,
          stage_id: 1, // ID de la etapa "Nuevo"
          type: 'lead',
          source_id: false,
          user_id: false,
          team_id: false,
          ...(leadData.additional_fields as Record<string, unknown>)
        }],
        kwargs: {}
      }
    }

    const response = await fetch(`${ODOO_CONFIG.url}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': auth.cookies || '',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(leadPayload)
    })

    const result = await response.json()
    
    if (result.error) {
      throw new Error(`Error creando lead: ${result.error.data?.message || result.error.message}`)
    }

    return result.result
  } catch (error) {
    console.error('Error creando lead en Odoo:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  console.log('📥 Recibida solicitud para crear lead de cotización en Odoo')
  
  try {
    // Validar variables de entorno
    if (!ODOO_CONFIG.apiKey || !ODOO_CONFIG.password) {
      console.error('❌ Variables de entorno de Odoo no configuradas')
      return NextResponse.json({ 
        ok: false, 
        error: 'Configuración de Odoo incompleta' 
      }, { status: 500 })
    }

    const body = await request.json()
    const { customer = {}, configuration = {} } = body
    
    const required = ['name', 'email', 'phone']
    const missing = required.filter(k => !String(customer[k] || '').trim())
    if (missing.length) {
      console.log('❌ Validación fallida: campos faltantes:', missing)
      return NextResponse.json({ 
        ok: false, 
        error: `Faltan campos: ${missing.join(', ')}` 
      }, { status: 400 })
    }

    const description = `
Solicitud de cotización de drone desde AgriVolt:

DATOS DEL CLIENTE:
- Nombre: ${customer.name}
- Email: ${customer.email}
- Teléfono: ${customer.phone}
- Intención: ${customer.type || 'N/A'}
- Unidades: ${customer.units || 'N/A'}
- Ciudad: ${customer.city || 'N/A'}
- País: ${customer.country || 'N/A'}

CONFIGURACIÓN DEL DRONE:
- Modelo: ${configuration.model || 'N/A'}
- Versión: ${configuration.version || 'N/A'}
- Color: ${configuration.color || 'N/A'}
- Color de Asientos: ${configuration.seats || 'N/A'}
- Techo: ${configuration.roof || 'N/A'}
- Paquetes: ${(configuration.packages || []).join(', ') || 'N/A'}
- Accesorios: ${(configuration.selectedAccessories || []).join(', ') || 'N/A'}

Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
    `.trim()

    const leadData = {
      name: `Cotización ${customer.type} - ${customer.name}`,
      contact_name: customer.name,
      email_from: customer.email,
      phone: customer.phone,
      description,
      additional_fields: {
        source_id: false,
        email: customer.email
      }
    }

    console.log('📤 Enviando datos de cotización a Odoo:', leadData)
    const leadId = await createOdooLead(leadData)
    console.log('✅ Lead de cotización creado exitosamente en Odoo con ID:', leadId)

    return NextResponse.json({ 
      ok: true, 
      lead_id: leadId,
      message: 'Lead de cotización creado exitosamente en Odoo CRM'
    })

  } catch (error) {
    console.error('❌ Error en endpoint /api/odoo/quote-lead:', error)
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Error interno del servidor' 
    }, { status: 500 })
  }
}
