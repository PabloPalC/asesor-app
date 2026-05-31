'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ClientStatusControl({ clientId, status }) {
  const router = useRouter()
  const [value, setValue] = useState(status)
  const [busy, setBusy] = useState(false)

  const change = async (e) => {
    const next = e.target.value
    setValue(next)
    setBusy(true)
    const supabase = createClient()
    const { error } = await supabase.from('profiles').update({ status: next }).eq('id', clientId)
    setBusy(false)
    if (error) { alert('No se pudo actualizar el estado.'); setValue(status); return }
    router.refresh()
  }

  return (
    <div className="input-wrap" style={{ height: 38, width: 'auto' }}>
      {busy && <Loader2 size={14} className="spin" />}
      <select value={value} onChange={change} disabled={busy}>
        <option value="active">Activo</option>
        <option value="pending">Pendiente</option>
        <option value="inactive">Inactivo</option>
      </select>
    </div>
  )
}
