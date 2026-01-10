// Blog Data for ETAXI
// Artículos sobre taxis, regulación, seguridad en Chile

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'regulacion' | 'seguridad' | 'tecnologia' | 'noticias' | 'guias';
  image: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  tags: string[];
}

export interface BlogArticleEN extends BlogArticle {}

// Artículos en Español
export const blogArticlesES: BlogArticle[] = [
  {
    slug: 'ley-21553-todo-lo-que-debes-saber',
    title: 'Ley 21.553: Todo lo que debes saber sobre la regulación de apps de transporte en Chile',
    excerpt: 'La Ley Uber ya está en vigencia. Conoce los requisitos para conductores, vehículos y cómo afecta a los taxis básicos en Chile.',
    content: `
## ¿Qué es la Ley 21.553?

La **Ley 21.553**, conocida popularmente como "Ley Uber" o "Ley EAT" (Empresas de Aplicación de Transporte), fue promulgada en enero de 2023 y publicada en el Diario Oficial el 19 de abril de 2023. Su reglamento fue aprobado por la Contraloría General de la República en abril de 2025, marcando un hito en la regulación del transporte de pasajeros en Chile.

## Objetivos principales

Esta legislación busca:

- **Garantizar la seguridad** de los usuarios del transporte por aplicaciones
- **Regular las condiciones laborales** de los conductores
- **Asegurar competencia justa** en el mercado del transporte
- **Formalizar** a conductores y vehículos que operan con apps

## Requisitos para conductores

Los conductores de aplicaciones de transporte deben cumplir:

### Licencia profesional
- Se requiere **licencia clase A2** (profesional)
- Existe un período de gracia de 12 meses desde la entrada en vigencia
- No pueden haber sido condenados por delitos sexuales ni relacionados con drogas

### Certificado de antecedentes
- Debe actualizarse cada **6 meses**
- Debe acreditar ausencia de delitos sexuales, drogas y conducción en estado de ebriedad

## Requisitos para vehículos

Los vehículos deben cumplir con:

- **Revisión técnica cada 6 meses** (el doble de frecuencia que vehículos particulares)
- Exigencias mínimas similares a los **taxis básicos**
- Exhibir un **distintivo obligatorio** visible
- Cumplir con requisitos de seguridad, antigüedad y tecnología

## ¿Cómo afecta a los taxis básicos?

La ley permite que los **taxis básicos se afilien a plataformas** de aplicaciones. Esto significa que:

- Pueden usar el sistema de cobro de la app en vez del taxímetro
- El pasajero debe aceptar esta modalidad
- Solo aplica a taxis básicos, **no a colectivos**
- Pueden inscribirse en una o más apps y trabajar con tarifas diferentes

## Sanciones por incumplimiento

Los conductores que operen sin estar inscritos enfrentan:

- **Suspensión de licencia** por 6 meses
- **Presidio menor** de 61 días a 3 años
- **Multas** de 5 a 50 UTM

## ¿Por qué ETAXI ya cumple con la normativa?

ETAXI trabaja exclusivamente con **taxis regulados** que ya cumplen con:

- Licencia profesional clase A1
- Revisión técnica al día
- Permisos de circulación vigentes
- Registro en el MTT

Esto significa que al usar ETAXI, ya estás viajando con conductores y vehículos que superan los estándares de la Ley 21.553.

## Conclusión

La Ley 21.553 representa un avance importante para la seguridad del transporte de pasajeros en Chile. Al elegir plataformas que trabajan con taxis regulados como ETAXI, los usuarios tienen la garantía de viajar con conductores autorizados, vehículos certificados y total trazabilidad del viaje.
    `,
    category: 'regulacion',
    image: '/images/blog/ley-21553.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-04-15',
    readTime: 8,
    featured: true,
    tags: ['Ley 21.553', 'Regulación', 'Uber', 'Transporte', 'Chile'],
  },
  {
    slug: 'seguridad-pasajeros-taxi-chile-2025',
    title: 'Seguridad de pasajeros en Chile 2025: Por qué elegir taxis regulados',
    excerpt: 'La inseguridad en el transporte ha aumentado. Conoce por qué los taxis regulados con trazabilidad son la opción más segura.',
    content: `
## El contexto de seguridad en Chile

Según datos recientes, el **87.6% de los chilenos** percibe que la delincuencia ha aumentado. Los delitos violentos representan ahora 41 de cada 100 delitos, un incremento significativo respecto a años anteriores.

## Riesgos en el transporte de pasajeros

### Asaltos en transporte público
Los casos de asaltos a conductores y pasajeros de locomoción colectiva han aumentado. En Valparaíso, la PDI detuvo a individuos que simulaban ser pasajeros para luego intimidar con armas de fuego.

### Robos de vehículos
En 2025 se registraron más de **11,500 robos de vehículos** en Chile. Lo más alarmante es que solo el 46% fue recuperado, comparado con el 68.5% en 2016.

### Vulnerabilidad de turistas
Turistas nacionales y extranjeros han reportado un aumento en robos y asaltos, especialmente en zonas turísticas y de tránsito.

## ¿Por qué los taxis regulados son más seguros?

### 1. Identificación del conductor
Cada conductor de taxi regulado está:
- Registrado en el Ministerio de Transportes
- Con antecedentes verificados
- Con fotografía y datos visibles

### 2. Trazabilidad del viaje
- GPS en tiempo real
- Registro de origen y destino
- Hora de inicio y fin del viaje
- Historial accesible

### 3. Vehículo identificable
- Patente registrada
- Color y modelo conocidos
- Revisión técnica vigente
- Distintivos oficiales

### 4. Botón de emergencia
ETAXI incluye un **botón de pánico** que:
- Alerta a la central 24/7
- Comparte ubicación exacta
- Activa protocolo de emergencia

### 5. Grabación anónima
Los viajes cuentan con:
- Grabación de audio como respaldo
- Evidencia en caso de incidentes
- Protección para pasajero y conductor

## Comparativa: Taxi regulado vs. Auto particular

| Característica | Taxi Regulado | Auto No Regulado |
|----------------|---------------|------------------|
| Conductor identificado | ✅ | ❌ |
| Antecedentes verificados | ✅ | Variable |
| GPS con trazabilidad | ✅ | Variable |
| Botón de emergencia | ✅ | ❌ |
| Revisión técnica semestral | ✅ | Anual |
| Seguro de pasajeros | ✅ | Variable |

## Recomendaciones de seguridad

1. **Siempre usa apps de taxis regulados** como ETAXI
2. **Verifica los datos del conductor** antes de subir
3. **Comparte tu viaje** con familiares o amigos
4. **Usa el botón de emergencia** si algo te parece extraño
5. **Califica tus viajes** para mejorar la seguridad de la comunidad

## Conclusión

En un contexto de aumento de la inseguridad, elegir taxis regulados con trazabilidad completa no es solo una preferencia: es una decisión de seguridad. ETAXI garantiza que cada viaje sea rastreable, con conductores verificados y múltiples capas de protección.
    `,
    category: 'seguridad',
    image: '/images/blog/seguridad-pasajeros.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-03-28',
    readTime: 6,
    featured: true,
    tags: ['Seguridad', 'Pasajeros', 'Chile', 'Trazabilidad'],
  },
  {
    slug: 'diferencias-taxi-regulado-uber-didi',
    title: 'Taxi regulado vs Uber, DiDi y Cabify: ¿Cuál es la diferencia real?',
    excerpt: 'Analizamos las diferencias clave entre usar un taxi regulado y las apps de transporte no tradicionales en Chile.',
    content: `
## El mercado del transporte en Chile

Chile cuenta con diversas opciones de transporte por aplicación. Pero no todas son iguales en términos de regulación, seguridad y cumplimiento normativo.

## ¿Qué es un taxi regulado?

Un **taxi básico regulado** es un vehículo que:

- Está inscrito en el **Registro Nacional de Transporte de Pasajeros**
- Tiene permisos del **Ministerio de Transportes**
- Opera con **licencia profesional A1**
- Cumple con **revisión técnica semestral**
- Tiene **seguro de pasajeros** obligatorio
- Usa **taxímetro calibrado** o tarifa oficial

## ¿Qué son las apps de transporte (EAT)?

Las Empresas de Aplicación de Transporte (Uber, DiDi, Cabify, InDrive) son plataformas que:

- Conectan conductores particulares con pasajeros
- Antes de la Ley 21.553, operaban en un vacío legal
- Ahora deben cumplir requisitos similares a los taxis básicos
- Sus conductores necesitan licencia A2 y revisión técnica semestral

## Comparativa detallada

### Regulación y legalidad

| Aspecto | Taxi Regulado | Apps (Post Ley 21.553) |
|---------|---------------|------------------------|
| Inscripción MTT | ✅ Obligatoria | ✅ Obligatoria |
| Licencia profesional | A1 (más exigente) | A2 |
| Años de regulación | Décadas | Desde 2025 |
| Trazabilidad garantizada | ✅ | En implementación |

### Seguridad del pasajero

| Característica | Taxi Regulado ETAXI | Apps tradicionales |
|----------------|---------------------|-------------------|
| Conductor verificado | ✅ Completo | ✅ Variable |
| Antecedentes cada 6 meses | ✅ | ✅ (nuevo requisito) |
| Botón de pánico | ✅ | ✅ |
| Grabación de viaje | ✅ | ❌ generalmente |
| Soporte 24/7 local | ✅ Chile | Variable |

### Tarificación

| Aspecto | Taxi Regulado | Apps |
|---------|---------------|------|
| Tarifa | Oficial/Fija | Dinámica |
| Surge pricing | ❌ No existe | ✅ En horarios peak |
| Transparencia | Alta | Variable |
| Factura formal | ✅ | Variable |

## Ventajas del taxi regulado con ETAXI

### 1. Experiencia comprobada
Los conductores de ETAXI tienen años de experiencia en transporte de pasajeros, no son conductores ocasionales.

### 2. Tarifa predecible
Sin "precios dinámicos" que multiplican el costo en horarios de alta demanda.

### 3. Cumplimiento total
Más de 10 años operando dentro del marco legal chileno.

### 4. Facturación formal
Ideal para empresas que necesitan documentación tributaria.

### 5. Servicio especializado
Viajes al aeropuerto, corporativos y para empresas con necesidades específicas.

## ¿Cuándo elegir cada opción?

### Elige taxi regulado (ETAXI) si:
- Necesitas **factura formal**
- Viajas al **aeropuerto** frecuentemente
- Valoras la **tarifa fija** sin sorpresas
- Requieres **servicio corporativo**
- Priorizas **máxima seguridad** y trazabilidad

### Las apps pueden servir si:
- Buscas la opción más económica (fuera de horarios peak)
- No necesitas factura
- Estás en zonas con poca disponibilidad de taxis

## Conclusión

La Ley 21.553 está nivelando el campo de juego, pero los taxis regulados como los de ETAXI siguen ofreciendo ventajas únicas: experiencia, tarifas predecibles, facturación formal y décadas de cumplimiento normativo.
    `,
    category: 'guias',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-03-15',
    readTime: 7,
    featured: false,
    tags: ['Comparativa', 'Uber', 'DiDi', 'Cabify', 'Taxi Regulado'],
  },
  {
    slug: 'como-pedir-taxi-seguro-aeropuerto-santiago',
    title: 'Cómo pedir un taxi seguro en el Aeropuerto de Santiago (SCL)',
    excerpt: 'Guía completa para viajeros: evita estafas y viaja seguro desde el aeropuerto Arturo Merino Benítez.',
    content: `
## Llegando al Aeropuerto de Santiago

El Aeropuerto Internacional Arturo Merino Benítez (SCL) es la principal puerta de entrada a Chile, con millones de pasajeros anuales. Saber cómo transportarte de forma segura es esencial.

## Opciones de transporte desde el aeropuerto

### 1. Taxis oficiales del aeropuerto
- Ubicados en zonas designadas
- Tarifas fijas por zonas
- Conductores con credencial visible

### 2. ETAXI - Taxis regulados por app
- Reserva desde tu celular
- Tótem digital en el aeropuerto
- Counter de atención presencial
- Tarifa conocida antes del viaje

### 3. Transfer privados
- Servicio puerta a puerta
- Ideal para grupos
- Reserva anticipada requerida

### 4. Apps de transporte (Uber, DiDi, etc.)
- Zona de pickup específica
- Tarifa dinámica variable
- Ahora regulados por Ley 21.553

## Por qué elegir ETAXI en el aeropuerto

### Tótem digital interactivo
En el aeropuerto encontrarás nuestro **tótem 3D** donde puedes:
- Escanear QR para descargar la app
- Ver tarifas por zona
- Solicitar un taxi inmediatamente

### Counter de atención
Personal de ETAXI disponible para:
- Ayudarte a pedir tu taxi
- Resolver dudas
- Asistencia multilingüe (español/inglés)

### Ventajas exclusivas

| Característica | ETAXI Aeropuerto |
|----------------|------------------|
| WiFi en el vehículo | ✅ |
| GPS compartible | ✅ |
| Soporte multilingüe | ✅ |
| Tarifa fija | ✅ |
| Conductor certificado | ✅ |

## Tarifas desde el aeropuerto

Las tarifas de ETAXI desde SCL son **fijas por zona**:

- **Zona Centro/Providencia**: Tarifa oficial fija
- **Las Condes/Vitacura**: Tarifa oficial fija
- **Ñuñoa/La Reina**: Tarifa oficial fija
- **Otras comunas**: Según distancia

*Consulta la tarifa exacta en la app antes de confirmar*

## Consejos de seguridad

### Antes del viaje
1. **Descarga ETAXI** antes de aterrizar (usa WiFi del avión)
2. **Verifica el conductor** asignado
3. **Comparte tu viaje** con alguien de confianza

### Durante el viaje
4. **Confirma la patente** del vehículo
5. **Sigue la ruta** en tu celular
6. **Usa el botón de pánico** si algo no cuadra

### Al llegar
7. **Califica el servicio**
8. **Guarda el recibo** digital
9. **Reporta cualquier incidente**

## Qué evitar

❌ **No aceptes** ofertas de "taxi" de personas en la terminal

❌ **No subas** a vehículos sin identificación visible

❌ **No pagues** más de la tarifa acordada

❌ **No compartas** taxi con desconocidos sin tu consentimiento

## Horarios de alta demanda

- **Mañanas (6-9 AM)**: Vuelos nacionales business
- **Mediodía (12-14 PM)**: Vuelos regionales
- **Noche (20-23 PM)**: Vuelos internacionales

Te recomendamos **reservar con anticipación** en estos horarios.

## Conclusión

Viajar seguro desde el Aeropuerto de Santiago es fácil con ETAXI. Busca nuestro tótem, descarga la app y disfruta de un viaje con tarifa fija, conductor verificado y toda la tranquilidad que mereces después de tu vuelo.
    `,
    category: 'guias',
    image: '/images/blog/aeropuerto-santiago.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-02-20',
    readTime: 5,
    featured: false,
    tags: ['Aeropuerto', 'Santiago', 'Guía', 'Viajeros', 'SCL'],
  },
  {
    slug: 'beneficios-empresas-taxi-regulado',
    title: 'Por qué las empresas chilenas eligen taxis regulados para su transporte corporativo',
    excerpt: 'Facturación formal, trazabilidad y cumplimiento normativo: las razones por las que el taxi regulado es la opción B2B.',
    content: `
## El transporte corporativo en Chile

Las empresas chilenas gastan millones en transporte de ejecutivos, empleados y visitantes. Elegir el servicio correcto impacta en costos, seguridad y cumplimiento tributario.

## Desafíos del transporte corporativo

### 1. Facturación y contabilidad
- Necesidad de **facturas formales** para gastos deducibles
- **Centros de costo** diferenciados
- **Conciliación mensual** de gastos

### 2. Seguridad de empleados
- **Responsabilidad empresarial** por la seguridad
- Viajes nocturnos de ejecutivos
- Transporte de visitantes internacionales

### 3. Cumplimiento normativo
- Auditorías internas y externas
- Trazabilidad de gastos
- Políticas de viajes corporativos

## Solución: Taxis regulados con ETAXI Empresas

### Panel corporativo

Accede a un **dashboard exclusivo** con:

- Vista de todos los viajes en tiempo real
- Asignación por centro de costo
- Límites de gasto por empleado
- Reportes automáticos mensuales

### Facturación consolidada

- **Una sola factura mensual** con todo el detalle
- Desglose por empleado/departamento
- Exportable a sistemas contables
- 100% cumplimiento tributario

### Reportes y analytics

| Reporte | Frecuencia | Contenido |
|---------|------------|-----------|
| Uso mensual | Mensual | Viajes, costos, usuarios |
| Por centro de costo | A pedido | Detalle departamental |
| Comparativo | Trimestral | Tendencias y optimización |
| Auditoría | Anual | Cumplimiento normativo |

## Ventajas vs. reembolso de apps

| Aspecto | ETAXI Empresas | Reembolso Apps |
|---------|----------------|----------------|
| Factura formal | ✅ Automática | ❌ Manual/Difícil |
| Control de gastos | ✅ Tiempo real | ❌ Post-facto |
| Reportes consolidados | ✅ Incluido | ❌ Manualmente |
| Tarifa predecible | ✅ Fija | ❌ Dinámica |
| Auditoría simple | ✅ | ❌ Compleja |

## Casos de uso corporativo

### Ejecutivos en reuniones
- Viajes entre oficinas
- Reuniones con clientes
- Aeropuerto para viajes de negocios

### Empleados en turnos nocturnos
- Salidas después de las 22:00
- Seguridad garantizada
- Registro para RRHH

### Visitantes internacionales
- Servicio bilingüe
- Profesionalismo
- Imagen de la empresa

### Eventos corporativos
- Traslados masivos
- Coordinación centralizada
- Factura única

## Proceso de implementación

### Paso 1: Contacto comercial
Agenda una demo con nuestro equipo B2B.

### Paso 2: Configuración
- Creación de cuenta corporativa
- Definición de centros de costo
- Carga de empleados autorizados

### Paso 3: Capacitación
- Onboarding para RRHH/Finanzas
- Tutorial para empleados
- Soporte dedicado

### Paso 4: Operación
- Dashboard en vivo
- Facturación mensual
- Soporte prioritario

## ROI del taxi regulado corporativo

Las empresas que migran a ETAXI Empresas reportan:

- **30% reducción** en tiempo de gestión de gastos
- **100% cumplimiento** en auditorías
- **15% optimización** en costos de transporte
- **Cero incidentes** de seguridad

## Conclusión

Para empresas que valoran el cumplimiento normativo, la seguridad de sus empleados y la eficiencia operacional, ETAXI Empresas ofrece una solución integral de transporte corporativo con taxis regulados.

**¿Listo para profesionalizar el transporte de tu empresa?** Contacta a nuestro equipo comercial.
    `,
    category: 'noticias',
    image: '/images/blog/empresas-corporativo.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-10',
    readTime: 6,
    featured: false,
    tags: ['Empresas', 'Corporativo', 'B2B', 'Facturación'],
  },
  {
    slug: 'historia-taxis-chile-evolucion',
    title: 'La historia de los taxis en Chile: Del carruaje a la app',
    excerpt: 'Un recorrido por más de 100 años de evolución del taxi en Chile, desde los primeros coches de alquiler hasta la era digital.',
    content: `
## Los orígenes: Coches de alquiler (1900-1930)

Los primeros servicios de transporte pagado en Chile fueron los **coches de alquiler** tirados por caballos. En Santiago, se concentraban en la Plaza de Armas y otros puntos céntricos.

### Características de la época
- Tarifas negociadas
- Sin regulación formal
- Uso exclusivo de clases acomodadas
- Recorridos principalmente urbanos

## La llegada del automóvil (1930-1960)

Con la masificación del automóvil, surgieron los primeros **taxis motorizados**:

- Vehículos importados (Ford, Chevrolet)
- Primeras organizaciones de taxistas
- Inicio de regulación municipal
- Aparición del taxímetro

## Era de la regulación (1960-1990)

El gobierno comenzó a **formalizar el sector**:

### Hitos importantes
- Creación de permisos de circulación específicos
- Establecimiento de tarifas oficiales
- Requisitos de licencia profesional
- Distintivo amarillo obligatorio (en algunas ciudades)

### El rol de los gremios
Los sindicatos y asociaciones de taxistas se consolidaron como actores importantes en la negociación de tarifas y condiciones laborales.

## Modernización (1990-2010)

La apertura económica trajo cambios:

- Liberalización parcial del mercado
- Mejora en la calidad de vehículos
- Primeras centrales telefónicas de radio-taxi
- Competencia entre cooperativas

### Radio-taxi: La primera "app"
Las centrales de radio-taxi fueron precursoras de las apps:
- Llamada telefónica
- Operador humano
- Despacho por radio
- Tiempo de espera ~15 minutos

## La revolución digital (2010-2020)

### Llegada de apps internacionales
- **2014**: Uber llega a Chile
- **2016**: Cabify inicia operaciones
- **2018**: DiDi entra al mercado
- **2019**: InDrive se expande

### Conflicto y vacío legal
- Protestas de taxistas tradicionales
- Debate sobre regulación
- Operación en "zona gris" legal
- Intentos de legislación

## La era de la regulación digital (2020-presente)

### Ley 21.553 (2023)
Finalmente se aprueba la **Ley de Empresas de Aplicación de Transporte**:
- Requisitos para conductores
- Estándares de vehículos
- Registro obligatorio
- Nivelación del campo de juego

### ETAXI: El puente entre dos mundos
ETAXI representa la **evolución natural** del taxi tradicional:
- Conductores profesionales con experiencia
- Tecnología de app moderna
- Cumplimiento normativo total
- Lo mejor de ambos mundos

## Comparativa histórica

| Década | Tecnología | Regulación | Seguridad |
|--------|------------|------------|-----------|
| 1930s | Taxímetro | Básica | Mínima |
| 1970s | Radio | Municipal | Media |
| 1990s | Central telefónica | Nacional | Buena |
| 2010s | Apps | Vacío legal | Variable |
| 2020s | Apps reguladas | Ley 21.553 | Alta |

## El futuro del taxi en Chile

### Tendencias emergentes
- **Vehículos eléctricos**: Menor huella de carbono
- **Inteligencia artificial**: Optimización de rutas
- **Pagos integrados**: Sin efectivo
- **Servicio premium**: Segmentación de mercado

### El rol de ETAXI
Continuaremos liderando la evolución del taxi regulado en Chile, combinando:
- Tradición de servicio profesional
- Innovación tecnológica continua
- Compromiso con la seguridad
- Adaptación a nuevas normativas

## Conclusión

En más de 100 años, el taxi en Chile ha evolucionado enormemente. Hoy, con ETAXI, los pasajeros pueden disfrutar de lo mejor de la tradición del taxi profesional con toda la comodidad de la tecnología moderna, siempre dentro del marco legal chileno.
    `,
    category: 'noticias',
    image: '/images/blog/historia-taxis.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2024-12-05',
    readTime: 8,
    featured: false,
    tags: ['Historia', 'Chile', 'Evolución', 'Transporte'],
  },
];

// Artículos en Inglés
export const blogArticlesEN: BlogArticleEN[] = [
  {
    slug: 'law-21553-everything-you-need-to-know',
    title: 'Law 21.553: Everything you need to know about ride-hailing regulation in Chile',
    excerpt: 'The Uber Law is now in effect. Learn about the requirements for drivers, vehicles, and how it affects basic taxis in Chile.',
    content: `
## What is Law 21.553?

**Law 21.553**, popularly known as the "Uber Law" or "EAT Law" (Transport Application Companies), was enacted in January 2023 and published in the Official Gazette on April 19, 2023. Its regulations were approved by the General Comptroller of the Republic in April 2025, marking a milestone in passenger transport regulation in Chile.

## Main objectives

This legislation seeks to:

- **Guarantee safety** for transport app users
- **Regulate working conditions** for drivers
- **Ensure fair competition** in the transport market
- **Formalize** drivers and vehicles operating with apps

## Requirements for drivers

Transport app drivers must comply with:

### Professional license
- **Class A2 license** required (professional)
- 12-month grace period from the law's entry into force
- Cannot have been convicted of sexual crimes or drug-related offenses

### Background certificate
- Must be updated every **6 months**
- Must prove absence of sexual crimes, drugs, and drunk driving offenses

## Vehicle requirements

Vehicles must comply with:

- **Technical inspection every 6 months** (twice as frequent as private vehicles)
- Minimum requirements similar to **basic taxis**
- Display a visible **mandatory badge**
- Meet safety, age, and technology requirements

## How does it affect basic taxis?

The law allows **basic taxis to join app platforms**. This means:

- They can use the app's charging system instead of the taximeter
- The passenger must accept this method
- Only applies to basic taxis, **not collective taxis**
- They can register with one or more apps and work with different rates

## Penalties for non-compliance

Drivers operating without registration face:

- **License suspension** for 6 months
- **Minor imprisonment** from 61 days to 3 years
- **Fines** from 5 to 50 UTM

## Why does ETAXI already comply with regulations?

ETAXI works exclusively with **regulated taxis** that already comply with:

- Professional class A1 license
- Up-to-date technical inspection
- Valid circulation permits
- MTT registration

This means that when using ETAXI, you're already traveling with drivers and vehicles that exceed Law 21.553 standards.

## Conclusion

Law 21.553 represents an important advance for passenger transport safety in Chile. By choosing platforms that work with regulated taxis like ETAXI, users have the guarantee of traveling with authorized drivers, certified vehicles, and complete trip traceability.
    `,
    category: 'regulacion',
    image: '/images/blog/ley-21553.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-04-15',
    readTime: 8,
    featured: true,
    tags: ['Law 21.553', 'Regulation', 'Uber', 'Transport', 'Chile'],
  },
  {
    slug: 'passenger-safety-chile-2025',
    title: 'Passenger safety in Chile 2025: Why choose regulated taxis',
    excerpt: 'Transport insecurity has increased. Learn why regulated taxis with traceability are the safest option.',
    content: `
## The security context in Chile

According to recent data, **87.6% of Chileans** perceive that crime has increased. Violent crimes now represent 41 out of every 100 crimes, a significant increase compared to previous years.

## Risks in passenger transport

### Assaults on public transport
Cases of assaults on drivers and passengers of public transportation have increased. In Valparaíso, the PDI arrested individuals who pretended to be passengers to then intimidate with firearms.

### Vehicle theft
In 2025, more than **11,500 vehicle thefts** were recorded in Chile. Most alarming is that only 46% were recovered, compared to 68.5% in 2016.

## Why are regulated taxis safer?

### 1. Driver identification
Each regulated taxi driver is:
- Registered with the Ministry of Transport
- Background verified
- With visible photograph and data

### 2. Trip traceability
- Real-time GPS
- Origin and destination record
- Start and end time of trip
- Accessible history

### 3. Identifiable vehicle
- Registered license plate
- Known color and model
- Valid technical inspection
- Official badges

### 4. Emergency button
ETAXI includes a **panic button** that:
- Alerts the 24/7 central
- Shares exact location
- Activates emergency protocol

### 5. Anonymous recording
Trips have:
- Audio recording as backup
- Evidence in case of incidents
- Protection for passenger and driver

## Comparison: Regulated taxi vs. Private car

| Feature | Regulated Taxi | Unregulated Car |
|---------|----------------|-----------------|
| Identified driver | ✅ | ❌ |
| Verified background | ✅ | Variable |
| GPS with traceability | ✅ | Variable |
| Emergency button | ✅ | ❌ |
| Semi-annual technical inspection | ✅ | Annual |
| Passenger insurance | ✅ | Variable |

## Safety recommendations

1. **Always use regulated taxi apps** like ETAXI
2. **Verify driver details** before boarding
3. **Share your trip** with family or friends
4. **Use the emergency button** if something seems off
5. **Rate your trips** to improve community safety

## Conclusion

In a context of increased insecurity, choosing regulated taxis with complete traceability is not just a preference: it's a safety decision. ETAXI guarantees that every trip is traceable, with verified drivers and multiple layers of protection.
    `,
    category: 'seguridad',
    image: '/images/blog/seguridad-pasajeros.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-03-28',
    readTime: 6,
    featured: true,
    tags: ['Safety', 'Passengers', 'Chile', 'Traceability'],
  },
  {
    slug: 'differences-regulated-taxi-uber-didi',
    title: 'Regulated taxi vs Uber, DiDi and Cabify: What is the real difference?',
    excerpt: 'We analyze the key differences between using a regulated taxi and non-traditional transport apps in Chile.',
    content: `
## The transport market in Chile

Chile has various transport app options. But not all are equal in terms of regulation, safety, and regulatory compliance.

## What is a regulated taxi?

A **regulated basic taxi** is a vehicle that:

- Is registered in the **National Passenger Transport Registry**
- Has permits from the **Ministry of Transport**
- Operates with a **professional A1 license**
- Complies with **semi-annual technical inspection**
- Has mandatory **passenger insurance**
- Uses a **calibrated taximeter** or official rate

## What are transport apps (EAT)?

Transport Application Companies (Uber, DiDi, Cabify, InDrive) are platforms that:

- Connect private drivers with passengers
- Before Law 21.553, operated in a legal vacuum
- Now must comply with requirements similar to basic taxis
- Their drivers need A2 license and semi-annual technical inspection

## Advantages of regulated taxi with ETAXI

### 1. Proven experience
ETAXI drivers have years of passenger transport experience, they are not occasional drivers.

### 2. Predictable fare
No "dynamic pricing" that multiplies costs during high demand hours.

### 3. Total compliance
Over 10 years operating within the Chilean legal framework.

### 4. Formal invoicing
Ideal for companies that need tax documentation.

### 5. Specialized service
Airport trips, corporate, and for companies with specific needs.

## Conclusion

Law 21.553 is leveling the playing field, but regulated taxis like those from ETAXI continue to offer unique advantages: experience, predictable fares, formal invoicing, and decades of regulatory compliance.
    `,
    category: 'guias',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-03-15',
    readTime: 7,
    featured: false,
    tags: ['Comparison', 'Uber', 'DiDi', 'Cabify', 'Regulated Taxi'],
  },
  {
    slug: 'how-to-get-safe-taxi-santiago-airport',
    title: 'How to get a safe taxi at Santiago Airport (SCL)',
    excerpt: 'Complete guide for travelers: avoid scams and travel safely from Arturo Merino Benítez airport.',
    content: `
## Arriving at Santiago Airport

Arturo Merino Benítez International Airport (SCL) is Chile's main gateway, with millions of passengers annually. Knowing how to transport yourself safely is essential.

## Transport options from the airport

### 1. Official airport taxis
- Located in designated areas
- Fixed rates by zones
- Drivers with visible credentials

### 2. ETAXI - Regulated taxis by app
- Book from your phone
- Digital totem at the airport
- In-person service counter
- Known fare before the trip

### 3. Private transfers
- Door-to-door service
- Ideal for groups
- Advance booking required

### 4. Transport apps (Uber, DiDi, etc.)
- Specific pickup zone
- Variable dynamic pricing
- Now regulated by Law 21.553

## Why choose ETAXI at the airport

### Interactive digital totem
At the airport you'll find our **3D totem** where you can:
- Scan QR to download the app
- See rates by zone
- Request a taxi immediately

### Service counter
ETAXI staff available to:
- Help you request your taxi
- Answer questions
- Multilingual assistance (Spanish/English)

## Conclusion

Traveling safely from Santiago Airport is easy with ETAXI. Look for our totem, download the app, and enjoy a trip with a fixed fare, verified driver, and all the peace of mind you deserve after your flight.
    `,
    category: 'guias',
    image: '/images/blog/aeropuerto-santiago.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-02-20',
    readTime: 5,
    featured: false,
    tags: ['Airport', 'Santiago', 'Guide', 'Travelers', 'SCL'],
  },
  {
    slug: 'benefits-companies-regulated-taxi',
    title: 'Why Chilean companies choose regulated taxis for corporate transport',
    excerpt: 'Formal invoicing, traceability and regulatory compliance: the reasons why regulated taxi is the B2B option.',
    content: `
## Corporate transport in Chile

Chilean companies spend millions on transporting executives, employees, and visitors. Choosing the right service impacts costs, safety, and tax compliance.

## Corporate transport challenges

### 1. Invoicing and accounting
- Need for **formal invoices** for deductible expenses
- Differentiated **cost centers**
- **Monthly reconciliation** of expenses

### 2. Employee safety
- **Corporate responsibility** for safety
- Executive night trips
- International visitor transport

### 3. Regulatory compliance
- Internal and external audits
- Expense traceability
- Corporate travel policies

## Solution: Regulated taxis with ETAXI Business

### Corporate panel

Access an **exclusive dashboard** with:

- Real-time view of all trips
- Cost center assignment
- Spending limits per employee
- Automatic monthly reports

### Consolidated invoicing

- **Single monthly invoice** with all details
- Breakdown by employee/department
- Exportable to accounting systems
- 100% tax compliance

## ROI of corporate regulated taxi

Companies that migrate to ETAXI Business report:

- **30% reduction** in expense management time
- **100% compliance** in audits
- **15% optimization** in transport costs
- **Zero security incidents**

## Conclusion

For companies that value regulatory compliance, employee safety, and operational efficiency, ETAXI Business offers a comprehensive corporate transport solution with regulated taxis.
    `,
    category: 'noticias',
    image: '/images/blog/empresas-corporativo.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-10',
    readTime: 6,
    featured: false,
    tags: ['Business', 'Corporate', 'B2B', 'Invoicing'],
  },
  {
    slug: 'history-taxis-chile-evolution',
    title: 'The history of taxis in Chile: From carriage to app',
    excerpt: 'A journey through more than 100 years of taxi evolution in Chile, from the first rental cars to the digital era.',
    content: `
## The origins: Rental carriages (1900-1930)

The first paid transport services in Chile were **horse-drawn rental carriages**. In Santiago, they were concentrated in Plaza de Armas and other central points.

## The arrival of the automobile (1930-1960)

With the mass adoption of automobiles, the first **motorized taxis** emerged:

- Imported vehicles (Ford, Chevrolet)
- First taxi driver organizations
- Beginning of municipal regulation
- Appearance of the taximeter

## Era of regulation (1960-1990)

The government began to **formalize the sector**:

### Important milestones
- Creation of specific circulation permits
- Establishment of official rates
- Professional license requirements
- Mandatory yellow badge (in some cities)

## The digital revolution (2010-2020)

### Arrival of international apps
- **2014**: Uber arrives in Chile
- **2016**: Cabify starts operations
- **2018**: DiDi enters the market
- **2019**: InDrive expands

## The era of digital regulation (2020-present)

### Law 21.553 (2023)
Finally, the **Transport Application Companies Law** is approved:
- Driver requirements
- Vehicle standards
- Mandatory registration
- Level playing field

### ETAXI: The bridge between two worlds
ETAXI represents the **natural evolution** of the traditional taxi:
- Professional drivers with experience
- Modern app technology
- Total regulatory compliance
- The best of both worlds

## Conclusion

In over 100 years, the taxi in Chile has evolved enormously. Today, with ETAXI, passengers can enjoy the best of the professional taxi tradition with all the convenience of modern technology, always within the Chilean legal framework.
    `,
    category: 'noticias',
    image: '/images/blog/historia-taxis.jpg',
    author: 'ETAXI Team',
    publishedAt: '2024-12-05',
    readTime: 8,
    featured: false,
    tags: ['History', 'Chile', 'Evolution', 'Transport'],
  },
];

// Helper functions
export function getArticleBySlug(slug: string, locale: string = 'es'): BlogArticle | undefined {
  const articles = locale === 'es' ? blogArticlesES : blogArticlesEN;
  return articles.find(article => article.slug === slug);
}

export function getFeaturedArticles(locale: string = 'es'): BlogArticle[] {
  const articles = locale === 'es' ? blogArticlesES : blogArticlesEN;
  return articles.filter(article => article.featured);
}

export function getArticlesByCategory(category: string, locale: string = 'es'): BlogArticle[] {
  const articles = locale === 'es' ? blogArticlesES : blogArticlesEN;
  return articles.filter(article => article.category === category);
}

export function getAllArticles(locale: string = 'es'): BlogArticle[] {
  return locale === 'es' ? blogArticlesES : blogArticlesEN;
}

export function getRelatedArticles(currentSlug: string, locale: string = 'es', limit: number = 3): BlogArticle[] {
  const articles = locale === 'es' ? blogArticlesES : blogArticlesEN;
  const currentArticle = articles.find(a => a.slug === currentSlug);

  if (!currentArticle) return articles.slice(0, limit);

  // Find articles with matching tags or category
  return articles
    .filter(a => a.slug !== currentSlug)
    .map(article => ({
      article,
      score: article.tags.filter(tag => currentArticle.tags.includes(tag)).length +
             (article.category === currentArticle.category ? 2 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}

// Category labels
export const categoryLabels = {
  es: {
    regulacion: 'Regulación',
    seguridad: 'Seguridad',
    tecnologia: 'Tecnología',
    noticias: 'Noticias',
    guias: 'Guías',
  },
  en: {
    regulacion: 'Regulation',
    seguridad: 'Safety',
    tecnologia: 'Technology',
    noticias: 'News',
    guias: 'Guides',
  },
};
