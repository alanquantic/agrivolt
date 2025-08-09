'use client'

import Link from 'next/link'

export default function HeroVideo() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video 
          className="h-full w-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1560179406-1c7f87b5c9d8?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display animate-fade-in [animation-delay:0.05s]">
          Drones agrícolas AgriVolt: precisión, potencia y ahorro de insumos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 animate-fade-in [animation-delay:0.12s]">
          AgriVolt integra drones agrícolas de alto desempeño con tecnología de visión y atomización para lograr una cobertura homogénea del dosel, reducir consumo de insumos y mejorar la rentabilidad por hectárea.
        </p>
        
        <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-in [animation-delay:0.2s]">
          <Link 
            href="/cotizar" 
            className="rounded-2xl px-5 py-3 bg-primary text-white inline-flex items-center gap-2 shadow hover:bg-primary/90 transition-colors"
          >
            Solicita una demostración
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </Link>
          <Link 
            href="#modelos" 
            className="rounded-2xl px-5 py-3 bg-white/90 text-slate-900 hover:bg-white inline-flex items-center gap-2 transition-colors"
          >
            Ver modelos
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "70 L", label: "Tanque máximo", detail: "Titan 150", delay: "0.25s" },
            { value: "40 L/min", label: "Flujo máximo", detail: "Alta capacidad", delay: "0.28s" },
            { value: "10-300 μm", label: "Tamaño gota", detail: "Precisión CCMS", delay: "0.31s" },
            { value: "240 kg/min", label: "Esparcido", detail: "Descarga rápida", delay: "0.34s" }
          ].map((stat, index) => (
            <div key={index} className={`group relative animate-fade-in [animation-delay:${stat.delay}]`}>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm border border-black/5 transition-transform group-hover:-translate-y-1">
                <div className="p-2 rounded-lg bg-primary/12 text-primary">●</div>
                <div>
                  <div className="text-2xl font-semibold leading-none font-display">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                  <div className="mt-1 text-xs text-slate-500">{stat.detail}</div>
                </div>
              </div>
              <div className="absolute inset-x-6 -bottom-1 h-[2px] rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}