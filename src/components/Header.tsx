import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full grid place-items-center text-white" style={{background: 'var(--primary)'}}>
            ▲
          </div>
          <Link href="/" className="font-semibold tracking-tight font-display hover:opacity-80 transition-opacity">
            <span style={{color: 'var(--slate-900, #0f172a)'}}>AgriVolt</span>
          </Link>
        </div>
        
        <ul className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <li>
            <Link href="/#modelos" className="hover:text-slate-900 transition-colors">
              Modelos
            </Link>
          </li>
          <li>
            <Link href="/#soluciones" className="hover:text-slate-900 transition-colors">
              Soluciones
            </Link>
          </li>
          <li>
            <Link href="/#tecnologia" className="hover:text-slate-900 transition-colors">
              Tecnología
            </Link>
          </li>
          <li>
            <Link href="/#comparador" className="hover:text-slate-900 transition-colors">
              Comparador
            </Link>
          </li>
        </ul>
        
        <Link 
          href="/cotizar" 
          className="rounded-2xl px-4 py-2 text-white shadow hover:opacity-90 transition-opacity"
          style={{background: 'var(--primary)'}}
        >
          Cotizar
        </Link>
      </nav>
    </header>
  )
}