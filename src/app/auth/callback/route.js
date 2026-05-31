import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { homeFor } from '@/lib/roles'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      let dest = next
      if (!dest && user) {
        const { data: profile } = await supabase
          .from('profiles').select('role').eq('id', user.id).single()
        dest = homeFor(profile?.role)
      }
      return NextResponse.redirect(`${origin}${dest || '/login'}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
