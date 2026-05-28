import { useState } from 'react'
import { Upload, Search, FileText, Download, MoreVertical, Filter } from 'lucide-react'
import { useTenant } from '../context/TenantContext'
import { DEMO_FILES, DEMO_CLIENTS } from '../data/mockData'
import './Files.css'

const TYPE_COLOR = {
  pdf:  { bg: 'rgba(239,68,68,.15)',  fg: '#ef4444' },
  xlsx: { bg: 'rgba(16,185,129,.15)', fg: '#10b981' },
  zip:  { bg: 'rgba(245,158,11,.15)', fg: '#f59e0b' },
  doc:  { bg: 'rgba(37,99,235,.15)',  fg: '#2563eb' },
}

export default function Files() {
  const { tenant } = useTenant()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = ['all', ...new Set(DEMO_FILES.map(f => f.category))]
  const filtered = DEMO_FILES.filter(f => {
    const matchQ = !query || f.name.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'all' || f.category === category
    return matchQ && matchC
  })

  const clientById = (id) => DEMO_CLIENTS.find(c => c.id === id)

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Archivos</h1>
          <p className="page-sub">{DEMO_FILES.length} documentos en total</p>
        </div>
        <button className="btn-primary-fill" style={{ background: tenant.primaryColor }}>
          <Upload size={16} /> Subir archivo
        </button>
      </div>

      <div className="upload-zone">
        <Upload size={28} />
        <div>
          <div className="upload-title">Arrastra archivos aquí</div>
          <div className="upload-sub">o haz clic para seleccionar · PDF, DOCX, XLSX, ZIP · máx 50 MB</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar archivos..." />
        </div>
        <div className="cat-filter">
          <Filter size={14} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'Todas las categorías' : c}</option>)}
          </select>
        </div>
      </div>

      <div className="files-table">
        <div className="files-head">
          <div>Nombre</div>
          <div>Cliente</div>
          <div>Categoría</div>
          <div>Tamaño</div>
          <div>Subido</div>
          <div></div>
        </div>
        {filtered.map(f => {
          const c = clientById(f.clientId)
          const color = TYPE_COLOR[f.type] || TYPE_COLOR.doc
          return (
            <div key={f.id} className="files-row">
              <div className="files-cell name">
                <div className="file-icon" style={{ background: color.bg, color: color.fg }}>
                  <FileText size={16} />
                </div>
                <span className="file-name-text">{f.name}</span>
              </div>
              <div className="files-cell">{c?.name || '—'}</div>
              <div className="files-cell"><span className="cat-tag">{f.category}</span></div>
              <div className="files-cell muted">{f.size}</div>
              <div className="files-cell muted">{f.uploaded}</div>
              <div className="files-cell actions">
                <button className="icon-btn-mini"><Download size={14} /></button>
                <button className="icon-btn-mini"><MoreVertical size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
