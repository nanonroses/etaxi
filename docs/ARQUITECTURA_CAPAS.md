# ARQUITECTURA LÓGICA — CAPAS ETAXI

## Separación de Responsabilidades y Módulos

Este documento define la arquitectura en capas de ETAXI, separando claramente el sitio web público, el core operacional, el backoffice y las integraciones futuras.

---

## Vista General de Capas

```
┌─────────────────────────────────────────────────┐
│          CAPA 1: WEB PÚBLICA                    │
│  (Next.js + Sanity CMS + Formularios)           │
└──────────────────┬──────────────────────────────┘
                   │ API HTTP/REST
                   ▼
┌─────────────────────────────────────────────────┐
│       CAPA 2: CORE OPERACIONAL                  │
│  (Lógica de negocio + State Machine + DB)       │
└──────────────────┬──────────────────────────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
┌─────────────────┐   ┌──────────────────────────┐
│ CAPA 3:         │   │  CAPA 4:                 │
│ BACKOFFICE      │   │  INTEGRACIONES           │
│ (Panel Operador)│   │  (Apps, Centrales, APIs) │
└─────────────────┘   └──────────────────────────┘
```

---

## CAPA 1: Web Pública (Marketing + Captura)

### Responsabilidad

Sitio web público de ETAXI para:
- Marketing y comunicación
- Captura de solicitudes de taxi (web)
- Captura de leads B2B y conductores
- Información estática (seguridad, cumplimiento, etc.)

### Stack Actual

- **Framework**: Next.js 15 (App Router, Server Components)
- **CMS**: Sanity (contenido marketing)
- **i18n**: next-intl (español/inglés)
- **UI**: Tailwind CSS + componentes custom
- **Hosting**: Vercel

### Componentes

```
/
├── app/
│   ├── [locale]/               # Páginas públicas
│   │   ├── page.tsx            # Home
│   │   ├── pedir-taxi/         # Formulario solicitud
│   │   ├── descargar-app/      # Download CTA
│   │   ├── empresas-gremios/   # B2B landing
│   │   ├── conductores/        # Driver landing
│   │   ├── seguridad/          # Info seguridad
│   │   └── cumplimiento/       # Info legal
│   ├── api/
│   │   ├── ride-requests/      # POST (envía a Core)
│   │   ├── company-leads/      # POST (envía a Core)
│   │   └── driver-leads/       # POST (envía a Core)
├── components/
│   ├── home/                   # Componentes home
│   ├── forms/                  # Formularios
│   └── layout/                 # Header, Footer, Nav
├── sanity/                     # CMS config
└── messages/                   # i18n
```

### Límites de Responsabilidad

**QUÉ HACE**:
- ✅ Mostrar contenido marketing
- ✅ Capturar solicitudes de taxi (formulario simple)
- ✅ Capturar leads B2B y conductores
- ✅ Enviar datos a Core Operacional via API

**QUÉ NO HACE**:
- ❌ Gestionar estado de solicitudes
- ❌ Asignar taxis a pasajeros
- ❌ Comunicarse directamente con conductores
- ❌ Procesar pagos
- ❌ Tracking GPS

### Comunicación con Core

**Unidireccional**: Web → Core

```typescript
// Ejemplo: Envío de solicitud
POST /api/core/passenger-requests
{
  "passengerName": "Juan Pérez",
  "passengerPhone": "+56912345678",
  "originAddress": "Av. Providencia 123, Santiago",
  "channel": "WEB"
}

Response 201:
{
  "ok": true,
  "requestId": "req-abc123",
  "status": "PENDING_ASSIGNMENT"
}
```

---

## CAPA 2: Core Operacional (Brain del Sistema)

### Responsabilidad

Lógica de negocio central de ETAXI:
- Gestión de PassengerRequest (state machine)
- Gestión de Assignments (asignación de taxis)
- Administración de Taxis, Drivers, FleetOperators
- Motor de asignación (manual/semi-automático/automático)
- AuditLog centralizado
- Reglas de negocio y validaciones

### Stack Propuesto

- **Framework**: Next.js API Routes o NestJS (decidir)
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis (opcional, futuro)
- **Queue**: Bull/BullMQ (para jobs asincrónicos)
- **Cron Jobs**: node-cron o servicios managed

### Componentes

```
/core (puede ser mismo repo o separado)
├── src/
│   ├── domain/
│   │   ├── PassengerRequest/
│   │   │   ├── PassengerRequest.entity.ts
│   │   │   ├── PassengerRequest.service.ts
│   │   │   └── PassengerRequest.state-machine.ts
│   │   ├── Assignment/
│   │   │   ├── Assignment.entity.ts
│   │   │   ├── Assignment.service.ts
│   │   │   └── Assignment.state-machine.ts
│   │   ├── Taxi/
│   │   ├── Driver/
│   │   └── FleetOperator/
│   ├── services/
│   │   ├── assignment-engine.service.ts  # Motor asignación
│   │   ├── notification.service.ts       # Notificaciones
│   │   └── audit-log.service.ts          # AuditLog
│   ├── api/
│   │   ├── passenger-requests.controller.ts
│   │   ├── assignments.controller.ts
│   │   └── operators.controller.ts
│   ├── jobs/
│   │   ├── expire-requests.job.ts        # Cron: expirar pendientes
│   │   └── auto-reject-assignments.job.ts
│   └── lib/
│       ├── prisma.ts
│       └── validators.ts
```

### Servicios Clave

#### 1. PassengerRequestService

```typescript
class PassengerRequestService {
  async create(data: CreatePassengerRequestDTO): Promise<PassengerRequest>
  async assign(requestId: string, taxiId: string, driverId: string): Promise<Assignment>
  async cancel(requestId: string, reason: string, by: string): Promise<void>
  async getByStatus(status: RequestStatus): Promise<PassengerRequest[]>
  async transition(requestId: string, newStatus: RequestStatus): Promise<void>
}
```

#### 2. AssignmentEngine (Motor de Asignación)

```typescript
class AssignmentEngine {
  // Manual: operador elige taxi
  async manualAssign(requestId: string, taxiId: string): Promise<Assignment>

  // Semi-automático: sistema sugiere taxis, operador confirma
  async suggestTaxis(requestId: string): Promise<Taxi[]>

  // Automático: sistema asigna solo (futuro)
  async autoAssign(requestId: string): Promise<Assignment>

  // Helpers
  async findAvailableTaxis(zone: string, type: TaxiType): Promise<Taxi[]>
  async calculateETA(taxiId: string, origin: Coordinates): Promise<number>
}
```

#### 3. AuditLogService

```typescript
class AuditLogService {
  async log(params: {
    entityType: EntityType;
    entityId: string;
    action: string;
    performedBy: string;
    metadata: object;
  }): Promise<void>

  async getHistory(entityType: EntityType, entityId: string): Promise<AuditLog[]>
}
```

### Límites de Responsabilidad

**QUÉ HACE**:
- ✅ Crear y gestionar PassengerRequest
- ✅ Asignar taxis a solicitudes
- ✅ Ejecutar state machine de viajes
- ✅ Validar reglas de negocio
- ✅ Registrar todo en AuditLog
- ✅ Ejecutar jobs cron (timeouts, expirations)
- ✅ Notificar cambios de estado

**QUÉ NO HACE**:
- ❌ Renderizar HTML/CSS (eso es Capa 1 y 3)
- ❌ Comunicarse directamente con apps móviles (usa integraciones)
- ❌ Procesar pagos directamente (integración futura)

### APIs Expuestas

```
POST   /api/core/passenger-requests          # Crear solicitud
GET    /api/core/passenger-requests/:id      # Ver solicitud
PATCH  /api/core/passenger-requests/:id      # Actualizar estado
DELETE /api/core/passenger-requests/:id      # Cancelar

POST   /api/core/assignments                 # Crear asignación
PATCH  /api/core/assignments/:id/accept      # Conductor acepta
PATCH  /api/core/assignments/:id/reject      # Conductor rechaza
PATCH  /api/core/assignments/:id/complete    # Marcar completado

GET    /api/core/taxis                       # Listar taxis
GET    /api/core/taxis/available             # Taxis disponibles
PATCH  /api/core/taxis/:id/status            # Cambiar estado

GET    /api/core/audit-logs                  # Historial auditoría
```

---

## CAPA 3: Backoffice / Panel Operador

### Responsabilidad

Interfaz web para operadores y administradores de ETAXI:
- Ver solicitudes en tiempo real
- Asignar taxis manualmente
- Gestionar estados de viajes
- Ver flota de taxis y conductores
- Estadísticas y reportes
- Administración de FleetOperators

### Stack Actual

- **Framework**: Next.js 15 (App Router)
- **Auth**: NextAuth v5 (credenciales)
- **UI**: Tailwind CSS
- **Comunicación**: Fetch API → Core

### Componentes

```
/app/admin
├── layout.tsx                  # Layout protegido
├── login/
├── page.tsx                    # Dashboard principal
├── ride-requests/              # Vista solicitudes
│   ├── page.tsx                # Lista + filtros
│   ├── [id]/                   # Detalle solicitud
│   └── assign/                 # Asignar taxi
├── assignments/                # Vista asignaciones
├── taxis/                      # Gestión de taxis
├── drivers/                    # Gestión conductores
├── fleet-operators/            # Gestión operadores
└── reports/                    # Reportes
```

### Extensiones Futuras

**Vista Tiempo Real**:
```typescript
// Usar WebSockets o Server-Sent Events
const { data: requests } = useSWR('/api/core/passenger-requests?status=PENDING', {
  refreshInterval: 5000 // Poll cada 5 segundos
});
```

**Tablero por Zona**:
```typescript
// Filtros avanzados
GET /api/core/passenger-requests
  ?city=Santiago
  &zone=Providencia
  &status=PENDING_ASSIGNMENT
  &fleetOperator=gremio-123
```

**Asignación Rápida**:
```typescript
// UI: Drag & drop de solicitud a taxi
async function handleAssign(requestId: string, taxiId: string) {
  await fetch('/api/core/assignments', {
    method: 'POST',
    body: JSON.stringify({
      passengerRequestId: requestId,
      taxiId,
      assignedBy: 'OPERATOR:' + session.user.id
    })
  });
}
```

### Límites de Responsabilidad

**QUÉ HACE**:
- ✅ UI para operaciones
- ✅ Visualización de datos en tiempo real
- ✅ Herramientas de asignación
- ✅ Reportes y exportación

**QUÉ NO HACE**:
- ❌ Lógica de negocio (eso es Core)
- ❌ Validaciones complejas (eso es Core)
- ❌ Comunicación directa con DB (usa APIs de Core)

---

## CAPA 4: Integraciones (Futuras)

### Responsabilidad

Conectar ETAXI con sistemas externos y apps móviles:
- App móvil pasajero
- App móvil conductor
- Integración con centrales existentes
- Integración con sistemas empresariales
- APIs públicas (para terceros)

### Componentes Futuros

#### 1. App Pasajero (React Native)

```typescript
// Funcionalidades mínimas
- Login / registro
- Pedir taxi (origen, destino)
- Ver estado del viaje en tiempo real
- Ver datos del conductor asignado
- Cancelar viaje (antes de subir)
- Historial de viajes
- Calificar servicio
```

**Comunicación**:
```
App Pasajero → API Core
  GET  /api/core/passenger-requests/:id
  POST /api/core/passenger-requests/:id/cancel
  GET  /api/core/assignments/:id/status
```

#### 2. App Conductor (React Native)

```typescript
// Funcionalidades mínimas
- Login / autenticación
- Ver servicios asignados
- Aceptar / Rechazar servicio
- Marcar estados (en ruta, iniciado, completado)
- Ver datos del pasajero
- Historial de servicios
- Estado operacional (disponible / ocupado / offline)
```

**Comunicación**:
```
App Conductor → API Core
  GET   /api/core/assignments?driverId=xxx&status=SENT_TO_DRIVER
  PATCH /api/core/assignments/:id/accept
  PATCH /api/core/assignments/:id/reject
  PATCH /api/core/assignments/:id/complete
  PATCH /api/core/drivers/:id/status
```

#### 3. Integración con Centrales Existentes

**Webhook Bidireccional**:

```typescript
// ETAXI → Central
POST https://central-abc.cl/api/new-request
{
  "passengerName": "Juan Pérez",
  "origin": "...",
  "destination": "..."
}

// Central → ETAXI
POST https://etaxi.cl/api/integrations/central-abc/assignment
{
  "requestId": "req-123",
  "taxiLicense": "ABCD-12",
  "driverName": "Pedro González",
  "status": "ASSIGNED"
}
```

#### 4. API Pública para Empresas

**Endpoints para integraciones B2B**:

```typescript
// Empresa crea solicitud programática
POST /api/v1/enterprise/rides
Authorization: Bearer {api_key}
{
  "employeeId": "emp-456",
  "costCenter": "ventas",
  "origin": "...",
  "destination": "..."
}

// Webhook de callback
POST https://empresa.com/webhook/ride-completed
{
  "rideId": "req-123",
  "status": "COMPLETED",
  "fare": 8500,
  "duration": 1800
}
```

---

## Flujo de Comunicación entre Capas

### Flujo 1: Pasajero pide taxi desde Web

```
1. [WEB] Usuario completa formulario /pedir-taxi
   ↓
2. [WEB] POST /api/ride-requests (endpoint Next.js)
   ↓
3. [CORE] POST /api/core/passenger-requests
   ↓ crea PassengerRequest con status PENDING_ASSIGNMENT
   ↓ registra AuditLog
   ↓
4. [CORE] Response 201 { requestId: "req-123" }
   ↓
5. [WEB] Muestra mensaje "Solicitud recibida"
```

### Flujo 2: Operador asigna taxi desde Backoffice

```
1. [BACKOFFICE] Operador ve lista de solicitudes pendientes
   ↓ GET /api/core/passenger-requests?status=PENDING
   ↓
2. [BACKOFFICE] Operador selecciona Taxi + Driver
   ↓
3. [BACKOFFICE] POST /api/core/assignments
   {
     passengerRequestId: "req-123",
     taxiId: "taxi-456",
     driverId: "driver-789",
     assignedBy: "OPERATOR:user-101"
   }
   ↓
4. [CORE] Crea Assignment
   ↓ Cambia PassengerRequest.status → ASSIGNED
   ↓ Cambia Taxi.status → BUSY
   ↓ Registra AuditLog
   ↓ (Futuro) Notifica a conductor via App
   ↓
5. [CORE] Response 201 { assignmentId: "asg-999" }
```

### Flujo 3: Conductor acepta servicio (futuro con app)

```
1. [APP CONDUCTOR] Recibe notificación push
   ↓
2. [APP CONDUCTOR] PATCH /api/core/assignments/:id/accept
   ↓
3. [CORE] Cambia Assignment.status → ACCEPTED_BY_DRIVER
   ↓ Cambia PassengerRequest.status → DRIVER_EN_ROUTE
   ↓ Registra AuditLog
   ↓ (Futuro) Notifica a pasajero via App/SMS
   ↓
4. [CORE] Response 200 { status: "DRIVER_EN_ROUTE" }
```

---

## Decisión: ¿Monorepo o Multi-repo?

### Opción A: Monorepo (Recomendado para MVP)

```
/etaxi-platform
├── apps/
│   ├── web/                 # Capa 1: Sitio público Next.js
│   ├── backoffice/          # Capa 3: Admin Next.js (o dentro de /web)
│   └── core/                # Capa 2: API Core (Next.js API o NestJS)
├── packages/
│   ├── database/            # Prisma schemas compartidos
│   ├── types/               # TypeScript types compartidos
│   └── utils/               # Utilidades compartidas
└── package.json
```

**Ventajas**:
- ✅ Fácil compartir código (types, validaciones)
- ✅ Deploy unificado (Vercel monorepo support)
- ✅ Desarrollo más rápido

**Desventajas**:
- ❌ Core y Web acoplados
- ❌ Difícil separar permisos de deploy

### Opción B: Multi-repo (Futuro)

```
/etaxi-web             # Repo 1: Sitio público
/etaxi-core            # Repo 2: API Core + DB
/etaxi-backoffice      # Repo 3: Admin panel
/etaxi-app-passenger   # Repo 4: App móvil pasajero
/etaxi-app-driver      # Repo 5: App móvil conductor
```

**Ventajas**:
- ✅ Separación clara de responsabilidades
- ✅ Deploy independiente
- ✅ Equipos pueden trabajar aislados

**Desventajas**:
- ❌ Más complejo compartir código
- ❌ Requiere packages npm privados
- ❌ CI/CD más complejo

### Recomendación

**FASE ACTUAL (MVP)**: Monorepo

**FUTURO (Escala)**: Migrar a Multi-repo cuando:
- Tengas equipos separados (frontend/backend)
- Core tenga suficiente complejidad
- Apps móviles estén en producción

---

## Tecnologías por Capa

| Capa | Framework | Database | Auth | Hosting |
|------|-----------|----------|------|---------|
| Web Pública | Next.js 15 | N/A (consume APIs) | N/A | Vercel |
| Core Operacional | Next.js API o NestJS | PostgreSQL + Prisma | API Keys | Vercel / Railway |
| Backoffice | Next.js 15 | N/A (consume Core) | NextAuth | Vercel |
| App Pasajero | React Native | N/A (consume Core) | JWT | App Store / Play Store |
| App Conductor | React Native | N/A (consume Core) | JWT | App Store / Play Store |

---

## Próximos Pasos

1. **Definir flujo MVP** (TAREA OPS-EAT-4)
2. **Priorizar siguiente bloque técnico** (TAREA OPS-EAT-5)
3. **Decidir**: ¿Implementar Core en mismo repo o separado?
4. **Crear schemas Prisma** para entidades del dominio
5. **Implementar endpoints Core** básicos

---

**Versión**: 1.0 - Arquitectura en Capas
**Fecha**: 2025-01-15
**Estado**: Diseño Conceptual (sin implementar)
