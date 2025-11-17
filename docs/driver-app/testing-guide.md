# GUÍA COMPLETA DE TESTING — APP CONDUCTOR ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Ready for testing

---

## RESUMEN

Esta guía proporciona instrucciones paso a paso para probar la **App Conductor ETAXI** completa, validando todas las funcionalidades implementadas en FASES 14-17.

---

## PRERREQUISITOS

### 1. Backend funcionando

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
npm run dev
```

**Verificar**: http://localhost:3000 debe estar accesible

### 2. Base de datos configurada

**Variables requeridas en `.env.local`**:
```bash
DATABASE_URL=postgresql://...
AUTH_SECRET=<tu-secret>
DRIVER_JWT_SECRET=<tu-secret-diferente>
```

**Verificar conexión**:
```bash
npx prisma db push
```

### 3. App Conductor instalada

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi-driver
npm install
```

---

## PASO 1: CREAR DATOS DE PRUEBA

### 1.1. Crear conductor de prueba

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
npx tsx scripts/create-test-driver.ts
```

**Output esperado**:
```
🚀 Creando conductor de prueba...

✅ Operador creado: Operador Demo
✅ Conductor creado exitosamente!

📱 CREDENCIALES DE PRUEBA:
   Teléfono: +56912345678
   Password: conductor123
   ID: [uuid]
   Nombre: Conductor Demo
   Email: conductor@etaxi.cl
   Operador: Operador Demo

✅ Taxi creado: AB1234
```

**¿Ya existe el conductor?**
- El script actualiza el password automáticamente
- Puedes ejecutarlo múltiples veces sin problema

### 1.2. Crear asignación de prueba

```bash
npx tsx scripts/create-test-assignment.ts
```

**Output esperado**:
```
🚀 Creando asignación de prueba...

✅ Conductor encontrado: Conductor Demo
✅ Taxi encontrado: AB1234

👥 Creando solicitud de pasajero...
✅ Solicitud creada: [uuid]

📋 Creando asignación...
✅ Asignación creada: [uuid]

✨ ¡Asignación de prueba creada exitosamente!

📱 Ahora puedes:
   1. Abrir la app conductor
   2. Login con +56912345678
   3. Ver la asignación en Home
   4. Probar los cambios de estado

📊 Detalles de la asignación:
   ID: [uuid]
   Estado: SENT_TO_DRIVER
   Conductor: Conductor Demo
   Taxi: AB1234
   Pasajero: Juan Pérez
   Origen: Av. Providencia 1234, Santiago
   Destino: Av. Apoquindo 5678, Las Condes
```

---

## PASO 2: CONFIGURAR URL DEL BACKEND EN LA APP

### 2.1. Determinar tu configuración

**Opción A: Emulador Android/iOS**
- Usa `http://localhost:3000`

**Opción B: Dispositivo físico en misma red Wi-Fi**
- Necesitas tu IP local
- Ejecutar: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
- Buscar "IPv4 Address" (ej: `192.168.1.100`)
- Usa `http://192.168.1.100:3000`

**Opción C: Expo Go en dispositivo físico con tunnel**
- Usa `http://localhost:3000` (Expo maneja el túnel)

### 2.2. Editar configuración de la app

**Archivo**: `etaxi-driver/src/api/client.ts`

**Línea 8**:
```typescript
// ANTES (para emulador)
const BASE_URL = 'http://localhost:3000';

// DESPUÉS (para dispositivo físico)
const BASE_URL = 'http://192.168.1.100:3000'; // ← Reemplaza con TU IP local
```

**Guardar el archivo**.

---

## PASO 3: INICIAR LA APP

### 3.1. Iniciar Expo

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi-driver
npm start
```

**Output**:
```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

### 3.2. Abrir en dispositivo/emulador

**Android Emulator**:
- Presionar `a`
- Esperar que abra el emulador

**Dispositivo físico**:
- Instalar **Expo Go** desde Play Store/App Store
- Escanear QR code
- Esperar que cargue

**iOS Simulator** (solo macOS):
- Presionar `i`

---

## PASO 4: TESTING DE AUTENTICACIÓN

### Test 4.1: Login exitoso

**Pasos**:
1. Abrir la app
2. Ingresar en campo "Teléfono o Email": `+56912345678`
3. Ingresar en campo "Contraseña": `conductor123`
4. Presionar botón "Iniciar sesión"

**Resultado esperado**:
- ✅ Botón muestra "Iniciando sesión..."
- ✅ Redirige automáticamente a pantalla Home
- ✅ No hay errores en consola

### Test 4.2: Login con credenciales incorrectas

**Pasos**:
1. Salir de la app (Profile → Cerrar sesión)
2. Ingresar password incorrecto: `wrongpassword`
3. Presionar "Iniciar sesión"

**Resultado esperado**:
- ❌ Muestra error "Credenciales incorrectas"
- ❌ No redirige
- ❌ Campos permanecen llenos

### Test 4.3: Persistencia de sesión

**Pasos**:
1. Login exitoso
2. Cerrar app completamente (swipe up en recientes)
3. Volver a abrir app

**Resultado esperado**:
- ✅ Redirige directamente a Home (sin pasar por Login)
- ✅ Token persiste correctamente

---

## PASO 5: TESTING DE HOME SCREEN

### Test 5.1: Ver asignación pendiente

**Pasos**:
1. Estar en Home después de login
2. Observar lista de asignaciones

**Resultado esperado**:
- ✅ Muestra card de la asignación creada
- ✅ Card muestra:
  - Nombre del pasajero: "Juan Pérez"
  - Teléfono: "+56987654321"
  - Origen: "Av. Providencia 1234, Santiago"
  - Destino: "Av. Apoquindo 5678, Las Condes"
  - Estado: tag rojo "Enviado"
  - Hora de solicitud

### Test 5.2: Pull to refresh

**Pasos**:
1. Deslizar hacia abajo en la lista
2. Soltar

**Resultado esperado**:
- ✅ Muestra indicador de carga
- ✅ Lista se actualiza
- ✅ Vuelve a mostrar asignaciones

### Test 5.3: Estado vacío

**Pasos**:
1. En Prisma Studio, eliminar todas las asignaciones del conductor
2. Hacer pull to refresh en la app

**Resultado esperado**:
- ✅ Muestra mensaje "No tienes servicios asignados por ahora."
- ✅ No hay cards vacías

### Test 5.4: Navegación a detalle

**Pasos**:
1. Tener al menos 1 asignación
2. Tap en la card

**Resultado esperado**:
- ✅ Navega a pantalla de detalle
- ✅ Muestra datos completos de la asignación
- ✅ Muestra botones de acción

---

## PASO 6: TESTING DE ASSIGNMENT DETAIL

### Test 6.1: Ver datos completos

**Resultado esperado**:
- ✅ Muestra pasajero (nombre, teléfono, email si disponible)
- ✅ Muestra origen y destino completos
- ✅ Muestra estado con tag coloreado
- ✅ Muestra botones según estado actual

### Test 6.2: State machine - SENT_TO_DRIVER → ACCEPTED

**Estado inicial**: SENT_TO_DRIVER

**Pasos**:
1. Presionar botón "Aceptar servicio"

**Resultado esperado**:
- ✅ Tag cambia a naranja "Aceptado"
- ✅ Botones cambian a: "Voy en camino" y "Cancelar"
- ✅ No hay error

### Test 6.3: State machine - ACCEPTED → DRIVER_EN_ROUTE

**Estado inicial**: ACCEPTED_BY_DRIVER

**Pasos**:
1. Presionar botón "Voy en camino"

**Resultado esperado**:
- ✅ Tag cambia a azul "En camino"
- ✅ Botones cambian a: "Pasajero a bordo" y "Cancelar"

### Test 6.4: State machine - EN_ROUTE → PASSENGER_ONBOARD

**Estado inicial**: DRIVER_EN_ROUTE

**Pasos**:
1. Presionar botón "Pasajero a bordo"

**Resultado esperado**:
- ✅ Tag cambia a púrpura "Pasajero a bordo"
- ✅ Botones cambian a: "Finalizado" y "Cancelar"

### Test 6.5: State machine - ONBOARD → COMPLETED

**Estado inicial**: PASSENGER_ONBOARD

**Pasos**:
1. Presionar botón "Finalizado"

**Resultado esperado**:
- ✅ Tag cambia a verde "Completado"
- ✅ Botones desaparecen (estado final)
- ✅ Asignación ya no aparece en Home

### Test 6.6: Rechazar servicio (con confirmación)

**Estado inicial**: SENT_TO_DRIVER (crear nueva asignación)

**Pasos**:
1. Presionar botón "Rechazar"
2. Aparece confirmación: "¿Estás seguro de rechazar este servicio?"
3. Presionar "Sí"

**Resultado esperado**:
- ✅ Tag cambia a gris "Rechazado"
- ✅ Botones desaparecen
- ✅ Asignación ya no aparece en Home

### Test 6.7: Cancelar servicio (con confirmación)

**Estado inicial**: ACCEPTED_BY_DRIVER (crear nueva, aceptar)

**Pasos**:
1. Presionar botón "Cancelar"
2. Aparece confirmación: "¿Estás seguro de cancelar este servicio?"
3. Presionar "Sí"

**Resultado esperado**:
- ✅ Tag cambia a rojo "Cancelado"
- ✅ Botones desaparecen
- ✅ Asignación ya no aparece en Home

### Test 6.8: Llamar al pasajero

**Pasos**:
1. Presionar botón "Llamar" (icono teléfono junto al número)

**Resultado esperado**:
- ✅ Abre app de teléfono con número pre-marcado: +56987654321

---

## PASO 7: TESTING DE GPS TRACKING

### Test 7.1: Solicitar permiso de ubicación

**Pasos**:
1. Primera vez que abres la app en dispositivo
2. Observar popup de permisos

**Resultado esperado**:
- ✅ Aparece popup "Etaxi Driver wants to access your location"
- ✅ Presionar "Allow While Using App" (iOS) o "Allow" (Android)

### Test 7.2: Verificar envío de ubicación

**Pasos**:
1. Estar loggeado
2. Esperar 25 segundos
3. Revisar logs del backend

**Resultado esperado en backend**:
```
POST /api/driver/location 200
Body: { lat: -33.4489, lng: -70.6693 }
```

**Verificar en consola de Expo**:
```
Location sent successfully
```

### Test 7.3: Verificar periodicidad

**Pasos**:
1. Dejar app abierta 2 minutos
2. Contar requests en backend logs

**Resultado esperado**:
- ✅ Aproximadamente 4-5 requests (cada 25s)
- ✅ Coordenadas actualizadas

### Test 7.4: Manejo de error de permisos

**Pasos**:
1. Denegar permiso de ubicación
2. Observar comportamiento

**Resultado esperado**:
- ✅ App no crashea
- ✅ Mensaje en logs: "Location permission not granted"
- ✅ Resto de funcionalidades funcionan normalmente

---

## PASO 8: TESTING DE HISTORIAL

### Test 8.1: Ver viajes completados

**Pasos**:
1. Completar al menos 1 asignación (COMPLETED)
2. Ir a tab "Historial"

**Resultado esperado**:
- ✅ Muestra card del viaje completado
- ✅ Card muestra:
  - Origen → Destino
  - Estado: "Completado" (verde)
  - Fecha/hora del viaje

### Test 8.2: Filtro últimos 7 días

**Pasos**:
1. En Historial
2. Presionar filtro "Últimos 7 días"

**Resultado esperado**:
- ✅ Muestra solo viajes de última semana
- ✅ Filtro aparece seleccionado

### Test 8.3: Filtro últimos 30 días

**Pasos**:
1. Presionar filtro "Últimos 30 días"

**Resultado esperado**:
- ✅ Muestra viajes del último mes
- ✅ Filtro aparece seleccionado

---

## PASO 9: TESTING DE PERFIL

### Test 9.1: Ver datos del conductor

**Pasos**:
1. Ir a tab "Perfil"

**Resultado esperado**:
- ✅ Muestra nombre: "Conductor Demo"
- ✅ Muestra teléfono: "+56912345678"
- ✅ Muestra email: "conductor@etaxi.cl"
- ✅ Muestra operador: "Operador Demo"
- ✅ Muestra licencia: "A1234567"

### Test 9.2: Cerrar sesión (con confirmación)

**Pasos**:
1. Presionar botón "Cerrar sesión"
2. Aparece confirmación: "¿Estás seguro de cerrar sesión?"
3. Presionar "Sí"

**Resultado esperado**:
- ✅ Redirige a pantalla Login
- ✅ Token eliminado de AsyncStorage
- ✅ Al volver a abrir app, pide login nuevamente

### Test 9.3: Cancelar logout

**Pasos**:
1. Presionar "Cerrar sesión"
2. En confirmación, presionar "No"

**Resultado esperado**:
- ✅ Permanece en Perfil
- ✅ Sesión sigue activa

---

## PASO 10: TESTING DE ERRORES Y EDGE CASES

### Test 10.1: Sin conexión a internet

**Pasos**:
1. Activar modo avión
2. Intentar hacer login

**Resultado esperado**:
- ❌ Muestra error "No se pudo conectar al servidor. Verifica tu conexión."
- ❌ No crashea

### Test 10.2: Backend apagado

**Pasos**:
1. Detener backend (Ctrl+C en terminal)
2. Intentar pull to refresh en Home

**Resultado esperado**:
- ❌ Muestra error "No se pudo conectar al servidor"
- ✅ Botón "Reintentar" disponible

### Test 10.3: Token expirado

**Pasos**:
1. Login exitoso
2. En `lib/driver-auth.ts` cambiar `expiresIn: '7d'` a `expiresIn: '1s'`
3. Reiniciar backend
4. Esperar 2 segundos
5. Intentar cambiar estado de asignación

**Resultado esperado**:
- ✅ Recibe 401 Unauthorized
- ✅ App redirige automáticamente a Login
- ✅ Muestra mensaje "Sesión expirada. Por favor inicia sesión nuevamente."

### Test 10.4: Campos vacíos en login

**Pasos**:
1. Dejar campos vacíos
2. Presionar "Iniciar sesión"

**Resultado esperado**:
- ❌ Muestra error "Por favor completa todos los campos"
- ❌ No hace request al backend

---

## VERIFICACIÓN FINAL - CHECKLIST

Marca cada ítem al completarlo:

### Autenticación
- [ ] Login exitoso con credenciales correctas
- [ ] Error con credenciales incorrectas
- [ ] Persistencia de sesión (reabrir app)
- [ ] Logout funcional con confirmación
- [ ] Token expirado redirige a Login

### Home Screen
- [ ] Lista de asignaciones se muestra correctamente
- [ ] Pull to refresh funciona
- [ ] Estado vacío se muestra cuando no hay asignaciones
- [ ] Navegación a detalle funciona

### Assignment Detail
- [ ] Todos los datos se muestran correctamente
- [ ] Transición SENT → ACCEPTED
- [ ] Transición ACCEPTED → EN_ROUTE
- [ ] Transición EN_ROUTE → ONBOARD
- [ ] Transición ONBOARD → COMPLETED
- [ ] Rechazar servicio (con confirmación)
- [ ] Cancelar servicio (con confirmación)
- [ ] Botón llamar abre dialer

### GPS Tracking
- [ ] Solicita permiso al abrir
- [ ] Envía ubicación cada 25s
- [ ] Backend recibe coordenadas correctas
- [ ] Maneja rechazo de permisos sin crashear

### Historial
- [ ] Muestra viajes completados/cancelados
- [ ] Filtro últimos 7 días funciona
- [ ] Filtro últimos 30 días funciona
- [ ] Cards muestran datos correctos

### Perfil
- [ ] Muestra datos del conductor correctamente
- [ ] Logout funciona
- [ ] Confirmación antes de logout

### Manejo de errores
- [ ] Sin internet muestra error apropiado
- [ ] Backend apagado muestra error
- [ ] No crashea en ningún escenario
- [ ] Mensajes de error son claros

---

## TROUBLESHOOTING

### Problema: "Network request failed"

**Causas posibles**:
1. Backend no está corriendo
2. URL incorrecta en `api/client.ts`
3. Firewall bloqueando puerto 3000
4. Dispositivo en red diferente

**Solución**:
```bash
# 1. Verificar backend
curl http://localhost:3000/api/health

# 2. Verificar IP en client.ts
# Para dispositivo físico, usar IP local (no localhost)

# 3. Permitir puerto en firewall
# Windows: Agregar regla para puerto 3000
```

### Problema: "Unauthorized" (401)

**Causas**:
1. Token expirado
2. DRIVER_JWT_SECRET diferente entre backend y app
3. Token no se está enviando correctamente

**Solución**:
```bash
# 1. Cerrar sesión y volver a logear
# 2. Verificar .env.local tenga DRIVER_JWT_SECRET configurado
# 3. Verificar headers en DevTools
```

### Problema: Asignaciones no aparecen

**Causas**:
1. No hay asignaciones en BD
2. Driver ID no coincide
3. Estado filtrado incorrectamente

**Solución**:
```bash
# Crear nueva asignación
npx tsx scripts/create-test-assignment.ts

# Verificar en Prisma Studio
npx prisma studio
# Ver tabla Assignment
```

### Problema: GPS no funciona

**Causas**:
1. Permisos denegados
2. Emulador sin GPS configurado
3. Token no disponible

**Solución**:
```bash
# Android Emulator: Configurar GPS
# Settings → Location → Mode: High accuracy

# iOS Simulator: Usar location feature
# Features → Location → Custom Location

# Dispositivo real: Verificar permisos en Settings
```

---

## LOGS ÚTILES

### Backend logs esperados

```bash
# Login exitoso
POST /api/driver/login 200 (123ms)

# Obtener asignaciones
GET /api/driver/assignments 200 (45ms)

# Cambiar estado
POST /api/driver/assignments/[id]/state 200 (67ms)

# GPS tracking
POST /api/driver/location 200 (12ms)
```

### App logs esperados (Expo DevTools)

```bash
# Login
Login successful, token received

# GPS tracking
Location permission granted
Location sent successfully

# State change
Assignment state updated to ACCEPTED_BY_DRIVER
```

---

## NEXT STEPS DESPUÉS DE TESTING

### 1. Deployment a Staging

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar proyecto
eas build:configure

# Build para Android (internal testing)
eas build --platform android --profile preview
```

### 2. Distribución interna

**Android**:
- Google Play Console → Internal Testing
- Agregar testers por email
- Compartir link de testing

**iOS**:
- TestFlight
- Agregar testers
- Enviar build para review interno

### 3. Feedback y refinamiento

- Recopilar feedback de conductores
- Ajustar UI/UX según necesidad
- Iterar sobre funcionalidades

---

## MÉTRICAS DE ÉXITO

El testing es exitoso si:

- ✅ **100% de los tests pasan**
- ✅ **No hay crashes en ningún flujo**
- ✅ **GPS tracking funciona correctamente**
- ✅ **State machine completa sin errores**
- ✅ **Login/logout funcionan perfectamente**
- ✅ **Performance es fluida (no lag)**

---

**Fin de la guía de testing**
