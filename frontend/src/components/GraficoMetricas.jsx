import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function GraficoMetricas({ recomendaciones = [] }) {
  const data = recomendaciones.map((item) => ({
    nombre: `#${item.rank}`,
    score: item.score_final,
  }))

  return (
    <div className="h-64 rounded-lg app-surface p-4">
      <h2 className="mb-3 text-sm font-bold text-slate-800">Scores por establecimiento</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis domain={[0, 1]} />
          <Tooltip formatter={(value) => Number(value).toFixed(3)} />
          <Bar dataKey="score" fill="#2E7D32" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
