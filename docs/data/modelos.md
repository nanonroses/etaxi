# DOCUMENTACIÓN DE MODELOS DE DATOS — ETAXI

**Fecha**: 2025-11-16
**Base de datos**: PostgreSQL
**ORM**: Prisma

---

## ÍNDICE

1. [Modelos de Leads (Marketing/Ventas)](#1-modelos-de-leads)
2. [Modelos de Sistema (Auth/Admin)](#2-modelos-de-sistema)
3. [Modelos Core Operacional](#3-modelos-core-operacional)
4. [Modelos de Auditoría](#4-modelos-de-auditoría)
5. [Diagrama de Relaciones](#5-diagrama-de-relaciones)

---

## 1. MODELOS DE LEADS

### 1.1 RideRequest

**Propósito**: Almacenar solicitudes de taxi desde el sitio web público (B2C).

**Tabla**: `ride_requests`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `name` | String | ✅ | - | Nombre del solicitante |
| `phone` | String | ✅ | - | Teléfono del solicitante |
| `email` | String | ❌ | null | Email del solicitante |
| `pickupAddress` | String | ✅ | - | Dirección de origen |
| `dropoffAddress` | String | ❌ | null | Dirección de destino |
| `when` | String | ✅ | - | Cuándo necesita el taxi (texto libre) |
| `notes` | String | ❌ | null | Notas adicionales |
| `source` | String | ✅ | "web" | Origen de la solicitud |
| `status` | String | ✅ | "pending" | Estado de la solicitud |

**Estados posibles**:
- `pending`: Solicitud recibida, no procesada
- `contacted`: Operador contactó al cliente
- `completed`: Solicitud atendida
- `cancelled`: Solicitud cancelada

**Relaciones**: Ninguna (modelo independiente)

**Índices**:
- Por defecto solo primary key (id)

**Notas funcionales**:
- Este modelo es para solicitudes web iniciales
- No tiene relación directa con `PassengerRequest` (operacional)
- En el futuro debería haber proceso de conversión `RideRequest` → `PassengerRequest`

---

### 1.2 CompanyLead

**Propósito**: Almacenar leads de empresas/gremios interesados en el servicio (B2B).

**Tabla**: `company_leads`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `companyName` | String | ✅ | - | Nombre de la empresa |
| `contactName` | String | ✅ | - | Nombre del contacto |
| `email` | String | ✅ | - | Email de contacto |
| `phone` | String | ❌ | null | Teléfono |
| `employees` | Int | ❌ | null | Número de empleados |
| `city` | String | ❌ | null | Ciudad |
| `message` | String | ❌ | null | Mensaje adicional |
| `source` | String | ✅ | "empresas-gremios-web" | Origen |
| `status` | String | ✅ | "new" | Estado del lead |

**Estados posibles**:
- `new`: Lead nuevo
- `contacted`: Contactado
- `qualified`: Calificado como oportunidad
- `converted`: Convertido en cliente

**Relaciones**: Ninguna (modelo independiente)

**Notas funcionales**:
- Para funnel de ventas B2B
- Puede integrarse con CRM en el futuro

---

### 1.3 DriverLead

**Propósito**: Almacenar leads de conductores interesados en registrarse (B2D).

**Tabla**: `driver_leads`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `fullName` | String | ✅ | - | Nombre completo |
| `email` | String | ❌ | null | Email |
| `phone` | String | ✅ | - | Teléfono |
| `city` | String | ❌ | null | Ciudad |
| `hasTaxi` | Boolean | ✅ | false | ¿Tiene taxi propio? |
| `notes` | String | ❌ | null | Notas |
| `source` | String | ✅ | "conductores-web" | Origen |
| `status` | String | ✅ | "new" | Estado del lead |

**Estados posibles**:
- `new`: Lead nuevo
- `contacted`: Contactado
- `qualified`: Cumple requisitos
- `registered`: Registrado como conductor

**Relaciones**: Ninguna (modelo independiente)

**Notas funcionales**:
- Sirve como embudo para onboarding de conductores
- Cuando se registra, se crea un `Driver` operacional

---

## 2. MODELOS DE SISTEMA

### 2.1 User

**Propósito**: Usuarios del backoffice/admin (autenticación NextAuth).

**Tabla**: `users`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `email` | String | ✅ | - | Email (único) |
| `password` | String | ✅ | - | Password hasheado (bcrypt) |
| `name` | String | ❌ | null | Nombre del usuario |
| `role` | String | ✅ | "admin" | Rol del usuario |

**Roles posibles**:
- `admin`: Administrador completo
- `operator`: Operador (asignar taxis)
- `viewer`: Solo lectura

**Relaciones**: Ninguna

**Índices**:
- `email` → UNIQUE

**Seguridad**:
- ⚠️ **NUNCA devolver `password` en APIs**
- Password debe estar hasheado con bcrypt (10+ rounds)

**Notas funcionales**:
- Usado por NextAuth para autenticación de backoffice
- Separado de `Driver` (que usa JWT)

---

## 3. MODELOS CORE OPERACIONAL

### 3.1 FleetOperator

**Propósito**: Operador de flota (gremio, central, empresa, municipalidad).

**Tabla**: `fleet_operators`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `updatedAt` | DateTime | ✅ | auto | Última actualización |
| `name` | String | ✅ | - | Nombre del operador |
| `type` | String | ✅ | - | Tipo de operador |
| `city` | String | ✅ | - | Ciudad de operación |
| `isActive` | Boolean | ✅ | true | ¿Está activo? |
| `contactEmail` | String | ❌ | null | Email de contacto |
| `contactPhone` | String | ❌ | null | Teléfono de contacto |

**Tipos posibles**:
- `GUILD`: Gremio de taxistas
- `CENTRAL`: Central de radio
- `COMPANY`: Empresa de taxis
- `MUNICIPALITY`: Municipalidad

**Relaciones**:
- `taxis` → Taxi[] (one-to-many)
- `drivers` → Driver[] (one-to-many)
- `assignments` → Assignment[] (one-to-many)

**Índices**:
- `city`
- `isActive`

**Notas funcionales**:
- Modelo central del sistema BMAD (Business Model Aggregator for Drivers)
- Agrupa taxis y conductores bajo un mismo operador
- Permite multi-operador en la misma ciudad

---

### 3.2 Taxi

**Propósito**: Vehículo regulado para servicio de taxi.

**Tabla**: `taxis`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `updatedAt` | DateTime | ✅ | auto | Última actualización |
| `licensePlate` | String | ✅ | - | Patente (único) |
| `type` | String | ✅ | "STANDARD" | Tipo de vehículo |
| `city` | String | ✅ | - | Ciudad de operación |
| `zone` | String | ❌ | null | Zona dentro de ciudad |
| `operationalStatus` | String | ✅ | "OFFLINE" | Estado operacional |
| `fleetOperatorId` | String | ✅ | - | FK a FleetOperator |

**Tipos posibles**:
- `STANDARD`: Taxi estándar
- `EXECUTIVE`: Ejecutivo
- `TOURISM`: Turismo
- `VAN`: Van/Minivan
- `LUXURY`: Lujo
- `ACCESSIBLE`: Accesible (silla de ruedas)

**Estados operacionales**:
- `AVAILABLE`: Disponible para asignar
- `BUSY`: Ocupado en servicio
- `OFFLINE`: Fuera de línea
- `MAINTENANCE`: En mantenimiento

**Relaciones**:
- `fleetOperator` → FleetOperator (many-to-one)
- `assignments` → Assignment[] (one-to-many)

**Índices**:
- `licensePlate` → UNIQUE
- `operationalStatus`
- `fleetOperatorId`
- `city`

**Notas funcionales**:
- Estado cambia automáticamente cuando se asigna (`AVAILABLE` → `BUSY`)
- Estado vuelve a `AVAILABLE` cuando viaje se completa o cancela

---

### 3.3 Driver

**Propósito**: Conductor operacional del sistema.

**Tabla**: `drivers`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `updatedAt` | DateTime | ✅ | auto | Última actualización |
| `fullName` | String | ✅ | - | Nombre completo |
| `phone` | String | ✅ | - | Teléfono |
| `email` | String | ❌ | null | Email |
| `password` | String | ✅ | - | Password hasheado (bcrypt) |
| `professionalLicense` | String | ❌ | null | Número de licencia profesional |
| `licenseValidUntil` | DateTime | ❌ | null | Fecha de vencimiento de licencia |
| `isEnabled` | Boolean | ✅ | true | ¿Está habilitado? |
| `fleetOperatorId` | String | ✅ | - | FK a FleetOperator |

**Relaciones**:
- `fleetOperator` → FleetOperator (many-to-one)
- `assignments` → Assignment[] (one-to-many)

**Índices**:
- `isEnabled`
- `fleetOperatorId`
- `phone`

**Seguridad**:
- ⚠️ **NUNCA devolver `password` en APIs**
- Password debe estar hasheado con bcrypt
- JWT authentication (separado de NextAuth)

**Validaciones de negocio**:
- No se puede asignar si `isEnabled = false`
- No se puede asignar si `licenseValidUntil < now()`

**Notas funcionales**:
- Usado para autenticación mobile (JWT, no NextAuth)
- Cada conductor pertenece a un FleetOperator

---

### 3.4 PassengerRequest

**Propósito**: Solicitud operacional de pasajero (ya validada y lista para asignar).

**Tabla**: `passenger_requests`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `updatedAt` | DateTime | ✅ | auto | Última actualización |
| `passengerName` | String | ✅ | - | Nombre del pasajero |
| `passengerPhone` | String | ✅ | - | Teléfono del pasajero |
| `passengerEmail` | String | ❌ | null | Email del pasajero |
| `originAddress` | String | ✅ | - | Dirección de origen |
| `destinationAddress` | String | ❌ | null | Dirección de destino |
| `scheduledFor` | DateTime | ❌ | null | Fecha/hora programada |
| `channel` | String | ✅ | "WEB" | Canal de origen |
| `status` | String | ✅ | "CREATED" | Estado de la solicitud |
| `notes` | String | ❌ | null | Notas adicionales |

**Canales posibles**:
- `WEB`: Sitio web ETAXI
- `APP_PASSENGER`: App de pasajero (futuro)
- `PHONE_CENTRAL`: Llamada telefónica
- `BACKOFFICE`: Creada manualmente por operador

**Estados** (State Machine):
```
CREATED
  ↓
PENDING_ASSIGNMENT
  ↓
ASSIGNED
  ↓
DRIVER_EN_ROUTE (opcional, depende del Assignment)
  ↓
PASSENGER_ONBOARD (opcional, depende del Assignment)
  ↓
COMPLETED
  ↓ (alternativa)
CANCELED_BY_PASSENGER
CANCELED_BY_DRIVER
CANCELED_BY_OPERATOR
EXPIRED
```

**Relaciones**:
- `assignment` → Assignment (one-to-one)

**Índices**:
- `status`
- `createdAt`
- `channel`

**Notas funcionales**:
- `scheduledFor = null` significa "ahora"
- Solo puede tener una asignación activa (relación 1:1)
- Estado cambia según progreso del `Assignment`

---

### 3.5 Assignment

**Propósito**: Asignación de un conductor/taxi a una solicitud de pasajero.

**Tabla**: `assignments`

**Campos principales**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha de creación |
| `updatedAt` | DateTime | ✅ | auto | Última actualización |
| `passengerRequestId` | String | ✅ | - | FK a PassengerRequest (único) |
| `taxiId` | String | ❌ | null | FK a Taxi |
| `driverId` | String | ❌ | null | FK a Driver |
| `fleetOperatorId` | String | ❌ | null | FK a FleetOperator |
| `status` | String | ✅ | "CREATED" | Estado de la asignación |
| `assignedBy` | String | ✅ | - | Quién asignó |

**Campos de timestamps**:

| Campo | Descripción |
|-------|-------------|
| `sentToDriverAt` | Cuando se envió al conductor |
| `acceptedAt` | Cuando conductor aceptó |
| `rejectedAt` | Cuando conductor rechazó |
| `enRouteAt` | Cuando conductor marcó "voy en camino" |
| `onboardAt` | Cuando pasajero subió al taxi |
| `completedAt` | Cuando viaje se completó |
| `canceledAt` | Cuando se canceló |

**Campos de cancelación**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `cancellationReason` | String | Razón de cancelación |
| `canceledBy` | String | Quién canceló (PASSENGER/DRIVER/OPERATOR/SYSTEM) |

**Campos de tarifa**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `estimatedFare` | Decimal | Tarifa estimada |
| `finalFare` | Decimal | Tarifa final cobrada |

**Estados** (State Machine):
```
CREATED
  ↓
SENT_TO_DRIVER
  ↓                    ↓
ACCEPTED_BY_DRIVER    REJECTED_BY_DRIVER
  ↓
DRIVER_EN_ROUTE
  ↓
PASSENGER_ONBOARD
  ↓
COMPLETED

(Desde cualquier estado activo → CANCELED)
```

**Transiciones válidas**:

| Estado actual | Estados permitidos siguientes |
|--------------|------------------------------|
| `CREATED` | `SENT_TO_DRIVER` |
| `SENT_TO_DRIVER` | `ACCEPTED_BY_DRIVER`, `REJECTED_BY_DRIVER` |
| `ACCEPTED_BY_DRIVER` | `DRIVER_EN_ROUTE`, `CANCELED` |
| `DRIVER_EN_ROUTE` | `PASSENGER_ONBOARD`, `CANCELED` |
| `PASSENGER_ONBOARD` | `COMPLETED`, `CANCELED` |

**Relaciones**:
- `passengerRequest` → PassengerRequest (one-to-one)
- `taxi` → Taxi (many-to-one)
- `driver` → Driver (many-to-one)
- `fleetOperator` → FleetOperator (many-to-one)

**Índices**:
- `status`
- `passengerRequestId` → UNIQUE
- `taxiId`
- `driverId`

**Notas funcionales**:
- Es el modelo central del flujo operativo
- Mantiene timeline completo del viaje
- Relación 1:1 con `PassengerRequest`
- Cambios de estado deben registrarse en `AuditLog`

---

## 4. MODELOS DE AUDITORÍA

### 4.1 AuditLog

**Propósito**: Registro de auditoría de todas las acciones importantes del sistema.

**Tabla**: `audit_logs`

**Campos**:

| Campo | Tipo | Requerido | Default | Descripción |
|-------|------|-----------|---------|-------------|
| `id` | String (cuid) | ✅ | auto | ID único |
| `createdAt` | DateTime | ✅ | now() | Fecha del evento |
| `entityType` | String | ✅ | - | Tipo de entidad |
| `entityId` | String | ✅ | - | ID de la entidad |
| `action` | String | ✅ | - | Acción realizada |
| `performedBy` | String | ✅ | - | Quién realizó la acción |
| `metadata` | Json | ❌ | null | Datos adicionales |

**Tipos de entidad**:
- `PASSENGER_REQUEST`
- `ASSIGNMENT`
- `TAXI`
- `DRIVER`
- `FLEET_OPERATOR`

**Acciones comunes**:
- `created`
- `status_changed`
- `assigned`
- `canceled`
- `completed`
- `updated`
- `deleted`

**Formato de `performedBy`**:
- `SYSTEM`: Acción automática del sistema
- `USER:{id}`: Usuario del backoffice
- `OPERATOR:{email}`: Operador específico
- `DRIVER:{id}`: Conductor
- `PASSENGER:{id}`: Pasajero (futuro)

**Ejemplo de `metadata`**:
```json
{
  "previousState": "SENT_TO_DRIVER",
  "newState": "ACCEPTED_BY_DRIVER",
  "taxiId": "taxi_123",
  "taxiPlate": "AB1234",
  "driverId": "driver_456",
  "driverName": "Pedro González",
  "timestamp": "2025-11-16T10:40:00Z"
}
```

**Índices**:
- `[entityType, entityId]` → Compound index
- `createdAt`
- `performedBy`

**Notas funcionales**:
- Inmutable (no se puede editar ni eliminar)
- Permite trazabilidad completa
- Útil para compliance y debugging

---

## 5. DIAGRAMA DE RELACIONES

### Relaciones principales:

```
FleetOperator (1) ──┬─→ (N) Taxi
                    ├─→ (N) Driver
                    └─→ (N) Assignment

PassengerRequest (1) ─→ (1) Assignment

Assignment (N) ──┬─→ (1) PassengerRequest
                 ├─→ (1) Taxi
                 ├─→ (1) Driver
                 └─→ (1) FleetOperator
```

### Relaciones independientes:

```
User (sin relaciones)

RideRequest (sin relaciones)
CompanyLead (sin relaciones)
DriverLead (sin relaciones)

AuditLog (sin relaciones FK, solo entityId como string)
```

---

## 6. REGLAS DE NEGOCIO IMPLEMENTADAS EN DB

### Constraints y validaciones:

1. **Unicidad**:
   - `User.email` → UNIQUE
   - `Taxi.licensePlate` → UNIQUE
   - `Assignment.passengerRequestId` → UNIQUE (1:1)

2. **Relaciones obligatorias**:
   - Todo `Taxi` debe tener `fleetOperatorId`
   - Todo `Driver` debe tener `fleetOperatorId`
   - Todo `Assignment` debe tener `passengerRequestId`

3. **Cascading**:
   - No implementado (Prisma default: RESTRICT)
   - Si se elimina `FleetOperator`, fallaría si tiene taxis/drivers
   - Recomendación: Usar soft-delete (`isActive`, `isDeleted`)

4. **Defaults**:
   - Timestamps automáticos (`createdAt`, `updatedAt`)
   - Estados iniciales configurados
   - IDs auto-generados con `cuid()`

---

## 7. CONSIDERACIONES DE PERFORMANCE

### Índices recomendados (implementados):

✅ **FleetOperator**:
- `city`
- `isActive`

✅ **Taxi**:
- `licensePlate` (unique)
- `operationalStatus`
- `fleetOperatorId`
- `city`

✅ **Driver**:
- `isEnabled`
- `fleetOperatorId`
- `phone`

✅ **PassengerRequest**:
- `status`
- `createdAt`
- `channel`

✅ **Assignment**:
- `status`
- `passengerRequestId` (unique)
- `taxiId`
- `driverId`

✅ **AuditLog**:
- `[entityType, entityId]`
- `createdAt`
- `performedBy`

---

## 8. MIGRACIONES Y VERSIONADO

### Estado actual:
- Schema define en `prisma/schema.prisma`
- Migraciones gestionadas con Prisma Migrate

### Comandos importantes:
```bash
# Generar cliente Prisma
npx prisma generate

# Crear migración
npx prisma migrate dev --name descripcion-cambio

# Aplicar migraciones en producción
npx prisma migrate deploy

# Ver estado de BD
npx prisma studio
```

---

## 9. TIPOS ENUMERADOS (RECOMENDACIÓN)

**Estado actual**: Strings libres

**Mejora futura**: Convertir a ENUMs de Prisma:

```prisma
enum TaxiType {
  STANDARD
  EXECUTIVE
  TOURISM
  VAN
  LUXURY
  ACCESSIBLE
}

enum OperationalStatus {
  AVAILABLE
  BUSY
  OFFLINE
  MAINTENANCE
}

enum AssignmentStatus {
  CREATED
  SENT_TO_DRIVER
  ACCEPTED_BY_DRIVER
  REJECTED_BY_DRIVER
  DRIVER_EN_ROUTE
  PASSENGER_ONBOARD
  COMPLETED
  CANCELED
}
```

**Ventajas**:
- Type-safety
- Validación automática en DB
- Autocompletado en código

---

**Fin del documento**
