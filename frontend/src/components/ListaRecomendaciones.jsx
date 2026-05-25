import TarjetaEstablecimiento from './TarjetaEstablecimiento'

export default function ListaRecomendaciones({ recomendaciones = [], onFocus }) {
  if (!recomendaciones.length) {
    return <div className="bg-white p-5 text-sm text-slate-600 shadow-panel">Aun no hay recomendaciones para mostrar.</div>
  }

  return (
    <section className="grid gap-4" aria-label="Lista de recomendaciones">
      {recomendaciones.map((item) => (
        <TarjetaEstablecimiento key={`${item.establecimiento_id}-${item.rank}`} item={item} onFocus={onFocus} />
      ))}
    </section>
  )
}

