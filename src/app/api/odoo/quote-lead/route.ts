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
    console.log('🔐 Intentando autenticación con Odoo...')
    console.log('📡 URL:', `${ODOO_CONFIG.url}/web/session/authenticate`)
    console.log('👤 Usuario:', ODOO_CONFIG.user)
    console.log('🗄️ Base de datos:', ODOO_CONFIG.database)
    
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

    console.log('📥 Status de autenticación:', authResponse.status)
    console.log('📥 Headers:', Object.fromEntries(authResponse.headers.entries()))

    const authData = await authResponse.json()
    console.log('📥 Respuesta de autenticación:', JSON.stringify(authData, null, 2))
    
    if (authData.error) {
      throw new Error(`Error de autenticación: ${authData.error.data?.message || authData.error.message}`)
    }

    // Extraer cookies de la respuesta
    const cookies = authResponse.headers.get('set-cookie')
    console.log('🍪 Cookies recibidas:', cookies)
    
    return {
      ...authData.result,
      cookies: cookies
    }
  } catch (error) {
    console.error('❌ Error autenticando con Odoo:', error)
    throw error
  }
}

// Función para crear leads en Odoo
async function createOdooLead(leadData: Record<string, unknown>) {
  try {
    console.log('🚀 Iniciando creación de lead de cotización en Odoo...')
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
          email_from: leadData.email || leadData.email_from, // ✅ Campo correcto para Odoo
          phone: leadData.phone || '',
          description: leadData.description || '',
          company_id: ODOO_CONFIG.companyId,
          stage_id: 1, // ID de la etapa "Nuevo"
          type: 'lead',
          source_id: false,
          user_id: false,
          team_id: false
        }],
        kwargs: {}
      }
    }

    console.log('📤 Payload para crear lead de cotización:', JSON.stringify(leadPayload, null, 2))
    console.log('🍪 Cookies para la petición:', auth.cookies)

    const response = await fetch(`${ODOO_CONFIG.url}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': auth.cookies || '',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(leadPayload)
    })

    console.log('📥 Status de creación de lead de cotización:', response.status)
    console.log('📥 Headers de respuesta:', Object.fromEntries(response.headers.entries()))

    const result = await response.json()
    console.log('📥 Respuesta de creación de lead de cotización:', JSON.stringify(result, null, 2))
    
    if (result.error) {
      throw new Error(`Error creando lead: ${result.error.data?.message || result.error.message}`)
    }

    console.log('✅ Lead de cotización creado exitosamente con ID:', result.result)
    return result.result
  } catch (error) {
    console.error('❌ Error creando lead de cotización en Odoo:', error)
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
- Paquetes: ${(configuration.packages || []).join(', ') || 'N/A'}
- Cultivo: ${configuration.cultivo || 'N/A'}
- Superficie: ${configuration.superficie || 'N/A'}
- Terreno: ${configuration.terreno || 'N/A'}
- Frecuencia: ${configuration.frecuencia || 'N/A'}
- Ventana: ${configuration.ventana || 'N/A'}
- Presupuesto: ${configuration.presupuesto || 'N/A'}
- Mensaje: ${configuration.mensaje || 'N/A'}

Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
    `.trim()

    const leadData = {
      name: `Cotización ${customer.type} - ${customer.name}`,
      contact_name: customer.name,
      email: customer.email, // ✅ Campo para el payload interno
      phone: customer.phone,
      description
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
