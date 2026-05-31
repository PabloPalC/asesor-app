'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Building2, KeyRound, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import styles from '../../auth.module.css'

export default function RegisterClientePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: '', company: '', code: '', email: '', password: '',
  })

  // Prefill advisor code from ?code= if present
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) setForm((f) => ({ ...f, code: code.toUpperCase() }))
  }, [])
  const [tenantName, setTenantName] = useState(null) // null=unknown, ''=invalid, 'X'=valid
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Live-validate the advisor code
  useEffect(() => {
    const code = form.code.trim()
    if (code.length < 4) { setTenantName(null); return }
    let cancelled = false
    setChecking(true)
    const t = setTimeout(async () => {
      const supabase = createClient()
      const { data } = await supabase.rpc('tenant_name_by_code', { code })
      if (!cancelled) { setTenantName(data || ''); setChecking(false) }
    }, 400)
    return () => { cancelled = true; clearTimeout(t) }
  }, [form.code])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!tenantName) { setError('Introduce un código de asesor válido.'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          intended_role: 'cliente',
          full_name: form.fullName,
          company: form.company,
          join_code: form.code.trim().toUpperCase(),
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    if (data.session) {
      router.push('/portal')
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
            Ábrelo para acceder a tu portal con <strong>{tenantName}</strong>.
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
        <h1 className={styles.title}>Acceso de cliente</h1>
        <p className={styles.sub}>Únete al espacio de tu asesor con su código</p>

        <form onSubmit={onSubmit}>
          <label className="field">
            <span>Código del asesor</span>
            <div className="input-wrap">
              <KeyRound size={16} />
              <input value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                placeholder="Ej. 3F9A2C" maxLength={12} required />
              {checking && <Loader2 size={15} className="spin" />}
            </div>
          </label>
          {form.code.trim().length >= 4 && !checking && (
            tenantName
              ? <div className={styles.codeOk}>✓ Te unirás a {tenantName}</div>
              : <div className={styles.codeBad}>Código no encontrado</div>
          )}

          <label className="field">
            <span>Tu nombre</span>
            <div className="input-wrap">
              <User size={16} />
              <input value={form.fullName} onChange={set('fullName')} placeholder="Marta Sánchez" required />
            </div>
          </label>
          <label className="field">
            <span>Empresa <span className="muted">(opcional)</span></span>
            <div className="input-wrap">
              <Building2 size={16} />
              <input value={form.company} onChange={set('company')} placeholder="Diseño Gráfico SL" />
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

          <button type="submit" className="btn btn-primary btn-block" disabled={loading || !tenantName}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Crear cuenta'}
          </button>
        </form>

        <p className={styles.foot}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
