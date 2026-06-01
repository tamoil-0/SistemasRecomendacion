import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

const colors = {
  user: '#4A2AAE',
  0: '#10B981',
  1: '#F59E0B',
  2: '#F97316',
  3: '#EF4444',
}

const categoryMeta = {
  BOTICA: { label: 'B', text: 'Botica', color: '#10B981' },
  FARMACIA: { label: 'F', text: 'Farmacia', color: '#059669' },
  CLINICA: { label: 'C', text: 'Clinica', color: '#3B82F6' },
  ODONTO: { label: 'O', text: 'Odonto', color: '#8B5CF6' },
  CONSULT: { label: 'M', text: 'Medico', color: '#14B8A6' },
}

function markerMeta(item) {
  if (!item) return { label: 'U', text: 'Usuario', color: colors.user }
  const byCategory = categoryMeta[item.categoria]
  if (byCategory) return byCategory
  if (item.servicios?.includes('odontologia')) return categoryMeta.ODONTO
  if (item.servicios?.some((s) => ['botica', 'farmacia'].includes(s))) return categoryMeta.BOTICA
  if (item.servicios?.some((s) => ['clinica general', 'emergencia'].includes(s))) return categoryMeta.CLINICA
  return { label: 'S', text: 'Salud', color: colors[item.nivel_alerta] || colors[0] }
}

function icon(meta, active = false) {
  return L.divIcon({
    className: '',
    html: `<div class="map-marker-rich ${active ? 'map-marker-active' : ''}" style="--marker-color:${meta.color}"><span>${meta.label}</span></div>`,
    iconSize: active ? [44, 44] : [34, 34],
    iconAnchor: active ? [22, 22] : [17, 17],
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
  return [start, [usuario.lat + latOffset, midLon - lonOffset], [midLat, midLon], [item.lat - latOffset, midLon + lonOffset], end]
}

function FocusMap({ usuario, focusItem }) {
  const map = useMap()
  useEffect(() => {
    if (focusItem && usuario) {
      map.flyToBounds(L.latLngBounds([[usuario.lat, usuario.lon], [focusItem.lat, focusItem.lon]]).pad(0.35), { maxZoom: 16, duration: 0.9 })
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
    <div className="dashboard-band relative h-[520px] overflow-hidden">
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-[1000] glass border-b border-surface-200 px-4 py-3">
        <p className="text-sm font-extrabold text-gray-950">Mapa</p>
        <p className="truncate text-xs font-semibold text-gray-500">
          {focusItem ? `Ruta hacia ${focusItem.nombre}` : 'Establecimientos y conexiones aproximadas'}
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
            opacity={focusItem && focusItem.establecimiento_id !== item.establecimiento_id ? 0.4 : 1}
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
        {usuario && !focusItem && visibleRoutes.map((item) => (
          <Polyline key={`line-${item.establecimiento_id}-${item.rank}`} positions={buildRoute(usuario, item)} pathOptions={{ color: '#9A7BFF', weight: 3, opacity: 0.35, dashArray: '8 10' }} />
        ))}
        {activeRoute.length > 0 && (
          <>
            <Polyline positions={activeRoute} pathOptions={{ color: '#ffffff', weight: 10, opacity: 0.85, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: activeMeta.color, weight: 4, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }} />
          </>
        )}
        <FocusMap usuario={usuario} focusItem={focusItem} />
      </MapContainer>

      {/* Focus panel */}
      {focusItem && (
        <div className="absolute bottom-4 right-4 z-[1000] w-[min(92%,360px)] dashboard-band p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold text-white shadow-lg" style={{ backgroundColor: activeMeta.color }}>
              {activeMeta.label}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600">{activeMeta.text} seleccionado</p>
              <h3 className="mt-1 text-sm font-bold leading-5 text-gray-900">{focusItem.nombre}</h3>
              <p className="mt-0.5 text-xs font-medium text-gray-500">{focusItem.categoria} • {focusItem.horario || 'Sin horario'}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <RouteStat label="Distancia" value={`${focusItem.distancia_km} km`} />
            <RouteStat label="Tiempo" value={`${minutes} min`} />
            <RouteStat label="Score" value={`${Math.round(focusItem.score_final * 100)}%`} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {focusItem.servicios.slice(0, 8).map((s) => (
              <span key={s} className="rounded-full border border-surface-200 bg-surface-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">{s}</span>
            ))}
            {focusItem.servicios.length > 8 && <span className="rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 text-[11px] font-extrabold text-brand-700">+{focusItem.servicios.length - 8}</span>}
          </div>
          <a
            className="btn-primary mt-4 w-full py-2.5 text-xs"
            href={`https://www.google.com/maps/dir/?api=1&origin=${usuario?.lat},${usuario?.lon}&destination=${focusItem.lat},${focusItem.lon}&travelmode=driving`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir ruta en Google Maps
          </a>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] grid gap-1.5 rounded-xl glass p-3 text-xs font-bold text-gray-600 shadow-card">
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
    <div className="rounded-lg border border-surface-200 bg-surface-50 p-2">
      <p className="font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  )
}
