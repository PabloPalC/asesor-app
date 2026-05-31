// Pure helpers safe to import from both client and server components.

export function homeFor(role) {
  if (role === 'asesor') return '/app/dashboard'
  if (role === 'cliente') return '/portal'
  if (role === 'admin') return '/admin'
  return '/login'
}

export const ROLE_LABEL = {
  admin: 'Administrador',
  asesor: 'Asesor',
  cliente: 'Cliente',
}
