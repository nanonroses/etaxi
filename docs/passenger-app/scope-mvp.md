# Alcance MVP — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Diseño aprobado

---

## Propósito

Permitir que cualquier persona en Chile pueda:

1. **Pedir un taxi regulado** con licencia clase A municipal.
2. **Verificar la identidad del conductor** antes de subir al vehículo.
3. **Seguir el vehículo en vivo** durante todo el trayecto.
4. **Recibir confirmación del viaje asignado** con datos del conductor, taxi y operador/gremio.
5. **Calificar el servicio** (opcional en MVP).

---

## Contexto legal y operacional

### Base legal
- **Ley 21.553** (taxis regulados con medidor obligatorio)
- **Decreto 212** (operación de taxis municipales)
- **NO es ride-hailing privado** (tipo Uber/Beat/Cabify)

### Modelo de negocio
- **B2C**: Pasajeros individuales piden taxis a demanda
- **B2B**: Empresas solicitan servicios corporativos (fase posterior)

### Restricciones operacionales
- Solo taxis con **licencia municipal clase A**
- Tarifas reguladas por **medidor** (no tarificación dinámica)
- Conductores con **licencia profesional clase A1**
- Operado por **gremios/operadores autorizados**

---

## Lo que SÍ incluye el MVP

### 1. Registro y autenticación simple
- Login con **número de teléfono**
- Verificación por **código OTP** (SMS o pin fijo para testing)
- Sin registro complejo (nombre/email opcional)

### 2. Solicitud de taxi
- **Dirección de origen** (manual o GPS)
- **Dirección de destino** (opcional - puede ser "sin destino")
- **Selección de tipo de taxi**:
  - Básico (sedán estándar)
  - Ejecutivo (vehículo premium)
  - Turismo (para turistas, conductor bilingüe)
  - Van (6-8 pasajeros)
  - Lujo (Mercedes, BMW, etc.)
- **Notas adicionales** (opcional, ej: "Llevo mascota", "Equipaje grande")

### 3. Asignación de taxi
- **Estado de búsqueda**: "Buscando un taxi autorizado…"
- **Notificación cuando se asigna** (push notification)
- **Cancelación por usuario** (hasta que conductor acepte)

### 4. Información del viaje asignado
- **Datos del conductor**:
  - Nombre completo
  - Foto (si está disponible)
  - Licencia profesional A1
  - Calificación promedio (si existe)
- **Datos del taxi**:
  - Tipo (básico, ejecutivo, etc.)
  - Patente
  - Marca y modelo
  - Color
- **Datos del operador**:
  - Nombre del gremio/operador
  - Ciudad de operación
- **Tiempo estimado de llegada** (basado en GPS)

### 5. Tracking en vivo
- **Mapa con posición del taxi** actualizado cada 10-15 segundos
- **Ruta del taxi hacia el origen** (opcional: usando Google Maps Directions)
- **Notificaciones de estados**:
  - "Tu taxi está a 5 min"
  - "Tu taxi ha llegado"
  - "Viaje iniciado"

### 6. Durante el viaje
- **Estado del viaje visible**:
  - "Esperando al pasajero"
  - "Pasajero a bordo"
  - "En ruta al destino"
- **Botón de emergencia** (opcional MVP, puede ser solo un número de contacto)

### 7. Final del viaje
- **Resumen del viaje**:
  - Origen y destino
  - Tiempo total
  - Tarifa pagada (según medidor)
  - Conductor y taxi
- **Calificación del servicio** (1-5 estrellas + comentario opcional)
- **Botón "Pedir otro taxi"**

### 8. Historial de viajes
- **Lista de viajes pasados** (últimos 30 días)
- **Detalles de cada viaje**:
  - Fecha y hora
  - Origen → Destino
  - Conductor
  - Taxi (patente)
  - Estado final (completado, cancelado)

### 9. Perfil básico
- **Datos personales**:
  - Nombre (opcional)
  - Teléfono
  - Email (opcional)
- **Cerrar sesión**

---

## Lo que NO incluye el MVP

### 1. Pagos integrados
- **NO** pago con tarjeta dentro de la app
- **Pago en efectivo o tarjeta al conductor** (sistema tradicional)
- Integración de pagos: **Fase 2**

### 2. Tarificación dinámica
- **NO** hay surge pricing
- Tarifa regulada por **medidor del taxi** (obligatorio por ley)
- Estimación de tarifa: **Fase 2** (basada en distancia/tiempo histórico)

### 3. Vehículos no regulados
- **NO** incluye:
  - Motos
  - Scooters
  - Vehículos particulares (tipo Uber)
  - Autos sin licencia clase A

### 4. Viajes compartidos
- **NO** hay carpooling
- Un viaje = un pasajero (o grupo, pero no comparten con extraños)

### 5. Funciones tipo Uber/Beat
- **NO** hay:
  - Cancelación con penalización automática
  - Propinas dentro de la app
  - Split de pagos
  - Programación de viajes futuros (MVP)
  - Chat con conductor (MVP)
  - Guardado de lugares favoritos (MVP)

### 6. Servicios corporativos (B2B)
- **NO** incluye:
  - Dashboard empresarial
  - Facturación automática
  - Centros de costo
- Esto va en **Fase B2B posterior**

---

## Módulos del MVP

### Módulo 1: Autenticación
- Login por teléfono + OTP
- Persistencia de sesión
- Logout

### Módulo 2: Solicitud de taxi
- Formulario de solicitud
- Validación de datos
- Creación de `PassengerRequest` en backend

### Módulo 3: Estado de búsqueda
- Pantalla de espera
- Polling cada 5-10s al backend
- Manejo de timeout (si no hay taxis disponibles)

### Módulo 4: Viaje asignado
- Mostrar datos del viaje
- Botón "Llamar al conductor"
- Botón "Cancelar viaje"

### Módulo 5: Tracking GPS
- Mapa con Expo MapView
- Actualización de posición del taxi
- Marcadores origen/destino

### Módulo 6: Estados del viaje
- Indicador visual del estado actual
- Notificaciones de cambio de estado

### Módulo 7: Final del viaje
- Pantalla de resumen
- Calificación (opcional)
- Compartir viaje (opcional)

### Módulo 8: Historial
- Lista de viajes
- Filtros (última semana, último mes)
- Detalle de viaje pasado

### Módulo 9: Perfil
- Editar datos básicos
- Ver estadísticas (viajes totales, etc.)
- Cerrar sesión

---

## Priorización de features

### Prioridad ALTA (Esencial MVP)
1. ✅ Login con teléfono
2. ✅ Pedir taxi (origen + tipo)
3. ✅ Ver asignación (conductor + taxi)
4. ✅ Tracking en vivo
5. ✅ Estados del viaje

### Prioridad MEDIA (Nice to have MVP)
6. ⚠️ Calificación de servicio
7. ⚠️ Historial de viajes
8. ⚠️ Foto del conductor
9. ⚠️ Tiempo estimado de llegada

### Prioridad BAJA (Post-MVP)
10. 🔵 Pago con tarjeta
11. 🔵 Estimación de tarifa
12. 🔵 Chat con conductor
13. 🔵 Programar viaje futuro
14. 🔵 Lugares favoritos

---

## Métricas de éxito del MVP

### Funcionales
- ✅ Usuario puede pedir taxi en < 30 segundos
- ✅ 95% de solicitudes son asignadas en < 3 minutos
- ✅ Tracking GPS se actualiza cada 10-15 segundos
- ✅ App no crashea en flujo principal

### UX
- ✅ Interfaz intuitiva (usuario promedio lo usa sin ayuda)
- ✅ Máximo 3 taps para pedir taxi
- ✅ Feedback claro en cada paso

### Técnicas
- ✅ App carga en < 3 segundos
- ✅ Consumo de batería razonable (GPS optimizado)
- ✅ Funciona offline (muestra último estado)
- ✅ Compatible con Android 8+ / iOS 13+

---

## Usuarios objetivo

### Persona 1: "María, la ejecutiva"
- 35 años, trabaja en Las Condes
- Usa taxi para ir a reuniones
- Necesita confiabilidad y seguridad
- Valora: ver datos del conductor, tracking

### Persona 2: "Carlos, el turista"
- 28 años, visita Santiago
- No conoce la ciudad
- Necesita: taxi confiable, no ser estafado
- Valora: taxis regulados oficiales, seguridad

### Persona 3: "Ana, la estudiante"
- 22 años, vuelve tarde a casa
- Necesita: seguridad, taxi autorizado
- Valora: poder compartir viaje con familiares, tracking en vivo

---

## Diferenciadores vs competencia

### vs Uber/Beat/Cabify
- ✅ Solo taxis **regulados oficialmente**
- ✅ Tarifas **reguladas por ley** (no hay surge pricing)
- ✅ Conductores con **licencia profesional clase A1**
- ✅ Operadores **autorizados por municipalidad**

### vs PideTaxi/EasyTaxi
- ✅ Integración con **múltiples operadores** (no solo uno)
- ✅ **Transparencia total**: ver operador, licencias, etc.
- ✅ **Tracking GPS en tiempo real**
- ✅ **Historial completo de viajes**

---

## Restricciones técnicas

### Performance
- App debe funcionar en Android 8+ / iOS 13+
- Soportar dispositivos de gama baja (2GB RAM)
- Tamaño de app < 50MB

### Conectividad
- Funcionar con 3G (no solo 4G/5G)
- Modo offline: mostrar último estado del viaje
- Sincronización automática al recuperar conexión

### Seguridad
- Tokens JWT con expiración
- Comunicación HTTPS obligatoria
- No almacenar datos sensibles en local storage

---

## Próximos pasos

Una vez aprobado este alcance:

1. **FASE 21**: Arquitectura técnica detallada
2. **FASE 22**: Diseño UI/UX completo
3. **FASE 23**: Scaffolding del proyecto Expo
4. **FASE 24**: Implementación de módulos MVP
5. **FASE 25**: Testing y deployment

---

**Fin del documento**
