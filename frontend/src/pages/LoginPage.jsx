import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, sessionMessage } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form)
      navigate(location.state?.from || '/buscar')
    } catch {
      setError('Credenciales invalidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl overflow-hidden rounded-lg app-surface lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative hidden min-h-[560px] bg-primary p-8 text-white lg:block">
        <div className="absolute inset-0 opacity-20 map-visual" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-bold">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Acceso seguro
            </span>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-tight">Decision preventiva con datos abiertos y trazabilidad.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-50">
              El sistema registra solo datos operativos de consulta y protege el acceso mediante JWT.
            </p>
          </div>
          <div className="grid gap-3">
            <Status label="Autenticacion" value="JWT HS256" />
            <Status label="Base local" value="SQLite / PostgreSQL" />
            <Status label="Privacidad" value="Sin datos clinicos" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Cuenta de usuario</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Ingresar al sistema</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Usa tu cuenta registrada para consultar recomendaciones y revisar historial.</p>
          {(sessionMessage || error) && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800">{error || sessionMessage}</p>}
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Email
              <span className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="email"
                  required
                  className="field w-full pl-10"
                  placeholder="demo@puno.pe"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                />
              </span>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Password
              <span className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="password"
                  required
                  minLength="8"
                  className="field w-full pl-10"
                  placeholder="password123"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                />
              </span>
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Validando credenciales...' : 'Ingresar'}
            </button>
          </form>
          <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-bold text-slate-900">Cuenta de prueba sugerida</p>
            <p className="mt-1">Registra `demo@puno.pe` con password `password123` desde la opcion de registro.</p>
          </div>
          <p className="mt-5 text-sm text-slate-700">
            No tienes cuenta? <Link className="font-bold text-primary hover:underline" to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function Status({ label, value }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-100">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  )
}
