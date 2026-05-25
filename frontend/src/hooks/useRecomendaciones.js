import { useMutation } from '@tanstack/react-query'
import { recomendar } from '../api/recomendaciones'

export function useRecomendaciones() {
  return useMutation({
    mutationFn: recomendar,
  })
}

