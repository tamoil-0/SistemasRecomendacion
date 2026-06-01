import { Brain, GitCompareArrows, MapPinned, ShieldCheck } from 'lucide-react'

const steps = [
  { icon: GitCompareArrows, title: 'Contenido', value: 'servicio' },
  { icon: Brain, title: 'Similitud', value: 'coseno' },
  { icon: MapPinned, title: 'Distancia', value: 'haversine' },
  { icon: ShieldCheck, title: 'Clima', value: 'SENAMHI' },
]

export default function MetodoRecomendacion({ compact = false }) {
  return (
    <section className="dashboard-band p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="section-title">Modelo</p>
          <h2 className="mt-1 text-base font-extrabold text-gray-950">Ranking preventivo híbrido</h2>
        </div>
        <span className="w-fit rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 font-mono text-xs font-extrabold text-brand-800">
          score = sim * distancia * capacidad * clima
        </span>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? 'sm:grid-cols-4' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
        {steps.map(({ icon: Icon, title, value }) => (
          <article key={title} className="rounded-xl border border-surface-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-gray-950">{title}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-gray-400">{value}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
