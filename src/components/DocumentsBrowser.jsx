'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import DocumentList from '@/components/DocumentList'

export default function DocumentsBrowser({ docs, showClient = false, canDelete = false, currentUserId = null }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(docs.map((d) => d.category)))],
    [docs]
  )

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return docs.filter((d) => {
      if (cat !== 'all' && d.category !== cat) return false
      if (!term) return true
      return d.name.toLowerCase().includes(term) || (d.clientName || '').toLowerCase().includes(term)
    })
  }, [docs, q, cat])

  return (
    <div className="card card-pad-0">
      <div style={{ display: 'flex', gap: 12, padding: 16, borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="input-wrap" style={{ flex: 1, minWidth: 200, height: 40 }}>
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar documento…" />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`btn btn-sm ${cat === c ? 'btn-primary' : 'btn-ghost'}`}>
              {c === 'all' ? 'Todas' : c}
            </button>
          ))}
        </div>
      </div>
      <DocumentList docs={filtered} showClient={showClient} canDelete={canDelete} currentUserId={currentUserId} />
    </div>
  )
}
