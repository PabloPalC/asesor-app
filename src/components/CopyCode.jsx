'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyCode({ code, label = 'Código de invitación' }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div className="muted" style={{ fontSize: 13 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '.12em', fontFamily: 'monospace' }}>{code}</div>
        <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 2 }}>
          Compártelo para que tus clientes se registren en tu despacho.
        </div>
      </div>
      <button onClick={copy} className={`btn ${copied ? 'btn-ghost' : 'btn-primary'}`}>
        {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
      </button>
    </div>
  )
}
