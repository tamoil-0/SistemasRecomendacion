import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AlertaClimatica from '../components/AlertaClimatica'
import GraficoMetricas from '../components/GraficoMetricas'
import ListaRecomendaciones from '../components/ListaRecomendaciones'
import MapaRecomendaciones from '../components/MapaRecomendaciones'

export default function ResultadosPage() {
  const { state } = useLocation()
  const [focusItem, setFocusItem] = useState(null)
  const recomendaciones = state?.resultado?.recomendaciones || []
  const usuario = useMemo(() => {
    if (!state?.consulta) return null
    return { lat: Number(state.consulta.lat), lon: Number(state.consulta.lon) }
  }, [state])

  if (!state?.resultado) {
    return (
      <section className="bg-white p-6 shadow-panel">
        <h1 className="text-xl font-bold text-slate-950">Sin resultados activos</h1>
        <p className="mt-2 text-sm text-slate-700">Ejecuta una consulta para visualizar el dashboard de recomendaciones.</p>
        <Link to="/buscar" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
          Ir a busqueda
        </Link>
      </section>
    )
  }

  return (
    <section className="grid gap-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Resultados de recomendacion</h1>
          <p className="text-sm text-slate-700">Consulta #{state.resultado.consulta_id}</p>
        </div>
      </div>
      <AlertaClimatica recomendaciones={recomendaciones} />
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <ListaRecomendaciones recomendaciones={recomendaciones} onFocus={setFocusItem} />
        <div className="grid gap-5">
          <MapaRecomendaciones usuario={usuario} recomendaciones={recomendaciones} focusItem={focusItem} />
          <GraficoMetricas recomendaciones={recomendaciones} />
        </div>
      </div>
    </section>
  )
}

