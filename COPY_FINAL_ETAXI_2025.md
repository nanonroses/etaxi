# AJUSTE FINO DE COPY ETAXI 2025
(versión profesional y final)

---

## 1. HOME (homePage)

### heroTitle (versión final)
"Taxis regulados, viajes seguros"

### heroSubtitle (versión final)
"ETAXI conecta pasajeros con taxis autorizados bajo normativa chilena. Cada viaje es trazable, seguro y transparente."

### benefits (versión final)

1) **title:** "Solo taxis regulados"
   **description:** "Trabajamos exclusivamente con taxis inscritos según la normativa de transporte chilena. Cada conductor y vehículo está autorizado."

2) **title:** "Trazabilidad completa"
   **description:** "Cada viaje queda registrado con datos del conductor, vehículo y ruta. Tu seguridad no depende de la suerte."

3) **title:** "Transparencia total"
   **description:** "Tarifas claras desde el inicio. Sin sorpresas ni cobros ocultos. Todo conforme a regulación."

### safetyIntro (versión final)
"En ETAXI, tu viaje no es un experimento. Cada conductor está autorizado, cada vehículo registrado, y cada trayecto deja una huella trazable para tu tranquilidad."

---

## 2. DESCARGAR APP (appDownload)

### headline
"Descarga ETAXI y pide tu taxi regulado"

### subheadline
"La forma más rápida de solicitar un taxi autorizado en Chile. Descarga la app y viaja con seguridad."

---

## 3. SEGURIDAD (safetyPage)

### title
"Seguridad en cada detalle del viaje"

### intro
"La seguridad no es un eslogan para nosotros. En ETAXI, cada viaje cuenta con múltiples capas de protección: desde conductores autorizados por normativa hasta trazabilidad completa del recorrido. Tu tranquilidad es obligatoria, no opcional."

### sections:

1) **title:** "Conductores autorizados"
   **description:** "Todos los conductores están inscritos bajo la Ley 21.553 y cumplen requisitos de autorización vigentes. No trabajamos con cualquier persona que tenga un auto."

2) **title:** "Trazabilidad del viaje"
   **description:** "Cada trayecto queda registrado con datos completos: conductor, vehículo, ruta, horarios. En caso de incidente, toda la información está disponible para las autoridades."

3) **title:** "Vehículos registrados"
   **description:** "Solo taxis con placas autorizadas y permisos al día forman parte de ETAXI. Cero vehículos informales o sin documentación."

4) **title:** "Soporte al pasajero"
   **description:** "Si tienes algún problema durante o después del viaje, nuestro equipo de soporte está disponible para ayudarte. Tu reporte es tomado en serio."

---

## 4. CUMPLIMIENTO NORMATIVO (compliancePage)

### title
"Cumplimiento normativo: taxis bajo ley chilena"

### intro
"ETAXI opera dentro del marco legal chileno de transporte remunerado de pasajeros. Todos los taxis en nuestra plataforma están inscritos según la Ley 21.553 y el Decreto Supremo 212, que regulan el transporte de personas en Chile. No somos una plataforma abierta a cualquier vehículo: solo taxis autorizados."

### lawMention
"La Ley 21.553 establece los requisitos para el transporte remunerado de pasajeros, y el Decreto Supremo 212 detalla las condiciones técnicas y operativas. ETAXI se alinea a esta normativa, garantizando que cada conductor y vehículo cumple los estándares legales vigentes."

### regulations (array de 4 elementos):

1) **title:** "Ley 21.553 - Transporte regulado"
   **description:** "Esta ley regula el transporte remunerado de pasajeros en Chile, estableciendo requisitos claros para conductores y vehículos. ETAXI opera bajo este marco."
   **icon:** "Scale"

2) **title:** "Decreto Supremo 212"
   **description:** "Define las condiciones técnicas y operativas del servicio de taxi. Solo vehículos que cumplen estos estándares forman parte de ETAXI."
   **icon:** "FileCheck"

3) **title:** "Inscripción municipal"
   **description:** "Cada taxi debe estar inscrito en el municipio correspondiente con permisos al día. Verificamos esta información antes de aceptar un vehículo."
   **icon:** "MapPin"

4) **title:** "Licencias de conductor"
   **description:** "Todos los conductores deben contar con licencia profesional clase A1 y certificados vigentes. Sin excepciones."
   **icon:** "IdCard"

### extraNotes
"Trabajamos en coordinación con las autoridades de transporte para mantener nuestros estándares actualizados conforme evoluciona la normativa."

---

## 5. SITE SETTINGS (siteSettings)

### title
"ETAXI - Taxis Regulados en Chile"

### description
"Plataforma de taxis autorizados bajo normativa chilena. Viajes seguros, trazables y transparentes. Cumplimiento garantizado de Ley 21.553 y D.S. 212."

### primaryCtaLabel
"Pedir Taxi"

### secondaryCtaLabel
"Descargar App"

---

## NOTAS FINALES PARA CARGA EN SANITY

**Importante:**
- Estos textos están listos para copiar directamente en Sanity Studio.
- Respetan extensiones máximas definidas en schemas.
- Mantienen tono profesional sin grandilocuencia.
- Enfatizan: regulación, seguridad, trazabilidad.
- Evitan: promesas exageradas, tecnicismos legales pesados.

**Campos opcionales que pueden quedar vacíos por ahora:**
- `playStoreUrl` y `appStoreUrl` en `appDownload` (hasta que la app esté publicada)
- `qrImage` en `appDownload`
- `safetyIntro` en `homePage` (opcional, pero recomendado incluirlo)
- `extraNotes` en `compliancePage` (opcional, incluido arriba)

**Iconos recomendados:**
- Benefits: `Shield`, `Activity`, `DollarSign`
- Safety sections: `Shield`, `Activity`, `Users`, `FileCheck`
- Compliance regulations: `Scale`, `FileCheck`, `MapPin`, `IdCard`

---

**Versión:** Final - Fase 4
**Fecha:** 2025-11-15
**Aprobado para:** Producción MVP
**Siguiente paso:** Cargar en Sanity Studio y validar en frontend
