import { getSessionContext } from '@/lib/auth'
import DocumentsBrowser from '@/components/DocumentsBrowser'

export default async function DocumentosPage() {
  const { supabase, tenant } = await getSessionContext()

  const [{ data: docs = [] }, { data: clients = [] }] = await Promise.all([
    supabase.from('documents').select('*').eq('tenant_id', tenant.id).order('created_at', { ascending: false }),
    supabase.from('profiles').select('id, full_name').eq('tenant_id', tenant.id).eq('role', 'cliente'),
  ])

  const names = Object.fromEntries(clients.map((c) => [c.id, c.full_name]))
  const withNames = docs.map((d) => ({ ...d, clientName: names[d.client_id] }))

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Documentos</h1>
          <p className="page-sub">{docs.length} documentos en tu despacho</p>
        </div>
      </div>
      <DocumentsBrowser docs={withNames} showClient canDelete />
    </div>
  )
}
