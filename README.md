# AsesorApp

Plataforma white-label para asesores y sus clientes. Cada asesor tiene su despacho
(con su marca), sus clientes y sus documentos. Los clientes acceden a un portal privado
con gráficas y documentos compartidos en ambos sentidos.

**Stack:** Next.js 15 (App Router) · Supabase (Auth + Postgres + Storage) · Vercel · Recharts

## Roles

| Rol | Acceso | Qué ve |
|-----|--------|--------|
| `asesor` | `/app` | Su despacho: clientes, documentos, gráficas, personalización de marca |
| `cliente` | `/portal` | Su espacio: documentos con su asesor, sus gráficas, subir archivos |
| `admin` | `/admin` | Toda la plataforma: despachos, asesores, clientes, métricas globales |

## Cómo funciona el registro

- **Asesor:** se registra en `/registro/asesor` → se crea su despacho (tenant) y un **código de invitación**.
- **Cliente:** se registra en `/registro/cliente` con el **código del asesor** → queda vinculado a ese despacho.
- **Admin:** no se registra desde la web; se asigna manualmente (ver abajo).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # rellena con tus claves de Supabase
npm run dev                  # http://localhost:3000
```

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
```

## Despliegue en Vercel

1. En [vercel.com](https://vercel.com) → **Add New → Project** → importa `PabloPalC/asesor-app`.
2. Framework: **Next.js** (autodetectado). Build: `next build`.
3. **Environment Variables** (Production + Preview + Development):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**. Cada `git push` a `main` redespliega solo.

## Configuración de Supabase Auth (importante)

En el panel de Supabase → **Authentication → URL Configuration**:

- **Site URL:** la URL de Vercel (p. ej. `https://asesor-app.vercel.app`).
- **Redirect URLs:** añade `https://<tu-dominio-vercel>/**` y `http://localhost:3000/**`.

Para pruebas rápidas puedes desactivar **Authentication → Providers → Email → Confirm email**
(así el registro entra directo sin confirmar correo). En producción, déjalo activado.

## Crear el primer administrador

No hay admins por defecto. Tras registrar la cuenta que será admin (como asesor o cliente),
ejecútalo en **Supabase → SQL Editor**:

```sql
update public.profiles set role = 'admin' where email = 'tu-email@ejemplo.com';
```

## Modelo de datos

- `tenants` — despacho de cada asesor (marca, color, `join_code`, `owner_id`).
- `profiles` — usuarios (extiende `auth.users`): `role`, `tenant_id`, `status`…
- `documents` — ficheros en Storage (`to_client` / `to_advisor`), ligados a tenant + cliente.
- `activity` — feed de actividad, base de las gráficas automáticas.

Toda la seguridad es por **RLS**: cada despacho está aislado a nivel de base de datos.
Los ficheros viven en el bucket privado `documents` con ruta `tenant_id/client_id/archivo`
y se descargan con URLs firmadas temporales.
