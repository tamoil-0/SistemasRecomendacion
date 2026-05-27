import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function GraficoMetricas({ recomendaciones = [] }) {
  const data = recomendaciones.map((item) => ({
    nombre: `#${item.rank}`,
    score: item.score_final,
  }))

  return (
    <div className="h-72 rounded-lg app-surface p-4">
      <p className="section-title">Metricas</p>
      <h2 className="mb-3 mt-1 text-lg font-black text-slate-950">Score por establecimiento</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="nombre" />
          <YAxis domain={[0, 1]} />
          <Tooltip formatter={(value) => Number(value).toFixed(3)} />
          <Bar dataKey="score" fill="#2E7D32" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
