import { CalendarClock, ClipboardList } from 'lucide-react'
import { useState } from 'react'
import GraficoMetricas from '../components/GraficoMetricas'
import MapaRecomendaciones from '../components/MapaRecomendaciones'
import { useHistorial } from '../hooks/useHistorial'

export default function HistorialPage() {
  const { data = [], isLoading, error } = useHistorial()
  const [selected, setSelected] = useState(null)
  const active = selected || data[0]

  if (isLoading) {
    return <div className="app-surface rounded-2xl p-5 font-semibold text-slate-300">Cargando historial...</div>
  }

  if (error) {
    return <div className="rounded-2xl border border-red-300/30 bg-red-500/10 p-5 font-semibold text-red-100">No se pudo cargar el historial.</div>
  }

  if (!data.length) {
    return (
      <section className="app-surface mx-auto max-w-3xl rounded-2xl p-6">
        <p className="section-title">Historial</p>
        <h1 className="mt-2 text-2xl font-black text-white">No hay consultas registradas</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Cuando ejecutes una consulta, el sistema mostrara aqui su trazabilidad y recomendaciones.</p>
      </section>
    )
  }

  const usuario = active ? { lat: Number(active.recomendaciones[0]?.lat || -15.84), lon: Number(active.recomendaciones[0]?.lon || -70.02) } : null

  return (
    <section className="grid gap-5 animate-rise">
      <div className="page-band -mx-4 -mt-6 px-4 py-7 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-title">Auditoria de consultas</p>
          <h1 className="neon-text mt-2 text-3xl font-black">Historial</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">Revisa consultas previas, recomendaciones generadas y metricas de score.</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <aside className="grid content-start gap-3">
          <div className="app-surface rounded-2xl p-4">
            <p className="section-title">Consultas</p>
            <h2 className="mt-1 text-xl font-black text-white">{data.length} registros</h2>
          </div>
          {data.map((consulta) => (
            <button
              key={consulta.consulta_id}
              type="button"
              onClick={() => setSelected(consulta)}
              className={`rounded-2xl border bg-white/5 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary ${active?.consulta_id === consulta.consulta_id ? 'border-primary ring-2 ring-cyan-300/20' : 'border-cyan-100/10'}`}
            >
              <span className="inline-flex items-center gap-2 text-sm font-black text-primary">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Consulta #{consulta.consulta_id}
              </span>
              <p className="mt-2 font-black text-white">{consulta.tipo_atencion}</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(consulta.created_at).toLocaleString()}
              </p>
            </button>
          ))}
        </aside>
        <div className="grid content-start gap-5">
          <div className="app-surface rounded-2xl p-4">
            <p className="section-title">Detalle activo</p>
            <h2 className="mt-1 text-xl font-black text-white">Consulta #{active?.consulta_id}</h2>
            <p className="mt-1 text-sm text-slate-300">{active?.recomendaciones?.length || 0} recomendaciones guardadas</p>
          </div>
          <MapaRecomendaciones usuario={usuario} recomendaciones={active?.recomendaciones || []} />
          <GraficoMetricas recomendaciones={active?.recomendaciones || []} />
        </div>
      </div>
    </section>
  )
}
