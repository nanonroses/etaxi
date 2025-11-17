# PLAN TÉCNICO MVP — PRIORIZACIÓN Y ROADMAP

## Versión: Technical Roadmap 1.0

Este documento define la **priorización de features**, **fases de implementación** y **roadmap técnico** para evolucionar ETAXI desde el estado actual hacia una plataforma operacional completa.

---

## Estado Actual (Completado)

### ✅ FASE 1-7: Sitio Web MVP
- Diseño y páginas públicas (Home, Pedir Taxi, Empresas, Conductores, Seguridad, etc.)
- Integración Sanity CMS
- SEO y performance optimizado
- Traducciones (next-intl)

### ✅ FASE 9: Backend Ligero + API Web
- Prisma schema básico (`RideRequest`, `CompanyLead`, `DriverLead`)
- API endpoints REST (`POST /api/ride-requests`, etc.)
- Formularios conectados
- Validación y spam protection

### ✅ FASE 10: Backoffice ETAXI
- NextAuth authentication
- Dashboard con estadísticas
- Vistas de solicitudes, empresas, conductores
- Exportación CSV
- Security hardening

### ✅ FASE 11: Diseño Conceptual EAT
- **Documentos creados**:
  - `MODELO_DOMINIO_OPERACIONAL.md` (6 entidades)
  - `STATE_MACHINE_VIAJE.md` (estados y transiciones)
  - `ARQUITECTURA_CAPAS.md` (4 capas)
  - `FLUJO_OPERATIVO_MVP.md` (asignación manual)
  - `PLAN_TECNICO_MVP.md` (este documento)

---

## Brecha Actual (Gap Analysis)

### Lo que TENEMOS:

| Componente | Estado | Funcionalidad |
|------------|--------|---------------|
| Sitio Web Público | ✅ Completo | Marketing, captura de leads |
| Formularios B2C | ✅ Completo | Solicitudes de taxi (básico) |
| Formularios B2B/B2D | ✅ Completo | Leads de empresas y conductores |
| Backoffice | ✅ Completo | Visualización de datos, CSV export |
| Base de datos | ✅ Completo | PostgreSQL + Prisma (3 modelos básicos) |
| Autenticación | ✅ Completo | NextAuth para admin |

### Lo que NOS FALTA para operar (EAT):

| Componente | Estado | Funcionalidad Requerida |
|------------|--------|------------------------|
| **Core Operacional** | ❌ No existe | State machine, Assignment engine, AuditLog |
| **Entidades Operacionales** | ❌ No existe | PassengerRequest (full), Taxi, Driver, FleetOperator, Assignment |
| **Interface de Asignación** | ❌ No existe | Backoffice para asignar taxi+conductor |
| **Tracking de Estados** | ❌ No existe | Transiciones automáticas de state machine |
| **Comunicación Conductor** | ⚠️ Manual | Radio/WhatsApp (sin integración digital) |
| **App Conductor** | ❌ No existe | Recibir/aceptar asignaciones |
| **App Pasajero** | ❌ No existe | Tracking en tiempo real |
| **Motor Automático** | ❌ No existe | Asignación automática de taxis |

---

## Decisión Estratégica: ¿Qué Construir Primero?

### Opciones Evaluadas:

#### Opción A: Mejorar Backoffice (Low Impact)
- ✅ **Pro**: Rápido, bajo riesgo
- ❌ **Contra**: No permite operar como EAT aún
- **Veredicto**: **NO prioritario** - ya tenemos backoffice funcional

#### Opción B: App Conductor (Medium Impact)
- ✅ **Pro**: Mejora UX conductor, elimina radio/WhatsApp
- ❌ **Contra**: Sin Core Operacional no sirve de mucho
- **Veredicto**: **Fase 2** - después del Core

#### Opción C: App Pasajero (Medium Impact)
- ✅ **Pro**: Mejora UX pasajero, diferenciación
- ❌ **Contra**: Sin Core y sin App Conductor, valor limitado
- **Veredicto**: **Fase 3** - después del Core y App Conductor

#### Opción D: Core Operacional (HIGH IMPACT) ⭐
- ✅ **Pro**: Base para todo el sistema EAT
- ✅ **Pro**: Permite operar manualmente (MVP híbrido)
- ✅ **Pro**: Trazabilidad y auditoría desde día 1
- ✅ **Pro**: Base sólida para apps futuras
- ❌ **Contra**: Mayor complejidad técnica
- **Veredicto**: **PRIORITARIO - Fase 1**

---

## FASE 1 (PRIORITARIA): CORE OPERACIONAL + ASIGNACIÓN MANUAL

### Objetivo

Implementar el **Core Operacional** que permita a ETAXI:
- Capturar solicitudes de taxi operacionales
- Asignar taxis y conductores manualmente desde Backoffice
- Trackear estados del viaje (state machine)
- Auditar todas las acciones
- Operar de forma híbrida (digital + radio/WhatsApp)

### Componentes a Implementar

#### 1. Extensión de Prisma Schema

**Archivo**: `prisma/schema.prisma`

**Entidades a agregar**:

```prisma
// ========================================
// CORE OPERACIONAL - EAT
// ========================================

// Solicitud operacional de pasajero (diferente de RideRequest básico)
model PassengerRequest {
  id                    String   @id @default(cuid())
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  // Datos del pasajero
  passengerName         String
  passengerPhone        String
  passengerEmail        String?

  // Direcciones
  originAddress         String
  originCoordinates     Json?    // {lat, lng}
  destinationAddress    String?
  destinationCoordinates Json?   // {lat, lng}

  // Programación
  scheduledFor          DateTime? // null = inmediato

  // Canal de origen
  channel               String   @default("WEB") // WEB, APP_PASSENGER, PHONE_CENTRAL, BACKOFFICE

  // Estado (State Machine)
  status                String   @default("CREATED")
  // CREATED, PENDING_ASSIGNMENT, ASSIGNED, DRIVER_EN_ROUTE,
  // PASSENGER_ONBOARD, COMPLETED, CANCELED_BY_PASSENGER,
  // CANCELED_BY_DRIVER, CANCELED_BY_OPERATOR, EXPIRED

  // Relaciones
  enterpriseId          String?
  enterprise            FleetOperator? @relation(fields: [enterpriseId], references: [id])

  assignment            Assignment?
  auditLogs             AuditLog[]

  // Metadata
  notes                 String?
  metadata              Json?    // Datos adicionales

  @@map("passenger_requests")
  @@index([status])
  @@index([createdAt])
  @@index([channel])
}

// Operador de flota (Gremio, Central, Empresa, Municipalidad)
model FleetOperator {
  id                String   @id @default(cuid())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  name              String
  type              String   // GUILD, CENTRAL, COMPANY, MUNICIPALITY
  city              String
  coverageZones     Json     // ["Providencia", "Las Condes"]

  operatingHours    Json?    // {startTime, endTime, days}
  isActive          Boolean  @default(true)

  contactEmail      String
  contactPhone      String

  metadata          Json?    // Tarifas, políticas, configuraciones

  // Relaciones
  taxis             Taxi[]
  drivers           Driver[]
  assignments       Assignment[]
  passengerRequests PassengerRequest[]

  @@map("fleet_operators")
  @@index([city])
  @@index([isActive])
}

// Taxi (Vehículo regulado)
model Taxi {
  id                String   @id @default(cuid())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  licensePlate      String   @unique
  type              String   @default("STANDARD")
  // STANDARD, EXECUTIVE, TOURISM, VAN, LUXURY, ACCESSIBLE

  city              String
  zone              String?

  operationalStatus String   @default("OFFLINE")
  // AVAILABLE, BUSY, OFFLINE, MAINTENANCE

  fleetOperatorId   String
  fleetOperator     FleetOperator @relation(fields: [fleetOperatorId], references: [id])

  metadata          Json?    // Año, modelo, color, capacidad, equipamiento

  // Relaciones
  assignments       Assignment[]

  @@map("taxis")
  @@index([licensePlate])
  @@index([operationalStatus])
  @@index([fleetOperatorId])
}

// Conductor
model Driver {
  id                   String   @id @default(cuid())
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  fullName             String
  phone                String
  email                String?

  professionalLicense  String
  licenseValidUntil    DateTime

  isEnabled            Boolean  @default(true)

  fleetOperatorId      String
  fleetOperator        FleetOperator @relation(fields: [fleetOperatorId], references: [id])

  metadata             Json?    // RUT, documentos, certificaciones

  // Relaciones
  assignments          Assignment[]

  @@map("drivers")
  @@index([isEnabled])
  @@index([fleetOperatorId])
}

// Asignación de viaje
model Assignment {
  id                   String   @id @default(cuid())
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  passengerRequestId   String   @unique
  passengerRequest     PassengerRequest @relation(fields: [passengerRequestId], references: [id])

  taxiId               String
  taxi                 Taxi     @relation(fields: [taxiId], references: [id])

  driverId             String
  driver               Driver   @relation(fields: [driverId], references: [id])

  fleetOperatorId      String
  fleetOperator        FleetOperator @relation(fields: [fleetOperatorId], references: [id])

  status               String   @default("CREATED")
  // CREATED, SENT_TO_DRIVER, ACCEPTED_BY_DRIVER,
  // REJECTED_BY_DRIVER, COMPLETED, CANCELED

  assignedBy           String   // SYSTEM, OPERATOR:{userId}, FLEET:{operatorId}

  timestamps           Json     // {createdAt, sentToDriverAt, acceptedAt, ...}

  cancellationReason   String?
  canceledBy           String?  // PASSENGER, DRIVER, OPERATOR, SYSTEM

  fare                 Json?    // {estimatedAmount, finalAmount, currency}
  metadata             Json?

  // Relaciones
  auditLogs            AuditLog[]

  @@map("assignments")
  @@index([status])
  @@index([passengerRequestId])
  @@index([taxiId])
  @@index([driverId])
}

// Registro de auditoría
model AuditLog {
  id                String   @id @default(cuid())
  createdAt         DateTime @default(now())

  entityType        String   // PASSENGER_REQUEST, ASSIGNMENT, TAXI, DRIVER, FLEET_OPERATOR
  entityId          String

  action            String   // created, status_changed, assigned, canceled, etc.
  performedBy       String   // SYSTEM, USER:{id}, PASSENGER:{id}, DRIVER:{id}

  metadata          Json?    // previousState, newState, ip, userAgent, etc.
  timestamp         DateTime @default(now())

  // Relaciones opcionales
  passengerRequestId String?
  passengerRequest   PassengerRequest? @relation(fields: [passengerRequestId], references: [id])

  assignmentId       String?
  assignment         Assignment? @relation(fields: [assignmentId], references: [id])

  @@map("audit_logs")
  @@index([entityType, entityId])
  @@index([timestamp])
  @@index([performedBy])
}
```

**Migración**:
```bash
npx prisma migrate dev --name add_operational_core
npx prisma generate
```

**Estimación**: 2-3 horas (schema + migration + seed data)

---

#### 2. Core Business Logic Layer

**Directorio**: `lib/core/`

**Archivos a crear**:

##### `lib/core/state-machine.ts`

```typescript
/**
 * State Machine para PassengerRequest
 */

export type PassengerRequestStatus =
  | 'CREATED'
  | 'PENDING_ASSIGNMENT'
  | 'ASSIGNED'
  | 'DRIVER_EN_ROUTE'
  | 'PASSENGER_ONBOARD'
  | 'COMPLETED'
  | 'CANCELED_BY_PASSENGER'
  | 'CANCELED_BY_DRIVER'
  | 'CANCELED_BY_OPERATOR'
  | 'EXPIRED';

export type AssignmentStatus =
  | 'CREATED'
  | 'SENT_TO_DRIVER'
  | 'ACCEPTED_BY_DRIVER'
  | 'REJECTED_BY_DRIVER'
  | 'COMPLETED'
  | 'CANCELED';

const PASSENGER_REQUEST_TRANSITIONS: Record<
  PassengerRequestStatus,
  PassengerRequestStatus[]
> = {
  CREATED: ['PENDING_ASSIGNMENT'],
  PENDING_ASSIGNMENT: ['ASSIGNED', 'CANCELED_BY_PASSENGER', 'CANCELED_BY_OPERATOR', 'EXPIRED'],
  ASSIGNED: ['DRIVER_EN_ROUTE', 'CANCELED_BY_PASSENGER', 'CANCELED_BY_OPERATOR', 'EXPIRED'],
  DRIVER_EN_ROUTE: ['PASSENGER_ONBOARD', 'CANCELED_BY_DRIVER', 'CANCELED_BY_PASSENGER'],
  PASSENGER_ONBOARD: ['COMPLETED'], // No se puede cancelar
  COMPLETED: [],
  CANCELED_BY_PASSENGER: [],
  CANCELED_BY_DRIVER: [],
  CANCELED_BY_OPERATOR: [],
  EXPIRED: [],
};

export function canTransition(
  from: PassengerRequestStatus,
  to: PassengerRequestStatus
): boolean {
  return PASSENGER_REQUEST_TRANSITIONS[from]?.includes(to) ?? false;
}

export function validateTransition(
  from: PassengerRequestStatus,
  to: PassengerRequestStatus
): void {
  if (!canTransition(from, to)) {
    throw new Error(
      `Invalid transition: ${from} -> ${to}. Allowed transitions: ${PASSENGER_REQUEST_TRANSITIONS[from]?.join(', ') || 'none'}`
    );
  }
}
```

**Estimación**: 3-4 horas

---

##### `lib/core/assignment-service.ts`

```typescript
import { prisma } from '@/lib/prisma';
import { validateTransition } from './state-machine';

export interface CreateAssignmentInput {
  passengerRequestId: string;
  taxiId: string;
  driverId: string;
  assignedBy: string; // "OPERATOR:{userId}"
}

export async function createAssignment(input: CreateAssignmentInput) {
  const { passengerRequestId, taxiId, driverId, assignedBy } = input;

  return await prisma.$transaction(async (tx) => {
    // 1. Verificar PassengerRequest
    const request = await tx.passengerRequest.findUnique({
      where: { id: passengerRequestId },
    });

    if (!request) {
      throw new Error('PassengerRequest not found');
    }

    if (request.status !== 'PENDING_ASSIGNMENT') {
      throw new Error(`Cannot assign request with status: ${request.status}`);
    }

    // 2. Verificar Taxi
    const taxi = await tx.taxi.findUnique({
      where: { id: taxiId },
      include: { fleetOperator: true },
    });

    if (!taxi) {
      throw new Error('Taxi not found');
    }

    if (taxi.operationalStatus !== 'AVAILABLE') {
      throw new Error(`Taxi ${taxi.licensePlate} is not available (status: ${taxi.operationalStatus})`);
    }

    if (!taxi.fleetOperator.isActive) {
      throw new Error(`Fleet operator ${taxi.fleetOperator.name} is not active`);
    }

    // 3. Verificar Driver
    const driver = await tx.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new Error('Driver not found');
    }

    if (!driver.isEnabled) {
      throw new Error(`Driver ${driver.fullName} is not enabled`);
    }

    if (new Date(driver.licenseValidUntil) < new Date()) {
      throw new Error(`Driver ${driver.fullName} license has expired`);
    }

    // 4. Crear Assignment
    const assignment = await tx.assignment.create({
      data: {
        passengerRequestId,
        taxiId,
        driverId,
        fleetOperatorId: taxi.fleetOperatorId,
        status: 'CREATED',
        assignedBy,
        timestamps: {
          createdAt: new Date().toISOString(),
        },
      },
    });

    // 5. Actualizar Taxi → BUSY
    await tx.taxi.update({
      where: { id: taxiId },
      data: { operationalStatus: 'BUSY' },
    });

    // 6. Actualizar PassengerRequest → ASSIGNED
    await tx.passengerRequest.update({
      where: { id: passengerRequestId },
      data: { status: 'ASSIGNED' },
    });

    // 7. AuditLog
    await tx.auditLog.create({
      data: {
        entityType: 'ASSIGNMENT',
        entityId: assignment.id,
        action: 'created',
        performedBy: assignedBy,
        metadata: {
          passengerRequestId,
          taxiId,
          taxiPlate: taxi.licensePlate,
          driverId,
          driverName: driver.fullName,
          fleetOperatorId: taxi.fleetOperatorId,
        },
        timestamp: new Date(),
        assignmentId: assignment.id,
      },
    });

    await tx.auditLog.create({
      data: {
        entityType: 'PASSENGER_REQUEST',
        entityId: passengerRequestId,
        action: 'status_changed',
        performedBy: 'SYSTEM',
        metadata: {
          previousState: 'PENDING_ASSIGNMENT',
          newState: 'ASSIGNED',
          assignmentId: assignment.id,
        },
        timestamp: new Date(),
        passengerRequestId,
      },
    });

    return assignment;
  });
}

export async function updateAssignmentStatus(
  assignmentId: string,
  newStatus: string,
  performedBy: string,
  metadata?: any
) {
  return await prisma.$transaction(async (tx) => {
    const assignment = await tx.assignment.findUnique({
      where: { id: assignmentId },
      include: { passengerRequest: true },
    });

    if (!assignment) {
      throw new Error('Assignment not found');
    }

    // Actualizar timestamps
    const updatedTimestamps = {
      ...assignment.timestamps,
    };

    if (newStatus === 'SENT_TO_DRIVER') {
      updatedTimestamps.sentToDriverAt = new Date().toISOString();
    } else if (newStatus === 'ACCEPTED_BY_DRIVER') {
      updatedTimestamps.acceptedAt = new Date().toISOString();
    } else if (newStatus === 'REJECTED_BY_DRIVER') {
      updatedTimestamps.rejectedAt = new Date().toISOString();
    } else if (newStatus === 'COMPLETED') {
      updatedTimestamps.completedAt = new Date().toISOString();
    }

    // Actualizar Assignment
    const updated = await tx.assignment.update({
      where: { id: assignmentId },
      data: {
        status: newStatus,
        timestamps: updatedTimestamps,
        ...metadata,
      },
    });

    // Actualizar PassengerRequest si corresponde
    let newRequestStatus: string | null = null;

    if (newStatus === 'ACCEPTED_BY_DRIVER') {
      newRequestStatus = 'DRIVER_EN_ROUTE';
    } else if (newStatus === 'COMPLETED') {
      newRequestStatus = 'COMPLETED';
    } else if (newStatus === 'REJECTED_BY_DRIVER' || newStatus === 'CANCELED') {
      // Volver a pending si fue rechazado
      newRequestStatus = 'PENDING_ASSIGNMENT';
    }

    if (newRequestStatus) {
      validateTransition(assignment.passengerRequest.status as any, newRequestStatus as any);

      await tx.passengerRequest.update({
        where: { id: assignment.passengerRequestId },
        data: { status: newRequestStatus },
      });
    }

    // Liberar taxi si se completa o cancela
    if (newStatus === 'COMPLETED' || newStatus === 'CANCELED' || newStatus === 'REJECTED_BY_DRIVER') {
      await tx.taxi.update({
        where: { id: assignment.taxiId },
        data: { operationalStatus: 'AVAILABLE' },
      });
    }

    // AuditLog
    await tx.auditLog.create({
      data: {
        entityType: 'ASSIGNMENT',
        entityId: assignmentId,
        action: `status_changed_to_${newStatus.toLowerCase()}`,
        performedBy,
        metadata: {
          previousStatus: assignment.status,
          newStatus,
          ...metadata,
        },
        timestamp: new Date(),
        assignmentId,
      },
    });

    return updated;
  });
}
```

**Estimación**: 6-8 horas

---

#### 3. Backoffice — Assignment Interface

**Páginas a crear**:

##### `app/admin/assignments/page.tsx`

Vista principal para ver y crear asignaciones:

- Lista de `PassengerRequest` con status `PENDING_ASSIGNMENT`
- Botón "Asignar" que abre modal
- Modal con:
  - Select de FleetOperator
  - Select de Taxi (filtrado por operador, solo AVAILABLE)
  - Select de Driver (filtrado por operador, solo isEnabled=true)
  - Botón "Crear Asignación"

**Estimación**: 8-10 horas

##### `app/admin/assignments/[id]/page.tsx`

Detalle de una asignación específica:

- Información completa (pasajero, taxi, conductor, gremio)
- Timeline de estados (usando AuditLog)
- Botones de acción:
  - "Marcar como enviado al conductor"
  - "Conductor aceptó"
  - "Conductor rechazó"
  - "Pasajero a bordo"
  - "Completar viaje"
  - "Cancelar"

**Estimación**: 6-8 horas

##### `app/admin/fleet-operators/page.tsx`

CRUD de FleetOperators:

- Crear nuevo gremio/central
- Editar datos
- Ver taxis y conductores asociados
- Activar/Desactivar

**Estimación**: 6-8 horas

##### `app/admin/taxis/page.tsx`

CRUD de Taxis:

- Crear nuevo taxi
- Editar datos
- Cambiar estado operacional (AVAILABLE, BUSY, OFFLINE, MAINTENANCE)
- Ver historial de viajes

**Estimación**: 6-8 horas

##### `app/admin/drivers/page.tsx`

CRUD de Drivers:

- Crear nuevo conductor
- Editar datos
- Verificar licencia
- Habilitar/Deshabilitar
- Ver historial de viajes

**Estimación**: 6-8 horas

---

#### 4. APIs para Backoffice

**Endpoints a crear**:

```
POST   /api/admin/assignments          - Crear asignación
PATCH  /api/admin/assignments/[id]     - Actualizar estado
GET    /api/admin/assignments          - Listar asignaciones

POST   /api/admin/fleet-operators      - Crear operador
GET    /api/admin/fleet-operators      - Listar operadores
PATCH  /api/admin/fleet-operators/[id] - Actualizar operador

POST   /api/admin/taxis                - Crear taxi
GET    /api/admin/taxis                - Listar taxis (filtros: operador, status)
PATCH  /api/admin/taxis/[id]           - Actualizar taxi

POST   /api/admin/drivers              - Crear conductor
GET    /api/admin/drivers              - Listar conductores (filtros: operador, enabled)
PATCH  /api/admin/drivers/[id]         - Actualizar conductor

GET    /api/admin/audit-logs           - Listar logs (filtros: entityType, entityId)
```

**Estimación**: 12-16 horas

---

#### 5. Cron Jobs (Timeouts)

**Archivo**: `app/api/cron/check-timeouts/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  // Verificar Authorization header (Vercel Cron Secret)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Buscar assignments en SENT_TO_DRIVER sin respuesta por más de 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const expiredAssignments = await prisma.assignment.findMany({
      where: {
        status: 'SENT_TO_DRIVER',
        // timestamps.sentToDriverAt < fiveMinutesAgo
      },
    });

    const results = [];

    for (const assignment of expiredAssignments) {
      const timestamps = assignment.timestamps as any;
      const sentAt = new Date(timestamps.sentToDriverAt);

      if (sentAt < fiveMinutesAgo) {
        // Timeout: cancelar y volver a pending
        await prisma.$transaction(async (tx) => {
          await tx.assignment.update({
            where: { id: assignment.id },
            data: {
              status: 'CANCELED',
              cancellationReason: 'Timeout: conductor no respondió en 5 minutos',
              canceledBy: 'SYSTEM',
            },
          });

          await tx.passengerRequest.update({
            where: { id: assignment.passengerRequestId },
            data: { status: 'PENDING_ASSIGNMENT' },
          });

          await tx.taxi.update({
            where: { id: assignment.taxiId },
            data: { operationalStatus: 'AVAILABLE' },
          });

          await tx.auditLog.create({
            data: {
              entityType: 'ASSIGNMENT',
              entityId: assignment.id,
              action: 'timeout_canceled',
              performedBy: 'SYSTEM',
              metadata: { reason: 'No response in 5 minutes' },
              timestamp: new Date(),
            },
          });
        });

        results.push({ id: assignment.id, action: 'canceled' });
      }
    }

    return NextResponse.json({
      ok: true,
      checked: expiredAssignments.length,
      canceled: results.length,
      results,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

**Configurar en Vercel**:
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/check-timeouts",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Estimación**: 3-4 horas

---

### Resumen FASE 1

| Componente | Estimación | Complejidad |
|------------|------------|-------------|
| Prisma Schema + Migration | 2-3h | Media |
| State Machine Logic | 3-4h | Media |
| Assignment Service | 6-8h | Alta |
| Backoffice - Assignments | 8-10h | Alta |
| Backoffice - Assignment Detail | 6-8h | Media |
| Backoffice - Fleet Operators | 6-8h | Media |
| Backoffice - Taxis | 6-8h | Media |
| Backoffice - Drivers | 6-8h | Media |
| APIs Admin | 12-16h | Alta |
| Cron Jobs (Timeouts) | 3-4h | Baja |
| **TOTAL FASE 1** | **~60-80 horas** | **~2-3 semanas** |

---

## FASE 2: APP CONDUCTOR BÁSICA

### Objetivo

Eliminar la comunicación híbrida (radio/WhatsApp) y permitir que conductores:
- Reciban asignaciones digitalmente (notificación push)
- Acepten o rechacen viajes con un botón
- Actualicen estados (en camino, a bordo, completado)

### Tecnología Recomendada

- **React Native** (Expo) - Cross-platform (iOS + Android)
- **NextAuth** - Reutilizar autenticación existente
- **Expo Notifications** - Push notifications
- **React Query** - Estado y sync con API

### Componentes a Implementar

#### 1. API para App Conductor

```
POST   /api/conductor/auth/login          - Login con teléfono + PIN
GET    /api/conductor/me                  - Perfil del conductor
GET    /api/conductor/assignments         - Asignaciones actuales
PATCH  /api/conductor/assignments/[id]    - Aceptar/rechazar/actualizar
```

**Estimación**: 8-10 horas

#### 2. App Móvil Conductor

**Pantallas**:
- Login (teléfono + PIN)
- Home (estado: disponible/ocupado)
- Notificación de nueva asignación (modal)
- Detalle del viaje (pasajero, origen, destino)
- Botones de acción (aceptar, rechazar, en camino, a bordo, completar)

**Estimación**: 40-50 horas

#### 3. Sistema de Notificaciones Push

- Configurar Expo Push Notifications
- Enviar notificación cuando se crea Assignment
- Guardar deviceToken en DB

**Estimación**: 6-8 horas

### Resumen FASE 2

| Componente | Estimación | Complejidad |
|------------|------------|-------------|
| API Conductor | 8-10h | Media |
| App React Native | 40-50h | Alta |
| Push Notifications | 6-8h | Media |
| Testing + Deploy | 10-12h | Media |
| **TOTAL FASE 2** | **~65-80 horas** | **~3-4 semanas** |

---

## FASE 3: APP PASAJERO BÁSICA

### Objetivo

Dar al pasajero capacidad de:
- Pedir taxi desde app (no solo web)
- Ver estado de su solicitud
- Tracking en tiempo real del taxi (GPS)
- Comunicarse con conductor (chat/llamada)

### Tecnología Recomendada

- **React Native** (Expo) - Reutilizar código de app conductor
- **Mapbox/Google Maps** - Tracking GPS
- **Socket.io** o **Pusher** - Updates en tiempo real

### Componentes a Implementar

#### 1. API para App Pasajero

```
POST   /api/passenger/auth/register       - Registro con email/teléfono
POST   /api/passenger/requests            - Crear solicitud de taxi
GET    /api/passenger/requests/[id]       - Ver estado de solicitud
GET    /api/passenger/requests/[id]/track - GPS del taxi asignado
```

**Estimación**: 10-12 horas

#### 2. App Móvil Pasajero

**Pantallas**:
- Registro/Login
- Home (mapa + origen/destino)
- Confirmar solicitud
- Tracking del taxi (mapa con pin)
- Detalle del viaje (conductor, taxi, ETA)
- Historial de viajes

**Estimación**: 50-60 horas

#### 3. GPS Tracking Real-Time

- Conductor envía ubicación cada 10 segundos
- API almacena última posición
- Pasajero recibe updates via WebSocket

**Estimación**: 12-16 horas

### Resumen FASE 3

| Componente | Estimación | Complejidad |
|------------|------------|-------------|
| API Pasajero | 10-12h | Media |
| App React Native | 50-60h | Alta |
| GPS Tracking | 12-16h | Alta |
| Testing + Deploy | 12-15h | Media |
| **TOTAL FASE 3** | **~85-100 horas** | **~4-5 semanas** |

---

## FASE 4: AUTOMATIZACIÓN (Motor de Asignación)

### Objetivo

Reemplazar asignación manual por motor automático que:
- Selecciona el mejor taxi disponible
- Considera distancia, zona, tipo de vehículo
- Asigna automáticamente cuando hay match
- Operador solo supervisa

### Componentes a Implementar

#### 1. Motor de Asignación Automática

**Algoritmo**:
1. Recibir `PassengerRequest` con status `PENDING_ASSIGNMENT`
2. Buscar taxis con:
   - `operationalStatus = AVAILABLE`
   - `zone` compatible con origen
   - `fleetOperator.isActive = true`
3. Calcular distancia de cada taxi al origen
4. Seleccionar el más cercano
5. Crear `Assignment` automáticamente

**Estimación**: 16-20 horas

#### 2. Background Jobs

- Queue system (BullMQ, Inngest)
- Procesar asignaciones en background
- Retry logic si falla

**Estimación**: 8-10 horas

#### 3. Dashboard de Monitoreo

- Vista en tiempo real de asignaciones automáticas
- Métricas: tiempo promedio de asignación, tasa de éxito
- Capacidad de intervención manual

**Estimación**: 10-12 horas

### Resumen FASE 4

| Componente | Estimación | Complejidad |
|------------|------------|-------------|
| Motor de Asignación | 16-20h | Alta |
| Background Jobs | 8-10h | Media |
| Dashboard Monitoreo | 10-12h | Media |
| Testing + Tuning | 12-15h | Alta |
| **TOTAL FASE 4** | **~45-60 horas** | **~2-3 semanas** |

---

## Roadmap Visual

```
┌─────────────────────────────────────────────────────────────────┐
│  ESTADO ACTUAL (Completado)                                     │
│  - Sitio web MVP                                                │
│  - Backend ligero (RideRequest, CompanyLead, DriverLead)        │
│  - Backoffice básico (visualización + CSV)                      │
│  - Diseño conceptual EAT (documentos)                           │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  FASE 1 — CORE OPERACIONAL + ASIGNACIÓN MANUAL                  │
│  Duración: 2-3 semanas                                          │
│  Esfuerzo: 60-80 horas                                          │
│                                                                 │
│  ✅ Prisma Schema completo (6 entidades)                        │
│  ✅ State Machine implementada                                  │
│  ✅ Assignment Service (create, update)                         │
│  ✅ Backoffice - Interface de asignación                        │
│  ✅ CRUD Fleet Operators, Taxis, Drivers                        │
│  ✅ APIs Admin completas                                        │
│  ✅ Cron jobs para timeouts                                     │
│                                                                 │
│  🎯 Resultado: ETAXI puede operar manualmente (MVP híbrido)    │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  FASE 2 — APP CONDUCTOR BÁSICA                                  │
│  Duración: 3-4 semanas                                          │
│  Esfuerzo: 65-80 horas                                          │
│                                                                 │
│  ✅ API Conductor (auth, assignments)                           │
│  ✅ App React Native (login, asignaciones)                      │
│  ✅ Push notifications                                          │
│  ✅ Aceptar/rechazar/actualizar estados digitalmente            │
│                                                                 │
│  🎯 Resultado: Eliminar radio/WhatsApp, comunicación digital   │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  FASE 3 — APP PASAJERO BÁSICA                                   │
│  Duración: 4-5 semanas                                          │
│  Esfuerzo: 85-100 horas                                         │
│                                                                 │
│  ✅ API Pasajero (auth, requests, tracking)                     │
│  ✅ App React Native (pedir taxi, mapa)                         │
│  ✅ GPS tracking en tiempo real                                 │
│  ✅ Chat/llamada con conductor                                  │
│                                                                 │
│  🎯 Resultado: Experiencia digital completa para pasajero      │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  FASE 4 — AUTOMATIZACIÓN (Motor de Asignación)                  │
│  Duración: 2-3 semanas                                          │
│  Esfuerzo: 45-60 horas                                          │
│                                                                 │
│  ✅ Motor de asignación automática                              │
│  ✅ Background jobs (BullMQ)                                    │
│  ✅ Dashboard de monitoreo                                      │
│  ✅ Métricas y analytics                                        │
│                                                                 │
│  🎯 Resultado: Plataforma completamente automatizada           │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  FASE 5+ — OPTIMIZACIÓN Y ESCALABILIDAD                         │
│  - Integraciones con empresas (API B2B)                         │
│  - Analytics avanzados                                          │
│  - Múltiples ciudades/países                                    │
│  - Pagos digitales                                              │
│  - Calificaciones y reviews                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Timeline Estimado

| Fase | Duración | Inicio | Fin |
|------|----------|--------|-----|
| FASE 1 - Core Operacional | 2-3 semanas | Semana 1 | Semana 3 |
| FASE 2 - App Conductor | 3-4 semanas | Semana 4 | Semana 7 |
| FASE 3 - App Pasajero | 4-5 semanas | Semana 8 | Semana 12 |
| FASE 4 - Automatización | 2-3 semanas | Semana 13 | Semana 15 |
| **TOTAL** | **~15 semanas** | **~4 meses** | |

**Notas**:
- Asume 1 developer full-time
- No incluye testing exhaustivo ni diseño UI/UX profesional
- Tiempos reales pueden variar según complejidad y cambios de scope

---

## Qué NO Construir (Aún)

### ❌ Features Postponed (Fase 5+)

1. **Pagos digitales integrados**: MVP usa pago en efectivo/tarjeta física
2. **Calificaciones y reviews**: Agregar después de tener volumen de viajes
3. **Chat integrado en app**: Usar llamada telefónica directa primero
4. **Múltiples idiomas en apps**: Empezar solo con español
5. **Analytics avanzados**: Dashboards básicos primero
6. **API pública para terceros**: Solo APIs internas por ahora
7. **Marketplace de gremios**: Integración directa con operadores seleccionados
8. **Viajes compartidos (carpooling)**: Complejidad alta, postergar
9. **Programación avanzada de viajes**: Solo "ahora" o fecha/hora simple
10. **Optimización de rutas con IA**: Usar Google Maps Directions estándar

---

## Decisión Recomendada

### 🎯 PRIORIDAD INMEDIATA: **FASE 1 — CORE OPERACIONAL**

**Razones**:

1. **Fundacional**: Sin Core Operacional, no hay plataforma EAT
2. **Bajo riesgo**: Toda la lógica en servidor, sin dependencias móviles
3. **Validación rápida**: Permite operar manualmente y validar modelo
4. **Base sólida**: Apps futuras se conectan a Core ya probado
5. **Trazabilidad**: AuditLog desde día 1 cumple con regulación

**Entregables**:
- ✅ Base de datos con 6 entidades operacionales
- ✅ Backoffice con interface de asignación manual
- ✅ State machine funcionando
- ✅ CRUD de FleetOperators, Taxis, Drivers
- ✅ AuditLog completo
- ✅ Cron jobs para timeouts

**Después de FASE 1**, evaluar:
- ¿Hay suficiente volumen de solicitudes para justificar app conductor?
- ¿Los gremios están listos para adoptar tecnología digital?
- ¿Necesitamos mejorar UX de pasajero primero?

---

## Stack Tecnológico Recomendado

### Backend (Core + APIs)

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Framework** | Next.js 15 | Ya en uso, Server Components, Route Handlers |
| **ORM** | Prisma | Ya en uso, type-safe, migrations |
| **Database** | PostgreSQL | Relacional, transacciones, escalable |
| **Auth** | NextAuth v5 | Ya en uso, flexible |
| **Validation** | Zod | Type-safe schemas |
| **Queue** | BullMQ (futuro) | Background jobs para FASE 4 |

### Frontend (Backoffice)

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **UI Framework** | React 19 | Next.js built-in |
| **Styling** | Tailwind CSS | Ya en uso, rápido |
| **Icons** | Lucide React | Ya en uso |
| **Forms** | React Hook Form + Zod | Validación client + server |
| **Tables** | TanStack Table | Sorting, filtering, pagination |
| **Date** | date-fns | Ya en uso, lightweight |

### Mobile (Apps FASE 2 y 3)

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Framework** | React Native (Expo) | Cross-platform, fast development |
| **State** | React Query | Sync con API, cache |
| **Maps** | Mapbox | Mejor UX que Google Maps |
| **Push** | Expo Notifications | Built-in, fácil setup |
| **Nav** | Expo Router | File-based routing |

---

## Riesgos y Mitigaciones

### Riesgo 1: Complejidad del State Machine

**Impacto**: Alto
**Probabilidad**: Media

**Mitigación**:
- Tests unitarios exhaustivos para cada transición
- Validación en cada cambio de estado
- AuditLog para debuggear problemas

---

### Riesgo 2: Adopción de Gremios

**Impacto**: Alto
**Probabilidad**: Media

**Mitigación**:
- Empezar con 1-2 gremios piloto
- Capacitación presencial
- Soporte telefónico 24/7
- Mantener opción manual en Backoffice siempre

---

### Riesgo 3: Escalabilidad de Asignación Manual

**Impacto**: Alto
**Probabilidad**: Alta (si hay crecimiento rápido)

**Mitigación**:
- Tener FASE 4 (automatización) lista antes de escalar
- Contratar operadores adicionales temporalmente
- Priorizar asignaciones por antigüedad

---

### Riesgo 4: Timeouts en Comunicación Híbrida

**Impacto**: Medio
**Probabilidad**: Alta

**Mitigación**:
- Timeout corto (5 min) con reasignación automática
- Notificar operador cuando hay timeout
- Estadísticas de gremios para identificar problemas

---

## Métricas de Éxito

### FASE 1 (Core Operacional)

- ✅ 100% de solicitudes tienen trazabilidad (AuditLog)
- ✅ Tiempo promedio de asignación < 3 minutos
- ✅ Tasa de completación > 80%
- ✅ 0 errores críticos en state machine

### FASE 2 (App Conductor)

- ✅ > 70% conductores usan app (vs radio)
- ✅ Tiempo de aceptación < 1 minuto
- ✅ Tasa de aceptación > 85%

### FASE 3 (App Pasajero)

- ✅ > 50% solicitudes vía app (vs web)
- ✅ Tracking GPS funcional en 100% de viajes
- ✅ Satisfacción pasajero > 4.5/5

### FASE 4 (Automatización)

- ✅ > 90% asignaciones automáticas
- ✅ Tiempo de asignación < 30 segundos
- ✅ Intervención manual < 10%

---

## Conclusión

### Recomendación Final: **COMENZAR CON FASE 1**

**Por qué**:
1. Base fundacional para todo el sistema
2. Menor riesgo técnico
3. Permite validar operación real rápidamente
4. No depende de adopción de apps móviles
5. Cumple con trazabilidad y auditoría requerida

**Próximo paso**:
- Aprobar este plan técnico
- Estimar presupuesto para FASE 1
- Definir equipo (1 developer full-time o freelance)
- Establecer timeline (2-3 semanas)
- Comenzar con migración de Prisma schema

---

**Versión**: 1.0 - Technical Roadmap
**Fecha**: 2025-01-15
**Estado**: Propuesta para Aprobación
**Autor**: Análisis técnico basado en FASE 11 conceptual
