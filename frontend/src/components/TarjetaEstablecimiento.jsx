const alertaMeta = {
  0: ['Sin alerta', 'bg-green-100 text-green-800'],
  1: ['Aviso', 'bg-yellow-100 text-yellow-900'],
  2: ['Alerta', 'bg-orange-100 text-orange-900'],
  3: ['Alerta roja', 'bg-red-100 text-red-800'],
}

export default function TarjetaEstablecimiento({ item, onFocus }) {
  const [label, color] = alertaMeta[item.nivel_alerta] || alertaMeta[0]

  return (
    <article className="grid gap-3 rounded-lg app-surface p-4 transition hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary px-2 py-1 text-sm font-bold text-white">#{item.rank}</span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{item.categoria}</span>
          </div>
          <h3 className="mt-2 text-base font-bold text-slate-900">{item.nombre}</h3>
        </div>
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${color}`}>{label}</span>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-600">
          <span>Score final</span>
          <span>{Math.round(item.score_final * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full bg-health" style={{ width: `${Math.min(item.score_final * 100, 100)}%` }} />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm text-slate-700">
        <div>
          <dt className="font-semibold">Distancia</dt>
          <dd>{item.distancia_km} km</dd>
        </div>
        <div>
          <dt className="font-semibold">Horario</dt>
          <dd>{item.horario || 'No especificado'}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        {item.servicios.map((servicio) => (
          <span key={servicio} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
            {servicio}
          </span>
        ))}
      </div>

      <button type="button" onClick={() => onFocus?.(item)} className="btn-secondary px-3 py-2 text-sm">
        Ver en mapa
      </button>
    </article>
  )
}
