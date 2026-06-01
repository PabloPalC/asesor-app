import { getSessionContext } from '@/lib/auth'
import DocumentsBrowser from '@/components/DocumentsBrowser'
import UploadDocument from '@/components/UploadDocument'

export default async function PortalDocumentos() {
  const { supabase, profile, tenant } = await getSessionContext()

  const { data: docs = [] } = await supabase
    .from('documents').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Mis documentos</h1>
          <p className="page-sub">{docs.length} documentos · descarga los de tu asesor o súbele los tuyos</p>
        </div>
      </div>

      <div className="grid grid-main">
        <DocumentsBrowser docs={docs} canDelete={false} currentUserId={profile.id} />
        <UploadDocument
          tenantId={tenant.id} clientId={profile.id} clientName={profile.full_name}
          uploaderId={profile.id} role="cliente"
        />
      </div>
    </div>
  )
}
