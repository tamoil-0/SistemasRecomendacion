import { useQuery } from '@tanstack/react-query'
import { getHistorial } from '../api/recomendaciones'

export function useHistorial() {
  return useQuery({
    queryKey: ['historial'],
    queryFn: getHistorial,
  })
}

