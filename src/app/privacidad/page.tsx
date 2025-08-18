import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidad | AgriVolt',
  description: 'Política de privacidad y protección de datos personales de AgriVolt.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 text-primary hover:opacity-80 transition-opacity mb-8">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-5 w-5">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold font-display text-slate-900 mb-4">Política de Privacidad</h1>
          <p className="text-lg text-slate-600">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Información que Recopilamos</h2>
          <p>Recopilamos información que usted nos proporciona directamente, como cuando completa formularios de contacto o solicita cotizaciones.</p>

          <h2>2. Uso de la Información</h2>
          <p>Utilizamos su información para:</p>
          <ul>
            <li>Responder a sus consultas y solicitudes</li>
            <li>Proporcionar cotizaciones y propuestas</li>
            <li>Enviar información sobre nuestros productos y servicios</li>
            <li>Mejorar nuestros servicios</li>
          </ul>

          <h2>3. Protección de Datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>

          <h2>4. Compartir Información</h2>
          <p>No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.</p>

          <h2>5. Cookies y Tecnologías Similares</h2>
          <p>Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web y analizar el tráfico.</p>

          <h2>6. Sus Derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul>
            <li>Acceder a su información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
          </ul>

          <h2>7. Cambios a esta Política</h2>
          <p>Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cualquier cambio significativo.</p>

          <h2>8. Contacto</h2>
          <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:</p>
          <ul>
            <li>Email: ventas@agrivoltdrone.com</li>
            <li>Teléfono: +52 449 448 0012</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
