import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { homeFor } from '@/lib/roles'

export { homeFor }

// Loads the current user + profile + tenant. Returns nulls if signed out.
export async function getSessionContext() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { supabase, user: null, profile: null, tenant: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  let tenant = null
  if (profile?.tenant_id) {
    const { data } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', profile.tenant_id)
      .single()
    tenant = data
  }

  return { supabase, user, profile, tenant }
}

// Guards a page to the given role(s); redirects to login or the user's own home.
export async function requireRole(roles) {
  const ctx = await getSessionContext()
  if (!ctx.user) redirect('/login')
  if (!ctx.profile || !roles.includes(ctx.profile.role)) {
    redirect(homeFor(ctx.profile?.role))
  }
  return ctx
}
