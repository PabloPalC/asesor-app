import { getSessionContext } from '@/lib/auth'
import { SectionCard, StatCard } from '@/components/ui'
import { AreaTrend, BarSeries, LineTrend, CategoryPie, PieLegend } from '@/components/Charts'
import { monthlySeries, countBy } from '@/lib/format'
import * as Icons from 'lucide-react'

export default async function GraficasPage() {
  const { supabase, tenant } = await getSessionContext()

  const [{ data: clients = [] }, { data: docs = [] }] = await Promise.all([
    supabase.from('profiles').select('created_at, status').eq('tenant_id', tenant.id).eq('role', 'cliente'),
    supabase.from('documents').select('created_at, category, direction').eq('tenant_id', tenant.id),
  ])

  const docSeries = monthlySeries(docs, { key: 'docs' })
  const clientSeries = monthlySeries(clients, { key: 'clientes', cumulative: true })
  const categories = countBy(docs, 'category')
  const fromClient = docs.filter((d) => d.direction === 'to_advisor').length
  const fromAdvisor = docs.length - fromClient

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Gráficas</h1>
          <p className="page-sub">Métricas calculadas automáticamente de tu actividad</p>
        </div>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 16 }}>
        <StatCard icon="FolderOpen" label="Documentos totales" value={docs.length} accent={tenant.primary_color} />
        <StatCard icon="ArrowDownLeft" label="Compartidos por ti" value={fromAdvisor} accent={tenant.primary_color} />
        <StatCard icon="ArrowUpRight" label="Subidos por clientes" value={fromClient} accent={tenant.primary_color} />
        <StatCard icon="Users" label="Clientes" value={clients.length} accent={tenant.primary_color} />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 16 }}>
        <SectionCard title="Documentos por mes"><AreaTrend data={docSeries} dataKey="docs" /></SectionCard>
        <SectionCard title="Crecimiento de clientes"><LineTrend data={clientSeries} dataKey="clientes" /></SectionCard>
      </div>

      <div className="grid grid-2">
        <SectionCard title="Documentos por categoría">
          {categories.length
            ? <><CategoryPie data={categories} /><PieLegend data={categories} /></>
            : <div className="empty"><Icons.PieChart size={32} /><div>Sin datos aún</div></div>}
        </SectionCard>
        <SectionCard title="Volumen por categoría">
          {categories.length
            ? <BarSeries data={categories.map((c) => ({ label: c.name, total: c.value }))} dataKey="total" />
            : <div className="empty"><Icons.BarChart3 size={32} /><div>Sin datos aún</div></div>}
        </SectionCard>
      </div>
    </div>
  )
}
