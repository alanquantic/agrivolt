import Link from 'next/link'

const tableData = [
  {
    spec: "Tanque (spray)",
    titan150: "70 L (73 L máx.)",
    pro100: "45 L (60 L opc.)", 
    edge70: "37.5 L"
  },
  {
    spec: "Flujo máx. spray",
    titan150: "40 L/min ±5%",
    pro100: "24 L/min ±5%",
    edge70: "24 L/min"
  },
  {
    spec: "Tamaño de gota",
    titan150: "10–300 μm",
    pro100: "10–300 μm",
    edge70: "10–300 μm"
  },
  {
    spec: "Esparcido",
    titan150: "100 L; hasta 240 kg/min",
    pro100: "Hasta 110 kg/min",
    edge70: "70 L; hasta 240 kg/min"
  },
  {
    spec: "Velocidad máx.",
    titan150: "13.8 m/s",
    pro100: "13.8 m/s",
    edge70: "13.8 m/s"
  },
  {
    spec: "Peso (con batería)",
    titan150: "75 kg",
    pro100: "54.6 kg",
    edge70: "—"
  },
  {
    spec: "Percepción",
    titan150: "Radar 360° + Lidar",
    pro100: "RTK + Radar + Lidar",
    edge70: "Visión compuesta"
  },
  {
    spec: "Protección",
    titan150: "IP67/IPX6K",
    pro100: "—",
    edge70: "IP67"
  },
  {
    spec: "FPV/Iluminación",
    titan150: "2K + IR nocturno",
    pro100: "—",
    edge70: "—"
  },
  {
    spec: "Izaje",
    titan150: "—",
    pro100: "Hasta 60 kg",
    edge70: "—"
  }
]

export default function CompareTable() {
  return (
    <section id="comparador" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
          Comparador rápido
        </h3>
        
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-slate-600">Especificación</th>
                <th className="text-left">
                  <span className="font-semibold">Titan 150</span>
                </th>
                <th className="text-left">
                  <span className="font-semibold">Pro 100</span>
                </th>
                <th className="text-left">
                  <span className="font-semibold">Edge 70</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="bg-white p-4 rounded-l-xl border border-black/5 text-sm font-medium">
                    {row.spec}
                  </td>
                  <td className="bg-white p-4 border border-black/5 text-sm">
                    {row.titan150}
                  </td>
                  <td className="bg-white p-4 border border-black/5 text-sm">
                    {row.pro100}
                  </td>
                  <td className="bg-white p-4 rounded-r-xl border border-black/5 text-sm">
                    {row.edge70}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6">
          <Link 
            href="/cotizar" 
            className="rounded-2xl px-5 py-3 bg-primary text-white inline-block hover:bg-primary/90 transition-colors"
          >
            Asesoría para elegir
          </Link>
        </div>
      </div>
    </section>
  )
}