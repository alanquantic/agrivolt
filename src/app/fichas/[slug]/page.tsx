import { notFound } from 'next/navigation'
import Link from 'next/link'
import PrintButton from '@/components/PrintButton'
import modelosData from '../../../../data/modelos.json'

type Especificaciones = {
  tanque_spray?: string
  flujo_max?: string
  tamano_gota?: string
  esparcido?: string
  izaje?: string
  percepcion?: string
  fpv?: string
  velocidad_max?: string
  proteccion?: string
  peso_con_bateria?: string
  mtow?: string
  dimensiones_operacion?: string
  dimensiones_plegado?: string
  autonomia?: string
  radio_vuelo?: string
  ancho_pulverizacion?: string
  carga_util_max?: string
  [key: string]: string | undefined
}

type Modelo = {
  id: string
  nombre: string
  claim: string
  descripcion: string
  img: string
  sku: string
  slug: string
  precio_desde: string
  bullets: string[]
  especificaciones: Especificaciones
  usos_recomendados: string[]
}

export async function generateStaticParams() {
  return modelosData.modelos.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const modelo = modelosData.modelos.find((m) => m.slug === slug) as Modelo | undefined
  if (!modelo) return { title: 'Ficha técnica no encontrada | AgriVolt' }

  return {
    title: `Ficha técnica ${modelo.nombre}`,
    description: `Ficha técnica detallada de ${modelo.nombre}: especificaciones, prestaciones y usos recomendados.`,
    openGraph: {
      title: `Ficha técnica ${modelo.nombre}`,
      images: [modelo.img],
    },
  }
}



export default async function FichaTecnicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const modelo = modelosData.modelos.find((m) => m.slug === slug) as Modelo | undefined
  if (!modelo) notFound()

  const specs: Especificaciones = modelo.especificaciones

  const tablaOrden = [
    ['SKU', modelo.sku],
    ['Tanque (spray)', specs.tanque_spray],
    ['Flujo máx. spray', specs.flujo_max],
    ['Tamaño de gota', specs.tamano_gota],
    ['Esparcido', specs.esparcido],
    ['Izaje', specs.izaje],
    ['Percepción', specs.percepcion],
    ['FPV', specs.fpv],
    ['Velocidad máx.', specs.velocidad_max],
    ['Protección', specs.proteccion],
    ['Peso (con batería)', specs.peso_con_bateria],
    ['MTOW', specs.mtow],
    ['Dimensiones (operación)', specs.dimensiones_operacion],
    ['Dimensiones (plegado)', specs.dimensiones_plegado],
    ['Autonomía', specs.autonomia],
    ['Radio de vuelo', specs.radio_vuelo],
    ['Ancho de pulverización', specs.ancho_pulverizacion],
    ['Carga útil máx.', specs.carga_util_max],
  ] as Array<[string, string | undefined]>

  return (
    <main className="min-h-screen">
      {/* Estilos de impresión optimizados para una página */}
      <style>{`
        @media print {
          /* Configuración de página */
          @page {
            size: A4;
            margin: 1cm;
          }
          
          /* Ocultar elementos de navegación */
          header, footer, nav, .no-print { 
            display: none !important; 
          }
          
          /* Reset básico */
          body { 
            background: white !important; 
            color: black !important; 
            font-size: 12px !important; 
            line-height: 1.4 !important; 
          }
          
          main { 
            padding: 0 !important; 
            margin: 0 !important; 
          }
          
          /* Estilos del sheet */
          .sheet { 
            box-shadow: none !important; 
            border: 1px solid #ccc !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            page-break-inside: avoid !important; 
          }
          
          /* Header compacto */
          .sheet > div:first-child {
            background: #2d39f1 !important;
            color: white !important;
            padding: 15px !important;
          }
          
          /* Contenido principal */
          .sheet > div:last-child {
            padding: 15px !important; 
          }
          
          /* Títulos */
          h1, h2 {
            color: black !important;
            margin-bottom: 8px !important; 
          }
          
          /* Tabla compacta */
          table { 
            border-collapse: collapse !important; 
            width: 100% !important;
            font-size: 11px !important;
          }
          
          th, td { 
            border: 1px solid #ddd !important; 
            padding: 6px !important; 
            text-align: left !important;
          }
          
          th {
            background: #f5f5f5 !important;
            font-weight: bold !important;
          }
          
          /* Bullets más pequeños */
          svg {
            width: 12px !important;
            height: 12px !important;
          }
          
          /* Tags más compactos */
          span[class*="bg-slate-100"] {
            background: #f0f0f0 !important;
            border: 1px solid #ddd !important;
            padding: 3px 6px !important;
            font-size: 10px !important;
          }
          
          /* Footer */
          .sheet > div:last-child > div:last-child {
            border-top: 1px solid #ddd !important;
            padding-top: 10px !important;
            margin-top: 10px !important;
            text-align: center !important;
            font-size: 10px !important;
            color: #666 !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 no-print">
          <Link href={`/drones/${slug}`} className="text-slate-600 hover:text-slate-900 underline">
            ← Volver al modelo
          </Link>
          <PrintButton />
        </div>

        <article className="sheet mt-6 bg-white rounded-2xl border border-black/5 shadow-lg overflow-hidden">
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-display">{modelo.nombre}</h1>
                <p className="text-white/90 text-sm mt-1">{modelo.claim}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{modelo.precio_desde}</div>
                <div className="text-xs opacity-75">SKU: {modelo.sku}</div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Resumen compacto */}
            <section>
              <h2 className="text-lg font-bold font-display mb-2 text-slate-900">Resumen</h2>
              <p className="text-slate-700 text-sm mb-3">{modelo.descripcion}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                {modelo.bullets.slice(0, 6).map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-3 w-3 mt-0.5 text-primary flex-shrink-0">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span className="text-slate-700">{b}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tabla técnica compacta */}
            <section>
              <h2 className="text-lg font-bold font-display mb-2 text-slate-900">Especificaciones técnicas</h2>
              <div className="border border-black/10 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    {tablaOrden.slice(0, 12).map(([label, value]) => (
                      <tr key={label} className="border-b border-black/5 last:border-b-0">
                        <th className="text-left p-2 bg-slate-50 font-medium text-slate-900 w-2/5">{label}</th>
                        <td className="p-2 text-slate-700">{value || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Usos recomendados compactos */}
            {modelo.usos_recomendados?.length ? (
              <section>
                <h2 className="text-lg font-bold font-display mb-2 text-slate-900">Usos recomendados</h2>
                <div className="flex flex-wrap gap-1">
                  {modelo.usos_recomendados.slice(0, 4).map((u, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                      {u}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Footer */}
            <div className="pt-2 border-t border-black/10 text-center text-xs text-slate-500">
              <p>AgriVolt - Drones Agrícolas de Precisión</p>
              <p>www.agrivolt.mx | ventas@agrivolt.mx</p>
            </div>
          </div>
        </article>

        {/* Acciones inferiores */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 no-print">
          <Link href="/cotizar" className="rounded-xl px-5 py-3 bg-primary text-white hover:bg-primary/90 text-center">
            Solicitar cotización de {modelo.nombre}
          </Link>
          <Link href={`/drones/${slug}`} className="rounded-xl px-5 py-3 border border-black/10 hover:bg-slate-50 text-center">
            Ver página del modelo
          </Link>
          <PrintButton />
        </div>
      </div>
    </main>
  )
}


