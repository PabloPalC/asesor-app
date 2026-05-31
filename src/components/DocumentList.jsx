'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Download, Trash2, Loader2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatBytes, formatDate } from '@/lib/format'

export default function DocumentList({ docs, canDelete = false, currentUserId = null, showClient = false, emptyText = 'No hay documentos todavía.' }) {
  const canRemove = (doc) => canDelete || (currentUserId && doc.uploaded_by === currentUserId)
  const router = useRouter()
  const [busyId, setBusyId] = useState(null)

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
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Documento</th>
            {showClient && <th>Cliente</th>}
            <th>Categoría</th>
            <th>Tamaño</th>
            <th>Fecha</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(37,99,235,.14)', color: '#93c5fd', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <FileText size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>{doc.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {doc.direction === 'to_client'
                        ? <><ArrowDownLeft size={12} /> Del asesor</>
                        : <><ArrowUpRight size={12} /> Del cliente</>}
                    </div>
                  </div>
                </div>
              </td>
              {showClient && <td className="muted">{doc.clientName || '—'}</td>}
              <td><span className="badge badge-muted">{doc.category}</span></td>
              <td className="muted">{formatBytes(doc.size_bytes)}</td>
              <td className="muted">{formatDate(doc.created_at)}</td>
              <td>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => download(doc)} disabled={busyId === doc.id + ':dl'} title="Descargar">
                    {busyId === doc.id + ':dl' ? <Loader2 size={15} className="spin" /> : <Download size={15} />}
                  </button>
                  {canRemove(doc) && (
                    <button className="btn btn-danger btn-sm" onClick={() => remove(doc)} disabled={busyId === doc.id + ':rm'} title="Eliminar">
                      {busyId === doc.id + ':rm' ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
