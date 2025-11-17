# FASE 13 — APP CONDUCTOR MVP COMPLETADA ✅

## Estado: DISEÑO Y ESPECIFICACIÓN TÉCNICA COMPLETA
## Fecha: 2025-01-15

---

## Resumen Ejecutivo

Se ha completado el diseño conceptual completo de la **App Conductor ETAXI MVP**, lista para implementación. Esta fase NO incluye código, solo especificaciones técnicas detalladas que otra IA o desarrollador puede tomar y ejecutar.

---

## Documentos Creados

### 1. ✅ DRIVER-APP-1: Stack Tecnológico
**Archivo**: `docs/APP_CONDUCTOR_STACK_TECH.md`

**Decisiones clave**:
- **Framework**: React Native + Expo
- **Lenguaje**: TypeScript
- **Navegación**: @react-navigation/native v6
- **Estado**: Zustand (recomendado) o React Context
- **HTTP Client**: Axios
- **Auth**: JWT en SecureStore
- **Notificaciones**: Expo Notifications
- **UI**: Custom components con paleta ETAXI

**Dependencias principales**:
```json
{
  "expo": "~51.0.0",
  "react-native": "0.74.x",
  "@react-navigation/native": "^6.1.0",
  "zustand": "^4.5.0",
  "axios": "^1.6.0",
  "expo-secure-store": "~13.0.1",
  "expo-notifications": "~0.27.6"
}
```

---

### 2. ✅ DRIVER-APP-2: Pantallas del MVP
**Archivo**: `docs/APP_CONDUCTOR_PANTALLAS.md`

**Pantallas definidas** (6 total):

#### 1. Login
- Input: teléfono/email + contraseña
- Validación client-side
- Loading states
- Error handling

#### 2. Home (Lista de Servicios)
- Servicios asignados agrupados por estado
- Pull to refresh
- Cards clickeables con info clave
- Empty state

#### 3. Detalle del Servicio
- Información completa (pasajero, recorrido, notas)
- Timeline de estados
- Botones de acción dinámicos según estado actual
- Modales de confirmación

#### 4. Historial
- Servicios completados/cancelados
- Filtro por período
- Solo lectura

#### 5. Perfil
- Datos del conductor
- Información del operador/gremio
- Vehículo asignado
- Configuración de notificaciones
- Cerrar sesión

#### 6. Configuración (fusionada con Perfil en MVP)

**Componentes reutilizables**:
- AssignmentCard
- StateButton
- InfoSection
- Timeline
- ConfirmModal

---

### 3. ✅ DRIVER-APP-3: Endpoints Backend
**Archivo**: `docs/APP_CONDUCTOR_API.md`

**6 endpoints definidos**:

| Método | Endpoint | Propósito | Auth |
|--------|----------|-----------|------|
| POST | `/api/driver/login` | Autenticación, emite JWT | No |
| GET | `/api/driver/me` | Perfil del conductor | Sí |
| GET | `/api/driver/assignments` | Lista de asignaciones activas | Sí |
| GET | `/api/driver/assignments/:id` | Detalle de asignación | Sí |
| POST | `/api/driver/assignments/:id/state` | Cambiar estado | Sí |
| GET | `/api/driver/assignments/history` | Historial (últimos X días) | Sí |

**Autenticación**: JWT con payload `{driverId, operatorId}`

**Modificación requerida al schema Prisma**:
```prisma
model Driver {
  // ... campos existentes
  password String // ⚠️ AGREGAR ESTE CAMPO (hashed con bcrypt)
  // ... relaciones
}
```

---

### 4. ✅ DRIVER-APP-4: State Machine desde Punto de Vista del Conductor

#### Estados y Transiciones Permitidas

```
SENT_TO_DRIVER (Servicio nuevo asignado)
  ├─> ACCEPTED_BY_DRIVER (Conductor acepta)
  └─> REJECTED_BY_DRIVER (Conductor rechaza)

ACCEPTED_BY_DRIVER (Conductor aceptó)
  ├─> (auto) DRIVER_EN_ROUTE (se marca "voy en camino")
  └─> CANCELED (Conductor cancela con razón)

DRIVER_EN_ROUTE (Conductor en camino)
  ├─> PASSENGER_ONBOARD (Pasajero a bordo)
  └─> CANCELED (Conductor cancela con razón)

PASSENGER_ONBOARD (Pasajero a bordo)
  └─> COMPLETED (Finalizar viaje)

COMPLETED / CANCELED / REJECTED_BY_DRIVER
  └─> Estados finales (solo lectura en historial)
```

#### Botones de Acción por Estado

| Estado Actual | Botones Disponibles | API Call |
|---------------|---------------------|----------|
| `SENT_TO_DRIVER` | [Aceptar] [Rechazar] | `POST .../state` con `ACCEPTED_BY_DRIVER` o `REJECTED_BY_DRIVER` |
| `ACCEPTED_BY_DRIVER` | [Voy en Camino] [Cancelar] | `DRIVER_EN_ROUTE` o `CANCELED` + razón |
| `DRIVER_EN_ROUTE` | [Pasajero a Bordo] [Cancelar] | `PASSENGER_ONBOARD` o `CANCELED` + razón |
| `PASSENGER_ONBOARD` | [Finalizar Viaje] | `COMPLETED` |

#### Validaciones

**Client-side**:
- Deshabilitar botones si hay request en curso
- Validar razón de cancelación (mínimo 10 caracteres)
- Confirmación obligatoria para acciones críticas

**Server-side**:
- Verificar transición válida según matriz de estados
- Verificar que driverId del token coincide con assignment
- Registrar en AuditLog todas las acciones
- Actualizar PassengerRequest en paralelo
- Liberar Taxi si se completa/cancela

---

### 5. ✅ DRIVER-APP-5: Estructura de Navegación

#### Archivo: `src/navigation/AppNavigator.tsx`

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Stacks
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack (no autenticado)
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// Main Tabs (autenticado)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#dd1828',
        tabBarStyle: { backgroundColor: '#182b33' },
      }}
    >
      <Tab.Screen
        name="Servicios"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="car" color={color} />,
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="time" color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack (incluye tabs + modales/detalles)
function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AssignmentDetail"
        component={AssignmentDetailScreen}
        options={{
          presentation: 'card',
          headerBackTitle: 'Volver',
        }}
      />
    </MainStack.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
```

#### Navegación entre pantallas

| Desde | Hacia | Método |
|-------|-------|--------|
| Login | Home (Tabs) | `navigation.replace('MainTabs')` |
| Home | AssignmentDetail | `navigation.navigate('AssignmentDetail', {id})` |
| AssignmentDetail | Home | `navigation.goBack()` |
| Perfil | Login (logout) | `navigation.replace('Login')` + borrar token |

---

### 6. ✅ DRIVER-APP-6: QA Checklist

#### Flujo Completo End-to-End

**Prerrequisitos**:
- [ ] Backend implementado con endpoints de DRIVER-APP-3
- [ ] Driver con password en BD
- [ ] Assignment en estado `SENT_TO_DRIVER` creado desde Backoffice

**Test 1: Login**
- [ ] Abrir app → muestra pantalla de login
- [ ] Ingresar teléfono/email y contraseña
- [ ] Tap "Iniciar Sesión"
- [ ] Verificar: se guarda JWT en SecureStore
- [ ] Verificar: navega a Home
- [ ] Verificar: si cierro y abro app, sigue logueado

**Test 2: Ver Servicios Asignados**
- [ ] En Home, ver lista de servicios con estado `SENT_TO_DRIVER`
- [ ] Verificar: muestra origen, destino, tiempo transcurrido
- [ ] Pull to refresh → actualiza lista
- [ ] Verificar: Empty state si no hay servicios

**Test 3: Ver Detalle de Servicio**
- [ ] Tap en servicio de la lista
- [ ] Navega a AssignmentDetail
- [ ] Verificar: muestra datos del pasajero
- [ ] Verificar: muestra recorrido (origen + destino)
- [ ] Verificar: muestra notas si existen
- [ ] Verificar: muestra timeline de estados previos
- [ ] Verificar: botones [Aceptar] [Rechazar] visibles

**Test 4: Aceptar Servicio**
- [ ] Tap en "Aceptar Servicio"
- [ ] Verificar: botón muestra loading
- [ ] Verificar: API call exitoso (`POST .../state` con `ACCEPTED_BY_DRIVER`)
- [ ] Verificar: estado cambia a `ACCEPTED_BY_DRIVER`
- [ ] Verificar: botones ahora son [Voy en Camino] [Cancelar]
- [ ] Verificar: timestamps actualizados (acceptedAt, enRouteAt)

**Test 5: Marcar Estados Progresivos**
- [ ] Tap "Voy en Camino" → estado = `DRIVER_EN_ROUTE`
- [ ] Verificar: botones ahora son [Pasajero a Bordo] [Cancelar]
- [ ] Tap "Pasajero a Bordo" → estado = `PASSENGER_ONBOARD`
- [ ] Verificar: botón ahora es solo [Finalizar Viaje]
- [ ] Tap "Finalizar Viaje" → estado = `COMPLETED`
- [ ] Verificar: navega de vuelta a Home o muestra confirmación

**Test 6: Rechazar Servicio**
- [ ] Crear nuevo assignment con estado `SENT_TO_DRIVER`
- [ ] En detalle, tap "Rechazar"
- [ ] Verificar: muestra modal de confirmación
- [ ] Ingresar motivo (opcional)
- [ ] Confirmar rechazo
- [ ] Verificar: estado = `REJECTED_BY_DRIVER`
- [ ] Verificar: servicio ya no aparece en lista de Home
- [ ] Verificar: aparece en historial

**Test 7: Cancelar Servicio**
- [ ] Crear assignment y aceptarlo (estado `ACCEPTED_BY_DRIVER`)
- [ ] Tap "Cancelar"
- [ ] Verificar: muestra modal requiriendo razón
- [ ] Intentar confirmar sin razón → error
- [ ] Ingresar razón válida (> 10 chars)
- [ ] Confirmar cancelación
- [ ] Verificar: estado = `CANCELED`
- [ ] Verificar: cancellationReason guardado
- [ ] Verificar: taxi liberado (backend)

**Test 8: Historial**
- [ ] Navegar a tab "Historial"
- [ ] Verificar: muestra servicios `COMPLETED` y `CANCELED`
- [ ] Verificar: orden cronológico (más recientes primero)
- [ ] Verificar: muestra duración del viaje
- [ ] Tap en servicio → navega a detalle (solo lectura)

**Test 9: Perfil**
- [ ] Navegar a tab "Perfil"
- [ ] Verificar: muestra nombre del conductor
- [ ] Verificar: muestra teléfono y email
- [ ] Verificar: muestra operador/gremio
- [ ] Verificar: muestra vehículo (patente, tipo)
- [ ] Tap "Cerrar Sesión"
- [ ] Confirmar
- [ ] Verificar: borra token de SecureStore
- [ ] Verificar: navega a Login

**Test 10: Notificaciones Push (si implementado)**
- [ ] Operador crea nuevo assignment desde Backoffice
- [ ] Verificar: conductor recibe push notification
- [ ] Tap en notificación → abre app en detalle del servicio

**Test 11: Manejo de Errores**
- [ ] Intentar login con credenciales incorrectas → error visible
- [ ] Perder conexión durante request → mensaje de error
- [ ] Token expirado → redirige a login
- [ ] Transición inválida → error del backend visible

**Test 12: Offline Handling (opcional para MVP)**
- [ ] Modo avión → mostrar mensaje "Sin conexión"
- [ ] Recuperar conexión → reintentar requests pendientes

---

## Integración con Backoffice (FASE 12)

### Flujo Completo Operador ↔ Conductor

```
1. OPERADOR (Backoffice)
   └─> Crea Assignment (estado: CREATED)
   └─> Marca como "Enviado al Conductor" (estado: SENT_TO_DRIVER)
   └─> (Opcional) Backend envía push notification

2. CONDUCTOR (App Móvil)
   └─> Recibe notificación
   └─> Abre app → ve servicio en lista
   └─> Tap en servicio → ve detalle
   └─> Tap "Aceptar Servicio" (estado: ACCEPTED_BY_DRIVER)

3. BACKEND
   └─> Actualiza Assignment.status
   └─> Actualiza PassengerRequest.status
   └─> Registra en AuditLog
   └─> (Opcional) Notifica a operador

4. OPERADOR (Backoffice)
   └─> Refresca página de seguimiento
   └─> Ve que conductor aceptó
   └─> Observa timeline actualizado

5. CONDUCTOR (App Móvil)
   └─> Tap "Pasajero a Bordo"
   └─> Tap "Finalizar Viaje"

6. BACKEND
   └─> Marca Assignment como COMPLETED
   └─> Libera Taxi (status = AVAILABLE)
   └─> Registra en AuditLog

7. OPERADOR (Backoffice)
   └─> Ve viaje completado
   └─> Taxi aparece disponible para nueva asignación
```

---

## Modificaciones Requeridas al Backend (FASE 12)

### 1. Agregar campo password a Driver

```prisma
model Driver {
  // ... campos existentes
  password String // Hasheado con bcrypt

  // ... relaciones
}
```

**Migración**:
```bash
npx prisma migrate dev --name add_driver_password
```

### 2. Crear script de seed para conductores

```typescript
// scripts/seed-drivers.ts
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('test123', 10);

  await prisma.driver.create({
    data: {
      fullName: 'Juan Pérez González',
      phone: '+56912345678',
      email: 'juan.conductor@etaxi.cl',
      password: hashedPassword,
      professionalLicense: '12345678-9',
      licenseValidUntil: new Date('2025-12-31'),
      isEnabled: true,
      fleetOperatorId: '<id-del-operador>',
    },
  });

  console.log('Conductor de prueba creado');
}

main();
```

### 3. Implementar endpoints de DRIVER-APP-3

Crear en `app/api/driver/`:
- `login/route.ts`
- `me/route.ts`
- `assignments/route.ts`
- `assignments/[id]/route.ts`
- `assignments/[id]/state/route.ts`
- `assignments/history/route.ts`

Crear utilidad en `lib/driver-auth.ts`:
```typescript
export async function verifyDriverToken(req: Request) {
  // Verificar JWT
  // Retornar payload con driverId
}
```

---

## Próximos Pasos

### Opción A: Implementar Backend (Recomendado primero)
```bash
# 1. Agregar password a Driver
npx prisma migrate dev --name add_driver_password

# 2. Crear conductores de prueba
npm run seed:drivers

# 3. Implementar endpoints
# Crear archivos en app/api/driver/

# 4. Testear con Postman/curl
curl -X POST http://localhost:3000/api/driver/login ...
```

### Opción B: Scaffold App Móvil (FASE 14)
```bash
# Crear proyecto Expo
npx create-expo-app etaxi-driver-app --template typescript

# Instalar dependencias
npm install @react-navigation/native @react-navigation/native-stack
npm install zustand axios expo-secure-store expo-notifications

# Crear estructura de carpetas
mkdir -p src/{screens,navigation,services,components,types,constants}

# Implementar pantallas según DRIVER-APP-2
```

---

## Stack vs Tiempo Estimado

| Fase | Descripción | Tiempo Estimado |
|------|-------------|-----------------|
| ✅ FASE 13 | Diseño y especificación (completado) | - |
| ⏳ Backend API | Implementar 6 endpoints + auth | 8-12 horas |
| ⏳ FASE 14 | Scaffold app + pantallas base | 16-20 horas |
| ⏳ FASE 15 | Conectar app con API + testing | 12-16 horas |
| ⏳ FASE 16 | Polish UI + push notifications | 8-12 horas |
| **TOTAL** | **MVP App Conductor funcional** | **~50-60 horas** |

---

## Archivos de Referencia Creados

1. `docs/APP_CONDUCTOR_STACK_TECH.md` (12KB)
2. `docs/APP_CONDUCTOR_PANTALLAS.md` (18KB)
3. `docs/APP_CONDUCTOR_API.md` (22KB)
4. `FASE13_APP_CONDUCTOR_COMPLETA.md` (este archivo)

---

## Conclusión

✅ **FASE 13 COMPLETADA EXITOSAMENTE**

La App Conductor está **100% especificada** y lista para implementación. Un desarrollador o IA puede tomar estos documentos y:

1. Implementar backend (endpoints + auth)
2. Crear proyecto Expo con la estructura definida
3. Implementar pantallas según wireframes
4. Conectar con API
5. Probar flujo completo con QA checklist

**Siguiente acción recomendada**: Implementar endpoints backend primero, luego proceder con FASE 14 (scaffold de la app móvil).

---

**Versión**: 1.0 - Especificación Completa
**Fecha**: 2025-01-15
**Estado**: Listo para Implementación
**Desarrollador**: Claude Code (Sonnet 4.5)
