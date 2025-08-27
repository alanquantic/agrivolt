import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🔍 Endpoint de debug Odoo llamado')
  
  const envVars = {
    ODOO_URL: process.env.ODOO_URL,
    ODOO_API_KEY: process.env.ODOO_API_KEY ? '***CONFIGURADO***' : 'NO CONFIGURADO',
    ODOO_PASSWORD: process.env.ODOO_PASSWORD ? '***CONFIGURADO***' : 'NO CONFIGURADO',
    ODOO_COMPANY_ID: process.env.ODOO_COMPANY_ID,
    ODOO_DATABASE: process.env.ODOO_DATABASE,
    ODOO_USER: process.env.ODOO_USER
  }

  console.log('🔍 Variables de entorno:', envVars)

  const missingVars = Object.entries(envVars)
    .filter(([, value]) => !value || value === 'NO CONFIGURADO')
    .map(([key]) => key)

  return NextResponse.json({
    ok: missingVars.length === 0,
    message: missingVars.length === 0 ? 'Todas las variables están configuradas' : 'Faltan variables de entorno',
    missing: missingVars,
    config: {
      url: process.env.ODOO_URL,
      database: process.env.ODOO_DATABASE,
      user: process.env.ODOO_USER,
      companyId: process.env.ODOO_COMPANY_ID
    },
    timestamp: new Date().toISOString()
  })
}
