import { getSessionContext } from '@/lib/auth'
import { StatCard, SectionCard } from '@/components/ui'
import UploadDocument from '@/components/UploadDocument'
import DocumentList from '@/components/DocumentList'
import { timeAgo } from '@/lib/format'

export default async function PortalHome() {
  const { supabase, profile, tenant } = await getSessionContext()

  const [{ data: docs = [] }, { data: activity = [] }] = await Promise.all([
    supabase.from('documents').select('*').eq('client_id', profile.id).order('created_at', { ascending: false }),
    supabase.from('activity').select('*').eq('client_id', profile.id).order('created_at', { ascending: false }).limit(6),
  ])

  const fromAdvisor = docs.filter((d) => d.direction === 'to_client').length
  const fromMe = docs.length - fromAdvisor
  const recent = docs.slice(0, 5)

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Hola, {profile.full_name?.split(' ')[0] || 'cliente'} 👋</h1>
          <p className="page-sub">Tu espacio privado con {tenant.name}</p>
        </div>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 16 }}>
        <StatCard icon="FolderOpen" label="Documentos" value={docs.length} accent={tenant.primary_color} />
        <StatCard icon="ArrowDownLeft" label="De tu asesor" value={fromAdvisor} accent={tenant.primary_color} />
        <StatCard icon="ArrowUpRight" label="Subidos por ti" value={fromMe} accent={tenant.primary_color} />
        <StatCard icon="Clock" label="Última actividad" value={activity.length ? timeAgo(activity[0].created_at) : '—'} accent={tenant.primary_color} />
      </div>

      <div className="grid grid-main">
        <SectionCard title="Documentos recientes" pad={false}>
          <DocumentList docs={recent} currentUserId={profile.id} emptyText="Tu asesor aún no ha compartido documentos." />
        </SectionCard>

        <UploadDocument
          tenantId={tenant.id} clientId={profile.id} clientName={profile.full_name}
          uploaderId={profile.id} role="cliente"
        />
      </div>
    </div>
  )
}
