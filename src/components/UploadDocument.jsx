'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { UploadCloud, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { DOC_CATEGORIES } from '@/lib/constants'

function sanitize(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9._-]/g, '_')
}

// role: 'asesor' uploads to_client; 'cliente' uploads to_advisor
export default function UploadDocument({ tenantId, clientId, clientName, uploaderId, role }) {
  const router = useRouter()
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('General')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const direction = role === 'asesor' ? 'to_client' : 'to_advisor'

  const onUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setError('')
    setBusy(true)
    const supabase = createClient()

    const path = `${tenantId}/${clientId}/${Date.now()}-${sanitize(file.name)}`
    const { error: upErr } = await supabase.storage.from('documents').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type || undefined,
    })
    if (upErr) { setError(`Error al subir: ${upErr.message}`); setBusy(false); return }

    const { error: insErr } = await supabase.from('documents').insert({
      tenant_id: tenantId,
      client_id: clientId,
      uploaded_by: uploaderId,
      name: file.name,
      storage_path: path,
      size_bytes: file.size,
      mime_type: file.type || null,
      category,
      direction,
    })
    if (insErr) {
      await supabase.storage.from('documents').remove([path])
      setError(`Error al guardar: ${insErr.message}`); setBusy(false); return
    }

    const who = role === 'asesor' ? 'Asesor' : (clientName || 'Cliente')
    const verb = role === 'asesor' ? 'compartió' : 'subió'
    await supabase.from('activity').insert({
      tenant_id: tenantId, client_id: clientId, actor_id: uploaderId,
      type: 'upload', text: `${who} ${verb} ${file.name}`,
    })

    setFile(null)
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
    router.refresh()
  }

  return (
    <form onSubmit={onUpload} className="card">
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
        {role === 'asesor' ? 'Compartir documento con el cliente' : 'Subir documento a tu asesor'}
      </h3>

      {file ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
          <UploadCloud size={18} className="muted" />
          <span style={{ flex: 1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
          <button type="button" onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = '' }} className="muted" aria-label="Quitar"><X size={16} /></button>
        </div>
      ) : (
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: '1.5px dashed var(--border2)', borderRadius: 12, padding: '26px', cursor: 'pointer', marginBottom: 12 }}>
          <UploadCloud size={26} className="muted" />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Selecciona un archivo</span>
          <span className="muted" style={{ fontSize: 12.5 }}>PDF, imágenes, Excel, ZIP…</span>
          <input ref={inputRef} type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
      )}

      <label className="field">
        <span>Categoría</span>
        <div className="input-wrap">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {DOC_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </label>

      {error && <div className="error-box" style={{ marginBottom: 12 }}>{error}</div>}

      <button type="submit" className="btn btn-primary btn-block" disabled={!file || busy}>
        {busy ? <Loader2 size={18} className="spin" /> : 'Subir documento'}
      </button>
    </form>
  )
}
