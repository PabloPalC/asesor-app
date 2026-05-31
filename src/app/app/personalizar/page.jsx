import { getSessionContext } from '@/lib/auth'
import CustomizeForm from '@/components/CustomizeForm'

export default async function PersonalizarPage() {
  const { tenant } = await getSessionContext()

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Personalizar</h1>
          <p className="page-sub">Tu marca: nombre, logo y color del despacho</p>
        </div>
      </div>
      <CustomizeForm tenant={tenant} />
    </div>
  )
}
