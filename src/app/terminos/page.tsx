import Link from 'next/link'

export const metadata = {
  title: 'Términos de Uso | AgriVolt',
  description: 'Términos y condiciones de uso del sitio web de AgriVolt.',
}

export default function TerminosPage() {
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
          <h1 className="text-4xl font-bold font-display text-slate-900 mb-4">Términos de Uso</h1>
          <p className="text-lg text-slate-600">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso.</p>

          <h2>2. Uso del Sitio</h2>
          <p>Este sitio web está destinado únicamente para fines informativos y comerciales relacionados con productos y servicios de AgriVolt.</p>

          <h2>3. Propiedad Intelectual</h2>
          <p>Todo el contenido de este sitio web, incluyendo textos, imágenes, logos y diseño, es propiedad de AgriVolt y está protegido por las leyes de propiedad intelectual.</p>

          <h2>4. Privacidad</h2>
          <p>Su privacidad es importante para nosotros. Consulte nuestra <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link> para más información.</p>

          <h2>5. Limitación de Responsabilidad</h2>
          <p>AgriVolt no se hace responsable por daños directos, indirectos, incidentales o consecuentes que puedan resultar del uso de este sitio web.</p>

          <h2>6. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.</p>

          <h2>7. Contacto</h2>
          <p>Si tiene alguna pregunta sobre estos términos, puede contactarnos en:</p>
          <ul>
            <li>Email: ventas@agrivoltdrone.com</li>
            <li>Teléfono: +52 449 448 0012</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
