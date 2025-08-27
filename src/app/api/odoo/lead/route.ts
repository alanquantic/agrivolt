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
          name: leadData.name || 'Lead desde AgriVolt',
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
  console.log('📥 Recibida solicitud para crear lead en Odoo')
  
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
    const { 
      name, 
      email, 
      phone, 
      contact_name, 
      description, 
      additional_fields = {} 
    } = body

    if (!email || !contact_name) {
      console.log('❌ Validación fallida: email o contact_name faltantes')
      return NextResponse.json({ 
        ok: false, 
        error: 'Email y nombre de contacto son requeridos' 
      }, { status: 400 })
    }

    const leadData = {
      name: name || `Lead de ${contact_name}`,
      contact_name,
      email_from: email,
      phone: phone || '',
      description: description || '',
      additional_fields: {
        ...additional_fields,
        source_id: false,
        email: email
      }
    }

    console.log('📤 Enviando datos a Odoo:', leadData)
    const leadId = await createOdooLead(leadData)
    console.log('✅ Lead creado exitosamente en Odoo con ID:', leadId)

    return NextResponse.json({ 
      ok: true, 
      lead_id: leadId,
      message: 'Lead creado exitosamente en Odoo CRM'
    })

  } catch (error) {
    console.error('❌ Error en endpoint /api/odoo/lead:', error)
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Error interno del servidor' 
    }, { status: 500 })
  }
}
