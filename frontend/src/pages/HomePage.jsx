import { Link } from 'react-router-dom'
import { ArrowRight, Database, MapPinned, ShieldCheck, ThermometerSun } from 'lucide-react'
import MetodoRecomendacion from '../components/MetodoRecomendacion'

const metrics = [
  ['10', 'IPRESS base'],
  ['8', 'Servicios preventivos'],
  ['3', 'Niveles de alerta'],
]

const workflow = [
  ['01', 'Captura territorial', 'Distrito, coordenadas, edad y servicio requerido.'],
  ['02', 'Calculo de prioridad', 'Distancia, capacidad, categoria y riesgo climatico.'],
  ['03', 'Decision operativa', 'Ranking, mapa, trazabilidad e historial por consulta.'],
]

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <div className="grid min-h-[calc(100vh-132px)] overflow-hidden rounded-lg app-surface lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-between p-6 sm:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-black text-primary">
              <Database className="h-4 w-4" aria-hidden="true" />
              Plataforma regional de apoyo preventivo
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Sistema de Recomendacion de Centros de Salud Preventiva
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
              Consulta establecimientos de Puno con un ranking explicable que integra RENIPRESS, distancia geografica, servicios disponibles y alertas SENAMHI.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/buscar" className="btn-primary">
                Iniciar consulta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/login" className="btn-secondary">
                Acceder al sistema
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {metrics.map(([value, label]) => (
              <div key={label} className="kpi-card">
                <p className="text-3xl font-black text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid border-t border-slate-200 bg-slate-50 lg:border-l lg:border-t-0">
          <div className="map-visual relative min-h-[360px] border-b border-slate-200">
            <div className="absolute left-6 top-6 rounded-md bg-white/95 p-4 shadow-panel">
              <p className="section-title">Vista territorial</p>
              <h2 className="mt-1 text-lg font-black text-slate-950">Puno operativo</h2>
            </div>
            <Marker className="left-[28%] top-[32%]" color="bg-primary" label="Usuario" />
            <Marker className="left-[48%] top-[44%]" color="bg-health" label="I-4" />
            <Marker className="left-[67%] top-[29%]" color="bg-yellow-500" label="I-3" />
            <Marker className="left-[62%] top-[68%]" color="bg-orange-600" label="II-1" />
            <div className="absolute bottom-5 left-5 grid gap-2 rounded-md bg-white/95 p-3 text-xs font-bold text-slate-700 shadow-panel">
              <Legend color="bg-health" text="sin alerta" />
              <Legend color="bg-yellow-500" text="aviso" />
              <Legend color="bg-orange-600" text="alerta activa" />
            </div>
          </div>

          <div className="grid gap-3 p-5">
            <Feature icon={MapPinned} title="Cobertura territorial" text="Coordenadas y radio maximo para priorizar establecimientos cercanos." />
            <Feature icon={ThermometerSun} title="Riesgo climatico" text="Penalidad por alerta para mejorar la decision antes del traslado." />
            <Feature icon={ShieldCheck} title="Trazabilidad" text="Historial de consultas con datos minimos y finalidad preventiva." />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {workflow.map(([step, title, text]) => (
          <article key={step} className="app-surface rounded-lg p-5">
            <span className="text-sm font-black text-primary">{step}</span>
            <h2 className="mt-2 text-lg font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
      <MetodoRecomendacion />
    </section>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-black text-slate-950">{title}</h2>
        <p className="text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </article>
  )
}

function Marker({ className, color, label }) {
  return (
    <div className={`absolute ${className}`}>
      <span className={`block h-4 w-4 rounded-full ${color} ring-4 ring-white shadow-lg`} />
      <span className="mt-2 inline-block rounded-md bg-white/95 px-2 py-1 text-xs font-black text-slate-800 shadow-sm">{label}</span>
    </div>
  )
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{text}</span>
    </div>
  )
}
