import { CalendarClock, ClipboardList, Inbox, Loader2 } from 'lucide-react'
import { useState } from 'react'
import GraficoMetricas from '../components/GraficoMetricas'
import MapaRecomendaciones from '../components/MapaRecomendaciones'
import Topbar from '../components/Topbar'
import { useHistorial } from '../hooks/useHistorial'

export default function HistorialPage() {
  const { data = [], isLoading, error } = useHistorial()
  const [selected, setSelected] = useState(null)
  const active = selected || data[0]

  if (isLoading) {
    return (
      <div>
        <Topbar title="Historial" subtitle="Auditoria" />
        <div className="flex items-center justify-center gap-3 p-16">
          <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
          <span className="font-bold text-gray-500">Cargando historial...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Topbar title="Historial" subtitle="Auditoria" />
        <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-extrabold text-red-700">No se pudo cargar el historial.</p>
        </div>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div>
        <Topbar title="Historial" subtitle="Auditoria" />
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-100 text-gray-400">
            <Inbox className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-gray-950">No hay consultas registradas</h2>
        </div>
      </div>
    )
  }

  const usuario = active ? { lat: Number(active.recomendaciones[0]?.lat || -15.84), lon: Number(active.recomendaciones[0]?.lon || -70.02) } : null

  return (
    <div className="animate-rise">
      <Topbar title="Historial de consultas" subtitle="Auditoria de recomendaciones" />

      <div className="p-5 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <aside className="grid content-start gap-4">
            <div className="dashboard-band p-4">
              <p className="section-title">Consultas</p>
              <p className="mt-1 text-3xl font-black text-gray-950">{data.length}</p>
            </div>
            <div className="max-h-[calc(100vh-235px)] space-y-2 overflow-y-auto pr-1">
              {data.map((consulta) => (
                <button
                  key={consulta.consulta_id}
                  type="button"
                  onClick={() => setSelected(consulta)}
                  className={`w-full rounded-xl border p-3 text-left transition hover:shadow-card ${
                    active?.consulta_id === consulta.consulta_id
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-200'
                      : 'border-surface-200 bg-white hover:border-brand-200'
                  }`}
                >
                  <span className={`inline-flex items-center gap-2 text-sm font-extrabold ${active?.consulta_id === consulta.consulta_id ? 'text-brand-800' : 'text-gray-800'}`}>
                    <ClipboardList className="h-4 w-4" />
                    #{consulta.consulta_id}
                  </span>
                  <p className="mt-2 truncate text-sm font-extrabold text-gray-950">{consulta.tipo_atencion}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs font-bold text-gray-400">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {new Date(consulta.created_at).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <div className="grid content-start gap-5">
            <div className="dashboard-band flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="section-title">Detalle activo</p>
                <h2 className="mt-1 text-lg font-extrabold text-gray-950">Consulta #{active?.consulta_id}</h2>
              </div>
              <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-extrabold text-brand-700">
                {active?.recomendaciones?.length || 0} resultados
              </span>
            </div>
            <MapaRecomendaciones usuario={usuario} recomendaciones={active?.recomendaciones || []} />
            <GraficoMetricas recomendaciones={active?.recomendaciones || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
