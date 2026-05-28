import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building, ArrowLeft } from 'lucide-react'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/onboarding', { state: form })
  }

  return (
    <div className="auth">
      <Link to="/" className="auth-back"><ArrowLeft size={16} /> Volver</Link>
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-icon">A</div>
          <span>AsesorApp</span>
        </div>
        <h1 className="auth-title">Crea tu espacio</h1>
        <p className="auth-sub">Configúralo en menos de 2 minutos</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="auth-field">
            <span>Tu nombre</span>
            <div className="input-wrap">
              <User size={16} />
              <input type="text" value={form.name} onChange={update('name')} placeholder="Pablo García" required />
            </div>
          </label>
          <label className="auth-field">
            <span>Nombre de la asesoría</span>
            <div className="input-wrap">
              <Building size={16} />
              <input type="text" value={form.company} onChange={update('company')} placeholder="García Asesores" required />
            </div>
          </label>
          <label className="auth-field">
            <span>Email</span>
            <div className="input-wrap">
              <Mail size={16} />
              <input type="email" value={form.email} onChange={update('email')} placeholder="tu@email.com" required />
            </div>
          </label>
          <label className="auth-field">
            <span>Contraseña</span>
            <div className="input-wrap">
              <Lock size={16} />
              <input type="password" value={form.password} onChange={update('password')} placeholder="Mínimo 8 caracteres" required minLength={8} />
            </div>
          </label>
          <button type="submit" className="auth-submit">Continuar a personalización →</button>
        </form>

        <p className="auth-foot">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
