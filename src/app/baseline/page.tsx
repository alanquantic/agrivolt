export default function Baseline() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full grid place-items-center text-white" style={{ background: 'var(--primary)' }}>▲</div>
            <span className="font-semibold tracking-tight font-display">AgriAero</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <li><a href="#modelos" className="hover:text-slate-900">Modelos</a></li>
            <li><a href="#soluciones" className="hover:text-slate-900">Soluciones</a></li>
            <li><a href="#tecnologia" className="hover:text-slate-900">Tecnología</a></li>
            <li><a href="#comparador" className="hover:text-slate-900">Comparador</a></li>
          </ul>
          <a href="#contacto" className="rounded-2xl px-4 py-2 text-white shadow" style={{ background: 'var(--primary)' }}>Cotizar</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1560179406-1c7f87b5c9d8?q=80&w=2000&auto=format&fit=crop">
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(255,255,255,0) 100%)' }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display fade-in [animation-delay:0.05s]">
            Drones agrícolas que multiplican la eficiencia.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 fade-in [animation-delay:0.12s]">
            Pulverización, sensado y mapeo con precisión centimétrica. Tres modelos para necesidades distintas, un estándar de calidad.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 fade-in [animation-delay:0.2s]">
            <a href="#contacto" className="rounded-2xl px-5 py-3 text-white inline-flex items-center gap-2 shadow" style={{ background: 'var(--primary)' }}>
              Solicitar demo
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4"><path d="M9 18l6-6-6-6"></path></svg>
            </a>
            <a href="#modelos" className="rounded-2xl px-5 py-3 bg-white/90 text-slate-900 hover:bg-white inline-flex items-center gap-2">
              Ver modelos
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: '5+ horas', l: 'Autonomía', d: '*Modelo híbrido', delay: '0.25s' },
              { v: '100 km', l: 'Alcance', d: 'Control + video', delay: '0.28s' },
              { v: '120 ha/día', l: 'Cobertura', d: 'Rociado eficiente', delay: '0.31s' },
              { v: '< 5 min', l: 'Despliegue', d: 'Listo para operar', delay: '0.34s' },
            ].map((s, i) => (
              <div key={i} className={`group relative fade-in [animation-delay:${s.delay}]`}>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm border border-black/5 transition-transform group-hover:-translate-y-1">
                  <div className="p-2 rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)' }}>●</div>
                  <div>
                    <div className="text-2xl font-semibold leading-none font-display">{s.v}</div>
                    <div className="text-sm text-slate-600">{s.l}</div>
                    <div className="mt-1 text-xs text-slate-500">{s.d}</div>
                  </div>
                </div>
                <div className="absolute inset-x-6 -bottom-1 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition" style={{ background: 'var(--primary)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section id="modelos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Tres modelos. <span style={{ color: 'var(--primary)' }}>Una plataforma.</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl">Electrónica de grado industrial, seguridad activa y software listo para agricultura de precisión.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((k) => (
            <div key={k} className="group overflow-hidden bg-white border border-black/5 shadow-lg hover:shadow-2xl transition-all rounded-2xl">
              <div className="relative">
                <img src={`https://picsum.photos/seed/${k}/800/400`} alt="modelo" className="h-56 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 text-xs rounded-full text-white" style={{ background: 'var(--primary)' }}>Nuevo</span>
                  <button className="rounded-full bg-white/95 text-slate-900 hover:bg-white px-3 py-1 text-sm font-medium shadow">Ficha técnica</button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold font-display">Modelo {k}</h3>
                <p className="text-slate-600 mt-1">Claim del modelo {k}.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {['Bullet 1','Bullet 2','Bullet 3','Bullet 4'].map((b,i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="h-4 w-4 mt-1"><path d="M20 6L9 17l-5-5"></path></svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Capacidad','Autonomía','Precisión','Terreno'].map((d,i) => (
                    <div key={i} className="rounded-2xl border border-black/5 p-3 bg-slate-50">
                      <div className="text-xs uppercase tracking-wide text-slate-700">{d}</div>
                      <div className="text-lg font-semibold mt-1">—</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECNOLOGÍA (negro) */}
      <section id="tecnologia" className="py-20 text-white" style={{ background: 'var(--bg-dark)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Tecnología para <span style={{ color: 'var(--primary)' }}>entornos exigentes</span>
          </h3>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Anti‑jamming GNSS y datos','Operación en áreas con interferencia activa.'],
              ['RTK centimétrico','Georreferenciación de precisión.'],
              ['Seguimiento de terreno','Altura constante con radar altímetro.'],
              ['Climas extremos','-10 a 50 °C.'],
              ['Bitácora y trazas','Rutas, dosis y reportes.'],
              ['Despliegue en 5 min','Menos tiempo armando.'],
            ].map(([t,d],i) => (
              <div key={i} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl grid place-items-center mb-3" style={{ background: 'color-mix(in srgb, var(--primary) 13%, transparent)', color: 'var(--primary)' }}>●</div>
                <h4 className="text-lg font-semibold">{t}</h4>
                <p className="text-sm text-white/80 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARADOR */}
      <section id="comparador" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight font-display">Comparador rápido</h3>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-slate-600">Especificación</th>
                  <th className="text-left"><span className="font-semibold">AeroField 10</span></th>
                  <th className="text-left"><span className="font-semibold">AeroField 20</span></th>
                  <th className="text-left"><span className="font-semibold">AeroHybrid 8</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tipo de energía','Baterías Li‑ion','Baterías Li‑ion','Híbrido gas‑eléctrico'],
                  ['Capacidad del tanque','10 L','20 L','—'],
                  ['Carga útil máx.','10 kg','20 kg','10 kg'],
                  ['Autonomía','20–28 min','20–30 min','5+ horas'],
                  ['Ancho de labor','4–6 m','6–8 m','N/A'],
                  ['RTK/PPK','Sí','Sí','Sí'],
                  ['Seguimiento de terreno','Radar + Visión','Radar + Visión','Radar'],
                ].map((row,i) => (
                  <tr key={i}>
                    <td className="bg-white p-4 rounded-l-xl border border-black/5 text-sm font-medium">{row[0]}</td>
                    <td className="bg-white p-4 border border-black/5 text-sm">{row[1]}</td>
                    <td className="bg-white p-4 border border-black/5 text-sm">{row[2]}</td>
                    <td className="bg-white p-4 rounded-r-xl border border-black/5 text-sm">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <a href="#contacto" className="rounded-2xl px-5 py-3 text-white inline-block" style={{ background: 'var(--primary)' }}>Asesoría para elegir</a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-display font-bold">Hablemos de tu operación</h4>
              <p className="text-slate-600 mt-2">Cuéntanos tus cultivos, hectáreas y necesidades específicas.</p>
              <ul className="mt-4 text-sm text-slate-700 space-y-1">
                <li>📞 +52 000 000 0000</li>
                <li>✉️ ventas@agriaero.mx</li>
                <li>📍 Aguascalientes, México</li>
              </ul>
            </div>
            <form className="bg-slate-50 p-6 rounded-2xl border border-black/5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="px-3 py-2 rounded-xl border border-black/10" placeholder="Nombre" />
                <input className="px-3 py-2 rounded-xl border border-black/10" placeholder="Email" />
                <input className="px-3 py-2 rounded-xl border border-black/10 sm:col-span-2" placeholder="Teléfono" />
                <textarea className="px-3 py-2 rounded-xl border border-black/10 sm:col-span-2" rows={4} placeholder="Cuéntanos tu caso" />
              </div>
              <button type="button" className="mt-4 rounded-2xl px-5 py-3 text-white" style={{ background: 'var(--primary)' }}>Enviar</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white" style={{ background: 'var(--primary)' }}>▲</div>
              <span className="font-semibold">AgriAero</span>
            </div>
            <p className="text-sm text-slate-600 mt-3">Drones agrícolas listos para el campo. Tecnología de clase industrial con soporte experto.</p>
          </div>
          <div>
            <h5 className="font-semibold">Contacto</h5>
            <ul className="text-sm text-slate-600 mt-2 space-y-1">
              <li>+52 000 000 0000</li>
              <li>ventas@agriaero.mx</li>
              <li>Aguascalientes, México</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Enlaces</h5>
            <ul className="text-sm text-slate-600 mt-2 space-y-1">
              <li><a href="#modelos">Modelos</a></li>
              <li><a href="#soluciones">Soluciones</a></li>
              <li><a href="#tecnologia">Tecnología</a></li>
              <li><a href="#comparador">Comparador</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">© AgriAero. Todos los derechos reservados.</div>
      </footer>
    </main>
  )
}


