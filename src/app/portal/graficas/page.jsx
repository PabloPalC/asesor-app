import { getSessionContext } from '@/lib/auth'
import { SectionCard, StatCard } from '@/components/ui'
import { AreaTrend, CategoryPie, PieLegend } from '@/components/Charts'
import { monthlySeries, countBy } from '@/lib/format'
import * as Icons from 'lucide-react'

export default async function PortalGraficas() {
  const { supabase, profile, tenant } = await getSessionContext()

  const { data: docs = [] } = await supabase
    .from('documents').select('created_at, category, direction').eq('client_id', profile.id)

  const series = monthlySeries(docs, { key: 'docs' })
  const categories = countBy(docs, 'category')
  const fromAdvisor = docs.filter((d) => d.direction === 'to_client').length

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Tus gráficas</h1>
          <p className="page-sub">Resumen de tu actividad documental con {tenant.name}</p>
        </div>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 16 }}>
        <StatCard icon="FolderOpen" label="Documentos totales" value={docs.length} accent={tenant.primary_color} />
        <StatCard icon="ArrowDownLeft" label="De tu asesor" value={fromAdvisor} accent={tenant.primary_color} />
        <StatCard icon="ArrowUpRight" label="Subidos por ti" value={docs.length - fromAdvisor} accent={tenant.primary_color} />
      </div>

      <div className="grid grid-2">
        <SectionCard title="Documentos por mes"><AreaTrend data={series} dataKey="docs" /></SectionCard>
        <SectionCard title="Por categoría">
          {categories.length
            ? <><CategoryPie data={categories} /><PieLegend data={categories} /></>
            : <div className="empty"><Icons.PieChart size={32} /><div>Sin documentos aún</div></div>}
        </SectionCard>
      </div>
    </div>
  )
}
