# MODELO DE DOMINIO OPERACIONAL ETAXI

## Versión Lógica - Arquitectura de Dominio

Este documento define las entidades clave y sus relaciones para el flujo de asignación de taxis regulados en ETAXI, alineado al modelo EAT (Empresas de Aplicaciones de Transporte).

---

## Entidades del Dominio

### 1. PassengerRequest (Solicitud de Pasajero)

**Propósito**: Representa una solicitud de servicio de taxi iniciada por un pasajero.

**Atributos**:
- `id` (UUID): Identificador único
- `passengerName` (string): Nombre del pasajero
- `passengerPhone` (string): Teléfono de contacto
- `passengerEmail` (string, optional): Email del pasajero
- `originAddress` (string): Dirección de origen
- `originCoordinates` (lat/lng, optional): Coordenadas GPS
- `destinationAddress` (string, optional): Dirección de destino
- `destinationCoordinates` (lat/lng, optional): Coordenadas destino
- `scheduledFor` (datetime, optional): Fecha/hora programada (null = inmediato)
- `channel` (enum): Origen de la solicitud
  - `WEB` - Sitio web público
  - `APP_PASSENGER` - App móvil pasajero
  - `PHONE_CENTRAL` - Llamada telefónica
  - `ENTERPRISE` - Sistema empresa/gremio
  - `BACKOFFICE` - Creado por operador
- `enterpriseId` (UUID, optional): Empresa/gremio asociado (si aplica)
- `status` (enum): Estado actual (ver state machine)
- `notes` (text, optional): Comentarios adicionales
- `createdAt` (datetime): Fecha/hora creación
- `updatedAt` (datetime): Última actualización

**Relaciones**:
- `belongsTo` Enterprise (opcional)
- `hasOne` Assignment (cuando se asigna)
- `hasMany` AuditLog

---

### 2. Taxi (Vehículo Regulado)

**Propósito**: Representa un vehículo de taxi autorizado y regulado.

**Atributos**:
- `id` (UUID): Identificador único
- `licensePlate` (string, unique): Patente del vehículo
- `type` (enum): Tipo de vehículo
  - `STANDARD` - Taxi básico
  - `EXECUTIVE` - Taxi ejecutivo
  - `TOURISM` - Taxi turismo
  - `VAN` - Van/minivan
  - `LUXURY` - Taxi de lujo
  - `ACCESSIBLE` - Vehículo accesible
- `city` (string): Ciudad de operación
- `zone` (string, optional): Zona específica
- `operationalStatus` (enum): Estado operacional
  - `AVAILABLE` - Disponible
  - `BUSY` - Ocupado (en servicio)
  - `OFFLINE` - Fuera de servicio
  - `MAINTENANCE` - En mantenimiento
- `fleetOperatorId` (UUID): Gremio/empresa al que pertenece
- `metadata` (JSON): Datos adicionales
  - Año, modelo, color
  - Capacidad pasajeros
  - Equipamiento (AC, WiFi, etc.)
- `createdAt` (datetime)
- `updatedAt` (datetime)

**Relaciones**:
- `belongsTo` FleetOperator
- `hasMany` Driver (conductores que manejan este taxi)
- `hasMany` Assignment

---

### 3. Driver (Conductor)

**Propósito**: Representa un conductor de taxi autorizado.

**Atributos**:
- `id` (UUID): Identificador único
- `fullName` (string): Nombre completo
- `phone` (string): Teléfono de contacto
- `email` (string, optional): Email
- `professionalLicense` (string): Número de licencia profesional
- `licenseValidUntil` (date): Vigencia de licencia
- `isEnabled` (boolean): Habilitado para operar
- `fleetOperatorId` (UUID): Gremio/empresa al que pertenece
- `metadata` (JSON): Metadata de validación
  - RUT
  - Documentos adjuntos
  - Certificaciones
- `createdAt` (datetime)
- `updatedAt` (datetime)

**Relaciones**:
- `belongsTo` FleetOperator
- `hasMany` Taxi (vehículos que puede conducir)
- `hasMany` Assignment

---

### 4. FleetOperator (Operador de Flota)

**Propósito**: Representa un gremio, central, empresa o municipalidad que opera taxis.

**Atributos**:
- `id` (UUID): Identificador único
- `name` (string): Nombre del operador
- `type` (enum): Tipo de operador
  - `GUILD` - Gremio de taxistas
  - `CENTRAL` - Central de radio taxis
  - `COMPANY` - Empresa de taxis
  - `MUNICIPALITY` - Municipalidad
- `city` (string): Ciudad principal de operación
- `coverageZones` (array[string]): Zonas de cobertura
- `operatingHours` (JSON): Horarios de operación
  - `startTime`, `endTime`
  - `days` (array de días de la semana)
- `isActive` (boolean): Activo/Inactivo
- `contactEmail` (string): Email de contacto
- `contactPhone` (string): Teléfono de contacto
- `metadata` (JSON): Parámetros operacionales
  - Tarifas
  - Políticas específicas
  - Configuraciones
- `createdAt` (datetime)
- `updatedAt` (datetime)

**Relaciones**:
- `hasMany` Taxi
- `hasMany` Driver
- `hasMany` Assignment

---

### 5. Assignment (Asignación de Viaje)

**Propósito**: Representa la asignación de una solicitud a un taxi y conductor específicos.

**Atributos**:
- `id` (UUID): Identificador único
- `passengerRequestId` (UUID): Solicitud asociada
- `taxiId` (UUID): Taxi asignado
- `driverId` (UUID): Conductor asignado
- `fleetOperatorId` (UUID): Operador responsable
- `status` (enum): Estado de la asignación (ver state machine)
- `assignedBy` (string): Quién hizo la asignación
  - `SYSTEM` - Motor automático
  - `OPERATOR:{userId}` - Operador manual
  - `FLEET:{operatorId}` - Central/gremio
- `timestamps` (JSON): Historial de estados
  - `createdAt`: Asignación creada
  - `sentToDriverAt`: Enviada al conductor
  - `acceptedAt`: Aceptada por conductor
  - `rejectedAt`: Rechazada por conductor
  - `enRouteAt`: Conductor en camino
  - `onboardAt`: Pasajero a bordo
  - `completedAt`: Servicio completado
  - `canceledAt`: Cancelado
- `cancellationReason` (text, optional): Motivo de cancelación
- `canceledBy` (enum, optional): Quién canceló
  - `PASSENGER` - Pasajero
  - `DRIVER` - Conductor
  - `OPERATOR` - Operador
  - `SYSTEM` - Sistema (timeout, etc.)
- `fare` (JSON, optional): Información de tarifa
  - `estimatedAmount`: Monto estimado
  - `finalAmount`: Monto final
  - `currency`: Moneda
- `metadata` (JSON): Datos adicionales
- `createdAt` (datetime)
- `updatedAt` (datetime)

**Relaciones**:
- `belongsTo` PassengerRequest
- `belongsTo` Taxi
- `belongsTo` Driver
- `belongsTo` FleetOperator
- `hasMany` AuditLog

---

### 6. AuditLog (Registro de Auditoría)

**Propósito**: Trazabilidad completa de todas las acciones en el sistema.

**Atributos**:
- `id` (UUID): Identificador único
- `entityType` (enum): Tipo de entidad
  - `PASSENGER_REQUEST`
  - `ASSIGNMENT`
  - `TAXI`
  - `DRIVER`
  - `FLEET_OPERATOR`
- `entityId` (UUID): ID de la entidad afectada
- `action` (string): Acción realizada
  - Ejemplos: `created`, `status_changed`, `assigned`, `canceled`
- `performedBy` (string): Quién realizó la acción
  - `SYSTEM`
  - `USER:{userId}`
  - `PASSENGER:{requestId}`
  - `DRIVER:{driverId}`
- `metadata` (JSON): Datos adicionales
  - `previousState`: Estado anterior
  - `newState`: Estado nuevo
  - `ip`: IP del origen
  - `userAgent`: User agent
  - Cualquier dato relevante
- `timestamp` (datetime): Fecha/hora exacta
- `createdAt` (datetime)

**Relaciones**:
- No tiene relaciones directas (es un log puro)
- Se consulta por `entityType` + `entityId`

---

## Relaciones Clave del Dominio

### PassengerRequest → Assignment → Taxi + Driver

```
┌─────────────────┐
│PassengerRequest │
└────────┬────────┘
         │ 1:1
         ▼
    ┌──────────┐
    │Assignment│
    └────┬─────┘
         │
    ┌────┴────────┐
    ▼             ▼
┌──────┐      ┌────────┐
│ Taxi │      │ Driver │
└──┬───┘      └───┬────┘
   │              │
   │   ┌──────────┴──────────┐
   └───▶   FleetOperator     │
       └─────────────────────┘
```

### FleetOperator como núcleo operacional

```
┌──────────────────────┐
│   FleetOperator      │
│  (Gremio/Central)    │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌──────┐      ┌────────┐
│ Taxi │      │ Driver │
└──────┘      └────────┘
    │             │
    └──────┬──────┘
           ▼
      ┌──────────┐
      │Assignment│
      └──────────┘
```

---

## Casos de Uso Principales

### 1. Crear Solicitud de Pasajero

**Actor**: Pasajero (via Web/App)

**Flujo**:
1. Pasajero ingresa origen, destino (opcional), fecha/hora
2. Sistema crea `PassengerRequest` con status `CREATED`
3. Sistema registra `AuditLog` con action `created`
4. PassengerRequest cambia a `PENDING_ASSIGNMENT`

### 2. Asignar Taxi (Manual)

**Actor**: Operador Backoffice

**Flujo**:
1. Operador ve lista de `PassengerRequest` pendientes
2. Selecciona Taxi + Driver disponibles
3. Sistema crea `Assignment` con status `CREATED`
4. Sistema cambia PassengerRequest a `ASSIGNED`
5. Sistema registra AuditLog de la asignación
6. Sistema notifica al conductor (canal TBD)

### 3. Completar Viaje

**Actor**: Conductor (via App) o Operador

**Flujo**:
1. Conductor marca viaje como completado
2. Sistema cambia Assignment a `COMPLETED`
3. Sistema cambia PassengerRequest a `COMPLETED`
4. Sistema registra AuditLog de finalización
5. Sistema libera Taxi (status → `AVAILABLE`)

---

## Restricciones y Reglas de Negocio

### Restricciones de Integridad

1. **Un Assignment solo puede tener un PassengerRequest, Taxi y Driver**
2. **Un PassengerRequest solo puede tener máximo 1 Assignment activo**
3. **Un Taxi no puede tener 2 Assignments activos simultáneos**
4. **Un Driver no puede tener 2 Assignments activos simultáneos**
5. **Un FleetOperator debe estar `isActive=true` para recibir asignaciones**

### Reglas de Validación

1. **Licencia vigente**: Driver solo puede recibir assignments si `licenseValidUntil > hoy`
2. **Taxi disponible**: Solo se pueden asignar Taxis con `operationalStatus = AVAILABLE`
3. **Zona de cobertura**: FleetOperator solo recibe requests en sus `coverageZones`
4. **Horario operacional**: FleetOperator solo activo dentro de `operatingHours`

### Reglas de Cancelación

1. **Pasajero puede cancelar** hasta que Assignment esté en `ONBOARD`
2. **Conductor puede rechazar** solo cuando Assignment está en `SENT_TO_DRIVER`
3. **Operador puede cancelar** en cualquier momento antes de `ONBOARD`
4. **Sistema cancela automáticamente** si no hay assignment en X minutos

---

## Anexos

### Tipos de Datos Comunes

```typescript
// Enums
enum RequestChannel {
  WEB = 'WEB',
  APP_PASSENGER = 'APP_PASSENGER',
  PHONE_CENTRAL = 'PHONE_CENTRAL',
  ENTERPRISE = 'ENTERPRISE',
  BACKOFFICE = 'BACKOFFICE',
}

enum TaxiType {
  STANDARD = 'STANDARD',
  EXECUTIVE = 'EXECUTIVE',
  TOURISM = 'TOURISM',
  VAN = 'VAN',
  LUXURY = 'LUXURY',
  ACCESSIBLE = 'ACCESSIBLE',
}

enum OperationalStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
}

enum FleetOperatorType {
  GUILD = 'GUILD',
  CENTRAL = 'CENTRAL',
  COMPANY = 'COMPANY',
  MUNICIPALITY = 'MUNICIPALITY',
}

// Coordenadas
interface Coordinates {
  lat: number;
  lng: number;
}

// Horario operacional
interface OperatingHours {
  startTime: string; // "08:00"
  endTime: string;   // "22:00"
  days: number[];    // [0,1,2,3,4,5,6] (0=Domingo)
}
```

---

## Próximos Pasos

Este modelo de dominio será la base para:
1. **Definir la máquina de estados** (TAREA OPS-EAT-2)
2. **Diseñar la arquitectura en capas** (TAREA OPS-EAT-3)
3. **Implementar el schema Prisma** cuando se apruebe
4. **Crear los endpoints API** correspondientes

---

**Versión**: 1.0 - Modelo Lógico
**Fecha**: 2025-01-15
**Estado**: Diseño Conceptual (sin implementar)
