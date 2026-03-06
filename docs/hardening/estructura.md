# INFORME DE AUDITORÍA — ESTRUCTURA DEL PROYECTO ETAXI

**Fecha**: 2025-11-16
**Proyecto**: ETAXI Web + Backoffice
**Versión auditada**: Actual (pre-hardening)

---

## 1. ESTRUCTURA ACTUAL

```
etaxi/
├── app/
│   ├── admin/                    ✅ Backoffice admin
│   │   ├── companies/
│   │   ├── drivers/
│   │   ├── login/
│   │   ├── operacion/
│   │   │   ├── asignar/[requestId]/
│   │   │   ├── seguimiento/[assignmentId]/
│   │   │   └── solicitudes/
│   │   ├── ride-requests/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── api/                      ✅ Endpoints API
│   │   ├── auth/[...nextauth]/
│   │   ├── company-leads/
│   │   ├── driver/
│   │   │   ├── assignments/
│   │   │   ├── login/
│   │   │   └── me/
│   │   ├── driver-leads/
│   │   ├── operator/
│   │   │   ├── assign/
│   │   │   ├── assignment/state/
│   │   │   ├── assignments/[assignmentId]/
│   │   │   ├── drivers/
│   │   │   ├── fleet-operators/
│   │   │   ├── requests/
│   │   │   └── taxis/
│   │   └── ride-requests/
│   │
│   ├── [locale]/                 ✅ Sitio público con i18n
│   │   ├── ayuda/
│   │   ├── conductores/
│   │   ├── contacto/
│   │   ├── cumplimiento/
│   │   ├── descargar-app/
│   │   ├── empresas-gremios/
│   │   ├── pedir-taxi/
│   │   ├── seguridad/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── layout.tsx                ✅ Layout raíz
│   ├── robots.ts
│   ├── seo.config.ts
│   └── sitemap.ts
│
├── components/                   ✅ Componentes React
│   ├── common/
│   ├── forms/
│   ├── home/
│   ├── layout/
│   └── ui/
│
├── lib/                          ✅ Utilidades y helpers
│   ├── animations.ts
│   ├── auth.ts
│   ├── driver-auth.ts
│   ├── prisma.ts
│   ├── sanity.client.ts
│   ├── sanity.queries.ts
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma
│
├── docs/                         ⚠️ CREADA EN ESTE HARDENING
│   ├── hardening/
│   ├── operacion/
│   └── data/
│
└── package.json
```

---

## 2. PROBLEMAS DETECTADOS

### 🔴 **CRÍTICO: Error 404 en rutas públicas**

**Problema**: Si el usuario intenta acceder a `/contacto`, obtendrá 404 porque las rutas están bajo `[locale]`.

**Rutas afectadas**:
- `/contacto` → debe ser `/es/contacto` o `/en/contacto`
- `/pedir-taxi` → debe ser `/es/pedir-taxi`
- `/seguridad` → debe ser `/es/seguridad`
- `/cumplimiento` → debe ser `/es/cumplimiento`
- etc.

**Causa raíz**: Next.js con App Router + parámetro dinámico `[locale]` requiere que todas las rutas incluyan el idioma.

**Soluciones posibles**:
1. **Opción A**: Redirigir automáticamente desde `/contacto` a `/es/contacto` (middleware)
2. **Opción B**: Documentar claramente que todas las rutas requieren idioma
3. **Opción C**: Mover páginas fuera de `[locale]` y usar i18n solo en componentes

**Recomendación**: Implementar **middleware de redirección automática** que detecte el idioma del navegador o use español por defecto.

---

### ⚠️ **Estructura faltante**

**Problema**: No existe carpeta `types/` para definiciones TypeScript compartidas.

**Impacto**:
- Tipos duplicados en múltiples archivos
- Dificulta mantenimiento
- No hay single source of truth para tipos de dominio

**Solución**: Crear `types/` con:
```
types/
├── index.ts
├── driver.ts
├── assignment.ts
├── request.ts
└── operator.ts
```

---

### ⚠️ **Duplicación de lógica de autenticación**

**Archivos afectados**:
- `lib/auth.ts` (auth de admin/backoffice)
- `lib/driver-auth.ts` (auth de conductores)

**Problema**: Dos sistemas de autenticación independientes pueden causar:
- Duplicación de código
- Inconsistencias en validación JWT
- Dificulta auditoría de seguridad

**Solución**: Consolidar en:
```
lib/auth/
├── admin.ts
├── driver.ts
├── middleware.ts
└── jwt.ts (shared)
```

---

### ⚠️ **Archivo suelto en raíz**

**Archivo**: `prisma.config.ts`

**Problema**: No está claro si se usa o es archivo legacy.

**Acción**: Revisar si se utiliza, sino eliminar.

---

### ⚠️ **Falta documentación**

**Problema**: No existe documentación técnica del proyecto.

**Impacto**:
- Dificulta onboarding de nuevos desarrolladores
- No hay referencia de flujos operativos
- No hay documentación de modelos de datos

**Solución**: Crear estructura de documentación (iniciada en este hardening):
- `docs/hardening/` → auditorías y mejoras
- `docs/operacion/` → flujos operativos
- `docs/data/` → modelos de datos
- `docs/api/` → documentación de endpoints

---

## 3. PUNTOS POSITIVOS

✅ **Separación clara de responsabilidades**:
- `/admin` → backoffice
- `/api` → endpoints
- `[locale]` → sitio público

✅ **Componentes bien organizados** por función:
- `common/` → componentes compartidos
- `forms/` → formularios
- `home/` → componentes específicos de home
- `layout/` → layout components
- `ui/` → componentes base UI

✅ **API organizada por dominio**:
- `/api/driver/` → endpoints para conductores
- `/api/operator/` → endpoints para operadores
- `/api/company-leads/` → leads de empresas

✅ **Uso de Prisma** para ORM y type-safety.

✅ **Internacionalización** implementada con `next-intl`.

✅ **CMS integrado** (Sanity) para gestión de contenido.

---

## 4. ACCIONES RECOMENDADAS

### Alta prioridad
1. ✅ **Crear middleware de redirección** para resolver 404 en rutas sin locale
2. ✅ **Crear carpeta `types/`** para definiciones TypeScript
3. ✅ **Consolidar autenticación** en `lib/auth/`
4. ✅ **Documentar** estructura y flujos (este documento es el inicio)

### Media prioridad
5. ⚠️ Revisar y eliminar `prisma.config.ts` si no se usa
6. ⚠️ Auditar dependencias (ver `docs/hardening/dependencies.md`)
7. ⚠️ Crear documentación de API (OpenAPI/Swagger)

### Baja prioridad
8. 🔵 Considerar migrar a estructura de monorepo si se agregan más apps (App Conductor, App Pasajero)
9. 🔵 Implementar testing (Jest + React Testing Library)

---

## 5. CAMBIOS SUGERIDOS

### Crear middleware para i18n

**Archivo**: `middleware.ts` (raíz del proyecto)

```typescript
import { NextRequest, NextResponse } from 'next/server'

const locales = ['es', 'en']
const defaultLocale = 'es'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has locale
  const hasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return NextResponse.next()

  // Redirect to default locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|admin).*)']
}
```

---

### Crear estructura de tipos

**Archivo**: `types/index.ts`

```typescript
// Re-export all types
export * from './driver'
export * from './assignment'
export * from './request'
export * from './operator'
```

**Archivo**: `types/driver.ts`

```typescript
import { Driver, Taxi } from '@prisma/client'

export type DriverWithTaxis = Driver & {
  taxis: Taxi[]
}

export type DriverLoginResponse = {
  token: string
  driver: {
    id: string
    name: string
    phone: string
    operatorId: string | null
    taxis: Taxi[]
  }
}
```

---

## 6. ARCHIVOS A MOVER/REORGANIZAR

| Archivo actual | Ubicación sugerida | Razón |
|---------------|-------------------|-------|
| `lib/auth.ts` | `lib/auth/admin.ts` | Separar auth de admin |
| `lib/driver-auth.ts` | `lib/auth/driver.ts` | Consolidar en carpeta auth |
| - | `lib/auth/jwt.ts` (nuevo) | Lógica JWT compartida |
| `prisma.config.ts` | ❌ Eliminar si no se usa | Archivo suelto |

---

## 7. MÉTRICAS DE CÓDIGO

**Rutas totales**:
- Páginas públicas: 9 (`[locale]/*`)
- Páginas admin: 7 (`admin/*`)
- Endpoints API: ~20

**Componentes**:
- Common: 1
- Forms: 3
- Home: 4
- Layout: 4
- UI: 5
**Total**: ~17 componentes

**Archivos lib**: 7

---

## 8. PRÓXIMOS PASOS

1. ✅ Revisar este informe
2. ✅ Implementar middleware de i18n
3. ✅ Crear estructura `types/`
4. ✅ Consolidar auth
5. ✅ Continuar con HARD-2 (naming conventions)

---

**Fin del informe**
