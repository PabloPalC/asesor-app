'use client'

import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#06b6d4', '#ec4899', '#64748b']

const axis = { stroke: '#64748b', fontSize: 12, tickLine: false, axisLine: false }
const tooltipStyle = {
  contentStyle: { background: '#16223a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, color: '#f1f5f9' },
  labelStyle: { color: '#94a3b8' },
  cursor: { fill: 'rgba(255,255,255,.04)' },
}

export function AreaTrend({ data, dataKey, color = 'var(--accent)' }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis allowDecimals={false} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey={dataKey} stroke="#3b82f6" strokeWidth={2.5}
          fill={`url(#g-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function BarSeries({ data, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis allowDecimals={false} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey={dataKey} fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function LineTrend({ data, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis allowDecimals={false} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Line type="monotone" dataKey={dataKey} stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CategoryPie({ data }) {
  if (!data.length) return null
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
          innerRadius={55} outerRadius={88} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function PieLegend({ data }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', marginTop: 12 }}>
      {data.map((d, i) => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i % PIE_COLORS.length] }} />
          <span className="muted">{d.name}</span>
          <strong>{d.value}</strong>
        </div>
      ))}
    </div>
  )
}
