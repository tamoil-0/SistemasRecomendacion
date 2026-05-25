import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

const colors = {
  user: '#1B4F8A',
  0: '#2E7D32',
  1: '#CA8A04',
  2: '#EA580C',
  3: '#DC2626',
}

function icon(color) {
  return L.divIcon({
    className: '',
    html: `<div class="map-marker" style="width:16px;height:16px;background:${color}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

function FocusMap({ focusItem }) {
  const map = useMap()
  useEffect(() => {
    if (focusItem) {
      map.setView([focusItem.lat, focusItem.lon], 12)
    }
  }, [focusItem, map])
  return null
}

export default function MapaRecomendaciones({ usuario, recomendaciones = [], focusItem }) {
  const center = usuario ? [usuario.lat, usuario.lon] : [-15.840221, -70.021881]

  return (
    <div className="relative h-[420px] overflow-hidden rounded-lg app-surface">
      <MapContainer center={center} zoom={9} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {usuario && (
          <Marker position={[usuario.lat, usuario.lon]} icon={icon(colors.user)}>
            <Popup>Ubicacion del usuario</Popup>
          </Marker>
        )}
        {recomendaciones.map((item) => (
          <Marker key={`${item.establecimiento_id}-${item.rank}`} position={[item.lat, item.lon]} icon={icon(colors[item.nivel_alerta] || colors[0])}>
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
          recomendaciones.map((item) => (
            <Polyline
              key={`line-${item.establecimiento_id}-${item.rank}`}
              positions={[
                [usuario.lat, usuario.lon],
                [item.lat, item.lon],
              ]}
              pathOptions={{ color: colors[item.nivel_alerta] || colors[0], weight: 2, opacity: 0.55 }}
            />
          ))}
        <FocusMap focusItem={focusItem} />
      </MapContainer>
      <div className="absolute bottom-3 left-3 z-[1000] grid gap-1 bg-white p-3 text-xs shadow-panel">
        <LegendItem color={colors[0]} label="Sin alerta" />
        <LegendItem color={colors[1]} label="Aviso" />
        <LegendItem color={colors[2]} label="Alerta" />
        <LegendItem color={colors[3]} label="Alerta roja" />
      </div>
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
