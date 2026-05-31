import { getSessionContext } from '@/lib/auth'
import { formatDate } from '@/lib/format'
import { Building2 } from 'lucide-react'

export default async function AdminDespachos() {
  const { supabase } = await getSessionContext()

  const [{ data: tenants = [] }, { data: profiles = [] }, { data: docs = [] }] = await Promise.all([
    supabase.from('tenants').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('id, role, tenant_id'),
    supabase.from('documents').select('id, tenant_id'),
  ])

  const clientCount = {}
  const ownerName = {}
  for (const p of profiles) {
    if (p.role === 'cliente') clientCount[p.tenant_id] = (clientCount[p.tenant_id] || 0) + 1
  }
  const docCount = {}
  for (const d of docs) docCount[d.tenant_id] = (docCount[d.tenant_id] || 0) + 1

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Despachos</h1>
          <p className="page-sub">{tenants.length} despachos registrados</p>
        </div>
      </div>

      <div className="card card-pad-0">
        {tenants.length === 0 ? (
          <div className="empty"><Building2 size={32} /><div>No hay despachos todavía.</div></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Despacho</th>
                  <th>Área</th>
                  <th>Código</th>
                  <th>Clientes</th>
                  <th>Documentos</th>
                  <th>Plan</th>
                  <th>Alta</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: t.primary_color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 12 }}>
                          {t.logo_text}
                        </div>
                        <strong>{t.name}</strong>
                      </div>
                    </td>
                    <td className="muted">{t.area}</td>
                    <td><span className="badge badge-muted" style={{ fontFamily: 'monospace' }}>{t.join_code}</span></td>
                    <td className="muted">{clientCount[t.id] || 0}</td>
                    <td className="muted">{docCount[t.id] || 0}</td>
                    <td><span className="badge badge-green">{t.plan}</span></td>
                    <td className="muted">{formatDate(t.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
