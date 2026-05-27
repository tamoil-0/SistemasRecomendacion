import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ClipboardList, GitCompareArrows, Percent, Route } from 'lucide-react'
import AlertaClimatica from '../components/AlertaClimatica'
import GraficoMetricas from '../components/GraficoMetricas'
import ListaRecomendaciones from '../components/ListaRecomendaciones'
import MapaRecomendaciones from '../components/MapaRecomendaciones'
import MetodoRecomendacion from '../components/MetodoRecomendacion'

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
      <section className="mx-auto max-w-3xl rounded-lg app-surface p-6">
        <p className="section-title">Resultados</p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">Sin resultados activos</h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">Ejecuta una consulta para visualizar el dashboard de recomendaciones.</p>
        <Link to="/buscar" className="btn-primary mt-5">
          Ir a busqueda
        </Link>
      </section>
    )
  }

  return (
    <section className="grid gap-5">
      <div className="page-band -mx-4 -mt-6 px-4 py-7 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/buscar" className="btn-ghost mb-4 px-0">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Nueva consulta
          </Link>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-title">Resultado del modelo</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950">Ranking de centros recomendados</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">Consulta #{state.resultado.consulta_id}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              <Kpi icon={GitCompareArrows} label="Modelo" value="Contenido" />
              <Kpi icon={ClipboardList} label="Resultados" value={recomendaciones.length} />
              <Kpi icon={Percent} label="Mejor score" value={`${bestScore}%`} />
              <Kpi icon={Route} label="Dist. prom." value={`${avgDistance} km`} />
            </div>
          </div>
        </div>
      </div>

      <AlertaClimatica recomendaciones={recomendaciones} />
      <MetodoRecomendacion />
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <ListaRecomendaciones recomendaciones={recomendaciones} onFocus={setFocusItem} />
        <div className="grid content-start gap-5">
          <MapaRecomendaciones usuario={usuario} recomendaciones={recomendaciones} focusItem={focusItem} />
          <GraficoMetricas recomendaciones={recomendaciones} />
        </div>
      </div>
    </section>
  )
}

function Kpi({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
    </div>
  )
}
