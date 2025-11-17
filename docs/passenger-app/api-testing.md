# Testing de API Pasajero — Ejemplos con curl

**Fecha**: 2025-11-16
**Versión**: 1.0

---

## Setup inicial

### 1. Iniciar backend

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
npm run dev
```

**Verificar**: http://localhost:3000 debe estar accesible

### 2. Variables de entorno

```bash
# Base URL
export API_URL="http://localhost:3000"

# Se obtendrá después del login
export TOKEN=""
```

---

## Flujo completo de testing

### PASO 1: Solicitar OTP

```bash
curl -X POST http://localhost:3000/api/passenger/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+56912345678"
  }'
```

**Response esperada** (200):
```json
{
  "success": true,
  "message": "Código enviado exitosamente",
  "otp": "123456"
}
```

**Nota**: En development, el OTP se retorna en la respuesta. En producción se envía por SMS.

---

### PASO 2: Verificar OTP y obtener token

```bash
curl -X POST http://localhost:3000/api/passenger/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+56912345678",
    "otp": "123456"
  }'
```

**Response esperada** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "passenger": {
    "id": "cm1234567890",
    "phone": "+56912345678",
    "name": null,
    "email": null,
    "createdAt": "2024-11-16T10:00:00.000Z"
  }
}
```

**Guardar el token**:
```bash
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### PASO 3: Obtener perfil

```bash
curl http://localhost:3000/api/passenger/profile \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "id": "cm1234567890",
  "phone": "+56912345678",
  "name": null,
  "email": null,
  "createdAt": "2024-11-16T10:00:00.000Z",
  "stats": {
    "totalTrips": 0,
    "averageRating": null,
    "lastTripAt": null
  }
}
```

---

### PASO 4: Actualizar perfil

```bash
curl -X PATCH http://localhost:3000/api/passenger/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María Silva",
    "email": "maria@example.com"
  }'
```

**Response esperada** (200):
```json
{
  "success": true,
  "passenger": {
    "id": "cm1234567890",
    "phone": "+56912345678",
    "name": "María Silva",
    "email": "maria@example.com",
    "createdAt": "2024-11-16T10:00:00.000Z"
  }
}
```

---

### PASO 5: Crear solicitud de taxi

```bash
curl -X POST http://localhost:3000/api/passenger/create-request \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupAddress": "Av. Providencia 1234, Santiago",
    "pickupLat": -33.4489,
    "pickupLng": -70.6693,
    "dropoffAddress": "Av. Apoquindo 5678, Las Condes",
    "dropoffLat": -33.4150,
    "dropoffLng": -70.5475,
    "taxiType": "BASIC",
    "notes": "Llevo mascota"
  }'
```

**Response esperada** (201):
```json
{
  "requestId": "cm_req_001",
  "status": "PENDING_ASSIGNMENT",
  "createdAt": "2024-11-16T14:30:00.000Z"
}
```

**Guardar el requestId**:
```bash
export REQUEST_ID="cm_req_001"
```

---

### PASO 6: Consultar estado de solicitud

```bash
curl http://localhost:3000/api/passenger/request/$REQUEST_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "id": "cm_req_001",
  "status": "PENDING_ASSIGNMENT",
  "pickupAddress": "Av. Providencia 1234, Santiago",
  "pickupLat": -33.4489,
  "pickupLng": -70.6693,
  "dropoffAddress": "Av. Apoquindo 5678, Las Condes",
  "dropoffLat": -33.4150,
  "dropoffLng": -70.5475,
  "taxiType": "BASIC",
  "notes": "Llevo mascota",
  "createdAt": "2024-11-16T14:30:00.000Z",
  "assignmentId": null
}
```

---

### PASO 7: Simular asignación (desde backoffice)

**Nota**: Este paso normalmente lo hace un operador desde el backoffice. Para testing, puedes crear manualmente en Prisma Studio o ejecutar:

```bash
DATABASE_URL="file:./dev.db" npx tsx scripts/create-test-assignment.ts
```

**Esto crea**:
- Un conductor de prueba
- Un taxi disponible
- Una asignación vinculada a tu solicitud

---

### PASO 8: Consultar solicitud con asignación

```bash
curl http://localhost:3000/api/passenger/request/$REQUEST_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "id": "cm_req_001",
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
  "assignmentId": "cm_assign_001"
}
```

**Guardar el assignmentId**:
```bash
export ASSIGNMENT_ID="cm_assign_001"
```

---

### PASO 9: Obtener detalles de la asignación

```bash
curl http://localhost:3000/api/passenger/assignment/$ASSIGNMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "id": "cm_assign_001",
  "status": "SENT_TO_DRIVER",
  "driver": {
    "id": "cm_driver_001",
    "fullName": "Conductor Demo",
    "phone": "+56987654321",
    "photo": null,
    "professionalLicense": "A1-12345678",
    "rating": 4.8
  },
  "taxi": {
    "id": "cm_taxi_001",
    "licensePlate": "AB-1234",
    "type": "BASIC",
    "brand": null,
    "model": null,
    "color": null
  },
  "operator": {
    "id": "cm_operator_001",
    "name": "Operador Demo",
    "city": "SANTIAGO"
  },
  "estimatedArrival": null,
  "assignedAt": "2024-11-16T14:30:15.000Z",
  "acceptedAt": null,
  "startedAt": null,
  "completedAt": null
}
```

---

### PASO 10: Obtener tracking GPS

**Nota**: Primero necesitas que el conductor envíe su posición. Esto se hace desde la app conductor o manualmente:

```sql
-- Insertar posición GPS manualmente en Prisma Studio
INSERT INTO driver_positions (id, createdAt, updatedAt, driverId, lat, lng, heading, speed)
VALUES ('cm_pos_001', datetime('now'), datetime('now'), 'cm_driver_001', -33.4489, -70.6693, 180, 45);
```

```bash
curl http://localhost:3000/api/passenger/tracking/$ASSIGNMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "lat": -33.4489,
  "lng": -70.6693,
  "heading": 180,
  "speed": 45,
  "updatedAt": "2024-11-16T14:32:15.000Z"
}
```

---

### PASO 11: Cancelar solicitud (opcional)

```bash
curl -X POST http://localhost:3000/api/passenger/request/$REQUEST_ID/cancel \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Ya no necesito el taxi"
  }'
```

**Response esperada** (200):
```json
{
  "success": true,
  "message": "Solicitud cancelada exitosamente"
}
```

---

### PASO 12: Marcar viaje como completado (desde conductor)

**Nota**: Esto lo hace el conductor desde su app. Para testing, actualiza manualmente:

```sql
-- Actualizar estado a COMPLETED en Prisma Studio
UPDATE assignments SET status = 'COMPLETED', completedAt = datetime('now') WHERE id = 'cm_assign_001';
UPDATE passenger_requests SET status = 'COMPLETED' WHERE id = 'cm_req_001';
```

---

### PASO 13: Calificar el viaje

```bash
curl -X POST http://localhost:3000/api/passenger/rating \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assignmentId": "cm_assign_001",
    "rating": 5,
    "comment": "Excelente servicio, muy amable el conductor"
  }'
```

**Response esperada** (201):
```json
{
  "success": true,
  "message": "Gracias por tu calificación"
}
```

---

### PASO 14: Ver historial de viajes

```bash
curl "http://localhost:3000/api/passenger/history?limit=20&offset=0" \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (200):
```json
{
  "trips": [
    {
      "id": "cm_req_001",
      "requestId": "cm_req_001",
      "assignmentId": "cm_assign_001",
      "pickupAddress": "Av. Providencia 1234, Santiago",
      "dropoffAddress": "Av. Apoquindo 5678, Las Condes",
      "status": "COMPLETED",
      "driver": {
        "fullName": "Conductor Demo",
        "photo": null
      },
      "taxi": {
        "licensePlate": "AB-1234"
      },
      "createdAt": "2024-11-16T14:30:00.000Z",
      "completedAt": "2024-11-16T15:00:00.000Z",
      "rating": 5,
      "distance": null,
      "duration": 1800
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

---

## Testing de errores

### Error 1: Teléfono inválido

```bash
curl -X POST http://localhost:3000/api/passenger/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "123456"
  }'
```

**Response esperada** (400):
```json
{
  "error": "Número de teléfono inválido. Debe ser formato chileno (+569XXXXXXXX)"
}
```

---

### Error 2: OTP incorrecto

```bash
curl -X POST http://localhost:3000/api/passenger/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+56912345678",
    "otp": "000000"
  }'
```

**Response esperada** (400):
```json
{
  "error": "Código incorrecto o expirado"
}
```

---

### Error 3: Token inválido

```bash
curl http://localhost:3000/api/passenger/profile \
  -H "Authorization: Bearer invalid_token_here"
```

**Response esperada** (401):
```json
{
  "error": "Token inválido o expirado"
}
```

---

### Error 4: Solicitud activa duplicada

```bash
# Intentar crear segunda solicitud sin completar la primera
curl -X POST http://localhost:3000/api/passenger/create-request \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupAddress": "Otra dirección",
    "pickupLat": -33.4489,
    "pickupLng": -70.6693,
    "taxiType": "EXECUTIVE"
  }'
```

**Response esperada** (409):
```json
{
  "error": "Ya tienes una solicitud activa"
}
```

---

### Error 5: Calificación duplicada

```bash
# Intentar calificar el mismo viaje dos veces
curl -X POST http://localhost:3000/api/passenger/rating \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assignmentId": "cm_assign_001",
    "rating": 4
  }'
```

**Response esperada** (409):
```json
{
  "error": "Ya calificaste este viaje"
}
```

---

### Error 6: Tracking de viaje finalizado

```bash
# Intentar obtener tracking de un viaje completado
curl http://localhost:3000/api/passenger/tracking/$ASSIGNMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response esperada** (410):
```json
{
  "error": "El viaje ya finalizó"
}
```

---

## Rate Limiting

### Test: Exceder límite de OTP

```bash
# Enviar 4 requests en menos de 1 minuto
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/passenger/send-otp \
    -H "Content-Type: application/json" \
    -d '{"phone": "+56912345678"}'
  echo ""
done
```

**Response esperada en el 4to request** (429):
```json
{
  "error": "Rate limit exceeded. Try again in 45 seconds.",
  "retryAfter": 45
}
```

**Headers**:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 45
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 0
```

---

## Scripts de automatización

### Script completo de testing

```bash
#!/bin/bash

API_URL="http://localhost:3000"

echo "=== Test 1: Send OTP ==="
OTP_RESPONSE=$(curl -s -X POST $API_URL/api/passenger/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+56912345678"}')
echo $OTP_RESPONSE

OTP=$(echo $OTP_RESPONSE | jq -r '.otp')
echo "OTP: $OTP"

echo ""
echo "=== Test 2: Verify OTP ==="
TOKEN_RESPONSE=$(curl -s -X POST $API_URL/api/passenger/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"+56912345678\", \"otp\": \"$OTP\"}")
echo $TOKEN_RESPONSE

TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

echo ""
echo "=== Test 3: Get Profile ==="
curl -s $API_URL/api/passenger/profile \
  -H "Authorization: Bearer $TOKEN" | jq

echo ""
echo "=== Test 4: Create Request ==="
REQUEST_RESPONSE=$(curl -s -X POST $API_URL/api/passenger/create-request \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupAddress": "Av. Providencia 1234",
    "pickupLat": -33.4489,
    "pickupLng": -70.6693,
    "taxiType": "BASIC"
  }')
echo $REQUEST_RESPONSE | jq

REQUEST_ID=$(echo $REQUEST_RESPONSE | jq -r '.requestId')
echo "Request ID: $REQUEST_ID"

echo ""
echo "=== Test 5: Get Request Status ==="
curl -s $API_URL/api/passenger/request/$REQUEST_ID \
  -H "Authorization: Bearer $TOKEN" | jq

echo ""
echo "=== Test 6: Cancel Request ==="
curl -s -X POST $API_URL/api/passenger/request/$REQUEST_ID/cancel \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "Test cancelado"}' | jq

echo ""
echo "=== All tests completed ==="
```

**Uso**:
```bash
chmod +x test-passenger-api.sh
./test-passenger-api.sh
```

---

## Postman Collection

### Importar en Postman

```json
{
  "info": {
    "name": "ETAXI Passenger API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "1. Send OTP",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"phone\": \"+56912345678\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": "{{baseUrl}}/api/passenger/send-otp"
      }
    },
    {
      "name": "2. Verify OTP",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"phone\": \"+56912345678\",\n  \"otp\": \"123456\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": "{{baseUrl}}/api/passenger/verify-otp"
      }
    }
  ]
}
```

---

**Fin del documento**
