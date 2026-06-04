import { Link } from 'react-router-dom'
import { ArrowRight, Brain, CheckCircle2, Database, Gauge, HeartPulse, MapPin, Route, Shield, Thermometer, Users, Zap } from 'lucide-react'
import MetodoRecomendacion from '../components/MetodoRecomendacion'

const stats = [
  { value: '200+', label: 'Establecimientos', desc: 'Registrados en RENIPRESS' },
  { value: '16', label: 'Servicios', desc: 'Preventivos catalogados' },
  { value: '4', label: 'Factores', desc: 'De recomendacion' },
  { value: '13', label: 'Provincias', desc: 'Region Puno' },
]

const steps = [
  { n: '01', title: 'Selecciona tu necesidad', desc: 'Indica el servicio preventivo, tu ubicacion y parametros de busqueda personalizados.', icon: HeartPulse, img: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop&q=80' },
  { n: '02', title: 'Analisis inteligente', desc: 'El motor calcula similitud coseno, distancia Haversine, capacidad operativa y riesgo climatico.', icon: Brain, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80' },
  { n: '03', title: 'Ranking recomendado', desc: 'Recibe un listado priorizado con mapa interactivo, scores explicables y trazabilidad completa.', icon: Route, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80' },
]

const features = [
  { icon: Brain, title: 'Similitud coseno', desc: 'Vectorizacion de servicios para comparar necesidad del usuario con oferta del establecimiento.' },
  { icon: MapPin, title: 'Distancia Haversine', desc: 'Calculo preciso de distancia geografica considerando la curvatura terrestre.' },
  { icon: Gauge, title: 'Capacidad operativa', desc: 'Evaluacion de la capacidad de atencion segun categoria y nivel del establecimiento.' },
  { icon: Thermometer, title: 'Penalidad climatica', desc: 'Ajuste del score por alertas SENAMHI para evitar zonas con riesgo operativo.' },
  { icon: Shield, title: 'Datos verificados', desc: 'Informacion oficial de RENIPRESS-MINSA actualizada y validada periodicamente.' },
  { icon: Database, title: 'Trazabilidad completa', desc: 'Historial de consultas con datos minimos y finalidad exclusivamente preventiva.' },
]

export default function HomePage() {
  return (
    <div className="animate-rise">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/95 to-brand-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-400/15 px-4 py-2 text-sm font-semibold text-brand-200 backdrop-blur">
                <Zap className="h-3.5 w-3.5" />
                Plataforma de orientacion preventiva — Region Puno
              </div>
              <h1 className="mt-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
                Encuentra el GAAAAAA de salud{' '}
                <span className="bg-gradient-to-r from-brand-300 to-brand-400 bg-clip-text text-transparent">preventiva</span>{' '}
                mas adecuado
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-gray-300/90">
                Recomendaciones inteligentes basadas en servicios disponibles, distancia geografica, capacidad operativa y condiciones climaticas.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className="btn-primary bg-gradient-to-r from-brand-600 to-brand-400 px-7 py-3.5 text-base shadow-xl shadow-brand-600/25 hover:shadow-brand-400/30">
                  Comenzar ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="btn-secondary border-white/15 bg-white/5 px-7 py-3.5 text-base text-white hover:bg-white/10 hover:border-white/25 hover:text-white">
                  Acceder al sistema
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Datos RENIPRESS oficiales</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Alertas SENAMHI</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ranking explicable</span>
              </div>
            </div>

            <div className="hidden lg:block animate-rise-d2">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=500&fit=crop&q=80"
                  alt="Centro de salud"
                  className="rounded-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/15 bg-brand-900/90 p-4 shadow-heavy backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                      <HeartPulse className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-white">98.7%</p>
                      <p className="text-xs font-semibold text-gray-400">Score de precision</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-8 rounded-2xl border border-white/15 bg-brand-900/90 p-4 shadow-heavy backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-400/20">
                      <Users className="h-5 w-5 text-brand-300" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-white">200+</p>
                      <p className="text-[11px] font-semibold text-gray-400">Establecimientos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4">
            {stats.map(({ value, label, desc }, i) => (
              <div key={label} className={`rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur animate-rise-d${Math.min(i + 1, 3)}`}>
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-sm font-bold text-brand-200">{label}</p>
                <p className="mt-0.5 text-xs text-brand-300/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA ═══ */}
      <section id="como-funciona" className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-title">Como funciona</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Tres pasos hacia la recomendacion inteligente</h2>
            <p className="mt-4 text-lg text-gray-500">El sistema procesa tu solicitud y genera un ranking explicable basado en datos reales del territorio.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {steps.map(({ n, title, desc, icon: Icon, img }, i) => (
              <article key={n} className={`card group overflow-hidden animate-rise-d${Math.min(i + 1, 3)}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={img} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                    <span className="text-sm font-extrabold">{n}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECNOLOGIA / FACTORES ═══ */}
      <section id="tecnologia" className="bg-surface-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-title">Tecnologia del recomendador</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Modelo transparente y explicable</h2>
              <p className="mt-4 text-base leading-7 text-gray-500">
                Nuestro motor combina cuatro factores clave para priorizar los establecimientos mas adecuados segun tu necesidad, ubicacion y condiciones del entorno.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {features.slice(0, 4).map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="card p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-gray-900">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&h=500&fit=crop&q=80"
                alt="Analisis de datos"
                className="rounded-3xl object-cover shadow-heavy w-full h-[460px]"
              />
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-elevated">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Formula del ranking</p>
                <p className="mt-2 text-center font-mono text-lg font-bold text-gray-900">
                  Score = Similitud<sub>cos</sub> × (1 − P<sub>clima</sub>) × f(d, c)
                </p>
                <p className="mt-2 text-xs text-gray-500 text-center">Donde d = distancia Haversine, c = capacidad, P = penalidad climatica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COBERTURA ═══ */}
      <section id="cobertura" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=700&h=500&fit=crop&q=80"
                alt="Region Puno"
                className="rounded-3xl object-cover shadow-heavy w-full h-[420px]"
              />
            </div>
            <div>
              <p className="section-title">Cobertura territorial</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Disenado para la Region Puno</h2>
              <p className="mt-4 text-base leading-7 text-gray-500">
                El sistema opera con datos georeferenciados de establecimientos de salud registrados en RENIPRESS, cubriendo las 13 provincias de la Region Puno.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.slice(4, 6).map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-gray-100 bg-surface-50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-gray-900">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
              <Link to="/login" className="btn-primary mt-8 px-6">
                Explorar la plataforma
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ METODO ═══ */}
      <section className="bg-surface-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MetodoRecomendacion />
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Comienza a explorar recomendaciones preventivas</h2>
          <p className="mt-4 text-lg text-gray-400">Accede al sistema de recomendacion en tiempo real.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/login" className="btn-primary bg-gradient-to-r from-brand-600 to-brand-400 px-8 py-3.5 text-base shadow-xl shadow-brand-600/25">
              Iniciar sesion
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
