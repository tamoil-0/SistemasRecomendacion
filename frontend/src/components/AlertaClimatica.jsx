import { AlertTriangle } from 'lucide-react'

export default function AlertaClimatica({ recomendaciones = [] }) {
  const active = recomendaciones.length > 0 && recomendaciones.every((item) => item.nivel_alerta >= 2)

  if (!active) {
    return null
  }

  return (
    <div className="mb-5 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3" role="alert">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-extrabold text-orange-800">Alerta climatica activa</p>
        <p className="text-sm font-semibold text-orange-700">Verifica accesibilidad antes del traslado.</p>
      </div>
    </div>
  )
}
