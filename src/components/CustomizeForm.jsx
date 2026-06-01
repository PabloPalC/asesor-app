'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Check, Building2, Hash } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AREAS, COLOR_PRESETS } from '@/lib/constants'

export default function CustomizeForm({ tenant }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: tenant.name,
    area: tenant.area,
    logo_text: tenant.logo_text,
    primary_color: tenant.primary_color,
  })
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false) }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('tenants')
      .update({
        name: form.name.trim(),
        area: form.area,
        logo_text: form.logo_text.trim().slice(0, 3).toUpperCase() || 'AA',
        primary_color: form.primary_color,
      })
      .eq('id', tenant.id)
    setBusy(false)
    if (err) { setError(err.message); return }
    setSaved(true)
    router.refresh()
  }

  return (
    <div className="grid grid-main">
      <form onSubmit={save} className="card">
        <label className="field">
          <span>Nombre del despacho</span>
          <div className="input-wrap">
            <Building2 size={16} />
            <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
        </label>

        <label className="field">
          <span>Área</span>
          <div className="input-wrap">
            <select value={form.area} onChange={(e) => set('area', e.target.value)}>
              {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </label>

        <label className="field">
          <span>Iniciales del logo (máx. 3)</span>
          <div className="input-wrap">
            <Hash size={16} />
            <input value={form.logo_text} maxLength={3}
              onChange={(e) => set('logo_text', e.target.value.toUpperCase())} required />
          </div>
        </label>

        <div className="field">
          <span>Color de marca</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {COLOR_PRESETS.map((c) => (
              <button type="button" key={c.value} onClick={() => set('primary_color', c.value)} title={c.name}
                style={{
                  width: 34, height: 34, borderRadius: 9, background: c.value, cursor: 'pointer',
                  border: form.primary_color === c.value ? '3px solid #fff' : '3px solid transparent',
                  boxShadow: form.primary_color === c.value ? '0 0 0 1px var(--border2)' : 'none',
                }} />
            ))}
            <label className="input-wrap" style={{ width: 'auto', gap: 8, height: 38 }}>
              <input type="color" value={form.primary_color}
                onChange={(e) => set('primary_color', e.target.value)}
                style={{ width: 28, height: 24, border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{form.primary_color}</span>
            </label>
          </div>
        </div>

        {error && <div className="error-box" style={{ marginBottom: 14 }}>{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={busy}
          style={{ '--accent': form.primary_color }}>
          {busy ? <Loader2 size={18} className="spin" /> : saved ? <><Check size={16} /> Guardado</> : 'Guardar cambios'}
        </button>
      </form>

      <div className="card" style={{ '--accent': form.primary_color }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Vista previa</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: form.primary_color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>
            {form.logo_text || 'AA'}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{form.name || 'Mi despacho'}</div>
            <div className="muted" style={{ fontSize: 13 }}>{form.area}</div>
          </div>
        </div>
        <button className="btn btn-primary btn-block" style={{ marginTop: 14, background: form.primary_color }}>
          Botón de ejemplo
        </button>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 14 }}>
          Así verán tu marca tus clientes en su portal. Los cambios se aplican al instante tras guardar.
        </p>
      </div>
    </div>
  )
}
