# GUÍA DE CARGA DE COPY EN SANITY STUDIO - ETAXI 2025

Esta guía te ayudará a cargar el copy final en Sanity Studio paso a paso.

---

## REQUISITOS PREVIOS

1. ✅ Proyecto de Sanity creado en [sanity.io/manage](https://sanity.io/manage)
2. ✅ Variables de entorno configuradas en `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. ✅ Sanity Studio configurado (opcional, también puedes usar la web)

---

## OPCIÓN 1: Cargar vía Sanity Studio Web

### Paso 1: Acceder a Sanity Studio

1. Ve a `https://[tu-proyecto].sanity.studio` (reemplaza con el nombre de tu proyecto)
2. Inicia sesión con tu cuenta de Sanity

### Paso 2: Crear documento "Home Page"

1. En el menú lateral, busca **"Página de Inicio"** o **"Home Page"**
2. Haz clic en **"Create new"**
3. Completa los campos según `COPY_FINAL_ETAXI_2025.md`:

**heroTitle:**
```
Taxis regulados, viajes seguros
```

**heroSubtitle:**
```
ETAXI conecta pasajeros con taxis autorizados bajo normativa chilena. Cada viaje es trazable, seguro y transparente.
```

**benefits (añade 3 elementos):**

**Benefit 1:**
- title: `Solo taxis regulados`
- description: `Trabajamos exclusivamente con taxis inscritos según la normativa de transporte chilena. Cada conductor y vehículo está autorizado.`
- icon: `Shield`

**Benefit 2:**
- title: `Trazabilidad completa`
- description: `Cada viaje queda registrado con datos del conductor, vehículo y ruta. Tu seguridad no depende de la suerte.`
- icon: `Activity`

**Benefit 3:**
- title: `Transparencia total`
- description: `Tarifas claras desde el inicio. Sin sorpresas ni cobros ocultos. Todo conforme a regulación.`
- icon: `DollarSign`

**safetyIntro:**
```
En ETAXI, tu viaje no es un experimento. Cada conductor está autorizado, cada vehículo registrado, y cada trayecto deja una huella trazable para tu tranquilidad.
```

4. Haz clic en **"Publish"** (botón verde)

---

### Paso 3: Crear documento "App Download"

1. En el menú lateral, busca **"Descarga App"** o **"App Download"**
2. Haz clic en **"Create new"**
3. Completa los campos:

**headline:**
```
Descarga ETAXI y pide tu taxi regulado
```

**subheadline:**
```
La forma más rápida de solicitar un taxi autorizado en Chile. Descarga la app y viaja con seguridad.
```

**playStoreUrl:**
```
(dejar vacío por ahora)
```

**appStoreUrl:**
```
(dejar vacío por ahora)
```

4. Haz clic en **"Publish"**

---

### Paso 4: Crear documento "Safety Page"

1. En el menú lateral, busca **"Página de Seguridad"** o **"Safety Page"**
2. Haz clic en **"Create new"**
3. Completa los campos:

**title:**
```
Seguridad en cada detalle del viaje
```

**intro:**
```
La seguridad no es un eslogan para nosotros. En ETAXI, cada viaje cuenta con múltiples capas de protección: desde conductores autorizados por normativa hasta trazabilidad completa del recorrido. Tu tranquilidad es obligatoria, no opcional.
```

**sections (añade 4 elementos):**

**Section 1:**
- title: `Conductores autorizados`
- description: `Todos los conductores están inscritos bajo la Ley 21.553 y cumplen requisitos de autorización vigentes. No trabajamos con cualquier persona que tenga un auto.`
- icon: `Shield`

**Section 2:**
- title: `Trazabilidad del viaje`
- description: `Cada trayecto queda registrado con datos completos: conductor, vehículo, ruta, horarios. En caso de incidente, toda la información está disponible para las autoridades.`
- icon: `Activity`

**Section 3:**
- title: `Vehículos registrados`
- description: `Solo taxis con placas autorizadas y permisos al día forman parte de ETAXI. Cero vehículos informales o sin documentación.`
- icon: `Users`

**Section 4:**
- title: `Soporte al pasajero`
- description: `Si tienes algún problema durante o después del viaje, nuestro equipo de soporte está disponible para ayudarte. Tu reporte es tomado en serio.`
- icon: `FileCheck`

4. Haz clic en **"Publish"**

---

### Paso 5: Crear documento "Compliance Page"

1. En el menú lateral, busca **"Página de Cumplimiento"** o **"Compliance Page"**
2. Haz clic en **"Create new"**
3. Completa los campos:

**title:**
```
Cumplimiento normativo: taxis bajo ley chilena
```

**intro:**
```
ETAXI opera dentro del marco legal chileno de transporte remunerado de pasajeros. Todos los taxis en nuestra plataforma están inscritos según la Ley 21.553 y el Decreto Supremo 212, que regulan el transporte de personas en Chile. No somos una plataforma abierta a cualquier vehículo: solo taxis autorizados.
```

**lawMention:**
```
La Ley 21.553 establece los requisitos para el transporte remunerado de pasajeros, y el Decreto Supremo 212 detalla las condiciones técnicas y operativas. ETAXI se alinea a esta normativa, garantizando que cada conductor y vehículo cumple los estándares legales vigentes.
```

**regulations (añade 4 elementos):**

**Regulation 1:**
- title: `Ley 21.553 - Transporte regulado`
- description: `Esta ley regula el transporte remunerado de pasajeros en Chile, estableciendo requisitos claros para conductores y vehículos. ETAXI opera bajo este marco.`
- icon: `Scale`

**Regulation 2:**
- title: `Decreto Supremo 212`
- description: `Define las condiciones técnicas y operativas del servicio de taxi. Solo vehículos que cumplen estos estándares forman parte de ETAXI.`
- icon: `FileCheck`

**Regulation 3:**
- title: `Inscripción municipal`
- description: `Cada taxi debe estar inscrito en el municipio correspondiente con permisos al día. Verificamos esta información antes de aceptar un vehículo.`
- icon: `MapPin`

**Regulation 4:**
- title: `Licencias de conductor`
- description: `Todos los conductores deben contar con licencia profesional clase A1 y certificados vigentes. Sin excepciones.`
- icon: `IdCard`

**extraNotes:**
```
Trabajamos en coordinación con las autoridades de transporte para mantener nuestros estándares actualizados conforme evoluciona la normativa.
```

4. Haz clic en **"Publish"**

---

### Paso 6 (Opcional): Crear documento "Site Settings"

1. En el menú lateral, busca **"Configuración General"** o **"Site Settings"**
2. Haz clic en **"Create new"** (si no existe ya uno)
3. Completa los campos:

**title:**
```
ETAXI - Taxis Regulados en Chile
```

**description:**
```
Plataforma de taxis autorizados bajo normativa chilena. Viajes seguros, trazables y transparentes. Cumplimiento garantizado de Ley 21.553 y D.S. 212.
```

**primaryCtaLabel:**
```
Pedir Taxi
```

**secondaryCtaLabel:**
```
Descargar App
```

4. Haz clic en **"Publish"**

---

## OPCIÓN 2: Cargar vía Sanity Studio Local

### Paso 1: Levantar Sanity Studio

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
npx sanity start
```

### Paso 2: Acceder al Studio

Abre `http://localhost:3333` en tu navegador

### Paso 3: Seguir los mismos pasos que en "Opción 1"

Los pasos 2-6 son idénticos a la opción web.

---

## VERIFICACIÓN EN FRONTEND

### Paso 1: Levantar Next.js

```bash
cd C:\Users\nanon\OneDrive\Documentos\GitHub\etaxi
npm run dev
```

### Paso 2: Verificar cada página

Abre `http://localhost:3000` y verifica:

**Home (/):**
- ✅ Título hero muestra: "Taxis regulados, viajes seguros"
- ✅ Subtítulo correcto
- ✅ 3 beneficios desplegados con iconos
- ✅ Safety intro visible

**Descargar App (/descargar-app):**
- ✅ Headline: "Descarga ETAXI y pide tu taxi regulado"
- ✅ Subheadline correcto
- ✅ Botones Play Store / App Store visibles (aunque URLs vacías)

**Seguridad (/seguridad):**
- ✅ Título: "Seguridad en cada detalle del viaje"
- ✅ Intro desplegado correctamente
- ✅ 4 secciones de seguridad con iconos

**Cumplimiento (/cumplimiento):**
- ✅ Título: "Cumplimiento normativo: taxis bajo ley chilena"
- ✅ Intro + lawMention desplegados
- ✅ 4 regulaciones con iconos

---

## TROUBLESHOOTING

### Problema: No veo los textos en el frontend

**Solución 1:** Verifica que publicaste los documentos en Sanity (botón "Publish")

**Solución 2:** Espera ~1 minuto para que el CDN de Sanity se actualice

**Solución 3:** Reinicia el servidor de Next.js:
```bash
# Ctrl+C para detener
npm run dev
```

### Problema: "Configuration must contain projectId"

**Solución:** Verifica que `.env.local` tiene las variables correctas:
```bash
cat .env.local
```

Debe mostrar:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_real
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Problema: Los iconos no se ven

**Causa:** El nombre del icono en Sanity no coincide con lucide-react

**Solución:** Usa EXACTAMENTE estos nombres (case-sensitive):
- `Shield`
- `Activity`
- `DollarSign`
- `Users`
- `FileCheck`
- `Scale`
- `MapPin`
- `IdCard`

---

## CHECKLIST FINAL

Antes de dar por terminado, verifica:

- [ ] Documento "homePage" creado y publicado
- [ ] Documento "appDownload" creado y publicado
- [ ] Documento "safetyPage" creado y publicado
- [ ] Documento "compliancePage" creado y publicado
- [ ] (Opcional) Documento "siteSettings" creado y publicado
- [ ] Frontend muestra textos correctos en todas las páginas
- [ ] No hay errores en consola del navegador
- [ ] Build de Next.js exitoso: `npm run build`

---

## PRÓXIMOS PASOS

Una vez cargado y verificado:

1. ✅ Commit de cambios (si modificaste algo en código)
2. ✅ Informar: "Textos cargados. Sigamos con ajuste fino de copy y B2B."
3. ⏸️ Esperar instrucciones para FASE 5 o ajustes B2B

---

**Última actualización:** 2025-11-15
**Versión:** MVP - Fase 4
**Referencia:** Ver `COPY_FINAL_ETAXI_2025.md` para textos completos
