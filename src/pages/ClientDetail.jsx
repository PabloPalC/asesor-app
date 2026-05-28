import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Building, Calendar, FolderOpen, MessageSquare, FileText, Download } from 'lucide-react'
import { useTenant } from '../context/TenantContext'
import { DEMO_CLIENTS, DEMO_FILES } from '../data/mockData'
import './Clients.css'

const STATUS_LABEL = { active: 'Activo', pending: 'Pendiente', inactive: 'Inactivo' }

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tenant } = useTenant()
  const client = DEMO_CLIENTS.find(c => c.id === id)
  const files = DEMO_FILES.filter(f => f.clientId === id)

  if (!client) {
    return (
      <div className="empty-state">
        <p>Cliente no encontrado</p>
        <Link to="/app/clientes" className="back-link"><ArrowLeft size={14} /> Volver</Link>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/app/clientes')} className="back-link">
        <ArrowLeft size={14} /> Volver a clientes
      </button>

      <div className="client-detail-head">
        <div className="client-avatar big" style={{ background: tenant.primaryColor }}>
          {client.name.split(' ').map(s => s[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h1 className="page-title">{client.name}</h1>
          <p className="page-sub">{client.company}</p>
          <div className="client-tags" style={{ marginTop: 8 }}>
            <span className={`status-pill ${client.status}`}>{STATUS_LABEL[client.status]}</span>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn-secondary"><MessageSquare size={14} /> Mensaje</button>
          <button className="btn-primary-fill" style={{ background: tenant.primaryColor }}>
            <FolderOpen size={14} /> Subir archivo
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 14 }}>Datos de contacto</h3>
          <ul className="info-list">
            <li><Mail size={14} /> <span>{client.email}</span></li>
            <li><Building size={14} /> <span>{client.company}</span></li>
            <li><Calendar size={14} /> <span>Cliente desde {client.joined}</span></li>
            <li><FolderOpen size={14} /> <span>{client.files} archivos</span></li>
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 14 }}>Archivos recientes</h3>
          {files.length === 0 ? (
            <p className="muted-text">No hay archivos para este cliente todavía.</p>
          ) : (
            <ul className="file-list">
              {files.map(f => (
                <li key={f.id} className="file-item">
                  <div className="file-icon"><FileText size={16} /></div>
                  <div className="file-info">
                    <div className="file-name">{f.name}</div>
                    <div className="file-meta">{f.category} · {f.size} · {f.uploaded}</div>
                  </div>
                  <button className="icon-btn-mini"><Download size={14} /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
