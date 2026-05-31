import { getSessionContext } from '@/lib/auth'
import { StatCard, SectionCard } from '@/components/ui'
import { AreaTrend, CategoryPie, PieLegend } from '@/components/Charts'
import CopyCode from '@/components/CopyCode'
import { monthlySeries, countBy, timeAgo } from '@/lib/format'
import * as Icons from 'lucide-react'

export default async function AsesorDashboard() {
  const { supabase, profile, tenant } = await getSessionContext()

  const [{ data: clients = [] }, { data: docs = [] }, { data: activity = [] }] = await Promise.all([
    supabase.from('profiles').select('id, status, created_at').eq('tenant_id', tenant.id).eq('role', 'cliente'),
    supabase.from('documents').select('id, category, created_at').eq('tenant_id', tenant.id),
    supabase.from('activity').select('*').eq('tenant_id', tenant.id).order('created_at', { ascending: false }).limit(8),
  ])

  const activeClients = clients.filter((c) => c.status === 'active').length
  const now = new Date()
  const docsThisMonth = docs.filter((d) => {
    const dt = new Date(d.created_at)
    return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear()
  }).length

  const docSeries = monthlySeries(docs, { key: 'docs' })
  const categories = countBy(docs, 'category')

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Hola, {profile.full_name?.split(' ')[0] || 'Asesor'} 👋</h1>
          <p className="page-sub">Resumen de {tenant.name}</p>
        </div>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 16 }}>
        <StatCard icon="Users" label="Clientes" value={clients.length} hint={`${activeClients} activos`} accent={tenant.primary_color} />
        <StatCard icon="FolderOpen" label="Documentos" value={docs.length} hint={`${docsThisMonth} este mes`} accent={tenant.primary_color} />
        <StatCard icon="Clock" label="Actividad" value={activity.length ? timeAgo(activity[0].created_at) : '—'} hint="Último movimiento" accent={tenant.primary_color} />
        <StatCard icon="Crown" label={`Plan ${tenant.plan}`} value="Activo" hint="Tu suscripción" accent={tenant.primary_color} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <CopyCode code={tenant.join_code} />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 16 }}>
        <SectionCard title="Documentos por mes">
          <AreaTrend data={docSeries} dataKey="docs" />
        </SectionCard>
        <SectionCard title="Documentos por categoría">
          {categories.length
            ? <><CategoryPie data={categories} /><PieLegend data={categories} /></>
            : <div className="empty"><Icons.PieChart size={32} /><div>Aún no hay documentos</div></div>}
        </SectionCard>
      </div>

      <SectionCard title="Actividad reciente" pad={false}>
        {activity.length === 0 ? (
          <div className="empty"><Icons.Activity size={32} /><div>Sin actividad todavía</div></div>
        ) : (
          <div>
            {activity.map((a) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14 }}>{a.text}</span>
                <span className="muted" style={{ fontSize: 12.5, whiteSpace: 'nowrap' }}>{timeAgo(a.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  )
}
