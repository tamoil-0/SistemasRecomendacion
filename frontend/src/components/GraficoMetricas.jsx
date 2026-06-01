import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function GraficoMetricas({ recomendaciones = [] }) {
  const data = recomendaciones.map((item) => ({
    nombre: `#${item.rank}`,
    score: item.score_final,
  }))

  return (
    <div className="dashboard-band h-80 p-5">
      <p className="section-title">Metricas</p>
      <h2 className="mb-4 mt-1 text-base font-extrabold text-gray-950">Score por establecimiento</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="brandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A2AAE" />
              <stop offset="100%" stopColor="#9A7BFF" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF2" />
          <XAxis dataKey="nombre" stroke="#9CA3AF" tickLine={false} axisLine={false} fontSize={12} fontWeight={600} />
          <YAxis domain={[0, 1]} stroke="#9CA3AF" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            formatter={(value) => Number(value).toFixed(3)}
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #ECEEF2',
              borderRadius: '12px',
              color: '#0D0B1A',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              padding: '12px 16px',
            }}
            cursor={{ fill: 'rgba(74, 42, 174, 0.03)' }}
          />
          <Bar dataKey="score" fill="url(#brandGradient)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
