import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, LockKeyhole, Mail, UserPlus, UserRound } from 'lucide-react'
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
    <section className="mx-auto grid max-w-6xl overflow-hidden rounded-lg app-surface lg:grid-cols-[1fr_0.95fr]">
      <div className="p-6 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-health">
          <UserPlus className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="section-title mt-6">Alta de usuario</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Crear cuenta de consulta</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          Crea una cuenta para ejecutar consultas preventivas, mantener trazabilidad del ranking y regresar al historial cuando lo necesites.
        </p>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-bold text-red-800">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <Field icon={UserRound} label="Nombre completo">
            <input required minLength="2" className="field w-full pl-10" placeholder="Usuario Demo" value={form.nombre} onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))} />
          </Field>
          <Field icon={Mail} label="Correo electronico">
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
          Ya tienes cuenta? <Link className="font-black text-primary hover:underline" to="/login">Ingresar</Link>
        </p>
      </div>

      <div className="grid content-between gap-8 border-t border-slate-200 bg-slate-50 p-6 sm:p-10 lg:border-l lg:border-t-0">
        <div>
          <p className="section-title">Politica del sistema</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Registro minimo y uso preventivo.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            La aplicacion trabaja con datos operativos de consulta para recomendar establecimientos, sin almacenar informacion clinica sensible.
          </p>
        </div>
        <div className="grid gap-3">
          <Check text="Email unico para identificar la sesion." />
          <Check text="Password protegido en backend." />
          <Check text="Token temporal para rutas protegidas." />
          <Check text="Historial orientado a auditoria de consultas." />
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
    <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-health" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
