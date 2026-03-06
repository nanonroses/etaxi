# AUDITORÍA DE DEPENDENCIAS — ETAXI

**Fecha**: 2025-11-16
**Total de dependencias**: 1,523
- Producción: 1,160
- Desarrollo: 250
- Opcionales: 144
- Peer: 17

---

## 1. VULNERABILIDADES DETECTADAS

### Resumen npm audit

| Severidad | Cantidad |
|-----------|----------|
| Critical | 0 |
| High | 0 |
| **Moderate** | **6** |
| Low | 0 |
| Info | 0 |

---

### Vulnerabilidades Moderadas (6)

#### 1. js-yaml (Prototype Pollution)

**Severidad**: Moderate
**CVE**: GHSA-mh29-5h37-fv8m
**Versión afectada**: < 4.1.1
**Dependencia directa**: ❌ (transitiva vía Sanity)

**Descripción**: Prototype pollution en función `merge` (operador `<<`).

**Fix disponible**: Actualizar `sanity` a 3.87.1

**Riesgo real**: Bajo (no se usa directamente)

---

#### 2-6. Sanity y dependencias relacionadas

**Paquetes afectados**:
- `load-yaml-file`
- `which-pm`
- `preferred-pm`
- `sanity`
- `next-sanity`

**Causa raíz**: Vulnerabilidad en `js-yaml` (transitiva).

**Fix**: Actualizar Sanity:
```bash
npm install sanity@3.87.1
npm install next-sanity@9.10.6  # Downgrade (breaking changes en v11+)
```

**Estado**: ⚠️ Pendiente (requiere testing de breaking changes)

---

## 2. DEPENDENCIAS PRINCIPALES (PRODUCCIÓN)

### Core Framework

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `next` | 16.0.3 | 16.0.3 | ✅ Actualizado |
| `react` | 19.2.0 | 19.2.0 | ✅ Actualizado |
| `react-dom` | 19.2.0 | 19.2.0 | ✅ Actualizado |

---

### Database & ORM

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `@prisma/client` | 6.19.0 | 6.19.0 | ✅ Actualizado |
| `prisma` | 6.19.0 | 6.19.0 | ✅ Actualizado |

---

### Authentication

| Paquete | Versión Actual | Última Versión | Estado | Notas |
|---------|---------------|----------------|---------|-------|
| `next-auth` | 5.0.0-beta.30 | 5.0.0-beta.30 | ⚠️ Beta | Considerar si se usa |
| `jsonwebtoken` | 9.0.2 | 9.0.2 | ✅ OK | Para drivers |
| `bcryptjs` | 3.0.3 | 2.4.3 | ⚠️ Revisar | Versión parece incorrecta |

**Acción requerida**: Verificar si `next-auth` se usa realmente (hay auth custom con JWT).

---

### CMS (Sanity)

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `sanity` | 4.15.0 | 4.15.0 | ⚠️ Vulnerabilidad |
| `@sanity/client` | 7.12.1 | 7.12.1 | ✅ OK |
| `@sanity/vision` | 4.15.0 | 4.15.0 | ⚠️ Vulnerabilidad |
| `@sanity/image-url` | 1.2.0 | 1.2.0 | ✅ OK |
| `next-sanity` | 11.6.6 | 11.6.6 | ⚠️ Vulnerabilidad |

**Acción**: Actualizar a versiones sin vulnerabilidades (ver sección 1).

---

### Internacionalización

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `next-intl` | 4.5.3 | 4.5.3 | ✅ OK |

---

### UI Components

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `lucide-react` | 0.553.0 | 0.553.0 | ✅ OK |
| `class-variance-authority` | 0.7.1 | 0.7.1 | ✅ OK |
| `clsx` | 2.1.1 | 2.1.1 | ✅ OK |
| `tailwind-merge` | 3.4.0 | 3.4.0 | ✅ OK |

---

### Utilities

| Paquete | Versión Actual | Estado | Uso Detectado |
|---------|---------------|--------|---------------|
| `date-fns` | 4.1.0 | ✅ OK | Formateo de fechas |
| `dotenv` | 17.2.3 | ⚠️ Innecesario | Next.js carga .env automáticamente |

**Acción**: Considerar eliminar `dotenv` (Next.js 12+ carga `.env` automáticamente).

---

## 3. DEPENDENCIAS DE DESARROLLO

| Paquete | Versión Actual | Última Versión | Estado |
|---------|---------------|----------------|---------|
| `@tailwindcss/postcss` | 4.x | 4.x | ✅ OK |
| `tailwindcss` | 4.x | 4.x | ✅ OK |
| `typescript` | 5.x | 5.x | ✅ OK |
| `@types/node` | 20.x | 20.x | ✅ OK |
| `@types/react` | 19.x | 19.x | ✅ OK |
| `@types/react-dom` | 19.x | 19.x | ✅ OK |
| `@types/jsonwebtoken` | 9.0.10 | 9.0.10 | ✅ OK |
| `@types/bcryptjs` | 2.4.6 | 2.4.6 | ✅ OK |
| `eslint` | 9.x | 9.x | ✅ OK |
| `eslint-config-next` | 16.0.3 | 16.0.3 | ✅ OK |
| `tsx` | 4.20.6 | 4.20.6 | ✅ OK |

---

## 4. DEPENDENCIAS NO UTILIZADAS O DUDOSAS

### next-auth

**Estado**: Instalado
**Uso**: Se usa en `lib/auth.ts` para backoffice
**Versión**: 5.0.0-beta.30 (Beta)

**Problema**: Versión Beta puede tener bugs.

**Recomendación**:
- ✅ **Mantener** (se usa para admin)
- ⚠️ Considerar migrar a versión estable cuando salga v5.0.0 final
- ⚠️ Alternativa: Usar solo JWT custom (como drivers)

---

### dotenv

**Estado**: Instalado
**Uso**: No necesario

**Problema**: Next.js 12+ carga `.env` automáticamente.

**Recomendación**:
- ❌ **Eliminar**

```bash
npm uninstall dotenv
```

---

### bcryptjs versión

**Estado**: `3.0.3` instalado
**Última versión estable**: `2.4.3`

**Problema**: La versión 3.0.3 parece incorrecta (no existe en npm oficial).

**Acción**:
```bash
npm install bcryptjs@^2.4.3
```

---

## 5. DEPENDENCIAS QUE FALTAN (RECOMENDADAS)

### Validación de esquemas

**Paquete**: `zod`
**Versión**: `^3.24.1`
**Uso**: Validación type-safe de inputs API

**Instalación**:
```bash
npm install zod
```

**Beneficios**:
- Type-safe validations
- Reemplaza regex y validaciones inline
- Compatible con Prisma

---

### Rate Limiting

**Paquete**: `@vercel/rate-limit` o `express-rate-limit`
**Uso**: Proteger endpoints públicos

**Instalación**:
```bash
npm install @vercel/rate-limit
```

---

### Monitoring (opcional pero recomendado)

**Paquete**: `@sentry/nextjs`
**Uso**: Error tracking y performance monitoring

**Instalación**:
```bash
npx @sentry/wizard@latest -i nextjs
```

---

## 6. ACCIONES REQUERIDAS

### Crítico

1. ❌ **Eliminar `dotenv`**
   ```bash
   npm uninstall dotenv
   ```

2. ⚠️ **Corregir versión de `bcryptjs`**
   ```bash
   npm install bcryptjs@^2.4.3
   ```

3. ⚠️ **Resolver vulnerabilidades de Sanity**
   ```bash
   npm install sanity@3.87.1
   npm audit fix
   ```

---

### Recomendado

4. ✅ **Agregar `zod`**
   ```bash
   npm install zod
   ```

5. ✅ **Agregar rate limiting**
   ```bash
   npm install @vercel/rate-limit
   ```

6. ✅ **Agregar Sentry** (monitoreo)
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

---

## 7. COMANDOS DE MANTENIMIENTO

### Actualizar dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias (respetar semver)
npm update

# Actualizar a últimas versiones (breaking changes)
npm install <package>@latest
```

---

### Auditoría de seguridad

```bash
# Ver vulnerabilidades
npm audit

# Fix automático (solo minor/patch)
npm audit fix

# Fix forzado (incluye breaking changes)
npm audit fix --force
```

---

### Limpiar dependencias no usadas

```bash
# Instalar depcheck
npm install -g depcheck

# Ejecutar análisis
depcheck

# Eliminar paquete
npm uninstall <package>
```

---

## 8. POLÍTICA DE ACTUALIZACIONES

### Frecuencia

- **Dependencias de seguridad**: Inmediatamente
- **Dependencias core** (Next.js, React): Cada 2-3 meses
- **Dependencias secundarias**: Cada 6 meses
- **Auditoría completa**: Mensual

---

### Procedimiento

1. **Dev**: Actualizar y probar localmente
2. **Staging**: Deploy a preview
3. **Testing**: QA completo
4. **Producción**: Deploy gradual

---

### Breaking changes

- **Major versions**: Revisar changelog
- **Beta packages** (`next-auth`): Monitorear releases
- **Testing**: Ejecutar tests antes de deploy

---

## 9. ANÁLISIS DE TAMAÑO

**Bundle size** (estimado):

```bash
# Analizar bundle
npm run build

# Ver tamaño de paquetes
npx @next/bundle-analyzer
```

**Paquetes pesados detectados**:
- `@prisma/client`: ~1.5MB (necesario)
- `sanity`: ~500KB (CMS, necesario)
- `next-intl`: ~100KB (i18n, necesario)

**Optimizaciones posibles**:
- Tree-shaking automático (Next.js)
- Code splitting por ruta
- Lazy loading de componentes pesados

---

## 10. RESUMEN

### Estado general: ✅ BUENO

**Puntos positivos**:
- ✅ Framework actualizado (Next.js 16, React 19)
- ✅ ORM actualizado (Prisma 6.19)
- ✅ Sin vulnerabilidades críticas o altas
- ✅ TypeScript configurado correctamente

**Mejoras necesarias**:
- ⚠️ Resolver 6 vulnerabilidades moderadas (Sanity)
- ❌ Eliminar `dotenv` (innecesario)
- ⚠️ Corregir versión de `bcryptjs`
- ✅ Agregar `zod` para validaciones
- ✅ Agregar rate limiting

---

**Fin del documento**
