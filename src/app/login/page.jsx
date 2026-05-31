'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { homeFor } from '@/lib/roles'
import styles from '../auth.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message === 'Invalid login credentials'
        ? 'Email o contraseña incorrectos.'
        : signInError.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', data.user.id).single()

    const next = new URLSearchParams(window.location.search).get('next')
    router.push(next || homeFor(profile?.role))
    router.refresh()
  }

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}><ArrowLeft size={16} /> Volver</Link>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>A</div><span>AsesorApp</span>
        </div>
        <h1 className={styles.title}>Inicia sesión</h1>
        <p className={styles.sub}>Accede a tu espacio</p>

        <form onSubmit={onSubmit}>
          <label className="field">
            <span>Email</span>
            <div className="input-wrap">
              <Mail size={16} />
              <input type="email" value={email} autoComplete="email"
                onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
          </label>
          <label className="field">
            <span>Contraseña</span>
            <div className="input-wrap">
              <Lock size={16} />
              <input type="password" value={password} autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          </label>

          {error && <div className="error-box" style={{ marginBottom: 16 }}>{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Entrar'}
          </button>
        </form>

        <p className={styles.foot}>
          ¿Eres asesor nuevo? <Link href="/registro/asesor">Crea tu despacho</Link><br />
          ¿Cliente de un asesor? <Link href="/registro/cliente">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}
