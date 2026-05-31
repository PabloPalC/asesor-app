import { getSessionContext } from '@/lib/auth'
import ClientsTable from '@/components/ClientsTable'
import CopyCode from '@/components/CopyCode'

export default async function ClientesPage() {
  const { supabase, tenant } = await getSessionContext()

  const [{ data: clients = [] }, { data: docs = [] }] = await Promise.all([
    supabase.from('profiles').select('id, full_name, email, company, status, created_at')
      .eq('tenant_id', tenant.id).eq('role', 'cliente').order('created_at', { ascending: false }),
    supabase.from('documents').select('client_id').eq('tenant_id', tenant.id),
  ])

  const counts = docs.reduce((acc, d) => { acc[d.client_id] = (acc[d.client_id] || 0) + 1; return acc }, {})
  const withCounts = clients.map((c) => ({ ...c, docCount: counts[c.id] || 0 }))

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-sub">{clients.length} {clients.length === 1 ? 'cliente' : 'clientes'} en tu despacho</p>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <CopyCode code={tenant.join_code} label="¿Nuevo cliente? Comparte tu código" />
      </div>

      <ClientsTable clients={withCounts} />
    </div>
  )
}
