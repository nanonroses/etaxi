# ESTRUCTURA DE IMÁGENES PROFESIONALES — ETAXI

---

## Ubicación de Imágenes

Todas las imágenes del proyecto deben ubicarse en:

```
public/images/
```

### Estructura de carpetas recomendada:

```
public/
├── images/
│   ├── hero/              # Imágenes de hero sections
│   │   ├── home-hero.webp
│   │   ├── driver-hero.webp
│   │   └── business-hero.webp
│   ├── screenshots/       # Capturas de app
│   │   ├── app-home.webp
│   │   ├── app-map.webp
│   │   ├── app-ride.webp
│   │   └── app-safety.webp
│   ├── icons/             # Iconos personalizados
│   │   ├── etaxi-logo.svg
│   │   ├── app-icon.png
│   │   └── favicon.ico
│   ├── features/          # Imágenes de características
│   │   ├── security.webp
│   │   ├── compliance.webp
│   │   └── traceability.webp
│   ├── og/                # Open Graph images para SEO
│   │   ├── og-home.png
│   │   ├── og-business.png
│   │   └── og-default.png
│   └── placeholders/      # Placeholders temporales
│       ├── hero-placeholder.webp
│       └── screenshot-placeholder.webp
```

---

## Formatos Recomendados

### Imágenes de contenido:
- **Formato principal:** WebP (mejor compresión, soporte moderno)
- **Fallback:** PNG o JPG (para navegadores antiguos)

### Iconos:
- **SVG** para iconos escalables (logo, iconos UI)
- **PNG** para app icons y favicons

### Open Graph:
- **PNG** o **JPG** (1200x630px)
- **Peso máximo:** 1MB por imagen

---

## Tamaños Recomendados

### Hero Images:
- **Desktop:** 1920x1080px (16:9)
- **Mobile:** 1080x1350px (4:5)
- **Formato:** WebP
- **Peso:** < 200KB

### Screenshots de App:
- **Tamaño:** 1080x1920px (9:16 - ratio de móvil)
- **Formato:** WebP
- **Peso:** < 100KB cada una

### Open Graph:
- **Tamaño:** 1200x630px
- **Formato:** PNG o JPG
- **Peso:** < 500KB

### Favicon:
- **Tamaño:** 32x32px, 16x16px
- **Formato:** ICO o PNG
- **Archivo:** `public/favicon.ico`

---

## Optimización de Imágenes

### Herramientas recomendadas:

1. **Squoosh** (web): https://squoosh.app
   - Convierte a WebP
   - Comprime imágenes sin pérdida visible

2. **ImageOptim** (Mac) / **FileOptimizer** (Windows)
   - Optimización automática

3. **Next.js Image Component:**
   ```tsx
   import Image from 'next/image';

   <Image
     src="/images/hero/home-hero.webp"
     alt="ETAXI - Taxis regulados"
     width={1920}
     height={1080}
     priority // Para hero images (carga inmediata)
     placeholder="blur" // Efecto blur mientras carga
   />
   ```

---

## Cómo Usar Imágenes en Next.js

### Ejemplo 1: Hero Section

```tsx
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero/home-hero.webp"
        alt="ETAXI - Tu taxi regulado"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10">
        {/* Contenido del hero */}
      </div>
    </section>
  );
}
```

### Ejemplo 2: Screenshots de App

```tsx
import Image from 'next/image';

export function AppScreenshots() {
  const screenshots = [
    { src: '/images/screenshots/app-home.webp', alt: 'Pantalla de inicio' },
    { src: '/images/screenshots/app-map.webp', alt: 'Mapa de taxis' },
    { src: '/images/screenshots/app-ride.webp', alt: 'Viaje en curso' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {screenshots.map((screenshot, idx) => (
        <div key={idx} className="relative aspect-[9/16]">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo 3: Logo (SVG)

```tsx
import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/images/icons/etaxi-logo.svg"
      alt="ETAXI Logo"
      width={120}
      height={40}
      priority
    />
  );
}
```

---

## Metadata para SEO con Open Graph

```tsx
// app/seo.config.ts
export const ogDefaults = {
  images: [
    {
      url: '/images/og/og-default.png',
      width: 1200,
      height: 630,
      alt: 'ETAXI - Taxis regulados en Chile',
    },
  ],
};

// En cada página:
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ETAXI - Home',
    description: '...',
    openGraph: {
      title: 'ETAXI - Home',
      description: '...',
      images: ['/images/og/og-home.png'],
    },
  };
}
```

---

## Placeholders Temporales

Mientras no tengas imágenes profesionales, usa:

1. **Unsplash** (gratuito, alta calidad):
   - https://unsplash.com/s/photos/taxi-chile
   - https://unsplash.com/s/photos/mobile-app

2. **Pexels** (gratuito):
   - https://www.pexels.com/search/taxi/

3. **Placeholder services:**
   - https://placehold.co/1920x1080/dd1828/white?text=ETAXI+Hero

---

## Checklist de Imágenes

Antes de producción, asegúrate de tener:

### Imágenes esenciales:
- [ ] Hero Home (1920x1080px, WebP)
- [ ] Hero Conductores (1920x1080px, WebP)
- [ ] Hero Empresas (1920x1080px, WebP)
- [ ] 3-4 Screenshots de App (1080x1920px, WebP)
- [ ] Logo ETAXI (SVG)
- [ ] Favicon (32x32px, ICO)

### SEO:
- [ ] Open Graph Home (1200x630px, PNG)
- [ ] Open Graph Empresas (1200x630px, PNG)
- [ ] Open Graph Conductores (1200x630px, PNG)

### Optimización:
- [ ] Todas las imágenes < 200KB
- [ ] Formato WebP para contenido
- [ ] SVG para iconos
- [ ] Atributos alt descriptivos

---

## Buenas Prácticas

1. **Siempre usa next/image:**
   - Optimización automática
   - Lazy loading
   - Responsive images

2. **Atributos alt descriptivos:**
   ```tsx
   <Image
     src="/images/hero/home-hero.webp"
     alt="Pasajero solicitando taxi regulado desde app ETAXI"
     // ❌ alt="Hero image"
     // ❌ alt="Imagen"
   />
   ```

3. **Priority para hero images:**
   ```tsx
   <Image
     src="/images/hero/home-hero.webp"
     priority // Carga inmediata, no lazy
   />
   ```

4. **Placeholder blur para UX:**
   ```tsx
   <Image
     src="/images/screenshots/app-home.webp"
     placeholder="blur"
     blurDataURL="data:image/..." // Generar con herramientas
   />
   ```

---

## Próximos Pasos

1. **Diseñar o conseguir imágenes profesionales**
2. **Optimizarlas con Squoosh o ImageOptim**
3. **Colocarlas en `public/images/` siguiendo la estructura**
4. **Actualizar componentes para usar las imágenes reales**
5. **Validar rendimiento con Lighthouse**

---

**Estado actual:** Estructura preparada, esperando assets visuales profesionales.
