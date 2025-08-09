'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="border-t border-black/5 py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full grid place-items-center text-white bg-primary">
              ▲
            </div>
            <span className="font-semibold">AgriVolt</span>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Drones agrícolas de alto desempeño con atomización de precisión y percepción avanzada para cubrir más hectáreas con menos insumos y mayor seguridad.
          </p>
          <p className="text-sm text-slate-600">
            Soporte, capacitación y refacciones desde México para toda LATAM.
          </p>
        </div>
        
        <div>
          <h5 className="font-semibold mb-3">Productos</h5>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>
              <Link href="/drones/titan-150" className="hover:text-slate-900 transition-colors">
                Titan 150
              </Link>
            </li>
            <li>
              <Link href="/drones/pro-100" className="hover:text-slate-900 transition-colors">
                Pro 100
              </Link>
            </li>
            <li>
              <Link href="/drones/edge-70" className="hover:text-slate-900 transition-colors">
                Edge 70
              </Link>
            </li>
            <li>
              <Link href="/#comparador" className="hover:text-slate-900 transition-colors">
                Comparar modelos
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold mb-3">Contacto</h5>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>📞 +52 000 000 0000</li>
            <li>
              <a href="mailto:ventas@agrivolt.mx" className="hover:text-slate-900 transition-colors">
                ✉️ ventas@agrivolt.mx
              </a>
            </li>
            <li>📍 Aguascalientes, México</li>
            <li className="pt-2">
              <Link 
                href="/cotizar" 
                className="inline-block px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
              >
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <div>
              © {currentYear} AgriVolt. Todos los derechos reservados.
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="/privacidad" className="hover:text-slate-700 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-slate-700 transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}