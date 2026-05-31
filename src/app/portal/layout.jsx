import { requireRole } from '@/lib/auth'
import AppShell from '@/components/AppShell'

const NAV = [
  { href: '/portal', label: 'Inicio', icon: 'Home' },
  { href: '/portal/documentos', label: 'Mis documentos', icon: 'FolderOpen' },
  { href: '/portal/graficas', label: 'Gráficas', icon: 'BarChart3' },
]

export default async function PortalLayout({ children }) {
  const { profile, tenant } = await requireRole(['cliente'])

  // Client registered without a valid advisor code yet.
  if (!tenant) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="card" style={{ maxWidth: 440, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Cuenta pendiente de vinculación</h1>
          <p className="muted" style={{ marginBottom: 20 }}>
            Tu cuenta aún no está asociada a ningún asesor. Pide a tu asesor su código de invitación
            y vuelve a registrarte con él, o contacta con soporte.
          </p>
          <form action="/auth/signout" method="post">
            <button className="btn btn-ghost btn-block" type="submit">Cerrar sesión</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <AppShell
      accent={tenant.primary_color}
      brand={{ name: tenant.name, sub: tenant.area, logoText: tenant.logo_text }}
      user={{ name: profile.full_name || 'Cliente', role: 'Cliente' }}
      nav={NAV}
    >
      {children}
    </AppShell>
  )
}
