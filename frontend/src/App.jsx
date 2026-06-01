import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import BusquedaPage from './pages/BusquedaPage'
import ResultadosPage from './pages/ResultadosPage'
import HistorialPage from './pages/HistorialPage'
import AdminPage from './pages/AdminPage'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function DashboardLayout() {
  return (
    <div className="app-surface flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* Protected with sidebar */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/buscar" element={<BusquedaPage />} />
              <Route path="/resultados" element={<ResultadosPage />} />
              <Route path="/historial" element={<HistorialPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>
          <Route path="/registro" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-brand-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src="/brand/saludpuno-logo.png" alt="SaludPuno" className="h-10 w-10 rounded-xl object-contain" />
              <div>
                <p className="text-base font-extrabold text-white">SaludPuno</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-400">Region Puno</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Plataforma de recomendacion de centros de salud preventiva basada en inteligencia artificial para la Region Puno.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400">Tecnologia</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Filtrado basado en contenido</li>
              <li>Similitud coseno vectorial</li>
              <li>Penalidad climatica SENAMHI</li>
              <li>Formula de Haversine</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400">Fuentes de datos</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>RENIPRESS — MINSA Peru</li>
              <li>SENAMHI — Alertas climaticas</li>
              <li>Establecimientos registrados</li>
              <li>Datos territoriales Puno</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400">Institucional</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Proyecto academico</li>
              <li>Universidad Nacional del Altiplano</li>
              <li>Escuela de Ingenieria de Sistemas</li>
              <li>Sistemas de Recomendacion 2025</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/8 pt-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} SaludPuno — Sistema academico de orientacion preventiva.
            </p>
            <p className="max-w-md text-center text-xs text-gray-600 sm:text-right">
              Este sistema no reemplaza la atencion medica profesional. Orientacion preventiva basada en datos publicos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
