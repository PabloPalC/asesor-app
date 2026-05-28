import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, MoreVertical, Mail, FolderOpen, ChevronRight } from 'lucide-react'
import { useTenant } from '../context/TenantContext'
import { DEMO_CLIENTS } from '../data/mockData'
import './Clients.css'

const STATUS_LABEL = { active: 'Activo', pending: 'Pendiente', inactive: 'Inactivo' }

export default function Clients() {
  const { tenant } = useTenant()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = DEMO_CLIENTS.filter(c => {
    const matchQ = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase())
    const matchF = filter === 'all' || c.status === filter
    return matchQ && matchF
  })

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-sub">{DEMO_CLIENTS.length} clientes en tu cartera</p>
        </div>
        <button className="btn-primary-fill" style={{ background: tenant.primaryColor }}>
          <Plus size={16} /> Nuevo cliente
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o empresa..." />
        </div>
        <div className="filter-tabs">
          {['all', 'active', 'pending', 'inactive'].map(f => (
            <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Todos' : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="clients-grid">
        {filtered.map(c => (
          <Link key={c.id} to={`/app/clientes/${c.id}`} className="client-card">
            <div className="client-avatar" style={{ background: tenant.primaryColor }}>
              {c.name.split(' ').map(s => s[0]).join('').slice(0, 2)}
            </div>
            <div className="client-info">
              <div className="client-name">{c.name}</div>
              <div className="client-company">{c.company}</div>
              <div className="client-tags">
                <span className={`status-pill ${c.status}`}>{STATUS_LABEL[c.status]}</span>
                <span className="files-pill"><FolderOpen size={11} /> {c.files}</span>
              </div>
            </div>
            <ChevronRight size={18} className="client-chevron" />
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron clientes con esos criterios</p>
        </div>
      )}
    </div>
  )
}
