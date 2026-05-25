import { api } from './axios'

export async function recomendar(payload) {
  const { data } = await api.post('/recomendar', payload)
  return data
}

export async function getHistorial() {
  const { data } = await api.get('/historial')
  return data
}

