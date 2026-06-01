import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

const colors = {
  user: '#22D3EE',
  0: '#22C55E',
  1: '#FACC15',
  2: '#FB923C',
  3: '#F87171',
}

const categoryMeta = {
  BOTICA: { label: 'B', text: 'Botica', color: '#22C55E' },
  FARMACIA: { label: 'F', text: 'Farmacia', color: '#16A34A' },
  CLINICA: { label: 'C', text: 'Clinica', color: '#38BDF8' },
  ODONTO: { label: 'O', text: 'Odonto', color: '#A78BFA' },
  CONSULT: { label: 'M', text: 'Medico', color: '#2DD4BF' },
}

function markerMeta(item) {
  if (!item) return { label: 'U', text: 'Usuario', color: colors.user }
  const byCategory = categoryMeta[item.categoria]
  if (byCategory) return byCategory
  if (item.servicios?.includes('odontologia')) return categoryMeta.ODONTO
  if (item.servicios?.some((servicio) => ['botica', 'farmacia'].includes(servicio))) return categoryMeta.BOTICA
  if (item.servicios?.some((servicio) => ['clinica general', 'emergencia'].includes(servicio))) return categoryMeta.CLINICA
  return { label: 'S', text: 'Salud', color: colors[item.nivel_alerta] || colors[0] }
}

function icon(meta, active = false) {
  return L.divIcon({
    className: '',
    html: `
      <div class="map-marker-rich ${active ? 'map-marker-active' : ''}" style="--marker-color:${meta.color}">
        <span>${meta.label}</span>
      </div>
    `,
    iconSize: active ? [42, 42] : [34, 34],
    iconAnchor: active ? [21, 21] : [17, 17],
  })
}

function buildRoute(usuario, item) {
  if (!usuario || !item) return []
  const start = [usuario.lat, usuario.lon]
  const end = [item.lat, item.lon]
  const midLat = (usuario.lat + item.lat) / 2
  const midLon = (usuario.lon + item.lon) / 2
  const latOffset = Math.abs(usuario.lat - item.lat) * 0.22 || 0.0012
  const lonOffset = Math.abs(usuario.lon - item.lon) * 0.22 || 0.0012
  return [
    start,
    [usuario.lat + latOffset, midLon - lonOffset],
    [midLat, midLon],
    [item.lat - latOffset, midLon + lonOffset],
    end,
  ]
}

function FocusMap({ usuario, focusItem }) {
  const map = useMap()
  useEffect(() => {
    if (focusItem && usuario) {
      const bounds = L.latLngBounds([
        [usuario.lat, usuario.lon],
        [focusItem.lat, focusItem.lon],
      ]).pad(0.35)
      map.flyToBounds(bounds, { maxZoom: 16, duration: 0.9 })
    } else if (focusItem) {
      map.flyTo([focusItem.lat, focusItem.lon], 16, { duration: 0.8 })
    }
  }, [focusItem, map, usuario])
  return null
}

export default function MapaRecomendaciones({ usuario, recomendaciones = [], focusItem }) {
  const center = usuario ? [usuario.lat, usuario.lon] : [-15.840221, -70.021881]
  const activeRoute = useMemo(() => buildRoute(usuario, focusItem), [usuario, focusItem])
  const visibleRoutes = focusItem ? [focusItem] : recomendaciones.slice(0, 3)
  const activeMeta = markerMeta(focusItem)
  const minutes = focusItem ? Math.max(3, Math.round(Number(focusItem.distancia_km || 0) * 5)) : 0

  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl app-surface">
      <div className="absolute left-0 right-0 top-0 z-[1000] border-b border-cyan-100/10 bg-slate-950/78 px-4 py-3 backdrop-blur">
        <p className="text-sm font-black text-white">Mapa de recomendaciones</p>
        <p className="text-xs font-semibold text-slate-400">
          {focusItem ? `Ruta enfocada hacia ${focusItem.nombre}` : 'Usuario, establecimientos y conexiones aproximadas'}
        </p>
      </div>
      <MapContainer center={center} zoom={9} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {usuario && (
          <Marker position={[usuario.lat, usuario.lon]} icon={icon(markerMeta(null), Boolean(focusItem))}>
            <Popup>Ubicacion del usuario</Popup>
          </Marker>
        )}
        {recomendaciones.map((item) => (
          <Marker
            key={`${item.establecimiento_id}-${item.rank}`}
            position={[item.lat, item.lon]}
            icon={icon(markerMeta(item), focusItem?.establecimiento_id === item.establecimiento_id)}
            opacity={focusItem && focusItem.establecimiento_id !== item.establecimiento_id ? 0.46 : 1}
          >
            <Popup>
              <div className="grid gap-1 text-sm">
                <strong>{item.nombre}</strong>
                <span>Categoria: {item.categoria}</span>
                <span>Score: {item.score_final}</span>
                <span>Distancia: {item.distancia_km} km</span>
                <span>Horario: {item.horario || 'No especificado'}</span>
                <span>Alerta: nivel {item.nivel_alerta}</span>
                <span>Servicios: {item.servicios.join(', ')}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        {usuario &&
          !focusItem &&
          visibleRoutes.map((item) => (
            <Polyline key={`line-${item.establecimiento_id}-${item.rank}`} positions={buildRoute(usuario, item)} pathOptions={{ color: '#38BDF8', weight: 3, opacity: 0.35, dashArray: '8 10' }} />
          ))}
        {activeRoute.length > 0 && (
          <>
            <Polyline positions={activeRoute} pathOptions={{ color: '#0F172A', weight: 12, opacity: 0.75, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: '#FFFFFF', weight: 8, opacity: 0.92, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: activeMeta.color, weight: 5, opacity: 0.96, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: '#0F172A', weight: 2, opacity: 0.45, dashArray: '2 14', lineCap: 'round' }} />
          </>
        )}
        <FocusMap usuario={usuario} focusItem={focusItem} />
      </MapContainer>
      {focusItem && (
        <div className="absolute bottom-4 right-4 z-[1000] w-[min(92%,360px)] rounded-2xl border border-cyan-100/15 bg-slate-950/88 p-4 text-slate-100 shadow-panel backdrop-blur">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-white shadow-glow" style={{ backgroundColor: activeMeta.color }}>
              {activeMeta.label}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">{activeMeta.text} seleccionado</p>
              <h3 className="mt-1 text-base font-black leading-5 text-white">{focusItem.nombre}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-400">{focusItem.categoria} | {focusItem.horario || 'Horario no especificado'}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <RouteStat label="Distancia" value={`${focusItem.distancia_km} km`} />
            <RouteStat label="Tiempo aprox." value={`${minutes} min`} />
            <RouteStat label="Score" value={`${Math.round(focusItem.score_final * 100)}%`} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {focusItem.servicios.map((servicio) => (
              <span key={servicio} className="rounded-full border border-cyan-100/10 bg-cyan-300/10 px-2 py-1 text-xs font-bold text-cyan-100">
                {servicio}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-300">
            Ruta referencial trazada con puntos intermedios para orientar el recorrido urbano. Para navegacion vial exacta se puede abrir con un proveedor externo.
          </p>
          <a
            className="btn-primary mt-3 w-full py-2 text-xs"
            href={`https://www.google.com/maps/dir/?api=1&origin=${usuario?.lat},${usuario?.lon}&destination=${focusItem.lat},${focusItem.lon}&travelmode=driving`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir ruta exacta
          </a>
        </div>
      )}
      <div className="absolute bottom-3 left-3 z-[1000] grid gap-1 rounded-2xl border border-cyan-100/10 bg-slate-950/82 p-3 text-xs font-semibold text-slate-200 shadow-panel backdrop-blur">
        <LegendItem color={colors[0]} label="Sin alerta" />
        <LegendItem color={colors[1]} label="Aviso" />
        <LegendItem color={colors[2]} label="Alerta" />
        <LegendItem color={colors[3]} label="Alerta roja" />
      </div>
    </div>
  )
}

function RouteStat({ label, value }) {
  return (
    <div className="rounded-xl border border-cyan-100/10 bg-white/5 p-2">
      <p className="font-black text-white">{value}</p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  )
}
