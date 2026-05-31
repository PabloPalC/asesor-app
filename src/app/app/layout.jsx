import { requireRole } from '@/lib/auth'
import AppShell from '@/components/AppShell'

const NAV = [
  { href: '/app/dashboard', label: 'Panel', icon: 'LayoutDashboard' },
  { href: '/app/clientes', label: 'Clientes', icon: 'Users' },
  { href: '/app/documentos', label: 'Documentos', icon: 'FolderOpen' },
  { href: '/app/graficas', label: 'Gráficas', icon: 'BarChart3' },
  { divider: true },
  { href: '/app/personalizar', label: 'Personalizar', icon: 'Settings' },
]

export default async function AsesorLayout({ children }) {
  const { profile, tenant } = await requireRole(['asesor'])

  return (
    <AppShell
      accent={tenant?.primary_color}
      brand={{ name: tenant?.name || 'Mi despacho', sub: tenant?.area || '', logoText: tenant?.logo_text || 'AA' }}
      user={{ name: profile.full_name || 'Asesor', role: 'Asesor' }}
      nav={NAV}
    >
      {children}
    </AppShell>
  )
}
