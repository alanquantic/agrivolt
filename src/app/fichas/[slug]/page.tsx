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

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value || value === '—') return null
  return (
    <tr className="border-b border-black/5 last:border-b-0">
      <th className="text-left p-3 bg-slate-50 font-medium text-slate-900 w-1/3">{label}</th>
      <td className="p-3 text-slate-700">{value}</td>
    </tr>
  )
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
      {/* Estilos de impresión */}
      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .sheet { box-shadow: none !important; border: none !important; }
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
          {/* Hero de ficha */}
          <div className="relative">
            <img src={modelo.img} alt={modelo.nombre} className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display text-white drop-shadow">
                  {modelo.nombre}
                </h1>
                <p className="text-white/90 mt-1 drop-shadow">{modelo.claim}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-sm">
                {modelo.precio_desde}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Resumen / bullets */}
            <section>
              <h2 className="text-xl font-bold font-display mb-3">Resumen</h2>
              <p className="text-slate-700 mb-4">{modelo.descripcion}</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {modelo.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4 mt-0.5 text-primary">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tabla técnica */}
            <section>
              <h2 className="text-xl font-bold font-display mb-3">Especificaciones técnicas</h2>
              <div className="rounded-2xl border border-black/5 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {tablaOrden.map(([label, value]) => (
                      <SpecRow key={label} label={label} value={value} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Usos recomendados */}
            {modelo.usos_recomendados?.length ? (
              <section>
                <h2 className="text-xl font-bold font-display mb-3">Usos recomendados</h2>
                <div className="flex flex-wrap gap-2">
                  {modelo.usos_recomendados.map((u, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      {u}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
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


