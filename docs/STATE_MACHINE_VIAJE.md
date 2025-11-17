# STATE MACHINE — CICLO DE VIDA DEL VIAJE ETAXI

## Máquina de Estados para PassengerRequest y Assignment

Este documento define el ciclo de vida completo de una solicitud de pasajero desde su creación hasta su finalización o cancelación.

---

## Estados de PassengerRequest

### Diagrama de Estados

```
                    ┌─────────┐
                    │ CREATED │
                    └────┬────┘
                         │
                         ▼
              ┌──────────────────┐
              │PENDING_ASSIGNMENT│◄──┐
              └────┬─────────────┘   │
                   │                 │ REJECTED_BY_DRIVER
                   │                 │ (reasignar)
                   ▼                 │
              ┌──────────┐           │
              │ ASSIGNED │───────────┘
              └────┬─────┘
                   │
                   ▼
          ┌────────────────┐
          │ DRIVER_EN_ROUTE│
          └────────┬───────┘
                   │
                   ▼
         ┌──────────────────┐
         │ PASSENGER_ONBOARD│
         └────────┬─────────┘
                  │
                  ▼
            ┌───────────┐
            │ COMPLETED │
            └───────────┘

Cancelaciones (desde cualquier estado pre-ONBOARD):
┌───────────────────────┐
│CANCELED_BY_PASSENGER  │
│CANCELED_BY_OPERATOR   │
│EXPIRED                │
└───────────────────────┘
```

### Lista de Estados

| Estado | Descripción | Siguiente(s) estado(s) |
|--------|-------------|------------------------|
| `CREATED` | Solicitud recién creada | → `PENDING_ASSIGNMENT` |
| `PENDING_ASSIGNMENT` | Esperando asignación de taxi | → `ASSIGNED`, `EXPIRED`, `CANCELED_*` |
| `ASSIGNED` | Taxi asignado, enviado al conductor | → `DRIVER_EN_ROUTE`, `PENDING_ASSIGNMENT` (si rechaza), `CANCELED_*` |
| `DRIVER_EN_ROUTE` | Conductor aceptó y va en camino | → `PASSENGER_ONBOARD`, `CANCELED_*` |
| `PASSENGER_ONBOARD` | Pasajero a bordo, viaje en progreso | → `COMPLETED` |
| `COMPLETED` | Viaje finalizado exitosamente | Estado final |
| `CANCELED_BY_PASSENGER` | Pasajero canceló antes de subir | Estado final |
| `CANCELED_BY_OPERATOR` | Operador canceló (motivo operacional) | Estado final |
| `EXPIRED` | No se asignó en tiempo límite | Estado final |

---

## Estados de Assignment

### Diagrama de Estados

```
        ┌─────────┐
        │ CREATED │
        └────┬────┘
             │
             ▼
    ┌────────────────┐
    │ SENT_TO_DRIVER │
    └────┬───────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐  ┌──────────────────┐
│ACCEPTED │  │REJECTED_BY_DRIVER│──┐
└────┬────┘  └──────────────────┘  │
     │                             │
     │       ┌─────────┐           │
     └──────▶│CANCELED │◄──────────┘
             └─────────┘

     (si ACCEPTED)
         │
         ▼
    ┌───────────┐
    │ COMPLETED │
    └───────────┘
```

### Lista de Estados

| Estado | Descripción | Siguiente(s) estado(s) |
|--------|-------------|------------------------|
| `CREATED` | Assignment creado | → `SENT_TO_DRIVER` |
| `SENT_TO_DRIVER` | Notificación enviada al conductor | → `ACCEPTED_BY_DRIVER`, `REJECTED_BY_DRIVER`, `CANCELED` |
| `ACCEPTED_BY_DRIVER` | Conductor aceptó el servicio | → `COMPLETED`, `CANCELED` |
| `REJECTED_BY_DRIVER` | Conductor rechazó el servicio | → `CANCELED` |
| `CANCELED` | Assignment cancelado | Estado final |
| `COMPLETED` | Assignment completado exitosamente | Estado final |

---

## Transiciones Detalladas

### 1. CREATED → PENDING_ASSIGNMENT

**Trigger**: Sistema automático al crear la solicitud

**Quién**: Sistema

**Condiciones**:
- Solicitud válida (datos mínimos presentes)
- Canal de origen válido

**Acciones**:
```typescript
{
  action: 'status_changed',
  from: 'CREATED',
  to: 'PENDING_ASSIGNMENT',
  timestamp: new Date(),
  metadata: {
    channel: request.channel,
    originAddress: request.originAddress,
  }
}
```

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "status_changed",
  "performedBy": "SYSTEM",
  "metadata": {
    "previousState": "CREATED",
    "newState": "PENDING_ASSIGNMENT"
  }
}
```

---

### 2. PENDING_ASSIGNMENT → ASSIGNED

**Trigger**: Operador asigna taxi o motor automático

**Quién**: Operador (manual) o Sistema (automático)

**Condiciones**:
- Existe un Taxi con `operationalStatus = AVAILABLE`
- Existe un Driver con `isEnabled = true` y licencia vigente
- FleetOperator está `isActive = true`
- Zona de cobertura coincide

**Acciones**:
1. Crear Assignment
2. Cambiar Taxi.operationalStatus a `BUSY`
3. Cambiar PassengerRequest.status a `ASSIGNED`
4. Notificar al conductor (TBD: app, SMS, radio)

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "assigned",
  "performedBy": "OPERATOR:user-456",
  "metadata": {
    "previousState": "PENDING_ASSIGNMENT",
    "newState": "ASSIGNED",
    "assignmentId": "asg-789",
    "taxiId": "taxi-101",
    "driverId": "driver-202"
  }
}
```

---

### 3. ASSIGNED → DRIVER_EN_ROUTE

**Trigger**: Conductor acepta el servicio

**Quién**: Conductor (via app) o Operador (manual)

**Condiciones**:
- Assignment.status = `ACCEPTED_BY_DRIVER`
- Conductor confirmó que va en camino

**Acciones**:
1. Cambiar PassengerRequest.status a `DRIVER_EN_ROUTE`
2. Actualizar Assignment.timestamps.enRouteAt
3. (Opcional) Iniciar tracking GPS

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "driver_en_route",
  "performedBy": "DRIVER:driver-202",
  "metadata": {
    "previousState": "ASSIGNED",
    "newState": "DRIVER_EN_ROUTE",
    "assignmentId": "asg-789"
  }
}
```

---

### 4. DRIVER_EN_ROUTE → PASSENGER_ONBOARD

**Trigger**: Conductor marca inicio de viaje

**Quién**: Conductor

**Condiciones**:
- Conductor llegó al punto de origen
- Pasajero subió al vehículo

**Acciones**:
1. Cambiar PassengerRequest.status a `PASSENGER_ONBOARD`
2. Actualizar Assignment.timestamps.onboardAt
3. Iniciar medición de tarifa (si aplica)

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "passenger_onboard",
  "performedBy": "DRIVER:driver-202",
  "metadata": {
    "previousState": "DRIVER_EN_ROUTE",
    "newState": "PASSENGER_ONBOARD",
    "onboardTime": "2025-01-15T14:30:00Z"
  }
}
```

---

### 5. PASSENGER_ONBOARD → COMPLETED

**Trigger**: Conductor marca fin de viaje

**Quién**: Conductor

**Condiciones**:
- Viaje finalizado
- Pasajero bajó del vehículo

**Acciones**:
1. Cambiar PassengerRequest.status a `COMPLETED`
2. Cambiar Assignment.status a `COMPLETED`
3. Actualizar Assignment.timestamps.completedAt
4. Cambiar Taxi.operationalStatus a `AVAILABLE`
5. Registrar fare final (si aplica)

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "completed",
  "performedBy": "DRIVER:driver-202",
  "metadata": {
    "previousState": "PASSENGER_ONBOARD",
    "newState": "COMPLETED",
    "completedTime": "2025-01-15T15:00:00Z",
    "duration": 1800,
    "finalAmount": 8500
  }
}
```

---

### 6. Cancelaciones

#### 6.1. CANCELED_BY_PASSENGER

**Trigger**: Pasajero cancela desde app/web

**Quién**: Pasajero

**Condiciones**:
- Estado actual NOT IN (`PASSENGER_ONBOARD`, `COMPLETED`)
- Pasajero autenticado

**Acciones**:
1. Cambiar PassengerRequest.status a `CANCELED_BY_PASSENGER`
2. Si existe Assignment, cambiar a `CANCELED`
3. Liberar Taxi (si estaba asignado)
4. Registrar motivo de cancelación

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "canceled_by_passenger",
  "performedBy": "PASSENGER:req-123",
  "metadata": {
    "previousState": "ASSIGNED",
    "newState": "CANCELED_BY_PASSENGER",
    "cancellationReason": "Cambio de planes",
    "canceledTime": "2025-01-15T14:15:00Z"
  }
}
```

#### 6.2. CANCELED_BY_OPERATOR

**Trigger**: Operador cancela por motivo operacional

**Quién**: Operador backoffice

**Condiciones**:
- Estado actual NOT IN (`COMPLETED`)
- Operador autenticado con permisos

**Acciones**:
1. Cambiar PassengerRequest.status a `CANCELED_BY_OPERATOR`
2. Cambiar Assignment.status a `CANCELED`
3. Liberar Taxi
4. Registrar motivo obligatorio

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "canceled_by_operator",
  "performedBy": "OPERATOR:user-456",
  "metadata": {
    "previousState": "PENDING_ASSIGNMENT",
    "newState": "CANCELED_BY_OPERATOR",
    "cancellationReason": "No hay taxis disponibles en la zona",
    "canceledTime": "2025-01-15T14:20:00Z"
  }
}
```

#### 6.3. EXPIRED

**Trigger**: Sistema automático (timeout)

**Quién**: Sistema (cron job)

**Condiciones**:
- Estado = `PENDING_ASSIGNMENT`
- createdAt + TIMEOUT_MINUTES < now
- TIMEOUT_MINUTES configurado (ej: 15 minutos)

**Acciones**:
1. Cambiar PassengerRequest.status a `EXPIRED`
2. Notificar al pasajero (opcional)

**AuditLog**:
```json
{
  "entityType": "PASSENGER_REQUEST",
  "entityId": "req-123",
  "action": "expired",
  "performedBy": "SYSTEM",
  "metadata": {
    "previousState": "PENDING_ASSIGNMENT",
    "newState": "EXPIRED",
    "timeoutMinutes": 15,
    "expiredTime": "2025-01-15T14:15:00Z"
  }
}
```

---

### 7. REJECTED_BY_DRIVER → Re-asignación

**Trigger**: Conductor rechaza el servicio

**Quién**: Conductor

**Condiciones**:
- Assignment.status = `SENT_TO_DRIVER`
- Conductor tiene opción de rechazar

**Acciones**:
1. Cambiar Assignment.status a `REJECTED_BY_DRIVER`
2. Cambiar Assignment a `CANCELED`
3. Cambiar PassengerRequest.status a `PENDING_ASSIGNMENT` (volver a la cola)
4. Liberar Taxi
5. (Opcional) Intentar asignación automática a otro taxi

**AuditLog**:
```json
{
  "entityType": "ASSIGNMENT",
  "entityId": "asg-789",
  "action": "rejected_by_driver",
  "performedBy": "DRIVER:driver-202",
  "metadata": {
    "previousState": "SENT_TO_DRIVER",
    "newState": "REJECTED_BY_DRIVER",
    "rejectionReason": "Fuera de zona de cobertura",
    "passengerRequestId": "req-123"
  }
}
```

---

## Reglas de Transición

### Transiciones Permitidas

```typescript
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  CREATED: ['PENDING_ASSIGNMENT'],

  PENDING_ASSIGNMENT: [
    'ASSIGNED',
    'EXPIRED',
    'CANCELED_BY_PASSENGER',
    'CANCELED_BY_OPERATOR'
  ],

  ASSIGNED: [
    'DRIVER_EN_ROUTE',
    'PENDING_ASSIGNMENT', // si rechaza conductor
    'CANCELED_BY_PASSENGER',
    'CANCELED_BY_OPERATOR'
  ],

  DRIVER_EN_ROUTE: [
    'PASSENGER_ONBOARD',
    'CANCELED_BY_PASSENGER',
    'CANCELED_BY_OPERATOR'
  ],

  PASSENGER_ONBOARD: [
    'COMPLETED'
    // NO se puede cancelar una vez que el pasajero subió
  ],

  // Estados finales (no tienen transiciones)
  COMPLETED: [],
  CANCELED_BY_PASSENGER: [],
  CANCELED_BY_OPERATOR: [],
  EXPIRED: []
};
```

### Validación de Transiciones

```typescript
function canTransition(
  currentState: PassengerRequestStatus,
  nextState: PassengerRequestStatus
): boolean {
  const allowedStates = ALLOWED_TRANSITIONS[currentState];
  return allowedStates.includes(nextState);
}

// Ejemplo de uso
if (!canTransition('PASSENGER_ONBOARD', 'CANCELED_BY_PASSENGER')) {
  throw new Error('No se puede cancelar un viaje en progreso');
}
```

---

## Timeouts y Reglas Temporales

### Configuración de Timeouts

```typescript
const TIMEOUTS = {
  PENDING_ASSIGNMENT: 15 * 60 * 1000, // 15 minutos
  SENT_TO_DRIVER: 2 * 60 * 1000,      // 2 minutos para aceptar/rechazar
  DRIVER_EN_ROUTE: 30 * 60 * 1000,    // 30 minutos máximo en ruta
};
```

### Cron Jobs Necesarios

1. **Expirar solicitudes pendientes**:
   - Cada 1 minuto
   - Buscar PassengerRequest con:
     - status = `PENDING_ASSIGNMENT`
     - createdAt < now - 15 minutos
   - Cambiar a `EXPIRED`

2. **Auto-rechazar assignments no respondidos**:
   - Cada 30 segundos
   - Buscar Assignment con:
     - status = `SENT_TO_DRIVER`
     - sentToDriverAt < now - 2 minutos
   - Cambiar a `REJECTED_BY_DRIVER`
   - Re-asignar o expirar request

---

## Notificaciones por Estado

### Matriz de Notificaciones

| Transición | Pasajero | Conductor | Operador |
|------------|----------|-----------|----------|
| CREATED → PENDING | ✓ (confirmación) | - | ✓ (nueva solicitud) |
| PENDING → ASSIGNED | ✓ (taxi asignado) | ✓ (nuevo servicio) | - |
| ASSIGNED → EN_ROUTE | ✓ (conductor en camino) | - | - |
| EN_ROUTE → ONBOARD | ✓ (viaje iniciado) | - | - |
| ONBOARD → COMPLETED | ✓ (viaje finalizado) | - | ✓ (completado) |
| * → CANCELED | ✓ (cancelación) | ✓ (si asignado) | ✓ (alerta) |
| PENDING → EXPIRED | ✓ (timeout) | - | ✓ (no asignado) |

---

## Métricas por Estado

### KPIs Clave

```sql
-- Tasa de asignación
SELECT
  COUNT(*) FILTER (WHERE status != 'EXPIRED') * 100.0 / COUNT(*) as assignment_rate
FROM passenger_requests
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Tiempo promedio de asignación
SELECT
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_assignment_time_seconds
FROM passenger_requests
WHERE status = 'ASSIGNED'
  AND created_at > NOW() - INTERVAL '24 hours';

-- Tasa de cancelación
SELECT
  COUNT(*) FILTER (WHERE status LIKE 'CANCELED%') * 100.0 / COUNT(*) as cancellation_rate
FROM passenger_requests
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Tasa de completación
SELECT
  COUNT(*) FILTER (WHERE status = 'COMPLETED') * 100.0 / COUNT(*) as completion_rate
FROM passenger_requests
WHERE created_at > NOW() - INTERVAL '24 hours';
```

---

## Próximos Pasos

Esta máquina de estados será implementada como:
1. **Enum en Prisma** para tipos
2. **Funciones de validación** en el backend
3. **Endpoints API** para cada transición
4. **Jobs cron** para timeouts
5. **Sistema de notificaciones** según matriz

---

**Versión**: 1.0 - State Machine
**Fecha**: 2025-01-15
**Estado**: Diseño Conceptual (sin implementar)
