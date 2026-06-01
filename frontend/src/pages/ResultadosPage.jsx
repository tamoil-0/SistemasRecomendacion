import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ClipboardList, GitCompareArrows, Percent, Route, SearchX } from 'lucide-react'
import AlertaClimatica from '../components/AlertaClimatica'
import GraficoMetricas from '../components/GraficoMetricas'
import ListaRecomendaciones from '../components/ListaRecomendaciones'
import MapaRecomendaciones from '../components/MapaRecomendaciones'
import Topbar from '../components/Topbar'

export default function ResultadosPage() {
  const { state } = useLocation()
  const [focusItem, setFocusItem] = useState(null)
  const recomendaciones = state?.resultado?.recomendaciones || []
  const usuario = useMemo(() => {
    if (!state?.consulta) return null
    return { lat: Number(state.consulta.lat), lon: Number(state.consulta.lon) }
  }, [state])

  const bestScore = recomendaciones.length ? Math.round(Math.max(...recomendaciones.map((item) => item.score_final)) * 100) : 0
  const avgDistance = recomendaciones.length ? (recomendaciones.reduce((sum, item) => sum + Number(item.distancia_km || 0), 0) / recomendaciones.length).toFixed(1) : '0.0'

  if (!state?.resultado) {
    return (
      <div>
        <Topbar title="Resultados" subtitle="Dashboard" />
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-100 text-gray-400">
            <SearchX className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-gray-950">Sin resultados activos</h2>
          <Link to="/buscar" className="btn-primary mt-6">
            Nueva consulta
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-rise">
      <Topbar title="Ranking de centros recomendados" subtitle="Resultado del modelo" />

      <div className="p-5 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to="/buscar" className="btn-secondary py-2">
            <ArrowLeft className="h-4 w-4" />
            Nueva consulta
          </Link>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi icon={GitCompareArrows} label="Modelo" value="Contenido" />
          <Kpi icon={ClipboardList} label="Resultados" value={recomendaciones.length} />
          <Kpi icon={Percent} label="Mejor score" value={`${bestScore}%`} />
          <Kpi icon={Route} label="Promedio" value={`${avgDistance} km`} />
        </div>

        <AlertaClimatica recomendaciones={recomendaciones} />

        <div className="mt-5 grid gap-5 xl:grid-cols-[420px_1fr]">
          <ListaRecomendaciones recomendaciones={recomendaciones} onFocus={setFocusItem} />
          <div className="grid content-start gap-5">
            <MapaRecomendaciones usuario={usuario} recomendaciones={recomendaciones} focusItem={focusItem} />
            <GraficoMetricas recomendaciones={recomendaciones} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Kpi({ icon: Icon, label, value }) {
  return (
    <div className="dashboard-band flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-gray-400">{label}</p>
      </div>
      <p className="text-lg font-black text-gray-950">{value}</p>
    </div>
  )
}
