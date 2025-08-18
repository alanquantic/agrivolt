import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import YouTubeVideo from '@/components/YouTubeVideo'
import modelosData from '../../../../data/modelos.json'

interface Modelo {
  id: string
  nombre: string
  claim: string
  descripcion: string
  img: string
  sku: string
  slug: string
  precio_desde: string
  bullets: string[]
  especificaciones: { [key: string]: string }
  usos_recomendados: string[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return modelosData.modelos.map((modelo) => ({
    slug: modelo.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const modelo = modelosData.modelos.find((m) => m.slug === slug)
  
  if (!modelo) {
    return {
      title: 'Modelo no encontrado - AgriVolt',
    }
  }

  const metaTitles: { [key: string]: string } = {
    'titan-150': 'AgriVolt Titan 150: dron agrícola de alta capacidad (tanque 70 L)',
    'pro-100': 'AgriVolt Pro 100: el equilibrio ideal para huertos y parcelas medianas',
    'edge-70': 'AgriVolt Edge 70: compacto, potente y listo para operar en solitario'
  }

  const metaDescriptions: { [key: string]: string } = {
    'titan-150': 'Dron agrícola insignia con tanque de 70 L y flujo de 40 L/min. Radar 360°, FPV 2K, esparcido 100 L hasta 240 kg/min. Ideal para grandes extensiones.',
    'pro-100': 'Tanque de 45 L (60 L opc.) y 24 L/min. RTK, radar 360°, izaje hasta 60 kg y esparcido de alta precisión. Para operación multi-escenario.',
    'edge-70': 'Tanque de 37.5 L y 24 L/min, visión compuesta para evitar obstáculos de 1 cm y esparcido 70 L. Eficiente para huertos y parcelas medianas.'
  }

  return {
    title: metaTitles[slug] || `${modelo.nombre} - AgriVolt`,
    description: metaDescriptions[slug] || modelo.descripcion,
    openGraph: {
      title: metaTitles[slug] || modelo.nombre,
      description: metaDescriptions[slug] || modelo.descripcion,
      images: [modelo.img],
    },
  }
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params
  const modelo = modelosData.modelos.find((m) => m.slug === slug) as Modelo | undefined

  if (!modelo) {
    notFound()
  }

  // Especificaciones para mostrar en tabla
  const especificacionesTabla = [
    { label: "Tanque (spray)", value: modelo.especificaciones.tanque_spray },
    { label: "Flujo máx. spray", value: modelo.especificaciones.flujo_max },
    { label: "Tamaño de gota", value: modelo.especificaciones.tamano_gota },
    { label: "Esparcido", value: modelo.especificaciones.esparcido },
    { label: "Velocidad máx.", value: modelo.especificaciones.velocidad_max },
    { label: "Peso (con batería)", value: modelo.especificaciones.peso_con_bateria },
    { label: "Protección", value: modelo.especificaciones.proteccion },
    { label: "Percepción", value: modelo.especificaciones.percepcion },
  ].filter(spec => spec.value && spec.value !== "—")

  const faqsModelo = getFAQsForModel(slug)

  return (
    <>
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": modelo.nombre,
            "brand": { "@type": "Brand", "name": "AgriVolt" },
            "sku": modelo.sku,
            "category": "Drones agrícolas",
            "description": modelo.descripcion,
                    "image": [`https://www.agrivoltdrone.com${modelo.img}`],
        "url": `https://www.agrivoltdrone.com/drones/${modelo.slug}`,
            "additionalProperty": especificacionesTabla.map(spec => ({
              "@type": "PropertyValue",
              "name": spec.label,
              "value": spec.value
            }))
          })
        }}
      />

      <Header />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/#modelos" className="hover:text-slate-900 transition-colors">
                  Drones
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-slate-900 font-medium">{modelo.nombre}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Imagen */}
            <div className="relative">
              <img 
                src={modelo.img} 
                alt={modelo.nombre}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs rounded-full text-white bg-primary">
                  Nuevo
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1 text-sm rounded-full bg-white/90 text-slate-900 font-medium">
                  {modelo.precio_desde}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display mb-4">
                {modelo.nombre}
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                {modelo.claim}
              </p>

              {/* Bullets de valor */}
              <div className="mb-8">
                <h2 className="text-xl font-bold font-display mb-4">
                  Características principales
                </h2>
                <ul className="space-y-3">
                  {modelo.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        fill="none" 
                        strokeWidth="2" 
                        className="h-5 w-5 mt-0.5 text-primary flex-shrink-0"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                      <span className="text-slate-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/cotizar" 
                  className="rounded-2xl px-6 py-3 bg-primary text-white text-center hover:bg-primary/90 transition-colors font-medium"
                >
                  Solicitar cotización
                </Link>
                <Link 
                  href="/#comparador" 
                  className="rounded-2xl px-6 py-3 border border-black/20 text-slate-900 text-center hover:bg-slate-50 transition-colors font-medium"
                >
                  Comparar modelos
                </Link>
              </div>

              {/* Usos recomendados */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Usos recomendados</h3>
                <div className="flex flex-wrap gap-2">
                  {modelo.usos_recomendados.map((uso, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {uso}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Especificaciones técnicas */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold font-display mb-8">Especificaciones clave</h2>
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {especificacionesTabla.map((spec, index) => (
                    <tr key={index} className="border-b border-black/5 last:border-b-0">
                      <th className="text-left p-4 bg-slate-50 font-medium text-slate-900 w-1/3">
                        {spec.label}
                      </th>
                      <td className="p-4 text-slate-700">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Video de YouTube */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold font-display mb-8">Video demostrativo</h2>
            <YouTubeVideo 
              videoId="_2Ubiz3u3Xk"
              title={`Video demostrativo - ${modelo.nombre}`}
            />
          </section>

          {/* FAQs del modelo */}
          {faqsModelo.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold font-display mb-8">Preguntas frecuentes</h2>
              <div className="space-y-4">
                {faqsModelo.map((faq, index) => (
                  <details key={index} className="group bg-white border border-black/5 rounded-2xl p-6">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function getFAQsForModel(slug: string) {
  const commonFAQs = [
    {
      question: "¿Incluye capacitación?",
      answer: "Sí, ofrecemos paquetes de entrenamiento a pilotos y certificaciones correspondientes."
    },
    {
      question: "¿Qué insumos aceptan las tolvas?",
      answer: "Fertilizantes secos/húmedos, semillas y cal (revisar granulometría según especificaciones)."
    },
    {
      question: "¿Ofrecen refacciones en México?",
      answer: "Sí, con disponibilidad regional y soporte técnico desde México para toda LATAM."
    }
  ]

  const modelSpecificFAQs: { [key: string]: Array<{question: string; answer: string}> } = {
    'titan-150': [
      {
        question: "¿Pueden operar de noche?",
        answer: "Sí, el Titan 150 incluye FPV 2K + iluminación IR para operación nocturna segura."
      },
      {
        question: "¿Cuál es la autonomía real de vuelo?",
        answer: "19 min 30 s sin carga. Con carga completa aproximadamente 8-10 minutos dependiendo de condiciones."
      }
    ],
    'pro-100': [
      {
        question: "¿Qué capacidad de izaje tiene?",
        answer: "Hasta 60 kg con sistema de guiado automático al punto de izaje/despegue."
      },
      {
        question: "¿Incluye sistema RTK?",
        answer: "Sí, con precisión de ±10 cm H/V y modo sin RTK hasta 4 minutos."
      }
    ],
    'edge-70': [
      {
        question: "¿Es adecuado para un solo operador?",
        answer: "Sí, está diseñado específicamente para operación individual en parcelas medianas y fragmentadas."
      },
      {
        question: "¿Qué tan rápida es la carga?",
        answer: "Carga rápida hasta en 9 min (5C) con cargador integrado de enfriamiento."
      }
    ]
  }

  return [...(modelSpecificFAQs[slug] || []), ...commonFAQs]
}
