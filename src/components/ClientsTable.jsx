'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Users, ChevronRight, Building2, FolderOpen, Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/ui'
import { formatDate } from '@/lib/format'

export default function ClientsTable({ clients }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return clients.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false
      if (!term) return true
      return [c.full_name, c.email, c.company].filter(Boolean).some((v) => v.toLowerCase().includes(term))
    })
  }, [clients, q, filter])

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'active', label: 'Activos' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'inactive', label: 'Inactivos' },
  ]

  return (
    <div className="card card-pad-0">
      <div style={{ display: 'flex', gap: 12, padding: 16, borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="input-wrap" style={{ flex: 1, minWidth: 180, height: 40 }}>
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar cliente…" />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`btn btn-sm ${filter === f.id ? 'btn-primary' : 'btn-ghost'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><Users size={32} /><div>No hay clientes que coincidan.</div></div>
      ) : (
        <div className="dlist">
          {filtered.map((c) => (
            <div key={c.id} className="ditem ditem-wide">
              <Link href={`/app/clientes/${c.id}`} className="ditem-main">
                <div className="avatar-sm">
                  {(c.full_name || '?').split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="dname">{c.full_name}</div>
                  <div className="dsub">{c.email}</div>
                </div>
              </Link>

              <div className="ditem-meta">
                <StatusBadge status={c.status} />
                {c.company && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Building2 size={12} /> {c.company}</span>}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FolderOpen size={12} /> {c.docCount ?? 0}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {formatDate(c.created_at)}</span>
              </div>

              <div className="ditem-actions">
                <Link href={`/app/clientes/${c.id}`} className="btn btn-ghost btn-sm" aria-label="Ver cliente">
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
