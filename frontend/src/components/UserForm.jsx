import { zodResolver } from '@hookform/resolvers/zod'
import { LocateFixed, MapPinned, Search, SlidersHorizontal, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  tipo_atencion: z.string().min(1, 'Selecciona el tipo de atencion'),
  edad: z.coerce.number().min(1, 'Edad minima 1').max(120, 'Edad maxima 120'),
  lat: z.coerce.number().min(-17.5).max(-13),
  lon: z.coerce.number().min(-71.5).max(-68),
  max_distancia_km: z.coerce.number().min(5).max(100),
  top_n: z.coerce.number().min(3).max(10),
})

const distritos = [
  { label: 'Puno', lat: -15.840221, lon: -70.021881 },
  { label: 'Juliaca', lat: -15.49356, lon: -70.13359 },
  { label: 'Azangaro', lat: -14.90843, lon: -70.19608 },
  { label: 'Moho', lat: -15.36178, lon: -69.49924 },
  { label: 'Ilave', lat: -16.0869, lon: -69.63856 },
]

export const serviciosCatalogo = [
  'vacunacion',
  'control prenatal',
  'control cred',
  'tamizaje',
  'odontologia',
  'psicologia',
  'nutricion',
  'planificacion familiar',
]

export default function UserForm({ onSubmit, isLoading }) {
  const [geoMessage, setGeoMessage] = useState('')
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo_atencion: 'vacunacion',
      edad: 25,
      lat: -15.840221,
      lon: -70.021881,
      max_distancia_km: 30,
      top_n: 5,
    },
  })

  const distance = watch('max_distancia_km')
  const topN = watch('top_n')

  function useCurrentLocation() {
    setGeoMessage('Solicitando ubicacion...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('lat', Number(position.coords.latitude.toFixed(6)), { shouldValidate: true })
        setValue('lon', Number(position.coords.longitude.toFixed(6)), { shouldValidate: true })
        setGeoMessage('Ubicacion GPS aplicada')
      },
      () => setGeoMessage('No se pudo obtener GPS; usa el selector manual.'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function applyDistrict(event) {
    const selected = distritos.find((item) => item.label === event.target.value)
    if (selected) {
      setValue('lat', selected.lat, { shouldValidate: true })
      setValue('lon', selected.lon, { shouldValidate: true })
      setGeoMessage(`${selected.label} aplicado como punto de referencia`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel icon={UserRound} title="Perfil de consulta" text="Define el servicio preventivo y los parametros personales minimos.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Tipo de atencion
              <select className="field" {...register('tipo_atencion')} aria-invalid={Boolean(errors.tipo_atencion)}>
                {serviciosCatalogo.map((servicio) => (
                  <option key={servicio} value={servicio}>
                    {servicio}
                  </option>
                ))}
              </select>
              {errors.tipo_atencion && <span className="text-sm text-red-700">{errors.tipo_atencion.message}</span>}
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Edad
              <input className="field" type="number" min="1" max="120" {...register('edad')} />
              {errors.edad && <span className="text-sm text-red-700">{errors.edad.message}</span>}
            </label>
          </div>
        </Panel>

        <Panel icon={SlidersHorizontal} title="Criterios del ranking" text="Ajusta alcance y cantidad de resultados del motor.">
          <div className="grid gap-4">
            <label className="grid gap-3 text-sm font-bold text-slate-700">
              <span className="flex items-center justify-between">
                Distancia maxima
                <strong className="rounded-md bg-blue-50 px-2 py-1 text-primary">{distance} km</strong>
              </span>
              <input className="accent-[#1B4F8A]" type="range" min="5" max="100" step="5" {...register('max_distancia_km')} />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Numero de recomendaciones
              <select className="field" {...register('top_n')}>
                <option value="3">3 recomendaciones</option>
                <option value="5">5 recomendaciones</option>
                <option value="10">10 recomendaciones</option>
              </select>
            </label>
            <p className="rounded-md bg-slate-50 p-3 text-sm font-semibold text-slate-600">Se mostraran {topN} establecimientos ordenados por score final.</p>
          </div>
        </Panel>
      </div>

      <Panel icon={MapPinned} title="Ubicacion territorial" text="Selecciona un distrito base o usa GPS para calcular distancia y rutas aproximadas.">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={useCurrentLocation} className="btn-primary text-sm">
              <LocateFixed className="h-4 w-4" aria-hidden="true" />
              Usar mi ubicacion
            </button>
            <select onChange={applyDistrict} className="field text-sm" aria-label="Ubicacion manual">
              {distritos.map((distrito) => (
                <option key={distrito.label}>{distrito.label}</option>
              ))}
            </select>
            {geoMessage && <span className="text-sm font-semibold text-slate-600">{geoMessage}</span>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Latitud
              <input className="field" type="number" step="0.000001" {...register('lat')} />
              {errors.lat && <span className="text-sm text-red-700">Latitud fuera del rango de Puno</span>}
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Longitud
              <input className="field" type="number" step="0.000001" {...register('lon')} />
              {errors.lon && <span className="text-sm text-red-700">Longitud fuera del rango de Puno</span>}
            </label>
          </div>
        </div>
      </Panel>

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading} className="btn-primary bg-health px-5 disabled:cursor-not-allowed disabled:opacity-70">
          <Search className="h-4 w-4" aria-hidden="true" />
          {isLoading ? 'Calculando ranking...' : 'Buscar recomendaciones'}
        </button>
      </div>
    </form>
  )
}

function Panel({ icon: Icon, title, text, children }) {
  return (
    <section className="app-surface rounded-lg p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-black text-slate-950">{title}</h2>
          <p className="text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
