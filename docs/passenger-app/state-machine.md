# State Machine — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Especificación completa

---

## Diagrama de estados

```
                    ┌─────────────────────┐
                    │   WAITING_FOR_      │
                    │    ASSIGNMENT       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │    ASSIGNED     │   │    EXPIRED      │
          └────────┬────────┘   └─────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │  SENT_TO_DRIVER │
          └────────┬────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
┌──────────────────┐  ┌────────────────┐
│ ACCEPTED_BY_     │  │ REJECTED_BY_   │
│    DRIVER        │  │    DRIVER      │
└────────┬─────────┘  └────────────────┘
         │
         ▼
┌──────────────────┐
│  DRIVER_EN_ROUTE │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ PASSENGER_       │
│   ONBOARD        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    COMPLETED     │
└──────────────────┘

   (Desde cualquier estado activo)
              │
              ▼
      ┌──────────────┐
      │   CANCELED   │
      └──────────────┘
```

---

## Estados de PassengerRequest

### 1. WAITING_FOR_ASSIGNMENT

**Descripción**: Solicitud creada, esperando que un operador asigne un conductor.

**Pantalla**: WaitingScreen

**Acciones permitidas**:
- Pasajero puede cancelar
- Sistema puede expirar después de timeout (5 minutos)

**Transiciones posibles**:
- → `ASSIGNED` (operador asigna conductor)
- → `CANCELED` (pasajero cancela)
- → `EXPIRED` (timeout sin asignación)

**Polling**:
- App consulta cada 5 segundos: `GET /api/passenger/request/:id`
- Verifica cambio de status

**Notificaciones**:
- Ninguna en este estado

---

### 2. ASSIGNED

**Descripción**: Un conductor fue asignado a la solicitud.

**Pantalla**: AssignedScreen

**Acciones permitidas**:
- Pasajero puede cancelar (con advertencia)
- Pasajero puede llamar al conductor
- Pasajero puede ver tracking

**Transiciones posibles**:
- → `SENT_TO_DRIVER` (asignación enviada al conductor)
- → `CANCELED` (pasajero cancela)

**Polling**:
- App consulta cada 5 segundos: `GET /api/passenger/assignment/:id`

**Notificaciones**:
- Push: "¡Taxi asignado! [Nombre conductor] está en camino."

---

### 3. EXPIRED

**Descripción**: No se encontraron taxis disponibles en el tiempo límite.

**Pantalla**: Modal de error → HomeScreen

**Acciones permitidas**:
- Ninguna (estado final)

**Mensaje al usuario**:
"No encontramos taxis disponibles en tu zona. Inténtalo nuevamente más tarde."

---

## Estados de Assignment

### 4. SENT_TO_DRIVER

**Descripción**: Asignación enviada al conductor, esperando respuesta.

**Pantalla**: AssignedScreen (mostrando "Esperando confirmación del conductor...")

**Acciones permitidas**:
- Pasajero puede cancelar
- Pasajero puede llamar al conductor

**Transiciones posibles**:
- → `ACCEPTED_BY_DRIVER` (conductor acepta)
- → `REJECTED_BY_DRIVER` (conductor rechaza)
- → `CANCELED` (pasajero cancela)

**Timeout**: 2 minutos
- Si conductor no responde, se reasigna a otro conductor automáticamente

**Polling**:
- App consulta cada 5 segundos

**Notificaciones**:
- Ninguna

---

### 5. ACCEPTED_BY_DRIVER

**Descripción**: Conductor aceptó el servicio.

**Pantalla**: AssignedScreen (mostrando "Conductor confirmado")

**Acciones permitidas**:
- Pasajero puede cancelar (con advertencia)
- Pasajero puede llamar al conductor
- Pasajero puede ver tracking

**Transiciones posibles**:
- → `DRIVER_EN_ROUTE` (conductor inicia viaje hacia origen)
- → `CANCELED` (pasajero o conductor cancela)

**Polling**:
- App consulta cada 5 segundos: `GET /api/passenger/assignment/:id`

**Notificaciones**:
- Push: "Tu taxi fue confirmado. [Nombre] llegará en ~X minutos."

---

### 6. REJECTED_BY_DRIVER

**Descripción**: Conductor rechazó el servicio.

**Pantalla**: Modal informativo → Vuelve a WAITING_FOR_ASSIGNMENT

**Acciones permitidas**:
- Ninguna (estado transitorio)

**Transiciones posibles**:
- → `WAITING_FOR_ASSIGNMENT` (se reasigna automáticamente)

**Mensaje al usuario**:
"El conductor no pudo aceptar. Buscando otro taxi para ti..."

**Notificaciones**:
- Ninguna (transparente para el usuario)

---

### 7. DRIVER_EN_ROUTE

**Descripción**: Conductor está en camino hacia el punto de origen.

**Pantalla**: TrackingScreen

**Acciones permitidas**:
- Pasajero puede ver posición del taxi en tiempo real
- Pasajero puede llamar al conductor
- Pasajero puede cancelar (con advertencia fuerte)

**Transiciones posibles**:
- → `PASSENGER_ONBOARD` (conductor marca "Pasajero a bordo")
- → `CANCELED` (pasajero o conductor cancela)

**Polling**:
- Estado: cada 5 segundos
- GPS: cada 10 segundos (`GET /api/passenger/tracking/:id`)

**Notificaciones**:
- Push: "Tu taxi está cerca. Llega en ~1 minuto."
- Push: "Tu taxi ha llegado. [Nombre] te está esperando."

**ETA**:
- Se calcula basándose en distancia y velocidad promedio
- Se actualiza en tiempo real

---

### 8. PASSENGER_ONBOARD

**Descripción**: Pasajero subió al taxi, en ruta al destino.

**Pantalla**: TrackingScreen (mostrando "En viaje")

**Acciones permitidas**:
- Pasajero puede ver tracking hacia destino
- Pasajero puede llamar al conductor
- Pasajero puede cancelar (solo en emergencia)

**Transiciones posibles**:
- → `COMPLETED` (conductor marca viaje finalizado)
- → `CANCELED` (conductor o pasajero cancela)

**Polling**:
- Estado: cada 5 segundos
- GPS: cada 10 segundos

**Notificaciones**:
- Push: "Viaje iniciado. En camino a tu destino."

**UI**:
- Mapa muestra ruta del taxi al destino
- Botón de emergencia visible

---

### 9. COMPLETED

**Descripción**: Viaje finalizado exitosamente.

**Pantalla**: CompletedScreen

**Acciones permitidas**:
- Pasajero puede calificar el servicio
- Pasajero puede ver resumen del viaje
- Pasajero puede pedir otro taxi

**Transiciones posibles**:
- Ninguna (estado final)

**Polling**:
- Se detiene

**Notificaciones**:
- Push: "Viaje completado. ¡Gracias por usar ETAXI! ¿Cómo fue tu experiencia?"

**Datos mostrados**:
- Origen y destino
- Tiempo total
- Distancia (si disponible)
- Conductor y taxi
- Tarifa pagada

---

### 10. CANCELED

**Descripción**: Viaje cancelado (por pasajero o conductor).

**Pantalla**: Modal informativo → HomeScreen

**Acciones permitidas**:
- Pasajero puede ver motivo de cancelación
- Pasajero puede pedir otro taxi

**Transiciones posibles**:
- Ninguna (estado final)

**Subcasos**:

**Cancelado por pasajero**:
- Antes de ACCEPTED: Sin penalización
- Después de ACCEPTED: Advertencia de mala práctica (futuro: penalización)
- Durante viaje: Solo en emergencia

**Cancelado por conductor**:
- Mensaje: "El conductor tuvo que cancelar. Disculpa las molestias."
- Opción: "Pedir otro taxi" (automático)

**Cancelado por sistema**:
- Timeout sin respuesta del conductor
- Conductor no llegó en tiempo razonable

**Notificaciones**:
- Push: "Tu viaje fue cancelado."

---

## Reglas de transición

### Tabla de transiciones válidas

| Estado actual | Transiciones permitidas | Actor |
|---------------|-------------------------|-------|
| WAITING_FOR_ASSIGNMENT | → ASSIGNED | Operador |
| WAITING_FOR_ASSIGNMENT | → EXPIRED | Sistema |
| WAITING_FOR_ASSIGNMENT | → CANCELED | Pasajero |
| ASSIGNED | → SENT_TO_DRIVER | Sistema |
| ASSIGNED | → CANCELED | Pasajero |
| SENT_TO_DRIVER | → ACCEPTED_BY_DRIVER | Conductor |
| SENT_TO_DRIVER | → REJECTED_BY_DRIVER | Conductor |
| SENT_TO_DRIVER | → CANCELED | Pasajero |
| ACCEPTED_BY_DRIVER | → DRIVER_EN_ROUTE | Conductor |
| ACCEPTED_BY_DRIVER | → CANCELED | Pasajero/Conductor |
| DRIVER_EN_ROUTE | → PASSENGER_ONBOARD | Conductor |
| DRIVER_EN_ROUTE | → CANCELED | Pasajero/Conductor |
| PASSENGER_ONBOARD | → COMPLETED | Conductor |
| PASSENGER_ONBOARD | → CANCELED | Pasajero/Conductor |
| REJECTED_BY_DRIVER | → WAITING_FOR_ASSIGNMENT | Sistema |
| COMPLETED | - | - |
| EXPIRED | - | - |
| CANCELED | - | - |

---

## Lógica de la app

### Polling strategy

```typescript
// Mientras el viaje esté activo
useEffect(() => {
  if (isActiveTrip(status)) {
    const pollStatus = setInterval(async () => {
      const assignment = await apiGet(`/api/passenger/assignment/${id}`);
      updateTripState(assignment);

      // Detectar cambios de estado
      if (assignment.status !== currentStatus) {
        handleStatusChange(currentStatus, assignment.status);
      }
    }, 5000); // Cada 5 segundos

    return () => clearInterval(pollStatus);
  }
}, [id, status]);
```

### GPS tracking

```typescript
// Solo mientras conductor está en camino o en viaje
useEffect(() => {
  if (status === 'DRIVER_EN_ROUTE' || status === 'PASSENGER_ONBOARD') {
    const pollGPS = setInterval(async () => {
      const position = await apiGet(`/api/passenger/tracking/${assignmentId}`);
      updateDriverPosition(position);
    }, 10000); // Cada 10 segundos

    return () => clearInterval(pollGPS);
  }
}, [assignmentId, status]);
```

### Handle status change

```typescript
function handleStatusChange(oldStatus: Status, newStatus: Status) {
  // Logging
  console.log(`Status changed: ${oldStatus} → ${newStatus}`);

  // Notificaciones locales
  switch (newStatus) {
    case 'ACCEPTED_BY_DRIVER':
      showNotification('Tu taxi fue confirmado');
      navigation.navigate('AssignedScreen');
      break;

    case 'DRIVER_EN_ROUTE':
      showNotification('Tu conductor está en camino');
      navigation.navigate('TrackingScreen');
      break;

    case 'PASSENGER_ONBOARD':
      showNotification('Viaje iniciado');
      break;

    case 'COMPLETED':
      showNotification('Viaje completado');
      navigation.navigate('CompletedScreen');
      stopAllPolling();
      break;

    case 'CANCELED':
      showNotification('Viaje cancelado');
      navigation.navigate('HomeScreen');
      stopAllPolling();
      break;

    case 'REJECTED_BY_DRIVER':
      showNotification('Buscando otro taxi...');
      navigation.navigate('WaitingScreen');
      break;

    default:
      break;
  }
}
```

---

## Estados finales

Los siguientes estados son **finales** (no tienen transiciones salientes):

1. **COMPLETED** - Viaje exitoso
2. **CANCELED** - Cancelado por cualquier actor
3. **EXPIRED** - Timeout sin asignación

Cuando se alcanza un estado final:
- Se detiene todo polling
- Se detiene tracking GPS
- Se guarda el viaje en historial local
- Se limpia el state (tripStore)

---

## Timeout values

| Estado | Timeout | Acción |
|--------|---------|--------|
| WAITING_FOR_ASSIGNMENT | 5 minutos | → EXPIRED |
| SENT_TO_DRIVER | 2 minutos | → Reasignar a otro conductor |
| DRIVER_EN_ROUTE | 15 minutos* | → Mostrar alerta "¿El conductor llegó?" |

*Timeout ajustable basándose en distancia estimada

---

## Casos especiales

### Reconexión después de desconexión

**Escenario**: App pierde conexión y se reconecta después de X minutos.

**Comportamiento**:
1. Al reconectar, ejecuta `GET /api/passenger/assignment/:id`
2. Sincroniza con el estado actual del backend
3. Si el estado cambió:
   - Navega a la pantalla correcta
   - Muestra notificación de lo que pasó
4. Si el viaje finalizó (COMPLETED/CANCELED):
   - Muestra resumen
   - Limpia state local

### App cerrada (background/killed)

**Escenario**: Usuario cierra la app con un viaje activo.

**Comportamiento**:
1. Push notification notifica cambios de estado
2. Al abrir la app:
   - Verifica si hay tripId guardado en AsyncStorage
   - Consulta estado actual al backend
   - Redirige a pantalla correcta
   - Reanuda polling

### Conductor no llega

**Escenario**: Estado DRIVER_EN_ROUTE por más de 15 minutos.

**Comportamiento**:
1. Muestra modal: "¿Tu conductor llegó?"
   - "Sí, estoy en el taxi" → Marca como PASSENGER_ONBOARD
   - "No, aún no llega" → Extiende timeout
   - "Cancelar" → Cancela el viaje

### Múltiples solicitudes

**Escenario**: Usuario intenta pedir taxi mientras ya tiene uno activo.

**Comportamiento**:
1. Backend retorna 409 Conflict
2. App muestra: "Ya tienes un viaje activo. ¿Deseas cancelarlo y pedir otro?"
   - "Sí" → Cancela actual, crea nuevo
   - "No" → Vuelve a pantalla del viaje actual

---

## Persistencia de estado

### AsyncStorage keys

```typescript
{
  "currentTripId": "cm1234567890",
  "currentRequestId": "cm0987654321",
  "lastKnownStatus": "DRIVER_EN_ROUTE",
  "lastSyncedAt": "2024-11-16T14:35:00.000Z"
}
```

### Cuando guardar

- Al crear solicitud → Guardar `currentRequestId`
- Al recibir asignación → Guardar `currentTripId`
- En cada cambio de estado → Guardar `lastKnownStatus`
- Al completar/cancelar → Limpiar todo

### Cuando limpiar

- Viaje completado exitosamente
- Viaje cancelado
- Usuario hace logout
- Error irrecuperable

---

## Testing del state machine

### Test cases

1. **Happy path completo**:
   - WAITING → ASSIGNED → ACCEPTED → EN_ROUTE → ONBOARD → COMPLETED

2. **Cancelación por pasajero**:
   - Desde WAITING
   - Desde ACCEPTED
   - Desde EN_ROUTE

3. **Conductor rechaza**:
   - SENT_TO_DRIVER → REJECTED → WAITING (reasignación)

4. **Timeout**:
   - WAITING → EXPIRED (5 min sin asignación)

5. **Reconexión**:
   - Simular desconexión en cada estado
   - Verificar sincronización al reconectar

6. **App en background**:
   - Minimizar app en cada estado
   - Verificar notificaciones push
   - Verificar state al volver

---

**Fin del documento**
