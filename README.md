# Raven Boxing Club — sitio web y panel de administración

🔗 **Demo en vivo:** https://raven-boxing-club-5pc7vhve4-davidaniortetec.vercel.app

Aplicación web para Raven Boxing Club (Orihuela, Alicante): sitio público
(inicio, clases, horarios, entrenadores, galería, productos, contacto) +
panel de administración privado para gestionar todo el contenido.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase
(base de datos, autenticación y almacenamiento de imágenes).

## 1. Poner el logo real

El sitio usa el logo del club en varios sitios (cabecera, pie de página,
favicon, JSON-LD). Coloca el archivo original aquí:

```
public/images/logo.png
```

Mientras ese archivo no exista, la cabecera muestra automáticamente un
logo de repuesto (un círculo verde con "R") para que el sitio nunca se vea
roto — en cuanto añadas `logo.png` se sustituye solo, sin tocar código.

## 2. Ejecutar el sitio en local (sin Supabase)

```bash
npm install
npm run dev
```

El sitio público funciona completo desde el primer momento con **contenido
de ejemplo** (ver `src/lib/seed/`). Los datos reales del club (nombre,
dirección, teléfono, horario general) ya están cargados porque provienen de
la ficha pública de Google Maps; todo lo demás (clases, entrenadores,
galería, noticias) es contenido de ejemplo claramente editable.

El panel de administración (`/admin`) mostrará un aviso pidiendo conectar
Supabase hasta que completes el paso 3.

## 3. Conectar Supabase (necesario para el panel de administración)

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecuta en este orden:
   - `supabase/schema.sql` (tablas, seguridad a nivel de fila, buckets de
     almacenamiento para imágenes)
   - `supabase/seed.sql` (carga el mismo contenido de ejemplo que ya ves en
     local, para que el panel no arranque vacío)
3. En **Project Settings → API**, copia la `Project URL` y la `anon public
   key`.
4. Copia `.env.local.example` a `.env.local` y pega esos valores:

   ```bash
   cp .env.local.example .env.local
   ```

5. Crea tu usuario administrador en **Authentication → Users → Add user**
   (email + contraseña). Es el único login que necesita el panel — no hay
   registro público.
6. Reinicia `npm run dev` y entra en `/admin/login`.

A partir de aquí, el panel permite crear, editar, eliminar y
activar/desactivar: información del gimnasio, horarios, clases,
entrenadores, galería (con subida de imágenes), productos (ropa y
merchandising), noticias y consultar los mensajes del formulario de
contacto.

## Estructura

- `src/app/(public)/` — páginas públicas.
- `src/app/admin/` — panel de administración (protegido por
  `src/middleware.ts` + Supabase Auth).
- `src/lib/data/public.ts` — capa de lectura: usa Supabase si está
  configurado, si no cae a `src/lib/seed/` automáticamente.
- `src/lib/data/admin-crud.ts` — operaciones de escritura genéricas usadas
  por el panel (siempre requieren Supabase + sesión autenticada).
- `supabase/schema.sql` / `supabase/seed.sql` — esquema y datos de ejemplo.

## Despliegue

Pensado para desplegar en [Vercel](https://vercel.com): importa el
repositorio, añade las mismas variables de `.env.local` en la configuración
del proyecto y despliega. Recuerda actualizar `NEXT_PUBLIC_SITE_URL` a tu
dominio real.

## Próximos pasos (cuando el club lo necesite)

La base ya está lista para crecer sin rehacer nada:

- **Registro/login de socios y reservas de clases**: reutiliza Supabase
  Auth (ya integrado) añadiendo un rol de "socio" y tablas de
  `bookings`/`memberships`.
- **Notificaciones**: Supabase tiene soporte nativo para triggers/Edge
  Functions que pueden disparar emails o push.
- **Asistencia a entrenamientos**: una tabla `attendance` referenciando
  `schedule_slots` y el usuario socio.
