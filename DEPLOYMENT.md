# ETAXI - Guía de Despliegue

Esta guía cubre las opciones de despliegue del MVP ETAXI.

## 🚀 Opciones de Deploy Disponibles

### Opción A: Cloudflare Pages (Recomendado)

**Guía completa:** [docs/CLOUDFLARE_PAGES_DEPLOY.md](./docs/CLOUDFLARE_PAGES_DEPLOY.md)

**Ventajas:**
- ✅ CDN global de Cloudflare
- ✅ Plan gratuito generoso
- ✅ SSL automático
- ✅ Web Analytics incluido
- ✅ DDoS protection

**Ideal para:**
- Sitios estáticos y SSG
- Alta performance global
- Máxima disponibilidad

---

### Opción B: Vercel (Alternativa)

**Guía completa:** [docs/DEPLOY_CHECKLIST.md](./docs/DEPLOY_CHECKLIST.md) (Opción B)

**Ventajas:**
- ✅ Integración nativa con Next.js
- ✅ SSR completo sin configuración
- ✅ Preview deployments automáticos
- ✅ Vercel Analytics

**Ideal para:**
- Apps con SSR intensivo
- Integración con Vercel Postgres
- Workflow Vercel-first

---

## 📚 Migración desde esta Guía

Esta guía originalmente cubría solo Vercel. Ahora hemos expandido las opciones:

1. **Para deploy en Cloudflare Pages:** Ver [CLOUDFLARE_PAGES_DEPLOY.md](./docs/CLOUDFLARE_PAGES_DEPLOY.md)
2. **Para deploy en Vercel:** La guía abajo sigue siendo válida

---

# Guía Original: Deploy en Vercel

> **Nota:** Esta es la guía heredada enfocada en Vercel.

## FASE 8: CIERRE, PRODUCCIÓN Y DESPLIEGUE

### ✅ DEPLOY-1: Preparar Repositorio (COMPLETADO)

- ✅ Branches creados: `main` (producción) y `develop` (staging)
- ✅ Código limpio: console.log eliminados
- ✅ Build exitoso: 23 rutas generadas
- ✅ Branches antiguos eliminados

### 🔄 DEPLOY-2: Variables de Entorno

#### Sanity CMS (Requerido)

1. **Crear proyecto en Sanity**:
   - Visitar https://www.sanity.io/manage
   - Crear nuevo proyecto llamado "ETAXI"
   - Copiar el Project ID del dashboard

2. **Configurar variables en Vercel**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: [Tu Project ID de Sanity]
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION`: `2024-01-01`
   - `NEXT_PUBLIC_SITE_URL`: `https://www.etaxi.cl`

3. **Aplicar a ambos entornos**:
   - Production (branch `main`)
   - Preview (branch `develop`)

### DEPLOY-3: Crear Proyecto en Vercel

1. **Importar desde GitHub**:
   - Ir a https://vercel.com/new
   - Seleccionar repositorio `nanonroses/etaxi`
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)

2. **Configurar Branches**:
   - Production Branch: `main`
   - Preview Branch: `develop`

3. **Build Settings**:
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables**:
   - Agregar todas las variables del paso DEPLOY-2
   - Asegurarse de aplicarlas a Production y Preview

### DEPLOY-4: Configurar Dominios

1. **Agregar Dominio Principal**:
   - Settings → Domains
   - Agregar: `etaxi.cl`
   - Agregar: `www.etaxi.cl`

2. **Configurar DNS**:
   ```
   Tipo  Nombre  Valor
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

3. **SSL/TLS**:
   - Vercel genera certificados SSL automáticamente
   - Esperar ~24 horas para propagación DNS

4. **Redirect www → non-www** (o viceversa):
   - Configurar en Vercel dashboard
   - Recomendado: www.etaxi.cl → etaxi.cl

### DEPLOY-5: Validación Post-Deploy

Checklist de validación después del deploy:

- [ ] Home page carga correctamente (/)
- [ ] Todas las páginas son accesibles
- [ ] Sitemap.xml disponible (/sitemap.xml)
- [ ] Robots.txt disponible (/robots.txt)
- [ ] Meta tags correctos (Open Graph, Twitter Cards)
- [ ] Paleta de colores correcta (#dd1828, #182b33)
- [ ] Animaciones funcionando (hover en navbar, cards, buttons)
- [ ] Responsive en mobile/tablet/desktop
- [ ] Sanity CMS conectado (si configurado)
- [ ] next-intl funcionando (ES/EN)

### DEPLOY-6: Performance QA

Ejecutar auditorías con Lighthouse (Chrome DevTools):

1. **Métricas objetivo**:
   - Performance: > 85
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

2. **Verificar**:
   - next/image optimización activa
   - Server Components funcionando
   - Sin JavaScript innecesario
   - CSS minificado
   - Fuentes optimizadas

3. **Herramientas**:
   - Chrome DevTools → Lighthouse
   - https://pagespeed.web.dev/
   - Vercel Analytics (después de activar)

### DEPLOY-7: Habilitar Monitoreo

1. **Vercel Analytics**:
   - Dashboard → Analytics → Enable
   - Permite ver tráfico en tiempo real
   - Datos de pageviews, visitantes únicos

2. **Speed Insights**:
   - Dashboard → Speed Insights → Enable
   - Métricas Core Web Vitals en producción
   - Datos reales de usuarios (RUM)

3. **Monitoring & Logs**:
   - Dashboard → Logs
   - Ver errores en tiempo real
   - Configurar alertas por email

## Estructura de Branches

```
main (producción)
├── develop (staging)
└── feature/* (desarrollo)
```

## Workflow Recomendado

1. Desarrollo local en `feature/*` branches
2. Merge a `develop` para testing en staging
3. Merge a `main` para despliegue a producción

## URLs

- **Producción**: https://www.etaxi.cl (después de configurar dominio)
- **Preview (develop)**: https://etaxi-[hash].vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard

## Notas Importantes

- ✅ **Build Time**: ~1-2 minutos
- ✅ **No requiere Sanity** para funcionar (fallback a next-intl)
- ✅ **23 rutas** generadas estáticamente
- ✅ **SEO completo**: metadata, Open Graph, sitemap, robots.txt
- ✅ **Performance optimizado**: Server Components, next/image, Tailwind
- ✅ **Micro-animaciones**: Tailwind transitions (150ms)

## Troubleshooting

### Build falla en Vercel

```bash
# Verificar build local
npm run build

# Verificar TypeScript
npm run type-check
```

### Variables de entorno no funcionan

- Verificar que empiecen con `NEXT_PUBLIC_` para client-side
- Verificar que estén aplicadas a Production Y Preview
- Re-deploy después de cambiar variables

### Dominio no resuelve

- Esperar 24-48 horas para propagación DNS
- Verificar configuración DNS con `dig etaxi.cl`
- Verificar en Vercel que dominio esté verificado

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router, React 19)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **CMS**: Sanity (opcional)
- **i18n**: next-intl
- **Hosting**: Vercel
- **Dominio**: etaxi.cl

## Contacto y Soporte

- **GitHub Issues**: https://github.com/nanonroses/etaxi/issues
- **Vercel Support**: https://vercel.com/support

---

**Última actualización**: 2025-01-15
**Versión**: MVP 1.0
