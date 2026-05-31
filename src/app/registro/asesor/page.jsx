'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Building2, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AREAS } from '@/lib/constants'
import styles from '../../auth.module.css'

export default function RegisterAsesorPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: '', tenantName: '', area: AREAS[0], email: '', password: '',
  })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          intended_role: 'asesor',
          full_name: form.fullName,
          tenant_name: form.tenantName,
          area: form.area,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    if (data.session) {
      router.push('/app/dashboard')
      router.refresh()
    } else {
      setDone(true)
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className={styles.wrap}>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <CheckCircle2 size={46} color="var(--green)" style={{ margin: '0 auto 14px' }} />
          <h1 className={styles.title}>Revisa tu correo</h1>
          <p className={styles.sub}>
            Te enviamos un enlace de confirmación a <strong>{form.email}</strong>.
            Ábrelo para activar tu despacho.
          </p>
          <Link href="/login" className="btn btn-ghost btn-block">Ir a iniciar sesión</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}><ArrowLeft size={16} /> Volver</Link>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>A</div><span>AsesorApp</span>
        </div>
        <h1 className={styles.title}>Crea tu despacho</h1>
        <p className={styles.sub}>Tu espacio profesional con tu marca</p>

        <form onSubmit={onSubmit}>
          <label className="field">
            <span>Tu nombre</span>
            <div className="input-wrap">
              <User size={16} />
              <input value={form.fullName} onChange={set('fullName')} placeholder="Pablo García" required />
            </div>
          </label>
          <label className="field">
            <span>Nombre del despacho</span>
            <div className="input-wrap">
              <Building2 size={16} />
              <input value={form.tenantName} onChange={set('tenantName')} placeholder="García Asesores" required />
            </div>
          </label>
          <label className="field">
            <span>Área principal</span>
            <div className="input-wrap">
              <select value={form.area} onChange={set('area')}>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </label>
          <label className="field">
            <span>Email</span>
            <div className="input-wrap">
              <Mail size={16} />
              <input type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" required />
            </div>
          </label>
          <label className="field">
            <span>Contraseña</span>
            <div className="input-wrap">
              <Lock size={16} />
              <input type="password" value={form.password} onChange={set('password')} placeholder="Mínimo 6 caracteres" required />
            </div>
          </label>

          {error && <div className="error-box" style={{ marginBottom: 16 }}>{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Crear despacho'}
          </button>
        </form>

        <p className={styles.foot}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
