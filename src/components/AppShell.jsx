'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Icons from 'lucide-react'
import styles from './AppShell.module.css'

function initials(name = '') {
  return name.split(' ').filter(Boolean).map((s) => s[0]).join('').slice(0, 2).toUpperCase() || '?'
}

export default function AppShell({ brand, nav, user, accent = '#2563eb', children }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className={styles.layout} style={{ '--accent': accent }}>
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>{brand.logoText}</div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>{brand.name}</div>
            <div className={styles.brandSub}>{brand.sub}</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {nav.map((item, i) => {
            if (item.divider) return <div key={`d${i}`} className={styles.divider} />
            const Icon = Icons[item.icon] || Icons.Circle
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
              || (item.match && pathname.startsWith(item.match))
            return (
              <Link key={item.href} href={item.href} onClick={close}
                className={`${styles.link} ${active ? styles.linkActive : ''}`}>
                <Icon size={18} /> <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userBox}>
            <div className={styles.avatar}>{initials(user.name)}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className={styles.logout}>
              <Icons.LogOut size={16} /> Salir
            </button>
          </form>
        </div>
      </aside>

      {open && <div className={styles.overlay} onClick={close} />}

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Icons.Menu size={22} />
          </button>
          <div className={styles.brandMobile}>
            <div className={styles.brandLogoSm}>{brand.logoText}</div>
            <span>{brand.name}</span>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
