# MAPA COPY ↔ CMS ETAXI 2025

Este documento mapea cada campo de Sanity CMS con el tipo de texto que debe contener.

---

## 1. homePage (Página de Inicio)

**Ubicación:** Documento único en Sanity
**Tipo:** `homePage`

### Campos:

#### `heroTitle` (string, requerido)
- **Qué va aquí:** Título principal del hero de la Home
- **Extensión:** 8–10 palabras máximo
- **Mensaje clave:** ¿Qué es ETAXI en una frase?
- **Ejemplo:** "Tu taxi regulado, siempre a mano"

#### `heroSubtitle` (string, requerido)
- **Qué va aquí:** Subtítulo que explica qué hace ETAXI
- **Extensión:** 1–2 frases (máx. 25 palabras)
- **Mensaje clave:** Valor principal + diferenciador (taxis regulados, seguridad, trazabilidad)
- **Ejemplo:** "Conectamos pasajeros con taxis autorizados, con trazabilidad completa del viaje y foco en tu seguridad."

#### `benefits` (array, opcional, máx. 4 elementos)
- **Qué va aquí:** Lista de 3–4 beneficios principales de usar ETAXI
- **Cada beneficio contiene:**
  - `title` (string): Título del beneficio (3–5 palabras)
  - `description` (text): Descripción breve (1–2 líneas)
  - `icon` (string, opcional): Nombre del icono de lucide-react (Shield, DollarSign, FileCheck, Car)

**Ejemplos:**
```json
{
  "title": "Solo taxis regulados",
  "description": "Trabajamos con taxis que cumplen la normativa chilena vigente, para que sepas siempre quién te traslada.",
  "icon": "Shield"
}
```

#### `safetyIntro` (text, opcional)
- **Qué va aquí:** Párrafo corto que introduce la sección de seguridad en Home
- **Extensión:** 2–3 líneas máximo
- **Mensaje clave:** Por qué ETAXI es seguro sin ser grandilocuente
- **Ejemplo:** "Tu viaje no es un experimento. En ETAXI cada conductor y vehículo está registrado, y cada trayecto deja una huella trazable."

---

## 2. appDownload (Descarga de App)

**Ubicación:** Documento único en Sanity
**Tipo:** `appDownload`

### Campos:

#### `headline` (string, requerido)
- **Qué va aquí:** Título de la sección de descarga de app
- **Extensión:** 6–8 palabras
- **Mensaje clave:** Llamado a la acción para descargar
- **Ejemplo:** "Descarga ETAXI y viaja seguro"

#### `subheadline` (string, opcional)
- **Qué va aquí:** Subtítulo que explica beneficio directo de instalar
- **Extensión:** 1 frase corta
- **Mensaje clave:** ¿Por qué descargar la app?
- **Ejemplo:** "Pide tu taxi regulado en segundos, desde tu celular."

#### `playStoreUrl` (url, opcional)
- **Qué va aquí:** URL de la app en Google Play Store
- **Formato:** https://play.google.com/store/apps/details?id=...
- **Nota:** Dejar vacío hasta que la app esté publicada

#### `appStoreUrl` (url, opcional)
- **Qué va aquí:** URL de la app en Apple App Store
- **Formato:** https://apps.apple.com/...
- **Nota:** Dejar vacío hasta que la app esté publicada

#### `qrImage` (image, opcional)
- **Qué va aquí:** Imagen del código QR para descargar la app
- **Nota:** Funcionalidad futura

---

## 3. safetyPage (Página de Seguridad)

**Ubicación:** Documento único en Sanity
**Tipo:** `safetyPage`

### Campos:

#### `title` (string, requerido)
- **Qué va aquí:** Título principal de la página Seguridad
- **Extensión:** 5–8 palabras
- **Mensaje clave:** Enfoque en seguridad sin exagerar
- **Ejemplo:** "Tu seguridad es nuestra prioridad"

#### `intro` (text, requerido)
- **Qué va aquí:** Párrafo introductorio que contextualiza la seguridad en ETAXI
- **Extensión:** 2–3 líneas
- **Mensaje clave:** Cómo ETAXI garantiza seguridad (trazabilidad, regulación, soporte)
- **Ejemplo:** "En ETAXI, cada viaje cuenta con múltiples capas de seguridad: desde conductores autorizados hasta trazabilidad completa del recorrido. Tu tranquilidad no es opcional."

#### `sections` (array, opcional)
- **Qué va aquí:** Lista de 4–5 medidas concretas de seguridad
- **Cada sección contiene:**
  - `title` (string): Nombre de la medida (3–5 palabras)
  - `description` (text): Explicación breve (2–3 líneas)
  - `icon` (string, opcional): Icono de lucide-react (Shield, Activity, Users, FileCheck)

**Ejemplos:**
```json
{
  "title": "Trazabilidad del viaje",
  "description": "Cada trayecto queda registrado con datos de conductor, vehículo, ruta y horarios. En caso de incidente, toda la información está disponible.",
  "icon": "Activity"
}
```

---

## 4. compliancePage (Página de Cumplimiento Normativo)

**Ubicación:** Documento único en Sanity
**Tipo:** `compliancePage`

### Campos:

#### `title` (string, requerido)
- **Qué va aquí:** Título que indique cumplimiento normativo en Chile
- **Extensión:** 6–10 palabras
- **Mensaje clave:** ETAXI cumple marco legal chileno
- **Ejemplo:** "Cumplimiento normativo: taxis regulados bajo ley chilena"

#### `intro` (text, requerido)
- **Qué va aquí:** 1–2 párrafos en lenguaje simple sobre cumplimiento
- **Extensión:** 3–5 líneas
- **Mensaje clave:** Qué significa "cumplir la normativa" sin jerga legal pesada
- **Ejemplo:** "ETAXI opera bajo el marco legal chileno de transporte de pasajeros. Todos los taxis en nuestra plataforma están inscritos según Ley 21.553 y Decreto Supremo 212, garantizando que cada viaje cumple estándares de seguridad y regulación."

#### `lawMention` (text, requerido)
- **Qué va aquí:** Mención explícita y sencilla de Ley 21.553 y D.S. 212
- **Extensión:** 2–3 líneas
- **Mensaje clave:** Explicar en términos simples qué exige la ley
- **Ejemplo:** "La Ley 21.553 y el Decreto Supremo 212 establecen los requisitos para el transporte remunerado de pasajeros en Chile. ETAXI se alinea a esta normativa, asegurando que solo conductores y vehículos autorizados formen parte de la plataforma."

#### `extraNotes` (text, opcional)
- **Qué va aquí:** Cualquier aclaración adicional sobre cumplimiento
- **Extensión:** 1–2 líneas (opcional)
- **Mensaje clave:** Información complementaria sin ser pesado
- **Ejemplo:** "Trabajamos constantemente con autoridades para mantener nuestros estándares actualizados."

#### `regulations` (array, opcional)
- **Qué va aquí:** Lista de regulaciones o compromisos específicos
- **Cada regulación contiene:**
  - `title` (string): Nombre de la regulación (3–6 palabras)
  - `description` (text): Explicación breve (2–3 líneas)
  - `icon` (string, opcional): Icono de lucide-react (Scale, FileCheck, MapPin, IdCard)

**Ejemplos:**
```json
{
  "title": "Ley 21.553 - Taxis regulados",
  "description": "Esta ley regula el transporte remunerado de pasajeros en Chile. ETAXI solo trabaja con taxis que cumplen estos requisitos.",
  "icon": "Scale"
}
```

---

## 5. siteSettings (Configuración General del Sitio)

**Ubicación:** Documento único en Sanity
**Tipo:** `siteSettings`

### Campos:

#### `title` (string, requerido)
- **Qué va aquí:** Título general del sitio para SEO
- **Extensión:** Breve
- **Ejemplo:** "ETAXI - Taxis Regulados en Chile"

#### `description` (text, requerido)
- **Qué va aquí:** Descripción del sitio para meta tags
- **Extensión:** 1–2 frases
- **Ejemplo:** "Plataforma de taxis regulados en Chile. Viajes seguros, trazables y cumpliendo normativa vigente."

#### `primaryCtaLabel` (string, opcional)
- **Qué va aquí:** Texto del botón principal en Hero
- **Ejemplo:** "Pedir Taxi"

#### `secondaryCtaLabel` (string, opcional)
- **Qué va aquí:** Texto del botón secundario en Hero
- **Ejemplo:** "Descargar App"

---

## 6. Páginas sin CMS (por ahora)

Las siguientes páginas usan traducciones de `messages/es.json` y `messages/en.json`:

- **/pedir-taxi** → `requestTaxiPage.*`
- **/contacto** → `contactPage.*`
- **/ayuda** → `helpPage.*`
- **/cumplimiento** (parte de regulaciones) → `compliancePage.*`

Estas pueden integrarse a CMS en futuras fases.

---

## Resumen de prioridad de carga

**Orden recomendado:**

1. ✅ **homePage** (Hero + Benefits + Safety Intro)
2. ✅ **appDownload** (Headline + Subheadline)
3. ✅ **safetyPage** (Title + Intro + Sections)
4. ✅ **compliancePage** (Title + Intro + Law Mention + Regulations)
5. ⏸️ **siteSettings** (Opcional, para SEO futuro)

---

**Última actualización:** 2025-11-15
**Versión:** MVP - Fase 4
**Referencia:** Ver schemas en `sanity/schemas/`
