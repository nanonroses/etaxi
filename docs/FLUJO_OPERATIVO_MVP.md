# FLUJO OPERATIVO MVP — ASIGNACIÓN MANUAL CON BACKOFFICE

## Versión: Manual Assignment 1.0 (Fase MVP)

Este documento define el flujo operativo mínimo viable para ETAXI, donde la asignación de taxis se realiza **manualmente** a través del **Backoffice**, permitiendo operar de forma híbrida (plataforma digital + canales tradicionales del gremio).

---

## Objetivo del MVP

Permitir que ETAXI **capture solicitudes digitales** y las **asigne a taxis regulados** a través de operadores humanos en el Backoffice, **sin requerir** aún:

- App de conductor completamente funcional
- App de pasajero completamente funcional
- Motor de asignación automática

Este enfoque híbrido permite:
- ✅ Empezar a operar con infraestructura mínima
- ✅ Registrar trazabilidad completa
- ✅ Usar canales existentes de los gremios (radio, WhatsApp, teléfono)
- ✅ Validar el modelo operacional antes de automatizar

---

## Actores del Sistema

### 1. Pasajero
**Rol**: Solicita servicio de taxi
**Canales**:
- Sitio web ETAXI (pedir-taxi)
- App móvil pasajero (futuro)
- Llamada telefónica a central (operador crea solicitud)

**Acciones**:
- Crear solicitud de taxi
- Cancelar solicitud (antes de que el taxi llegue)
- Confirmar abordaje (futuro)

---

### 2. Operador Backoffice
**Rol**: Gestiona asignaciones manualmente
**Ubicación**: Panel `/admin` de ETAXI

**Acciones**:
- Ver solicitudes pendientes (`PENDING_ASSIGNMENT`)
- Filtrar por ciudad, zona, gremio
- Seleccionar Taxi + Driver disponibles
- Crear Assignment
- Comunicar asignación al conductor (vía canales existentes)
- Actualizar estados manualmente según feedback del conductor
- Cancelar asignaciones si es necesario
- Ver historial de viajes y auditoría

**Herramientas disponibles**:
- Dashboard con solicitudes en tiempo real
- Lista de taxis disponibles por gremio/zona
- Lista de conductores habilitados
- Comunicación directa con gremios/centrales

---

### 3. Conductor
**Rol**: Ejecuta el servicio de taxi
**Canales de comunicación**:
- Radio del gremio/central
- WhatsApp del gremio
- Llamada telefónica
- App conductor (futuro)

**Acciones**:
- Recibir asignación (vía radio/WhatsApp)
- Aceptar o rechazar el viaje
- Reportar estados al operador:
  - "Voy en camino"
  - "Pasajero a bordo"
  - "Viaje completado"
  - "Cancelé el viaje"

**Nota**: En MVP, el conductor **NO interactúa directamente** con la plataforma ETAXI. Toda comunicación es mediada por el operador.

---

### 4. FleetOperator (Gremio/Central)
**Rol**: Organización que provee taxis y conductores
**Canales**:
- Interfaz Backoffice (acceso limitado, futuro)
- Comunicación con operador ETAXI

**Responsabilidades**:
- Mantener taxis y conductores registrados
- Comunicar disponibilidad al operador
- Retransmitir asignaciones a conductores (vía radio)
- Reportar estados al operador

---

### 5. Sistema ETAXI
**Rol**: Plataforma digital de registro y trazabilidad

**Responsabilidades**:
- Capturar solicitudes (web/app/teléfono)
- Almacenar datos en PostgreSQL
- Registrar todos los cambios de estado (AuditLog)
- Mostrar información en Backoffice
- Notificaciones (email/SMS, futuro)
- Generar reportes y estadísticas

---

## Flujo Operativo Paso a Paso

### PASO 1: Pasajero Crea Solicitud

**Canal**: Web (pedir-taxi) o App móvil

**Acción del pasajero**:
1. Ingresa datos en formulario:
   - Nombre, teléfono, email (opcional)
   - Dirección de origen
   - Dirección de destino (opcional)
   - Cuándo: "Ahora" o fecha/hora programada
   - Notas adicionales

2. Envía formulario

**Acción del sistema**:
```typescript
// 1. Crear PassengerRequest
const request = await prisma.passengerRequest.create({
  data: {
    passengerName: "Juan Pérez",
    passengerPhone: "+56912345678",
    passengerEmail: "juan@example.com",
    originAddress: "Av. Providencia 1234, Santiago",
    destinationAddress: "Aeropuerto SCL",
    scheduledFor: null, // null = inmediato
    channel: "WEB",
    status: "CREATED", // Estado inicial
    notes: "Equipaje grande",
  }
});

// 2. Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "PASSENGER_REQUEST",
    entityId: request.id,
    action: "created",
    performedBy: "PASSENGER:web-form",
    metadata: {
      channel: "WEB",
      ip: "190.123.45.67",
      userAgent: "Mozilla/5.0...",
    },
    timestamp: new Date(),
  }
});

// 3. Cambiar estado a PENDING_ASSIGNMENT
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "PENDING_ASSIGNMENT" }
});

// 4. Registrar cambio de estado
await prisma.auditLog.create({
  data: {
    entityType: "PASSENGER_REQUEST",
    entityId: request.id,
    action: "status_changed",
    performedBy: "SYSTEM",
    metadata: {
      previousState: "CREATED",
      newState: "PENDING_ASSIGNMENT",
    },
    timestamp: new Date(),
  }
});
```

**Resultado**:
- ✅ PassengerRequest con status `PENDING_ASSIGNMENT`
- ✅ 2 registros en AuditLog (created, status_changed)
- ✅ Solicitud visible en Backoffice

**Notificación** (opcional):
- Email al pasajero: "Solicitud recibida, asignaremos un taxi pronto"
- SMS/WhatsApp (futuro)

---

### PASO 2: Operador Ve Solicitud en Backoffice

**Pantalla**: `/admin/ride-requests`

**Interfaz muestra**:
| ID | Pasajero | Origen | Destino | Cuándo | Estado | Acciones |
|----|----------|--------|---------|--------|--------|----------|
| REQ-001 | Juan Pérez (+56912345678) | Av. Providencia 1234 | Aeropuerto SCL | Ahora | PENDING_ASSIGNMENT | [Asignar] |

**Operador puede**:
- Ver todas las solicitudes pendientes
- Filtrar por:
  - Ciudad (Santiago, Valparaíso, etc.)
  - Zona (Providencia, Las Condes, etc.)
  - Estado
  - Fecha/hora programada
- Buscar por nombre o teléfono
- Ordenar por fecha de creación

**Datos adicionales visibles**:
- Notas del pasajero
- Historial de estados (AuditLog)
- Mapa con origen/destino (futuro)

---

### PASO 3: Operador Asigna Taxi + Driver

**Acción del operador**:

1. **Seleccionar gremio/central** apropiado:
   - Filtrar por zona de cobertura
   - Verificar horarios operacionales
   - Confirmar que FleetOperator está activo

2. **Seleccionar Taxi disponible**:
   - Estado: `AVAILABLE`
   - Zona correcta
   - Tipo apropiado (STANDARD, EXECUTIVE, etc.)

3. **Seleccionar Driver habilitado**:
   - Licencia vigente (`licenseValidUntil > hoy`)
   - Estado: `isEnabled = true`
   - Asociado al Taxi seleccionado

4. **Crear asignación** en el sistema

**Acción del sistema**:
```typescript
// 1. Verificar disponibilidad
const taxi = await prisma.taxi.findUnique({
  where: { id: taxiId },
  include: { fleetOperator: true }
});

if (taxi.operationalStatus !== 'AVAILABLE') {
  throw new Error('Taxi no disponible');
}

const driver = await prisma.driver.findUnique({
  where: { id: driverId }
});

if (!driver.isEnabled || new Date(driver.licenseValidUntil) < new Date()) {
  throw new Error('Conductor no habilitado o licencia vencida');
}

// 2. Crear Assignment
const assignment = await prisma.assignment.create({
  data: {
    passengerRequestId: request.id,
    taxiId: taxi.id,
    driverId: driver.id,
    fleetOperatorId: taxi.fleetOperatorId,
    status: "CREATED",
    assignedBy: "OPERATOR:user-123",
    timestamps: {
      createdAt: new Date().toISOString(),
    },
  }
});

// 3. Cambiar estado de Taxi a BUSY
await prisma.taxi.update({
  where: { id: taxi.id },
  data: { operationalStatus: "BUSY" }
});

// 4. Cambiar estado de PassengerRequest a ASSIGNED
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "ASSIGNED" }
});

// 5. Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "ASSIGNMENT",
    entityId: assignment.id,
    action: "created",
    performedBy: "OPERATOR:user-123",
    metadata: {
      passengerRequestId: request.id,
      taxiId: taxi.id,
      taxiPlate: taxi.licensePlate,
      driverId: driver.id,
      driverName: driver.fullName,
      fleetOperatorId: taxi.fleetOperatorId,
      fleetOperatorName: taxi.fleetOperator.name,
    },
    timestamp: new Date(),
  }
});
```

**Resultado**:
- ✅ Assignment creado con status `CREATED`
- ✅ Taxi marcado como `BUSY`
- ✅ PassengerRequest marcado como `ASSIGNED`
- ✅ Registro en AuditLog

---

### PASO 4: Comunicación con Conductor (Híbrido)

**Acción del operador**:

El operador **NO usa la plataforma** para notificar al conductor. En su lugar:

1. **Opción A — Radio del gremio**:
   ```
   Operador → Radio Central Gremio X
   "Taxi placa ABC-123, conductor Pedro González,
    viaje para Juan Pérez, recoger en Av. Providencia 1234,
    destino Aeropuerto SCL, equipaje grande"
   ```

2. **Opción B — WhatsApp del gremio**:
   ```
   Operador → WhatsApp Grupo "Taxis Zona Providencia"
   "🚖 VIAJE ASIGNADO
   Taxi: ABC-123
   Conductor: Pedro González
   Pasajero: Juan Pérez (+56912345678)
   Origen: Av. Providencia 1234
   Destino: Aeropuerto SCL
   Notas: Equipaje grande
   Confirmar aceptación"
   ```

3. **Opción C — Llamada telefónica**:
   ```
   Operador llama al conductor directamente
   ```

**Acción del sistema**:
```typescript
// Cambiar estado de Assignment a SENT_TO_DRIVER
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "SENT_TO_DRIVER",
    timestamps: {
      ...assignment.timestamps,
      sentToDriverAt: new Date().toISOString(),
    }
  }
});

// Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "ASSIGNMENT",
    entityId: assignment.id,
    action: "sent_to_driver",
    performedBy: "OPERATOR:user-123",
    metadata: {
      communicationChannel: "radio", // o "whatsapp", "phone"
      fleetOperatorId: taxi.fleetOperatorId,
    },
    timestamp: new Date(),
  }
});
```

**Resultado**:
- ✅ Assignment con status `SENT_TO_DRIVER`
- ✅ Conductor notificado (vía canal tradicional)
- ✅ Registro en AuditLog

**Timeout configurado**:
- Si en 5 minutos el conductor no responde → operador puede reasignar
- Sistema registra timeout en AuditLog

---

### PASO 5: Conductor Responde (Vía Operador)

#### **Caso 5A: Conductor Acepta**

**Acción del conductor**:
```
Conductor → Radio/WhatsApp
"ABC-123 confirmado, voy en camino a Providencia 1234"
```

**Acción del operador**:
1. Actualizar estado en Backoffice: `ACCEPTED_BY_DRIVER`
2. Click en botón "Conductor aceptó"

**Acción del sistema**:
```typescript
// 1. Cambiar estado de Assignment
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "ACCEPTED_BY_DRIVER",
    timestamps: {
      ...assignment.timestamps,
      acceptedAt: new Date().toISOString(),
    }
  }
});

// 2. Cambiar estado de PassengerRequest
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "DRIVER_EN_ROUTE" }
});

// 3. Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "ASSIGNMENT",
    entityId: assignment.id,
    action: "accepted_by_driver",
    performedBy: "DRIVER:driver-456",
    metadata: {
      acceptedVia: "radio",
      operatorWhoUpdated: "user-123",
    },
    timestamp: new Date(),
  }
});
```

**Notificación al pasajero** (opcional):
- SMS: "Tu taxi ABC-123 va en camino. Conductor: Pedro González"
- WhatsApp (futuro)

---

#### **Caso 5B: Conductor Rechaza**

**Acción del conductor**:
```
Conductor → Radio/WhatsApp
"ABC-123 no disponible, tengo problema mecánico"
```

**Acción del operador**:
1. Click en botón "Conductor rechazó"
2. Ingresar motivo del rechazo

**Acción del sistema**:
```typescript
// 1. Cambiar estado de Assignment a REJECTED_BY_DRIVER
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "REJECTED_BY_DRIVER",
    cancellationReason: "Problema mecánico",
    canceledBy: "DRIVER",
    timestamps: {
      ...assignment.timestamps,
      rejectedAt: new Date().toISOString(),
    }
  }
});

// 2. Liberar Taxi (volver a AVAILABLE)
await prisma.taxi.update({
  where: { id: taxi.id },
  data: { operationalStatus: "AVAILABLE" }
});

// 3. Volver PassengerRequest a PENDING_ASSIGNMENT
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "PENDING_ASSIGNMENT" }
});

// 4. Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "ASSIGNMENT",
    entityId: assignment.id,
    action: "rejected_by_driver",
    performedBy: "DRIVER:driver-456",
    metadata: {
      reason: "Problema mecánico",
      operatorWhoUpdated: "user-123",
    },
    timestamp: new Date(),
  }
});
```

**Resultado**:
- ✅ Assignment marcado como `REJECTED_BY_DRIVER`
- ✅ Taxi liberado (`AVAILABLE`)
- ✅ PassengerRequest vuelve a `PENDING_ASSIGNMENT`
- ✅ Operador puede reasignar a otro taxi

---

### PASO 6: Actualización de Estados Durante el Viaje

El operador actualiza manualmente según reportes del conductor:

#### **6A: Conductor En Camino**

**Estado ya actualizado en PASO 5A**
- Assignment: `ACCEPTED_BY_DRIVER`
- PassengerRequest: `DRIVER_EN_ROUTE`

#### **6B: Pasajero a Bordo**

**Acción del conductor**:
```
Conductor → Radio/WhatsApp
"ABC-123 pasajero a bordo, rumbo a aeropuerto"
```

**Acción del operador**: Click en "Pasajero a bordo"

**Acción del sistema**:
```typescript
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "ACCEPTED_BY_DRIVER", // Se mantiene
    timestamps: {
      ...assignment.timestamps,
      onboardAt: new Date().toISOString(),
    }
  }
});

await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "PASSENGER_ONBOARD" }
});
```

**Punto crítico**: Desde este momento, **NO se puede cancelar** la solicitud.

---

#### **6C: Viaje Completado**

**Acción del conductor**:
```
Conductor → Radio/WhatsApp
"ABC-123 viaje completado en aeropuerto, pasajero bajó"
```

**Acción del operador**: Click en "Marcar como completado"

**Acción del sistema**:
```typescript
// 1. Completar Assignment
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "COMPLETED",
    timestamps: {
      ...assignment.timestamps,
      completedAt: new Date().toISOString(),
    },
    fare: {
      finalAmount: 15000, // CLP (puede ingresarse manualmente)
      currency: "CLP",
    }
  }
});

// 2. Completar PassengerRequest
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "COMPLETED" }
});

// 3. Liberar Taxi
await prisma.taxi.update({
  where: { id: taxi.id },
  data: { operationalStatus: "AVAILABLE" }
});

// 4. Registrar en AuditLog
await prisma.auditLog.create({
  data: {
    entityType: "ASSIGNMENT",
    entityId: assignment.id,
    action: "completed",
    performedBy: "OPERATOR:user-123",
    metadata: {
      completedBy: "DRIVER:driver-456",
      fare: 15000,
      duration: calculateDuration(assignment.timestamps),
    },
    timestamp: new Date(),
  }
});
```

**Resultado**:
- ✅ Assignment: `COMPLETED`
- ✅ PassengerRequest: `COMPLETED`
- ✅ Taxi: `AVAILABLE` (listo para nuevo viaje)
- ✅ Registro completo en AuditLog

**Notificación al pasajero** (opcional):
- Email: "Gracias por usar ETAXI. Esperamos verte pronto."
- Solicitar calificación (futuro)

---

### PASO 7: Casos de Cancelación

#### **7A: Pasajero Cancela (Antes de ONBOARD)**

**Canal**: Llamada telefónica a central o botón en app (futuro)

**Acción del operador**: Click en "Cancelar por pasajero"

**Acción del sistema**:
```typescript
// Verificar que se puede cancelar
if (request.status === 'PASSENGER_ONBOARD') {
  throw new Error('No se puede cancelar, pasajero ya está a bordo');
}

// Cancelar Assignment
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "CANCELED",
    cancellationReason: "Pasajero canceló el viaje",
    canceledBy: "PASSENGER",
    timestamps: {
      ...assignment.timestamps,
      canceledAt: new Date().toISOString(),
    }
  }
});

// Cancelar PassengerRequest
await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "CANCELED_BY_PASSENGER" }
});

// Liberar Taxi
await prisma.taxi.update({
  where: { id: taxi.id },
  data: { operationalStatus: "AVAILABLE" }
});
```

**Notificación al conductor** (vía radio/WhatsApp):
- "Taxi ABC-123: viaje cancelado por pasajero"

---

#### **7B: Conductor Cancela (Durante el viaje)**

**Acción del conductor**:
```
Conductor → Radio/WhatsApp
"ABC-123 cancelando viaje, pasajero no estaba en dirección"
```

**Acción del operador**: Click en "Cancelar por conductor"

**Acción del sistema**:
```typescript
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "CANCELED",
    cancellationReason: "Pasajero no estaba en la dirección",
    canceledBy: "DRIVER",
    timestamps: {
      ...assignment.timestamps,
      canceledAt: new Date().toISOString(),
    }
  }
});

await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "CANCELED_BY_DRIVER" }
});

await prisma.taxi.update({
  where: { id: taxi.id },
  data: { operationalStatus: "AVAILABLE" }
});
```

**Notificación al pasajero**:
- Llamada del operador explicando la situación
- Email de disculpas (opcional)

---

#### **7C: Operador Cancela (Cualquier motivo)**

**Razones**:
- No hay taxis disponibles
- Solicitud duplicada
- Datos erróneos
- Petición del pasajero

**Acción del operador**: Click en "Cancelar asignación"

**Acción del sistema**:
```typescript
await prisma.assignment.update({
  where: { id: assignment.id },
  data: {
    status: "CANCELED",
    cancellationReason: operatorReason,
    canceledBy: "OPERATOR",
    timestamps: {
      ...assignment.timestamps,
      canceledAt: new Date().toISOString(),
    }
  }
});

await prisma.passengerRequest.update({
  where: { id: request.id },
  data: { status: "CANCELED_BY_OPERATOR" }
});

// Liberar recursos si aplica
```

---

#### **7D: Sistema Cancela (Timeout)**

**Trigger**: Cron job cada 5 minutos

**Lógica**:
```typescript
// Buscar assignments sin respuesta por más de X minutos
const expiredAssignments = await prisma.assignment.findMany({
  where: {
    status: "SENT_TO_DRIVER",
    timestamps: {
      path: ['sentToDriverAt'],
      lt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutos
    }
  }
});

for (const assignment of expiredAssignments) {
  await prisma.assignment.update({
    where: { id: assignment.id },
    data: {
      status: "CANCELED",
      cancellationReason: "Timeout: conductor no respondió en 5 minutos",
      canceledBy: "SYSTEM",
      timestamps: {
        ...assignment.timestamps,
        canceledAt: new Date().toISOString(),
      }
    }
  });

  await prisma.passengerRequest.update({
    where: { id: assignment.passengerRequestId },
    data: { status: "PENDING_ASSIGNMENT" } // Volver a pendiente
  });

  // Liberar taxi
  await prisma.taxi.update({
    where: { id: assignment.taxiId },
    data: { operationalStatus: "AVAILABLE" }
  });
}
```

---

## Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                         PASO 1                                  │
│                  Pasajero Crea Solicitud                        │
│                                                                 │
│  Web/App  →  PassengerRequest (CREATED)                        │
│              ↓                                                  │
│              PassengerRequest (PENDING_ASSIGNMENT)             │
│              ↓                                                  │
│              Visible en Backoffice                             │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                         PASO 2                                  │
│              Operador Ve Solicitud                              │
│                                                                 │
│  Backoffice  →  Lista de solicitudes pendientes                │
│                 Filtros: ciudad, zona, gremio                  │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                         PASO 3                                  │
│             Operador Asigna Taxi + Driver                       │
│                                                                 │
│  Operador selecciona:                                          │
│    - FleetOperator (gremio)                                    │
│    - Taxi (AVAILABLE)                                          │
│    - Driver (isEnabled=true, licencia vigente)                 │
│                                                                 │
│  Sistema crea:                                                 │
│    - Assignment (CREATED)                                      │
│    - Taxi → BUSY                                               │
│    - PassengerRequest → ASSIGNED                               │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                         PASO 4                                  │
│           Comunicación con Conductor (Híbrido)                  │
│                                                                 │
│  Operador → Radio/WhatsApp/Teléfono → Conductor                │
│                                                                 │
│  Sistema:                                                      │
│    - Assignment → SENT_TO_DRIVER                               │
│    - Timeout configurado (5 min)                               │
└─────────────────────────────────────────────────────────────────┘
                          ↓
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Conductor Acepta   │    │  Conductor Rechaza   │
│                      │    │                      │
│ Assignment →         │    │ Assignment →         │
│ ACCEPTED_BY_DRIVER   │    │ REJECTED_BY_DRIVER   │
│                      │    │                      │
│ PassengerRequest →   │    │ Taxi → AVAILABLE     │
│ DRIVER_EN_ROUTE      │    │                      │
│                      │    │ PassengerRequest →   │
│                      │    │ PENDING_ASSIGNMENT   │
│                      │    │ (reasignar)          │
└──────────┬───────────┘    └──────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────────────┐
│                         PASO 6                                  │
│              Actualización de Estados                           │
│                                                                 │
│  Conductor reporta (vía radio/WhatsApp):                       │
│    1. "Pasajero a bordo"                                       │
│       → PassengerRequest: PASSENGER_ONBOARD                    │
│       → YA NO SE PUEDE CANCELAR                                │
│                                                                 │
│    2. "Viaje completado"                                       │
│       → Assignment: COMPLETED                                  │
│       → PassengerRequest: COMPLETED                            │
│       → Taxi: AVAILABLE                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Casos de Cancelación - Diagrama

```
              ┌─────────────────────────────────┐
              │  PENDING_ASSIGNMENT             │
              └──────────┬──────────────────────┘
                         │
              ┌──────────┴──────────┐
              │  Pasajero cancela   │
              │  Operador cancela   │
              └──────────┬──────────┘
                         ▼
              ┌──────────────────────┐
              │ CANCELED_BY_PASSENGER│
              │ CANCELED_BY_OPERATOR │
              └──────────────────────┘

              ┌─────────────────────────────────┐
              │  ASSIGNED                       │
              └──────────┬──────────────────────┘
                         │
              ┌──────────┴──────────┐
              │  Pasajero cancela   │
              │  Operador cancela   │
              │  Sistema timeout    │
              └──────────┬──────────┘
                         ▼
              ┌──────────────────────┐
              │ CANCELED_BY_PASSENGER│
              │ CANCELED_BY_OPERATOR │
              │ EXPIRED (timeout)    │
              └──────────────────────┘

              ┌─────────────────────────────────┐
              │  DRIVER_EN_ROUTE                │
              └──────────┬──────────────────────┘
                         │
              ┌──────────┴──────────┐
              │  Conductor cancela  │
              │  Pasajero cancela   │
              └──────────┬──────────┘
                         ▼
              ┌──────────────────────┐
              │ CANCELED_BY_DRIVER   │
              │ CANCELED_BY_PASSENGER│
              └──────────────────────┘

              ┌─────────────────────────────────┐
              │  PASSENGER_ONBOARD              │
              └──────────┬──────────────────────┘
                         │
                   ❌ NO SE PUEDE CANCELAR
                         │
                         ▼
              ┌──────────────────────┐
              │  COMPLETED           │
              └──────────────────────┘
```

---

## Ejemplo de AuditLog Completo

Para un viaje exitoso (CREATED → COMPLETED):

```typescript
// 1. PassengerRequest creado
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "created",
  performedBy: "PASSENGER:web-form",
  timestamp: "2025-01-15T10:00:00Z"
}

// 2. Estado → PENDING_ASSIGNMENT
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "status_changed",
  performedBy: "SYSTEM",
  metadata: { previousState: "CREATED", newState: "PENDING_ASSIGNMENT" },
  timestamp: "2025-01-15T10:00:01Z"
}

// 3. Assignment creado
{
  entityType: "ASSIGNMENT",
  entityId: "asg-001",
  action: "created",
  performedBy: "OPERATOR:user-123",
  metadata: {
    passengerRequestId: "req-001",
    taxiId: "taxi-456",
    driverId: "drv-789"
  },
  timestamp: "2025-01-15T10:05:00Z"
}

// 4. PassengerRequest → ASSIGNED
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "status_changed",
  performedBy: "SYSTEM",
  metadata: { previousState: "PENDING_ASSIGNMENT", newState: "ASSIGNED" },
  timestamp: "2025-01-15T10:05:01Z"
}

// 5. Assignment → SENT_TO_DRIVER
{
  entityType: "ASSIGNMENT",
  entityId: "asg-001",
  action: "sent_to_driver",
  performedBy: "OPERATOR:user-123",
  metadata: { communicationChannel: "radio" },
  timestamp: "2025-01-15T10:06:00Z"
}

// 6. Assignment → ACCEPTED_BY_DRIVER
{
  entityType: "ASSIGNMENT",
  entityId: "asg-001",
  action: "accepted_by_driver",
  performedBy: "DRIVER:drv-789",
  metadata: { acceptedVia: "radio" },
  timestamp: "2025-01-15T10:08:00Z"
}

// 7. PassengerRequest → DRIVER_EN_ROUTE
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "status_changed",
  performedBy: "SYSTEM",
  metadata: { previousState: "ASSIGNED", newState: "DRIVER_EN_ROUTE" },
  timestamp: "2025-01-15T10:08:01Z"
}

// 8. PassengerRequest → PASSENGER_ONBOARD
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "status_changed",
  performedBy: "OPERATOR:user-123",
  metadata: {
    previousState: "DRIVER_EN_ROUTE",
    newState: "PASSENGER_ONBOARD",
    reportedByDriver: "drv-789"
  },
  timestamp: "2025-01-15T10:20:00Z"
}

// 9. Assignment → COMPLETED
{
  entityType: "ASSIGNMENT",
  entityId: "asg-001",
  action: "completed",
  performedBy: "OPERATOR:user-123",
  metadata: {
    completedBy: "DRIVER:drv-789",
    fare: 15000,
    duration: "25 minutes"
  },
  timestamp: "2025-01-15T10:45:00Z"
}

// 10. PassengerRequest → COMPLETED
{
  entityType: "PASSENGER_REQUEST",
  entityId: "req-001",
  action: "status_changed",
  performedBy: "SYSTEM",
  metadata: { previousState: "PASSENGER_ONBOARD", newState: "COMPLETED" },
  timestamp: "2025-01-15T10:45:01Z"
}
```

**Total**: 10 registros de auditoría para 1 viaje exitoso

---

## Ventajas del Modelo Híbrido MVP

### ✅ Operacionales

1. **Inicio rápido**: No requiere apps completamente desarrolladas
2. **Flexibilidad**: Usa infraestructura existente de gremios (radios)
3. **Aprendizaje**: Validar el modelo antes de automatizar
4. **Control humano**: Operador puede tomar decisiones complejas
5. **Trazabilidad**: Todo queda registrado digitalmente

### ✅ Técnicas

1. **Menor complejidad inicial**: No requiere notificaciones push, GPS real-time, etc.
2. **Menor riesgo**: Fallos no afectan directamente al conductor
3. **Iteración rápida**: Cambios en Backoffice sin afectar apps móviles
4. **Base sólida**: Datos y lógica listos para automatización futura

### ✅ De Negocio

1. **Adopción gradual**: Gremios pueden seguir usando sus canales
2. **Confianza**: Operadores humanos generan confianza inicial
3. **Capacitación**: Tiempo para entrenar conductores en nueva tecnología
4. **Validación**: Probar demanda real antes de inversión mayor

---

## Limitaciones del MVP

### ⚠️ Escalabilidad

- **Manual**: No escala a cientos de solicitudes simultáneas
- **Latencia**: Depende de velocidad del operador humano
- **Horarios**: Requiere operadores 24/7 para servicio continuo

### ⚠️ Experiencia de Usuario

- **Pasajero**: No tiene tracking en tiempo real del taxi
- **Conductor**: Comunicación mediada, no directa con pasajero
- **Operador**: Carga de trabajo alta en horas pico

### ⚠️ Datos

- **GPS**: No se captura ruta real del viaje
- **Tiempo real**: Estados pueden estar desactualizados
- **Métricas**: Difícil medir tiempos exactos de respuesta

---

## Evolución Post-MVP

Cuando el modelo híbrido esté validado, se puede evolucionar a:

### Fase 2: Semi-Automatización

1. **App Conductor Básica**:
   - Recibir asignaciones digitalmente
   - Aceptar/rechazar con un click
   - Reportar estados (en camino, a bordo, completado)

2. **Notificaciones Push**:
   - Reemplazar radio/WhatsApp para asignaciones
   - SMS/Email automáticos a pasajero

3. **GPS Básico**:
   - Tracking opcional del taxi
   - Estimación de tiempo de llegada

### Fase 3: Automatización Completa

1. **Motor de Asignación Automática**:
   - Algoritmo selecciona mejor taxi disponible
   - Operador solo supervisa

2. **App Pasajero Completa**:
   - Tracking en tiempo real
   - Chat con conductor
   - Pago digital

3. **Integración Directa**:
   - Sin mediación de operador
   - Sistema totalmente digital

---

## Métricas del MVP

Para medir éxito del flujo operativo:

### KPIs Operacionales

1. **Tiempo promedio de asignación**: Desde PENDING_ASSIGNMENT → ASSIGNED
2. **Tasa de aceptación**: % de assignments aceptados vs rechazados
3. **Tasa de completación**: % de viajes completados vs cancelados
4. **Tiempo promedio de viaje**: Desde DRIVER_EN_ROUTE → COMPLETED

### KPIs de Calidad

1. **Cancelaciones por pasajero**: % y razones
2. **Cancelaciones por conductor**: % y razones
3. **Timeouts**: Número de asignaciones expiradas
4. **Reasignaciones**: Número de solicitudes que requirieron > 1 assignment

### KPIs de Volumen

1. **Solicitudes diarias**: Total de PassengerRequests
2. **Viajes completados**: Total con status COMPLETED
3. **Taxis activos**: Número de taxis con al menos 1 viaje
4. **Operadores**: Número de operadores activos

---

## Requisitos Técnicos Mínimos

### Backend

- ✅ Prisma schema con 6 entidades (ya definido)
- ✅ State machine implementada (ya diseñada)
- ✅ API endpoints para Backoffice
- ✅ AuditLog automático en cada transición

### Backoffice

- ✅ Dashboard de estadísticas
- ✅ Vista de solicitudes pendientes
- ✅ Interface de asignación (select taxi + driver)
- ✅ Botones de actualización de estados
- ⏳ Vista de AuditLog por solicitud
- ⏳ Filtros y búsqueda

### Infraestructura

- ✅ PostgreSQL database
- ✅ NextAuth authentication
- ⏳ Cron jobs para timeouts
- ⏳ Email/SMS notifications (opcional)

### Documentación

- ✅ Modelo de dominio
- ✅ State machine
- ✅ Arquitectura de capas
- ✅ Flujo operativo MVP (este documento)

---

## Próximos Pasos

1. **Revisar y aprobar** este flujo operativo
2. **Planear implementación técnica** (OPS-EAT-5)
3. **Priorizar features**:
   - Core: Assignment engine manual
   - Nice-to-have: GPS tracking, notificaciones automáticas
4. **Capacitar equipo operacional**
5. **Piloto con 1 gremio** para validar flujo

---

**Versión**: MVP 1.0 - Manual Assignment
**Fecha**: 2025-01-15
**Estado**: Diseño Conceptual (listo para implementar)
**Próximo documento**: OPS-EAT-5 — Plan Técnico MVP
