import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, FileText, BarChart3, Users, ShieldCheck, Upload, Palette } from 'lucide-react'
import { getSessionContext, homeFor } from '@/lib/auth'
import styles from './landing.module.css'

export default async function Landing() {
  const { user, profile } = await getSessionContext()
  if (user && profile) redirect(homeFor(profile.role))

  const features = [
    { icon: Users, title: 'Tus clientes, organizados', text: 'Cada cliente con su ficha, su estado y su historial. Acceso con código de tu despacho.' },
    { icon: FileText, title: 'Documentos seguros', text: 'Sube y comparte documentos en ambos sentidos. Almacenamiento privado por cliente.' },
    { icon: BarChart3, title: 'Gráficas automáticas', text: 'Métricas de actividad y documentos generadas solas. Sin hojas de cálculo.' },
    { icon: Upload, title: 'El cliente también sube', text: 'Tus clientes te hacen llegar sus archivos desde su propio portal privado.' },
    { icon: Palette, title: 'Tu marca', text: 'Logo, nombre y color de tu despacho. Tus clientes ven tu identidad, no la nuestra.' },
    { icon: ShieldCheck, title: 'Seguridad real', text: 'Aislamiento por despacho con políticas a nivel de base de datos. Cada uno ve lo suyo.' },
  ]

  return (
    <div className={styles.wrap}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>A</div>
          <span>AsesorApp</span>
        </div>
        <nav className={styles.navLinks}>
          <Link href="/login" className="btn btn-ghost btn-sm">Entrar</Link>
          <Link href="/registro/asesor" className="btn btn-primary btn-sm">Crear despacho</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>Plataforma para asesores y despachos</span>
        <h1 className={styles.h1}>El espacio digital de tu<br />despacho y tus clientes</h1>
        <p className={styles.lead}>
          Gestiona clientes, comparte documentos y deja que cada cliente acceda a su portal
          privado con tu marca. Todo en una app, sin complicaciones.
        </p>
        <div className={styles.heroCta}>
          <Link href="/registro/asesor" className="btn btn-primary">
            Crear mi despacho gratis <ArrowRight size={18} />
          </Link>
          <Link href="/registro/cliente" className="btn btn-ghost">Soy cliente de un asesor</Link>
        </div>
      </section>

      <section className={styles.features}>
        {features.map((f) => (
          <div key={f.title} className={`card ${styles.feature}`}>
            <div className={styles.featIcon}><f.icon size={20} /></div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} AsesorApp</span>
        <div className="row" style={{ gap: 20 }}>
          <Link href="/login" className="muted">Iniciar sesión</Link>
          <Link href="/registro/asesor" className="muted">Crear despacho</Link>
        </div>
      </footer>
    </div>
  )
}
