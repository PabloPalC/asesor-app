import { requireRole } from '@/lib/auth'
import AppShell from '@/components/AppShell'

const NAV = [
  { href: '/admin', label: 'Resumen', icon: 'LayoutDashboard' },
  { href: '/admin/despachos', label: 'Despachos', icon: 'Building2' },
]

export default async function AdminLayout({ children }) {
  const { profile } = await requireRole(['admin'])

  return (
    <AppShell
      accent="#2563eb"
      brand={{ name: 'AsesorApp', sub: 'Administración', logoText: 'A' }}
      user={{ name: profile.full_name || 'Admin', role: 'Administrador' }}
      nav={NAV}
    >
      {children}
    </AppShell>
  )
}
