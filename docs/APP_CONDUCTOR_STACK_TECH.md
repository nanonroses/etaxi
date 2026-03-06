# STACK TECNOLÓGICO — APP CONDUCTOR ETAXI MVP

## Versión: 1.0
## Fecha: 2025-01-15
## Estado: Decisión Técnica

---

## Decisión de Stack

Para el **MVP de la App Conductor ETAXI**, se ha decidido el siguiente stack tecnológico optimizado para **velocidad de desarrollo**, **cross-platform** y **facilidad de mantenimiento**.

---

## Frontend Móvil

### Framework Principal
**React Native + Expo**

**Razones**:
- ✅ **Cross-platform**: Una sola codebase para iOS y Android
- ✅ **Desarrollo rápido**: Hot reload, Expo Go para testing instantáneo
- ✅ **TypeScript nativo**: Type safety desde el inicio
- ✅ **Ecosistema maduro**: Amplia comunidad y librerías
- ✅ **OTA Updates**: Actualizar app sin pasar por App Store/Play Store
- ✅ **Expo SDK**: APIs nativas simplificadas (location, notifications, etc.)

**Versión recomendada**:
```json
{
  "expo": "~51.0.0",
  "react-native": "0.74.x",
  "typescript": "^5.3.0"
}
```

---

## Lenguaje

**TypeScript**

**Razones**:
- ✅ Type safety con modelos del backend (Assignment, Driver, etc.)
- ✅ Autocompletado en IDE
- ✅ Reduce bugs en producción
- ✅ Compatible con todo el ecosistema ETAXI (Next.js también usa TS)

---

## Navegación

**@react-navigation/native v6**

**Razones**:
- ✅ Stack, Tab, Drawer navigation integrados
- ✅ Deep linking nativo
- ✅ TypeScript support completo
- ✅ Compatible con Expo
- ✅ Transiciones nativas suaves

**Dependencias**:
```json
{
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/native-stack": "^6.9.0",
  "@react-navigation/bottom-tabs": "^6.5.0",
  "react-native-screens": "~3.29.0",
  "react-native-safe-area-context": "4.8.2"
}
```

---

## Gestión de Estado

**Zustand** (recomendado) o **React Context** (alternativa simple)

### Opción A: Zustand (Recomendada)
**Razones**:
- ✅ Extremadamente simple (< 1KB)
- ✅ No requiere providers
- ✅ Fácil de debuggear
- ✅ TypeScript first

**Ejemplo de uso**:
```typescript
// stores/assignmentStore.ts
import create from 'zustand';

interface AssignmentStore {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  updateAssignment: (id: string, data: Partial<Assignment>) => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  setAssignments: (assignments) => set({ assignments }),
  updateAssignment: (id, data) =>
    set((state) => ({
      assignments: state.assignments.map((a) =>
        a.id === id ? { ...a, ...data } : a
      ),
    })),
}));
```

### Opción B: React Context (Alternativa)
Para equipos que prefieren no agregar dependencias:
```typescript
// contexts/AuthContext.tsx
export const AuthContext = createContext<AuthContextType>(null);
export const useAuth = () => useContext(AuthContext);
```

---

## Comunicación con Backend

### HTTP Client
**Axios** (recomendado) o **Fetch nativo**

**Con Axios**:
```typescript
// services/api.ts
import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.etaxi.cl',
  timeout: 10000,
});

// Interceptor para agregar JWT
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### WebSocket (Futuro)
Para notificaciones en tiempo real:
- **Socket.io-client** (para MVP no es necesario)
- **Expo Notifications** con push notifications (prioridad)

---

## Autenticación

### Método
**JWT (JSON Web Token)**

**Flujo**:
1. Conductor ingresa teléfono/email + contraseña/PIN
2. App envía `POST /api/driver/login`
3. Backend valida credenciales
4. Backend emite JWT con payload:
   ```json
   {
     "driverId": "clx...",
     "operatorId": "clx...",
     "iat": 1705334400,
     "exp": 1705420800
   }
   ```
5. App guarda JWT en **SecureStore**

### Almacenamiento Seguro
**expo-secure-store**

```typescript
// services/auth.ts
import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
  await SecureStore.setItemAsync('auth_token', token);
}

export async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync('auth_token');
}
```

**Razones**:
- ✅ Encriptado nativo (Keychain en iOS, Keystore en Android)
- ✅ No se puede acceder desde backups
- ✅ API simple

---

## UI/UX

### Librería de Componentes
**React Native Paper** o **NativeBase** o **Custom Components**

**Recomendación para MVP**: **Custom Components simples**

**Razones**:
- ✅ Control total del diseño
- ✅ Menos dependencias
- ✅ Más liviano
- ✅ Fácil de adaptar a diseño ETAXI

### Colores ETAXI (Mantener consistencia)
```typescript
// constants/Colors.ts
export const Colors = {
  primary: '#dd1828',        // Rojo ETAXI
  background: '#030c13',     // Negro profundo
  card: '#182b33',           // Gris oscuro
  text: '#ffffff',           // Blanco
  textSecondary: '#a0a0a0',  // Gris claro
  success: '#10b981',        // Verde
  warning: '#f59e0b',        // Amarillo
  error: '#ef4444',          // Rojo error
};
```

### Iconos
**@expo/vector-icons** (incluido en Expo)

```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="car" size={24} color={Colors.primary} />
```

---

## Notificaciones Push

### Servicio
**Expo Notifications**

**Razones**:
- ✅ Simplifica setup de FCM (Android) y APNs (iOS)
- ✅ API unificada
- ✅ Testing fácil con Expo Go

**Setup básico**:
```typescript
// services/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
```

**Uso**:
- Cuando operador crea Assignment → backend envía push a conductor
- Conductor recibe notificación → abre app → ve servicio

---

## Geolocalización (Futuro)

**expo-location** (no prioritario para MVP)

Para tracking en tiempo real del taxi:
```typescript
import * as Location from 'expo-location';

const location = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});
```

**MVP**: No implementar tracking GPS aún (usar estado manual)

---

## Persistencia Local

### Para datos offline
**@react-native-async-storage/async-storage**

**Uso**:
- Cache de assignments recientes
- Datos del conductor
- Configuración de app

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar
await AsyncStorage.setItem('driver_profile', JSON.stringify(driver));

// Leer
const profile = JSON.parse(await AsyncStorage.getItem('driver_profile'));
```

---

## Testing (Opcional para MVP)

### Jest (ya incluido en Expo)
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Detox (E2E testing - opcional)
Para testing de flujos completos

---

## Build y Deploy

### Desarrollo
```bash
# Expo Go (testing rápido)
npx expo start

# iOS Simulator
npx expo run:ios

# Android Emulator
npx expo run:android
```

### Producción

#### Build para iOS (App Store)
```bash
eas build --platform ios --profile production
```

#### Build para Android (Play Store)
```bash
eas build --platform android --profile production
```

### Configuración EAS
```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## Estructura de Proyecto Recomendada

```
etaxi-driver-app/
├── app.json
├── package.json
├── tsconfig.json
├── App.tsx
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AssignmentDetailScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   ├── AssignmentCard.tsx
│   │   ├── StateButton.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── notifications.ts
│   ├── stores/ (si usas Zustand)
│   │   ├── authStore.ts
│   │   └── assignmentStore.ts
│   ├── types/
│   │   ├── Assignment.ts
│   │   ├── Driver.ts
│   │   └── api.ts
│   ├── constants/
│   │   ├── Colors.ts
│   │   └── Config.ts
│   └── utils/
│       ├── formatDate.ts
│       └── validation.ts
└── assets/
    ├── images/
    └── fonts/
```

---

## Variables de Entorno

### .env.development
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENV=development
```

### .env.production
```bash
EXPO_PUBLIC_API_URL=https://api.etaxi.cl
EXPO_PUBLIC_ENV=production
```

**Acceso**:
```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

---

## Dependencias Completas del Proyecto

```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.x",
    "typescript": "^5.3.0",

    "@react-navigation/native": "^6.1.0",
    "@react-navigation/native-stack": "^6.9.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native-screens": "~3.29.0",
    "react-native-safe-area-context": "4.8.2",

    "zustand": "^4.5.0",

    "axios": "^1.6.0",

    "expo-secure-store": "~13.0.1",
    "@react-native-async-storage/async-storage": "1.21.0",

    "expo-notifications": "~0.27.6",
    "expo-device": "~6.0.2",

    "expo-location": "~17.0.1",

    "@expo/vector-icons": "^14.0.0",

    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@types/react": "~18.2.79",
    "@types/react-native": "~0.73.0",
    "jest": "^29.7.0"
  }
}
```

---

## Comparación de Alternativas

| Característica | React Native + Expo | Flutter | Native (Swift/Kotlin) |
|----------------|---------------------|---------|----------------------|
| **Desarrollo** | ⭐⭐⭐⭐⭐ Rápido | ⭐⭐⭐⭐ Rápido | ⭐⭐ Lento |
| **Cross-platform** | ✅ iOS + Android | ✅ iOS + Android | ❌ Separado |
| **Hot Reload** | ✅ Sí | ✅ Sí | ❌ No |
| **Performance** | ⭐⭐⭐⭐ Muy bueno | ⭐⭐⭐⭐⭐ Excelente | ⭐⭐⭐⭐⭐ Excelente |
| **Ecosistema** | ⭐⭐⭐⭐⭐ Maduro | ⭐⭐⭐⭐ Creciendo | ⭐⭐⭐⭐⭐ Maduro |
| **Curva aprendizaje** | ⭐⭐⭐⭐ Fácil (si sabes React) | ⭐⭐⭐ Media | ⭐⭐ Difícil |
| **Costo desarrollo** | 💰 Bajo | 💰 Bajo | 💰💰 Alto |
| **OTA Updates** | ✅ Sí (Expo) | ❌ No | ❌ No |

**Veredicto para MVP ETAXI**: **React Native + Expo** es la mejor opción por velocidad y costo.

---

## Próximos Pasos

Una vez aprobado este stack:

1. **Crear proyecto Expo**: `npx create-expo-app etaxi-driver-app --template typescript`
2. **Instalar dependencias**: Según lista arriba
3. **Configurar navegación**: Setup de React Navigation
4. **Implementar pantallas**: Según DRIVER-APP-2
5. **Conectar con backend**: Implementar endpoints según DRIVER-APP-3

---

## Referencias

- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Expo Notifications](https://docs.expo.dev/push-notifications/overview/)

---

**Versión**: 1.0
**Estado**: Decisión Aprobada
**Próximo documento**: `APP_CONDUCTOR_PANTALLAS.md` (DRIVER-APP-2)
