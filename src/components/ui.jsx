import * as Icons from 'lucide-react'

export function StatCard({ icon, label, value, hint, accent }) {
  const Icon = Icons[icon] || Icons.Activity
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12, flexShrink: 0,
        display: 'grid', placeItems: 'center',
        background: accent ? 'rgba(37,99,235,.15)' : 'rgba(148,163,184,.12)',
        color: accent || '#cbd5e1',
      }}>
        <Icon size={22} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>{value}</div>
        <div className="muted" style={{ fontSize: 13 }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 2 }}>{hint}</div>}
      </div>
    </div>
  )
}

const STATUS = {
  active: { cls: 'badge-green', label: 'Activo' },
  pending: { cls: 'badge-yellow', label: 'Pendiente' },
  inactive: { cls: 'badge-muted', label: 'Inactivo' },
}

export function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.active
  return <span className={`badge ${s.cls}`}>{s.label}</span>
}

export function SectionCard({ title, action, children, pad = true }) {
  return (
    <div className={`card ${pad ? '' : 'card-pad-0'}`}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: pad ? '0 0 16px' : '18px 20px', borderBottom: pad ? 'none' : '1px solid var(--border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
