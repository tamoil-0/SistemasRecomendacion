import { Clock3, GitCompareArrows, MapPin, Navigation, ShieldAlert } from 'lucide-react'

const alertaMeta = {
  0: ['Sin alerta', 'bg-green-50 text-green-800 border-green-200'],
  1: ['Aviso', 'bg-yellow-50 text-yellow-900 border-yellow-200'],
  2: ['Alerta', 'bg-orange-50 text-orange-900 border-orange-200'],
  3: ['Alerta roja', 'bg-red-50 text-red-800 border-red-200'],
}

export default function TarjetaEstablecimiento({ item, onFocus }) {
  const [label, color] = alertaMeta[item.nivel_alerta] || alertaMeta[0]
  const score = Math.round(item.score_final * 100)
  const similarity = Math.round(item.score_similitud * 100)
  const penalty = Math.round(item.penalidad_clima * 100)

  return (
    <article className="rounded-lg app-surface p-4 transition hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary px-2.5 py-1 text-sm font-black text-white">#{item.rank}</span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{item.categoria}</span>
          </div>
          <h3 className="mt-3 text-base font-black leading-6 text-slate-950">{item.nombre}</h3>
        </div>
        <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-black ${color}`}>{label}</span>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs font-bold text-slate-600">
          <span>Score final</span>
          <span>{score}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-health" style={{ width: `${Math.min(score, 100)}%` }} />
        </div>
      </div>

      <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-3">
        <p className="text-xs font-black uppercase tracking-wide text-primary">Por que se recomienda</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          Coincide con el servicio solicitado, esta dentro del radio de busqueda y mantiene un balance favorable entre similitud, distancia y riesgo climatico.
        </p>
      </div>

      <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <Info icon={MapPin} label="Distancia" value={`${item.distancia_km} km`} />
        <Info icon={Clock3} label="Horario" value={item.horario || 'No especificado'} />
        <Info icon={GitCompareArrows} label="Similitud" value={`${similarity}%`} />
        <Info icon={ShieldAlert} label="Penalidad clima" value={`${penalty}%`} />
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.servicios.map((servicio) => (
          <span key={servicio} className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-primary">
            {servicio}
          </span>
        ))}
      </div>

      <button type="button" onClick={() => onFocus?.(item)} className="btn-secondary mt-4 px-3 py-2 text-sm">
        <Navigation className="h-4 w-4" aria-hidden="true" />
        Ver en mapa
      </button>
    </article>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900">{value}</dd>
    </div>
  )
}
