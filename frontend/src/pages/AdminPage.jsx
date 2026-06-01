import { useMutation } from '@tanstack/react-query'
import { DatabaseZap, Loader2, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { retrainModel, syncRenipress, syncSenamhi } from '../api/admin'
import { useAuth } from '../context/AuthContext'
import Topbar from '../components/Topbar'

export default function AdminPage() {
  const { user } = useAuth()
  const [lastResult, setLastResult] = useState(null)

  const renipress = useAction(syncRenipress, setLastResult)
  const senamhi = useAction(syncSenamhi, setLastResult)
  const retrain = useAction(retrainModel, setLastResult)

  if (!user?.is_admin) {
    return (
      <div>
        <Topbar title="Administracion" subtitle="Panel" />
        <div className="m-6 flex gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-red-800">Acceso restringido</h1>
            <p className="mt-1 text-sm font-semibold text-red-600">Cuenta administradora requerida.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-rise">
      <Topbar title="Panel de operaciones" subtitle="Administracion del sistema" />

      <div className="p-5 lg:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminCard icon={DatabaseZap} title="RENIPRESS" label="Sincronizar" loading={renipress.isPending} onClick={() => renipress.mutate()} />
          <AdminCard icon={RefreshCw} title="SENAMHI" label="Actualizar alertas" loading={senamhi.isPending} onClick={() => senamhi.mutate()} />
          <AdminCard icon={ShieldCheck} title="Modelo ML" label="Reentrenar" loading={retrain.isPending} onClick={() => retrain.mutate()} />
        </div>

        <div className="dashboard-band mt-5 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-title">Log</p>
              <h2 className="mt-1 text-base font-extrabold text-gray-950">Ultima operacion</h2>
            </div>
            <span className={`rounded-lg px-3 py-1.5 text-xs font-extrabold ${lastResult?.error ? 'bg-red-50 text-red-700' : lastResult ? 'bg-emerald-50 text-emerald-700' : 'bg-surface-100 text-gray-500'}`}>
              {lastResult?.error ? 'Error' : lastResult ? 'Correcto' : 'Sin actividad'}
            </span>
          </div>
          <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl border border-surface-200 bg-[#0D0B1A] p-5 font-mono text-sm leading-6 text-brand-100">
            {lastResult ? JSON.stringify(lastResult, null, 2) : 'Sin operaciones en esta sesion'}
          </pre>
        </div>
      </div>
    </div>
  )
}

function useAction(action, setLastResult) {
  return useMutation({
    mutationFn: action,
    onSuccess: setLastResult,
    onError: (error) => setLastResult({ error: error.response?.data?.detail || 'Operacion fallida' }),
  })
}

function AdminCard({ icon: Icon, title, label, loading, onClick }) {
  return (
    <article className="dashboard-band p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-md bg-surface-100 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-gray-500">manual</span>
      </div>
      <h2 className="mt-5 text-lg font-extrabold text-gray-950">{title}</h2>
      <button type="button" onClick={onClick} disabled={loading} className="btn-primary mt-5 w-full disabled:opacity-60">
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando
          </span>
        ) : label}
      </button>
    </article>
  )
}
