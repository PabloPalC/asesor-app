import { FileText, Download, MessageSquare, Calendar, TrendingUp, Bell, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import { useTenant } from '../context/TenantContext'
import { DEMO_FILES } from '../data/mockData'
import './ClientPortal.css'

const CLIENT_REVENUE = [
  { mes: 'Ene', valor: 1200 },
  { mes: 'Feb', valor: 1450 },
  { mes: 'Mar', valor: 1380 },
  { mes: 'Abr', valor: 1620 },
  { mes: 'May', valor: 1840 },
]

const CLIENT_FILES = DEMO_FILES.slice(0, 4)

export default function ClientPortal() {
  const { tenant } = useTenant()

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Vista cliente</h1>
          <p className="page-sub">Así verán tus clientes su portal cuando accedan</p>
        </div>
      </div>

      <div className="portal-preview-info">
        <div className="info-dot" style={{ background: tenant.primaryColor }}></div>
        <div>
          <strong>Esta es una vista previa.</strong>
          <span> El cliente solo ve sus propios archivos, mensajes y gráficas. Todo con tu marca: <b>{tenant.name}</b>.</span>
        </div>
      </div>

      <div className="portal-wrapper">
        <div className="portal-header" style={{ background: tenant.primaryColor }}>
          <div className="portal-logo">{tenant.logoText}</div>
          <div className="portal-brand">
            <div className="portal-name">{tenant.name}</div>
            <div className="portal-area">Portal del cliente</div>
          </div>
          <Bell size={18} className="portal-bell" />
        </div>

        <div className="portal-body">
          <div className="portal-welcome">
            <h2>Hola, Marta 👋</h2>
            <p>Bienvenida a tu portal con {tenant.name}</p>
          </div>

          <div className="portal-stats">
            <div className="portal-stat">
              <FileText size={16} style={{ color: tenant.primaryColor }} />
              <div>
                <div className="stat-num">14</div>
                <div className="stat-label">Tus archivos</div>
              </div>
            </div>
            <div className="portal-stat">
              <MessageSquare size={16} style={{ color: tenant.primaryColor }} />
              <div>
                <div className="stat-num">3</div>
                <div className="stat-label">Mensajes</div>
              </div>
            </div>
            <div className="portal-stat">
              <Calendar size={16} style={{ color: tenant.primaryColor }} />
              <div>
                <div className="stat-num">2</div>
                <div className="stat-label">Citas</div>
              </div>
            </div>
          </div>

          <div className="portal-section">
            <div className="portal-section-head">
              <h3><TrendingUp size={16} /> Tu evolución</h3>
            </div>
            <div style={{ width: '100%', height: 140 }}>
              <ResponsiveContainer>
                <AreaChart data={CLIENT_REVENUE} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={tenant.primaryColor} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={tenant.primaryColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="valor" stroke={tenant.primaryColor} strokeWidth={2.5} fill="url(#gp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="portal-section">
            <div className="portal-section-head">
              <h3><FileText size={16} /> Tus documentos</h3>
            </div>
            <ul className="portal-files">
              {CLIENT_FILES.map(f => (
                <li key={f.id} className="portal-file">
                  <div className="portal-file-icon" style={{ background: `${tenant.primaryColor}22`, color: tenant.primaryColor }}>
                    <FileText size={14} />
                  </div>
                  <div className="portal-file-info">
                    <div className="portal-file-name">{f.name}</div>
                    <div className="portal-file-meta">{f.category} · {f.uploaded}</div>
                  </div>
                  <button className="portal-dl" style={{ color: tenant.primaryColor }}>
                    <Download size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="portal-cta" style={{ background: tenant.primaryColor }}>
            <MessageSquare size={16} /> Contactar con mi asesor
          </button>
        </div>
      </div>
    </div>
  )
}
