# ESPECIFICACIÓN DE PANTALLAS — APP CONDUCTOR ETAXI MVP

## Versión: 1.0
## Fecha: 2025-01-15
## Estado: Diseño Conceptual

---

## Pantallas del MVP

La App Conductor MVP consta de **6 pantallas principales**:

1. **Login** - Autenticación
2. **Home** - Lista de servicios asignados
3. **Detalle del Servicio** - Información completa + acciones
4. **Historial** - Servicios completados/cancelados
5. **Perfil** - Datos del conductor
6. **Configuración** (opcional para MVP)

---

## PANTALLA 1: Login

### Propósito
Autenticar al conductor en la plataforma ETAXI.

### Wireframe ASCII
```
┌─────────────────────────────────────┐
│                                     │
│          [Logo ETAXI]              │
│                                     │
│        App Conductor               │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Teléfono o Email              │ │
│  │ [Input field]                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Contraseña                    │ │
│  │ [Input field - oculto]        │ │
│  └───────────────────────────────┘ │
│                                     │
│  [ ¿Olvidaste tu contraseña? ]     │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      INICIAR SESIÓN           │ │
│  │     [Botón rojo ETAXI]        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  ¿Problemas para ingresar?    │ │
│  │     Contactar soporte         │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Elementos

#### Logo ETAXI
- Imagen centrada
- Tamaño: 120x120px
- Margen top: 60px

#### Campo: Teléfono o Email
- **Tipo**: TextInput
- **Placeholder**: "+56912345678 o email@example.com"
- **Keyboard**: `email-address`
- **Autocomplete**: `tel` o `email`
- **Validación**:
  - No vacío
  - Si es teléfono: formato chileno `+569XXXXXXXX`
  - Si es email: formato válido

#### Campo: Contraseña
- **Tipo**: TextInput
- **Placeholder**: "Contraseña o PIN"
- **SecureTextEntry**: true
- **Keyboard**: `default`
- **Icono**: Ojo para mostrar/ocultar

#### Botón: Iniciar Sesión
- **Background**: `#dd1828` (rojo ETAXI)
- **Text**: "INICIAR SESIÓN" (blanco, bold)
- **Padding**: 16px vertical
- **Border radius**: 8px
- **Loading state**: Mostrar spinner cuando está procesando

#### Link: ¿Olvidaste tu contraseña?
- **Acción**: Navegar a pantalla de recuperación (futuro)
- **Color**: `#a0a0a0` (gris claro)
- **Tamaño**: 14px

#### Link: Contactar soporte
- **Acción**: Abrir WhatsApp o email del soporte ETAXI
- **Color**: `#a0a0a0`
- **Tamaño**: 12px

### Estados

#### Estado: Inicial
- Botón "Iniciar Sesión" habilitado
- Campos vacíos

#### Estado: Loading
- Botón "Iniciar Sesión" muestra spinner
- Campos deshabilitados
- No se puede enviar formulario

#### Estado: Error
- Mostrar mensaje de error debajo de botón
- Ejemplo: "Credenciales incorrectas"
- Color: `#ef4444` (rojo error)

### Flujo
1. Conductor ingresa teléfono/email y contraseña
2. Tap en "Iniciar Sesión"
3. App llama `POST /api/driver/login`
4. Si éxito:
   - Guarda JWT en SecureStore
   - Navega a Home
5. Si error:
   - Muestra mensaje de error
   - Mantiene datos ingresados

### Validaciones Client-Side
```typescript
const validateLogin = (phoneOrEmail: string, password: string) => {
  if (!phoneOrEmail || !password) {
    return 'Todos los campos son obligatorios';
  }

  if (password.length < 4) {
    return 'La contraseña debe tener al menos 4 caracteres';
  }

  return null; // Sin errores
};
```

---

## PANTALLA 2: Home (Lista de Servicios)

### Propósito
Mostrar al conductor todos los servicios asignados que requieren su atención.

### Wireframe ASCII
```
┌─────────────────────────────────────┐
│  ETAXI Conductor    [🔔] [⚙️]       │
│  Hola, Juan Pérez                  │
│                                     │
│  📍 Servicios Asignados (3)        │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🚖 NUEVO                        ││
│  │ Av. Providencia 1234            ││
│  │ → Aeropuerto SCL                ││
│  │ Hace 2 minutos                  ││
│  │                                 ││
│  │ [VER DETALLE]                   ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🚗 EN RUTA                      ││
│  │ Av. Las Condes 5678             ││
│  │ → Sin destino                   ││
│  │ Hace 15 minutos                 ││
│  │                                 ││
│  │ [CONTINUAR]                     ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 👤 A BORDO                      ││
│  │ Av. Kennedy 9012                ││
│  │ → Centro Comercial              ││
│  │ Hace 30 minutos                 ││
│  │                                 ││
│  │ [FINALIZAR]                     ││
│  └─────────────────────────────────┘│
│                                     │
│  [Historial]  [Perfil]             │
└─────────────────────────────────────┘
```

### Elementos

#### Header
- **Título**: "ETAXI Conductor"
- **Saludo**: "Hola, {nombre del conductor}"
- **Icono notificaciones** (🔔): Muestra contador si hay notificaciones
- **Icono configuración** (⚙️): Navega a perfil/config

#### Sección: Servicios Asignados
- **Título**: "Servicios Asignados (X)" donde X = count de servicios
- **Orden**: Más recientes primero
- **Filtros** (futuro): Por estado

#### Card de Servicio
Cada servicio se muestra en una tarjeta:

**Estados visuales**:
- 🚖 **NUEVO** (SENT_TO_DRIVER): Fondo amarillo claro, bordering
- 🚗 **EN RUTA** (ACCEPTED_BY_DRIVER, DRIVER_EN_ROUTE): Fondo azul claro
- 👤 **A BORDO** (PASSENGER_ONBOARD): Fondo verde claro

**Información mostrada**:
1. **Icono de estado** + **Label del estado**
2. **Dirección de origen** (icono 📍)
3. **Dirección de destino** (icono 🏁) o "Sin destino"
4. **Tiempo transcurrido**: "Hace X minutos"
5. **Botón de acción**:
   - NUEVO → "VER DETALLE"
   - EN RUTA → "CONTINUAR"
   - A BORDO → "FINALIZAR"

### Card Component Structure
```typescript
interface ServiceCardProps {
  id: string;
  status: AssignmentStatus;
  originAddress: string;
  destinationAddress?: string;
  createdAt: Date;
  onPress: () => void;
}
```

### Empty State
Si no hay servicios asignados:
```
┌─────────────────────────────────────┐
│                                     │
│          [Icono taxi vacío]        │
│                                     │
│     No hay servicios asignados     │
│                                     │
│  Recibirás una notificación cuando │
│  se te asigne un nuevo servicio.   │
│                                     │
└─────────────────────────────────────┘
```

### Pull to Refresh
- Gesto de arrastrar hacia abajo para actualizar lista
- Llama `GET /api/driver/assignments` de nuevo

### Bottom Navigation
- Tab "Servicios" (activo)
- Tab "Historial"
- Tab "Perfil"

---

## PANTALLA 3: Detalle del Servicio

### Propósito
Mostrar información completa del servicio y permitir al conductor cambiar estados.

### Wireframe ASCII
```
┌─────────────────────────────────────┐
│  [←] Servicio #12345      [•••]     │
│                                     │
│  Estado: ENVIADO AL CONDUCTOR       │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 👤 PASAJERO                     ││
│  │ Juan Pérez                      ││
│  │ +56912345678                    ││
│  │ [📞 Llamar]                     ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📍 RECORRIDO                    ││
│  │                                 ││
│  │ 🟢 Origen:                      ││
│  │ Av. Providencia 1234, Santiago  ││
│  │                                 ││
│  │ 🔴 Destino:                     ││
│  │ Aeropuerto SCL, Pudahuel        ││
│  │                                 ││
│  │ [Ver en Mapa] (futuro)          ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📝 NOTAS                        ││
│  │ Equipaje grande. Llegar con     ││
│  │ tiempo al aeropuerto.           ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ⏱️ TIMELINE                     ││
│  │ ✅ Asignado - 10:15            ││
│  │ ✅ Enviado a conductor - 10:16 ││
│  └─────────────────────────────────┘│
│                                     │
│  [ACEPTAR SERVICIO]  [RECHAZAR]    │
│                                     │
└─────────────────────────────────────┘
```

### Secciones

#### Header
- **Botón atrás**: Vuelve a Home
- **Título**: "Servicio #{ID corto}"
- **Menú** (•••): Opciones como "Reportar problema"

#### Badge: Estado Actual
- Muestra el estado actual del Assignment
- Color según estado:
  - SENT_TO_DRIVER: Amarillo
  - ACCEPTED_BY_DRIVER: Azul
  - DRIVER_EN_ROUTE: Azul oscuro
  - PASSENGER_ONBOARD: Verde

#### Sección: Pasajero
- **Nombre**: Nombre completo (si disponible) o "Pasajero"
- **Teléfono**: Número con formato
- **Botón "Llamar"**: Abre dialer con el número

```typescript
const handleCallPassenger = (phone: string) => {
  Linking.openURL(`tel:${phone}`);
};
```

#### Sección: Recorrido
- **Origen**: Dirección completa con icono verde
- **Destino**: Dirección completa con icono rojo (o "Sin destino" si no está definido)
- **Botón "Ver en Mapa"** (futuro): Abre Google Maps/Waze con navegación

#### Sección: Notas
- Muestra notas del pasajero si existen
- Si no hay notas: No mostrar esta sección

#### Sección: Timeline
- Lista cronológica de estados previos
- Formato: `[Icono] Estado - Hora`
- Solo muestra transiciones ya completadas

### Botones de Acción (Dinámicos según estado)

#### Si estado = SENT_TO_DRIVER:
```
[ACEPTAR SERVICIO]  [RECHAZAR]
```
- **Aceptar**: Verde, bold → llama `POST /api/driver/assignments/:id/state` con `newState: ACCEPTED_BY_DRIVER`
- **Rechazar**: Gris, outline → muestra modal de confirmación → llama endpoint con `newState: REJECTED_BY_DRIVER`

#### Si estado = ACCEPTED_BY_DRIVER:
```
[VOY EN CAMINO]  [CANCELAR]
```
- **Voy en camino**: Azul → `newState: DRIVER_EN_ROUTE`
- **Cancelar**: Gris → modal de confirmación con input de razón

#### Si estado = DRIVER_EN_ROUTE:
```
[PASAJERO A BORDO]  [CANCELAR]
```
- **Pasajero a bordo**: Verde → `newState: PASSENGER_ONBOARD`
- **Cancelar**: Gris → modal de confirmación con input de razón

#### Si estado = PASSENGER_ONBOARD:
```
[FINALIZAR VIAJE]
```
- **Finalizar viaje**: Verde, full width → `newState: COMPLETED`
- Opcional: Input de tarifa final (futuro)

### Modales

#### Modal: Rechazar Servicio
```
┌─────────────────────────────────────┐
│  ¿Rechazar servicio?                │
│                                     │
│  El operador asignará otro taxi.   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Motivo (opcional)             │ │
│  │ [Textarea]                    │ │
│  └───────────────────────────────┘ │
│                                     │
│  [CANCELAR]  [CONFIRMAR RECHAZO]   │
└─────────────────────────────────────┘
```

#### Modal: Cancelar Servicio
```
┌─────────────────────────────────────┐
│  ⚠️ ¿Cancelar servicio?            │
│                                     │
│  Esta acción no se puede deshacer. │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Motivo (requerido)            │ │
│  │ [Textarea]                    │ │
│  └───────────────────────────────┘ │
│                                     │
│  [VOLVER]  [CONFIRMAR CANCELACIÓN] │
└─────────────────────────────────────┘
```

---

## PANTALLA 4: Historial

### Propósito
Mostrar servicios completados y cancelados de los últimos 30 días.

### Wireframe ASCII
```
┌─────────────────────────────────────┐
│  [←] Historial                      │
│                                     │
│  📅 Últimos 30 días                │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ✅ COMPLETADO - Hoy 15:30       ││
│  │ Av. Providencia → Aeropuerto    ││
│  │ Juan Pérez                      ││
│  │ Duración: 45 min                ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ✅ COMPLETADO - Hoy 12:15       ││
│  │ Las Condes → Centro             ││
│  │ María González                  ││
│  │ Duración: 20 min                ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ❌ CANCELADO - Ayer 18:00       ││
│  │ Vitacura → Mall                 ││
│  │ Cancelado por pasajero          ││
│  └─────────────────────────────────┘│
│                                     │
│  [Ver más]                          │
│                                     │
│  [Servicios]  [Historial]  [Perfil]│
└─────────────────────────────────────┘
```

### Elementos

#### Filtros (opcional para MVP)
- Selector de período: "Últimos 7 días", "Últimos 30 días", "Este mes"
- Filtro por estado: "Completados", "Cancelados", "Todos"

#### Card de Historial
- **Estado**: ✅ COMPLETADO o ❌ CANCELADO
- **Fecha y hora**: Formato relativo ("Hoy 15:30", "Ayer 12:00", "15 Ene 10:30")
- **Recorrido**: "Origen → Destino"
- **Pasajero**: Nombre si disponible
- **Duración**: Calculado entre timestamps
- **Tap**: Navega a detalle (solo lectura)

#### Empty State
```
┌─────────────────────────────────────┐
│          [Icono historial vacío]   │
│                                     │
│     No hay servicios completados   │
│                                     │
│  Tus servicios completados          │
│  aparecerán aquí.                   │
└─────────────────────────────────────┘
```

---

## PANTALLA 5: Perfil

### Propósito
Mostrar información del conductor y configuración básica.

### Wireframe ASCII
```
┌─────────────────────────────────────┐
│  [←] Mi Perfil                      │
│                                     │
│  ┌─────────────────────────────────┐│
│  │     [Avatar placeholder]        ││
│  │                                 ││
│  │     Juan Pérez González         ││
│  │     Conductor ETAXI             ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📞 CONTACTO                     ││
│  │ +56912345678                    ││
│  │ juan.perez@example.com          ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🏢 OPERADOR                     ││
│  │ Central Taxis Santiago          ││
│  │ Gremio - Santiago               ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🚗 VEHÍCULO                     ││
│  │ Patente: ABC-123                ││
│  │ Tipo: Taxi Básico               ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ⚙️ CONFIGURACIÓN                ││
│  │ [Notificaciones]     [ ON  ]    ││
│  │ [Sonido]             [ ON  ]    ││
│  │ [Vibración]          [ ON  ]    ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │     [CERRAR SESIÓN]             ││
│  └─────────────────────────────────┘│
│                                     │
│  Versión 1.0.0                      │
└─────────────────────────────────────┘
```

### Secciones

#### Avatar y Nombre
- **Avatar**: Iniciales o foto de perfil (futuro)
- **Nombre completo**: Del modelo Driver
- **Subtitle**: "Conductor ETAXI"

#### Sección: Contacto
- **Teléfono**: Número registrado
- **Email**: Email registrado (si existe)

#### Sección: Operador
- **Nombre del operador**: FleetOperator asociado
- **Tipo**: GUILD, CENTRAL, COMPANY, MUNICIPALITY
- **Ciudad**: Ciudad de operación

#### Sección: Vehículo
- **Patente**: License plate del taxi asignado
- **Tipo**: Tipo de taxi (STANDARD, EXECUTIVE, etc.)

#### Sección: Configuración
Toggles para:
- **Notificaciones push**: On/Off
- **Sonido**: On/Off
- **Vibración**: On/Off

#### Botón: Cerrar Sesión
- Color: Rojo outline
- Confirmación: "¿Seguro que deseas cerrar sesión?"
- Acción: Borra token de SecureStore → navega a Login

#### Footer
- Versión de la app
- Link a "Términos y condiciones" (opcional)

---

## PANTALLA 6: Configuración (Opcional para MVP)

Esta pantalla puede fusionarse con Perfil para simplificar.

---

## Navegación entre Pantallas

### Stack Principal (después de login)

```
Home
  ├─> AssignmentDetail
  │     ├─> ConfirmReject (Modal)
  │     └─> ConfirmCancel (Modal)
  ├─> History
  └─> Profile
```

### Tabs (Bottom Navigation)
```
[Servicios]  [Historial]  [Perfil]
```

---

## Componentes Reutilizables

### 1. AssignmentCard
Props:
- `assignment`: Assignment object
- `onPress`: () => void

### 2. StateButton
Props:
- `label`: string
- `color`: 'primary' | 'success' | 'danger' | 'secondary'
- `loading`: boolean
- `onPress`: () => void

### 3. InfoSection
Props:
- `title`: string
- `icon`: IconName
- `children`: ReactNode

### 4. Timeline
Props:
- `events`: Array<{label: string, time: Date, completed: boolean}>

### 5. ConfirmModal
Props:
- `visible`: boolean
- `title`: string
- `message`: string
- `confirmText`: string
- `cancelText`: string
- `onConfirm`: () => void
- `onCancel`: () => void
- `requireInput`: boolean (para razón de cancelación)

---

## Paleta de Colores

```typescript
export const AppColors = {
  // Principales
  primary: '#dd1828',         // Rojo ETAXI
  background: '#030c13',      // Negro profundo
  card: '#182b33',            // Gris oscuro

  // Texto
  text: '#ffffff',            // Blanco
  textSecondary: '#a0a0a0',   // Gris claro
  textTertiary: '#6b7280',    // Gris medio

  // Estados
  success: '#10b981',         // Verde
  warning: '#f59e0b',         // Amarillo
  error: '#ef4444',           // Rojo error
  info: '#3b82f6',            // Azul

  // Borders
  border: '#374151',          // Gris oscuro
  borderLight: '#4b5563',     // Gris medio

  // Inputs
  inputBackground: '#1f2937', // Gris muy oscuro
  inputPlaceholder: '#9ca3af',// Gris placeholder
};
```

---

## Tipografía

```typescript
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: AppColors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    color: AppColors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: AppColors.text,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: AppColors.textTertiary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
};
```

---

## Espaciado Consistente

```typescript
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## Próximos Pasos

Una vez aprobadas estas pantallas:

1. Crear componentes base en React Native
2. Implementar navegación con React Navigation
3. Conectar con endpoints del backend
4. Probar flujo completo de estados

---

**Versión**: 1.0
**Estado**: Diseño Aprobado
**Próximo documento**: `APP_CONDUCTOR_API.md` (DRIVER-APP-3)
