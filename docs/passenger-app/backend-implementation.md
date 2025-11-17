# IMPLEMENTACIÓN BACKEND API PASAJERO — ETAXI

**Fecha**: 2025-11-16
**Estado**: ✅ COMPLETADO
**Fase**: FASE 21-B

---

## RESUMEN EJECUTIVO

Se implementó exitosamente el **Backend API completo** para la App Pasajero ETAXI, incluyendo:

- ✅ 11 endpoints REST JSON
- ✅ Autenticación JWT con OTP
- ✅ Rate limiting en endpoints públicos
- ✅ Schema de base de datos actualizado
- ✅ Documentación de testing completa

---

## ARCHIVOS CREADOS (14)

### 1. Schema de base de datos

**Archivo**: `prisma/schema.prisma`

**Modelos agregados**:
- `Passenger` - Usuarios de la app pasajero
- `Rating` - Calificaciones de viajes
- `DriverPosition` - Posiciones GPS de conductores

**Modelos modificados**:
- `PassengerRequest` - Agregados campos: passengerId, pickupLat/Lng, dropoffLat/Lng, taxiType
- `Driver` - Agregada relación driverPositions
- `Assignment` - Agregada relación rating

---

### 2. Helpers de autenticación

**Archivo**: `lib/passenger-auth.ts`

**Funciones**:
- `generatePassengerToken()` - Genera JWT token
- `verifyPassengerToken()` - Verifica JWT token
- `sendOTP()` - Envía código OTP (in-memory para MVP)
- `verifyOTP()` - Verifica código OTP
- `findOrCreatePassenger()` - Busca/crea pasajero
- `getPassengerFromRequest()` - Extrae pasajero del token
- `requirePassengerAuth()` - Middleware de autenticación

---

### 3. Endpoints implementados (11)

#### 3.1. Autenticación

**1. POST /api/passenger/send-otp**
- **Archivo**: `app/api/passenger/send-otp/route.ts`
- **Rate limit**: 3 req/min
- **Función**: Envía código OTP por SMS
- **Status**: ✅ Implementado

**2. POST /api/passenger/verify-otp**
- **Archivo**: `app/api/passenger/verify-otp/route.ts`
- **Rate limit**: 5 req/5min
- **Función**: Verifica OTP y retorna JWT token
- **Status**: ✅ Implementado

#### 3.2. Solicitudes de taxi

**3. POST /api/passenger/create-request**
- **Archivo**: `app/api/passenger/create-request/route.ts`
- **Rate limit**: 10 req/min
- **Función**: Crea nueva solicitud de taxi
- **Auth**: Requerido
- **Status**: ✅ Implementado

**4. GET /api/passenger/request/[id]**
- **Archivo**: `app/api/passenger/request/[id]/route.ts`
- **Función**: Obtiene estado de solicitud
- **Auth**: Requerido
- **Status**: ✅ Implementado

**5. POST /api/passenger/request/[id]/cancel**
- **Archivo**: `app/api/passenger/request/[id]/cancel/route.ts`
- **Función**: Cancela solicitud de taxi
- **Auth**: Requerido
- **Status**: ✅ Implementado

#### 3.3. Asignaciones y tracking

**6. GET /api/passenger/assignment/[id]**
- **Archivo**: `app/api/passenger/assignment/[id]/route.ts`
- **Función**: Obtiene detalles de asignación (conductor, taxi, operador)
- **Auth**: Requerido
- **Status**: ✅ Implementado

**7. GET /api/passenger/tracking/[assignmentId]**
- **Archivo**: `app/api/passenger/tracking/[assignmentId]/route.ts`
- **Función**: Obtiene posición GPS del conductor
- **Auth**: Requerido
- **Status**: ✅ Implementado

#### 3.4. Historial y calificaciones

**8. GET /api/passenger/history**
- **Archivo**: `app/api/passenger/history/route.ts`
- **Función**: Obtiene historial de viajes
- **Auth**: Requerido
- **Status**: ✅ Implementado

**9. POST /api/passenger/rating**
- **Archivo**: `app/api/passenger/rating/route.ts`
- **Función**: Califica un viaje completado
- **Auth**: Requerido
- **Status**: ✅ Implementado

#### 3.5. Perfil

**10. GET /api/passenger/profile**
- **Archivo**: `app/api/passenger/profile/route.ts`
- **Función**: Obtiene perfil del pasajero con estadísticas
- **Auth**: Requerido
- **Status**: ✅ Implementado

**11. PATCH /api/passenger/profile**
- **Archivo**: `app/api/passenger/profile/route.ts`
- **Función**: Actualiza nombre y email del pasajero
- **Auth**: Requerido
- **Status**: ✅ Implementado

---

### 4. Documentación

**Archivo**: `docs/passenger-app/api-testing.md`

**Contenido**:
- ✅ Setup inicial
- ✅ Flujo completo de testing (14 pasos)
- ✅ Testing de errores (6 casos)
- ✅ Testing de rate limiting
- ✅ Scripts de automatización (bash)
- ✅ Colección de Postman
- ✅ Ejemplos con curl para cada endpoint

---

## CARACTERÍSTICAS IMPLEMENTADAS

### Seguridad

1. **Autenticación JWT**:
   - Tokens con expiración de 30 días
   - Secret separado de driver y admin
   - Validación en cada request protegido

2. **OTP (One-Time Password)**:
   - Códigos de 6 dígitos
   - Expiración de 5 minutos
   - Máximo 5 intentos por código
   - Cleanup automático de códigos expirados

3. **Rate Limiting**:
   - send-otp: 3 req/min
   - verify-otp: 5 req/5min
   - create-request: 10 req/min
   - Resto: según lib/rate-limit.ts

4. **Validaciones**:
   - Formato de teléfono chileno (+569XXXXXXXX)
   - Coordenadas GPS (-90 a 90, -180 a 180)
   - Tipos de taxi válidos (BASIC, EXECUTIVE, etc.)
   - Rating entre 1-5
   - Longitud de strings (nombre, comentarios)

5. **Ownership checks**:
   - Pasajero solo ve sus propias solicitudes
   - Pasajero solo puede cancelar sus propias solicitudes
   - Pasajero solo puede calificar sus propios viajes

---

### Funcionalidades

1. **Login con OTP**:
   - Sin contraseñas
   - Autenticación por SMS (MVP: in-memory)
   - Auto-creación de pasajero en primer login

2. **Solicitudes de taxi**:
   - Origen requerido (dirección + GPS)
   - Destino opcional
   - 5 tipos de taxi: BASIC, EXECUTIVE, TOURISM, VAN, LUXURY
   - Notas opcionales (max 200 caracteres)
   - Prevención de solicitudes duplicadas

3. **Tracking en vivo**:
   - Posición GPS del conductor cada 10s (desde app)
   - Heading y speed opcionales
   - Error 410 si viaje ya finalizó

4. **Calificaciones**:
   - Rating 1-5 estrellas
   - Comentario opcional (max 500 caracteres)
   - Una sola calificación por viaje
   - Solo viajes completados

5. **Historial**:
   - Filtros por fecha (from/to)
   - Paginación (limit/offset)
   - Estadísticas: totalTrips, averageRating, lastTripAt

6. **Perfil**:
   - Ver datos personales
   - Editar nombre y email
   - Ver estadísticas de uso

---

## ESTRUCTURA DE DATOS

### Passenger

```typescript
{
  id: string
  phone: string (unique)
  name: string | null
  email: string | null
  createdAt: DateTime
  updatedAt: DateTime
}
```

### PassengerRequest

```typescript
{
  id: string
  passengerId: string | null
  passengerName: string
  passengerPhone: string
  passengerEmail: string | null
  originAddress: string
  destinationAddress: string | null
  pickupLat: number | null
  pickupLng: number | null
  dropoffLat: number | null
  dropoffLng: number | null
  taxiType: string | null
  scheduledFor: DateTime | null
  channel: string (WEB, APP_PASSENGER, etc.)
  status: string (CREATED, PENDING_ASSIGNMENT, ASSIGNED, etc.)
  notes: string | null
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Rating

```typescript
{
  id: string
  passengerId: string
  assignmentId: string (unique)
  rating: number (1-5)
  comment: string | null
  createdAt: DateTime
}
```

### DriverPosition

```typescript
{
  id: string
  driverId: string
  lat: number
  lng: number
  heading: number | null (0-360)
  speed: number | null (km/h)
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## VARIABLES DE ENTORNO

### Nuevas variables agregadas

**`.env.local.example`**:
```bash
# Passenger API JWT Authentication
PASSENGER_JWT_SECRET="your_passenger_jwt_secret_here_different_from_others"
```

**`.env.local`** (para desarrollo):
```bash
PASSENGER_JWT_SECRET="passenger-jwt-secret-change-in-production-abc456"
```

**IMPORTANTE**:
- En producción, generar secret único: `openssl rand -base64 32`
- Debe ser diferente de AUTH_SECRET y DRIVER_JWT_SECRET

---

## TESTING

### Setup de testing

1. **Iniciar backend**:
   ```bash
   cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
   npm run dev
   ```

2. **Verificar base de datos**:
   ```bash
   npx prisma studio
   ```

3. **Ejecutar tests**:
   - Ver `docs/passenger-app/api-testing.md`
   - Usar curl, Postman o script bash

---

### Flujo de testing completo

```
1. POST /send-otp → Obtener OTP
2. POST /verify-otp → Obtener JWT token
3. GET /profile → Ver perfil
4. PATCH /profile → Actualizar nombre/email
5. POST /create-request → Crear solicitud
6. GET /request/:id → Ver estado (PENDING_ASSIGNMENT)
7. [Operador asigna conductor desde backoffice]
8. GET /request/:id → Ver estado (ASSIGNED)
9. GET /assignment/:id → Ver datos del conductor/taxi
10. GET /tracking/:id → Ver posición GPS
11. [Conductor completa viaje]
12. POST /rating → Calificar viaje
13. GET /history → Ver historial
```

**Duración estimada**: 5-10 minutos

---

## PRÓXIMOS PASOS

### MVP completado

- ✅ Autenticación con OTP
- ✅ CRUD de solicitudes
- ✅ Tracking GPS
- ✅ Calificaciones
- ✅ Historial
- ✅ Perfil

### Features post-MVP (no implementadas)

1. **Notificaciones push**:
   - Integrar OneSignal o Firebase Cloud Messaging
   - Notificar cuando se asigna taxi
   - Notificar cuando conductor llega
   - Notificar cambios de estado

2. **SMS real**:
   - Integrar Twilio o AWS SNS
   - Enviar OTP por SMS real
   - Manejo de errores de envío

3. **Cálculo de ETA**:
   - Basado en distancia GPS
   - Basado en tráfico (Google Maps API)
   - Actualización en tiempo real

4. **Estimación de tarifa**:
   - Basada en distancia y tiempo
   - Histórico de tarifas
   - Mostrar antes de confirmar

5. **Métricas y analytics**:
   - Sentry para error tracking
   - Mixpanel o Firebase Analytics
   - Dashboards de uso

6. **Optimizaciones**:
   - Migrar OTP store a Redis
   - Implementar WebSockets para tracking
   - Caché de posiciones GPS
   - Comprimir responses

---

## MÉTRICAS DEL PROYECTO

### Código generado

- **Archivos creados**: 14
- **Líneas de código**: ~1,800
- **Endpoints**: 11
- **Funciones helper**: 8
- **Modelos de BD**: 3 nuevos, 3 modificados

### Cobertura funcional

- ✅ Autenticación: 100%
- ✅ Solicitudes: 100%
- ✅ Tracking: 100%
- ✅ Calificaciones: 100%
- ✅ Historial: 100%
- ✅ Perfil: 100%

### Tiempo de implementación

- **Fase 20 (Diseño)**: ~2 horas
- **Fase 21-B (Backend)**: ~1.5 horas
- **Total**: ~3.5 horas

---

## COMPATIBILIDAD CON APP CONDUCTOR

El backend ahora soporta **DOS apps móviles separadas**:

### 1. App Conductor (existente)

- **Auth**: POST /api/driver/login (usuario + password)
- **Endpoints**: /api/driver/*
- **JWT Secret**: DRIVER_JWT_SECRET
- **Expiración**: 7 días

### 2. App Pasajero (nuevo)

- **Auth**: POST /api/passenger/verify-otp (teléfono + OTP)
- **Endpoints**: /api/passenger/*
- **JWT Secret**: PASSENGER_JWT_SECRET
- **Expiración**: 30 días

**Ambas apps comparten**:
- Misma base de datos
- Mismos modelos (Assignment, Taxi, Driver, etc.)
- Rate limiter (lib/rate-limit.ts)
- Audit logs

---

## DEPLOYMENT

### Checklist pre-producción

- [ ] Configurar PASSENGER_JWT_SECRET único
- [ ] Integrar servicio de SMS real (Twilio)
- [ ] Migrar OTP store a Redis
- [ ] Configurar rate limiting en Redis
- [ ] Habilitar CORS solo para dominios autorizados
- [ ] Configurar Sentry para error tracking
- [ ] Implementar notificaciones push
- [ ] Testing de carga (100+ users concurrentes)
- [ ] Configurar SSL/TLS en producción
- [ ] Implementar monitoreo (New Relic, Datadog)

### Variables de entorno en producción

```bash
DATABASE_URL=postgresql://...
AUTH_SECRET=<generar con openssl rand -base64 32>
DRIVER_JWT_SECRET=<generar con openssl rand -base64 32>
PASSENGER_JWT_SECRET=<generar con openssl rand -base64 32>
NODE_ENV=production
NEXT_PUBLIC_ALLOWED_ORIGIN=https://etaxi.cl
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
REDIS_URL=redis://...
SENTRY_DSN=...
```

---

## ESTADO FINAL

✅ **FASE 21-B COMPLETADA** - Backend API Pasajero

**Endpoints implementados**: 11/11 (100%)

**Listo para**:
- Testing completo con Postman/curl
- Integración con App Pasajero (Expo)
- Deploy a staging

**Próxima fase sugerida**:
- FASE 22: Implementar App Pasajero (Expo + React Native)
- FASE 23: Integrar notificaciones push
- FASE 24: Testing end-to-end

---

**Fin del documento**
