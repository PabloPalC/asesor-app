export function formatBytes(bytes) {
  const n = Number(bytes) || 0
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
  return `${(n / 1024 / 1024 / 1024).toFixed(1)} GB`
}

export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function timeAgo(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'Ahora'
  if (m < 60) return `Hace ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `Hace ${h} h`
  const d = Math.floor(h / 24)
  if (d < 7) return `Hace ${d} d`
  const w = Math.floor(d / 7)
  if (w < 5) return `Hace ${w} sem`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `Hace ${mo} meses`
  return `Hace ${Math.floor(d / 365)} años`
}

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Builds a 6-month series counting rows by created_at. Optionally cumulative.
export function monthlySeries(rows, { months = 6, cumulative = false, key = 'count' } = {}) {
  const now = new Date()
  const buckets = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.push({ y: d.getFullYear(), m: d.getMonth(), label: MONTHS[d.getMonth()], [key]: 0 })
  }
  for (const r of rows) {
    const d = new Date(r.created_at)
    const b = buckets.find((x) => x.y === d.getFullYear() && x.m === d.getMonth())
    if (b) b[key] += 1
  }
  if (cumulative) {
    let acc = 0
    for (const b of buckets) { acc += b[key]; b[key] = acc }
  }
  return buckets.map(({ label, [key]: v }) => ({ label, [key]: v }))
}

export function countBy(rows, field) {
  const map = {}
  for (const r of rows) {
    const k = r[field] || 'Otro'
    map[k] = (map[k] || 0) + 1
  }
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}
