import { ChevronLeft, ChevronRight, ClipboardList, History, LogOut, Search, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/buscar',     icon: Search,        label: 'Nueva consulta', badge: 'IA' },
  { to: '/resultados', icon: ClipboardList,  label: 'Resultados',    badge: null },
  { to: '/historial',  icon: History,        label: 'Historial',     badge: null },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  function handleLogout() { logout(); navigate('/login') }

  const initial = (user?.nombre || user?.email || 'U').charAt(0).toUpperCase()

  return (
    <>
      <aside className={`sidebar fixed inset-y-0 left-0 z-40 flex flex-col transition-[width] duration-300 ease-in-out ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>

        {/* ── Brand ── */}
        <div className={`relative flex shrink-0 items-center border-b border-white/[0.06] ${collapsed ? 'justify-center px-0 py-5' : 'gap-3 px-5 py-5'}`}>
          <img src="/brand/saludpuno-logo.png" alt="SaludPuno" className="h-9 w-9 shrink-0 rounded-xl object-contain" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[14px] font-black tracking-tight text-white">SaludPuno</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.9)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Sistema activo</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4">
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/20">Navegacion</p>
          )}

          <div className="space-y-0.5">
            {links.map(({ to, icon: Icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center overflow-hidden rounded-lg transition-all duration-150 ${
                    collapsed ? 'justify-center p-3' : 'gap-2.5 px-3 py-2.5'
                  } ${isActive ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* glow strip active */}
                    {isActive && (
                      <span className="absolute inset-y-0 left-0 w-[2px] rounded-r-full bg-brand-400"
                        style={{ boxShadow: '2px 0 12px 2px rgba(154,123,255,0.5)' }} />
                    )}

                    {/* icon */}
                    <div className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md transition-all duration-150 ${
                      isActive ? 'bg-brand-400/15' : 'group-hover:bg-white/[0.07]'
                    }`}>
                      <Icon className={`h-[14px] w-[14px] transition-colors duration-150 ${
                        isActive ? 'text-brand-300' : 'text-white/35 group-hover:text-white/75'
                      }`} />
                    </div>

                    {!collapsed && (
                      <>
                        <span className={`flex-1 text-[12.5px] font-semibold tracking-tight transition-colors duration-150 ${
                          isActive ? 'text-white' : 'text-white/50 group-hover:text-white/85'
                        }`}>
                          {label}
                        </span>
                        {badge && (
                          <span className="rounded bg-brand-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-brand-300">
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {user?.is_admin && (
            <>
              <div className="my-3 mx-2 h-px bg-white/[0.06]" />
              {!collapsed && (
                <p className="mb-1.5 px-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/20">Sistema</p>
              )}
              <NavLink
                to="/admin"
                title={collapsed ? 'Admin' : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center overflow-hidden rounded-lg transition-all duration-150 ${
                    collapsed ? 'justify-center p-3' : 'gap-2.5 px-3 py-2.5'
                  } ${isActive ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-y-0 left-0 w-[2px] rounded-r-full bg-brand-400"
                        style={{ boxShadow: '2px 0 12px 2px rgba(154,123,255,0.5)' }} />
                    )}
                    <div className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md transition-all duration-150 ${
                      isActive ? 'bg-brand-400/15' : 'group-hover:bg-white/[0.07]'
                    }`}>
                      <Shield className={`h-[14px] w-[14px] transition-colors duration-150 ${
                        isActive ? 'text-brand-300' : 'text-white/35 group-hover:text-white/75'
                      }`} />
                    </div>
                    {!collapsed && (
                      <span className={`text-[12.5px] font-semibold tracking-tight transition-colors duration-150 ${
                        isActive ? 'text-white' : 'text-white/50 group-hover:text-white/85'
                      }`}>
                        Panel admin
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </>
          )}
        </nav>

        {/* ── Engine chip ── */}
        {!collapsed && (
          <div className="mx-2.5 mb-3 flex items-center gap-2 rounded-lg border border-brand-400/10 bg-brand-400/[0.07] px-3 py-2.5">
            <Zap className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-bold text-white/70">Motor activo</p>
              <p className="text-[9px] font-medium text-white/30">Filtrado basado en contenido</p>
            </div>
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
          </div>
        )}

        {/* ── User ── */}
        <div className="border-t border-white/[0.06] px-2.5 py-3">
          <div className={`flex items-center rounded-lg p-2 transition-all duration-150 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
            <div className="relative shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 text-[12px] font-black text-white shadow-md shadow-brand-900/50">
                {initial}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-[1.5px] border-[#09071B] bg-emerald-400" />
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-bold text-white/85">{user?.nombre || 'Usuario'}</p>
                  <p className="truncate text-[10px] font-medium text-white/30">{user?.email || ''}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Cerrar sesion"
                  className="shrink-0 rounded-md p-1.5 text-white/20 transition-all hover:bg-red-500/12 hover:text-red-400"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
          {collapsed && (
            <button type="button" onClick={handleLogout} title="Cerrar sesion"
              className="mt-1 flex w-full justify-center rounded-lg p-2 text-white/20 transition-all hover:bg-red-500/12 hover:text-red-400">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* ── Toggle ── */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0D0B1A] text-white/40 shadow-xl transition-all hover:border-brand-400/30 hover:text-brand-300"
          aria-label={collapsed ? 'Expandir' : 'Colapsar'}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      <div className={`shrink-0 transition-[width] duration-300 ease-in-out ${collapsed ? 'w-[68px]' : 'w-[260px]'}`} />
    </>
  )
}
