import { Users, FolderOpen, TrendingUp, FileText, ArrowUpRight, Upload, FileSignature, UserPlus, FileQuestion, CheckCircle2 } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useTenant } from '../context/TenantContext'
import { DEMO_CLIENTS, DEMO_FILES, DEMO_REVENUE, DEMO_CLIENTS_GROWTH, DEMO_ACTIVITY } from '../data/mockData'
import './Dashboard.css'

const ICONS = {
  upload: Upload,
  sign: FileSignature,
  new: UserPlus,
  request: FileQuestion,
  payment: CheckCircle2,
}

export default function Dashboard() {
  const { tenant } = useTenant()
  const totalClients = DEMO_CLIENTS.length
  const activeClients = DEMO_CLIENTS.filter(c => c.status === 'active').length
  const totalFiles = DEMO_FILES.length
  const lastRevenue = DEMO_REVENUE[DEMO_REVENUE.length - 1].value
  const prevRevenue = DEMO_REVENUE[DEMO_REVENUE.length - 2].value
  const growth = (((lastRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1)

  return (
    <div className="dashboard">
      <div className="page-head">
        <div>
          <h1 className="page-title">Bienvenido de nuevo, {tenant.ownerName.split(' ')[0]}</h1>
          <p className="page-sub">Aquí tienes el resumen de tu actividad reciente</p>
        </div>
      </div>

      <div className="kpis">
        <KpiCard icon={<Users />} label="Clientes activos" value={activeClients} sub={`${totalClients} en total`} trend="+12%" color={tenant.primaryColor} />
        <KpiCard icon={<FolderOpen />} label="Archivos" value={totalFiles} sub="este mes" trend="+8%" color="#10b981" />
        <KpiCard icon={<TrendingUp />} label="Ingresos" value={`€${(lastRevenue/1000).toFixed(1)}k`} sub="mayo 2025" trend={`+${growth}%`} color="#f59e0b" />
        <KpiCard icon={<FileText />} label="Tareas" value="14" sub="3 vencen hoy" trend="" color="#ef4444" warn />
      </div>

      <div className="dash-grid">
        <div className="card chart-card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Ingresos mensuales</h3>
              <p className="card-sub">Últimos 5 meses</p>
            </div>
            <div className="card-badge up">+{growth}%</div>
          </div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <AreaChart data={DEMO_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={tenant.primaryColor} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={tenant.primaryColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke={tenant.primaryColor} strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Crecimiento clientes</h3>
              <p className="card-sub">Acumulado</p>
            </div>
            <div className="card-badge up">+22%</div>
          </div>
          <div style={{ width: '100%', height: 220 }}>
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

        <div className="card activity-card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Actividad reciente</h3>
              <p className="card-sub">Últimas acciones de tus clientes</p>
            </div>
          </div>
          <ul className="activity-list">
            {DEMO_ACTIVITY.map(a => {
              const Icon = ICONS[a.type] || FileText
              return (
                <li key={a.id} className="activity-item">
                  <div className="activity-icon" style={{ background: `${tenant.primaryColor}22`, color: tenant.primaryColor }}>
                    <Icon size={15} />
                  </div>
                  <div className="activity-body">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ icon, label, value, sub, trend, color, warn }) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: `${color}22`, color }}>{icon}</div>
        {trend && <div className={`kpi-trend ${warn ? 'warn' : 'up'}`}>{!warn && <ArrowUpRight size={12} />} {trend}</div>}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  )
}
