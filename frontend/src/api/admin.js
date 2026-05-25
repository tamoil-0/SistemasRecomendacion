import { api } from './axios'

export async function syncRenipress() {
  const { data } = await api.post('/admin/sync-renipress')
  return data
}

export async function syncSenamhi() {
  const { data } = await api.post('/admin/sync-senamhi')
  return data
}

export async function retrainModel() {
  const { data } = await api.post('/admin/retrain')
  return data
}

