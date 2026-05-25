import { api } from './axios'

export async function getAll(params = {}) {
  const { data } = await api.get('/establecimientos', { params })
  return data
}

export async function getById(id) {
  const { data } = await api.get(`/establecimientos/${id}`)
  return data
}

