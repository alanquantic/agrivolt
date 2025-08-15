'use client'

import { useState } from 'react'
import Link from 'next/link'

interface EspecificacionesProps {
  [key: string]: string | undefined
}

interface ModeloCardProps {
  nombre: string
  claim: string
  img: string
  bullets: string[]
  especificaciones: EspecificacionesProps
  slug: string
}

export default function ModeloCard({ 
  nombre, 
  claim, 
  img, 
  bullets, 
  especificaciones, 
  slug 
}: ModeloCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Destacados principales para mostrar en el panel expandible
  const destacadosPrincipales = [
    { k: "Tanque", v: especificaciones.tanque_spray || "N/A" },
    { k: "Flujo máx.", v: especificaciones.flujo_max || "N/A" },
    { k: "Velocidad", v: especificaciones.velocidad_max || "N/A" },
    { k: "Peso", v: especificaciones.peso_con_bateria || "N/A" }
  ]

  return (
    <div className="group overflow-hidden bg-white border border-black/5 shadow-lg hover:shadow-2xl transition-all rounded-2xl">
      <div className="relative">
        <img src={img} alt={nombre} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 text-xs rounded-full text-white bg-primary">Nuevo</span>
          <button 
            onClick={toggleExpand}
            className="rounded-full bg-white/95 text-slate-900 hover:bg-white px-3 py-1 text-sm font-medium shadow transition-colors"
          >
            {isExpanded ? 'Cerrar' : 'Ficha técnica'}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold font-display">{nombre}</h3>
        <p className="text-slate-600 mt-1">{claim}</p>
        
        <ul className="mt-4 space-y-2 text-sm">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                className="h-4 w-4 mt-1 text-primary flex-shrink-0"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        
        {/* Botón Ver detalles siempre visible */}
        <div className="mt-6">
          <Link 
            href={`/drones/${slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm w-full"
          >
            Ver detalles
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </Link>
        </div>
        
        <div className={`mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {destacadosPrincipales.map((item, index) => (
            <div key={index} className="rounded-2xl border border-black/5 p-3 bg-slate-50">
              <div className="text-xs uppercase tracking-wide text-slate-700">{item.k}</div>
              <div className="text-lg font-semibold mt-1">{item.v}</div>
            </div>
          ))}
        </div>
        
        <div className={`mt-4 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link 
              href={`/drones/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm"
            >
              Ver detalles
            </Link>
            <Link 
              href="/cotizar" 
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors text-sm"
            >
              Cotizar modelo
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}