# AUDITORÍA DE ENDPOINTS API — ETAXI

**Fecha**: 2025-11-16
**Alcance**: Todos los endpoints en `/app/api/*`

---

## 1. INVENTARIO DE ENDPOINTS

### Endpoints Públicos (sin autenticación)

| Endpoint | Método | Propósito | Estado |
|----------|--------|-----------|--------|
| `/api/ride-requests` | POST | Crear solicitud de taxi (público) | ✅ Activo |
| `/api/company-leads` | POST | Enviar interés de empresa/gremio | ✅ Activo |
| `/api/driver-leads` | POST | Enviar interés de conductor | ✅ Activo |

---

### Endpoints Driver (JWT Authentication)

| Endpoint | Método | Propósito | Autenticación |
|----------|--------|-----------|---------------|
| `/api/driver/login` | POST | Login de conductor (mobile app) | ❌ Público (login) |
| `/api/driver/me` | GET | Obtener perfil del conductor | ✅ JWT Required |
| `/api/driver/assignments` | GET | Listar asignaciones del conductor | ✅ JWT Required |
| `/api/driver/assignments/history` | GET | Historial de asignaciones | ✅ JWT Required |
| `/api/driver/assignments/:id` | GET | Detalle de asignación | ✅ JWT Required |
| `/api/driver/assignments/:id/state` | POST | Cambiar estado de asignación | ✅ JWT Required |

---

### Endpoints Operator/Admin (NextAuth Session)

| Endpoint | Método | Propósito | Autenticación |
|----------|--------|-----------|---------------|
| `/api/operator/requests` | GET | Listar solicitudes pendientes | ✅ NextAuth |
| `/api/operator/requests/:id` | GET | Detalle de solicitud | ✅ NextAuth |
| `/api/operator/assign` | POST | Crear asignación manual | ✅ NextAuth |
| `/api/operator/assignment/state` | POST | Cambiar estado de asignación | ✅ NextAuth |
| `/api/operator/assignments/:id` | GET | Detalle de asignación (operador) | ✅ NextAuth |
| `/api/operator/drivers` | GET | Listar conductores | ✅ NextAuth |
| `/api/operator/taxis` | GET | Listar taxis | ✅ NextAuth |
| `/api/operator/fleet-operators` | GET | Listar operadores de flota | ✅ NextAuth |

---

### Endpoints de Exportación (Admin)

| Endpoint | Método | Propósito | Autenticación |
|----------|--------|-----------|---------------|
| `/api/admin/ride-requests/export` | GET | Exportar solicitudes a CSV | ⚠️ **NO VERIFICADO** |
| `/api/admin/drivers/export` | GET | Exportar conductores a CSV | ⚠️ **NO VERIFICADO** |
| `/api/admin/companies/export` | GET | Exportar empresas a CSV | ⚠️ **NO VERIFICADO** |

---

## 2. ANÁLISIS DE SEGURIDAD

### 🔴 CRÍTICO

#### 1. JWT Secret con fallback inseguro

**Archivo**: `lib/driver-auth.ts:14`

```typescript
const DRIVER_JWT_SECRET = process.env.DRIVER_JWT_SECRET || 'driver-secret-key-change-in-production';
```

**Problema**:
- Si `DRIVER_JWT_SECRET` no está configurado, usa un valor por defecto conocido
- Esto permite a atacantes generar tokens válidos

**Solución**:
```typescript
const DRIVER_JWT_SECRET = process.env.DRIVER_JWT_SECRET;

if (!DRIVER_JWT_SECRET) {
  throw new Error('DRIVER_JWT_SECRET must be defined in environment variables');
}
```

---

#### 2. Endpoints de exportación sin verificación de autenticación

**Archivos afectados**:
- `app/admin/ride-requests/export/route.ts`
- `app/admin/drivers/export/route.ts`
- `app/admin/companies/export/route.ts`

**Riesgo**: Si estos endpoints no verifican autenticación, podrían exponer datos sensibles.

**Acción requerida**: Revisar implementación y asegurar que requieran `auth()` de NextAuth.

---

### ⚠️ ALTO

#### 3. Rate limiting ausente en endpoints públicos

**Endpoints afectados**:
- `/api/ride-requests`
- `/api/company-leads`
- `/api/driver-leads`

**Problema**:
- Sin rate limiting, un atacante puede:
  - Spam masivo de solicitudes
  - Llenar la BD con datos falsos
  - Causar DoS (Denial of Service)

**Solución**: Implementar rate limiting con `next-rate-limit` o middleware similar:

```typescript
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    await limiter.check(req, 10, 'CACHE_TOKEN'); // 10 requests per minute
    // ... resto del código
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
}
```

---

#### 4. Validaciones sin librería de esquemas

**Problema actual**:
- Las validaciones están inline con regex y condicionales
- Dificulta mantenimiento y consistencia

**Ejemplo actual** (`/api/ride-requests`):
```typescript
const phoneRegex = /^[+]?[\d\s\-()]+$/;
if (!phoneRegex.test(phone)) { ... }
```

**Recomendación**: Usar **Zod** para validaciones declarativas:

```typescript
import { z } from 'zod';

const rideRequestSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[+]?[\d\s\-()]+$/),
  email: z.string().email().optional(),
  pickupAddress: z.string().min(5).max(500),
  dropoffAddress: z.string().max(500).optional(),
  notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = rideRequestSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors },
      { status: 400 }
    );
  }

  // usar result.data (validado)
}
```

**Beneficios**:
- Type-safe
- Validaciones centralizadas
- Mensajes de error consistentes
- Reutilizable

---

#### 5. CORS no configurado explícitamente

**Problema**: No hay configuración explícita de CORS en endpoints públicos.

**Riesgo**: Solicitudes desde dominios no autorizados.

**Solución**: Configurar CORS en `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://etaxi.cl' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
        ],
      },
    ];
  },
};
```

---

### ⚠️ MEDIO

#### 6. SQL Injection (mitigado por Prisma)

**Estado**: ✅ **PROTEGIDO**

**Razón**: Uso de Prisma ORM que previene SQL injection automáticamente.

**Ejemplo seguro**:
```typescript
const driver = await prisma.driver.findFirst({
  where: {
    OR: [
      { phone: phoneOrEmail },
      { email: phoneOrEmail },
    ],
  },
});
```

**Recomendación**: Mantener uso de Prisma, nunca usar `prisma.$executeRaw` con input de usuario sin sanitizar.

---

#### 7. Logs con información sensible

**Problema**: Algunos endpoints logean errores que podrían contener info sensible.

**Ejemplo**:
```typescript
console.error('Driver login error:', error);
```

**Riesgo**: Si `error` contiene password o token, queda en logs.

**Solución**: Sanitizar logs:

```typescript
console.error('Driver login error:', {
  message: error.message,
  code: error.code,
  // NO incluir: password, token, PII
});
```

---

#### 8. Respuestas de error revelan estructura interna

**Ejemplo** (`/api/operator/assign`):
```typescript
throw new Error('Taxi no encontrado');
```

**Problema**: Revela detalles de implementación a atacantes.

**Recomendación**: Mensajes genéricos para usuarios, logs detallados para desarrolladores:

```typescript
try {
  const taxi = await tx.taxi.findUnique({ where: { id: taxiId } });
  if (!taxi) {
    console.error(`Taxi not found: ${taxiId}`); // log interno
    throw new Error('Invalid assignment parameters'); // mensaje genérico
  }
} catch (error) {
  // ...
}
```

---

## 3. VALIDACIÓN DE AUTENTICACIÓN Y AUTORIZACIÓN

### Driver Authentication (JWT)

**Implementación**: `lib/driver-auth.ts`

**Fortalezas**:
- ✅ Verifica token JWT correctamente
- ✅ Revalida driver en cada request
- ✅ Verifica `isEnabled` flag
- ✅ Verifica expiración de licencia
- ✅ Elimina password de respuestas

**Debilidades**:
- ⚠️ JWT secret con fallback inseguro (ver punto crítico #1)
- ⚠️ No hay refresh tokens (sesión termina después de 7 días)
- ⚠️ No hay revocación de tokens (si driver es deshabilitado, token sigue válido hasta expiración)

**Recomendación**:
```typescript
// Agregar verificación de token revocado
export async function requireDriverAuth(request: NextRequest) {
  const driver = await getDriverFromRequest(request);

  if (!driver) {
    throw new Error('Unauthorized - Invalid or missing token');
  }

  // Verificar si token fue revocado
  const isRevoked = await prisma.revokedToken.findUnique({
    where: { token: getTokenFromRequest(request) },
  });

  if (isRevoked) {
    throw new Error('Token has been revoked');
  }

  return driver;
}
```

---

### Admin/Operator Authentication (NextAuth)

**Implementación**: `lib/auth.ts`

**Fortalezas**:
- ✅ Usa NextAuth (estándar de la industria)
- ✅ Verifica password con bcrypt
- ✅ Session strategy JWT
- ✅ Callback JWT incluye role

**Debilidades**:
- ⚠️ No hay verificación de role en endpoints (todos los usuarios autenticados tienen acceso igual)
- ⚠️ No hay MFA (Multi-Factor Authentication)

**Recomendación**: Agregar middleware de role verification:

```typescript
// lib/auth/middleware.ts
export async function requireRole(req: Request, allowedRoles: string[]) {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden - Insufficient permissions');
  }

  return session;
}

// En endpoint:
export async function DELETE(req: Request) {
  await requireRole(req, ['ADMIN']); // solo admins pueden eliminar
  // ...
}
```

---

## 4. VALIDACIÓN DE INPUTS

### Endpoints con validación adecuada

✅ **`/api/ride-requests`**:
- Valida campos requeridos
- Valida formato de teléfono con regex
- Valida formato de email con regex
- Limita tamaño de strings (500 chars)
- Sanitiza con `.trim()`

✅ **`/api/driver/login`**:
- Valida campos requeridos
- Maneja errores específicos (disabled account, expired license)

✅ **`/api/operator/assign`**:
- Valida campos requeridos
- Verifica existencia de entidades relacionadas
- Valida estados permitidos
- Usa transacciones para atomicidad

---

### Endpoints que requieren mejora

⚠️ **`/api/driver/assignments`**:
- Query param `status` acepta cualquier valor sin validación
- Debería validar contra estados permitidos

**Solución**:
```typescript
const ALLOWED_STATUSES = [
  'CREATED',
  'SENT_TO_DRIVER',
  'ACCEPTED_BY_DRIVER',
  'REJECTED_BY_DRIVER',
  'DRIVER_EN_ROUTE',
  'PASSENGER_ONBOARD',
  'COMPLETED',
  'CANCELED',
];

if (statusFilter) {
  const statuses = statusFilter.split(',').map(s => s.trim());
  const invalidStatuses = statuses.filter(s => !ALLOWED_STATUSES.includes(s));

  if (invalidStatuses.length > 0) {
    return NextResponse.json(
      { error: `Invalid status: ${invalidStatuses.join(', ')}` },
      { status: 400 }
    );
  }

  whereClause.status = statuses.length === 1 ? statuses[0] : { in: statuses };
}
```

---

## 5. CONTROL DE ACCESO POR ROL

### Matriz de roles recomendada

| Endpoint | PUBLIC | DRIVER | OPERATOR | ADMIN |
|----------|--------|--------|----------|-------|
| POST `/api/ride-requests` | ✅ | ✅ | ✅ | ✅ |
| POST `/api/driver/login` | ✅ | - | - | - |
| GET `/api/driver/me` | ❌ | ✅ | ❌ | ❌ |
| GET `/api/driver/assignments` | ❌ | ✅ | ❌ | ❌ |
| POST `/api/driver/assignments/:id/state` | ❌ | ✅ | ❌ | ❌ |
| GET `/api/operator/requests` | ❌ | ❌ | ✅ | ✅ |
| POST `/api/operator/assign` | ❌ | ❌ | ✅ | ✅ |
| GET `/api/admin/*/export` | ❌ | ❌ | ❌ | ✅ |

**Estado actual**: ⚠️ No hay verificación de roles en endpoints de operador/admin.

**Recomendación**: Implementar middleware de roles (ver sección 3).

---

## 6. EXPOSICIÓN DE DATOS SENSIBLES

### Datos que NO deben exponerse

❌ **Passwords** (nunca)
❌ **JWT secrets** (nunca)
❌ **Internal IDs** innecesarios
❌ **Stack traces** en producción

---

### Endpoints que exponen datos correctamente

✅ **`/api/driver/login`**:
```typescript
// Elimina password de la respuesta
const { password: _, ...driverWithoutPassword } = driver;
return driverWithoutPassword;
```

✅ **`/api/driver/assignments`**:
- Solo devuelve datos necesarios del driver autenticado
- Usa `select` en Prisma para limitar campos

---

### Endpoints que podrían mejorar

⚠️ **`/api/operator/requests`**:
- Devuelve todos los campos de `PassengerRequest`
- Podría incluir datos sensibles innecesarios

**Recomendación**:
```typescript
const requests = await prisma.passengerRequest.findMany({
  where: { status: 'PENDING_ASSIGNMENT' },
  select: {
    id: true,
    passengerName: true,
    passengerPhone: true,
    originAddress: true,
    destinationAddress: true,
    scheduledFor: true,
    status: true,
    createdAt: true,
    // NO incluir: passengerEmail, notes sensibles, etc.
  },
  orderBy: { createdAt: 'desc' },
  take: 100,
});
```

---

## 7. AUDITORÍA Y LOGGING

### Estado actual

✅ **AuditLog implementado**:
- Se registran cambios en `Assignment`
- Se registran cambios de estado en `PassengerRequest`
- Se registra quién realizó la acción (`performedBy`)

**Ejemplo** (`/api/operator/assign`):
```typescript
await tx.auditLog.create({
  data: {
    entityType: 'ASSIGNMENT',
    entityId: assignment.id,
    action: 'created',
    performedBy: `OPERATOR:${session.user?.email || 'unknown'}`,
    metadata: { ... },
  },
});
```

---

### Mejoras recomendadas

1. **Agregar audit log a endpoints de Driver**:
```typescript
// POST /api/driver/assignments/:id/state
await prisma.auditLog.create({
  data: {
    entityType: 'ASSIGNMENT',
    entityId: assignmentId,
    action: 'status_changed',
    performedBy: `DRIVER:${driver.id}`,
    metadata: {
      previousStatus: oldStatus,
      newStatus: newStatus,
    },
  },
});
```

2. **Agregar audit log a cambios de perfil**:
```typescript
// PUT /api/driver/me
await prisma.auditLog.create({
  data: {
    entityType: 'DRIVER',
    entityId: driver.id,
    action: 'profile_updated',
    performedBy: `DRIVER:${driver.id}`,
    metadata: { fieldsChanged: ['phone', 'email'] },
  },
});
```

---

## 8. MANEJO DE ERRORES

### Errores bien manejados

✅ **Transacciones con rollback automático**:
```typescript
const result = await prisma.$transaction(async (tx) => {
  // Múltiples operaciones
  // Si alguna falla, rollback automático
});
```

✅ **Mensajes de error específicos para validaciones**:
```typescript
if (!taxi) {
  throw new Error('Taxi no encontrado');
}
```

---

### Mejoras recomendadas

1. **Separar errores de cliente (4xx) vs servidor (5xx)**:

```typescript
try {
  // validaciones
  if (!requestId) {
    return NextResponse.json({ error: 'requestId required' }, { status: 400 });
  }

  // lógica de negocio
  const result = await doSomething();

} catch (error) {
  console.error('Internal error:', error);

  // No revelar detalles internos al cliente
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

2. **Usar códigos de estado HTTP correctos**:
- 400: Bad Request (input inválido)
- 401: Unauthorized (no autenticado)
- 403: Forbidden (autenticado pero sin permisos)
- 404: Not Found
- 409: Conflict (estado inválido)
- 422: Unprocessable Entity (validación de negocio falla)
- 500: Internal Server Error

---

## 9. RESUMEN DE ACCIONES REQUERIDAS

### Prioridad CRÍTICA

1. ✅ **Eliminar fallback de JWT secret** (`lib/driver-auth.ts`)
2. ✅ **Verificar autenticación en endpoints de exportación**

### Prioridad ALTA

3. ✅ **Implementar rate limiting** en endpoints públicos
4. ✅ **Migrar validaciones a Zod**
5. ✅ **Configurar CORS** explícitamente
6. ✅ **Implementar verificación de roles** en endpoints admin/operator

### Prioridad MEDIA

7. ⚠️ **Agregar revocación de tokens JWT**
8. ⚠️ **Mejorar sanitización de logs**
9. ⚠️ **Validar query params** en GET requests
10. ⚠️ **Limitar datos expuestos** con `select` en Prisma

### Prioridad BAJA

11. 🔵 **Agregar MFA** para admin
12. 🔵 **Implementar refresh tokens** para drivers
13. 🔵 **Agregar monitoreo** de intentos fallidos de login

---

## 10. CHECKLIST DE REVISIÓN POR ENDPOINT

Antes de deploy a producción, verificar:

- [ ] ¿Requiere autenticación? ¿Está implementada correctamente?
- [ ] ¿Valida todos los inputs?
- [ ] ¿Usa Prisma para queries (no raw SQL)?
- [ ] ¿Limita datos expuestos en respuesta?
- [ ] ¿Maneja errores sin revelar detalles internos?
- [ ] ¿Registra acciones en AuditLog si corresponde?
- [ ] ¿Usa transacciones para operaciones multi-step?
- [ ] ¿Tiene rate limiting si es público?
- [ ] ¿Verifica permisos por rol si es necesario?
- [ ] ¿Sanitiza logs (no expone passwords/tokens)?

---

**Fin del informe**
