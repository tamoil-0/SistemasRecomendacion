import { Clock3, GitCompareArrows, MapPin, Navigation, ShieldAlert, Star, Zap } from 'lucide-react'

const alertaMeta = {
  0: ['Sin alerta', 'bg-emerald-50 text-emerald-700 border-emerald-200'],
  1: ['Aviso', 'bg-yellow-50 text-yellow-700 border-yellow-200'],
  2: ['Alerta', 'bg-orange-50 text-orange-700 border-orange-200'],
  3: ['Alerta roja', 'bg-red-50 text-red-700 border-red-200'],
}

function getBadge(item, allItems) {
  if (item.rank === 1) return { label: 'Mejor opcion', icon: Star, cls: 'bg-brand-700 text-white border-brand-700' }
  const closest = allItems?.length ? allItems.reduce((a, b) => (Number(a.distancia_km) < Number(b.distancia_km) ? a : b)) : null
  if (closest?.establecimiento_id === item.establecimiento_id) return { label: 'Mas cercano', icon: Zap, cls: 'bg-blue-50 text-blue-700 border-blue-200' }
  if (item.nivel_alerta >= 2) return { label: 'Precaucion', icon: ShieldAlert, cls: 'bg-orange-50 text-orange-700 border-orange-200' }
  return null
}

export default function TarjetaEstablecimiento({ item, onFocus, allItems }) {
  const [alertLabel, alertColor] = alertaMeta[item.nivel_alerta] || alertaMeta[0]
  const score = Math.round(item.score_final * 100)
  const similarity = Math.round(item.score_similitud * 100)
  const penalty = Math.round(item.penalidad_clima * 100)
  const badge = getBadge(item, allItems)

  return (
    <article className="card group overflow-hidden rounded-xl">
      <div className="h-1 bg-surface-100">
        <div className="h-full bg-gradient-to-r from-brand-800 via-brand-600 to-brand-300" style={{ width: `${Math.min(score, 100)}%` }} />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-950 text-sm font-extrabold text-white">
                {item.rank}
              </span>
              <span className="rounded-md border border-surface-200 bg-surface-50 px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-gray-600">{item.categoria}</span>
              {badge && (
                <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-extrabold ${badge.cls}`}>
                  <badge.icon className="h-3 w-3" />
                  {badge.label}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-[15px] font-extrabold leading-6 text-gray-950 transition-colors group-hover:text-brand-700">{item.nombre}</h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-black leading-none text-brand-700">{score}%</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-gray-400">score</p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <MetricCard icon={MapPin} label="Distancia" value={`${item.distancia_km} km`} />
          <MetricCard icon={Clock3} label="Horario" value={item.horario || 'No especificado'} />
          <MetricCard icon={GitCompareArrows} label="Similitud" value={`${similarity}%`} />
          <MetricCard icon={ShieldAlert} label="Clima" value={`${penalty}%`} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.servicios.slice(0, 7).map((s) => (
            <span key={s} className="rounded-full border border-surface-200 bg-surface-50 px-2.5 py-1 text-xs font-bold text-gray-600">
              {s}
            </span>
          ))}
          {item.servicios.length > 7 && (
            <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-extrabold text-brand-700">+{item.servicios.length - 7}</span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className={`rounded-md border px-2.5 py-1 text-xs font-extrabold ${alertColor}`}>{alertLabel}</span>
          <button type="button" onClick={() => onFocus?.(item)} className="btn-secondary py-2 text-sm">
            <Navigation className="h-4 w-4" />
            Mapa
          </button>
        </div>
      </div>
    </article>
  )
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2">
      <dt className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.08em] text-gray-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-extrabold text-gray-950">{value}</dd>
    </div>
  )
}
