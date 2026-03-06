# API Requerida — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Especificación completa

---

## Base URLs

### Desarrollo
```
http://localhost:3000
```

### Staging
```
https://staging-api.etaxi.cl
```

### Producción
```
https://api.etaxi.cl
```

---

## Autenticación

### Headers requeridos

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Formato del JWT token

```json
{
  "passengerId": "cm...",
  "phone": "+56912345678",
  "iat": 1234567890,
  "exp": 1237159890
}
```

### Expiración
- **30 días** desde la emisión
- La app debe renovar automáticamente antes de expirar

---

## Endpoints

### 1. Autenticación

#### 1.1. POST /api/passenger/send-otp

**Descripción**: Envía código OTP por SMS al teléfono del pasajero.

**Request**:
```http
POST /api/passenger/send-otp
Content-Type: application/json

{
  "phone": "+56912345678"
}
```

**Response exitosa** (200):
```json
{
  "success": true,
  "message": "Código enviado exitosamente",
  "otp": "123456"  // Solo en development
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "Número de teléfono inválido"
}
```

429 - Too Many Requests:
```json
{
  "error": "Demasiados intentos. Espera 60 segundos."
}
```

500 - Internal Server Error:
```json
{
  "error": "Error al enviar SMS"
}
```

---

#### 1.2. POST /api/passenger/verify-otp

**Descripción**: Verifica el código OTP y retorna JWT token.

**Request**:
```http
POST /api/passenger/verify-otp
Content-Type: application/json

{
  "phone": "+56912345678",
  "otp": "123456"
}
```

**Response exitosa** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "passenger": {
    "id": "cm1234567890",
    "phone": "+56912345678",
    "name": "María Silva",
    "email": "maria@example.com",
    "createdAt": "2024-11-16T10:30:00.000Z"
  }
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "Código incorrecto o expirado"
}
```

429 - Too Many Requests:
```json
{
  "error": "Demasiados intentos. Inténtalo más tarde."
}
```

---

### 2. Solicitud de taxi

#### 2.1. POST /api/passenger/create-request

**Descripción**: Crea una nueva solicitud de taxi.

**Request**:
```http
POST /api/passenger/create-request
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickupAddress": "Av. Providencia 1234, Santiago",
  "pickupLat": -33.4489,
  "pickupLng": -70.6693,
  "dropoffAddress": "Av. Apoquindo 5678, Las Condes",
  "dropoffLat": -33.4150,
  "dropoffLng": -70.5475,
  "taxiType": "BASIC",
  "notes": "Llevo mascota"
}
```

**Campos obligatorios**:
- `pickupAddress`: string
- `pickupLat`: number (-90 a 90)
- `pickupLng`: number (-180 a 180)
- `taxiType`: enum ["BASIC", "EXECUTIVE", "TOURISM", "VAN", "LUXURY"]

**Campos opcionales**:
- `dropoffAddress`: string
- `dropoffLat`: number
- `dropoffLng`: number
- `notes`: string (max 200 caracteres)

**Response exitosa** (201):
```json
{
  "requestId": "cm1234567890",
  "status": "WAITING_FOR_ASSIGNMENT",
  "createdAt": "2024-11-16T14:30:00.000Z"
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "Dirección de origen requerida"
}
```

401 - Unauthorized:
```json
{
  "error": "Token inválido o expirado"
}
```

409 - Conflict:
```json
{
  "error": "Ya tienes una solicitud activa"
}
```

---

#### 2.2. GET /api/passenger/request/:id

**Descripción**: Obtiene el estado de una solicitud de taxi.

**Request**:
```http
GET /api/passenger/request/cm1234567890
Authorization: Bearer <token>
```

**Response exitosa** (200):
```json
{
  "id": "cm1234567890",
  "status": "ASSIGNED",
  "pickupAddress": "Av. Providencia 1234, Santiago",
  "pickupLat": -33.4489,
  "pickupLng": -70.6693,
  "dropoffAddress": "Av. Apoquindo 5678, Las Condes",
  "dropoffLat": -33.4150,
  "dropoffLng": -70.5475,
  "taxiType": "BASIC",
  "notes": "Llevo mascota",
  "createdAt": "2024-11-16T14:30:00.000Z",
  "assignmentId": "cm0987654321"
}
```

**Estados posibles**:
- `WAITING_FOR_ASSIGNMENT` - Esperando asignación
- `ASSIGNED` - Asignado a un conductor
- `CANCELED` - Cancelado
- `EXPIRED` - Expiró (sin taxis disponibles)

**Errores**:

404 - Not Found:
```json
{
  "error": "Solicitud no encontrada"
}
```

403 - Forbidden:
```json
{
  "error": "No tienes permiso para ver esta solicitud"
}
```

---

#### 2.3. POST /api/passenger/request/:id/cancel

**Descripción**: Cancela una solicitud de taxi.

**Request**:
```http
POST /api/passenger/request/cm1234567890/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Ya no necesito el taxi"
}
```

**Campos opcionales**:
- `reason`: string (max 200 caracteres)

**Response exitosa** (200):
```json
{
  "success": true,
  "message": "Solicitud cancelada exitosamente"
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "No puedes cancelar un viaje que ya inició"
}
```

404 - Not Found:
```json
{
  "error": "Solicitud no encontrada"
}
```

---

### 3. Asignación

#### 3.1. GET /api/passenger/assignment/:id

**Descripción**: Obtiene los detalles completos de una asignación (conductor, taxi, operador).

**Request**:
```http
GET /api/passenger/assignment/cm0987654321
Authorization: Bearer <token>
```

**Response exitosa** (200):
```json
{
  "id": "cm0987654321",
  "status": "DRIVER_EN_ROUTE",
  "driver": {
    "id": "cm_driver_001",
    "fullName": "Juan Pérez González",
    "phone": "+56987654321",
    "photo": "https://storage.etaxi.cl/drivers/photo_001.jpg",
    "professionalLicense": "A1-12345678",
    "rating": 4.8,
    "totalTrips": 1250
  },
  "taxi": {
    "id": "cm_taxi_001",
    "licensePlate": "AB-1234",
    "type": "BASIC",
    "brand": "Nissan",
    "model": "Sentra",
    "year": 2020,
    "color": "Blanco"
  },
  "operator": {
    "id": "cm_operator_001",
    "name": "Gremio Taxis Santiago Centro",
    "city": "SANTIAGO"
  },
  "estimatedArrival": "2024-11-16T14:35:00.000Z",
  "assignedAt": "2024-11-16T14:30:15.000Z",
  "acceptedAt": "2024-11-16T14:30:45.000Z",
  "startedAt": null,
  "completedAt": null
}
```

**Estados posibles**:
- `SENT_TO_DRIVER` - Enviado al conductor
- `ACCEPTED_BY_DRIVER` - Aceptado por conductor
- `DRIVER_EN_ROUTE` - Conductor en camino
- `PASSENGER_ONBOARD` - Pasajero a bordo
- `COMPLETED` - Completado
- `CANCELED` - Cancelado
- `REJECTED_BY_DRIVER` - Rechazado por conductor

**Errores**:

404 - Not Found:
```json
{
  "error": "Asignación no encontrada"
}
```

403 - Forbidden:
```json
{
  "error": "No tienes permiso para ver esta asignación"
}
```

---

### 4. Tracking GPS

#### 4.1. GET /api/passenger/tracking/:assignmentId

**Descripción**: Obtiene la posición GPS actual del conductor asignado.

**Request**:
```http
GET /api/passenger/tracking/cm0987654321
Authorization: Bearer <token>
```

**Response exitosa** (200):
```json
{
  "lat": -33.4489,
  "lng": -70.6693,
  "heading": 180,
  "speed": 45,
  "updatedAt": "2024-11-16T14:32:15.000Z"
}
```

**Campos**:
- `lat`: Latitud (-90 a 90)
- `lng`: Longitud (-180 a 180)
- `heading`: Dirección del vehículo en grados (0-360), opcional
- `speed`: Velocidad en km/h, opcional
- `updatedAt`: Timestamp de la última actualización

**Errores**:

404 - Not Found:
```json
{
  "error": "No hay posición GPS disponible"
}
```

410 - Gone:
```json
{
  "error": "El viaje ya finalizó"
}
```

---

### 5. Historial

#### 5.1. GET /api/passenger/history

**Descripción**: Obtiene el historial de viajes del pasajero.

**Request**:
```http
GET /api/passenger/history?limit=20&offset=0&from=2024-01-01&to=2024-12-31
Authorization: Bearer <token>
```

**Query parameters**:
- `limit`: número de viajes a retornar (default: 20, max: 100)
- `offset`: número de viajes a saltar (default: 0)
- `from`: fecha inicial (ISO 8601), opcional
- `to`: fecha final (ISO 8601), opcional

**Response exitosa** (200):
```json
{
  "trips": [
    {
      "id": "cm_trip_001",
      "requestId": "cm_req_001",
      "assignmentId": "cm_assign_001",
      "pickupAddress": "Av. Providencia 1234",
      "dropoffAddress": "Av. Apoquindo 5678",
      "status": "COMPLETED",
      "driver": {
        "fullName": "Juan Pérez",
        "photo": "https://..."
      },
      "taxi": {
        "licensePlate": "AB-1234"
      },
      "createdAt": "2024-11-15T14:30:00.000Z",
      "completedAt": "2024-11-15T15:00:00.000Z",
      "rating": 5,
      "distance": 8.5,
      "duration": 1800
    },
    {
      "id": "cm_trip_002",
      "requestId": "cm_req_002",
      "assignmentId": "cm_assign_002",
      "pickupAddress": "Mall Plaza",
      "dropoffAddress": "Aeropuerto",
      "status": "COMPLETED",
      "driver": {
        "fullName": "Carlos Silva",
        "photo": null
      },
      "taxi": {
        "licensePlate": "CD-5678"
      },
      "createdAt": "2024-11-14T09:15:00.000Z",
      "completedAt": "2024-11-14T10:00:00.000Z",
      "rating": null,
      "distance": 18.2,
      "duration": 2700
    }
  ],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

**Campos de cada trip**:
- `distance`: Distancia en km, opcional
- `duration`: Duración en segundos, opcional
- `rating`: Calificación dada (1-5), null si no calificó

**Errores**:

400 - Bad Request:
```json
{
  "error": "Parámetros inválidos"
}
```

---

### 6. Calificaciones

#### 6.1. POST /api/passenger/rating

**Descripción**: Califica un viaje completado.

**Request**:
```http
POST /api/passenger/rating
Authorization: Bearer <token>
Content-Type: application/json

{
  "assignmentId": "cm0987654321",
  "rating": 5,
  "comment": "Excelente servicio, muy amable el conductor"
}
```

**Campos obligatorios**:
- `assignmentId`: string
- `rating`: number (1-5)

**Campos opcionales**:
- `comment`: string (max 500 caracteres)

**Response exitosa** (201):
```json
{
  "success": true,
  "message": "Gracias por tu calificación"
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "Calificación debe ser entre 1 y 5"
}
```

409 - Conflict:
```json
{
  "error": "Ya calificaste este viaje"
}
```

422 - Unprocessable Entity:
```json
{
  "error": "Solo puedes calificar viajes completados"
}
```

---

### 7. Perfil

#### 7.1. GET /api/passenger/profile

**Descripción**: Obtiene el perfil del pasajero.

**Request**:
```http
GET /api/passenger/profile
Authorization: Bearer <token>
```

**Response exitosa** (200):
```json
{
  "id": "cm1234567890",
  "phone": "+56912345678",
  "name": "María Silva",
  "email": "maria@example.com",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "stats": {
    "totalTrips": 15,
    "averageRating": 4.8,
    "lastTripAt": "2024-11-15T15:00:00.000Z"
  }
}
```

---

#### 7.2. PATCH /api/passenger/profile

**Descripción**: Actualiza el perfil del pasajero.

**Request**:
```http
PATCH /api/passenger/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "María Silva García",
  "email": "maria.silva@example.com"
}
```

**Campos opcionales**:
- `name`: string (max 100 caracteres)
- `email`: string (formato email válido)

**Response exitosa** (200):
```json
{
  "success": true,
  "passenger": {
    "id": "cm1234567890",
    "phone": "+56912345678",
    "name": "María Silva García",
    "email": "maria.silva@example.com",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Errores**:

400 - Bad Request:
```json
{
  "error": "Email inválido"
}
```

---

## Códigos de estado HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | Request exitoso |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Parámetros inválidos |
| 401 | Unauthorized | Token inválido o expirado |
| 403 | Forbidden | No tiene permisos para este recurso |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto con estado actual (ej: solicitud duplicada) |
| 410 | Gone | Recurso ya no disponible (ej: viaje finalizado) |
| 422 | Unprocessable Entity | Datos válidos pero acción no permitida |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error del servidor |
| 503 | Service Unavailable | Servicio temporalmente no disponible |

---

## Rate Limiting

### Límites por endpoint

| Endpoint | Límite | Ventana de tiempo |
|----------|--------|-------------------|
| POST /send-otp | 3 requests | 1 minuto |
| POST /verify-otp | 5 requests | 5 minutos |
| POST /create-request | 10 requests | 1 minuto |
| GET /tracking/:id | 120 requests | 1 minuto |
| Otros GET | 60 requests | 1 minuto |
| Otros POST | 30 requests | 1 minuto |

### Headers de rate limit

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1634567890
Retry-After: 45
```

---

## Manejo de errores

### Formato estándar de error

```json
{
  "error": "Mensaje de error legible para el usuario",
  "code": "ERROR_CODE_INTERNAL",
  "details": {
    "field": "email",
    "reason": "invalid_format"
  }
}
```

### Códigos de error comunes

| Código | Descripción |
|--------|-------------|
| `INVALID_PHONE` | Formato de teléfono inválido |
| `INVALID_OTP` | Código OTP incorrecto |
| `OTP_EXPIRED` | Código OTP expirado |
| `TOKEN_EXPIRED` | JWT token expirado |
| `TOKEN_INVALID` | JWT token inválido |
| `ACTIVE_REQUEST_EXISTS` | Ya tiene solicitud activa |
| `NO_TAXIS_AVAILABLE` | No hay taxis disponibles |
| `REQUEST_NOT_FOUND` | Solicitud no encontrada |
| `ASSIGNMENT_NOT_FOUND` | Asignación no encontrada |
| `CANNOT_CANCEL` | No puede cancelar en este estado |
| `ALREADY_RATED` | Ya calificó este viaje |
| `RATE_LIMIT_EXCEEDED` | Límite de requests excedido |

---

## Versionamiento

### Header de versión

```http
Accept: application/vnd.etaxi.v1+json
```

### URL versionada (alternativa)

```
https://api.etaxi.cl/v1/passenger/create-request
```

**Versión actual**: v1

---

## Paginación

Para endpoints que retornan listas:

### Request

```http
GET /api/passenger/history?limit=20&offset=40
```

### Response

```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}
```

---

## Webhooks (futuro)

Para notificar cambios de estado sin polling:

### Eventos posibles

- `assignment.created` - Nueva asignación
- `assignment.updated` - Cambio de estado
- `assignment.completed` - Viaje completado
- `assignment.canceled` - Viaje cancelado

### Payload ejemplo

```json
{
  "event": "assignment.updated",
  "timestamp": "2024-11-16T14:35:00.000Z",
  "data": {
    "assignmentId": "cm0987654321",
    "status": "DRIVER_EN_ROUTE"
  }
}
```

---

**Fin del documento**
