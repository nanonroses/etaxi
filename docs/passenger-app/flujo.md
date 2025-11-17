# Flujo Operacional — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Diseño aprobado

---

## Diagrama general del flujo

```
[Inicio] → [Login] → [Home] → [Pedir Taxi] → [Esperando] → [Asignado] → [Tracking] → [Completado] → [Historial]
                ↓                                                ↓
              [Logout]                                      [Cancelar]
```

---

## FLUJO 1: Primera vez que abre la app

### 1.1. Splash screen
**Duración**: 1-2 segundos

**Acciones**:
- Mostrar logo ETAXI
- Verificar si hay sesión guardada en AsyncStorage
- Si hay token válido → Ir a Home (paso 3)
- Si NO hay token → Ir a Login (paso 2)

---

## FLUJO 2: Login y autenticación

### 2.1. Pantalla Login

**Elementos**:
- Logo ETAXI
- Campo: "Número de teléfono"
  - Placeholder: "+56 9 1234 5678"
  - Validación: formato chileno (+569XXXXXXXX)
- Botón: "Continuar"
- Texto legal: "Al continuar, aceptas nuestros Términos y Condiciones"

**Acciones del usuario**:
1. Ingresa teléfono: `+56912345678`
2. Presiona "Continuar"

**Acciones de la app**:
1. Valida formato del teléfono
2. Si es válido → POST `/api/passenger/send-otp`
3. Muestra loading: "Enviando código..."
4. Backend envía SMS con código OTP
5. Navega a pantalla OTP (paso 2.2)

**Manejo de errores**:
- Teléfono inválido → "Por favor ingresa un número válido"
- Error de red → "No se pudo conectar. Verifica tu conexión."
- Error del servidor → "Error al enviar código. Intenta nuevamente."

---

### 2.2. Pantalla OTP

**Elementos**:
- Texto: "Ingresa el código enviado a +56 9 1234 5678"
- 6 campos para dígitos (auto-focus)
- Botón: "Verificar"
- Link: "Reenviar código" (habilitado después de 30s)
- Link: "Cambiar número"

**Acciones del usuario**:
1. Ingresa código: `123456`
2. Presiona "Verificar"

**Acciones de la app**:
1. POST `/api/passenger/verify-otp` con phone + otp
2. Muestra loading: "Verificando..."
3. Si es válido:
   - Guarda token en AsyncStorage
   - Guarda datos del pasajero en authStore
   - Navega a Home (paso 3)
4. Si es inválido:
   - Muestra error: "Código incorrecto"
   - Permite reintentar

**Manejo de errores**:
- Código incorrecto (3 intentos) → "Código incorrecto. Te quedan X intentos."
- Código expirado → "El código expiró. Solicita uno nuevo."
- Error de red → "No se pudo verificar. Revisa tu conexión."

---

## FLUJO 3: Home (inicio)

### 3.1. Pantalla Home

**Elementos superiores**:
- Saludo: "Hola, [Nombre]" o "Hola, Pasajero"
- Ícono perfil (top-right)

**Sección principal**:
- Botón grande: "Pedir un taxi" (CTA primario)
- Icono de taxi animado

**Sección inferior** (si hay viajes recientes):
- Título: "Viajes recientes"
- Lista de últimos 3 viajes:
  - Origen → Destino
  - Fecha/hora
  - Estado (badge)
- Link: "Ver todos" → Navega a Historial

**Acciones del usuario**:
1. Presiona "Pedir un taxi" → Navega a RequestTaxiScreen (paso 4)
2. Presiona ícono perfil → Navega a ProfileScreen
3. Presiona un viaje reciente → Navega a detalle del viaje (TripDetailScreen)

---

## FLUJO 4: Pedir taxi

### 4.1. Pantalla RequestTaxiScreen

**Elementos**:
- **Mapa miniatura** (opcional MVP) mostrando ubicación actual
- **Campo origen**:
  - Auto-detecta ubicación actual (GPS)
  - Permite editar manualmente
  - Botón "Usar mi ubicación"
- **Campo destino** (opcional):
  - Placeholder: "¿A dónde vas?"
  - Puede dejarse vacío
- **Selector de tipo de taxi**:
  - Horizontal scroll de cards:
    - Básico (🚖)
    - Ejecutivo (🚙)
    - Turismo (🌎)
    - Van (🚐)
    - Lujo (💎)
  - Cada card muestra:
    - Ícono
    - Nombre
    - Descripción breve
- **Campo notas** (opcional):
  - Placeholder: "Ej: Llevo mascota, equipaje grande"
  - Max 200 caracteres
- **Botón**: "Confirmar solicitud"

**Acciones del usuario**:
1. Acepta permiso de ubicación (si es primera vez)
2. Verifica/edita dirección de origen
3. (Opcional) Ingresa dirección de destino
4. Selecciona tipo de taxi (default: Básico)
5. (Opcional) Agrega notas
6. Presiona "Confirmar solicitud"

**Acciones de la app**:
1. Valida que haya dirección de origen
2. POST `/api/passenger/create-request` con:
   ```json
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
3. Backend crea `PassengerRequest` (status: WAITING_FOR_ASSIGNMENT)
4. App guarda requestId en tripStore
5. Navega a WaitingScreen (paso 5)

**Manejo de errores**:
- Sin permiso de ubicación → "Necesitamos tu ubicación para buscar taxis cerca"
- Sin dirección de origen → "Por favor ingresa tu dirección de origen"
- Error de red → "No se pudo crear la solicitud. Verifica tu conexión."

---

## FLUJO 5: Esperando asignación

### 5.1. Pantalla WaitingScreen

**Elementos**:
- **Animación** de búsqueda (spinner + ícono de taxi moviéndose)
- **Texto principal**: "Buscando un taxi autorizado cerca de ti..."
- **Subtexto**: "Esto puede tomar unos segundos"
- **Detalles de la solicitud**:
  - Origen: Av. Providencia 1234
  - Destino: Av. Apoquindo 5678 (si lo ingresó)
  - Tipo: Básico
- **Botón secundario**: "Cancelar solicitud"

**Acciones de la app (automáticas)**:
1. Inicia polling cada 5 segundos:
   ```javascript
   setInterval(() => {
     GET /api/passenger/request/[requestId]
   }, 5000)
   ```
2. Verifica status en cada respuesta:
   - Si `status === 'ASSIGNED'` → Navega a AssignedScreen (paso 6)
   - Si `status === 'CANCELED'` → Muestra mensaje + vuelve a Home
   - Si `status === 'EXPIRED'` → Muestra "No hay taxis disponibles" + vuelve a Home
   - Si sigue `WAITING_FOR_ASSIGNMENT` → Continúa esperando

3. Timeout después de 5 minutos:
   - Muestra: "No encontramos taxis disponibles. ¿Deseas seguir esperando?"
   - Opciones: "Sí, esperar" / "Cancelar"

**Acciones del usuario**:
1. Presiona "Cancelar solicitud"
   - Muestra confirmación: "¿Estás seguro de cancelar?"
   - Si confirma → POST `/api/passenger/request/[id]/cancel`
   - Vuelve a Home

**Transición al siguiente paso**:
- Cuando backend asigna un conductor:
  - Backend cambia `PassengerRequest.status` a `ASSIGNED`
  - Backend crea `Assignment` con driverId, taxiId
  - App detecta cambio en polling
  - App ejecuta GET `/api/passenger/assignment/[assignmentId]`
  - Navega a AssignedScreen con datos de la asignación

---

## FLUJO 6: Taxi asignado

### 6.1. Pantalla AssignedScreen

**Elementos**:
- **Mensaje de éxito**: "¡Tu taxi está en camino!"
- **Card del conductor**:
  - Foto del conductor (si disponible)
  - Nombre: "Juan Pérez"
  - Calificación: ⭐ 4.8 (si disponible)
  - Licencia profesional: A1-12345678
  - Botón: "Llamar" (abre dialer con número del conductor)
- **Card del taxi**:
  - Tipo: Taxi Básico
  - Patente: AB-1234
  - Marca/modelo: Nissan Sentra 2020
  - Color: Blanco
- **Card del operador**:
  - Nombre: Gremio Taxis Santiago Centro
  - Ciudad: Santiago
- **Tiempo estimado de llegada** (si disponible):
  - "Llega en ~5 minutos"
- **Botón primario**: "Ver recorrido en vivo"
- **Botón secundario**: "Cancelar viaje"

**Acciones de la app**:
1. Muestra datos de la asignación
2. (Opcional) Calcula ETA basado en distancia GPS
3. Escucha cambios de estado (polling o WebSocket):
   - Si `status === 'DRIVER_EN_ROUTE'` → Muestra "Tu conductor ya salió"
   - Si `status === 'CANCELED'` → Muestra mensaje + vuelve a Home

**Acciones del usuario**:
1. Presiona "Ver recorrido en vivo" → Navega a TrackingScreen (paso 7)
2. Presiona "Llamar" → Abre app de teléfono con número del conductor
3. Presiona "Cancelar viaje":
   - Muestra confirmación: "¿Estás seguro? El conductor ya está en camino."
   - Si confirma → POST `/api/passenger/request/[id]/cancel`
   - Vuelve a Home

---

## FLUJO 7: Tracking en vivo

### 7.1. Pantalla TrackingScreen

**Elementos**:
- **Mapa a pantalla completa** (Google Maps / Apple Maps)
- **Marcadores**:
  - 📍 Origen (pickup) - pin verde
  - 🚖 Taxi (posición en vivo) - ícono de taxi moviéndose
  - 📍 Destino (dropoff) - pin rojo (si fue ingresado)
- **Card flotante inferior**:
  - Estado actual: "Tu conductor está en camino" / "Pasajero a bordo" / "En ruta al destino"
  - Conductor: [Nombre] - [Patente]
  - Tiempo estimado: "Llega en ~3 minutos" (si está en camino)
  - Botón: "Llamar al conductor"

**Acciones de la app (automáticas)**:
1. Inicia tracking GPS cada 10 segundos:
   ```javascript
   setInterval(() => {
     GET /api/passenger/tracking/[assignmentId]
   }, 10000)
   ```
2. Actualiza posición del marcador del taxi en el mapa
3. (Opcional) Rota ícono del taxi según heading
4. Centra mapa automáticamente para mostrar taxi + destino

5. Poll de estado del viaje cada 5 segundos:
   ```javascript
   GET /api/passenger/assignment/[assignmentId]
   ```
   - Si `status === 'PASSENGER_ONBOARD'`:
     - Cambia texto a "Pasajero a bordo - En ruta al destino"
     - Anima ruta hacia destino (opcional)
   - Si `status === 'COMPLETED'`:
     - Para tracking
     - Navega a CompletedScreen (paso 8)
   - Si `status === 'CANCELED'`:
     - Muestra mensaje "Viaje cancelado"
     - Vuelve a Home

**Acciones del usuario**:
1. Visualiza posición del taxi en tiempo real
2. Presiona "Llamar al conductor" → Abre dialer
3. Puede hacer zoom/pan en el mapa

---

## FLUJO 8: Viaje completado

### 8.1. Pantalla CompletedScreen

**Elementos**:
- **Mensaje**: "¡Viaje completado!"
- **Resumen del viaje**:
  - Origen: Av. Providencia 1234
  - Destino: Av. Apoquindo 5678
  - Distancia: 8.5 km (si disponible)
  - Duración: 25 minutos
  - Conductor: Juan Pérez
  - Taxi: AB-1234 (Nissan Sentra)
  - Operador: Gremio Taxis Santiago Centro
- **Tarifa** (según medidor):
  - Monto: $8,500
  - Nota: "Pagado en efectivo al conductor" (en MVP)
- **Sección de calificación** (opcional MVP):
  - "¿Cómo fue tu viaje?"
  - 5 estrellas (seleccionables)
  - Campo de comentario opcional
  - Botón: "Enviar calificación"
- **Botón primario**: "Pedir otro taxi"
- **Botón secundario**: "Volver al inicio"

**Acciones del usuario**:
1. (Opcional) Califica el viaje:
   - Selecciona estrellas (1-5)
   - Escribe comentario
   - Presiona "Enviar calificación"
   - POST `/api/passenger/rating` con assignmentId, rating, comment
2. Presiona "Pedir otro taxi" → Navega a RequestTaxiScreen (paso 4)
3. Presiona "Volver al inicio" → Navega a Home (paso 3)

**Acciones de la app**:
1. Limpia tripStore (currentRequest, currentAssignment)
2. Actualiza historial local (opcional)

---

## FLUJO 9: Historial de viajes

### 9.1. Pantalla HistoryScreen

**Elementos**:
- **Título**: "Historial de viajes"
- **Filtros** (tabs):
  - Últimos 7 días
  - Últimos 30 días
  - Todos
- **Lista de viajes**:
  - Card por viaje mostrando:
    - Fecha/hora: "15 Nov, 14:30"
    - Origen → Destino
    - Estado: badge (Completado / Cancelado)
    - Conductor: [Nombre]
    - Taxi: [Patente]
    - Calificación: ⭐ 5 (si la dio)
  - Ordenados por fecha desc

**Acciones de la app**:
1. Al entrar → GET `/api/passenger/history?limit=20&offset=0`
2. Muestra lista
3. Scroll infinito: carga más al llegar al final

**Acciones del usuario**:
1. Presiona filtro → Recarga lista con parámetros de fecha
2. Presiona un viaje → Navega a TripDetailScreen (paso 9.2)
3. Pull to refresh → Recarga lista

---

### 9.2. Pantalla TripDetailScreen

**Elementos**:
- **Título**: "Detalle del viaje"
- **Datos del viaje**:
  - Fecha/hora completa
  - Estado final
  - Origen (dirección + coordenadas en mapa)
  - Destino (dirección + coordenadas en mapa)
  - Ruta en mapa (opcional)
- **Datos del conductor y taxi** (igual que en AssignedScreen)
- **Resumen de costos** (si disponible):
  - Tarifa base
  - Monto total
- **Calificación dada** (si la dio)
- **Botón**: "Volver atrás"

---

## FLUJO 10: Perfil

### 10.1. Pantalla ProfileScreen

**Elementos**:
- **Avatar** (iniciales o foto)
- **Datos personales**:
  - Nombre: [Editable]
  - Teléfono: +56 9 1234 5678 (no editable)
  - Email: [Editable, opcional]
- **Estadísticas** (opcional):
  - Viajes totales: 15
  - Calificación promedio dada: ⭐ 4.5
- **Sección de configuración**:
  - Notificaciones (toggle)
  - Permisos de ubicación
- **Botón**: "Cerrar sesión"

**Acciones del usuario**:
1. Edita nombre/email → Guarda cambios (POST `/api/passenger/profile`)
2. Presiona "Cerrar sesión":
   - Muestra confirmación: "¿Estás seguro?"
   - Si confirma:
     - Limpia AsyncStorage
     - Limpia stores (authStore, tripStore)
     - Navega a LoginScreen

---

## FLUJO 11: Notificaciones push (opcional MVP)

### 11.1. Eventos que generan notificación

1. **Taxi asignado**:
   - Título: "¡Taxi asignado!"
   - Mensaje: "Juan Pérez está en camino. Llega en ~5 min."
   - Acción: Abre app en AssignedScreen

2. **Conductor llegó**:
   - Título: "Tu taxi ha llegado"
   - Mensaje: "Juan Pérez te está esperando en [Dirección]"
   - Acción: Abre app en AssignedScreen

3. **Viaje iniciado**:
   - Título: "Viaje iniciado"
   - Mensaje: "En camino a tu destino"
   - Acción: Abre app en TrackingScreen

4. **Viaje completado**:
   - Título: "Viaje completado"
   - Mensaje: "¿Cómo fue tu experiencia? Califícanos"
   - Acción: Abre app en CompletedScreen

5. **Viaje cancelado**:
   - Título: "Viaje cancelado"
   - Mensaje: "El conductor canceló el viaje. Disculpa las molestias."
   - Acción: Abre app en Home

---

## FLUJO 12: Manejo de errores y edge cases

### 12.1. Sin conexión a internet

**En cualquier pantalla**:
- Muestra banner superior: "Sin conexión. Algunas funciones están limitadas."
- Desactiva botón "Pedir taxi"
- Muestra último estado guardado en caché
- Al recuperar conexión → Sincroniza automáticamente

### 12.2. Token expirado

**En cualquier request**:
- Backend retorna 401 Unauthorized
- App detecta error
- Muestra mensaje: "Tu sesión expiró. Por favor inicia sesión nuevamente."
- Limpia AsyncStorage
- Navega a LoginScreen

### 12.3. Timeout en espera de asignación

**Después de 5 minutos**:
- Muestra modal: "No encontramos taxis disponibles en tu zona. ¿Deseas seguir esperando?"
- Opciones:
  - "Sí, esperar más" → Continúa polling
  - "Cancelar" → Cancela solicitud y vuelve a Home

### 12.4. GPS desactivado

**Al pedir taxi**:
- Detecta que GPS está desactivado
- Muestra modal: "Necesitamos tu ubicación para buscar taxis cerca"
- Opciones:
  - "Activar GPS" → Abre configuración del dispositivo
  - "Ingresar manualmente" → Permite escribir dirección

### 12.5. Conductor canceló el viaje

**Durante espera o tracking**:
- Backend cambia status a CANCELED (assignedBy: DRIVER)
- App detecta cambio en polling
- Muestra modal: "El conductor canceló el viaje. Disculpa las molestias. ¿Deseas pedir otro taxi?"
- Opciones:
  - "Sí, pedir otro" → Navega a RequestTaxiScreen
  - "No, volver" → Navega a Home

---

## Resumen de transiciones de pantallas

```
LoginScreen
  → OTPScreen
    → HomeScreen
      → RequestTaxiScreen
        → WaitingScreen
          → AssignedScreen
            → TrackingScreen
              → CompletedScreen
                → HomeScreen

HomeScreen
  → ProfileScreen
  → HistoryScreen
    → TripDetailScreen
```

---

**Fin del documento**
