import { useNavigate } from 'react-router-dom'
import { Activity, Brain, MapPin, Shield } from 'lucide-react'
import Topbar from '../components/Topbar'
import UserForm from '../components/UserForm'
import { useRecomendaciones } from '../hooks/useRecomendaciones'

const kpis = [
  { icon: MapPin,   label: 'Cobertura',  value: 'Region Puno', sub: '13 provincias',       color: 'text-blue-400',    bg: 'bg-blue-500/8',    border: 'border-blue-400/15' },
  { icon: Brain,    label: 'Algoritmo',  value: 'Coseno + IA', sub: 'Similitud vectorial', color: 'text-brand-400',   bg: 'bg-brand-500/8',   border: 'border-brand-400/15' },
  { icon: Activity, label: 'Respuesta',  value: 'Tiempo real', sub: 'Latencia < 2s',       color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-400/15' },
  { icon: Shield,   label: 'Privacidad', value: 'Datos min.',  sub: 'Sin info. clinica',   color: 'text-orange-400',  bg: 'bg-orange-500/8',  border: 'border-orange-400/15' },
]

export default function BusquedaPage() {
  const navigate = useNavigate()
  const mutation = useRecomendaciones()

  async function handleSubmit(values) {
    const result = await mutation.mutateAsync(values)
    navigate('/resultados', { state: { consulta: values, resultado: result } })
  }

  return (
    <div className="animate-rise">
      <Topbar title="Nueva consulta" subtitle="Motor de recomendacion" />

      <div className="p-5 lg:p-8">
        {/* KPI strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map(({ icon: Icon, label, value, sub, color, bg, border }) => (
            <div key={label} className={`card-elevated flex items-center gap-3 rounded-2xl px-4 py-4`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50`}>
                <Icon className={`h-5 w-5 text-brand-600`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
                <p className="text-[13px] font-extrabold text-gray-900">{value}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {mutation.error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <p className="text-sm font-bold text-red-700">API no disponible. Verifica el backend.</p>
          </div>
        )}

        <UserForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
      </div>
    </div>
  )
}
