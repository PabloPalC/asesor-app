import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TenantProvider } from './context/TenantContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import Files from './pages/Files'
import Charts from './pages/Charts'
import Customize from './pages/Customize'
import ClientPortal from './pages/ClientPortal'

export default function App() {
  return (
    <TenantProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clientes" element={<Clients />} />
            <Route path="clientes/:id" element={<ClientDetail />} />
            <Route path="archivos" element={<Files />} />
            <Route path="graficas" element={<Charts />} />
            <Route path="personalizar" element={<Customize />} />
            <Route path="vista-cliente" element={<ClientPortal />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </TenantProvider>
  )
}
