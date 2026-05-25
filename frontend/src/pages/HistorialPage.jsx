import { useState } from 'react'
import GraficoMetricas from '../components/GraficoMetricas'
import MapaRecomendaciones from '../components/MapaRecomendaciones'
import { useHistorial } from '../hooks/useHistorial'

export default function HistorialPage() {
  const { data = [], isLoading, error } = useHistorial()
  const [selected, setSelected] = useState(null)
  const active = selected || data[0]

  if (isLoading) {
    return <div className="bg-white p-5 shadow-panel">Cargando historial...</div>
  }

  if (error) {
    return <div className="bg-red-50 p-5 text-red-800 shadow-panel">No se pudo cargar el historial.</div>
  }

  if (!data.length) {
    return <div className="bg-white p-5 text-slate-700 shadow-panel">No hay consultas registradas para este usuario.</div>
  }

  const usuario = active ? { lat: Number(active.recomendaciones[0]?.lat || -15.84), lon: Number(active.recomendaciones[0]?.lon || -70.02) } : null

  return (
    <section className="grid gap-5 lg:grid-cols-[340px_1fr]">
      <aside className="grid content-start gap-3">
        <h1 className="text-2xl font-bold text-slate-950">Historial</h1>
        {data.map((consulta) => (
          <button
            key={consulta.consulta_id}
            type="button"
            onClick={() => setSelected(consulta)}
            className={`text-left bg-white p-4 shadow-panel ${active?.consulta_id === consulta.consulta_id ? 'ring-2 ring-primary' : ''}`}
          >
            <span className="text-sm font-bold text-primary">Consulta #{consulta.consulta_id}</span>
            <p className="text-sm text-slate-700">{consulta.tipo_atencion}</p>
            <p className="text-xs text-slate-500">{new Date(consulta.created_at).toLocaleString()}</p>
          </button>
        ))}
      </aside>
      <div className="grid gap-5">
        <MapaRecomendaciones usuario={usuario} recomendaciones={active?.recomendaciones || []} />
        <GraficoMetricas recomendaciones={active?.recomendaciones || []} />
      </div>
    </section>
  )
}

