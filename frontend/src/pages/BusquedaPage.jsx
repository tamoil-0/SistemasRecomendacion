import { useNavigate } from 'react-router-dom'
import { Clock3, Map, ShieldCheck } from 'lucide-react'
import MetodoRecomendacion from '../components/MetodoRecomendacion'
import UserForm from '../components/UserForm'
import { useRecomendaciones } from '../hooks/useRecomendaciones'

export default function BusquedaPage() {
  const navigate = useNavigate()
  const mutation = useRecomendaciones()

  async function handleSubmit(values) {
    const result = await mutation.mutateAsync(values)
    navigate('/resultados', {
      state: {
        consulta: values,
        resultado: result,
      },
    })
  }

  return (
    <section className="grid gap-5">
      <div className="page-band -mx-4 -mt-6 px-4 py-7 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-title">Motor de recomendacion</p>
          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-950">Consulta preventiva</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                El calculo prioriza coincidencia de servicio, radio territorial, capacidad operativa y penalidad climatica del dia.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <MiniStat icon={Map} label="Territorio" value="Puno" />
              <MiniStat icon={Clock3} label="Respuesta" value="Tiempo real" />
              <MiniStat icon={ShieldCheck} label="Privacidad" value="Minima" />
            </div>
          </div>
        </div>
      </div>
      {mutation.error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">No se pudo calcular la recomendacion. Verifica la API.</p>}
      <MetodoRecomendacion compact />
      <UserForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </section>
  )
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  )
}
