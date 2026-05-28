import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, Users, FolderOpen, BarChart3, Settings, Eye, Menu, X, LogOut, Bell } from 'lucide-react'
import { useTenant } from '../context/TenantContext'
import './Layout.css'

export default function Layout() {
  const { tenant } = useTenant()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <div className="layout">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand" onClick={() => { navigate('/app/dashboard'); close() }}>
          <div className="brand-logo" style={{ background: tenant.primaryColor }}>{tenant.logoText}</div>
          <div className="brand-text">
            <div className="brand-name">{tenant.name}</div>
            <div className="brand-area">{tenant.area}</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/app/dashboard" className="nav-link" onClick={close}>
            <LayoutDashboard size={18} /> <span>Panel</span>
          </NavLink>
          <NavLink to="/app/clientes" className="nav-link" onClick={close}>
            <Users size={18} /> <span>Clientes</span>
          </NavLink>
          <NavLink to="/app/archivos" className="nav-link" onClick={close}>
            <FolderOpen size={18} /> <span>Archivos</span>
          </NavLink>
          <NavLink to="/app/graficas" className="nav-link" onClick={close}>
            <BarChart3 size={18} /> <span>Gráficas</span>
          </NavLink>
          <div className="nav-divider"></div>
          <NavLink to="/app/personalizar" className="nav-link" onClick={close}>
            <Settings size={18} /> <span>Personalizar</span>
          </NavLink>
          <NavLink to="/app/vista-cliente" className="nav-link" onClick={close}>
            <Eye size={18} /> <span>Vista cliente</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-box">
            <div className="user-avatar" style={{ background: tenant.primaryColor }}>
              {tenant.ownerName.split(' ').map(s => s[0]).join('').slice(0,2)}
            </div>
            <div className="user-info">
              <div className="user-name">{tenant.ownerName}</div>
              <div className="user-plan">Plan {tenant.plan}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => navigate('/')}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </aside>

      {open && <div className="sidebar-overlay" onClick={close}></div>}

      <main className="main">
        <header className="topbar">
          <button className="mobile-toggle" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="Notificaciones"><Bell size={18} /><span className="badge"></span></button>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </main>

      <button className="mobile-close" onClick={close} aria-label="Cerrar menú" style={{ display: open ? 'flex' : 'none' }}>
        <X size={22} />
      </button>
    </div>
  )
}
