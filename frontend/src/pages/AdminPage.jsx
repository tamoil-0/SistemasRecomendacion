import { useMutation } from '@tanstack/react-query'
import { DatabaseZap, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react'
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
      <section className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-red-900">
        <ShieldAlert className="h-6 w-6 shrink-0" aria-hidden="true" />
        <div>
          <h1 className="font-black">Acceso administrativo restringido</h1>
          <p className="mt-1 text-sm">Solo una cuenta administradora puede sincronizar datos y reentrenar el modelo.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-5">
      <div className="page-band -mx-4 -mt-6 px-4 py-7 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-title">Administracion</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Panel de operaciones</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">Sincroniza fuentes de datos y actualiza el modelo del sistema preventivo.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AdminButton icon={DatabaseZap} title="RENIPRESS" label="Sincronizar RENIPRESS" text="Actualiza establecimientos, categorias y servicios." loading={renipress.isPending} onClick={() => renipress.mutate()} />
        <AdminButton icon={RefreshCw} title="SENAMHI" label="Sincronizar SENAMHI" text="Actualiza alertas climaticas del territorio." loading={senamhi.isPending} onClick={() => senamhi.mutate()} />
        <AdminButton icon={ShieldCheck} title="Modelo" label="Reentrenar modelo" text="Regenera parametros del recomendador." loading={retrain.isPending} onClick={() => retrain.mutate()} />
      </div>

      <div className="app-surface rounded-lg p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="section-title">Operacion</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Estado de ultima accion</h2>
          </div>
        </div>
        <pre className="mt-4 max-h-[420px] overflow-auto rounded-md bg-slate-950 p-4 text-sm text-slate-100">
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

function AdminButton({ icon: Icon, title, text, label, loading, onClick }) {
  return (
    <article className="app-surface rounded-lg p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-black text-slate-950">{title}</h2>
      <p className="mt-2 min-h-[44px] text-sm leading-6 text-slate-600">{text}</p>
      <button type="button" onClick={onClick} disabled={loading} className="btn-primary mt-4 w-full disabled:opacity-70">
        {loading ? 'Procesando...' : label}
      </button>
    </article>
  )
}
