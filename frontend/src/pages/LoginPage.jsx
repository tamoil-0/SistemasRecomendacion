import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, GitCompareArrows, LockKeyhole, Mail, MapPinned, SlidersHorizontal, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, register, sessionMessage } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [tab, setTab] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(loginForm)
      navigate(location.state?.from || '/buscar')
    } catch {
      setError('Credenciales invalidas. Verifica tu correo y contrasena.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(registerForm)
      navigate('/buscar')
    } catch (err) {
      setError(err.response?.data?.detail || 'No se pudo registrar el usuario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-73px)]">
      {/* Left — visual */}
      <div className="relative hidden w-[48%] bg-brand-950 lg:block">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&h=1400&fit=crop&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/90 to-brand-800/80" />
        <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
          <div className="flex items-center gap-3">
            <img src="/brand/saludpuno-logo.png" alt="SaludPuno" className="h-10 w-10 rounded-xl object-contain" />
            <span className="text-base font-extrabold text-white">SaludPuno</span>
          </div>

          <div>
            <h1 className="max-w-lg text-3xl font-extrabold leading-tight text-white lg:text-4xl">
              Recomendaciones preventivas basadas en datos reales.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-gray-300/80">
              El sistema compara tu necesidad con los servicios de cada establecimiento y ordena las mejores opciones para ti.
            </p>
            <div className="mt-10 grid gap-3">
              <StatusCard icon={GitCompareArrows} label="Tipo de recomendacion" value="Basada en contenido" />
              <StatusCard icon={SlidersHorizontal} label="Metodo de ranking" value="Similitud coseno" />
              <StatusCard icon={MapPinned} label="Ajuste territorial" value="Distancia + clima" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-400/70" />
            <span>Datos oficiales RENIPRESS + SENAMHI</span>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <img src="/brand/saludpuno-logo.png" alt="SaludPuno" className="h-10 w-10 rounded-xl object-contain" />
            <span className="text-lg font-extrabold text-gray-900">SaludPuno</span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl border border-gray-200 bg-surface-50 p-1">
            <button
              type="button"
              onClick={() => { setTab('login'); setError('') }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${tab === 'login' ? 'bg-white text-gray-900 shadow-soft' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Iniciar sesion
            </button>
            <button
              type="button"
              onClick={() => { setTab('register'); setError('') }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${tab === 'register' ? 'bg-white text-gray-900 shadow-soft' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Crear cuenta
            </button>
          </div>

          {(sessionMessage || error) && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <p className="text-sm font-medium text-red-700">{error || sessionMessage}</p>
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="mt-6 grid gap-5">
              <Field icon={Mail} label="Correo electronico">
                <input
                  type="email"
                  required
                  className="field w-full pl-11"
                  placeholder="tu@correo.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((c) => ({ ...c, email: e.target.value }))}
                />
              </Field>
              <Field icon={LockKeyhole} label="Contrasena">
                <input
                  type="password"
                  required
                  minLength="8"
                  className="field w-full pl-11"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((c) => ({ ...c, password: e.target.value }))}
                />
              </Field>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-1 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Validando...
                  </span>
                ) : (
                  <>Ingresar al sistema<ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-6 grid gap-5">
              <Field icon={UserRound} label="Nombre completo">
                <input
                  required
                  minLength="2"
                  className="field w-full pl-11"
                  placeholder="Tu nombre completo"
                  value={registerForm.nombre}
                  onChange={(e) => setRegisterForm((c) => ({ ...c, nombre: e.target.value }))}
                />
              </Field>
              <Field icon={Mail} label="Correo electronico">
                <input
                  type="email"
                  required
                  className="field w-full pl-11"
                  placeholder="tu@correo.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm((c) => ({ ...c, email: e.target.value }))}
                />
              </Field>
              <Field icon={LockKeyhole} label="Contrasena">
                <input
                  type="password"
                  required
                  minLength="8"
                  className="field w-full pl-11"
                  placeholder="Minimo 8 caracteres"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm((c) => ({ ...c, password: e.target.value }))}
                />
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
          )}

          <div className="mt-8 rounded-2xl border border-gray-100 bg-surface-50 p-5">
            <p className="text-sm font-bold text-gray-900">Cuentas de prueba</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-2.5 text-sm">
                <div><span className="font-semibold text-gray-700">Usuario</span><span className="text-gray-400 ml-2">demo@puno.pe</span></div>
                <code className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">password123</code>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-2.5 text-sm">
                <div><span className="font-semibold text-gray-700">Admin</span><span className="text-gray-400 ml-2">admin@puno.pe</span></div>
                <code className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">admin12345</code>
              </div>
            </div>
          </div>
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

function StatusCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-sm transition hover:bg-white/[0.07]">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        <Icon className="h-4 w-4 text-brand-400" />
        {label}
      </p>
      <p className="mt-2 text-base font-bold text-white">{value}</p>
    </div>
  )
}
