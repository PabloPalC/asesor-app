import { createContext, useContext, useEffect, useState } from 'react'
import { DEMO_TENANT } from '../data/mockData'

const TenantContext = createContext(null)

const STORAGE_KEY = 'asesor-app:tenant'

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEMO_TENANT
    } catch {
      return DEMO_TENANT
    }
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tenant.primaryColor)
    document.documentElement.style.setProperty('--accent2', tenant.primaryColor)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tenant.primaryColor)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tenant))
  }, [tenant])

  const updateTenant = (changes) => setTenant((prev) => ({ ...prev, ...changes }))
  const resetTenant = () => setTenant(DEMO_TENANT)

  return (
    <TenantContext.Provider value={{ tenant, updateTenant, resetTenant }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used within TenantProvider')
  return ctx
}
