import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { useTenant } from '../context/TenantContext'
import { COLOR_PRESETS, AREAS } from '../data/mockData'
import './Onboarding.css'

export default function Onboarding() {
  const navigate = useNavigate()
  const location = useLocation()
  const { tenant, updateTenant } = useTenant()
  const [step, setStep] = useState(1)

  const prefill = location.state || {}
  const [data, setData] = useState({
    name: prefill.company || tenant.name,
    ownerName: prefill.name || tenant.ownerName,
    area: tenant.area,
    primaryColor: tenant.primaryColor,
    logoText: prefill.company ? prefill.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : tenant.logoText,
  })

  const next = () => {
    if (step < 3) setStep(step + 1)
    else {
      updateTenant(data)
      navigate('/app/dashboard')
    }
  }
  const back = () => {
    if (step > 1) setStep(step - 1)
    else navigate('/register')
  }

  const set = (k, v) => setData({ ...data, [k]: v })

  return (
    <div className="onboard">
      <div className="onboard-progress">
        <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>{step > 1 ? <Check size={14} /> : '1'}</div>
        <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>{step > 2 ? <Check size={14} /> : '2'}</div>
        <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <div className="onboard-card">
        {step === 1 && (
          <>
            <h2 className="onboard-title">Sobre tu asesoría</h2>
            <p className="onboard-sub">Estos datos aparecerán en tu plataforma y la verán tus clientes.</p>
            <div className="field-grid">
              <label className="field">
                <span>Nombre de la asesoría</span>
                <input value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="García Asesores" />
              </label>
              <label className="field">
                <span>Tu nombre</span>
                <input value={data.ownerName} onChange={(e) => set('ownerName', e.target.value)} placeholder="Pablo García" />
              </label>
              <label className="field full">
                <span>Área principal</span>
                <select value={data.area} onChange={(e) => set('area', e.target.value)}>
                  {AREAS.map(a => <option key={a}>{a}</option>)}
                </select>
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="onboard-title">Tu marca visual</h2>
            <p className="onboard-sub">Personaliza el aspecto. Tus clientes verán esto cuando accedan.</p>
            <div className="field-grid">
              <label className="field">
                <span>Iniciales del logo</span>
                <input value={data.logoText} maxLength={3} onChange={(e) => set('logoText', e.target.value.toUpperCase())} placeholder="GA" />
              </label>
              <div className="field">
                <span>Color principal</span>
                <div className="color-row">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c.value}
                      type="button"
                      className={`color-chip ${data.primaryColor === c.value ? 'selected' : ''}`}
                      style={{ background: c.value }}
                      onClick={() => set('primaryColor', c.value)}
                      aria-label={c.name}
                    >
                      {data.primaryColor === c.value && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="brand-preview">
              <div className="brand-preview-label">Vista previa</div>
              <div className="brand-preview-box">
                <div className="brand-preview-logo" style={{ background: data.primaryColor }}>{data.logoText || 'A'}</div>
                <div>
                  <div className="brand-preview-name">{data.name || 'Tu asesoría'}</div>
                  <div className="brand-preview-area">{data.area}</div>
                </div>
                <button className="brand-preview-cta" style={{ background: data.primaryColor }}>Botón principal</button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="onboard-title">Todo listo</h2>
            <p className="onboard-sub">Tu espacio está configurado. En el panel podrás dar de alta clientes, subir archivos y ver gráficas.</p>
            <div className="summary">
              <div className="summary-row"><span>Asesoría</span><strong>{data.name}</strong></div>
              <div className="summary-row"><span>Responsable</span><strong>{data.ownerName}</strong></div>
              <div className="summary-row"><span>Área</span><strong>{data.area}</strong></div>
              <div className="summary-row">
                <span>Marca</span>
                <strong className="brand-mini">
                  <span className="brand-mini-icon" style={{ background: data.primaryColor }}>{data.logoText}</span>
                  {data.primaryColor}
                </strong>
              </div>
            </div>
          </>
        )}

        <div className="onboard-actions">
          <button className="btn-secondary" onClick={back}><ArrowLeft size={16} /> Atrás</button>
          <button className="btn-primary-fill" onClick={next} style={{ background: data.primaryColor }}>
            {step < 3 ? <>Siguiente <ArrowRight size={16} /></> : 'Entrar al panel →'}
          </button>
        </div>
      </div>
    </div>
  )
}
