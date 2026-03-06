# NAMING STANDARDS — ETAXI PROJECT

**Fecha**: 2025-11-16
**Versión**: 1.0

---

## 1. NAMING PARA ARCHIVOS

### Componentes React

**Convención**: `PascalCase`

✅ **Correcto**:
```
ContactForm.tsx
HeroSection.tsx
DownloadAppCTA.tsx
SafetyFeatures.tsx
```

❌ **Incorrecto**:
```
contactForm.tsx
hero-section.tsx
downloadAppCta.tsx
safety_features.tsx
```

**Regla**: El nombre del archivo debe coincidir con el nombre del componente exportado.

```typescript
// ✅ Correcto
// Archivo: ContactForm.tsx
export function ContactForm() { ... }

// ❌ Incorrecto
// Archivo: contact.tsx
export function ContactForm() { ... }
```

---

### Hooks personalizados

**Convención**: `useCamelCase`

✅ **Correcto**:
```
useAuth.ts
useLocationTracking.ts
useDriverAssignments.ts
```

❌ **Incorrecto**:
```
authHook.ts
location-tracking-hook.ts
UseDriverAssignments.ts
```

**Regla**: El archivo y la función exportada deben comenzar con `use`.

```typescript
// ✅ Correcto
// Archivo: useAuth.ts
export function useAuth() { ... }
```

---

### API Routes (Next.js)

**Convención**: `kebab-case` para carpetas, `route.ts` para archivos

✅ **Correcto**:
```
app/api/driver-leads/route.ts
app/api/company-leads/route.ts
app/api/ride-requests/route.ts
```

❌ **Incorrecto**:
```
app/api/driverLeads/route.ts
app/api/CompanyLeads/route.ts
app/api/ride_requests/route.ts
```

**Estructura de carpetas**:
```
app/api/
├── driver/
│   ├── login/route.ts
│   ├── assignments/
│   │   ├── route.ts
│   │   └── [id]/
│   │       ├── route.ts
│   │       └── state/route.ts
│   └── me/route.ts
```

---

### Utilidades y helpers

**Convención**: `camelCase`

✅ **Correcto**:
```
lib/auth.ts
lib/prisma.ts
lib/utils.ts
lib/validations.ts
```

❌ **Incorrecto**:
```
lib/Auth.ts
lib/Prisma.ts
lib/Utils.ts
lib/validation-helpers.ts
```

---

### Páginas (Next.js App Router)

**Convención**: Carpeta `kebab-case`, archivo `page.tsx`

✅ **Correcto**:
```
app/[locale]/pedir-taxi/page.tsx
app/[locale]/descargar-app/page.tsx
app/admin/ride-requests/page.tsx
```

❌ **Incorrecto**:
```
app/[locale]/pedirTaxi/page.tsx
app/[locale]/Descargar-App/page.tsx
app/admin/RideRequests/page.tsx
```

---

## 2. NAMING PARA BASE DE DATOS (PRISMA)

### Modelos

**Convención**: `PascalCase` singular

✅ **Correcto**:
```prisma
model Driver {
  id        String   @id @default(cuid())
  name      String
  phone     String
}

model Assignment {
  id        String   @id @default(cuid())
  state     String
}

model FleetOperator {
  id        String   @id @default(cuid())
  name      String
}
```

❌ **Incorrecto**:
```prisma
model driver { ... }
model Drivers { ... }
model fleet_operator { ... }
```

---

### Campos (fields)

**Convención**: `camelCase`

✅ **Correcto**:
```prisma
model PassengerRequest {
  id              String   @id @default(cuid())
  pickupAddress   String
  dropoffAddress  String?
  requestedAt     DateTime @default(now())
  customerName    String
  customerPhone   String
}
```

❌ **Incorrecto**:
```prisma
model PassengerRequest {
  id               String   @id @default(cuid())
  pickup_address   String     // ❌ snake_case
  DropoffAddress   String?    // ❌ PascalCase
  requested_at     DateTime   // ❌ snake_case
}
```

---

### Relaciones

**Convención**:
- Campo FK: `camelCaseId`
- Relación: `camelCase`

✅ **Correcto**:
```prisma
model Assignment {
  id         String   @id @default(cuid())
  driverId   String
  taxiId     String
  requestId  String
  operatorId String?

  driver     Driver          @relation(fields: [driverId], references: [id])
  taxi       Taxi            @relation(fields: [taxiId], references: [id])
  request    PassengerRequest @relation(fields: [requestId], references: [id])
  operator   FleetOperator?   @relation(fields: [operatorId], references: [id])
}
```

❌ **Incorrecto**:
```prisma
model Assignment {
  driver_id   String   // ❌ snake_case
  Driver      Driver   // ❌ PascalCase para relación
}
```

---

## 3. NAMING PARA CÓDIGO TypeScript

### Variables

**Convención**: `camelCase`

✅ **Correcto**:
```typescript
const driverName = "Juan Pérez"
const assignmentId = "abc123"
const hasActiveService = true
```

❌ **Incorrecto**:
```typescript
const DriverName = "Juan Pérez"
const assignment_id = "abc123"
const HAS_ACTIVE_SERVICE = true
```

---

### Constantes

**Convención**: `UPPER_SNAKE_CASE` para constantes globales, `camelCase` para constantes locales

✅ **Correcto**:
```typescript
// Constantes globales de configuración
export const MAX_RETRY_ATTEMPTS = 3
export const DEFAULT_LOCALE = 'es'
export const JWT_EXPIRATION = '7d'

// Constantes locales
const maxLength = 100
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

❌ **Incorrecto**:
```typescript
export const maxRetryAttempts = 3  // ❌ debería ser UPPER_SNAKE_CASE
const API_URL = "..."              // ❌ constante local no necesita UPPER
```

---

### Funciones

**Convención**: `camelCase`, verbos descriptivos

✅ **Correcto**:
```typescript
function getDriverAssignments() { ... }
async function createAssignment() { ... }
function validatePhoneNumber() { ... }
function isDriverAvailable() { ... }
```

❌ **Incorrecto**:
```typescript
function GetDriverAssignments() { ... }  // ❌ PascalCase
function assignment() { ... }            // ❌ no es verbo
function check() { ... }                 // ❌ muy genérico
```

**Patrones recomendados**:
- `get*` → obtener datos
- `create*` → crear entidad
- `update*` → actualizar entidad
- `delete*` → eliminar entidad
- `is*` / `has*` / `can*` → booleanos
- `validate*` → validaciones

---

### Tipos e Interfaces

**Convención**: `PascalCase`

✅ **Correcto**:
```typescript
interface DriverProfile {
  id: string
  name: string
  phone: string
}

type AssignmentState =
  | 'SENT_TO_DRIVER'
  | 'ACCEPTED_BY_DRIVER'
  | 'DRIVER_EN_ROUTE'
  | 'PASSENGER_ONBOARD'
  | 'COMPLETED'
  | 'CANCELED'

type DriverWithTaxis = Driver & {
  taxis: Taxi[]
}
```

❌ **Incorrecto**:
```typescript
interface driverProfile { ... }    // ❌ camelCase
type assignmentState = "..."       // ❌ camelCase
type driver_with_taxis = ...       // ❌ snake_case
```

---

### Enums

**Convención**: `PascalCase` para el enum, `UPPER_SNAKE_CASE` para valores

✅ **Correcto**:
```typescript
enum AssignmentState {
  SENT_TO_DRIVER = 'SENT_TO_DRIVER',
  ACCEPTED_BY_DRIVER = 'ACCEPTED_BY_DRIVER',
  DRIVER_EN_ROUTE = 'DRIVER_EN_ROUTE',
  PASSENGER_ONBOARD = 'PASSENGER_ONBOARD',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
```

❌ **Incorrecto**:
```typescript
enum assignmentState { ... }           // ❌ camelCase
enum AssignmentState {
  sentToDriver = '...',                // ❌ camelCase
  AcceptedByDriver = '...',            // ❌ PascalCase
}
```

---

## 4. CONVENCIONES ESPECÍFICAS DE ETAXI

### Estados de Assignment

**Formato**: `UPPER_SNAKE_CASE` con prefijos descriptivos

✅ **Correcto**:
```
SENT_TO_DRIVER
ACCEPTED_BY_DRIVER
REJECTED_BY_DRIVER
DRIVER_EN_ROUTE
PASSENGER_ONBOARD
COMPLETED
CANCELED_BY_DRIVER
CANCELED_BY_PASSENGER
CANCELED_BY_OPERATOR
```

**Regla**: Siempre especificar quién realizó la acción cuando sea relevante.

---

### Nombres de componentes por sección

**Home**:
```
HeroSection.tsx
BenefitsGrid.tsx
SafetyFeatures.tsx
DownloadAppCTA.tsx
```

**Forms**:
```
RequestTaxiForm.tsx
CompanyLeadForm.tsx
DriverLeadForm.tsx
ContactForm.tsx
```

**Layout**:
```
Navbar.tsx
Footer.tsx
Breadcrumbs.tsx
LanguageSelector.tsx
```

---

### Endpoints API por dominio

**Driver**:
```
/api/driver/login
/api/driver/me
/api/driver/assignments
/api/driver/assignments/:id
/api/driver/assignments/:id/state
```

**Operator**:
```
/api/operator/requests
/api/operator/assign
/api/operator/drivers
/api/operator/taxis
/api/operator/fleet-operators
```

**Public**:
```
/api/ride-requests
/api/company-leads
/api/driver-leads
```

---

## 5. CONVENCIONES PROHIBIDAS

### ❌ NO USAR:

1. **Nombres genéricos**:
```typescript
// ❌ Evitar
const data = ...
const temp = ...
const item = ...
const info = ...
```

2. **Abreviaciones no estándar**:
```typescript
// ❌ Evitar
const drv = ...      // usar 'driver'
const asgn = ...     // usar 'assignment'
const req = ...      // usar 'request'
```

3. **Números en nombres**:
```typescript
// ❌ Evitar
const driver1 = ...
const assignment2 = ...
```

4. **Mezcla de idiomas**:
```typescript
// ❌ Evitar
const conductorName = ...    // mezcla español/inglés
const nombreDriver = ...     // mezcla español/inglés
```

**Regla**: Todo el código en inglés, excepto contenido de UI que puede estar en español.

5. **Archivos temporales**:
```
// ❌ Evitar
component-final.tsx
helper-old.ts
utils-backup.ts
test123.tsx
```

---

## 6. ESTRUCTURA DE CARPETAS ESTÁNDAR

```
etaxi/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Rutas públicas con i18n
│   ├── admin/                    # Backoffice
│   ├── api/                      # API endpoints
│   └── layout.tsx
│
├── components/                   # Componentes React
│   ├── common/                   # Componentes compartidos
│   ├── forms/                    # Formularios
│   ├── home/                     # Componentes específicos de home
│   ├── layout/                   # Layout components
│   └── ui/                       # Componentes base UI
│
├── lib/                          # Utilidades y helpers
│   ├── auth/                     # Autenticación
│   │   ├── admin.ts
│   │   ├── driver.ts
│   │   └── jwt.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations.ts
│
├── types/                        # TypeScript definitions
│   ├── index.ts
│   ├── driver.ts
│   ├── assignment.ts
│   └── request.ts
│
├── prisma/                       # Prisma schema
│   └── schema.prisma
│
└── docs/                         # Documentación
    ├── hardening/
    ├── operacion/
    ├── data/
    └── api/
```

---

## 7. CHECKLIST DE REVISIÓN

Antes de hacer commit, verificar:

- [ ] Componentes en PascalCase
- [ ] Hooks comienzan con `use`
- [ ] API routes en kebab-case
- [ ] Variables en camelCase
- [ ] Tipos/Interfaces en PascalCase
- [ ] Modelos Prisma en PascalCase singular
- [ ] Campos Prisma en camelCase
- [ ] No hay archivos con nombres genéricos (temp, test, final, etc.)
- [ ] No hay mezcla de idiomas
- [ ] Nombres descriptivos y claros

---

## 8. HERRAMIENTAS RECOMENDADAS

### ESLint rules

```json
{
  "rules": {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": ["camelCase"]
      },
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "function",
        "format": ["camelCase"]
      }
    ]
  }
}
```

---

**Fin del documento**
