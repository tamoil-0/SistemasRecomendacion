import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="SaludPuno Inicio">
          <img src="/brand/saludpuno-logo.png" alt="SaludPuno" className="h-10 w-10 rounded-xl object-contain transition group-hover:scale-105" />
          <div className="hidden sm:block">
            <span className="block text-[15px] font-extrabold text-gray-900 tracking-tight leading-tight">SaludPuno</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">Recomendacion preventiva</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacion principal">
          <a href="#como-funciona" className="rounded-lg px-3 py-2 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">Como funciona</a>
          <a href="#tecnologia" className="rounded-lg px-3 py-2 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">Tecnologia</a>
          <a href="#cobertura" className="rounded-lg px-3 py-2 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">Cobertura</a>
          <div className="mx-2 h-5 w-px bg-gray-200" />
          <Link to="/login" className="btn-primary py-2 px-5 text-[13px]">
            Iniciar sesion
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <button type="button" className="rounded-lg p-2 text-gray-600 hover:bg-gray-50 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-50 bg-white px-6 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <a href="#como-funciona" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Como funciona</a>
            <a href="#tecnologia" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Tecnologia</a>
            <a href="#cobertura" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cobertura</a>
            <div className="my-1 h-px bg-gray-100" />
            <Link to="/login" onClick={() => setOpen(false)} className="btn-primary text-sm text-center mt-1">Iniciar sesion</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
