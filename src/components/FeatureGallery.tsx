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
  // Posicionamiento Masonry controlado
  colStart?: 1 | 2 | 3
  rowStart?: 1 | 2 | 3
  rowSpan?: 1 | 2
  hoverInfo?: string
}

const galleryData: GalleryItem[] = [
  // 3 FOTOS
  {
    id: 'maintenance',
    type: 'image',
    title: 'Mantenimiento simplificado',
    image: '/img/gallery-maintenance.webp',
    colStart: 1,
    rowStart: 1,
    rowSpan: 2,
    hoverInfo: 'Diseño modular con componentes accesibles que facilitan inspecciones rápidas y reducen el tiempo de inactividad.'
  },
  {
    id: 'deployment',
    type: 'image', 
    title: 'Despliegue rápido',
    subtitle: '5 min',
    image: '/img/pro-100.webp',
    colStart: 2,
    rowStart: 3,
    rowSpan: 1,
    hoverInfo: 'Armado completo en 5 minutos. Sin herramientas especiales. Listo para operar inmediatamente.'
  },
  {
    id: 'engine',
    type: 'image',
    title: 'Motor de arranque automático',
    image: '/img/edge-70.webp',
    colStart: 3,
    rowStart: 1,
    rowSpan: 1,
    hoverInfo: 'Sistema de arranque electrónico. Encendido con un botón. Sin esfuerzo manual requerido.'
  },
  
  // 3 DATOS
  {
    id: 'weight',
    type: 'data',
    title: 'Factor de forma compacto',
    subtitle: '57 lb / 26 kg MTOW',
    description: 'Tamaño y peso optimizados para un transporte sencillo y operación en espacios reducidos sin perder capacidad de carga.',
    bgColor: 'bg-gray-50',
    textColor: 'text-black',
    colStart: 1,
    rowStart: 3,
    rowSpan: 1,
    hoverInfo: 'MTOW (Maximum Take-Off Weight) optimizado para transporte y operación en espacios reducidos.'
  },
  {
    id: 'power',
    type: 'data',
    title: 'Sistema híbrido propietario',
    icon: '⚡',
    bgColor: 'bg-yellow-300',
    textColor: 'text-black',
    colStart: 2,
    rowStart: 1,
    rowSpan: 2,
    hoverInfo: 'Integración de control inteligente y sensores de precisión para optimizar la aplicación y adaptarse a diferentes cultivos y condiciones.'
  },
  {
    id: 'temperature',
    type: 'data',
    title: 'Operación en temperaturas frías',
    subtitle: '15°F / -10°C',
    description: 'Diseñado para funcionar con alto rendimiento en ambientes de bajas temperaturas y climas exigentes.',
    bgColor: 'bg-black',
    textColor: 'text-white',
    colStart: 3,
    rowStart: 2,
    rowSpan: 2,
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

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-4 max-w-6xl mx-auto">
          {galleryData.map((item) => {
            const colStart = item.colStart === 2 ? 'md:col-start-2' : item.colStart === 3 ? 'md:col-start-3' : 'md:col-start-1'
            const rowStart = item.rowStart === 2 ? 'md:row-start-2' : item.rowStart === 3 ? 'md:row-start-3' : 'md:row-start-1'
            const rowSpan = item.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'
            return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                item.bgColor || 'bg-white'
              } ${item.textColor || 'text-black'} ${colStart} ${rowStart} ${rowSpan}`}
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
                  <div className="relative h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Texto sobre imagen */}
                    <div className="absolute bottom-2 left-2 right-2">
                      {item.subtitle && (
                        <div className="text-xl font-bold text-white mb-1">
                          {item.subtitle}
                        </div>
                      )}
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  // Card con datos
                  <div className="p-6 h-full flex flex-col justify-center">
                                         {item.icon && (
                       <div className="text-2xl mb-2 text-center">
                         {item.icon}
                       </div>
                     )}
                    
                     <h3 className="text-sm font-semibold mb-2">
                       {item.title}
                     </h3>
                    
                     {item.subtitle && (
                       <div className="text-lg font-bold mb-2">
                         {item.subtitle}
                       </div>
                     )}
                    
                    {item.description && (
                      <p className="text-sm opacity-80">
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
          )})}
        </div>
      </div>
    </section>
  )
}
