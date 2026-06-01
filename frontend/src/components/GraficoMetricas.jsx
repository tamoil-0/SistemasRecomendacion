import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function GraficoMetricas({ recomendaciones = [] }) {
  const data = recomendaciones.map((item) => ({
    nombre: `#${item.rank}`,
    score: item.score_final,
  }))

  return (
    <div className="h-72 rounded-2xl app-surface p-4">
      <p className="section-title">Metricas</p>
      <h2 className="mb-3 mt-1 text-lg font-black text-white">Score por establecimiento</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 211, 252, 0.16)" />
          <XAxis dataKey="nombre" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 1]} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => Number(value).toFixed(3)}
            contentStyle={{
              background: '#0f172a',
              border: '1px solid rgba(125, 211, 252, 0.18)',
              borderRadius: '12px',
              color: '#e0f2fe',
            }}
            cursor={{ fill: 'rgba(34, 211, 238, 0.08)' }}
          />
          <Bar dataKey="score" fill="#22D3EE" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
