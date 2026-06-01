import { SearchX } from 'lucide-react'
import TarjetaEstablecimiento from './TarjetaEstablecimiento'

export default function ListaRecomendaciones({ recomendaciones = [], onFocus }) {
  if (!recomendaciones.length) {
    return (
      <div className="dashboard-band flex flex-col items-center p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-100 text-gray-400">
          <SearchX className="h-7 w-7" />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500">Aun no hay recomendaciones para mostrar.</p>
      </div>
    )
  }

  return (
    <section className="grid content-start gap-3" aria-label="Lista de recomendaciones">
      <div className="dashboard-band flex items-center justify-between gap-4 p-4">
        <div>
        <p className="section-title">Ranking sugerido</p>
          <h2 className="mt-1 text-base font-extrabold text-gray-950">Establecimientos priorizados</h2>
        </div>
        <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-extrabold text-brand-700">{recomendaciones.length}</span>
      </div>
      {recomendaciones.map((item) => (
        <TarjetaEstablecimiento key={`${item.establecimiento_id}-${item.rank}`} item={item} onFocus={onFocus} allItems={recomendaciones} />
      ))}
    </section>
  )
}
