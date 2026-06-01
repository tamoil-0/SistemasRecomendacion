import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Crosshair, LocateFixed, MapPin, Search, SlidersHorizontal, Stethoscope, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  tipo_atencion:    z.string().min(1),
  edad:             z.coerce.number().min(1).max(120),
  lat:              z.coerce.number().min(-17.5).max(-13),
  lon:              z.coerce.number().min(-71.5).max(-68),
  max_distancia_km: z.coerce.number().min(1).max(100),
  top_n:            z.coerce.number().min(3).max(10),
})

const distritos = [
  { label: 'Juliaca Centro',       lat: -15.49356, lon: -70.13359 },
  { label: 'Juliaca Santa Adriana', lat: -15.49925, lon: -70.13856 },
  { label: 'Juliaca Salida Puno',   lat: -15.51364, lon: -70.12087 },
  { label: 'Juliaca Cerro Colorado',lat: -15.47635, lon: -70.13764 },
  { label: 'Puno Centro',          lat: -15.840221, lon: -70.021881 },
  { label: 'Puno Bellavista',       lat: -15.83248,  lon: -70.02221 },
  { label: 'Puno Laykakota',        lat: -15.84696,  lon: -70.01874 },
  { label: 'Puno Salcedo',          lat: -15.86584,  lon: -70.00671 },
  { label: 'Puno Alto Puno',        lat: -15.82466,  lon: -70.03278 },
  { label: 'Azangaro',              lat: -14.90843,  lon: -70.19608 },
  { label: 'Moho',                  lat: -15.36178,  lon: -69.49924 },
  { label: 'Ilave',                 lat: -16.0869,   lon: -69.63856 },
]

export const serviciosCatalogo = [
  'vacunacion','control prenatal','control cred','tamizaje','odontologia',
  'psicologia','nutricion','planificacion familiar','botica','farmacia',
  'clinica general','medicina general','emergencia','laboratorio','pediatria','ginecologia',
]

export default function UserForm({ onSubmit, isLoading }) {
  const [geoMessage, setGeoMessage] = useState('')
  const {
    register, setValue, watch, handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo_atencion: 'vacunacion', edad: 25,
      lat: -15.49356, lon: -70.13359,
      max_distancia_km: 15, top_n: 5,
    },
  })

  const distance = watch('max_distancia_km')
  const topN = watch('top_n')

  function useCurrentLocation() {
    setGeoMessage('Obteniendo GPS...')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue('lat', Number(pos.coords.latitude.toFixed(6)),  { shouldValidate: true })
        setValue('lon', Number(pos.coords.longitude.toFixed(6)), { shouldValidate: true })
        setGeoMessage('GPS aplicado correctamente')
      },
      () => setGeoMessage('GPS no disponible'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function applyDistrict(e) {
    const d = distritos.find((x) => x.label === e.target.value)
    if (d) {
      setValue('lat', d.lat, { shouldValidate: true })
      setValue('lon', d.lon, { shouldValidate: true })
      setGeoMessage(d.label)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 animate-rise-slow">

      {/* ── Row 1: Servicio + Perfil ── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">

        {/* Servicio */}
        <Section
          icon={Stethoscope}
          iconBg="bg-brand-50 text-brand-600"
          title="Servicio preventivo"
          label="Tipo de atencion requerida"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Tipo de atencion</p>
              <div className="relative">
                <select
                  className="field w-full appearance-none pr-9 capitalize"
                  {...register('tipo_atencion')}
                >
                  {serviciosCatalogo.map((s) => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.tipo_atencion && <p className="mt-1 text-xs font-bold text-red-600">Requerido</p>}
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Edad del paciente</p>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="number" min="1" max="120"
                  className="field w-full pl-9"
                  placeholder="25"
                  {...register('edad')}
                />
              </div>
              {errors.edad && <p className="mt-1 text-xs font-bold text-red-600">{errors.edad.message}</p>}
            </div>
          </div>
        </Section>

        {/* Ranking */}
        <Section
          icon={SlidersHorizontal}
          iconBg="bg-blue-50 text-blue-600"
          title="Parametros"
          label="Configurar ranking"
        >
          <div className="grid gap-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Radio maximo</p>
                <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-extrabold text-brand-700">{distance} km</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-200 accent-brand-600"
                {...register('max_distancia_km')}
              />
              <div className="mt-1 flex justify-between text-[9px] font-bold text-gray-300">
                <span>1 km</span><span>50 km</span><span>100 km</span>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Resultados</p>
              <div className="relative">
                <select className="field w-full appearance-none pr-9" {...register('top_n')}>
                  <option value="3">Top 3 establecimientos</option>
                  <option value="5">Top 5 establecimientos</option>
                  <option value="10">Top 10 establecimientos</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Row 2: Ubicacion ── */}
      <Section
        icon={MapPin}
        iconBg="bg-emerald-50 text-emerald-600"
        title="Ubicacion geografica"
        label="Selecciona tu posicion en la Region Puno"
      >
        {/* distrito + GPS */}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Distrito de referencia</p>
            <div className="relative">
              <select onChange={applyDistrict} className="field w-full appearance-none pr-9">
                {distritos.map((d) => (
                  <option key={d.label} value={d.label}>{d.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:opacity-0">GPS</p>
            <button
              type="button"
              onClick={useCurrentLocation}
              className="btn-secondary flex h-[42px] items-center gap-2 whitespace-nowrap px-5 text-sm"
            >
              <LocateFixed className="h-4 w-4" />
              Usar GPS
            </button>
          </div>
        </div>

        {/* lat / lon */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Latitud</p>
            <input
              type="number" step="0.000001"
              className={`field w-full ${errors.lat ? 'border-red-400' : ''}`}
              {...register('lat')}
            />
            {errors.lat && <p className="mt-1 text-xs font-bold text-red-600">Fuera del rango permitido</p>}
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Longitud</p>
            <input
              type="number" step="0.000001"
              className={`field w-full ${errors.lon ? 'border-red-400' : ''}`}
              {...register('lon')}
            />
            {errors.lon && <p className="mt-1 text-xs font-bold text-red-600">Fuera del rango permitido</p>}
          </div>
        </div>

        {/* Summary bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-surface-200 bg-surface-50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Crosshair className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-bold text-gray-700">
              Top <span className="text-brand-700">{topN}</span> establecimientos · radio <span className="text-brand-700">{distance} km</span>
            </span>
          </div>
          {geoMessage && (
            <span className="flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1 text-xs font-bold text-brand-700 shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {geoMessage}
            </span>
          )}
        </div>
      </Section>

      {/* ── Submit ── */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-surface-200 bg-white px-6 py-4 shadow-soft">
        <div>
          <p className="text-sm font-extrabold text-gray-900">Listo para calcular</p>
          <p className="text-xs text-gray-400">El motor analizara {topN} opciones en {distance} km de radio</p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary min-w-[200px] py-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Calculando ranking...
            </span>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Generar recomendaciones
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function Section({ icon: Icon, iconBg, title, label, children }) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="mb-5 flex items-center gap-3 border-b border-surface-100 pb-4">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[13px] font-extrabold text-gray-900">{title}</p>
          <p className="text-[11px] text-gray-400">{label}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
