import { NextRequest, NextResponse } from 'next/server'

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'mailer.ceosnew.media'
const TO_EMAIL = process.env.TO_EMAIL || 'alan@ceosnm.com'

export async function POST(request: NextRequest) {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!MAILGUN_API_KEY) {
      return NextResponse.json(
        { error: 'Configuración de email no disponible' },
        { status: 500 }
      )
    }

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

            ${body.terreno || body.frecuencia || body.ventana || (Array.isArray(body.modulos) && body.modulos.length > 0) || body.presupuesto || body.mensaje ? `
DETALLES ADICIONALES:
${body.terreno ? `- Terreno: ${body.terreno}` : ''}
${body.frecuencia ? `- Frecuencia: ${body.frecuencia}` : ''}
${body.ventana ? `- Ventana de compra: ${body.ventana}` : ''}
${Array.isArray(body.modulos) && body.modulos.length > 0 ? `- Módulos de interés: ${body.modulos.join(', ')}` : ''}
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
    formData.append('html', generateAdminEmailHTML(body, emailContent, request))
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
    confirmationFormData.append('html', generateCustomerEmailHTML(body, confirmationContent))
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

// Función para generar email HTML para el administrador
function generateAdminEmailHTML(body: Record<string, unknown>, textContent: string, request: NextRequest) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva cotización AgriVolt</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; }
        .header { background: linear-gradient(135deg, #2d39f1 0%, #1e3a8a 100%); padding: 30px; text-align: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #e0e7ff; font-size: 16px; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { color: #2d39f1; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #e0e7ff; padding-bottom: 5px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .highlight { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #2d39f1; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .cta-button { display: inline-block; background: #2d39f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚁 AgriVolt</div>
            <div class="subtitle">Nueva solicitud de cotización</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">📋 Datos de Contacto</div>
                <div class="field">
                    <span class="label">Nombre:</span>
                    <span class="value">${body.nombre}</span>
                </div>
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">${body.email}</span>
                </div>
                <div class="field">
                    <span class="label">Teléfono:</span>
                    <span class="value">${body.telefono}</span>
                </div>
                <div class="field">
                    <span class="label">País:</span>
                    <span class="value">${body.pais}</span>
                </div>
                <div class="field">
                    <span class="label">Estado:</span>
                    <span class="value">${body.estado || 'No especificado'}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">🎯 Requerimientos</div>
                <div class="field">
                    <span class="label">Necesidad principal:</span>
                    <span class="value">${body.necesidad}</span>
                </div>
                <div class="field">
                    <span class="label">Tipo de cultivo:</span>
                    <span class="value">${body.cultivo}</span>
                </div>
                <div class="field">
                    <span class="label">Superficie:</span>
                    <span class="value">${body.superficie}</span>
                </div>
                <div class="field">
                    <span class="label">Preferencia de contacto:</span>
                    <span class="value">${body.contacto}</span>
                </div>
            </div>

            ${body.terreno || body.frecuencia || body.ventana || (Array.isArray(body.modulos) && body.modulos.length > 0) || body.presupuesto || body.mensaje ? `
            <div class="section">
                <div class="section-title">📝 Detalles Adicionales</div>
                ${body.terreno ? `<div class="field"><span class="label">Terreno:</span> <span class="value">${body.terreno}</span></div>` : ''}
                ${body.frecuencia ? `<div class="field"><span class="label">Frecuencia:</span> <span class="value">${body.frecuencia}</span></div>` : ''}
                ${body.ventana ? `<div class="field"><span class="label">Ventana de compra:</span> <span class="value">${body.ventana}</span></div>` : ''}
                ${Array.isArray(body.modulos) && body.modulos.length > 0 ? `<div class="field"><span class="label">Módulos de interés:</span> <span class="value">${body.modulos.join(', ')}</span></div>` : ''}
                ${body.presupuesto ? `<div class="field"><span class="label">Presupuesto:</span> <span class="value">${body.presupuesto}</span></div>` : ''}
                ${body.mensaje ? `<div class="field"><span class="label">Mensaje:</span> <span class="value">${body.mensaje}</span></div>` : ''}
            </div>
            ` : ''}

            <div class="highlight">
                <strong>📅 Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}<br>
                <strong>🕐 Hora:</strong> ${new Date().toLocaleTimeString('es-MX')}<br>
                <strong>🌐 IP:</strong> ${request.headers.get('x-forwarded-for') || 'No disponible'}
            </div>

            <div style="text-align: center; margin-top: 25px;">
                <a href="mailto:${body.email}" class="cta-button">📧 Responder al cliente</a>
            </div>
        </div>

        <div class="footer">
            <p>🚁 AgriVolt - Drones agrícolas de precisión</p>
            <p>Este email fue generado automáticamente desde el formulario web</p>
        </div>
    </div>
</body>
</html>
  `
}

// Función para generar email HTML para el cliente
function generateCustomerEmailHTML(body: Record<string, unknown>, _textContent: string) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación - AgriVolt</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; }
        .header { background: linear-gradient(135deg, #2d39f1 0%, #1e3a8a 100%); padding: 30px; text-align: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #e0e7ff; font-size: 16px; }
        .content { padding: 30px; }
        .greeting { font-size: 20px; color: #2d39f1; margin-bottom: 20px; }
        .message { margin-bottom: 25px; }
        .summary { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2d39f1; margin: 25px 0; }
        .summary-title { color: #2d39f1; font-weight: bold; margin-bottom: 15px; }
        .contact-info { background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .contact-title { color: #1e3a8a; font-weight: bold; margin-bottom: 10px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .cta-button { display: inline-block; background: #2d39f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚁 AgriVolt</div>
            <div class="subtitle">Confirmación de solicitud</div>
        </div>
        
        <div class="content">
            <div class="greeting">¡Hola ${body.nombre}!</div>
            
            <div class="message">
                <p>Gracias por tu interés en <strong>AgriVolt</strong>. Hemos recibido tu solicitud de cotización y nos pondremos en contacto contigo en menos de <strong>24 horas hábiles</strong>.</p>
            </div>

            <div class="summary">
                <div class="summary-title">📋 Resumen de tu solicitud:</div>
                <div><strong>Necesidad:</strong> ${body.necesidad}</div>
                <div><strong>Cultivo:</strong> ${body.cultivo}</div>
                <div><strong>Superficie:</strong> ${body.superficie}</div>
            </div>

            <div class="contact-info">
                <div class="contact-title">📞 ¿Tienes alguna pregunta urgente?</div>
                <p>Puedes contactarnos directamente a:</p>
                <ul>
                    <li>📧 Email: <a href="mailto:ventas@agrivolt.mx">ventas@agrivolt.mx</a></li>
                    <li>📱 WhatsApp: +52 [número]</li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 25px;">
                <a href="https://agrivolt.mx" class="cta-button">🌐 Visitar nuestro sitio web</a>
            </div>
        </div>

        <div class="footer">
            <p>🚁 AgriVolt - Drones agrícolas de precisión</p>
            <p>Precisión, potencia y ahorro de insumos</p>
        </div>
    </div>
</body>
</html>
  `
}
