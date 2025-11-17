# 🚀 ETAXI - Guía de Deploy en Cloudflare Pages

Esta guía cubre el proceso completo de despliegue del MVP ETAXI en **Cloudflare Pages** conectado a GitHub.

---

## 📋 Requisitos Previos

### Cuentas Necesarias
- ✅ Cuenta de Cloudflare (gratuita disponible)
- ✅ Repositorio GitHub: `nanonroses/etaxi`
- ✅ Proveedor de base de datos PostgreSQL (Neon, Supabase, Railway)

### Variables de Entorno Preparadas
- Ver `.env.local.example` para referencia completa
- Generar secrets con: `openssl rand -base64 32`

---

## 🎯 Paso 1: Conectar GitHub a Cloudflare Pages

1. **Iniciar sesión en Cloudflare Dashboard**
   - Ir a: https://dash.cloudflare.com/
   - Seleccionar tu cuenta

2. **Crear nuevo proyecto en Pages**
   - En el menú lateral: `Workers & Pages`
   - Click en `Create application`
   - Tab: `Pages`
   - Click: `Connect to Git`

3. **Autorizar GitHub**
   - Seleccionar proveedor: `GitHub`
   - Autorizar acceso a Cloudflare
   - Seleccionar repositorio: `nanonroses/etaxi`

---

## ⚙️ Paso 2: Configurar Build Settings

### Configuración del Proyecto

```
Project name: etaxi
Production branch: main
```

### Build Configuration

**IMPORTANTE:** Cloudflare Pages requiere configuración específica para Next.js.

```bash
Build command: npx @cloudflare/next-on-pages@1
Install command: npm install
Output directory: .vercel/output/static
```

**Alternativa (si usas el adapter experimental):**
```bash
Build command: npm run build
Install command: npm install
Output directory: .next
```

> **Nota:** Consulta la documentación oficial de Cloudflare para Next.js:
> https://developers.cloudflare.com/pages/framework-guides/nextjs/

### Framework Preset
- Seleccionar: `Next.js`

### Node.js version
- Recomendado: `18` o `20`
- Configurar en: `Environment variables` → `NODE_VERSION=20`

---

## 🔐 Paso 3: Configurar Variables de Entorno

En Cloudflare Pages Dashboard > Settings > Environment Variables:

### 🔴 Variables CRÍTICAS (Requeridas)

```bash
DATABASE_URL="postgresql://user:password@host:5432/etaxi?sslmode=require"
AUTH_SECRET="<generar con: openssl rand -base64 32>"
DRIVER_JWT_SECRET="<generar con: openssl rand -base64 32 (DIFERENTE)>"
PASSENGER_JWT_SECRET="<generar con: openssl rand -base64 32 (DIFERENTE)>"
```

### 🟡 Variables IMPORTANTES (Funcionalidad)

```bash
NEXTAUTH_URL="https://etaxi.cl"
NEXT_PUBLIC_SITE_URL="https://etaxi.cl"
NEXT_PUBLIC_ALLOWED_ORIGIN="https://etaxi.cl"
ADMIN_EMAIL="admin@etaxi.cl"
ADMIN_PASSWORD="<password seguro>"
NODE_VERSION="20"
```

### 🟢 Variables OPCIONALES (Analytics y CMS)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="codigo_verificacion"
NEXT_PUBLIC_SANITY_PROJECT_ID="<si usas Sanity CMS>"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

### Aplicar a Entornos

Asegurarse de configurar variables para:
- ✅ **Production** (branch `main`)
- ✅ **Preview** (todas las branches)

---

## 🗄️ Paso 4: Configurar Base de Datos

### Opciones Recomendadas

**1. Neon (Recomendado para Cloudflare)**
- Sitio: https://neon.tech
- Plan gratuito: ✅ Disponible
- Latencia baja con Edge
- Postgres serverless

**2. Supabase**
- Sitio: https://supabase.com
- Plan gratuito: ✅ Disponible
- Postgres + extras (Auth, Storage)

**3. Railway**
- Sitio: https://railway.app
- Postgres tradicional
- Configuración simple

### Setup de Base de Datos

```bash
# 1. Crear proyecto en tu proveedor elegido
# 2. Copiar DATABASE_URL (connection string)
# 3. Agregar a variables de entorno en Cloudflare
# 4. Ejecutar migraciones (ver paso 7)
```

**Ejemplo de DATABASE_URL:**
```bash
postgresql://user:password@host.neon.tech:5432/etaxidb?sslmode=require
```

---

## 🌐 Paso 5: Configurar Dominio Personalizado

### Opción A: Dominio Gestionado por Cloudflare

Si tu dominio YA está en Cloudflare DNS:

1. **Agregar Custom Domain**
   - Pages > Settings > Custom domains
   - Click: `Set up a custom domain`
   - Ingresar: `etaxi.cl`
   - Click: `Continue`

2. **Cloudflare configura automáticamente:**
   - DNS records
   - SSL/TLS certificates
   - WWW redirect (opcional)

3. **Agregar www subdomain (opcional)**
   - Repetir proceso con: `www.etaxi.cl`
   - Configurar redirect: www → apex (o viceversa)

### Opción B: Dominio Externo (registrado fuera de Cloudflare)

1. **Agregar CNAME en tu registrador:**
   ```
   Tipo   Nombre   Valor
   CNAME  etaxi    <tu-proyecto>.pages.dev
   CNAME  www      <tu-proyecto>.pages.dev
   ```

2. **En Cloudflare Pages:**
   - Agregar custom domain
   - Validar ownership

3. **Migrar DNS a Cloudflare (Recomendado):**
   - Mejor performance
   - SSL automático
   - Analytics integrados

### SSL/TLS

- ✅ Cloudflare genera certificados SSL **automáticamente**
- ✅ HTTPS forzado por defecto
- ✅ Renovación automática

---

## 🚀 Paso 6: Deploy Inicial

1. **Trigger Build Manual**
   - Pages > Deployments
   - Click: `Create deployment`
   - O hacer push a `main` branch en GitHub

2. **Monitorear Build**
   - Ver logs en tiempo real
   - Duración estimada: 2-4 minutos

3. **Revisar Status**
   - ✅ Build successful
   - ✅ Deployment active
   - ✅ URL de preview generada

---

## 🔧 Paso 7: Ejecutar Migraciones de Base de Datos

**IMPORTANTE:** Las migraciones deben ejecutarse **antes** de que la app funcione correctamente.

### Opción A: Ejecutar Localmente (Recomendado)

```bash
# 1. Configurar DATABASE_URL de producción en .env
DATABASE_URL="<tu_production_database_url>"

# 2. Ejecutar migraciones
npx prisma migrate deploy

# 3. Generar cliente Prisma
npx prisma generate

# 4. (Opcional) Crear usuario admin
npx tsx scripts/create-admin.ts
```

### Opción B: Usar Cloudflare Workers (Avanzado)

Cloudflare Pages no tiene acceso directo a shell, pero puedes:
- Crear un endpoint `/api/migrate` (protegido)
- Ejecutar `prisma migrate deploy` programáticamente
- Solo para desarrollo, **NUNCA** en producción pública

---

## ✅ Paso 8: Verificación Post-Deploy

### Checklist de URLs

- [ ] **Home ES:** https://etaxi.cl/es
- [ ] **Home EN:** https://etaxi.cl/en
- [ ] **Sitemap:** https://etaxi.cl/sitemap.xml
- [ ] **Robots:** https://etaxi.cl/robots.txt
- [ ] **API Health:** https://etaxi.cl/api/health (si existe)

### Verificar SEO

```bash
# Meta tags
curl -s https://etaxi.cl | grep "og:"
curl -s https://etaxi.cl | grep "twitter:"

# Lighthouse audit
npx lighthouse https://etaxi.cl --view
```

### Verificar Analytics

1. Abrir: https://etaxi.cl
2. Developer Tools > Network tab
3. Verificar requests a:
   - `googletagmanager.com` (Google Analytics)
   - `connect.facebook.net` (Meta Pixel)
4. Google Analytics > Realtime: Verificar eventos

---

## 📊 Paso 9: Habilitar Cloudflare Web Analytics

1. **Activar Analytics**
   - Cloudflare Dashboard > Analytics & Logs
   - Pages > Web Analytics
   - Enable analytics

2. **Agregar Beacon (opcional)**
   - Copiar snippet de JavaScript
   - Agregar a `app/layout.tsx` (si no está automático)

3. **Métricas Disponibles**
   - Page views
   - Unique visitors
   - Countries
   - Browsers/Devices
   - Core Web Vitals

---

## 🔍 Troubleshooting

### ❌ Build Falla

**Síntomas:**
- Error en build logs
- "Build failed" status

**Soluciones:**
```bash
# 1. Verificar build local
npm run build

# 2. Verificar Node version
# En Cloudflare: Environment variables > NODE_VERSION=20

# 3. Limpiar cache
# Pages > Settings > Builds > Clear build cache

# 4. Revisar logs detallados
# Pages > Deployments > View build logs
```

### ❌ Database Connection Error

**Síntomas:**
- 500 error en página
- "Cannot connect to database"

**Soluciones:**
```bash
# 1. Verificar DATABASE_URL
# - Copiar exactamente desde proveedor
# - Incluir ?sslmode=require para Postgres

# 2. Verificar IP Whitelist
# - Neon: Deshabilitar IP restrictions
# - Supabase: Permitir todas las IPs (0.0.0.0/0)

# 3. Verificar que migraciones se ejecutaron
npx prisma migrate status
```

### ❌ Next.js Dynamic Routes No Funcionan

**Síntomas:**
- 404 en rutas dinámicas
- Solo páginas estáticas funcionan

**Solución:**
- Cloudflare Pages requiere `@cloudflare/next-on-pages`
- Ver: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Considerar migrar a Vercel si necesitas SSR completo

### ❌ Variables de Entorno No Se Aplican

**Soluciones:**
```bash
# 1. Verificar que empiecen con NEXT_PUBLIC_ (client-side)
# 2. Re-deploy después de cambiar variables
# 3. Verificar que estén en ambiente correcto (Production/Preview)
# 4. Clear cache y rebuild
```

### ❌ Dominio No Resuelve

**Soluciones:**
```bash
# 1. Esperar propagación DNS (5 minutos - 48 horas)
# 2. Verificar DNS con:
dig etaxi.cl
nslookup etaxi.cl

# 3. Verificar en Cloudflare:
# - DNS records correctos
# - SSL activo
# - Proxy enabled (naranja)
```

---

## 📈 Monitoreo y Mantenimiento

### Herramientas de Cloudflare

1. **Pages Dashboard**
   - Deployment history
   - Build logs
   - Traffic analytics

2. **Web Analytics**
   - Pageviews en tiempo real
   - Visitor insights
   - Performance metrics

3. **Logs (Workers Logs)**
   - Requiere plan Pro
   - Debugging avanzado

### Alertas Recomendadas

- Build failures (email notification)
- Uptime monitoring (externo: UptimeRobot, Pingdom)
- Error tracking (Sentry, LogRocket)

---

## 🔄 Workflow de Desarrollo

### Branches y Entornos

```
main (producción)
├── develop (staging)
└── feature/* (development)
```

### Proceso Recomendado

1. **Desarrollo Local**
   - Branch: `feature/nueva-funcionalidad`
   - Testing local
   - Commit y push

2. **Staging (Preview)**
   - Merge a `develop`
   - Cloudflare auto-deploys preview
   - URL: `develop.<proyecto>.pages.dev`

3. **Producción**
   - Merge a `main`
   - Deploy automático a `etaxi.cl`
   - Verificar en producción

---

## 🎯 Próximos Pasos (Post-Deploy)

### Semana 1
- [ ] Configurar Google Search Console
- [ ] Enviar sitemap.xml
- [ ] Configurar alertas de uptime
- [ ] Revisar Cloudflare Analytics

### Mes 1
- [ ] Analizar Core Web Vitals
- [ ] Optimizar performance según métricas
- [ ] Configurar Cloudflare WAF (Web Application Firewall)
- [ ] Implementar rate limiting con Cloudflare

### Continuo
- [ ] Monitorear errores
- [ ] Revisar analytics
- [ ] Optimizar SEO según datos
- [ ] Actualizar contenido

---

## 📚 Recursos Adicionales

### Documentación Oficial

- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Next.js en Cloudflare:** https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Next.js Docs:** https://nextjs.org/docs

### Alternativas de Hosting

Si Cloudflare Pages no cumple tus requisitos:
- **Vercel:** Mejor integración con Next.js, SSR completo
- **Netlify:** Similar a Cloudflare Pages
- **Railway:** Full-stack hosting con database incluida

---

## ✨ Características de Cloudflare Pages

### ✅ Ventajas

- 🚀 Deploy automático desde GitHub
- 🌍 CDN global (mejor latencia)
- 🔒 SSL/TLS automático
- 💰 Plan gratuito generoso
- 📊 Web Analytics incluido
- 🛡️ DDoS protection
- ⚡ Edge computing (Workers)

### ⚠️ Limitaciones

- Next.js SSR limitado (requiere adapter)
- Build time: máx 20 minutos (free tier)
- No hay shell access directo
- Database debe ser externa

---

## 💡 Tips y Mejores Prácticas

### Performance

1. **Usar Cloudflare CDN:**
   - Images cacheadas automáticamente
   - Static assets optimizados

2. **Habilitar Auto Minify:**
   - Speed > Optimization
   - Enable: HTML, CSS, JavaScript

3. **Configurar Cache Rules:**
   - Personalizar TTL según tipo de contenido

### Seguridad

1. **Habilitar WAF:**
   - Security > WAF
   - Managed rules activas

2. **Configurar Rate Limiting:**
   - Proteger APIs de abuse
   - Usar Cloudflare Workers

3. **Secrets Management:**
   - NUNCA commitear .env
   - Usar Environment Variables de Cloudflare
   - Rotar secrets regularmente

### SEO

1. **Cloudflare no afecta SEO negativamente**
   - Proxy mode (naranja) es seguro
   - Mejora velocidad → mejor ranking

2. **Configurar redirects:**
   - www → non-www (o viceversa)
   - HTTP → HTTPS (automático)

---

**Fecha creación:** 2025-01-16
**Versión:** 1.0
**Stack:** Next.js 16 + Prisma + PostgreSQL + Cloudflare Pages
**Autor:** ETAXI Team

---

## 🆘 Soporte

- **Documentación:** Esta guía
- **Cloudflare Support:** https://community.cloudflare.com/
- **GitHub Issues:** https://github.com/nanonroses/etaxi/issues
- **Cloudflare Status:** https://www.cloudflarestatus.com/
