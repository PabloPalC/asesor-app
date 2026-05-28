import { Link } from 'react-router-dom'
import { ArrowRight, Users, FolderOpen, BarChart3, Palette, Smartphone, Shield } from 'lucide-react'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">
          <div className="landing-logo-icon">A</div>
          <span>AsesorApp</span>
        </div>
        <nav className="landing-nav">
          <Link to="/login" className="landing-nav-link">Iniciar sesión</Link>
          <Link to="/register" className="landing-cta">Empezar gratis <ArrowRight size={16} /></Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-tag">Para asesores y consultores</div>
        <h1 className="hero-title">Tu plataforma profesional<br /><span className="hero-gradient">con tu propia marca</span></h1>
        <p className="hero-sub">
          Registra a tus clientes, comparte archivos, muestra gráficas y todo bajo tu logo y tus colores.
          Sin código. Sin complicaciones. Tus clientes la instalan en su móvil como una app.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">Crear mi espacio gratis <ArrowRight size={18} /></Link>
          <Link to="/login" className="btn-ghost">Ver demo →</Link>
        </div>

        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-bar">
              <div className="preview-dots"><span></span><span></span><span></span></div>
              <div className="preview-url">garcia-asesores.app</div>
            </div>
            <div className="preview-body">
              <div className="preview-side">
                <div className="preview-brand">
                  <div className="preview-brand-icon">GA</div>
                  <div>
                    <div className="preview-brand-name">García Asesores</div>
                    <div className="preview-brand-sub">Asesoría integral</div>
                  </div>
                </div>
                <div className="preview-nav-item active">Panel</div>
                <div className="preview-nav-item">Clientes</div>
                <div className="preview-nav-item">Archivos</div>
                <div className="preview-nav-item">Gráficas</div>
              </div>
              <div className="preview-content">
                <div className="preview-cards-row">
                  <div className="preview-mini-card"><div className="preview-mini-label">Clientes</div><div className="preview-mini-value">38</div></div>
                  <div className="preview-mini-card"><div className="preview-mini-label">Archivos</div><div className="preview-mini-value">276</div></div>
                  <div className="preview-mini-card"><div className="preview-mini-label">Ingresos</div><div className="preview-mini-value">€13.2k</div></div>
                </div>
                <div className="preview-chart">
                  <svg viewBox="0 0 240 80" preserveAspectRatio="none">
                    <path d="M0,60 Q40,40 80,45 T160,30 T240,15 L240,80 L0,80 Z" fill="rgba(37,99,235,.15)" />
                    <path d="M0,60 Q40,40 80,45 T160,30 T240,15" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Todo lo que necesitas en una app</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon"><Palette size={22} /></div>
            <h3>Marca blanca</h3>
            <p>Tu logo, tus colores, tu dominio. Tus clientes ven tu marca, nunca la nuestra.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><Users size={22} /></div>
            <h3>Gestión de clientes</h3>
            <p>Da de alta a tus clientes, organízalos y controla su actividad en tiempo real.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><FolderOpen size={22} /></div>
            <h3>Archivos seguros</h3>
            <p>Comparte documentos con cada cliente de forma privada y organizada por categorías.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><BarChart3 size={22} /></div>
            <h3>Gráficas y métricas</h3>
            <p>Dashboards visuales para que tus clientes vean su evolución de un vistazo.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><Smartphone size={22} /></div>
            <h3>Instalable en el móvil</h3>
            <p>Tus clientes la añaden a su pantalla de inicio como una app nativa, sin tiendas.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><Shield size={22} /></div>
            <h3>Seguridad RLS</h3>
            <p>Cada cliente accede solo a su información. Aislamiento por capas de la base de datos.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>¿Listo para empezar?</h2>
        <p>Configura tu espacio en menos de 2 minutos.</p>
        <Link to="/register" className="btn-primary big">Crear mi espacio gratis <ArrowRight size={18} /></Link>
      </section>

      <footer className="landing-footer">
        <p>AsesorApp · Demo prototipo · {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
