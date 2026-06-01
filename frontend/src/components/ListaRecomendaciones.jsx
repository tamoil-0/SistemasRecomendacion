import TarjetaEstablecimiento from './TarjetaEstablecimiento'

export default function ListaRecomendaciones({ recomendaciones = [], onFocus }) {
  if (!recomendaciones.length) {
    return <div className="app-surface rounded-2xl p-5 text-sm font-semibold text-slate-300">Aun no hay recomendaciones para mostrar.</div>
  }

  return (
    <section className="grid content-start gap-4" aria-label="Lista de recomendaciones">
      <div className="app-surface rounded-2xl p-4">
        <p className="section-title">Ranking sugerido</p>
        <h2 className="mt-1 text-xl font-black text-white">Establecimientos priorizados</h2>
        <p className="mt-1 text-sm text-slate-300">Ordenados por score final y condicion climatica.</p>
      </div>
      {recomendaciones.map((item) => (
        <TarjetaEstablecimiento key={`${item.establecimiento_id}-${item.rank}`} item={item} onFocus={onFocus} />
      ))}
    </section>
  )
}

