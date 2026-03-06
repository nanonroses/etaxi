# ESPECIFICACIÓN DE API — APP CONDUCTOR ETAXI MVP

## Versión: 1.0
## Fecha: 2025-01-15
## Estado: Especificación Técnica

---

## Base URL

```
Development: http://localhost:3000
Production:  https://api.etaxi.cl
```

---

## Autenticación

### Método
**JWT (JSON Web Token)** enviado en header `Authorization`.

### Header Format
```
Authorization: Bearer <jwt_token>
```

### Token Payload
```json
{
  "driverId": "clx1234567890",
  "operatorId": "clx0987654321",
  "iat": 1705334400,
  "exp": 1705420800
}
```

### Token Expiration
- **Development**: 7 días
- **Production**: 24 horas
- **Refresh**: Auto-renovación al hacer request (futuro)

---

## ENDPOINT 1: Login de Conductor

### POST /api/driver/login

Autentica al conductor y emite un JWT.

#### Request

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "phoneOrEmail": "string",
  "password": "string"
}
```

**Ejemplo**:
```json
{
  "phoneOrEmail": "+56912345678",
  "password": "mySecurePassword123"
}
```

**Validaciones**:
- `phoneOrEmail`: Requerido, debe ser teléfono válido o email válido
- `password`: Requerido, mínimo 4 caracteres

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "driver": {
    "id": "clx1234567890",
    "fullName": "Juan Pérez González",
    "phone": "+56912345678",
    "email": "juan.perez@example.com",
    "isEnabled": true,
    "fleetOperatorId": "clx0987654321",
    "fleetOperator": {
      "id": "clx0987654321",
      "name": "Central Taxis Santiago",
      "type": "CENTRAL",
      "city": "Santiago"
    },
    "taxis": [
      {
        "id": "clxtaxi123",
        "licensePlate": "ABC-123",
        "type": "STANDARD",
        "city": "Santiago"
      }
    ]
  }
}
```

**Error: Credenciales incorrectas (401)**:
```json
{
  "ok": false,
  "error": "Credenciales incorrectas"
}
```

**Error: Conductor deshabilitado (403)**:
```json
{
  "ok": false,
  "error": "Conductor deshabilitado. Contacte a su operador."
}
```

**Error: Validación (400)**:
```json
{
  "ok": false,
  "error": "Teléfono o email y contraseña son requeridos"
}
```

#### Implementación Backend

```typescript
// app/api/driver/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { phoneOrEmail, password } = await req.json();

    // Validaciones
    if (!phoneOrEmail || !password) {
      return NextResponse.json(
        { ok: false, error: 'Teléfono o email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar conductor por teléfono o email
    const driver = await prisma.driver.findFirst({
      where: {
        OR: [
          { phone: phoneOrEmail },
          { email: phoneOrEmail },
        ],
      },
      include: {
        fleetOperator: true,
        // Asumir relación Driver -< Taxi (un driver puede tener múltiples taxis)
        // O ajustar según tu modelo real
      },
    });

    if (!driver) {
      return NextResponse.json(
        { ok: false, error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Verificar contraseña (asumiendo que Driver tiene campo password hasheado)
    // Nota: Actualmente el modelo Driver no tiene password, necesitas agregarlo
    const passwordMatch = await bcrypt.compare(password, driver.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { ok: false, error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Verificar que el conductor esté habilitado
    if (!driver.isEnabled) {
      return NextResponse.json(
        { ok: false, error: 'Conductor deshabilitado. Contacte a su operador.' },
        { status: 403 }
      );
    }

    // Generar JWT
    const token = jwt.sign(
      {
        driverId: driver.id,
        operatorId: driver.fleetOperatorId,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Retornar token y datos del conductor
    return NextResponse.json({
      ok: true,
      token,
      driver: {
        id: driver.id,
        fullName: driver.fullName,
        phone: driver.phone,
        email: driver.email,
        isEnabled: driver.isEnabled,
        fleetOperatorId: driver.fleetOperatorId,
        fleetOperator: driver.fleetOperator,
        taxis: driver.taxis, // Ajustar según modelo
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## ENDPOINT 2: Obtener Perfil del Conductor

### GET /api/driver/me

Retorna la información del conductor autenticado.

#### Request

**Headers**:
```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "driver": {
    "id": "clx1234567890",
    "fullName": "Juan Pérez González",
    "phone": "+56912345678",
    "email": "juan.perez@example.com",
    "professionalLicense": "12345678-9",
    "licenseValidUntil": "2025-12-31T23:59:59.000Z",
    "isEnabled": true,
    "fleetOperator": {
      "id": "clx0987654321",
      "name": "Central Taxis Santiago",
      "type": "CENTRAL",
      "city": "Santiago"
    },
    "taxis": [
      {
        "id": "clxtaxi123",
        "licensePlate": "ABC-123",
        "type": "STANDARD",
        "city": "Santiago"
      }
    ]
  }
}
```

**Error: No autorizado (401)**:
```json
{
  "ok": false,
  "error": "No autorizado"
}
```

#### Implementación Backend

```typescript
// app/api/driver/me/route.ts
import { NextResponse } from 'next/server';
import { verifyDriverToken } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Verificar JWT y obtener driverId
    const payload = await verifyDriverToken(req);
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const driver = await prisma.driver.findUnique({
      where: { id: payload.driverId },
      include: {
        fleetOperator: true,
        // taxis relación
      },
    });

    if (!driver) {
      return NextResponse.json(
        { ok: false, error: 'Conductor no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      driver,
    });
  } catch (error) {
    console.error('Get driver error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## ENDPOINT 3: Listar Asignaciones del Conductor

### GET /api/driver/assignments

Retorna todas las asignaciones activas del conductor (estados no finales).

#### Request

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Params** (opcionales):
- `status`: Filtrar por estado específico (ej: `SENT_TO_DRIVER`)
- `limit`: Número máximo de resultados (default: 50)

**Ejemplo**:
```
GET /api/driver/assignments?status=SENT_TO_DRIVER&limit=10
```

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "count": 3,
  "assignments": [
    {
      "id": "clxassign1",
      "status": "SENT_TO_DRIVER",
      "createdAt": "2025-01-15T10:15:00.000Z",
      "sentToDriverAt": "2025-01-15T10:16:00.000Z",
      "passengerRequest": {
        "id": "clxreq1",
        "passengerName": "Juan Pérez",
        "passengerPhone": "+56998877665",
        "originAddress": "Av. Providencia 1234, Santiago",
        "destinationAddress": "Aeropuerto SCL, Pudahuel",
        "scheduledFor": null,
        "notes": "Equipaje grande",
        "channel": "WEB"
      },
      "taxi": {
        "licensePlate": "ABC-123",
        "type": "STANDARD"
      }
    },
    {
      "id": "clxassign2",
      "status": "ACCEPTED_BY_DRIVER",
      "createdAt": "2025-01-15T09:30:00.000Z",
      "acceptedAt": "2025-01-15T09:32:00.000Z",
      "enRouteAt": "2025-01-15T09:32:00.000Z",
      "passengerRequest": {
        "id": "clxreq2",
        "passengerName": "María González",
        "passengerPhone": "+56987654321",
        "originAddress": "Las Condes 5678, Santiago",
        "destinationAddress": null,
        "scheduledFor": null,
        "notes": null,
        "channel": "PHONE_CENTRAL"
      },
      "taxi": {
        "licensePlate": "ABC-123",
        "type": "STANDARD"
      }
    }
  ]
}
```

**Error: No autorizado (401)**:
```json
{
  "ok": false,
  "error": "No autorizado"
}
```

#### Implementación Backend

```typescript
// app/api/driver/assignments/route.ts
import { NextResponse } from 'next/server';
import { verifyDriverToken } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const payload = await verifyDriverToken(req);
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Construir filtros
    const where: any = {
      driverId: payload.driverId,
      status: {
        notIn: ['COMPLETED', 'CANCELED', 'REJECTED_BY_DRIVER'],
      },
    };

    if (status) {
      where.status = status;
    }

    const assignments = await prisma.assignment.findMany({
      where,
      include: {
        passengerRequest: true,
        taxi: {
          select: {
            licensePlate: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json({
      ok: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## ENDPOINT 4: Obtener Detalle de Asignación

### GET /api/driver/assignments/:id

Retorna el detalle completo de una asignación específica.

#### Request

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Path Params**:
- `id`: ID del Assignment

**Ejemplo**:
```
GET /api/driver/assignments/clxassign1
```

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "assignment": {
    "id": "clxassign1",
    "status": "SENT_TO_DRIVER",
    "assignedBy": "OPERATOR:admin@etaxi.cl",
    "createdAt": "2025-01-15T10:15:00.000Z",
    "sentToDriverAt": "2025-01-15T10:16:00.000Z",
    "acceptedAt": null,
    "enRouteAt": null,
    "onboardAt": null,
    "completedAt": null,
    "canceledAt": null,
    "estimatedFare": null,
    "finalFare": null,
    "passengerRequest": {
      "id": "clxreq1",
      "passengerName": "Juan Pérez",
      "passengerPhone": "+56998877665",
      "passengerEmail": "juan@example.com",
      "originAddress": "Av. Providencia 1234, Santiago",
      "destinationAddress": "Aeropuerto SCL, Pudahuel",
      "scheduledFor": null,
      "notes": "Equipaje grande. Por favor llegar con tiempo.",
      "channel": "WEB",
      "status": "ASSIGNED"
    },
    "taxi": {
      "id": "clxtaxi123",
      "licensePlate": "ABC-123",
      "type": "STANDARD",
      "city": "Santiago"
    },
    "driver": {
      "id": "clxdriver1",
      "fullName": "Juan Pérez González",
      "phone": "+56912345678"
    },
    "fleetOperator": {
      "id": "clxoperator1",
      "name": "Central Taxis Santiago",
      "type": "CENTRAL"
    }
  }
}
```

**Error: No encontrado (404)**:
```json
{
  "ok": false,
  "error": "Asignación no encontrada"
}
```

**Error: No autorizado (403)**:
```json
{
  "ok": false,
  "error": "No tienes permiso para ver esta asignación"
}
```

#### Implementación Backend

```typescript
// app/api/driver/assignments/[id]/route.ts
import { NextResponse } from 'next/server';
import { verifyDriverToken } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await verifyDriverToken(req);
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        passengerRequest: true,
        taxi: true,
        driver: {
          select: {
            id: true,
            fullName: true,
            phone: true,
          },
        },
        fleetOperator: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { ok: false, error: 'Asignación no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que la asignación pertenece a este conductor
    if (assignment.driverId !== payload.driverId) {
      return NextResponse.json(
        { ok: false, error: 'No tienes permiso para ver esta asignación' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      assignment,
    });
  } catch (error) {
    console.error('Get assignment detail error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## ENDPOINT 5: Cambiar Estado de Asignación

### POST /api/driver/assignments/:id/state

Permite al conductor cambiar el estado de su asignación.

#### Request

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Path Params**:
- `id`: ID del Assignment

**Body**:
```json
{
  "newState": "string",
  "cancellationReason": "string (opcional, requerido si newState=CANCELED)"
}
```

**Ejemplo - Aceptar servicio**:
```json
{
  "newState": "ACCEPTED_BY_DRIVER"
}
```

**Ejemplo - Cancelar**:
```json
{
  "newState": "CANCELED",
  "cancellationReason": "Problema mecánico con el vehículo"
}
```

**Estados permitidos desde la app**:
- `ACCEPTED_BY_DRIVER` (desde `SENT_TO_DRIVER`)
- `REJECTED_BY_DRIVER` (desde `SENT_TO_DRIVER`)
- `CANCELED` (desde cualquier estado pre-COMPLETED)

**Nota**: Los estados `DRIVER_EN_ROUTE`, `PASSENGER_ONBOARD`, `COMPLETED` también son permitidos pero automáticamente se setean al aceptar o durante el flujo.

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "message": "Estado actualizado exitosamente",
  "assignment": {
    "id": "clxassign1",
    "status": "ACCEPTED_BY_DRIVER",
    "acceptedAt": "2025-01-15T10:20:00.000Z",
    "enRouteAt": "2025-01-15T10:20:00.000Z"
  },
  "previousState": "SENT_TO_DRIVER",
  "newState": "ACCEPTED_BY_DRIVER"
}
```

**Error: Transición inválida (400)**:
```json
{
  "ok": false,
  "error": "Transición inválida: COMPLETED -> CANCELED"
}
```

**Error: Falta razón de cancelación (400)**:
```json
{
  "ok": false,
  "error": "Se requiere una razón de cancelación"
}
```

**Error: No autorizado (403)**:
```json
{
  "ok": false,
  "error": "No tienes permiso para modificar esta asignación"
}
```

#### Implementación Backend

```typescript
// app/api/driver/assignments/[id]/state/route.ts
import { NextResponse } from 'next/server';
import { verifyDriverToken } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  SENT_TO_DRIVER: ['ACCEPTED_BY_DRIVER', 'REJECTED_BY_DRIVER'],
  ACCEPTED_BY_DRIVER: ['CANCELED'],
  DRIVER_EN_ROUTE: ['PASSENGER_ONBOARD', 'CANCELED'],
  PASSENGER_ONBOARD: ['COMPLETED'],
};

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await verifyDriverToken(req);
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { newState, cancellationReason } = await req.json();

    if (!newState) {
      return NextResponse.json(
        { ok: false, error: 'newState es requerido' },
        { status: 400 }
      );
    }

    if (newState === 'CANCELED' && !cancellationReason) {
      return NextResponse.json(
        { ok: false, error: 'Se requiere una razón de cancelación' },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: { passengerRequest: true, taxi: true },
    });

    if (!assignment) {
      return NextResponse.json(
        { ok: false, error: 'Asignación no encontrada' },
        { status: 404 }
      );
    }

    if (assignment.driverId !== payload.driverId) {
      return NextResponse.json(
        { ok: false, error: 'No tienes permiso para modificar esta asignación' },
        { status: 403 }
      );
    }

    // Validar transición
    const allowedStates = ALLOWED_TRANSITIONS[assignment.status] || [];
    if (!allowedStates.includes(newState)) {
      return NextResponse.json(
        { ok: false, error: `Transición inválida: ${assignment.status} -> ${newState}` },
        { status: 400 }
      );
    }

    // Ejecutar transacción
    const result = await prisma.$transaction(async (tx) => {
      const previousState = assignment.status;

      // Preparar datos de actualización
      const updateData: any = {
        status: newState,
      };

      // Actualizar timestamps
      if (newState === 'ACCEPTED_BY_DRIVER') {
        updateData.acceptedAt = new Date();
        updateData.enRouteAt = new Date();
      } else if (newState === 'REJECTED_BY_DRIVER') {
        updateData.rejectedAt = new Date();
      } else if (newState === 'PASSENGER_ONBOARD') {
        updateData.onboardAt = new Date();
      } else if (newState === 'COMPLETED') {
        updateData.completedAt = new Date();
      } else if (newState === 'CANCELED') {
        updateData.canceledAt = new Date();
        updateData.cancellationReason = cancellationReason;
        updateData.canceledBy = 'DRIVER';
      }

      // Actualizar Assignment
      const updatedAssignment = await tx.assignment.update({
        where: { id: params.id },
        data: updateData,
      });

      // Actualizar PassengerRequest si aplica
      let newRequestStatus: string | null = null;

      if (newState === 'ACCEPTED_BY_DRIVER') {
        newRequestStatus = 'DRIVER_EN_ROUTE';
      } else if (newState === 'PASSENGER_ONBOARD') {
        newRequestStatus = 'PASSENGER_ONBOARD';
      } else if (newState === 'COMPLETED') {
        newRequestStatus = 'COMPLETED';
      } else if (newState === 'REJECTED_BY_DRIVER' || newState === 'CANCELED') {
        newRequestStatus = 'PENDING_ASSIGNMENT';
      }

      if (newRequestStatus) {
        await tx.passengerRequest.update({
          where: { id: assignment.passengerRequestId },
          data: { status: newRequestStatus },
        });
      }

      // Liberar Taxi si se completa o cancela
      if (newState === 'COMPLETED' || newState === 'CANCELED' || newState === 'REJECTED_BY_DRIVER') {
        await tx.taxi.update({
          where: { id: assignment.taxiId! },
          data: { operationalStatus: 'AVAILABLE' },
        });
      }

      // AuditLog
      await tx.auditLog.create({
        data: {
          entityType: 'ASSIGNMENT',
          entityId: params.id,
          action: `driver_state_change_to_${newState.toLowerCase()}`,
          performedBy: `DRIVER:${payload.driverId}`,
          metadata: {
            previousState,
            newState,
            cancellationReason,
          },
        },
      });

      return {
        assignment: updatedAssignment,
        previousState,
      };
    });

    return NextResponse.json({
      ok: true,
      message: 'Estado actualizado exitosamente',
      assignment: result.assignment,
      previousState: result.previousState,
      newState,
    });
  } catch (error) {
    console.error('Update state error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## ENDPOINT 6: Obtener Historial de Asignaciones

### GET /api/driver/assignments/history

Retorna asignaciones completadas o canceladas de los últimos X días.

#### Request

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Params**:
- `days`: Número de días hacia atrás (default: 30)
- `limit`: Número máximo de resultados (default: 50)

**Ejemplo**:
```
GET /api/driver/assignments/history?days=7&limit=20
```

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "count": 15,
  "assignments": [
    {
      "id": "clxassign10",
      "status": "COMPLETED",
      "createdAt": "2025-01-15T08:00:00.000Z",
      "completedAt": "2025-01-15T08:45:00.000Z",
      "passengerRequest": {
        "passengerName": "Pedro Martínez",
        "originAddress": "Las Condes 1234",
        "destinationAddress": "Centro Santiago"
      },
      "duration": 45
    }
  ]
}
```

#### Implementación Backend

```typescript
// app/api/driver/assignments/history/route.ts
import { NextResponse } from 'next/server';
import { verifyDriverToken } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const payload = await verifyDriverToken(req);
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '50');

    const since = new Date();
    since.setDate(since.getDate() - days);

    const assignments = await prisma.assignment.findMany({
      where: {
        driverId: payload.driverId,
        status: {
          in: ['COMPLETED', 'CANCELED', 'REJECTED_BY_DRIVER'],
        },
        createdAt: {
          gte: since,
        },
      },
      include: {
        passengerRequest: {
          select: {
            passengerName: true,
            originAddress: true,
            destinationAddress: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json({
      ok: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error('Get history error:', error);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## Utilidades Backend

### lib/driver-auth.ts

```typescript
import jwt from 'jsonwebtoken';

interface DriverTokenPayload {
  driverId: string;
  operatorId: string;
  iat: number;
  exp: number;
}

export async function verifyDriverToken(
  req: Request
): Promise<DriverTokenPayload | null> {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as DriverTokenPayload;

    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
```

---

## Modificaciones Necesarias al Schema Prisma

### Agregar campo password a Driver

```prisma
model Driver {
  // ... campos existentes

  password String // Agregar este campo (hashed con bcrypt)

  // ... relaciones existentes
}
```

### Migración
```bash
npx prisma migrate dev --name add_driver_password
```

---

## Códigos de Error HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Request exitoso |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Error de validación o parámetros incorrectos |
| 401 | Unauthorized | Token inválido o faltante |
| 403 | Forbidden | Token válido pero sin permisos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## Testing de Endpoints

### Con cURL

**Login**:
```bash
curl -X POST http://localhost:3000/api/driver/login \
  -H "Content-Type: application/json" \
  -d '{"phoneOrEmail":"+56912345678","password":"test123"}'
```

**Get Assignments** (con token):
```bash
curl http://localhost:3000/api/driver/assignments \
  -H "Authorization: Bearer eyJhbGc..."
```

**Update State**:
```bash
curl -X POST http://localhost:3000/api/driver/assignments/clx123/state \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"newState":"ACCEPTED_BY_DRIVER"}'
```

---

## Próximos Pasos

1. Implementar endpoints en backend (Next.js)
2. Agregar campo `password` a modelo Driver
3. Crear script de seed para conductores de prueba
4. Probar endpoints con Postman/Thunder Client
5. Integrar con App React Native

---

**Versión**: 1.0
**Estado**: Especificación Aprobada
**Próximo documento**: `APP_CONDUCTOR_STATE_MACHINE.md` (DRIVER-APP-4)
