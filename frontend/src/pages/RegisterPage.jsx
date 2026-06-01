import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, ArrowRight, CheckCircle2, LockKeyhole, Mail, Shield, UserPlus, UserRound } from 'lucide-react'
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
    <section className="flex min-h-[calc(100vh-73px)]">
      {/* Left — form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-800 to-brand-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gray-900">SaludPuno</span>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <UserPlus className="h-6 w-6" />
          </div>
          <p className="section-title mt-5">Registro</p>
          <h1 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">Crea tu cuenta</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Accede al sistema de recomendacion preventiva, mantiene trazabilidad del ranking y consulta tu historial.
          </p>

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <Field icon={UserRound} label="Nombre completo">
              <input required minLength="2" className="field w-full pl-11" placeholder="Tu nombre completo" value={form.nombre} onChange={(e) => setForm((c) => ({ ...c, nombre: e.target.value }))} />
            </Field>
            <Field icon={Mail} label="Correo electronico">
              <input required type="email" className="field w-full pl-11" placeholder="tu@correo.com" value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} />
            </Field>
            <Field icon={LockKeyhole} label="Contrasena">
              <input required type="password" minLength="8" className="field w-full pl-11" placeholder="Minimo 8 caracteres" value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} />
            </Field>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-1 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creando cuenta...
                </span>
              ) : (
                <>Crear cuenta<ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Ya tienes cuenta?{' '}
            <Link className="font-semibold text-brand-600 hover:text-brand-700 hover:underline" to="/login">Iniciar sesion</Link>
          </p>
        </div>
      </div>

      {/* Right — visual */}
      <div className="relative hidden w-[48%] bg-brand-950 lg:block">
        <img
          src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1000&h=1400&fit=crop&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-950/95 via-brand-900/90 to-brand-800/80" />
        <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/30 backdrop-blur">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-bold text-brand-300">Datos protegidos</span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-400">Politica del sistema</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white">Registro minimo,<br />uso preventivo.</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-gray-300/80">
              La aplicacion trabaja con datos operativos de consulta para recomendar establecimientos, sin almacenar informacion clinica sensible.
            </p>
            <div className="mt-10 grid gap-3">
              <Check text="Email unico para identificar la sesion." />
              <Check text="Contrasena protegida con hash en backend." />
              <Check text="Token temporal JWT para rutas protegidas." />
              <Check text="Historial orientado a auditoria de consultas." />
            </div>
          </div>

          <p className="text-xs text-gray-600">Sistema academico — Universidad Nacional del Altiplano, Puno</p>
        </div>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-700">
      {label}
      <span className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" aria-hidden="true" />
        {children}
      </span>
    </label>
  )
}

function Check({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.03] p-3.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
