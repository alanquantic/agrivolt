import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🧪 Endpoint de prueba simple Odoo llamado')
  
  const envVars = {
    ODOO_URL: process.env.ODOO_URL,
    ODOO_API_KEY: process.env.ODOO_API_KEY ? 'CONFIGURADO' : 'NO CONFIGURADO',
    ODOO_PASSWORD: process.env.ODOO_PASSWORD ? 'CONFIGURADO' : 'NO CONFIGURADO',
    ODOO_COMPANY_ID: process.env.ODOO_COMPANY_ID,
    ODOO_DATABASE: process.env.ODOO_DATABASE,
    ODOO_USER: process.env.ODOO_USER
  }

  return NextResponse.json({
    ok: true,
    message: 'Endpoint de prueba simple funcionando',
    envVars,
    timestamp: new Date().toISOString()
  })
}
