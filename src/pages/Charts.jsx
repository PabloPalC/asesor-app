import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { useTenant } from '../context/TenantContext'
import { DEMO_REVENUE, DEMO_CLIENTS_GROWTH, DEMO_CATEGORIES } from '../data/mockData'

const SATISFACTION = [
  { mes: 'Ene', satisfacción: 78 },
  { mes: 'Feb', satisfacción: 82 },
  { mes: 'Mar', satisfacción: 80 },
  { mes: 'Abr', satisfacción: 88 },
  { mes: 'May', satisfacción: 92 },
]

export default function Charts() {
  const { tenant } = useTenant()

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Gráficas y métricas</h1>
          <p className="page-sub">Visualiza la evolución de tu actividad</p>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Ingresos mensuales</h3>
              <p className="card-sub">Evolución últimos 5 meses</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={DEMO_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={tenant.primaryColor} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={tenant.primaryColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke={tenant.primaryColor} strokeWidth={2.5} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Distribución por área</h3>
              <p className="card-sub">% de archivos por categoría</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={DEMO_CATEGORIES} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {DEMO_CATEGORIES.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 12 }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Crecimiento de cartera</h3>
              <p className="card-sub">Clientes activos por mes</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={DEMO_CLIENTS_GROWTH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="clientes" fill={tenant.primaryColor} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Satisfacción cliente</h3>
              <p className="card-sub">Puntuación NPS mensual</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={SATISFACTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="satisfacción" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
