import { Bell, CalendarDays } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth()
  const today = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-30 border-b border-surface-200 bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <img src="/brand/saludpuno-logo.png" alt="" className="h-8 w-8 shrink-0 rounded-lg object-contain xl:hidden" />
          <div className="min-w-0">
            {subtitle && <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">{subtitle}</p>}
            <h1 className="truncate text-lg font-extrabold tracking-tight text-gray-950 lg:text-xl">{title || 'Dashboard'}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-xs font-bold text-gray-600 md:flex">
            <CalendarDays className="h-4 w-4 text-brand-500" />
            {today}
          </div>
          <button type="button" className="relative rounded-lg border border-surface-200 bg-white p-2.5 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-600" />
          </button>
          <div className="hidden h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-700 to-brand-500 text-sm font-extrabold text-white shadow-soft lg:flex">
            {(user?.nombre || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  )
}
