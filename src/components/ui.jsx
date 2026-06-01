import * as Icons from 'lucide-react'

export function StatCard({ icon, label, value, hint, accent }) {
  const Icon = Icons[icon] || Icons.Activity
  const a = accent || '#64748b'
  return (
    <div className="card card-accent lift" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 48, height: 48, borderRadius: 13, flexShrink: 0,
        display: 'grid', placeItems: 'center', color: '#fff',
        background: `linear-gradient(140deg, ${a}, ${a}99)`,
        boxShadow: `0 8px 20px -8px ${a}`,
      }}>
        <Icon size={22} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-.02em', overflowWrap: 'break-word' }}>{value}</div>
        <div className="muted" style={{ fontSize: 13, overflowWrap: 'break-word' }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 2, overflowWrap: 'break-word' }}>{hint}</div>}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: pad ? '0 0 16px' : '18px 20px', borderBottom: pad ? 'none' : '1px solid var(--border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 16, borderRadius: 99, background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            {title}
          </h3>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
