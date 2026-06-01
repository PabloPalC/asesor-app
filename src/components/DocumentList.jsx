'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Download, Trash2, Loader2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatBytes, formatDate } from '@/lib/format'

export default function DocumentList({ docs, canDelete = false, currentUserId = null, showClient = false, emptyText = 'No hay documentos todavía.' }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState(null)
  const canRemove = (doc) => canDelete || (currentUserId && doc.uploaded_by === currentUserId)

  const download = async (doc) => {
    setBusyId(doc.id + ':dl')
    const supabase = createClient()
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(doc.storage_path, 60)
    setBusyId(null)
    if (error) { alert('No se pudo generar el enlace de descarga.'); return }
    window.open(data.signedUrl, '_blank', 'noopener')
  }

  const remove = async (doc) => {
    if (!confirm(`¿Eliminar "${doc.name}"? Esta acción no se puede deshacer.`)) return
    setBusyId(doc.id + ':rm')
    const supabase = createClient()
    await supabase.storage.from('documents').remove([doc.storage_path])
    const { error } = await supabase.from('documents').delete().eq('id', doc.id)
    setBusyId(null)
    if (error) { alert('No se pudo eliminar el documento.'); return }
    router.refresh()
  }

  if (!docs.length) {
    return <div className="empty"><FileText size={32} /><div>{emptyText}</div></div>
  }

  return (
    <div className="dlist">
      {docs.map((doc) => (
        <div key={doc.id} className="ditem ditem-wide">
          <div className="ditem-main">
            <div className="ficon"><FileText size={16} /></div>
            <div style={{ minWidth: 0 }}>
              <div className="dname">{doc.name}</div>
              <div className="dsub">
                {doc.direction === 'to_client'
                  ? <><ArrowDownLeft size={12} /> Del asesor</>
                  : <><ArrowUpRight size={12} /> Del cliente</>}
                {showClient && doc.clientName ? ` · ${doc.clientName}` : ''}
              </div>
            </div>
          </div>

          <div className="ditem-meta">
            <span className="badge badge-muted">{doc.category}</span>
            <span>{formatBytes(doc.size_bytes)}</span>
            <span>{formatDate(doc.created_at)}</span>
          </div>

          <div className="ditem-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => download(doc)} disabled={busyId === doc.id + ':dl'} title="Descargar" aria-label="Descargar">
              {busyId === doc.id + ':dl' ? <Loader2 size={15} className="spin" /> : <Download size={15} />}
            </button>
            {canRemove(doc) && (
              <button className="btn btn-danger btn-sm" onClick={() => remove(doc)} disabled={busyId === doc.id + ':rm'} title="Eliminar" aria-label="Eliminar">
                {busyId === doc.id + ':rm' ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
