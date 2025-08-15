'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface FormData {
  nombre: string
  email: string
  telefono: string
  pais: string
  estado: string
  necesidad: string
  cultivo: string
  cultivoOtro: string
  superficie: string
  contacto: string
  // Campos extendidos
  terreno: string
  frecuencia: string
  ventana: string
  modulos: string[]
  presupuesto: string
  mensaje: string
  consentimiento: boolean
}

export default function CotizarPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    estado: '',
    necesidad: '',
    cultivo: '',
    cultivoOtro: '',
    superficie: '',
    contacto: '',
    terreno: '',
    frecuencia: '',
    ventana: '',
    modulos: [],
    presupuesto: '',
    mensaje: '',
    consentimiento: false
  })

  const [showExtended, setShowExtended] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const paises = [
    'México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'Ecuador', 'Bolivia', 
    'Paraguay', 'Uruguay', 'Venezuela', 'Costa Rica', 'Guatemala', 'Honduras',
    'Nicaragua', 'Panamá', 'El Salvador', 'República Dominicana', 'Otro'
  ]

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.telefono)) {
      newErrors.telefono = 'Formato de teléfono inválido'
    }

    if (!formData.pais) {
      newErrors.pais = 'Selecciona un país'
    }

    if (!formData.necesidad) {
      newErrors.necesidad = 'Selecciona para qué lo necesitas'
    }

    if (!formData.cultivo) {
      newErrors.cultivo = 'Selecciona el tipo de cultivo'
    }

    if (!formData.superficie) {
      newErrors.superficie = 'Selecciona la superficie a cubrir'
    }

    if (!formData.contacto) {
      newErrors.contacto = 'Selecciona tu preferencia de contacto'
    }

    if (!formData.consentimiento) {
      newErrors.consentimiento = 'Necesitamos tu autorización para continuar'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Preparar datos para envío
      const submissionData = {
        ...formData,
        cultivo: formData.cultivo === 'Otros' ? formData.cultivoOtro : formData.cultivo,
        timestamp: new Date().toISOString()
      }

      // Enviar formulario a la API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

            if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error en el envío')
      }

      setSubmitStatus('success')
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleModuloChange = (modulo: string, checked: boolean) => {
    const newModulos = checked 
      ? [...formData.modulos, modulo]
      : formData.modulos.filter(m => m !== modulo)
    handleInputChange('modulos', newModulos)
  }

  if (submitStatus === 'success') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold font-display mb-4">¡Gracias por tu solicitud!</h1>
              <p className="text-slate-600 mb-6">
                Gracias. Te contactaremos en menos de 24 h hábiles con tu propuesta y tiempos de entrega.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="rounded-2xl px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Volver al inicio
                </Link>
                <Link 
                  href="/#modelos" 
                  className="rounded-2xl px-6 py-3 border border-black/20 text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Ver modelos
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">
              Solicita tu <span className="text-primary">cotización</span>
            </h1>
            <p className="text-xl text-slate-600">
              Cuéntanos tus necesidades para proponerte el modelo y configuración adecuados.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Formulario breve */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre y apellidos *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.nombre ? 'border-red-300' : 'border-black/10'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-black/10'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.telefono ? 'border-red-300' : 'border-black/10'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                    placeholder="+52 000 000 0000"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    País *
                  </label>
                  <select
                    value={formData.pais}
                    onChange={(e) => handleInputChange('pais', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.pais ? 'border-red-300' : 'border-black/10'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  >
                    <option value="">Seleccionar país</option>
                    {paises.map(pais => (
                      <option key={pais} value={pais}>{pais}</option>
                    ))}
                  </select>
                  {errors.pais && <p className="mt-1 text-sm text-red-600">{errors.pais}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estado / Provincia
                </label>
                <input
                  type="text"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Tu estado o provincia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ¿Para qué lo necesitas principalmente? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Pulverización', 'Esparcido', 'Ambos', 'Izaje/otros'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="necesidad"
                        value={option}
                        checked={formData.necesidad === option}
                        onChange={(e) => handleInputChange('necesidad', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex-1 px-3 py-2 text-sm text-center rounded-xl border cursor-pointer transition-colors ${
                        formData.necesidad === option 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-black/10 hover:border-primary/50'
                      }`}>
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.necesidad && <p className="mt-1 text-sm text-red-600">{errors.necesidad}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo(s) de cultivo principal *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Maíz', 'Trigo', 'Arroz', 'Cítricos', 'Mango', 'Nuez', 'Hortalizas', 'Otros'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="cultivo"
                        value={option}
                        checked={formData.cultivo === option}
                        onChange={(e) => handleInputChange('cultivo', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex-1 px-3 py-2 text-sm text-center rounded-xl border cursor-pointer transition-colors ${
                        formData.cultivo === option 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-black/10 hover:border-primary/50'
                      }`}>
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
                {formData.cultivo === 'Otros' && (
                  <input
                    type="text"
                    value={formData.cultivoOtro}
                    onChange={(e) => handleInputChange('cultivoOtro', e.target.value)}
                    className="mt-3 w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Especifica tu cultivo"
                  />
                )}
                {errors.cultivo && <p className="mt-1 text-sm text-red-600">{errors.cultivo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Superficie a cubrir *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['< 20 ha', '20–100 ha', '100–300 ha', '> 300 ha'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="superficie"
                        value={option}
                        checked={formData.superficie === option}
                        onChange={(e) => handleInputChange('superficie', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex-1 px-3 py-2 text-sm text-center rounded-xl border cursor-pointer transition-colors ${
                        formData.superficie === option 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-black/10 hover:border-primary/50'
                      }`}>
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.superficie && <p className="mt-1 text-sm text-red-600">{errors.superficie}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferencia de contacto *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['WhatsApp', 'Llamada', 'Email'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="contacto"
                        value={option}
                        checked={formData.contacto === option}
                        onChange={(e) => handleInputChange('contacto', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex-1 px-3 py-2 text-sm text-center rounded-xl border cursor-pointer transition-colors ${
                        formData.contacto === option 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-black/10 hover:border-primary/50'
                      }`}>
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.contacto && <p className="mt-1 text-sm text-red-600">{errors.contacto}</p>}
              </div>

              {/* Formulario extendido */}
              <div className="border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={() => setShowExtended(!showExtended)}
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2"
                >
                  <span>{showExtended ? 'Ocultar' : 'Añadir'} detalles (opcional)</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${showExtended ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {showExtended && (
                  <div className="mt-6 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Terreno y pendiente principal
                        </label>
                        <select
                          value={formData.terreno}
                          onChange={(e) => handleInputChange('terreno', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Plano">Plano</option>
                          <option value="Ladera moderada">Ladera moderada</option>
                          <option value="Ladera pronunciada">Ladera pronunciada</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Frecuencia de aplicaciones
                        </label>
                        <select
                          value={formData.frecuencia}
                          onChange={(e) => handleInputChange('frecuencia', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Semanal">Semanal</option>
                          <option value="Quincenal">Quincenal</option>
                          <option value="Mensual">Mensual</option>
                          <option value="Estacional">Estacional</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Ventana de compra estimada
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Inmediata', '1–3 meses', '> 3 meses'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="ventana"
                              value={option}
                              checked={formData.ventana === option}
                              onChange={(e) => handleInputChange('ventana', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`flex-1 px-3 py-2 text-sm text-center rounded-xl border cursor-pointer transition-colors ${
                              formData.ventana === option 
                                ? 'border-primary bg-primary text-white' 
                                : 'border-black/10 hover:border-primary/50'
                            }`}>
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Módulos y accesorios de interés
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          'Tolva esparcido (70/100 L)',
                          'Baterías extra',
                          'Iluminación IR/FPV',
                          'Base RTK/estación'
                        ].map(modulo => (
                          <label key={modulo} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={formData.modulos.includes(modulo)}
                              onChange={(e) => handleModuloChange(modulo, e.target.checked)}
                              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="text-sm">{modulo}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Presupuesto aproximado (opcional)
                      </label>
                      <select
                        value={formData.presupuesto}
                        onChange={(e) => handleInputChange('presupuesto', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Seleccionar rango</option>
                        <option value="< $100,000 USD">{'< $100,000 USD'}</option>
                        <option value="$100,000 - $200,000 USD">$100,000 - $200,000 USD</option>
                        <option value="> $200,000 USD">{"> $200,000 USD"}</option>
                        <option value="Prefiero no especificar">Prefiero no especificar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mensaje adicional
                      </label>
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => handleInputChange('mensaje', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Cuéntanos más detalles sobre tu proyecto o requerimientos específicos..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Microcopys y consentimiento */}
              <div className="border-t border-black/10 pt-6">
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">
                    💡 <strong>Usaremos estos datos para proponerte el modelo y kit adecuados.</strong>
                  </p>
                  <p className="text-sm text-slate-600">
                    🔒 No compartimos tu información con terceros sin tu consentimiento.
                  </p>
                </div>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.consentimiento}
                    onChange={(e) => handleInputChange('consentimiento', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-sm text-slate-700">
                    Acepto la Política de Privacidad y el contacto comercial por los medios seleccionados. *
                  </span>
                </label>
                {errors.consentimiento && (
                  <p className="mt-1 text-sm text-red-600">{errors.consentimiento}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-2xl px-6 py-3 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
                <Link
                  href="/"
                  className="rounded-2xl px-6 py-3 border border-black/20 text-slate-900 hover:bg-slate-50 transition-colors text-center"
                >
                  Cancelar
                </Link>
              </div>

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">
                    Hubo un error al enviar el formulario. Por favor, intenta de nuevo o contáctanos directamente.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
