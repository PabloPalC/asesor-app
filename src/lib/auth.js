import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { homeFor } from '@/lib/roles'

export { homeFor }

// Loads the current user + profile + tenant in a single round trip (profile embeds
// its tenant). Wrapped in React cache() so layout + page share one fetch per request.
export const getSessionContext = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { supabase, user: null, profile: null, tenant: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, tenant:tenant_id(*)')
    .eq('id', user.id)
    .single()

  const tenant = profile?.tenant ?? null
  if (profile) delete profile.tenant

  return { supabase, user, profile, tenant }
})

// Guards a page to the given role(s); redirects to login or the user's own home.
export async function requireRole(roles) {
  const ctx = await getSessionContext()
  if (!ctx.user) redirect('/login')
  if (!ctx.profile || !roles.includes(ctx.profile.role)) {
    redirect(homeFor(ctx.profile?.role))
  }
  return ctx
}
