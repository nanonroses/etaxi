# Imágenes ETAXI

Esta carpeta contiene todas las imágenes del sitio.

## Estructura

- `/hero/` - Imágenes para hero sections (1920x1080px, WebP, < 200KB)
- `/screenshots/` - Capturas de la app (1080x1920px, WebP, < 100KB)
- `/icons/` - Iconos y logos (SVG preferentemente)
- `/placeholders/` - Imágenes temporales

## Cómo agregar imágenes

1. Optimizar imágenes con [Squoosh](https://squoosh.app) o ImageOptim
2. Convertir a WebP para mejor rendimiento
3. Colocar en la carpeta correspondiente
4. Usar con next/image:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero/home-hero.webp"
  alt="ETAXI - Taxis regulados"
  width={1920}
  height={1080}
  priority // Para hero images
/>
```

## Pendiente

- [ ] Hero Home (1920x1080px, WebP)
- [ ] Hero Conductores (1920x1080px, WebP)
- [ ] Hero Empresas (1920x1080px, WebP)
- [ ] Screenshots App (3-4 imágenes, 1080x1920px, WebP)
- [ ] Logo ETAXI (SVG)
- [ ] Favicon (32x32px, ICO)

Consultar `IMAGENES_ESTRUCTURA.md` en raíz del proyecto para más detalles.
