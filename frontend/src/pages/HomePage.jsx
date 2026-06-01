import { Link } from 'react-router-dom'
import { ArrowRight, Database, HeartPulse, MapPinned, Radar, ShieldCheck, ThermometerSun } from 'lucide-react'
import MetodoRecomendacion from '../components/MetodoRecomendacion'

const metrics = [
  ['200', 'Puntos urbanos'],
  ['16', 'Servicios preventivos'],
  ['3', 'Niveles de alerta'],
]

const workflow = [
  ['01', 'Captura territorial', 'Distrito, coordenadas, edad y servicio requerido.'],
  ['02', 'Calculo de prioridad', 'Distancia, capacidad, categoria y riesgo climatico.'],
  ['03', 'Decision operativa', 'Ranking, mapa, trazabilidad e historial por consulta.'],
]

export default function HomePage() {
  return (
    <section className="grid gap-6 animate-rise">
      <div className="grid min-h-[calc(100vh-132px)] overflow-hidden rounded-3xl app-surface scan-line lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative flex flex-col justify-between p-6 sm:p-10">
          <span className="orbital-glow right-10 top-8 h-20 w-20 bg-cyan-400/20" />
          <span className="orbital-glow bottom-20 left-12 h-14 w-14 bg-emerald-400/20 delay-1" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 shadow-glow">
              <Database className="h-4 w-4" aria-hidden="true" />
              Plataforma regional de apoyo preventivo
            </div>
            <h1 className="neon-text mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Sistema de Recomendacion de Centros de Salud Preventiva
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
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
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/70">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid border-t border-cyan-100/10 bg-slate-950/25 lg:border-l lg:border-t-0">
          <div className="map-visual relative min-h-[360px] border-b border-slate-200">
            <div className="absolute left-6 top-6 rounded-2xl glass-panel p-4">
              <p className="section-title">Vista territorial</p>
              <h2 className="mt-1 text-lg font-black text-white">Puno operativo</h2>
            </div>
            <div className="absolute right-6 top-8 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/10 text-cyan-100 shadow-glow">
              <Radar className="h-9 w-9 animate-pulse" aria-hidden="true" />
            </div>
            <Marker className="left-[28%] top-[32%]" color="bg-primary" label="Usuario" />
            <Marker className="left-[48%] top-[44%]" color="bg-health" label="I-4" />
            <Marker className="left-[67%] top-[29%]" color="bg-yellow-500" label="I-3" />
            <Marker className="left-[62%] top-[68%]" color="bg-orange-600" label="II-1" />
            <div className="absolute bottom-5 left-5 grid gap-2 rounded-2xl glass-panel p-3 text-xs font-bold text-slate-200">
              <Legend color="bg-health" text="sin alerta" />
              <Legend color="bg-yellow-500" text="aviso" />
              <Legend color="bg-orange-600" text="alerta activa" />
            </div>
          </div>

          <div className="grid gap-3 p-5">
            <Feature icon={HeartPulse} title="Analitica preventiva" text="Prioriza atencion primaria con datos territoriales y servicios disponibles." />
            <Feature icon={MapPinned} title="Cobertura territorial" text="Coordenadas y radio maximo para priorizar establecimientos cercanos." />
            <Feature icon={ThermometerSun} title="Riesgo climatico" text="Penalidad por alerta para mejorar la decision antes del traslado." />
            <Feature icon={ShieldCheck} title="Trazabilidad" text="Historial de consultas con datos minimos y finalidad preventiva." />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {workflow.map(([step, title, text]) => (
          <article key={step} className="app-surface rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-sm font-black text-cyan-100">{step}</span>
            <h2 className="mt-3 text-lg font-black text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
          </article>
        ))}
      </div>
      <MetodoRecomendacion />
    </section>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="flex gap-3 rounded-2xl border border-cyan-100/10 bg-white/5 p-4 transition hover:bg-cyan-300/10">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-black text-white">{title}</h2>
        <p className="text-sm leading-6 text-slate-300">{text}</p>
      </div>
    </article>
  )
}

function Marker({ className, color, label }) {
  return (
    <div className={`absolute ${className}`}>
      <span className={`block h-4 w-4 rounded-full ${color} ring-4 ring-white/70 shadow-lg`} />
      <span className="mt-2 inline-block rounded-lg border border-cyan-100/10 bg-slate-950/80 px-2 py-1 text-xs font-black text-cyan-50 shadow-sm">{label}</span>
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
