import { Activity, ClipboardList, History, LogIn, LogOut, MapPinned, Shield } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const baseClass = 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition'
const activeClass = 'bg-primary text-white shadow-sm'
const inactiveClass = 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-3 text-primary" aria-label="Inicio Salud Preventiva Puno">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-sm">
            <Activity className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black leading-tight text-slate-950 sm:text-lg">Salud Preventiva Puno</span>
            <span className="block text-xs font-semibold text-slate-500">RENIPRESS + SENAMHI</span>
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
              <button type="button" onClick={handleLogout} className={`${baseClass} ${inactiveClass}`} aria-label="Cerrar sesion">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Ingresar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
