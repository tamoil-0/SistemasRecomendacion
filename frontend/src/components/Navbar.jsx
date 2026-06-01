import { Activity, ClipboardList, History, LogIn, LogOut, MapPinned, Shield, Sparkles, UserRound } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const baseClass = 'inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold transition'
const activeClass = 'border border-cyan-300/40 bg-cyan-400/15 text-cyan-100 shadow-glow'
const inactiveClass = 'text-slate-300 hover:bg-cyan-300/10 hover:text-white'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-slate-950/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <Link to="/" className="flex items-center gap-3 text-primary" aria-label="Inicio Salud Preventiva Puno">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-600 to-emerald-400 text-white shadow-glow">
            <Activity className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-300 shadow-glow" />
          </span>
          <span>
            <span className="block text-base font-black leading-tight text-white sm:text-lg">Salud Preventiva Puno</span>
            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/80">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              RENIPRESS + SENAMHI
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2" aria-label="Navegacion principal">
          {isAuthenticated ? (
            <>
              <NavLink to="/buscar" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                <MapPinned className="h-4 w-4" aria-hidden="true" />
                Buscar
              </NavLink>
              <NavLink to="/resultados" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Resultados
              </NavLink>
              <NavLink to="/historial" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                <History className="h-4 w-4" aria-hidden="true" />
                Historial
              </NavLink>
              {user?.is_admin && (
                <NavLink to="/admin" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Admin
                </NavLink>
              )}
              <span className="hidden h-6 w-px bg-cyan-100/15 md:inline-block" aria-hidden="true" />
              <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-cyan-200/10 bg-white/5 px-3 text-sm font-bold text-slate-200">
                <UserRound className="h-4 w-4 text-primary" aria-hidden="true" />
                {user?.nombre || user?.email || 'Usuario'}
              </span>
              <button type="button" onClick={handleLogout} className={`${baseClass} ${inactiveClass}`} aria-label="Cerrar sesion">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/registro" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                Crear cuenta
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Ingresar
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
