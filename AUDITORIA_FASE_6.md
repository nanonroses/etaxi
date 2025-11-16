# AUDITORÍA GLOBAL FASE 6 — ETAXI MVP 2025

**Fecha:** 2025-01-15
**Fase:** FASE 6 — Revisión Global del Sitio
**Agentes:** AE-QA + AE-PROD + AE-FRONT

---

## GLOBAL-1: AUDITORÍA DE NAVEGACIÓN

### ❌ PROBLEMAS CRÍTICOS EN NAVBAR (components/layout/Navbar.tsx)

#### 1. Enlaces faltantes
- **FALTA:** `/cumplimiento` - Página existe pero NO está en el menú
- **FALTA:** `/conductores` - Página existe pero NO está en el menú

#### 2. Ruta incorrecta
- **Línea 20:** `{ href: \`/\${locale}/empresas\`, label: t('business') }`
- **DEBERÍA SER:** `{ href: \`/\${locale}/empresas-gremios\`, label: t('business') }`
- **Razón:** La página se llama `/empresas-gremios`, NO `/empresas`

#### 3. Orden lógico de navegación
**Orden actual:**
1. Inicio
2. Pedir Taxi
3. Descargar App
4. Seguridad
5. Empresas (ruta incorrecta)
6. Contacto

**Orden sugerido:**
1. Inicio
2. Pedir Taxi
3. Descargar App
4. Seguridad
5. Cumplimiento ← FALTA
6. Empresas & Gremios ← Ruta incorrecta
7. Conductores ← FALTA
8. Contacto

#### 4. Paleta de colores
- ✅ Usa HSL variables que mapean correctamente
- ⚠️ No usa directamente `#dd1828` y `#182b33` pero funciona vía variables CSS

#### 5. Responsividad mobile
- ✅ Menú hamburguesa implementado
- ✅ Cierra menú al hacer click en enlace
- ✅ Language selector incluido en mobile

---

### ❌ PROBLEMAS CRÍTICOS EN FOOTER (components/layout/Footer.tsx)

#### 1. Enlaces a páginas que NO EXISTEN
- **Línea 34:** `/terminos` → **NO EXISTE**
- **Línea 42:** `/privacidad` → **NO EXISTE**
- **Línea 75:** `/reclamos` → **NO EXISTE**

#### 2. Enlaces faltantes a páginas importantes
**Sección "Páginas"** (NO existe esta sección):
- Falta: Empresas & Gremios
- Falta: Para Conductores
- Falta: Seguridad
- Falta: Descargar App

**Recomendación:** Crear sección "Páginas" o "Servicios" en el footer con:
- Pedir Taxi
- Descargar App
- Seguridad
- Empresas & Gremios
- Para Conductores

#### 3. Estructura actual del footer
**Columnas actuales:**
1. Brand (ETAXI + tagline)
2. Legal (Terms, Privacy, Compliance)
3. Support (Help, Claims, Contact)

**Recomendación:** Cambiar a 4 columnas:
1. Brand (ETAXI + tagline)
2. Servicios (Pedir Taxi, Descargar App, Seguridad)
3. Empresa (Empresas & Gremios, Conductores, Cumplimiento)
4. Soporte (Ayuda, Contacto)

Eliminar enlaces a páginas que no existen (Terms, Privacy, Reclamos).

---

### ⚠️ ADVERTENCIAS EN BREADCRUMBS (components/layout/Breadcrumbs.tsx)

#### 1. Texto hardcoded "Inicio"
- **Línea 29:** Usa "Inicio" hardcoded en español
- **DEBERÍA:** Usar traducciones `t('breadcrumbs.home')`

#### 2. Formateo automático de labels
- ✅ Funciona bien para rutas simples
- ⚠️ "Empresas Gremios" se mostraría como "Empresas Gremios" (sin &)
- **Recomendación:** Crear mapeo de labels para rutas específicas

---

## GLOBAL-2: AUDITORÍA DE CONTENIDO

### ✅ MENSAJE CENTRAL UNIFICADO

**Checklist:**
- ✅ ETAXI → Solo taxis regulados
- ✅ Seguridad → Trazabilidad, identificación, soporte
- ✅ Cumplimiento → Ley 21.553 + Decreto 212
- ✅ NO se mencionan palabras prohibidas:
  - ❌ ride-hailing
  - ❌ motos
  - ❌ scooters
  - ❌ repartidores
  - ❌ transporte informal
  - ❌ apps tipo Uber

### ✅ PÁGINAS B2B

- ✅ Empresas & Gremios: Copy profesional, sin promesas falsas
- ✅ Para Conductores: Solo taxis regulados, requisitos claros
- ✅ No ofrece integraciones no implementadas

### ✅ CONFIABILIDAD DEL COPY

- ✅ Todo suena profesional
- ✅ Nada exagerado
- ✅ Lenguaje simple sin jerga innecesaria
- ✅ Sin ambigüedades que generen riesgo regulatorio

---

## GLOBAL-3: AUDITORÍA UI FINAL

### ✅ COHERENCIA VISUAL - PALETA DE COLORES

**Prioridad de uso:**
1. `#dd1828` - Principal (botones, acentos, títulos importantes)
2. `#182b33` - Fondos oscuros, títulos fuertes
3. `#596065` - Texto secundario
4. `#030c13` - Casi negro, títulos/fondos
5. `#48b4b8` - Acentos fríos
6. `#fff500` - Acento puntual (bajo uso)
7. `#000000` - Negro clásico

**Estado actual:**
- ✅ Todas las páginas usan `#dd1828` como color principal
- ✅ Títulos usan `#182b33`
- ✅ Texto secundario usa `text-muted-foreground`
- ⚠️ Algunas páginas usan `hsl(var(--primary))` en lugar de `#dd1828` directo

**Recomendación:** Mantener el uso de CSS variables para flexibilidad.

### ✅ TIPOGRAFÍA COHERENTE

**Checklist:**
- ✅ H1 → `text-4xl md:text-5xl`
- ✅ H2 → `text-3xl`
- ✅ H3 → `text-xl`
- ✅ Párrafos → `text-base` o `text-lg` con `text-muted-foreground`

### ✅ SPACING COHERENTE

**Checklist:**
- ✅ Secciones principales → `py-16`
- ✅ Secciones secundarias → `py-12`
- ✅ Grids → `gap-8` (2 columnas) o `gap-6` (más columnas)

### ⚠️ RESPONSIVIDAD

**A validar en siguiente paso:**
- 320px (iPhone SE)
- 375px (iPhone X/11/12)
- 414px (iPhone Plus)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop estándar)

---

## GLOBAL-4: AUDITORÍA UX Y FLUJO DE USUARIO

### ✅ COMPRENSIÓN INMEDIATA

**Checklist (usuario entiende en < 5 segundos):**
1. ✅ **Qué es ETAXI:** "Taxis regulados, viajes seguros" (Hero Home)
2. ✅ **Dónde descargar app:** Botón visible en Hero + página dedicada
3. ✅ **Solo taxis regulados:** Mensaje repetido en múltiples páginas
4. ✅ **Cómo pedir taxi:** Página dedicada + botón en Hero
5. ✅ **Cómo contactar:** Página Contacto + footer

### ✅ COMPRENSIÓN B2B/B2G

**Empresas y Gremios entienden:**
1. ✅ Qué ofrece ETAXI (trazabilidad, cumplimiento, reportes)
2. ✅ Cómo se benefician (control, auditoría, gestión centralizada)
3. ✅ Qué problema resuelve (digitalización + cumplimiento normativo)

### ⚠️ PUNTOS DE MEJORA UX

1. **Falta enlace a "Conductores" en navegación principal**
   - Usuario que es taxista debe encontrar la página fácilmente

2. **Falta enlace a "Cumplimiento" en navegación principal**
   - Mensaje clave de ETAXI debe ser accesible desde navbar

3. **Footer con enlaces rotos**
   - Genera desconfianza y mala UX

---

## RESUMEN DE PROBLEMAS ENCONTRADOS

### 🔴 CRÍTICOS (deben corregirse)
1. **Navbar:** Falta "Cumplimiento" y "Conductores"
2. **Navbar:** Ruta incorrecta `/empresas` → debe ser `/empresas-gremios`
3. **Footer:** Enlaces a páginas inexistentes (`/terminos`, `/privacidad`, `/reclamos`)

### 🟡 IMPORTANTES (recomendado corregir)
4. **Footer:** Falta sección "Servicios" o "Páginas" con enlaces a todas las páginas
5. **Breadcrumbs:** "Inicio" hardcoded en español

### 🟢 MENORES (opcional)
6. **Breadcrumbs:** Mapeo manual de labels para rutas complejas
7. **Navbar:** Orden lógico de navegación puede mejorarse

---

## PRÓXIMO PASO: GLOBAL-5 — CORRECCIONES

Se aplicarán las correcciones necesarias para resolver los problemas críticos e importantes.
