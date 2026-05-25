import { useNavigate } from 'react-router-dom'
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
      <div className="app-surface rounded-lg p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Motor de recomendacion</p>
        <h1 className="mt-1 text-2xl font-black text-slate-950">Consulta preventiva</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
          El calculo prioriza coincidencia de servicio, radio territorial, capacidad operativa y penalidad climatica del dia.
        </p>
      </div>
      {mutation.error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">No se pudo calcular la recomendacion. Verifica la API.</p>}
      <UserForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </section>
  )
}
