import { AlertTriangle } from 'lucide-react'

export default function AlertaClimatica({ recomendaciones = [] }) {
  const active = recomendaciones.length > 0 && recomendaciones.every((item) => item.nivel_alerta >= 2)

  if (!active) {
    return null
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-300/30 border-l-4 border-l-red-300 bg-red-500/10 p-4 text-red-100 shadow-panel" role="alert">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="text-sm font-medium">
        Todos los establecimientos recomendados se encuentran en zonas con alerta climatica activa. Se recomienda verificar accesibilidad vial antes de trasladarse.
      </p>
    </div>
  )
}

