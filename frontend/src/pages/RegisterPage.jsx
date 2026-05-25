import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, UserRound, LockKeyhole, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/buscar')
    } catch (err) {
      setError(err.response?.data?.detail || 'No se pudo registrar el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-5xl rounded-lg app-surface">
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg bg-slate-950 p-6 text-white">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-health">
            <UserPlus className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-black">Crear cuenta ciudadana</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            La sesion se mantiene solo en memoria del navegador y el backend valida cada solicitud protegida.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            <Check text="Registro con email unico" />
            <Check text="Hash bcrypt en backend" />
            <Check text="Token JWT por sesion" />
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Alta de usuario</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Datos de acceso</h2>
          {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <Field icon={UserRound} label="Nombre">
              <input required minLength="2" className="field w-full pl-10" placeholder="Usuario Demo" value={form.nombre} onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))} />
            </Field>
            <Field icon={Mail} label="Email">
              <input required type="email" className="field w-full pl-10" placeholder="demo@puno.pe" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            </Field>
            <Field icon={LockKeyhole} label="Password">
              <input required type="password" minLength="8" className="field w-full pl-10" placeholder="Minimo 8 caracteres" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
            </Field>
            <button type="submit" disabled={loading} className="btn-primary bg-health hover:bg-green-800 disabled:opacity-70">
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="mt-5 text-sm text-slate-700">
            Ya tienes cuenta? <Link className="font-bold text-primary hover:underline" to="/login">Ingresar</Link>
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

function Check({ text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-health" />
      <span>{text}</span>
    </div>
  )
}
