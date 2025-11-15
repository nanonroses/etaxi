# Guía CMS ETAXI (MVP) - Sanity Integration

## Configuración Inicial

### 1. Crear Proyecto en Sanity

1. Ve a [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Crea un nuevo proyecto
3. Anota el **Project ID** y el **Dataset** (por defecto: `production`)

### 2. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Levantar Sanity Studio (Opcional)

Para usar Sanity Studio localmente:

```bash
npm install -g @sanity/cli
sanity init
# Selecciona el proyecto existente
sanity start
```

El Studio estará disponible en `http://localhost:3333`

## Schemas de Contenido

### 1. Site Settings (Configuración General)

**Schema:** `siteSettings`

Campos que puedes editar:

| Campo | Tipo | Descripción | Afecta a |
|-------|------|-------------|----------|
| `title` | string | Título general del sitio | Meta tags, SEO |
| `description` | text | Descripción del sitio | Meta tags, SEO |
| `primaryCtaLabel` | string | Texto del botón principal | Hero Home: "Pedir Taxi" |
| `secondaryCtaLabel` | string | Texto del botón secundario | Hero Home: "Descargar App" |

**UI Afectada:**
- Página Home → Hero Section → Botones de CTA

### 2. App Download (Descarga de App)

**Schema:** `appDownload`

Campos:

| Campo | Tipo | Descripción | Afecta a |
|-------|------|-------------|----------|
| `headline` | string | Título principal | DownloadAppCTA: "Descarga la app ETAXI" |
| `subheadline` | string | Subtítulo | DownloadAppCTA: Descripción |
| `playStoreUrl` | url | Link a Google Play | Botón Play Store (futuro) |
| `appStoreUrl` | url | Link a App Store | Botón App Store (futuro) |
| `qrImage` | image | Código QR (opcional) | Widget QR lateral (futuro) |

**UI Afectada:**
- Página Home → Sección DownloadAppCTA
- Página Descargar App → Sección DownloadAppCTA

### 3. Home Page (Página de Inicio)

**Schema:** `homePage`

Campos:

| Campo | Tipo | Descripción | Afecta a |
|-------|------|-------------|----------|
| `heroTitle` | string | Título del hero | Home → Hero: "Viaja con seguridad..." |
| `heroSubtitle` | string | Subtítulo del hero | Home → Hero: "ETAXI, la app chilena..." |
| `benefits` | array | Lista de beneficios (max 4) | Home → BenefitsGrid |
| `benefits[].title` | string | Título del beneficio | Card de beneficio |
| `benefits[].description` | text | Descripción | Card de beneficio |
| `benefits[].icon` | string | Nombre del icono | Opciones: Shield, DollarSign, FileCheck, Car |
| `safetyIntro` | text | Intro de seguridad | Home → SafetyFeatures (opcional) |

**UI Afectada:**
- Página Home → Hero Section
- Página Home → BenefitsGrid (4 cards)
- Página Home → SafetyFeatures

**Ejemplo de Benefits:**

```json
{
  "title": "Seguridad",
  "description": "Viajes protegidos con grabación anónima y botón de pánico",
  "icon": "Shield"
}
```

### 4. Safety Page (Página de Seguridad)

**Schema:** `safetyPage`

Campos:

| Campo | Tipo | Descripción | Afecta a |
|-------|------|-------------|----------|
| `title` | string | Título de la página | Seguridad → Hero |
| `intro` | text | Introducción | Seguridad → Intro Section |
| `sections` | array | Secciones de seguridad | Seguridad → Feature Cards |
| `sections[].title` | string | Título de sección | Card title |
| `sections[].description` | text | Descripción | Card description |
| `sections[].icon` | string | Icono | Opciones: Shield, Activity, Users, FileCheck |

**UI Afectada:**
- Página `/seguridad`

### 5. Compliance Page (Cumplimiento Normativo)

**Schema:** `compliancePage`

Campos:

| Campo | Tipo | Descripción | Afecta a |
|-------|------|-------------|----------|
| `title` | string | Título de la página | Cumplimiento → Hero |
| `intro` | text | Introducción | Cumplimiento → Intro Section |
| `lawMention` | text | Mención legal | Texto sobre Ley 21.553 y D.S. 212 |
| `extraNotes` | text | Notas adicionales | Información extra |
| `regulations` | array | Regulaciones | Cumplimiento → Regulation Cards |
| `regulations[].title` | string | Título regulación | Card title |
| `regulations[].description` | text | Descripción | Card description |
| `regulations[].icon` | string | Icono | Opciones: Scale, FileCheck, MapPin, IdCard |

**UI Afectada:**
- Página `/cumplimiento`

## Fallbacks Automáticos

### Sistema de Respaldo

Si un campo en Sanity está vacío o el CMS no está disponible, el sitio automáticamente usará:

1. **Traducciones de next-intl** (`messages/es.json` y `messages/en.json`)
2. **Valores por defecto** definidos en los componentes

**Ejemplo:**

```typescript
const heroTitle = homeData?.heroTitle || t('hero.title');
// Si homeData.heroTitle existe → usa CMS
// Si no → usa traducción de es.json/en.json
```

Esto garantiza que **el sitio nunca se rompe** si el CMS está vacío o desconectado.

## Cómo Editar Contenido

### Opción 1: Sanity Studio (Web)

1. Ve a `https://[tu-proyecto].sanity.studio`
2. Inicia sesión
3. Selecciona el documento que quieres editar (ej: "Página de Inicio")
4. Modifica los campos
5. Haz clic en "Publish"
6. Los cambios aparecerán en el sitio en ~1 minuto (CDN cache)

### Opción 2: Sanity Studio (Local)

1. Ejecuta `sanity start` en la raíz del proyecto
2. Abre `http://localhost:3333`
3. Edita y publica

### Opción 3: Sanity API (Programático)

Usa las queries en `lib/sanity.queries.ts`:

```typescript
import { getHomePage } from '@/lib/sanity.queries';

const data = await getHomePage();
console.log(data.heroTitle);
```

## Estructura de Archivos CMS

```
etaxi/
├── sanity/
│   ├── schemas/
│   │   ├── index.ts              # Exporta todos los schemas
│   │   ├── siteSettings.ts       # Configuración general
│   │   ├── appDownload.ts        # Descarga de app
│   │   ├── homePage.ts           # Página home
│   │   ├── safetyPage.ts         # Página seguridad
│   │   └── compliancePage.ts     # Página cumplimiento
│   └── ...
├── lib/
│   ├── sanity.client.ts          # Cliente de Sanity
│   └── sanity.queries.ts         # Queries y tipos TypeScript
├── sanity.config.ts              # Configuración de Sanity
├── .env.local.example            # Ejemplo de variables de entorno
└── README_CMS.md                 # Esta guía
```

## Workflow de Contenido

### 1. Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env.local con tus credenciales de Sanity

# 3. Levantar Sanity Studio (opcional)
sanity start

# 4. Levantar Next.js
npm run dev

# 5. Editar contenido en Studio
# 6. Ver cambios en http://localhost:3000
```

### 2. Producción

1. Editar contenido en Sanity Studio (web o local)
2. Publicar cambios
3. Next.js automáticamente fetchea el nuevo contenido en el siguiente render
4. Si usas ISR (Incremental Static Regeneration), configura `revalidate`:

```typescript
export const revalidate = 60; // Revalidar cada 60 segundos
```

## Iconos Disponibles

### Para Benefits y Safety Sections

Nombres válidos (de lucide-react):

- `Shield` - Escudo (seguridad)
- `DollarSign` - Signo de dólar (tarifas)
- `FileCheck` - Archivo con check (cumplimiento)
- `Car` - Auto (taxis)
- `Activity` - Actividad (trazabilidad)
- `Users` - Usuarios (conductores)
- `Scale` - Balanza (ley)
- `MapPin` - Pin de mapa (ubicación)
- `IdCard` - ID (licencias)

## Troubleshooting

### Error: "Project ID not found"

- Verifica que `.env.local` existe y tiene las variables correctas
- Restart el servidor de Next.js: `npm run dev`

### Error: "Sanity client error"

- Verifica que el Project ID y Dataset son correctos
- Verifica que el proyecto existe en [sanity.io/manage](https://sanity.io/manage)

### Contenido no aparece en el sitio

- Verifica que publicaste los cambios en Sanity Studio ("Publish" button)
- Espera ~1 minuto para que el CDN se actualice
- Si usas ISR, espera el tiempo de `revalidate`
- Verifica la consola del navegador por errores

### El sitio se rompió

- **No debería pasar**: Los fallbacks garantizan que siempre hay contenido
- Si pasa, verifica:
  1. Build de Next.js: `npm run build`
  2. Logs de errores en la consola
  3. Que las traducciones en `messages/es.json` están intactas

## Restricciones y Buenas Prácticas

### ✅ Buenas Prácticas

- **Siempre publica** después de editar
- **Usa el mismo idioma** que tus usuarios (español para Chile)
- **Textos cortos**: Hero titles ~8-12 palabras, descriptions ~20-30 palabras
- **Consistencia de marca**: Siempre menciona "taxis regulados"
- **No prometas** lo que no puedes cumplir (ej: tiempos de llegada exactos)

### ❌ Restricciones

- **NO cambies** el modelo de negocio a motos/scooters/delivery
- **NO menciones** competidores directamente
- **NO uses** lenguaje técnico complejo (audiencia general)
- **NO excedas** el límite de 4 benefits en Home
- **NO uses iconos** que no estén en la lista de lucide-react

## Próximos Pasos (Post-MVP)

Schemas futuros a agregar:

1. **Blog Posts** - Para contenido de marketing
2. **Success Stories** - Casos de éxito
3. **FAQs Dinámicos** - Preguntas frecuentes editables
4. **Testimonials** - Testimonios de usuarios
5. **Pricing Plans** - Planes de precios (B2B)

## Soporte

Para problemas técnicos:
- Sanity Docs: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- ETAXI Tech Team: tech@etaxi.cl (placeholder)

---

**Última actualización:** 2025-11-15
**Versión:** MVP - Fase 2
