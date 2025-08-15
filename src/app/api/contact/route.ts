import { NextRequest, NextResponse } from 'next/server'

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'mailer.ceosnew.media'
const TO_EMAIL = process.env.TO_EMAIL || 'alan@ceosnm.com'

if (!MAILGUN_API_KEY) {
  throw new Error('MAILGUN_API_KEY no está configurada')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos requeridos
    const requiredFields = ['nombre', 'email', 'telefono', 'pais', 'necesidad', 'cultivo', 'superficie', 'contacto']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        )
      }
    }

    // Preparar contenido del email
    const emailContent = `
Nueva solicitud de cotización AgriVolt

DATOS DE CONTACTO:
- Nombre: ${body.nombre}
- Email: ${body.email}
- Teléfono: ${body.telefono}
- País: ${body.pais}
- Estado: ${body.estado || 'No especificado'}

REQUERIMIENTOS:
- Necesidad principal: ${body.necesidad}
- Tipo de cultivo: ${body.cultivo}
- Superficie: ${body.superficie}
- Preferencia de contacto: ${body.contacto}

${body.terreno || body.frecuencia || body.ventana || body.modulos?.length || body.presupuesto || body.mensaje ? `
DETALLES ADICIONALES:
${body.terreno ? `- Terreno: ${body.terreno}` : ''}
${body.frecuencia ? `- Frecuencia: ${body.frecuencia}` : ''}
${body.ventana ? `- Ventana de compra: ${body.ventana}` : ''}
${body.modulos?.length ? `- Módulos de interés: ${body.modulos.join(', ')}` : ''}
${body.presupuesto ? `- Presupuesto: ${body.presupuesto}` : ''}
${body.mensaje ? `- Mensaje: ${body.mensaje}` : ''}
` : ''}

Fecha: ${new Date().toLocaleDateString('es-MX')}
Hora: ${new Date().toLocaleTimeString('es-MX')}
IP: ${request.headers.get('x-forwarded-for') || 'No disponible'}
    `.trim()

    // Preparar datos para Mailgun
    const formData = new URLSearchParams()
    formData.append('from', `AgriVolt Web <noreply@${MAILGUN_DOMAIN}>`)
    formData.append('to', TO_EMAIL)
    formData.append('subject', `Nueva cotización AgriVolt - ${body.nombre}`)
    formData.append('text', emailContent)
    formData.append('h:Reply-To', body.email)

    // Enviar email via Mailgun
    const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Mailgun error:', errorText)
      throw new Error(`Error en Mailgun: ${response.status}`)
    }

    // Email de confirmación al cliente
    const confirmationContent = `
Hola ${body.nombre},

Gracias por tu interés en AgriVolt. Hemos recibido tu solicitud de cotización y nos pondremos en contacto contigo en menos de 24 horas hábiles.

Resumen de tu solicitud:
- Necesidad: ${body.necesidad}
- Cultivo: ${body.cultivo}
- Superficie: ${body.superficie}

Si tienes alguna pregunta urgente, puedes contactarnos directamente a:
- Email: ventas@agrivolt.mx
- WhatsApp: +52 [número]

Saludos,
Equipo AgriVolt
    `.trim()

    const confirmationFormData = new URLSearchParams()
    confirmationFormData.append('from', `AgriVolt <noreply@${MAILGUN_DOMAIN}>`)
    confirmationFormData.append('to', body.email)
    confirmationFormData.append('subject', 'Confirmación - Solicitud de cotización AgriVolt')
    confirmationFormData.append('text', confirmationContent)

    await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: confirmationFormData.toString(),
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error procesando formulario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
