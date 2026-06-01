import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Mail, Building2, Calendar } from 'lucide-react'
import { getSessionContext } from '@/lib/auth'
import { SectionCard } from '@/components/ui'
import ClientStatusControl from '@/components/ClientStatusControl'
import UploadDocument from '@/components/UploadDocument'
import DocumentList from '@/components/DocumentList'
import { formatDate, timeAgo } from '@/lib/format'

export default async function ClientDetailPage({ params }) {
  const { id } = await params
  const { supabase, profile, tenant } = await getSessionContext()

  const { data: client } = await supabase
    .from('profiles').select('*')
    .eq('id', id).eq('tenant_id', tenant.id).eq('role', 'cliente').single()

  if (!client) notFound()

  const [{ data: docs = [] }, { data: activity = [] }] = await Promise.all([
    supabase.from('documents').select('*').eq('client_id', id).order('created_at', { ascending: false }),
    supabase.from('activity').select('*').eq('client_id', id).order('created_at', { ascending: false }).limit(8),
  ])

  return (
    <div>
      <Link href="/app/clientes" className="row muted" style={{ fontSize: 14, marginBottom: 18, width: 'fit-content' }}>
        <ArrowLeft size={16} /> Clientes
      </Link>

      <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--accent)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 800, flexShrink: 0 }}>
          {(client.full_name || '?').split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>{client.full_name}</h1>
          <div style={{ display: 'flex', gap: '6px 16px', flexWrap: 'wrap', marginTop: 6, color: 'var(--muted)', fontSize: 13.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0, maxWidth: '100%' }}><Mail size={14} style={{ flexShrink: 0 }} /> <span className="break">{client.email}</span></span>
            {client.company && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0 }}><Building2 size={14} style={{ flexShrink: 0 }} /> <span className="break">{client.company}</span></span>}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={14} style={{ flexShrink: 0 }} /> Alta {formatDate(client.created_at)}</span>
          </div>
        </div>
        <ClientStatusControl clientId={client.id} status={client.status} />
      </div>

      <div className="grid grid-main">
        <div className="col" style={{ gap: 16 }}>
          <SectionCard title={`Documentos (${docs.length})`} pad={false}>
            <DocumentList docs={docs} canDelete showClient={false} emptyText="Aún no hay documentos con este cliente." />
          </SectionCard>
        </div>

        <div className="col" style={{ gap: 16 }}>
          <UploadDocument
            tenantId={tenant.id} clientId={client.id} clientName={client.full_name}
            uploaderId={profile.id} role="asesor"
          />
          <SectionCard title="Actividad" pad={false}>
            {activity.length === 0 ? (
              <div className="empty" style={{ padding: 28 }}><div className="muted">Sin actividad</div></div>
            ) : (
              <div>
                {activity.map((a) => (
                  <div key={a.id} style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13.5 }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 2 }}>{timeAgo(a.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
