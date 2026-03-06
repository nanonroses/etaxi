# UI / Pantallas — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Diseño aprobado

---

## Design System ETAXI

### Paleta de colores

```typescript
colors = {
  // Primary
  primary: '#dd1828',        // ETAXI red
  primaryDark: '#b01420',    // Darker red
  primaryLight: '#ff4056',   // Lighter red

  // Secondary
  darkBlue: '#182b33',       // Dark blue
  aqua: '#48b4b8',           // Aqua accent
  yellow: '#fff500',         // Yellow highlight

  // Neutrals
  black: '#000000',
  blackBlue: '#030c13',
  gray: '#596065',
  lightGray: '#e0e0e0',
  white: '#ffffff',

  // Semantic
  success: '#1f9d55',        // Green
  error: '#dd1828',          // Red
  warning: '#fff500',        // Yellow
  info: '#48b4b8',           // Aqua

  // Backgrounds
  background: '#ffffff',     // Light mode
  backgroundDark: '#030c13', // Dark mode (future)
  surface: '#f5f5f5',        // Cards
}
```

### Tipografía

```typescript
typography = {
  // Display
  displayLarge: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  displayMedium: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },

  // Headings
  h1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },

  // Body
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  // Buttons
  button: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
}
```

### Espaciado

```typescript
spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

---

## Pantalla 1: LoginScreen

### Layout

```
┌─────────────────────────────┐
│                             │
│         [Logo ETAXI]        │
│                             │
│      Bienvenido a ETAXI     │ ← displayMedium
│  Taxis regulados seguros    │ ← bodyMedium, gray
│                             │
│  ┌───────────────────────┐  │
│  │ +56 9                 │  │ ← Input teléfono
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     CONTINUAR         │  │ ← Button primary
│  └───────────────────────┘  │
│                             │
│  Al continuar, aceptas      │ ← bodySmall, gray
│  nuestros Términos          │
│                             │
└─────────────────────────────┘
```

### Componentes

**Logo**:
- Size: 80x80px
- Margin top: 80px
- Centrado

**Título**:
- Typography: displayMedium
- Color: black
- Margin top: 24px

**Subtítulo**:
- Typography: bodyMedium
- Color: gray
- Margin top: 8px

**Input teléfono**:
- Height: 56px
- Border: 1px solid lightGray
- Border radius: 8px
- Padding: 16px
- Placeholder: "+56 9 1234 5678"
- Keyboard type: phone-pad
- Auto-complete: tel
- Margin top: 48px

**Botón Continuar**:
- Height: 56px
- Background: primary
- Color: white
- Border radius: 8px
- Typography: button
- Margin top: 16px
- Full width
- Estados:
  - Normal: background primary
  - Pressed: background primaryDark
  - Disabled: background lightGray, color gray

**Texto legal**:
- Typography: bodySmall
- Color: gray
- Margin top: 16px
- Text align: center
- Link en "Términos" (underline)

---

## Pantalla 2: OTPScreen

### Layout

```
┌─────────────────────────────┐
│  [← Atrás]                  │
│                             │
│    Ingresa el código        │ ← h1
│  Enviado a +56 9 1234 5678  │ ← bodyMedium
│                             │
│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐   │ ← 6 campos OTP
│   │1│ │2│ │3│ │4│ │5│ │6│   │
│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘   │
│                             │
│  ┌───────────────────────┐  │
│  │     VERIFICAR         │  │ ← Button primary
│  └───────────────────────┘  │
│                             │
│   ¿No recibiste el código?  │
│      [Reenviar código]      │ ← Link (enabled after 30s)
│                             │
│     [Cambiar número]        │ ← Link
│                             │
└─────────────────────────────┘
```

### Componentes

**Header**:
- Botón atrás (←): top-left, 16px margin
- Navigation bar height: 56px

**Título**:
- Typography: h1
- Margin top: 32px

**Subtítulo**:
- Typography: bodyMedium
- Color: gray
- Margin top: 8px

**Campos OTP**:
- 6 campos cuadrados
- Size: 48x48px cada uno
- Border: 2px solid lightGray
- Border radius: 8px
- Gap: 8px entre campos
- Typography: displayMedium
- Auto-focus secuencial
- Margin top: 32px
- Estados:
  - Empty: border lightGray
  - Focus: border primary
  - Filled: border success

**Botón Verificar**:
- Igual que LoginScreen
- Margin top: 32px

**Links**:
- Typography: bodyMedium
- Color: primary
- Margin top: 24px
- Text align: center
- "Reenviar código" deshabilitado primeros 30s

**Timer** (opcional):
- "Reenviar código en 00:30"
- Typography: bodySmall
- Color: gray

---

## Pantalla 3: HomeScreen

### Layout

```
┌─────────────────────────────┐
│  Hola, María    [👤]        │ ← Header
│─────────────────────────────│
│                             │
│    ┌─────────────────────┐  │
│    │                     │  │
│    │       🚖 TAXI       │  │ ← Icono animado
│    │                     │  │
│    │  PEDIR UN TAXI      │  │ ← CTA primario
│    │                     │  │
│    └─────────────────────┘  │
│                             │
│  Viajes recientes           │ ← h2
│                             │
│  ┌─────────────────────────┐│
│  │ 15 Nov, 14:30  [✅]     ││ ← Card viaje
│  │ Av. Providencia →       ││
│  │ Av. Apoquindo           ││
│  │ Juan Pérez • AB-1234    ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 14 Nov, 09:15  [✅]     ││
│  │ Mall Plaza →            ││
│  │ Aeropuerto              ││
│  │ Carlos Silva • CD-5678  ││
│  └─────────────────────────┘│
│                             │
│        [Ver todos]          │ ← Link
│                             │
└─────────────────────────────┘
```

### Componentes

**Header**:
- Height: 64px
- Background: white
- Border bottom: 1px solid lightGray
- Padding: 16px
- Saludo: "Hola, [Nombre]"
  - Typography: h2
  - Color: black
- Avatar: top-right
  - Size: 40x40px
  - Border radius: 20px
  - Background: lightGray
  - Iniciales o foto

**CTA Pedir taxi**:
- Card elevado (shadow)
- Height: 200px
- Background: gradient(primary → primaryDark)
- Border radius: 16px
- Margin: 16px
- Centrado vertical y horizontal
- Icono taxi:
  - Size: 64x64px
  - Color: white
  - Animación: bounce suave
- Texto:
  - Typography: displayMedium
  - Color: white
  - Margin top: 16px
- Tap: Navega a RequestTaxiScreen

**Sección viajes recientes**:
- Título "Viajes recientes"
  - Typography: h2
  - Margin: 16px (horizontal), 24px (top)

**Card viaje**:
- Background: surface
- Border radius: 12px
- Padding: 16px
- Margin: 8px 16px
- Layout:
  - Row 1: Fecha/hora (left) + Badge estado (right)
  - Row 2: Origen → Destino
  - Row 3: Conductor + Taxi
- Tap: Navega a TripDetailScreen

**Badge estado**:
- Size: 24x24px
- ✅ Completado: background success
- ❌ Cancelado: background error
- Border radius: 12px

**Link "Ver todos"**:
- Typography: bodyMedium
- Color: primary
- Text align: center
- Margin: 16px
- Tap: Navega a HistoryScreen

---

## Pantalla 4: RequestTaxiScreen

### Layout

```
┌─────────────────────────────┐
│  [← Atrás]  Pedir taxi      │ ← Header
│─────────────────────────────│
│  [Mapa miniatura]           │ ← 120px height (opcional)
│─────────────────────────────│
│                             │
│  📍 Origen                  │
│  ┌───────────────────────┐  │
│  │ Av. Providencia 1234  │  │ ← Input + GPS
│  │         [📍 GPS]      │  │
│  └───────────────────────┘  │
│                             │
│  📍 Destino (opcional)      │
│  ┌───────────────────────┐  │
│  │ ¿A dónde vas?         │  │ ← Input
│  └───────────────────────┘  │
│                             │
│  Tipo de taxi               │
│  [Scroll horizontal]        │
│  ┌──┐  ┌──┐  ┌──┐  ┌──┐    │
│  │🚖│  │🚙│  │🌎│  │🚐│    │ ← Cards tipos
│  │Bá│  │Ej│  │Tu│  │Va│    │
│  └──┘  └──┘  └──┘  └──┘    │
│                             │
│  📝 Notas (opcional)        │
│  ┌───────────────────────┐  │
│  │ Ej: Llevo mascota     │  │ ← TextArea
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  CONFIRMAR SOLICITUD  │  │ ← Button primary
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Componentes

**Mapa miniatura** (opcional MVP):
- Height: 120px
- Full width
- Muestra pin en ubicación actual
- No interactivo (solo visual)

**Input Origen**:
- Height: 56px
- Border: 1px solid lightGray
- Border radius: 8px
- Padding: 16px
- Icon: 📍 (left)
- Botón GPS: (right)
  - Size: 40x40px
  - Icon: 📍
  - Tap: Auto-detecta ubicación
- Auto-complete (Google Places API, opcional)

**Input Destino**:
- Igual que Origen
- Placeholder: "¿A dónde vas?"
- Puede dejarse vacío

**Selector tipo de taxi**:
- Horizontal scroll
- Cards:
  - Size: 100x120px
  - Border: 2px solid lightGray
  - Border radius: 12px
  - Padding: 12px
  - Gap: 12px
  - Estados:
    - Normal: border lightGray
    - Selected: border primary, background primaryLight (10% opacity)
  - Contenido:
    - Icono: 48x48px (top)
    - Nombre: Typography h3 (center)
    - Precio base: bodySmall, gray (opcional)

**Tipos de taxi**:
1. Básico 🚖
2. Ejecutivo 🚙
3. Turismo 🌎
4. Van 🚐
5. Lujo 💎

**TextArea Notas**:
- Height: 80px
- Border: 1px solid lightGray
- Border radius: 8px
- Padding: 16px
- Max length: 200 caracteres
- Multiline: true

**Botón Confirmar**:
- Igual que LoginScreen
- Margin top: 24px
- Disabled si no hay origen

---

## Pantalla 5: WaitingScreen

### Layout

```
┌─────────────────────────────┐
│                             │
│         [Animación]         │ ← Spinner + taxi
│                             │
│   Buscando un taxi          │ ← displayMedium
│   autorizado cerca de ti    │
│                             │
│   Esto puede tomar          │ ← bodyMedium, gray
│   unos segundos...          │
│                             │
│  ┌─────────────────────────┐│
│  │ 📍 Origen               ││
│  │ Av. Providencia 1234    ││
│  │                         ││
│  │ 📍 Destino              ││
│  │ Av. Apoquindo 5678      ││
│  │                         ││
│  │ 🚖 Tipo                 ││
│  │ Taxi Básico             ││
│  └─────────────────────────┘│
│                             │
│  ┌───────────────────────┐  │
│  │  Cancelar solicitud   │  │ ← Button secondary
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Componentes

**Animación**:
- Lottie animation (taxi moviéndose)
- OR: Spinner + icono taxi
- Size: 120x120px
- Centrado
- Margin top: 80px

**Texto principal**:
- Typography: displayMedium
- Color: black
- Text align: center
- Margin top: 24px

**Subtexto**:
- Typography: bodyMedium
- Color: gray
- Text align: center
- Margin top: 8px

**Card detalles**:
- Background: surface
- Border radius: 12px
- Padding: 16px
- Margin: 24px 16px
- Cada línea:
  - Icon (left): 24x24px
  - Texto: bodyLarge
  - Gap: 12px

**Botón Cancelar**:
- Height: 56px
- Background: white
- Border: 2px solid primary
- Color: primary
- Border radius: 8px
- Margin: 16px
- Estados:
  - Normal: border primary
  - Pressed: background primaryLight (10%)

---

## Pantalla 6: AssignedScreen

### Layout

```
┌─────────────────────────────┐
│  [← Atrás]                  │
│─────────────────────────────│
│                             │
│    ✅ ¡Tu taxi está         │ ← Success message
│       en camino!            │
│                             │
│  ┌─────────────────────────┐│
│  │  [Foto] Juan Pérez      ││ ← Card conductor
│  │  ⭐ 4.8 • A1-12345678   ││
│  │  ┌─────────────────┐    ││
│  │  │ 📞 LLAMAR       │    ││
│  │  └─────────────────┘    ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🚖 Taxi Básico         ││ ← Card taxi
│  │  AB-1234                ││
│  │  Nissan Sentra 2020     ││
│  │  Color: Blanco          ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🏢 Gremio Taxis        ││ ← Card operador
│  │  Santiago Centro        ││
│  └─────────────────────────┘│
│                             │
│  ⏱️ Llega en ~5 minutos     │ ← ETA
│                             │
│  ┌───────────────────────┐  │
│  │ VER RECORRIDO EN VIVO │  │ ← Button primary
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  Cancelar viaje       │  │ ← Button text
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Componentes

**Success message**:
- Background: success (light, 10% opacity)
- Padding: 16px
- Border left: 4px solid success
- Typography: h2
- Color: success (dark)
- Icon: ✅ (left)
- Margin: 16px

**Card conductor**:
- Background: white
- Border: 1px solid lightGray
- Border radius: 12px
- Padding: 16px
- Margin: 16px
- Shadow: elevation 2
- Layout:
  - Foto: 64x64px (left), border radius 32px
  - Nombre: h2 (right of photo)
  - Rating: bodyMedium, color gray
  - Licencia: bodySmall, color gray
  - Botón llamar: full width, height 44px, margin top 12px

**Card taxi**:
- Similar a conductor
- Icon taxi: 64x64px (left)
- Info: right
  - Tipo: h3
  - Patente: h2, color primary
  - Marca/modelo: bodyMedium, gray
  - Color: bodyMedium, gray

**Card operador**:
- Similar
- Icon: 48x48px
- Nombre: h3
- Ciudad: bodyMedium, gray

**ETA**:
- Typography: h3
- Color: primary
- Icon: ⏱️ (left)
- Margin: 16px
- Text align: center

**Botón Ver recorrido**:
- Button primary
- Icon: 🗺️ (left of text)

**Botón Cancelar**:
- Text button (no background)
- Color: error
- Typography: bodyMedium
- Margin top: 8px

---

## Pantalla 7: TrackingScreen

### Layout

```
┌─────────────────────────────┐
│                             │
│                             │
│         [MAPA]              │ ← Full screen map
│       🚖 (moving)           │
│     📍 origen               │
│     📍 destino              │
│                             │
│                             │
│                             │
│─────────────────────────────│ ← Card flotante
│  Tu conductor está en camino│
│  Juan Pérez • AB-1234       │
│  Llega en ~3 min            │
│  ┌─────────────────┐        │
│  │ 📞 LLAMAR       │        │
│  └─────────────────┘        │
└─────────────────────────────┘
```

### Componentes

**Mapa**:
- Full screen (height: 100%)
- MapView (Expo)
- Marcadores:
  - Origen: Pin verde 📍
  - Destino: Pin rojo 📍 (si hay)
  - Taxi: Icono personalizado 🚖
    - Rotación según heading
    - Animación suave al moverse
- Cámara:
  - Auto-ajusta para mostrar origen + taxi
  - Zoom dinámico
- Polyline (opcional):
  - Ruta del taxi al origen
  - Color: primary, width: 4

**Card flotante inferior**:
- Position: absolute, bottom: 0
- Height: 140px
- Background: white
- Border radius: 16px (top)
- Shadow: elevation 8
- Padding: 16px
- Layout:
  - Row 1: Estado del viaje
    - Typography: h3
    - Color: black
  - Row 2: Conductor + Taxi
    - Typography: bodyMedium
    - Color: gray
  - Row 3: ETA (si aplica)
    - Typography: bodyLarge
    - Color: primary
    - Icon: ⏱️
  - Row 4: Botón llamar
    - Height: 44px
    - Background: surface
    - Icon: 📞

**Estados del card según Assignment.status**:
- `DRIVER_EN_ROUTE`: "Tu conductor está en camino"
- `PASSENGER_ONBOARD`: "Pasajero a bordo • En ruta al destino"

---

## Pantalla 8: CompletedScreen

### Layout

```
┌─────────────────────────────┐
│         [✅]                │
│    ¡Viaje completado!       │ ← displayMedium
│                             │
│  ┌─────────────────────────┐│
│  │ Resumen del viaje       ││ ← h2
│  │                         ││
│  │ 📍 Origen               ││
│  │ Av. Providencia 1234    ││
│  │                         ││
│  │ 📍 Destino              ││
│  │ Av. Apoquindo 5678      ││
│  │                         ││
│  │ ⏱️ Duración: 25 min     ││
│  │ 📏 Distancia: 8.5 km    ││
│  │                         ││
│  │ 👤 Juan Pérez           ││
│  │ 🚖 AB-1234              ││
│  │                         ││
│  │ 💰 Tarifa: $8,500       ││
│  │ Pagado en efectivo      ││
│  └─────────────────────────┘│
│                             │
│  ¿Cómo fue tu viaje?        │ ← h3
│  ⭐ ⭐ ⭐ ⭐ ⭐              │ ← Stars (tap to rate)
│  ┌───────────────────────┐  │
│  │ Comentario (opcional) │  │ ← TextArea
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  PEDIR OTRO TAXI      │  │ ← Button primary
│  └───────────────────────┘  │
│                             │
│  [Volver al inicio]         │ ← Link
│                             │
└─────────────────────────────┘
```

### Componentes

**Success icon**:
- Size: 80x80px
- Color: success
- Icon: ✅ or checkmark animado
- Margin top: 48px

**Título**:
- Typography: displayMedium
- Color: success (dark)
- Margin top: 16px

**Card resumen**:
- Background: surface
- Border radius: 12px
- Padding: 16px
- Margin: 24px 16px
- Cada línea:
  - Icon: 24x24px (left)
  - Label + valor
  - Gap: 12px

**Sección calificación**:
- Margin top: 24px
- Título "¿Cómo fue tu viaje?"
  - Typography: h3
  - Text align: center
- Stars:
  - Size: 48x48px cada una
  - Color: lightGray (unselected)
  - Color: yellow (selected)
  - Tap: selecciona 1-5
  - Margin: 16px
- TextArea comentario:
  - Height: 80px
  - Placeholder: "Cuéntanos tu experiencia (opcional)"
  - Max length: 200

**Botón Pedir otro taxi**:
- Button primary
- Icon: 🚖 (left)

**Link Volver**:
- Typography: bodyMedium
- Color: gray
- Text align: center
- Margin: 16px

---

## Pantalla 9: HistoryScreen

### Layout

```
┌─────────────────────────────┐
│  [← Atrás]  Historial       │ ← Header
│─────────────────────────────│
│  [7 días] [30 días] [Todos] │ ← Tabs
│─────────────────────────────│
│                             │
│  ┌─────────────────────────┐│
│  │ 15 Nov, 14:30  [✅]     ││ ← Card viaje
│  │ ⭐ 5.0                  ││
│  │ Av. Providencia →       ││
│  │ Av. Apoquindo           ││
│  │ Juan Pérez • AB-1234    ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 14 Nov, 09:15  [✅]     ││
│  │ Sin calificar           ││
│  │ Mall Plaza →            ││
│  │ Aeropuerto              ││
│  │ Carlos Silva • CD-5678  ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 13 Nov, 18:00  [❌]     ││ ← Cancelado
│  │ Las Condes →            ││
│  │ Providencia             ││
│  │ Pedro Gómez • EF-9012   ││
│  └─────────────────────────┘│
│                             │
│  [Cargando más...]          │ ← Infinite scroll
│                             │
└─────────────────────────────┘
```

### Componentes

**Tabs**:
- Height: 48px
- Border bottom: 2px solid lightGray
- Estados:
  - Normal: color gray
  - Selected: color primary, border bottom primary
- Typography: bodyLarge
- Tap: Filtra lista

**Card viaje**:
- Background: white
- Border: 1px solid lightGray
- Border radius: 12px
- Padding: 16px
- Margin: 8px 16px
- Layout:
  - Row 1:
    - Fecha/hora (left): bodyMedium
    - Badge estado (right): 24x24px
  - Row 2:
    - Rating: ⭐ X.X or "Sin calificar"
    - Color: yellow (si hay rating), gray (si no)
  - Row 3:
    - Origen → Destino
    - Typography: h3
  - Row 4:
    - Conductor + Taxi
    - Typography: bodyMedium, gray
- Shadow: elevation 1
- Tap: Navega a TripDetailScreen

**Infinite scroll**:
- Loading indicator al final
- Auto-carga al hacer scroll down

---

## Pantalla 10: ProfileScreen

### Layout

```
┌─────────────────────────────┐
│  [← Atrás]  Perfil          │ ← Header
│─────────────────────────────│
│         [Avatar]            │ ← 80x80px
│       María Silva           │ ← h1
│                             │
│  ┌─────────────────────────┐│
│  │ 📱 Teléfono             ││ ← Card datos
│  │ +56 9 1234 5678         ││
│  │                         ││
│  │ 📧 Email                ││
│  │ maria@example.com       ││
│  │ [Editar]                ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 📊 Estadísticas         ││ ← Card stats
│  │                         ││
│  │ Viajes totales: 15      ││
│  │ Calificación dada: ⭐4.8││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ ⚙️ Configuración        ││
│  │ Notificaciones    [ON]  ││ ← Toggle
│  │ Permisos ubicación      ││
│  └─────────────────────────┘│
│                             │
│  ┌───────────────────────┐  │
│  │  CERRAR SESIÓN        │  │ ← Button error
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Componentes

**Avatar**:
- Size: 80x80px
- Border radius: 40px
- Background: primary (light)
- Iniciales: displayMedium, white
- Margin top: 24px
- Centrado

**Nombre**:
- Typography: h1
- Margin top: 12px
- Text align: center

**Cards**:
- Background: white
- Border: 1px solid lightGray
- Border radius: 12px
- Padding: 16px
- Margin: 16px
- Shadow: elevation 1

**Botón Cerrar sesión**:
- Background: error
- Color: white
- Margin: 24px 16px

---

## Componentes reutilizables

### Button

```typescript
<Button
  variant="primary" | "secondary" | "ghost" | "text"
  size="large" | "medium" | "small"
  disabled={boolean}
  loading={boolean}
  icon={ReactNode}
  onPress={() => {}}
>
  Text
</Button>
```

### Input

```typescript
<Input
  placeholder="Placeholder"
  value={string}
  onChangeText={(text) => {}}
  keyboardType="default" | "phone-pad" | "email-address"
  secureTextEntry={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  error={string}
/>
```

### Card

```typescript
<Card
  variant="default" | "outlined" | "elevated"
  onPress={() => {}}
>
  {children}
</Card>
```

### Badge

```typescript
<Badge
  variant="success" | "error" | "warning" | "info"
  size="small" | "medium"
>
  Text
</Badge>
```

---

**Fin del documento**
