'use client'

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/524494480012?text=Hola%20AgriVolt,%20quiero%20información%20de%20sus%20drones"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="rounded-full w-14 h-14 grid place-items-center bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
      >
        {/* WhatsApp icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.003C.122 5.281 5.403 0 12.057 0c3.194 0 6.196 1.246 8.45 3.504A11.82 11.82 0 0124 12.06c-.003 6.654-5.284 11.94-11.94 11.94a11.95 11.95 0 01-6.003-1.617L.057 24zm6.597-3.807c1.735.995 3.276 1.591 5.392 1.593 5.448 0 9.886-4.434 9.889-9.882.003-5.462-4.415-9.89-9.881-9.893-5.451 0-9.887 4.434-9.89 9.885a9.86 9.86 0 001.596 5.385l-.999 3.648 3.893-.736zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.966-.272-.099-.47-.149-.669.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.411.248-.694.248-1.289.173-1.411z" />
        </svg>
      </a>
      <a
        href="tel:+524494480012"
        aria-label="Llamar por teléfono"
        className="rounded-full w-14 h-14 grid place-items-center bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
      >
        {/* Phone icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h2.47a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.01l-2.2 2.1z" />
        </svg>
      </a>
    </div>
  )
}


