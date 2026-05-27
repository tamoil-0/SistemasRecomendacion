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
    return <div className="app-surface rounded-lg p-5 font-semibold text-slate-700">Cargando historial...</div>
  }

  if (error) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-5 font-semibold text-red-800">No se pudo cargar el historial.</div>
  }

  if (!data.length) {
    return (
      <section className="app-surface mx-auto max-w-3xl rounded-lg p-6">
        <p className="section-title">Historial</p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">No hay consultas registradas</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Cuando ejecutes una consulta, el sistema mostrara aqui su trazabilidad y recomendaciones.</p>
      </section>
    )
  }

  const usuario = active ? { lat: Number(active.recomendaciones[0]?.lat || -15.84), lon: Number(active.recomendaciones[0]?.lon || -70.02) } : null

  return (
    <section className="grid gap-5">
      <div className="page-band -mx-4 -mt-6 px-4 py-7 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-title">Auditoria de consultas</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Historial</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">Revisa consultas previas, recomendaciones generadas y metricas de score.</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <aside className="grid content-start gap-3">
          <div className="app-surface rounded-lg p-4">
            <p className="section-title">Consultas</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{data.length} registros</h2>
          </div>
          {data.map((consulta) => (
            <button
              key={consulta.consulta_id}
              type="button"
              onClick={() => setSelected(consulta)}
              className={`rounded-lg border bg-white p-4 text-left shadow-sm transition hover:border-primary ${active?.consulta_id === consulta.consulta_id ? 'border-primary ring-2 ring-blue-100' : 'border-slate-200'}`}
            >
              <span className="inline-flex items-center gap-2 text-sm font-black text-primary">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Consulta #{consulta.consulta_id}
              </span>
              <p className="mt-2 font-black text-slate-950">{consulta.tipo_atencion}</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(consulta.created_at).toLocaleString()}
              </p>
            </button>
          ))}
        </aside>
        <div className="grid content-start gap-5">
          <div className="app-surface rounded-lg p-4">
            <p className="section-title">Detalle activo</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Consulta #{active?.consulta_id}</h2>
            <p className="mt-1 text-sm text-slate-600">{active?.recomendaciones?.length || 0} recomendaciones guardadas</p>
          </div>
          <MapaRecomendaciones usuario={usuario} recomendaciones={active?.recomendaciones || []} />
          <GraficoMetricas recomendaciones={active?.recomendaciones || []} />
        </div>
      </div>
    </section>
  )
}
