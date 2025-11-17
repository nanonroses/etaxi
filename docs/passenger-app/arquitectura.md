# Arquitectura Técnica — App Pasajero ETAXI

**Fecha**: 2025-11-16
**Versión**: 1.0
**Estado**: Diseño aprobado

---

## 1. Stack tecnológico

### Framework principal
- **Expo SDK 52+** (managed workflow)
- **React Native 0.76+**
- **TypeScript** (strict mode)
- **Node.js 18+** para tooling

### State management
- **Zustand 5.x** para estado global
- **React Query / TanStack Query** para cache de datos del servidor (opcional)
- **AsyncStorage** para persistencia local

### Navegación
- **React Navigation 7.x** (Native Stack Navigator)
- **Deep linking** para notificaciones push

### Mapas y geolocalización
- **Expo Location** para GPS
- **Expo MapView** (Google Maps en Android, Apple Maps en iOS)
- **Google Maps Directions API** para rutas (opcional MVP)

### Notificaciones
- **Expo Notifications** para push notifications
- **OneSignal** o **Firebase Cloud Messaging** (para backend)

### HTTP Client
- **Fetch API** nativo (wrapper personalizado)
- **Axios** (alternativa si se requiere más features)

### UI/UX
- **React Native Paper** (opcional, componentes Material Design)
- **NativeWind** / Tailwind CSS para React Native (opcional)
- **Custom components** basados en design system ETAXI

---

## 2. Arquitectura de carpetas

```
etaxi-passenger/
├── App.tsx                          # Entry point
├── app.json                         # Expo config
├── package.json
├── tsconfig.json
├── .env.example
│
├── src/
│   ├── api/                         # API client
│   │   ├── client.ts                # HTTP wrapper
│   │   ├── passenger.ts             # Passenger endpoints
│   │   └── types.ts                 # API response types
│   │
│   ├── components/                  # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Map.tsx
│   │   ├── TaxiTypeSelector.tsx
│   │   └── DriverCard.tsx
│   │
│   ├── constants/                   # Constantes
│   │   ├── messages.ts              # Mensajes de UI
│   │   ├── taxiTypes.ts             # Tipos de taxi
│   │   └── config.ts                # Config general
│   │
│   ├── hooks/                       # Custom hooks
│   │   ├── useAuth.ts               # Auth logic
│   │   ├── useLocation.ts           # GPS tracking
│   │   ├── usePolling.ts            # Polling para estados
│   │   └── useNotifications.ts      # Push notifications
│   │
│   ├── navigation/                  # Navegación
│   │   ├── AuthNavigator.tsx        # Stack de login
│   │   ├── AppNavigator.tsx         # Stack principal
│   │   └── RootNavigator.tsx        # Switch Auth/App
│   │
│   ├── screens/                     # Pantallas
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── OTPScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── request/
│   │   │   ├── RequestTaxiScreen.tsx
│   │   │   ├── WaitingScreen.tsx
│   │   │   └── AssignedScreen.tsx
│   │   ├── trip/
│   │   │   ├── TrackingScreen.tsx
│   │   │   └── CompletedScreen.tsx
│   │   ├── history/
│   │   │   └── HistoryScreen.tsx
│   │   └── profile/
│   │       └── ProfileScreen.tsx
│   │
│   ├── state/                       # Zustand stores
│   │   ├── authStore.ts             # Auth state
│   │   ├── tripStore.ts             # Trip state
│   │   └── locationStore.ts         # GPS state
│   │
│   ├── theme/                       # Design system
│   │   ├── colors.ts                # Paleta ETAXI
│   │   ├── typography.ts            # Fuentes y tamaños
│   │   └── spacing.ts               # Espaciado
│   │
│   ├── types/                       # TypeScript types
│   │   ├── index.ts                 # Types generales
│   │   ├── passenger.ts             # Passenger types
│   │   ├── trip.ts                  # Trip types
│   │   └── navigation.d.ts          # Navigation types
│   │
│   └── utils/                       # Utilidades
│       ├── validators.ts            # Validaciones
│       ├── formatters.ts            # Format de datos
│       └── storage.ts               # AsyncStorage helpers
│
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

---

## 3. Backend API requerido

### Base URL
- **Desarrollo**: `http://localhost:3000`
- **Staging**: `https://staging-api.etaxi.cl`
- **Producción**: `https://api.etaxi.cl`

### Endpoints necesarios

#### 3.1. Autenticación

**POST /api/passenger/send-otp**
```typescript
Request:
{
  phone: string; // +56912345678
}

Response:
{
  success: boolean;
  message: string;
  // En MVP puede retornar el OTP directamente para testing
  otp?: string; // Solo en development
}
```

**POST /api/passenger/verify-otp**
```typescript
Request:
{
  phone: string;
  otp: string; // Código de 6 dígitos
}

Response:
{
  token: string; // JWT
  passenger: {
    id: string;
    phone: string;
    name?: string;
    createdAt: string;
  };
}
```

#### 3.2. Solicitud de taxi

**POST /api/passenger/create-request**
```typescript
Headers:
Authorization: Bearer <token>

Request:
{
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress?: string;
  dropoffLat?: number;
  dropoffLng?: number;
  taxiType: 'BASIC' | 'EXECUTIVE' | 'TOURISM' | 'VAN' | 'LUXURY';
  notes?: string;
}

Response:
{
  requestId: string;
  status: 'WAITING_FOR_ASSIGNMENT';
  createdAt: string;
}
```

#### 3.3. Estado de solicitud

**GET /api/passenger/request/[id]**
```typescript
Headers:
Authorization: Bearer <token>

Response:
{
  id: string;
  status: 'WAITING_FOR_ASSIGNMENT' | 'ASSIGNED' | 'CANCELED' | 'EXPIRED';
  pickupAddress: string;
  dropoffAddress?: string;
  taxiType: string;
  createdAt: string;
  assignmentId?: string; // Si ya fue asignado
}
```

#### 3.4. Detalles de asignación

**GET /api/passenger/assignment/[id]**
```typescript
Headers:
Authorization: Bearer <token>

Response:
{
  id: string;
  status: 'SENT_TO_DRIVER' | 'ACCEPTED_BY_DRIVER' | 'DRIVER_EN_ROUTE' | 'PASSENGER_ONBOARD' | 'COMPLETED' | 'CANCELED';
  driver: {
    id: string;
    fullName: string;
    phone: string;
    photo?: string;
    professionalLicense: string;
    rating?: number;
  };
  taxi: {
    id: string;
    licensePlate: string;
    type: string;
    brand?: string;
    model?: string;
    color?: string;
  };
  operator: {
    id: string;
    name: string;
    city: string;
  };
  estimatedArrival?: string; // ISO date
  startedAt?: string;
  completedAt?: string;
}
```

#### 3.5. Tracking GPS

**GET /api/passenger/tracking/[assignmentId]**
```typescript
Headers:
Authorization: Bearer <token>

Response:
{
  lat: number;
  lng: number;
  heading?: number; // Dirección del vehículo (0-360)
  speed?: number;   // km/h
  updatedAt: string;
}
```

#### 3.6. Cancelar solicitud

**POST /api/passenger/request/[id]/cancel**
```typescript
Headers:
Authorization: Bearer <token>

Request:
{
  reason?: string;
}

Response:
{
  success: boolean;
  message: string;
}
```

#### 3.7. Historial de viajes

**GET /api/passenger/history**
```typescript
Headers:
Authorization: Bearer <token>

Query params:
?limit=20&offset=0&from=2024-01-01&to=2024-12-31

Response:
{
  trips: [
    {
      id: string;
      pickupAddress: string;
      dropoffAddress?: string;
      status: string;
      driverName: string;
      taxiPlate: string;
      createdAt: string;
      completedAt?: string;
      rating?: number;
    }
  ];
  total: number;
}
```

#### 3.8. Calificar viaje (opcional MVP)

**POST /api/passenger/rating**
```typescript
Headers:
Authorization: Bearer <token>

Request:
{
  assignmentId: string;
  rating: number; // 1-5
  comment?: string;
}

Response:
{
  success: boolean;
  message: string;
}
```

---

## 4. Base de datos requerida

### Tablas existentes (backend ETAXI)
- ✅ `PassengerRequest` - Solicitudes de taxi
- ✅ `Assignment` - Asignaciones conductor-pasajero
- ✅ `Driver` - Conductores
- ✅ `Taxi` - Vehículos
- ✅ `FleetOperator` - Operadores/gremios
- ✅ `DriverPosition` - Posiciones GPS de conductores
- ✅ `AuditLog` - Logs de eventos

### Nueva tabla requerida: `Passenger`

```prisma
model Passenger {
  id        String   @id @default(cuid())
  phone     String   @unique
  createdAt DateTime @default(now())
  name      String?
  email     String?

  // Relaciones
  requests  PassengerRequest[]
  ratings   Rating[]
}
```

### Nueva tabla opcional: `Rating`

```prisma
model Rating {
  id           String   @id @default(cuid())
  passengerId  String
  assignmentId String   @unique
  rating       Int      // 1-5
  comment      String?
  createdAt    DateTime @default(now())

  // Relaciones
  passenger  Passenger  @relation(fields: [passengerId], references: [id])
  assignment Assignment @relation(fields: [assignmentId], references: [id])
}
```

### Modificación a `PassengerRequest`

```prisma
model PassengerRequest {
  // ... campos existentes ...

  passengerId String?  // Nueva relación
  passenger   Passenger? @relation(fields: [passengerId], references: [id])

  pickupLat   Float?   // Coordenadas del origen
  pickupLng   Float?
  dropoffLat  Float?   // Coordenadas del destino
  dropoffLng  Float?

  taxiType    String?  // BASIC, EXECUTIVE, TOURISM, VAN, LUXURY
}
```

---

## 5. Flujo de datos

### 5.1. Login

```
App → POST /api/passenger/send-otp → Backend envía SMS
App → Usuario ingresa OTP → POST /api/passenger/verify-otp
Backend → Valida OTP → Retorna JWT token
App → Guarda token en AsyncStorage → Redirige a Home
```

### 5.2. Pedir taxi

```
App → Usuario completa form → POST /api/passenger/create-request
Backend → Crea PassengerRequest (status: WAITING_FOR_ASSIGNMENT)
App → Navega a pantalla "Esperando asignación"
App → Polling cada 5s → GET /api/passenger/request/[id]
Backend → Cuando operador asigna → status: ASSIGNED
App → Detecta cambio → GET /api/passenger/assignment/[id]
App → Navega a "Taxi asignado"
```

### 5.3. Tracking

```
App → Interval cada 10s → GET /api/passenger/tracking/[assignmentId]
Backend → Retorna última posición del conductor (DriverPosition)
App → Actualiza marcador en mapa
```

### 5.4. Cambios de estado

```
Conductor cambia estado → POST /api/driver/assignments/[id]/state
Backend → Actualiza Assignment.status
App (polling) → Detecta cambio de estado
App → Muestra notificación + actualiza UI
```

---

## 6. State management con Zustand

### authStore.ts

```typescript
interface AuthState {
  token: string | null;
  passenger: Passenger | null;
  isAuthenticated: boolean;

  login: (token: string, passenger: Passenger) => void;
  logout: () => void;
  loadPersistedAuth: () => Promise<void>;
}
```

### tripStore.ts

```typescript
interface TripState {
  currentRequest: PassengerRequest | null;
  currentAssignment: Assignment | null;
  driverPosition: DriverPosition | null;

  createRequest: (data: CreateRequestData) => Promise<void>;
  pollRequest: (requestId: string) => void;
  loadAssignment: (assignmentId: string) => Promise<void>;
  updateDriverPosition: (position: DriverPosition) => void;
  cancelRequest: (requestId: string) => Promise<void>;
  clearTrip: () => void;
}
```

### locationStore.ts

```typescript
interface LocationState {
  userLocation: Location | null;
  permissionGranted: boolean;

  requestPermission: () => Promise<boolean>;
  startTracking: () => void;
  stopTracking: () => void;
}
```

---

## 7. Dependencias principales

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-location": "~19.0.0",
    "expo-notifications": "~1.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-maps": "1.18.0",
    "react-native-safe-area-context": "^5.6.2",
    "react-native-screens": "^4.4.0",
    "@react-navigation/native": "^7.1.20",
    "@react-navigation/native-stack": "^7.6.3",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "zustand": "^5.0.8",
    "typescript": "~5.3.3"
  },
  "devDependencies": {
    "@types/react": "~18.3.12",
    "@types/react-native": "~0.76.0"
  }
}
```

---

## 8. Configuración de entorno

### .env.example

```bash
# Backend API URL
API_URL=http://localhost:3000

# Google Maps API Key (para Android)
GOOGLE_MAPS_API_KEY=your_api_key_here

# OneSignal App ID (notificaciones push)
ONESIGNAL_APP_ID=your_onesignal_id

# Sentry DSN (error tracking)
SENTRY_DSN=

# Environment
NODE_ENV=development
```

---

## 9. Seguridad

### 9.1. Autenticación
- JWT token con expiración de 30 días
- Token almacenado en `AsyncStorage` (encriptado en producción)
- Renovación automática antes de expirar

### 9.2. Comunicación
- HTTPS obligatorio en producción
- Certificado SSL/TLS válido
- Headers de seguridad (CORS, CSP, etc.)

### 9.3. Datos sensibles
- No almacenar contraseñas en el dispositivo
- No almacenar números de tarjeta (cuando se implemente pago)
- Limpiar AsyncStorage al hacer logout

### 9.4. Permisos
- Solicitar permisos solo cuando se necesiten
- Explicar al usuario por qué se necesita cada permiso
- Funcionalidad degradada si rechaza permisos opcionales

---

## 10. Performance

### 10.1. Optimizaciones
- Lazy loading de pantallas
- Memoización de componentes (React.memo)
- Virtualización de listas largas (FlatList)
- Compresión de imágenes

### 10.2. Manejo de errores
- Retry automático en requests fallidos (hasta 3 intentos)
- Fallback a modo offline si no hay conexión
- Error boundaries para evitar crashes

### 10.3. Caché
- Caché de datos del servidor (React Query)
- Caché de imágenes (Expo Image)
- Persistencia de último estado del viaje

---

## 11. Testing

### 11.1. Unit testing
- **Jest** para tests de lógica
- **React Native Testing Library** para componentes

### 11.2. E2E testing
- **Detox** para tests end-to-end (opcional MVP)
- **Maestro** (alternativa más simple)

### 11.3. Testing manual
- Android: Android Studio Emulator
- iOS: Xcode Simulator
- Dispositivos físicos: Expo Go

---

## 12. Deployment

### 12.1. Desarrollo
- **Expo Go** (scan QR code)
- **Development builds** (con native modules)

### 12.2. Staging
- **EAS Build** (preview builds)
- **TestFlight** (iOS internal testing)
- **Google Play Internal Testing** (Android)

### 12.3. Producción
- **App Store** (iOS)
- **Google Play Store** (Android)
- **Over-the-air updates** con EAS Update

---

## 13. Monitoreo y analytics

### 13.1. Error tracking
- **Sentry** para crashes y errores

### 13.2. Analytics
- **Firebase Analytics** (eventos de usuario)
- **Mixpanel** (alternativa)

### 13.3. Métricas clave
- Tiempo promedio para pedir taxi
- Tasa de conversión (solicitud → viaje completado)
- Tasa de cancelación
- Tiempo de respuesta del backend

---

## 14. Roadmap técnico

### Fase 1 (MVP - 4 semanas)
- Scaffolding del proyecto
- Autenticación básica
- Solicitud de taxi
- Tracking simple
- Historial básico

### Fase 2 (Post-MVP - 2 semanas)
- Notificaciones push
- Calificaciones
- Optimizaciones de performance
- Testing completo

### Fase 3 (Futuro)
- Pago integrado
- Estimación de tarifa
- Chat con conductor
- Programación de viajes

---

**Fin del documento**
