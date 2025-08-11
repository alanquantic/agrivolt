'use client'

import { useState } from 'react'

interface GalleryItem {
  id: string
  type: 'image' | 'data'
  title: string
  subtitle?: string
  description?: string
  image?: string
  icon?: string
  bgColor?: string
  textColor?: string
  hoverInfo?: string
}

const galleryData: GalleryItem[] = [
  // 3 FOTOS
  {
    id: 'maintenance',
    type: 'image',
    title: 'Mantenimiento simplificado',
    image: '/img/titan-150.webp',
    hoverInfo: 'Acceso directo a componentes críticos. Herramientas estándar. Reparación en campo en menos de 30 minutos.'
  },
  {
    id: 'deployment',
    type: 'image', 
    title: 'Despliegue rápido',
    subtitle: '5 min',
    image: '/img/pro-100.webp',
    hoverInfo: 'Armado completo en 5 minutos. Sin herramientas especiales. Listo para operar inmediatamente.'
  },
  {
    id: 'engine',
    type: 'image',
    title: 'Motor de arranque automático',
    image: '/img/edge-70.webp',
    hoverInfo: 'Sistema de arranque electrónico. Encendido con un botón. Sin esfuerzo manual requerido.'
  },
  
  // 3 DATOS
  {
    id: 'weight',
    type: 'data',
    title: 'Factor de forma compacto',
    subtitle: '57 lb / 26kg MTOW',
    description: 'Peso y tamaño más pequeños de cualquier vehículo de su clase',
    bgColor: 'bg-gray-50',
    textColor: 'text-black',
    hoverInfo: 'MTOW (Maximum Take-Off Weight) optimizado para transporte y operación en espacios reducidos.'
  },
  {
    id: 'power',
    type: 'data',
    title: 'Sistema híbrido propietario',
    icon: '⚡',
    bgColor: 'bg-yellow-300',
    textColor: 'text-black',
    hoverInfo: 'Tecnología híbrida gas-eléctrica exclusiva. Mayor autonomía y eficiencia energética.'
  },
  {
    id: 'temperature',
    type: 'data',
    title: 'Operación en temperaturas frías',
    subtitle: '15°F / -10°C',
    description: 'El AgriVolt puede operar en temperaturas tan bajas como',
    bgColor: 'bg-black',
    textColor: 'text-white',
    hoverInfo: 'Certificación para operación en climas extremos. Componentes resistentes a congelación.'
  }
]

export default function FeatureGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Tecnología <span style={{color: 'var(--primary)'}}>de vanguardia</span>
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Características innovadoras que hacen de AgriVolt la solución más avanzada para agricultura de precisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                item.bgColor || 'bg-white'
              } ${item.textColor || 'text-black'} border border-black/5`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Signo + en la esquina */}
              <div className="absolute top-3 right-3 z-10">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-black font-bold text-sm">+</span>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="relative z-0">
                {item.type === 'image' ? (
                  // Card con imagen
                  <div className="relative h-44">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Texto sobre imagen */}
                    <div className="absolute bottom-3 left-3 right-3">
                      {item.subtitle && (
                        <div className="text-2xl font-bold text-white mb-1">
                          {item.subtitle}
                        </div>
                      )}
                                           <h3 className="text-xs font-semibold text-white">
                       {item.title}
                     </h3>
                    </div>
                  </div>
                ) : (
                  // Card con datos
                  <div className="p-4 h-44 flex flex-col justify-center">
                    {item.icon && (
                      <div className="text-3xl mb-3 text-center">
                        {item.icon}
                      </div>
                    )}
                    
                                         <h3 className="text-xs font-semibold mb-2">
                       {item.title}
                     </h3>
                    
                                         {item.subtitle && (
                       <div className="text-lg font-bold mb-2">
                         {item.subtitle}
                       </div>
                     )}
                    
                    {item.description && (
                      <p className="text-xs opacity-80">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Overlay con información hover */}
              <div
                className={`absolute inset-0 bg-black/90 text-white p-6 flex items-center justify-center transition-all duration-300 ${
                  hoveredId === item.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-sm leading-relaxed">
                    {item.hoverInfo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
