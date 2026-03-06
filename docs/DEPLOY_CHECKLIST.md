# 🚀 ETAXI MVP - Checklist de Deploy

## ✅ Pre-Deploy Completado

### 1. Testing Funcional
- [x] 61 rutas generadas y validadas
- [x] Navegación mobile/desktop funcional
- [x] Formularios validados con accesibilidad
- [x] Enlaces de footer y navbar verificados
- [x] Accesibilidad: labels, aria-* attributes, focus states

### 2. Auditoría UX
- [x] Espaciados consistentes (py-16, py-20, px-4)
- [x] Tipografías uniformes (text-3xl/4xl, font-bold)
- [x] Paleta de colores definida (globals.css)
- [x] Iconos decorativos con aria-hidden="true"

### 3. SEO
- [x] Sitemap.xml con 28 URLs (14 rutas x 2 locales)
- [x] Robots.txt bloqueando /api, /_next, /admin
- [x] Metadata completa (OpenGraph, Twitter, canonical)
- [x] hreflang configurado (es-CL, en-US)
- [x] JSON-LD structured data (Organization, WebSite, LocalBusiness)

### 4. Analytics
- [x] Google Analytics 4 integrado
- [x] Meta Pixel (Facebook) integrado
- [x] Google Search Console verification tag
- [x] Scripts con strategy="afterInteractive"

---

## 🚀 Opciones de Deploy

Este proyecto puede desplegarse en múltiples plataformas. A continuación se presentan las dos opciones principales:

- **Opción A: Cloudflare Pages** (recomendado) - Ver guía detallada en [CLOUDFLARE_PAGES_DEPLOY.md](./CLOUDFLARE_PAGES_DEPLOY.md)
- **Opción B: Vercel** (alternativa) - Ver guía abajo

---

## 📋 Opción A: Deploy con Cloudflare Pages

Ver documentación completa en [CLOUDFLARE_PAGES_DEPLOY.md](./CLOUDFLARE_PAGES_DEPLOY.md)

**Resumen rápido:**
1. Conectar repositorio GitHub a Cloudflare Pages
2. Configurar build command: `npm run build`
3. Definir variables de entorno (ver sección abajo)
4. Configurar dominio y DNS
5. Verificar deployment

---

## 📋 Opción B: Deploy con Vercel (Alternativa)

### Paso 1: Configurar Variables de Entorno

En tu plataforma de hosting > Settings > Environment Variables, agregar:

#### 🔴 REQUERIDAS (Críticas):
```bash
DATABASE_URL="postgresql://user:password@host:5432/etaxi"
AUTH_SECRET="<generar con: openssl rand -base64 32>"
DRIVER_JWT_SECRET="<generar con: openssl rand -base64 32>"
PASSENGER_JWT_SECRET="<generar con: openssl rand -base64 32>"
```

#### 🟡 IMPORTANTES (Funcionalidad):
```bash
NEXTAUTH_URL="https://www.etaxi.cl"
NEXT_PUBLIC_SITE_URL="https://www.etaxi.cl"
NEXT_PUBLIC_ALLOWED_ORIGIN="https://etaxi.cl"
ADMIN_EMAIL="admin@etaxi.cl"
ADMIN_PASSWORD="<password seguro>"
```

#### 🟢 OPCIONALES (Analytics y CMS):
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="codigo_verificacion"
NEXT_PUBLIC_SANITY_PROJECT_ID="<si usas Sanity>"
NEXT_PUBLIC_SANITY_DATASET="production"
```

---

### Paso 2: Configurar Base de Datos

**Proveedores recomendados:**

1. **Neon** (https://neon.tech) - Postgres serverless
2. **Supabase** (https://supabase.com) - Postgres con extras
3. **Railway** (https://railway.app) - Multi-database
4. **Vercel Postgres** (solo con Vercel hosting)

**Setup:**
```bash
# 1. Crear proyecto en tu proveedor elegido
# 2. Copiar connection string como DATABASE_URL
# 3. Ejecutar migraciones:
npx prisma migrate deploy
npx prisma generate
```

---

### Paso 3: Dominio y DNS (específico para Vercel)

1. **Agregar dominio en Vercel:**
   - Settings > Domains > Add Domain
   - Agregar: `etaxi.cl` y `www.etaxi.cl`

2. **Configurar DNS en registrador:**
   ```
   A     @      76.76.21.21
   CNAME www    cname.vercel-dns.com
   ```

3. **Esperar propagación DNS** (1-48 horas)

> **Nota:** Para Cloudflare Pages, ver configuración DNS en [CLOUDFLARE_PAGES_DEPLOY.md](./CLOUDFLARE_PAGES_DEPLOY.md)

---

### Paso 4: Google Search Console

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad: `https://www.etaxi.cl`
3. Método de verificación: **HTML tag**
4. Copiar código de verificación a `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
5. Esperar verificación
6. Enviar sitemap: `https://www.etaxi.cl/sitemap.xml`

---

### Paso 5: Google Analytics 4

1. Ir a [analytics.google.com](https://analytics.google.com/)
2. Crear propiedad: "ETAXI"
3. Configurar stream de datos web: `www.etaxi.cl`
4. Copiar `Measurement ID` (formato: G-XXXXXXXXXX)
5. Agregar a `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

### Paso 6: Meta Pixel (Facebook)

1. Ir a [business.facebook.com](https://business.facebook.com/)
2. Business Settings > Data Sources > Pixels
3. Crear pixel: "ETAXI Pixel"
4. Copiar Pixel ID (15 dígitos)
5. Agregar a `NEXT_PUBLIC_META_PIXEL_ID`

---

### Paso 7: Deploy a Vercel

```bash
# Conectar repositorio GitHub con Vercel Dashboard
# O deploy manual con Vercel CLI:
vercel --prod
```

**Configuración de Build (Vercel):**
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

---

## 🔍 Post-Deploy Verification

### Verificar sitio en producción:

- [ ] **Home:** https://www.etaxi.cl/es
- [ ] **Home EN:** https://www.etaxi.cl/en
- [ ] **Sitemap:** https://www.etaxi.cl/sitemap.xml
- [ ] **Robots:** https://www.etaxi.cl/robots.txt
- [ ] **Admin Login:** https://www.etaxi.cl/admin/login

### Verificar SEO:

```bash
# Lighthouse CI
npx lighthouse https://www.etaxi.cl --view

# Meta tags
curl -s https://www.etaxi.cl | grep "og:"
curl -s https://www.etaxi.cl | grep "twitter:"
```

### Verificar Analytics:

- [ ] Abrir https://www.etaxi.cl
- [ ] Abrir Developer Tools > Network
- [ ] Verificar request a `googletagmanager.com`
- [ ] Verificar request a `connect.facebook.net`
- [ ] Verificar eventos en Google Analytics Realtime

---

## 🐛 Troubleshooting

### Build falla:
```bash
# Verificar build localmente
npm run build

# Ver logs en tu plataforma de hosting
# Vercel: vercel logs <deployment-url>
# Cloudflare: Pages dashboard > Deployment > View logs
```

### Database connection error:
```bash
# Verificar DATABASE_URL correcta
# Verificar IP whitelist en tu proveedor de base de datos
# Verificar SSL: ?sslmode=require (para Postgres)
```

### Analytics no aparece:
```bash
# Verificar que NEXT_PUBLIC_* están en Environment Variables
# Verificar que NODE_ENV=production
# Desactivar AdBlockers para testing
# Revisar Network tab en DevTools
```

---

## 📊 Monitoreo Post-Deploy

### Día 1:
- [ ] Verificar Google Analytics registra tráfico
- [ ] Verificar Meta Pixel registra eventos
- [ ] Revisar analytics de tu plataforma (Cloudflare Web Analytics / Vercel Analytics)

### Semana 1:
- [ ] Verificar Google Search Console: páginas indexadas
- [ ] Revisar Core Web Vitals
- [ ] Analizar errores 404

### Mes 1:
- [ ] Analizar métricas de conversión
- [ ] Revisar performance
- [ ] Optimizar según datos

---

## 🎯 Próximos Pasos (Post-MVP)

1. **Performance:**
   - Implementar Image Optimization (Next/Image)
   - Agregar Service Worker (PWA)
   - Habilitar Edge Functions según plataforma

2. **SEO:**
   - Crear contenido de blog
   - Implementar Schema.org para FAQ
   - Optimizar para búsquedas locales

3. **Analytics Avanzados:**
   - Configurar eventos personalizados
   - Implementar Conversion Tracking
   - Agregar Hotjar/Clarity

4. **Seguridad:**
   - Implementar CSP headers
   - Configurar rate limiting
   - Agregar WAF según plataforma (Cloudflare WAF / Vercel Firewall)

---

**Fecha creación:** 2025-01-16
**Versión:** 1.0 - MVP Pre-Deploy
**Stack:** Next.js 16 + Prisma + PostgreSQL
**Deploy:** Cloudflare Pages (principal) / Vercel (alternativa)
