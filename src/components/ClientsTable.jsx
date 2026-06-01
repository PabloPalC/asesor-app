'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Users, ChevronRight } from 'lucide-react'
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
        <div className="input-wrap" style={{ flex: 1, minWidth: 200, height: 40 }}>
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre, email o empresa…" />
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
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Documentos</th>
                <th>Alta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link href={`/app/clientes/${c.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {(c.full_name || '?').split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600 }}>{c.full_name}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{c.email}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="muted">{c.company || '—'}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="muted">{c.docCount ?? 0}</td>
                  <td className="muted">{formatDate(c.created_at)}</td>
                  <td>
                    <Link href={`/app/clientes/${c.id}`} className="btn btn-ghost btn-sm" aria-label="Ver">
                      <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
