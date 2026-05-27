import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BarChart3, GitCompareArrows, LockKeyhole, Mail, MapPinned, ShieldCheck, SlidersHorizontal } from 'lucide-react'
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
    <section className="mx-auto grid max-w-6xl overflow-hidden rounded-lg app-surface lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden border-r border-slate-200 bg-slate-950 p-8 text-white lg:grid">
        <div className="flex h-full min-h-[560px] flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-black">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Sistema de recomendacion
            </span>
            <h1 className="mt-6 max-w-md text-4xl font-black leading-tight">Recomendaciones preventivas explicables.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              El sistema compara la necesidad del usuario con los servicios de cada establecimiento y ordena las mejores opciones segun similitud, distancia y alerta climatica.
            </p>
          </div>
          <div className="grid gap-3">
            <Status icon={GitCompareArrows} label="Tipo de recomendacion" value="Basada en contenido" />
            <Status icon={SlidersHorizontal} label="Metodo de ranking" value="Similitud coseno" />
            <Status icon={MapPinned} label="Ajuste territorial" value="Distancia y clima" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="mx-auto max-w-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-primary">
            <BarChart3 className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="section-title mt-6">Cuenta de usuario</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Ingresar al sistema</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Accede para ejecutar consultas, revisar recomendaciones y consultar el historial operativo.</p>
          {(sessionMessage || error) && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-bold text-red-800">{error || sessionMessage}</p>}
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <Field icon={Mail} label="Correo electronico">
              <input
                type="email"
                required
                className="field w-full pl-10"
                placeholder="demo@puno.pe"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </Field>
            <Field icon={LockKeyhole} label="Password">
              <input
                type="password"
                required
                minLength="8"
                className="field w-full pl-10"
                placeholder="password123"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              />
            </Field>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Validando credenciales...' : 'Ingresar'}
            </button>
          </form>
          <div className="mt-5 subtle-surface rounded-lg p-4 text-sm text-slate-700">
            <p className="font-black text-slate-950">Cuenta de prueba</p>
            <p className="mt-1">Usuario: `demo@puno.pe` - Password: `password123`</p>
            <p className="mt-1">Admin: `admin@puno.pe` - Password: `admin12345`</p>
          </div>
          <p className="mt-5 text-sm text-slate-700">
            No tienes cuenta? <Link className="font-black text-primary hover:underline" to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <span className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        {children}
      </span>
    </label>
  )
}

function Status({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
        <Icon className="h-4 w-4 text-blue-200" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  )
}
