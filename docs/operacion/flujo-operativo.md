# FLUJO OPERATIVO COMPLETO — ETAXI MVP

**Fecha**: 2025-11-16
**Versión**: 1.0 (MVP)

---

## DESCRIPCIÓN GENERAL

Este documento describe el flujo completo de operación de ETAXI desde que un pasajero solicita un taxi hasta que el viaje se completa, incluyendo todos los sistemas involucrados, estados de datos y logs generados.

---

## ACTORES DEL SISTEMA

1. **Pasajero** (usuario final)
2. **Operador** (backoffice web - asigna manualmente)
3. **Conductor** (mobile app - ejecuta el servicio)
4. **Sistema** (automatizaciones y reglas de negocio)

---

## FLUJO COMPLETO PASO A PASO

### FASE 1: Solicitud de servicio (Pasajero → Sistema)

#### 1.1 Pasajero ingresa solicitud vía Web

**Ubicación**: `https://etaxi.cl/[locale]/pedir-taxi`

**Componente**: `RequestTaxiForm.tsx`

**Acciones**:
1. Pasajero completa formulario:
   - Nombre ✅
   - Teléfono ✅
   - Email (opcional)
   - Dirección de origen ✅
   - Dirección de destino (opcional)
   - Cuándo (ahora / fecha-hora)
   - Notas adicionales (opcional)

2. Click en "Solicitar taxi"

3. Frontend llama:
   ```
   POST /api/ride-requests
   ```

**Validaciones** (backend `app/api/ride-requests/route.ts`):
- ✅ Nombre, teléfono y origen son obligatorios
- ✅ Formato de teléfono válido: `^[+]?[\d\s\-()]+$`
- ✅ Formato de email válido (si se proporciona)
- ✅ Notas máximo 500 caracteres
- ✅ Sanitización con `.trim()`

**Resultado**:
```json
{
  "ok": true,
  "id": "clx123abc",
  "message": "Solicitud recibida correctamente. Te contactaremos pronto."
}
```

---

#### 1.2 Sistema crea `RideRequest` en BD

**Tabla**: `RideRequest`

**Campos creados**:
```typescript
{
  id: "clx123abc",               // auto-generado
  name: "Juan Pérez",
  phone: "+56912345678",
  email: "juan@example.com",
  pickupAddress: "Av. Principal 123, Santiago",
  dropoffAddress: "Av. Secundaria 456, Santiago",
  when: "ahora",
  notes: "Necesito taxi accesible",
  source: "web",
  createdAt: 2025-11-16T10:30:00Z
}
```

**Estado**: Solicitud almacenada, pendiente de conversión a `PassengerRequest`.

---

### FASE 2: Conversión a solicitud operativa (Sistema)

**Nota**: En el MVP actual, existe una desconexión entre `RideRequest` (solicitudes web) y `PassengerRequest` (solicitudes operativas).

**Flujo esperado** (pendiente de implementación):
1. Sistema lee `RideRequest` pendientes
2. Crea `PassengerRequest` con estado `PENDING_ASSIGNMENT`
3. Queda visible para Operador en Backoffice

**Flujo actual** (MVP):
- Operador puede crear `PassengerRequest` manualmente en backoffice
- O bien, existe proceso manual/semi-automático para convertir `RideRequest` → `PassengerRequest`

---

### FASE 3: Visualización en Backoffice (Operador)

#### 3.1 Operador accede al Backoffice

**URL**: `https://etaxi.cl/admin`

**Autenticación**: NextAuth (email + password)

**Componente**: `app/admin/page.tsx`

**Navegación**: Operador ve dashboard con métricas:
- Total de solicitudes pendientes
- Total de asignaciones activas
- Conductores disponibles
- Taxis disponibles

---

#### 3.2 Operador ve solicitudes pendientes

**URL**: `https://etaxi.cl/admin/operacion/solicitudes`

**Endpoint**:
```
GET /api/operator/requests
```

**Respuesta**:
```json
{
  "ok": true,
  "count": 5,
  "requests": [
    {
      "id": "req_001",
      "passengerName": "Juan Pérez",
      "passengerPhone": "+56912345678",
      "originAddress": "Av. Principal 123",
      "destinationAddress": "Av. Secundaria 456",
      "status": "PENDING_ASSIGNMENT",
      "scheduledFor": null, // null = ahora
      "createdAt": "2025-11-16T10:30:00Z"
    }
  ]
}
```

**Vista**: Tabla con columnas:
- Pasajero
- Teléfono
- Origen
- Destino
- Hora de solicitud
- Estado
- Acción: [Asignar]

---

### FASE 4: Asignación manual (Operador → Sistema)

#### 4.1 Operador inicia asignación

**Acción**: Click en "Asignar" en una solicitud

**Navegación**: Redirige a:
```
/admin/operacion/asignar/[requestId]
```

**Componente**: `app/admin/operacion/asignar/[requestId]/page.tsx`

---

#### 4.2 Operador selecciona taxi y conductor

**Vista**:
- Datos de la solicitud (pasajero, origen, destino)
- Lista de taxis disponibles (filtrados por `operationalStatus = 'AVAILABLE'`)
- Lista de conductores habilitados (filtrados por `isEnabled = true` y licencia vigente)
- Selector de Operador/Gremio (opcional)

**Validaciones frontend**:
- ✅ Taxi seleccionado
- ✅ Conductor seleccionado

---

#### 4.3 Operador confirma asignación

**Acción**: Click en "Crear asignación"

**Endpoint**:
```
POST /api/operator/assign
```

**Request body**:
```json
{
  "requestId": "req_001",
  "taxiId": "taxi_123",
  "driverId": "driver_456",
  "operatorId": "op_789" // opcional
}
```

---

#### 4.4 Sistema procesa asignación (transacción atómica)

**Archivo**: `app/api/operator/assign/route.ts`

**Pasos** (dentro de `prisma.$transaction`):

##### 1. Verificar `PassengerRequest`
```typescript
const request = await tx.passengerRequest.findUnique({
  where: { id: requestId },
});

if (!request) {
  throw new Error('Solicitud de pasajero no encontrada');
}

if (request.status !== 'PENDING_ASSIGNMENT') {
  throw new Error(`No se puede asignar solicitud con estado: ${request.status}`);
}
```

##### 2. Verificar `Taxi`
```typescript
const taxi = await tx.taxi.findUnique({
  where: { id: taxiId },
  include: { fleetOperator: true },
});

if (!taxi) {
  throw new Error('Taxi no encontrado');
}

if (taxi.operationalStatus !== 'AVAILABLE') {
  throw new Error(`Taxi ${taxi.licensePlate} no está disponible`);
}

if (!taxi.fleetOperator.isActive) {
  throw new Error(`Operador de flota ${taxi.fleetOperator.name} no está activo`);
}
```

##### 3. Verificar `Driver`
```typescript
const driver = await tx.driver.findUnique({
  where: { id: driverId },
});

if (!driver) {
  throw new Error('Conductor no encontrado');
}

if (!driver.isEnabled) {
  throw new Error(`Conductor ${driver.fullName} no está habilitado`);
}

if (driver.licenseValidUntil && new Date(driver.licenseValidUntil) < new Date()) {
  throw new Error(`Licencia del conductor ${driver.fullName} ha expirado`);
}
```

##### 4. Crear `Assignment`
```typescript
const assignment = await tx.assignment.create({
  data: {
    passengerRequestId: requestId,
    taxiId,
    driverId,
    fleetOperatorId: operatorId || taxi.fleetOperatorId,
    status: 'CREATED',
    assignedBy: `OPERATOR:${session.user?.email || 'unknown'}`,
  },
});
```

**Estado inicial**: `CREATED`

##### 5. Actualizar `Taxi` → BUSY
```typescript
await tx.taxi.update({
  where: { id: taxiId },
  data: { operationalStatus: 'BUSY' },
});
```

##### 6. Actualizar `PassengerRequest` → ASSIGNED
```typescript
await tx.passengerRequest.update({
  where: { id: requestId },
  data: { status: 'ASSIGNED' },
});
```

##### 7. Crear `AuditLog` - Assignment creado
```typescript
await tx.auditLog.create({
  data: {
    entityType: 'ASSIGNMENT',
    entityId: assignment.id,
    action: 'created',
    performedBy: `OPERATOR:${session.user?.email}`,
    metadata: {
      passengerRequestId: requestId,
      taxiId,
      taxiPlate: taxi.licensePlate,
      driverId,
      driverName: driver.fullName,
      fleetOperatorId: taxi.fleetOperatorId,
      fleetOperatorName: taxi.fleetOperator.name,
    },
  },
});
```

##### 8. Crear `AuditLog` - PassengerRequest cambio de estado
```typescript
await tx.auditLog.create({
  data: {
    entityType: 'PASSENGER_REQUEST',
    entityId: requestId,
    action: 'status_changed',
    performedBy: 'SYSTEM',
    metadata: {
      previousState: 'PENDING_ASSIGNMENT',
      newState: 'ASSIGNED',
      assignmentId: assignment.id,
    },
  },
});
```

---

#### 4.5 Respuesta al Operador

**Success response**:
```json
{
  "ok": true,
  "message": "Asignación creada exitosamente",
  "assignment": {
    "id": "asgn_001",
    "status": "CREATED",
    "passengerRequestId": "req_001",
    "taxiId": "taxi_123",
    "driverId": "driver_456",
    "createdAt": "2025-11-16T10:35:00Z"
  }
}
```

**Navegación**: Redirige a `/admin/operacion/seguimiento/[assignmentId]`

---

### FASE 5: Notificación al conductor (Sistema → Conductor)

**Estado del assignment**: `CREATED`

**Flujo esperado** (pendiente de implementación):
1. Sistema envía notificación push al conductor
2. Conductor abre app y ve nueva asignación

**Flujo actual (MVP)**:
- Conductor debe abrir app y refrescar
- Ve nueva asignación en lista

**Transición de estado**:
```
Assignment: CREATED → SENT_TO_DRIVER
```

**Endpoint** (pendiente de implementación):
```
POST /api/operator/assignment/send-to-driver
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'SENT_TO_DRIVER',
    sentToDriverAt: new Date(),
  },
});
```

---

### FASE 6: Conductor recibe y acepta servicio (Mobile App)

#### 6.1 Conductor abre app móvil

**Login**: `POST /api/driver/login`

**Request**:
```json
{
  "phoneOrEmail": "+56912345678",
  "password": "password123"
}
```

**Response**:
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "driver": {
    "id": "driver_456",
    "fullName": "Pedro González",
    "phone": "+56912345678",
    "email": "pedro@example.com",
    "isEnabled": true,
    "fleetOperator": {
      "id": "op_789",
      "name": "Taxi Seguro"
    }
  }
}
```

**Token almacenado**: JWT válido por 7 días

---

#### 6.2 Conductor ve servicios asignados

**Endpoint**:
```
GET /api/driver/assignments
Authorization: Bearer {token}
```

**Filtro por defecto**: Solo asignaciones activas:
```typescript
{
  status: {
    in: ['CREATED', 'SENT_TO_DRIVER', 'ACCEPTED_BY_DRIVER']
  }
}
```

**Response**:
```json
{
  "ok": true,
  "count": 1,
  "assignments": [
    {
      "id": "asgn_001",
      "status": "SENT_TO_DRIVER",
      "createdAt": "2025-11-16T10:35:00Z",
      "sentToDriverAt": "2025-11-16T10:36:00Z",
      "passengerRequest": {
        "id": "req_001",
        "passengerName": "Juan Pérez",
        "passengerPhone": "+56912345678",
        "originAddress": "Av. Principal 123",
        "destinationAddress": "Av. Secundaria 456",
        "scheduledFor": null,
        "notes": "Necesito taxi accesible"
      },
      "taxi": {
        "id": "taxi_123",
        "licensePlate": "AB1234",
        "type": "SEDAN",
        "city": "SANTIAGO"
      },
      "fleetOperator": {
        "id": "op_789",
        "name": "Taxi Seguro",
        "type": "GREMIO"
      }
    }
  ]
}
```

**Vista en app**:
- Card con origen, destino, hora, estado
- Botones según estado actual

---

#### 6.3 Conductor abre detalle del servicio

**Endpoint**:
```
GET /api/driver/assignments/asgn_001
Authorization: Bearer {token}
```

**Response**: Detalle completo del assignment

**Vista en app**:
- Origen
- Destino
- Pasajero (nombre, teléfono)
- Taxi asignado
- Estado actual
- **Botones de acción** según estado:

---

#### 6.4 Conductor acepta servicio

**Acción**: Click en "Aceptar servicio"

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
Authorization: Bearer {token}
```

**Request body**:
```json
{
  "newState": "ACCEPTED_BY_DRIVER"
}
```

**Validación de transición** (state machine):
```typescript
const ALLOWED_TRANSITIONS = {
  'SENT_TO_DRIVER': ['ACCEPTED_BY_DRIVER', 'REJECTED_BY_DRIVER'],
  'ACCEPTED_BY_DRIVER': ['DRIVER_EN_ROUTE', 'CANCELED'],
  'DRIVER_EN_ROUTE': ['PASSENGER_ONBOARD', 'CANCELED'],
  'PASSENGER_ONBOARD': ['COMPLETED', 'CANCELED'],
};

const currentState = assignment.status;
const allowed = ALLOWED_TRANSITIONS[currentState];

if (!allowed || !allowed.includes(newState)) {
  return NextResponse.json(
    { error: 'Transición no permitida' },
    { status: 400 }
  );
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'ACCEPTED_BY_DRIVER',
    acceptedAt: new Date(),
  },
});
```

**AuditLog**:
```typescript
await prisma.auditLog.create({
  data: {
    entityType: 'ASSIGNMENT',
    entityId: assignmentId,
    action: 'status_changed',
    performedBy: `DRIVER:${driver.id}`,
    metadata: {
      previousStatus: 'SENT_TO_DRIVER',
      newStatus: 'ACCEPTED_BY_DRIVER',
      timestamp: new Date(),
    },
  },
});
```

**Response**:
```json
{
  "ok": true,
  "assignment": {
    "id": "asgn_001",
    "status": "ACCEPTED_BY_DRIVER",
    "acceptedAt": "2025-11-16T10:40:00Z"
  }
}
```

---

### FASE 7: Conductor en ruta (Mobile App)

#### 7.1 Conductor marca "Voy en camino"

**Estado actual**: `ACCEPTED_BY_DRIVER`

**Acción**: Click en "Voy en camino"

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
```

**Request**:
```json
{
  "newState": "DRIVER_EN_ROUTE"
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'DRIVER_EN_ROUTE',
    enRouteAt: new Date(),
  },
});
```

**Estado del assignment**: `DRIVER_EN_ROUTE`

---

#### 7.2 Tracking GPS (opcional en MVP)

**Endpoint** (si está implementado):
```
POST /api/driver/location
Authorization: Bearer {token}
```

**Request**:
```json
{
  "lat": -33.4489,
  "lng": -70.6693
}
```

**Sistema**:
```typescript
await prisma.driverPosition.upsert({
  where: { driverId },
  update: { lat, lng, updatedAt: new Date() },
  create: { driverId, lat, lng },
});
```

**Backoffice**: Puede ver ubicación del conductor en tiempo (casi) real.

---

### FASE 8: Pasajero a bordo (Mobile App)

#### 8.1 Conductor marca "Pasajero a bordo"

**Estado actual**: `DRIVER_EN_ROUTE`

**Acción**: Click en "Pasajero a bordo"

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
```

**Request**:
```json
{
  "newState": "PASSENGER_ONBOARD"
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'PASSENGER_ONBOARD',
    onboardAt: new Date(),
  },
});
```

**Estado del assignment**: `PASSENGER_ONBOARD`

---

### FASE 9: Finalización del viaje (Mobile App)

#### 9.1 Conductor marca "Viaje finalizado"

**Estado actual**: `PASSENGER_ONBOARD`

**Acción**: Click en "Viaje finalizado"

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
```

**Request**:
```json
{
  "newState": "COMPLETED"
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'COMPLETED',
    completedAt: new Date(),
  },
});

// Liberar taxi
await prisma.taxi.update({
  where: { id: assignment.taxiId },
  data: { operationalStatus: 'AVAILABLE' },
});

// Actualizar solicitud de pasajero
await prisma.passengerRequest.update({
  where: { id: assignment.passengerRequestId },
  data: { status: 'COMPLETED' },
});
```

**AuditLog**:
```typescript
await prisma.auditLog.create({
  data: {
    entityType: 'ASSIGNMENT',
    entityId: assignmentId,
    action: 'completed',
    performedBy: `DRIVER:${driver.id}`,
    metadata: {
      completedAt: new Date(),
      totalDuration: calculateDuration(assignment.acceptedAt, new Date()),
    },
  },
});
```

**Estado final**: `COMPLETED`

---

### FASE 10: Visualización en Backoffice (Operador)

#### 10.1 Operador ve seguimiento en tiempo real

**URL**: `https://etaxi.cl/admin/operacion/seguimiento/[assignmentId]`

**Endpoint**:
```
GET /api/operator/assignments/asgn_001
```

**Response**:
```json
{
  "ok": true,
  "assignment": {
    "id": "asgn_001",
    "status": "COMPLETED",
    "createdAt": "2025-11-16T10:35:00Z",
    "sentToDriverAt": "2025-11-16T10:36:00Z",
    "acceptedAt": "2025-11-16T10:40:00Z",
    "enRouteAt": "2025-11-16T10:42:00Z",
    "onboardAt": "2025-11-16T10:50:00Z",
    "completedAt": "2025-11-16T11:10:00Z",
    "passengerRequest": { ... },
    "taxi": { ... },
    "driver": { ... },
    "fleetOperator": { ... }
  }
}
```

**Vista**:
- Timeline con todos los estados y timestamps
- Datos del pasajero
- Datos del conductor
- Datos del taxi
- Logs de auditoría

---

## FLUJOS ALTERNATIVOS

### Cancelación por conductor

**Estados permitidos para cancelar**:
- `ACCEPTED_BY_DRIVER`
- `DRIVER_EN_ROUTE`
- `PASSENGER_ONBOARD`

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
```

**Request**:
```json
{
  "newState": "CANCELED",
  "cancellationReason": "Pasajero no responde"
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'CANCELED',
    canceledAt: new Date(),
    cancellationReason,
  },
});

// Liberar taxi
await prisma.taxi.update({
  where: { id: assignment.taxiId },
  data: { operationalStatus: 'AVAILABLE' },
});

// Volver solicitud a pendiente
await prisma.passengerRequest.update({
  where: { id: assignment.passengerRequestId },
  data: { status: 'PENDING_ASSIGNMENT' },
});
```

---

### Rechazo por conductor

**Estado requerido**: `SENT_TO_DRIVER`

**Endpoint**:
```
POST /api/driver/assignments/asgn_001/state
```

**Request**:
```json
{
  "newState": "REJECTED_BY_DRIVER"
}
```

**Actualización**:
```typescript
await prisma.assignment.update({
  where: { id: assignmentId },
  data: {
    status: 'REJECTED_BY_DRIVER',
    rejectedAt: new Date(),
  },
});

// Liberar taxi
await prisma.taxi.update({
  where: { id: assignment.taxiId },
  data: { operationalStatus: 'AVAILABLE' },
});

// Volver solicitud a pendiente
await prisma.passengerRequest.update({
  where: { id: assignment.passengerRequestId },
  data: { status: 'PENDING_ASSIGNMENT' },
});
```

**Resultado**: Solicitud vuelve a estar disponible para nueva asignación.

---

## REGISTRO EN BASE DE DATOS

### Tablas involucradas

1. **RideRequest** → Solicitud web inicial
2. **PassengerRequest** → Solicitud operativa
3. **Assignment** → Asignación conductor-taxi
4. **Driver** → Datos del conductor
5. **Taxi** → Datos del vehículo
6. **FleetOperator** → Operador/gremio
7. **AuditLog** → Registro de auditoría

---

### Estados de `PassengerRequest`

```
PENDING_ASSIGNMENT → ASSIGNED → COMPLETED
                              ↘ CANCELED
```

---

### Estados de `Assignment`

```
CREATED
  ↓
SENT_TO_DRIVER
  ↓ (acepta)         ↓ (rechaza)
ACCEPTED_BY_DRIVER   REJECTED_BY_DRIVER
  ↓
DRIVER_EN_ROUTE
  ↓
PASSENGER_ONBOARD
  ↓
COMPLETED

(Desde cualquier estado activo se puede ir a CANCELED)
```

---

### Estados de `Taxi`

```
AVAILABLE → BUSY → AVAILABLE
         ↘ MAINTENANCE
         ↘ OUT_OF_SERVICE
```

---

## LOGS DE AUDITORÍA GENERADOS

### Durante asignación

1. **AuditLog - Assignment created**
   - Entity: ASSIGNMENT
   - Action: created
   - PerformedBy: OPERATOR:{email}
   - Metadata: passengerRequestId, taxiId, driverId, etc.

2. **AuditLog - PassengerRequest status changed**
   - Entity: PASSENGER_REQUEST
   - Action: status_changed
   - PerformedBy: SYSTEM
   - Metadata: previousState, newState, assignmentId

---

### Durante ejecución del servicio

3. **AuditLog - Assignment status changed (cada transición)**
   - Entity: ASSIGNMENT
   - Action: status_changed
   - PerformedBy: DRIVER:{id}
   - Metadata: previousStatus, newStatus, timestamp

4. **AuditLog - Assignment completed**
   - Entity: ASSIGNMENT
   - Action: completed
   - PerformedBy: DRIVER:{id}
   - Metadata: completedAt, totalDuration

---

## MÉTRICAS Y KPIs

### Métricas operativas

- Tiempo promedio de asignación (solicitud → asignado)
- Tiempo promedio de aceptación (asignado → aceptado)
- Tiempo promedio de llegada (aceptado → pasajero a bordo)
- Tiempo promedio de viaje (pasajero a bordo → completado)
- Tasa de rechazo de conductores
- Tasa de cancelación

---

## PRÓXIMAS MEJORAS

### Corto plazo

- [ ] Automatizar conversión RideRequest → PassengerRequest
- [ ] Notificaciones push a conductores
- [ ] Tracking GPS en tiempo real
- [ ] Estimación de tarifa

### Mediano plazo

- [ ] Asignación automática (matching algorithm)
- [ ] Sistema de rating (pasajero → conductor)
- [ ] Historial de viajes del pasajero
- [ ] Reportes y analítica

### Largo plazo

- [ ] App móvil para pasajeros
- [ ] Pago integrado
- [ ] Geofencing y zonas
- [ ] Integración con mapas (Google Maps, Mapbox)

---

**Fin del documento**
