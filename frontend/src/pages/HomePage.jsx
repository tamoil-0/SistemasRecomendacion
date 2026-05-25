import { Link } from 'react-router-dom'
import { ArrowRight, Database, MapPinned, ShieldCheck, ThermometerSnowflake } from 'lucide-react'

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <div className="grid min-h-[calc(100vh-132px)] gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
        <div className="app-surface flex flex-col justify-between rounded-lg p-6 sm:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-primary">
              <Database className="h-4 w-4" aria-hidden="true" />
              Plataforma preventiva regional
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              Sistema de Recomendacion de Centros de Salud Preventiva
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
              Priorizacion operativa de establecimientos en Puno mediante servicios disponibles, distancia, capacidad resolutiva y condiciones climaticas vigentes.
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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric value="10" label="IPRESS semilla" />
            <Metric value="8" label="Servicios preventivos" />
            <Metric value="0-3" label="Niveles de alerta" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="app-surface overflow-hidden rounded-lg">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Vista operacional</p>
                <h2 className="text-base font-black text-slate-950">Mapa de decision preventiva</h2>
              </div>
              <span className="rounded-md bg-green-50 px-3 py-1 text-xs font-bold text-green-800">API activa</span>
            </div>
            <div className="map-visual relative h-[360px] overflow-hidden">
              <div className="absolute left-[16%] top-[22%] h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
              <Marker className="left-[36%] top-[38%]" color="bg-green-700" label="I-4" />
              <Marker className="left-[62%] top-[28%]" color="bg-yellow-500" label="I-3" />
              <Marker className="left-[70%] top-[62%]" color="bg-orange-600" label="II-1" />
              <Marker className="left-[44%] top-[70%]" color="bg-red-600" label="I-4" />
              <div className="absolute bottom-4 left-4 grid gap-2 rounded-md bg-white/95 p-3 text-xs font-semibold text-slate-700 shadow-panel">
                <Legend color="bg-green-700" text="sin alerta" />
                <Legend color="bg-yellow-500" text="aviso" />
                <Legend color="bg-orange-600" text="alerta" />
                <Legend color="bg-red-600" text="alerta roja" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Feature icon={MapPinned} title="Territorio" text="Ubicacion y radio de acceso." />
            <Feature icon={ThermometerSnowflake} title="Clima" text="Penalidad por alerta SENAMHI." />
            <Feature icon={ShieldCheck} title="Privacidad" text="Datos minimos y finalidad preventiva." />
          </div>
        </div>
      </div>
    </section>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="app-surface flex gap-3 rounded-lg p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-700">{text}</p>
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
