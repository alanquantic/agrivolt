import Header from '@/components/Header'
import HeroVideo from '@/components/HeroVideo'
import ModeloCard from '@/components/ModeloCard'
import FeatureCard from '@/components/FeatureCard'
import CompareTable from '@/components/CompareTable'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import FeatureGallery from '@/components/FeatureGallery'
import modelosData from '../../data/modelos.json'

export default function Home() {
  return (
    <>
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuál es la diferencia entre Titan 150, Pro 100 y Edge 70?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Titan 150 prioriza capacidad y cobertura (70 L / 40 L/min). Pro 100 equilibra maniobrabilidad y rendimiento (45–60 L / 24 L/min). Edge 70 es compacto y eficiente para operación individual (37.5 L / 24 L/min)."
                }
              },
              {
                "@type": "Question",
                "name": "¿Puedo cambiar entre pulverización y esparcido en el campo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. Los módulos son de liberación rápida y la app guía la calibración de caudal y ancho de esparcido."
                }
              },
              {
                "@type": "Question",
                "name": "¿Operan de noche o en laderas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. Cuentan con FPV y luces IR (Titan 150) y seguimiento de terreno mediante radar/lidar para baja altura y pendientes."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tamaños de gota admiten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ajuste fino de 10–300 μm por boquilla para adaptarse a cultivo, objetivo y condiciones de viento."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué soporte ofrece AgriVolt en LATAM?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Capacitación de pilotos, stock de refacciones, asistencia técnica y garantía regional."
                }
              }
            ]
          })
        }}
      />

      <main>
        <Header />
        <HeroVideo />
        
        {/* MODELOS */}
        <section id="modelos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
              Tres modelos. <span className="text-primary">Una plataforma.</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Electrónica de grado industrial, seguridad activa y software listo para agricultura de precisión.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modelosData.modelos.map((modelo) => (
              <ModeloCard
                key={modelo.id}
                nombre={modelo.nombre}
                claim={modelo.claim}
                img={modelo.img}
                bullets={modelo.bullets}
                especificaciones={modelo.especificaciones}
                slug={modelo.slug}
              />
            ))}
          </div>
        </section>

        {/* POR QUÉ AGRIVOLT */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
                ¿Por qué <span className="text-primary">AgriVolt</span>?
              </h2>
              <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                Integramos drones de alto desempeño con atomización de precisión y percepción avanzada para cubrir más hectáreas con menos insumos y mayor seguridad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Precisión centimétrica</h3>
                <p className="text-slate-600">RTK y navegación autónoma para aplicaciones exactas.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ahorro de insumos</h3>
                <p className="text-slate-600">Hasta 30% menos pesticidas con cobertura uniforme.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Operación segura</h3>
                <p className="text-slate-600">Evitación de obstáculos y vuelo nocturno.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌎</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Soporte LATAM</h3>
                <p className="text-slate-600">Capacitación, refacciones y garantía regional.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TECNOLOGÍA (fondo negro como en el HTML) */}
        <section id="tecnologia" className="py-20 text-white" style={{background: 'var(--bg-dark)'}}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
              Tecnología para <span style={{color: 'var(--primary)'}}>entornos exigentes</span>
            </h3>
            
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelosData.tecnologias.map((tech, index) => (
                <FeatureCard
                  key={index}
                  title={tech.title}
                  description={tech.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA DE CARACTERÍSTICAS */}
        <FeatureGallery />

        {/* SOLUCIONES POR CULTIVO */}
        <section id="soluciones" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
                Soluciones por <span className="text-primary">cultivo</span>
              </h2>
              <p className="mt-4 text-xl text-slate-600">
                Aterriza el uso en cultivos clave con configuraciones específicas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌽</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Maíz y Trigo</h3>
                <p className="text-slate-600">Control de plagas en estadios críticos con gota fina y cobertura homogénea.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Arroz</h3>
                <p className="text-slate-600">Ahorro de agua e insumos con cobertura homogénea y aplicación precisa.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🍊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Frutales</h3>
                <p className="text-slate-600">Penetración en copas densas y laderas para cítricos, mango y nuez.</p>
              </div>

              {/* Nueva fila: Agave, Viñedos y Caña de azúcar */}
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌵</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Agave</h3>
                <p className="text-slate-600">Cobertura dirigida a la base de la planta y control de maleza entre hileras con baja deriva.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🍇</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Viñedos</h3>
                <p className="text-slate-600">Aplicación lateral y en copas con gota media para cobertura uniforme en racimos.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Caña de azúcar</h3>
                <p className="text-slate-600">Cobertura sobre surcos y control de plagas en etapas de crecimiento acelerado.</p>
              </div>
            </div>
          </div>
        </section>

        <CompareTable />

        {/* RENDIMIENTO Y ROI */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                  Mayor <span className="text-primary">rendimiento</span> y ROI
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Mayor cobertura por hora, menos litros aplicados y menos traslados. Calcula tu ROI con nuestra guía: superficie, frecuencia de aplicaciones y ahorro en mano de obra/insumos.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Hasta 50% más rápido que métodos tradicionales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>30% menos insumos con cobertura uniforme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>ROI típico de 12-18 meses</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">120+</div>
                  <div className="text-sm text-slate-600">Hectáreas por día</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30%</div>
                  <div className="text-sm text-slate-600">Menos insumos</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50%</div>
                  <div className="text-sm text-slate-600">Más rápido</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-slate-600">Operación</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Preguntas <span className="text-primary">frecuentes</span>
              </h2>
            </div>

            <div className="space-y-6">
              <details className="group bg-white border border-black/5 rounded-2xl p-6">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  ¿Cuál es la diferencia entre Titan 150, Pro 100 y Edge 70?
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Titan 150 prioriza capacidad y cobertura (70 L / 40 L/min). Pro 100 equilibra maniobrabilidad y rendimiento (45–60 L / 24 L/min). Edge 70 es compacto y eficiente para operación individual (37.5 L / 24 L/min).
                </p>
              </details>

              <details className="group bg-white border border-black/5 rounded-2xl p-6">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  ¿Puedo cambiar entre pulverización y esparcido en el campo?
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Sí. Los módulos son de liberación rápida y la app guía la calibración de caudal y ancho de esparcido.
                </p>
              </details>

              <details className="group bg-white border border-black/5 rounded-2xl p-6">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  ¿Operan de noche o en laderas?
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Sí. Cuentan con FPV y luces IR (Titan 150) y seguimiento de terreno mediante radar/lidar para baja altura y pendientes.
                </p>
              </details>

              <details className="group bg-white border border-black/5 rounded-2xl p-6">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  ¿Qué soporte ofrece AgriVolt en LATAM?
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Capacitación de pilotos, stock de refacciones, asistencia técnica y garantía regional.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-display font-bold">Hablemos de tu operación</h4>
                <p className="text-slate-600 mt-2">
                  Cuéntanos tus cultivos, hectáreas y necesidades específicas.
                </p>
                <ul className="mt-4 text-sm text-slate-700 space-y-1">
                  <li>📞 +52 449 448 0012</li>
                                      <li>✉️ ventas@agrivoltdrone.com</li>
                  <li>📍 Aguascalientes, México</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-black/5">
                <h5 className="font-semibold mb-4">Solicita una demostración</h5>
                <p className="text-sm text-slate-600 mb-4">
                  Completa nuestro formulario detallado para una propuesta personalizada.
                </p>
                <a 
                  href="/cotizar" 
                  className="inline-block w-full text-center rounded-2xl px-5 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Cotizar mi dron
          </a>
        </div>
            </div>
          </div>
        </section>

      <Footer />
      <FloatingActions />
      </main>
    </>
  )
}