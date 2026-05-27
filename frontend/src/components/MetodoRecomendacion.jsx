import { GitCompareArrows, MapPinned, ShieldCheck, SlidersHorizontal } from 'lucide-react'

const steps = [
  {
    icon: GitCompareArrows,
    title: 'Filtrado basado en contenido',
    text: 'Se construye un perfil con el tipo de atencion solicitado y se compara con los servicios disponibles de cada establecimiento.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Similitud coseno',
    text: 'El sistema representa usuario y establecimientos como vectores, luego calcula que tan parecidos son para ordenar candidatos.',
  },
  {
    icon: MapPinned,
    title: 'Filtro territorial',
    text: 'Primero descarta establecimientos fuera del radio maximo y despues incorpora la distancia al ranking final.',
  },
  {
    icon: ShieldCheck,
    title: 'Penalidad climatica',
    text: 'Si existe alerta SENAMHI, el score se reduce para evitar recomendar rutas o zonas con mayor riesgo operativo.',
  },
]

export default function MetodoRecomendacion({ compact = false }) {
  return (
    <section className="app-surface rounded-lg p-5">
      <p className="section-title">Metodo del recomendador</p>
      <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">Recomendacion hibrida con prioridad preventiva</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            La logica principal es basada en contenido. El ranking final combina similitud del servicio, distancia, capacidad disponible y penalidad por clima.
          </p>
        </div>
        <div className="rounded-md bg-blue-50 px-3 py-2 text-sm font-black text-primary">score final = similitud x ajuste climatico</div>
      </div>
      <div className={`mt-5 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-4'}`}>
        {steps.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary shadow-sm">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
