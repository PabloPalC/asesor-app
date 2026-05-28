export const DEMO_TENANT = {
  id: 't-1',
  slug: 'garcia-asesores',
  name: 'García Asesores',
  area: 'Asesoría integral',
  logoText: 'GA',
  primaryColor: '#2563eb',
  ownerName: 'Pablo García',
  email: 'pablo@garcia-asesores.es',
  plan: 'Pro',
}

export const DEMO_CLIENTS = [
  { id: 'c1', name: 'Marta Sánchez Ruiz', email: 'marta@empresa.com', company: 'Diseño Gráfico SL', status: 'active', joined: '2024-03-12', files: 14, lastActivity: 'Hace 2 h' },
  { id: 'c2', name: 'Luis Fernández Pérez', email: 'lfernandez@constructora.es', company: 'Constructora Levante', status: 'active', joined: '2024-01-08', files: 32, lastActivity: 'Ayer' },
  { id: 'c3', name: 'Carmen Díaz', email: 'carmen.diaz@gmail.com', company: 'Autónoma', status: 'pending', joined: '2025-05-20', files: 3, lastActivity: 'Hace 1 sem' },
  { id: 'c4', name: 'Restaurante La Brasa', email: 'info@labrasa.es', company: 'Restaurante La Brasa SL', status: 'active', joined: '2023-09-04', files: 67, lastActivity: 'Hace 30 min' },
  { id: 'c5', name: 'Tienda Online Modas', email: 'admin@modas.com', company: 'Modas Online SL', status: 'active', joined: '2024-11-15', files: 22, lastActivity: 'Hace 3 h' },
  { id: 'c6', name: 'Javier Romero', email: 'j.romero@consultoria.com', company: 'Romero Consultoría', status: 'inactive', joined: '2022-06-30', files: 89, lastActivity: 'Hace 2 meses' },
  { id: 'c7', name: 'Inmobiliaria Costa', email: 'gestion@inmocosta.es', company: 'Inmocosta SL', status: 'active', joined: '2024-07-22', files: 41, lastActivity: 'Hace 5 h' },
  { id: 'c8', name: 'Clara Moreno', email: 'clara.moreno@correo.es', company: 'Autónoma', status: 'active', joined: '2025-02-11', files: 8, lastActivity: 'Hoy' },
]

export const DEMO_FILES = [
  { id: 'f1', name: 'IRPF 2024 - Borrador.pdf', clientId: 'c1', type: 'pdf', size: '1.2 MB', uploaded: '2025-05-22', category: 'Fiscal' },
  { id: 'f2', name: 'Modelo 303 1T.pdf', clientId: 'c2', type: 'pdf', size: '845 KB', uploaded: '2025-05-20', category: 'IVA' },
  { id: 'f3', name: 'Nóminas Mayo 2025.xlsx', clientId: 'c4', type: 'xlsx', size: '320 KB', uploaded: '2025-05-19', category: 'Laboral' },
  { id: 'f4', name: 'Contrato arrendamiento local.pdf', clientId: 'c7', type: 'pdf', size: '2.1 MB', uploaded: '2025-05-18', category: 'Legal' },
  { id: 'f5', name: 'Facturas Q1 2025.zip', clientId: 'c2', type: 'zip', size: '8.4 MB', uploaded: '2025-05-15', category: 'Contabilidad' },
  { id: 'f6', name: 'Resumen anual 2024.pdf', clientId: 'c1', type: 'pdf', size: '4.7 MB', uploaded: '2025-05-12', category: 'Resumen' },
  { id: 'f7', name: 'Plan financiero 2025.xlsx', clientId: 'c5', type: 'xlsx', size: '720 KB', uploaded: '2025-05-10', category: 'Financiero' },
  { id: 'f8', name: 'Acta junta socios.pdf', clientId: 'c2', type: 'pdf', size: '480 KB', uploaded: '2025-05-08', category: 'Legal' },
  { id: 'f9', name: 'Modelo 130 1T.pdf', clientId: 'c8', type: 'pdf', size: '210 KB', uploaded: '2025-05-05', category: 'Fiscal' },
  { id: 'f10', name: 'Inventario stock.xlsx', clientId: 'c5', type: 'xlsx', size: '1.8 MB', uploaded: '2025-05-02', category: 'Contabilidad' },
]

export const DEMO_REVENUE = [
  { month: 'Ene', value: 8400 },
  { month: 'Feb', value: 9200 },
  { month: 'Mar', value: 10800 },
  { month: 'Abr', value: 11400 },
  { month: 'May', value: 13200 },
]

export const DEMO_CLIENTS_GROWTH = [
  { month: 'Ene', clientes: 18 },
  { month: 'Feb', clientes: 22 },
  { month: 'Mar', clientes: 27 },
  { month: 'Abr', clientes: 31 },
  { month: 'May', clientes: 38 },
]

export const DEMO_CATEGORIES = [
  { name: 'Fiscal', value: 42, color: '#2563eb' },
  { name: 'Laboral', value: 28, color: '#10b981' },
  { name: 'Contabilidad', value: 18, color: '#f59e0b' },
  { name: 'Legal', value: 12, color: '#ef4444' },
]

export const DEMO_ACTIVITY = [
  { id: 'a1', text: 'Marta Sánchez subió IRPF 2024 - Borrador.pdf', time: 'Hace 2 h', type: 'upload' },
  { id: 'a2', text: 'Luis Fernández firmó contrato', time: 'Hace 4 h', type: 'sign' },
  { id: 'a3', text: 'Carmen Díaz registrada como cliente', time: 'Ayer', type: 'new' },
  { id: 'a4', text: 'Restaurante La Brasa solicitó factura', time: 'Ayer', type: 'request' },
  { id: 'a5', text: 'Tienda Online Modas pago confirmado', time: 'Hace 2 d', type: 'payment' },
]

export const COLOR_PRESETS = [
  { name: 'Azul', value: '#2563eb' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Morado', value: '#7c3aed' },
  { name: 'Ámbar', value: '#f59e0b' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Cian', value: '#06b6d4' },
]

export const AREAS = [
  'Asesoría integral',
  'Asesoría fiscal',
  'Asesoría laboral',
  'Asesoría legal',
  'Asesoría financiera',
  'Consultoría empresarial',
  'Mentoría / Coaching',
  'Otro',
]
