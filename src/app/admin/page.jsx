import { getSessionContext } from '@/lib/auth'
import { StatCard, SectionCard } from '@/components/ui'
import { AreaTrend, CategoryPie, PieLegend } from '@/components/Charts'
import { monthlySeries, countBy } from '@/lib/format'
import * as Icons from 'lucide-react'

export default async function AdminHome() {
  const { supabase } = await getSessionContext()

  const [{ data: tenants = [] }, { data: profiles = [] }, { data: docs = [] }] = await Promise.all([
    supabase.from('tenants').select('id, name, area, created_at'),
    supabase.from('profiles').select('id, role, created_at'),
    supabase.from('documents').select('id, created_at'),
  ])

  const asesores = profiles.filter((p) => p.role === 'asesor').length
  const clientes = profiles.filter((p) => p.role === 'cliente').length
  const tenantSeries = monthlySeries(tenants, { key: 'despachos' })
  const byArea = countBy(tenants, 'area')

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Resumen global</h1>
          <p className="page-sub">Vista de administrador de toda la plataforma</p>
        </div>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 16 }}>
        <StatCard icon="Building2" label="Despachos" value={tenants.length} accent="#2563eb" />
        <StatCard icon="Briefcase" label="Asesores" value={asesores} accent="#2563eb" />
        <StatCard icon="Users" label="Clientes" value={clientes} accent="#2563eb" />
        <StatCard icon="FolderOpen" label="Documentos" value={docs.length} accent="#2563eb" />
      </div>

      <div className="grid grid-2">
        <SectionCard title="Nuevos despachos por mes"><AreaTrend data={tenantSeries} dataKey="despachos" /></SectionCard>
        <SectionCard title="Despachos por área">
          {byArea.length
            ? <><CategoryPie data={byArea} /><PieLegend data={byArea} /></>
            : <div className="empty"><Icons.PieChart size={32} /><div>Sin datos</div></div>}
        </SectionCard>
      </div>
    </div>
  )
}
