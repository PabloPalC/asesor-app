import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('pablo@garcia-asesores.es')
  const [password, setPassword] = useState('demo1234')

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/app/dashboard')
  }

  return (
    <div className="auth">
      <Link to="/" className="auth-back"><ArrowLeft size={16} /> Volver</Link>
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-icon">A</div>
          <span>AsesorApp</span>
        </div>
        <h1 className="auth-title">Inicia sesión</h1>
        <p className="auth-sub">Accede a tu espacio profesional</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="auth-field">
            <span>Email</span>
            <div className="input-wrap">
              <Mail size={16} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
          </label>
          <label className="auth-field">
            <span>Contraseña</span>
            <div className="input-wrap">
              <Lock size={16} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          </label>
          <button type="submit" className="auth-submit">Entrar al panel</button>
        </form>

        <p className="auth-foot">
          ¿No tienes cuenta? <Link to="/register">Crea tu espacio gratis</Link>
        </p>

        <div className="auth-demo-note">
          <strong>Modo demo</strong> · Las credenciales están rellenadas. Haz clic en "Entrar" para acceder.
        </div>
      </div>
    </div>
  )
}
