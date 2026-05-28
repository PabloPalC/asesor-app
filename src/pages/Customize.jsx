import { useTenant } from '../context/TenantContext'
import { COLOR_PRESETS, AREAS } from '../data/mockData'
import { Check, RotateCcw, Smartphone } from 'lucide-react'
import './Customize.css'

export default function Customize() {
  const { tenant, updateTenant, resetTenant } = useTenant()

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Personalizar marca</h1>
          <p className="page-sub">Cambia el aspecto de tu plataforma en tiempo real</p>
        </div>
        <button className="btn-secondary" onClick={resetTenant}><RotateCcw size={14} /> Restablecer demo</button>
      </div>

      <div className="customize-grid">
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 18 }}>Datos generales</h3>

          <label className="field">
            <span>Nombre de la asesoría</span>
            <input value={tenant.name} onChange={(e) => updateTenant({ name: e.target.value })} />
          </label>

          <label className="field">
            <span>Tu nombre</span>
            <input value={tenant.ownerName} onChange={(e) => updateTenant({ ownerName: e.target.value })} />
          </label>

          <label className="field">
            <span>Área principal</span>
            <select value={tenant.area} onChange={(e) => updateTenant({ area: e.target.value })}>
              {AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
          </label>

          <label className="field">
            <span>Iniciales del logo (máx 3)</span>
            <input value={tenant.logoText} maxLength={3} onChange={(e) => updateTenant({ logoText: e.target.value.toUpperCase() })} />
          </label>

          <div className="field">
            <span>Color principal</span>
            <div className="color-row">
              {COLOR_PRESETS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`color-chip ${tenant.primaryColor === c.value ? 'selected' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => updateTenant({ primaryColor: c.value })}
                  aria-label={c.name}
                >
                  {tenant.primaryColor === c.value && <Check size={14} />}
                </button>
              ))}
              <label className="custom-color">
                <input type="color" value={tenant.primaryColor} onChange={(e) => updateTenant({ primaryColor: e.target.value })} />
                <span>Otro</span>
              </label>
            </div>
          </div>
        </div>

        <div className="card preview-card-cust">
          <h3 className="card-title" style={{ marginBottom: 18 }}>Vista previa en vivo</h3>

          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-status">
                <span>9:41</span>
                <Smartphone size={12} />
              </div>
              <div className="phone-app">
                <div className="phone-brand">
                  <div className="phone-logo" style={{ background: tenant.primaryColor }}>{tenant.logoText}</div>
                  <div>
                    <div className="phone-name">{tenant.name}</div>
                    <div className="phone-area">{tenant.area}</div>
                  </div>
                </div>
                <div className="phone-card">
                  <div className="phone-card-label">Tus archivos</div>
                  <div className="phone-card-value">14</div>
                </div>
                <div className="phone-card">
                  <div className="phone-card-label">Último mensaje</div>
                  <div className="phone-card-text">Documentación lista para revisión</div>
                </div>
                <button className="phone-btn" style={{ background: tenant.primaryColor }}>Ver detalles</button>
              </div>
            </div>
          </div>

          <p className="preview-note">Así verán tus clientes la app instalada en su móvil.</p>
        </div>
      </div>
    </div>
  )
}
