import { useMutation } from '@tanstack/react-query'
import { DatabaseZap, RefreshCw, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { retrainModel, syncRenipress, syncSenamhi } from '../api/admin'
import { useAuth } from '../context/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()
  const [lastResult, setLastResult] = useState(null)

  const renipress = useAction(syncRenipress, setLastResult)
  const senamhi = useAction(syncSenamhi, setLastResult)
  const retrain = useAction(retrainModel, setLastResult)

  if (!user?.is_admin) {
    return (
      <section className="flex gap-3 bg-white p-6 text-slate-800 shadow-panel">
        <ShieldAlert className="h-6 w-6 text-red-700" aria-hidden="true" />
        <div>
          <h1 className="font-bold">Acceso administrativo restringido</h1>
          <p className="text-sm text-slate-700">El backend validara permisos con JWT de administrador.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-5">
      <h1 className="text-2xl font-bold text-slate-950">Panel de administracion</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <AdminButton icon={DatabaseZap} label="Sincronizar RENIPRESS" loading={renipress.isPending} onClick={() => renipress.mutate()} />
        <AdminButton icon={RefreshCw} label="Sincronizar SENAMHI" loading={senamhi.isPending} onClick={() => senamhi.mutate()} />
        <AdminButton icon={RefreshCw} label="Reentrenar modelo" loading={retrain.isPending} onClick={() => retrain.mutate()} />
      </div>
      <div className="bg-white p-5 shadow-panel">
        <h2 className="font-bold text-slate-900">Estado de ultima operacion</h2>
        <pre className="mt-3 overflow-auto rounded-md bg-slate-900 p-4 text-sm text-white">
          {lastResult ? JSON.stringify(lastResult, null, 2) : 'Sin operaciones en esta sesion'}
        </pre>
      </div>
    </section>
  )
}

function useAction(action, setLastResult) {
  return useMutation({
    mutationFn: action,
    onSuccess: setLastResult,
    onError: (error) => setLastResult({ error: error.response?.data?.detail || 'Operacion fallida' }),
  })
}

function AdminButton({ icon: Icon, label, loading, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={loading} className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 font-semibold text-white shadow-panel disabled:opacity-70">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {loading ? 'Procesando...' : label}
    </button>
  )
}

