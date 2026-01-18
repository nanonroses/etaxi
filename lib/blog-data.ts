// Blog Data for ETAXI
// Artículos sobre taxis, regulación, seguridad en Chile

export interface BlogSource {
  title: string;
  url: string;
}

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
  sources?: BlogSource[];
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
    sources: [
      { title: 'Ley Uber en Chile - DEKRA PRT', url: 'https://www.dekraprt.cl/es/ley-uber-en-chile-cuando-entra-en-vigencia-y-que-implica-para-conductores-y-vehiculos/' },
      { title: 'Ley Uber: Reglamento aprobado - Cooperativa.cl', url: 'https://cooperativa.cl/noticias/pais/transportes/al-fin-la-ley-uber-ya-tiene-reglamento-y-podra-entrar-en-vigencia/2025-04-07/180013.html' },
      { title: 'Ley 21.553 - LexLatin', url: 'https://lexlatin.com/noticias/ley-21553-ley-empresas-aplicacion-chile' },
      { title: 'Requisitos Ley Uber - El Mostrador', url: 'https://www.elmostrador.cl/datos-utiles/2025/02/09/requisitos-que-establece-la-ley-uber-para-conductores-y-vehiculos-en-chile/' },
    ],
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
    sources: [
      { title: 'Encuesta Nacional de Seguridad Ciudadana - CIPER Chile', url: 'https://www.ciperchile.cl/2025/05/03/una-semana-poco-santa-el-subreporte-de-delitos/' },
      { title: 'Robos de vehículos en Chile 2025 - Autofact', url: 'https://www.autofact.cl/blog/comprar-auto/seguridad/autos-mas-robados' },
      { title: 'Beat refuerza seguridad ante asaltos - Tecno Pymes', url: 'https://tecnopymes.cl/2021/05/07/beat-refuerza-su-seguridad-ante-robos-y-asaltos-y-anuncia-alianzas-con-prosegur-y-alto/' },
    ],
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
    sources: [
      { title: 'Ley 21.553 - Diario Constitucional', url: 'https://www.diarioconstitucional.cl/resena/ley-n-21-553-regula-a-las-aplicaciones-de-transporte-remunerado-de-pasajeros-y-los-servicios-que-a-traves-de-ellas-se-presten/' },
      { title: 'Ley EAT - Ministerio de Transportes', url: 'https://www.mtt.gob.cl/archivos/33758' },
      { title: 'Regulación apps de transporte - Todo Taxi', url: 'https://todotaxi.org/asi-sera-la-nueva-ley-de-regulacion-en-chile-para-uber-didi-y-cabify/' },
    ],
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
    sources: [
      { title: 'Aeropuerto Arturo Merino Benítez - Nuevo Pudahuel', url: 'https://www.nuevopudahuel.cl/' },
      { title: 'Transporte desde el aeropuerto - Chile Travel', url: 'https://www.chile.travel/' },
    ],
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
    sources: [
      { title: 'Ley 21.553 - Cumplimiento para empresas', url: 'https://lexlatin.com/noticias/ley-21553-ley-empresas-aplicacion-chile' },
      { title: 'Transporte corporativo en Chile - Ministerio de Transportes', url: 'https://www.mtt.gob.cl/' },
    ],
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
    sources: [
      { title: 'Historia del transporte en Chile - Memoria Chilena', url: 'https://www.memoriachilena.gob.cl/' },
      { title: 'Evolución del taxi en Latinoamérica', url: 'https://todotaxi.org/' },
    ],
  },
  {
    slug: 'ley-uber-vigencia-chile-2025',
    title: 'Ley Uber entra en vigencia: Requisitos, costos y multas para conductores en Chile 2025',
    excerpt: 'La Ley 21.553 ya está operativa. Conoce los $300.000 en trámites, licencia A2 obligatoria y multas de hasta $683.060 por incumplimiento.',
    content: `
## La Ley Uber ya es una realidad en Chile

Después de años de debate, la **Ley 21.553** (conocida como "Ley Uber" o "Ley EAT") finalmente entró en vigencia en abril de 2025. Esta normativa regula a las aplicaciones de transporte como **Uber, DiDi, Cabify e InDrive**, estableciendo requisitos obligatorios para conductores y vehículos.

## ¿Cuánto cuesta cumplir con la ley?

El trámite completo para operar legalmente como conductor de aplicación tiene un costo aproximado de **$300.000 pesos chilenos**, que incluye:

| Trámite | Costo aproximado |
|---------|------------------|
| Licencia clase A2 | $45.000 - $80.000 |
| Curso de conducción profesional | $150.000 - $200.000 |
| Certificado de antecedentes | $2.000 |
| Revisión técnica (cada 6 meses) | $15.000 - $20.000 |
| Seguro obligatorio de pasajeros | Variable |

## Requisitos para conductores

### Licencia profesional A2
- Es **obligatoria** para todos los conductores de aplicaciones
- Requiere aprobar un curso de conducción profesional
- Los conductores tienen un período de gracia de 12 meses para obtenerla

### Certificado de antecedentes
- Debe actualizarse cada **6 meses**
- No pueden operar personas con condenas por:
  - Delitos sexuales
  - Delitos relacionados con drogas
  - Conducción en estado de ebriedad con resultado de lesiones o muerte

## Requisitos para vehículos

Los vehículos deben cumplir con:

- **Antigüedad máxima de 12 años** (10 en la Región Metropolitana para nuevas inscripciones)
- **Revisión técnica cada 6 meses** (el doble que vehículos particulares)
- **Distintivo oficial visible** obligatorio
- Cumplimiento de estándares de seguridad y emisiones

## Multas por incumplimiento

Las sanciones por operar sin cumplir la normativa son severas:

| Infracción | Multa |
|------------|-------|
| Operar sin inscripción | Hasta **$683.060** (50 UTM) |
| Vehículo sin distintivo | $68.306 - $341.530 |
| Conductor sin licencia A2 | Suspensión de licencia por 6 meses |
| Reincidencia | Presidio menor (61 días a 3 años) |

## ¿Qué pasa con los taxis básicos?

La ley permite que los **taxis básicos se afilien a plataformas** de aplicaciones:

- Pueden usar el sistema de cobro de la app
- No necesitan cambiar a licencia A2 (ya tienen A1)
- Mantienen la opción del taxímetro tradicional
- Pueden inscribirse en múltiples apps

## ¿Por qué ETAXI ya cumple?

Los conductores de ETAXI trabajan con **taxis regulados** que:

✅ Tienen licencia profesional A1 (más exigente que A2)
✅ Cumplen revisión técnica semestral desde hace años
✅ Están inscritos en el Registro Nacional de Transporte
✅ Tienen seguro de pasajeros vigente

Al usar ETAXI, ya viajas con conductores que **superan los estándares** de la Ley 21.553.

## Conclusión

La entrada en vigencia de la Ley Uber representa un avance importante para la seguridad del transporte en Chile. Los conductores de aplicaciones ahora deben cumplir requisitos similares a los taxis tradicionales, nivelando el campo de juego y protegiendo a los pasajeros.
    `,
    category: 'regulacion',
    image: '/images/blog/ley-21553.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-18',
    readTime: 6,
    featured: true,
    tags: ['Ley Uber', 'Ley 21.553', 'Regulación', 'Chile 2025', 'Multas'],
    sources: [
      { title: 'Trámite de $300 mil para operar como conductor - CNN Chile', url: 'https://www.cnnchile.com/pais/tramite-300-mil-pesos-para-operar-como-conductor-aplicacion-de-transporte-ley-uber_20250409/' },
      { title: 'Nuevos requisitos para choferes con Ley Uber - BioBioChile', url: 'https://www.biobiochile.cl/noticias/servicios/toma-nota/2025/04/10/cuales-son-los-nuevos-requisitos-para-ser-chofer-aplicaciones-de-transportes-con-la-ley-uber.shtml' },
      { title: 'Costo del trámite Ley Uber - T13', url: 'https://www.t13.cl/noticia/nacional/te-puede-servir/cuesta-cerca-300-mil-tramite-ley-uber-sera-obligatorio-para-conductores-11-4-2025' },
    ],
  },
  {
    slug: 'mi-taxi-electrico-programa-gobierno',
    title: 'Mi Taxi Eléctrico: El programa que está revolucionando el transporte sustentable en Chile',
    excerpt: 'El gobierno ofrece hasta $16 millones de cofinanciamiento para que taxistas cambien a vehículos eléctricos. Ya hay 100+ taxis eléctricos operando.',
    content: `
## Chile apuesta por los taxis eléctricos

El programa **"Mi Taxi Eléctrico"** del Ministerio de Energía está transformando el transporte de pasajeros en Chile. Con un ambicioso cofinanciamiento, el gobierno busca que los taxistas tradicionales migren a vehículos de cero emisiones.

## ¿Qué es Mi Taxi Eléctrico?

Es un programa gubernamental que ofrece:

- **Cofinanciamiento de hasta $16 millones** por vehículo eléctrico
- Apoyo técnico para la transición
- Capacitación para conductores
- Acceso a red de carga

## Beneficios para taxistas

### Económicos
| Concepto | Beneficio |
|----------|-----------|
| Cofinanciamiento | Hasta $16.000.000 |
| Ahorro en combustible | ~70% menos que bencina |
| Mantención | 50% más económica |
| Exención de restricción | Pueden circular siempre |

### Operacionales
- **Autonomía de 300-400 km** por carga
- Tiempo de carga completa: 6-8 horas (carga lenta)
- Carga rápida disponible: 30 minutos al 80%
- Menor desgaste de frenos (frenado regenerativo)

## Avances del programa

### 100+ taxis eléctricos ya entregados

El programa ha beneficiado a taxistas en múltiples regiones:

- **Región Metropolitana**: Mayor concentración
- **Biobío**: 21 taxis eléctricos en Los Ángeles, Mulchén, Nacimiento y Lota
- **Antofagasta**: Proyecto piloto minero
- **Atacama**: Expansión reciente

### Testimonios de taxistas

> "El ahorro en combustible es impresionante. Antes gastaba $400.000 mensuales en bencina, ahora gasto menos de $100.000 en electricidad."
> — Taxista participante del programa

## Meta 2035: 100% transporte público cero emisiones

El gobierno de Chile se ha comprometido a que para 2035:

- ✅ Todos los buses nuevos sean eléctricos
- ✅ Taxis y colectivos migren a electromovilidad
- ✅ Red de carga pública expandida nacionalmente
- ✅ Incentivos fiscales para vehículos verdes

## Requisitos para postular

Los taxistas interesados deben:

1. **Tener taxi básico inscrito** en el Registro Nacional
2. **Antigüedad del vehículo actual** mayor a 10 años (preferente)
3. **Estar al día** con permisos y documentación
4. **Comprometerse** a operar por mínimo 3 años con el vehículo eléctrico

## ¿Cómo postular?

1. Visitar [www.mitaxielectrico.cl](https://www.mitaxielectrico.cl/)
2. Completar formulario de postulación
3. Adjuntar documentos requeridos
4. Esperar evaluación y selección
5. Firmar convenio de cofinanciamiento

## Impacto ambiental

Cada taxi eléctrico:
- Evita **3.5 toneladas de CO2** anuales
- Reduce contaminación acústica en un 90%
- No emite material particulado
- Contribuye a ciudades más limpias

## Conclusión

El programa Mi Taxi Eléctrico representa una oportunidad única para que los taxistas chilenos modernicen su flota con apoyo gubernamental significativo. Además de los beneficios económicos, contribuyen a un Chile más sustentable.

ETAXI apoya la electromovilidad y trabaja con conductores comprometidos con el futuro del transporte.
    `,
    category: 'tecnologia',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-17',
    readTime: 5,
    featured: false,
    tags: ['Electromovilidad', 'Taxis Eléctricos', 'Sustentabilidad', 'Chile Verde'],
    sources: [
      { title: 'Programa Mi Taxi Eléctrico - Sitio Oficial', url: 'https://www.mitaxielectrico.cl/' },
      { title: '100 taxis eléctricos revolucionan el transporte - Reporte Diario', url: 'https://reportediario.cl/2025/05/27/100-taxis-electricos-revolucionan-el-transporte-sustentable-en-chile/' },
      { title: '21 taxis eléctricos en Biobío - Hora 12', url: 'https://hora12.cl/2025/07/06/biobio-enciende-la-electromovilidad-21-taxis-electricos-revolucionan-el-transporte-publico-en-los-angeles-mulchen-nacimiento-y-lota/' },
    ],
  },
  {
    slug: 'estafas-turistas-aeropuerto-santiago',
    title: 'Alerta: Estafas millonarias a turistas en el Aeropuerto de Santiago y cómo evitarlas',
    excerpt: 'Bandas criminales cobran hasta $2.5 millones por viajes de $25.000. Conoce las nuevas medidas y cómo protegerte.',
    content: `
## Crisis de taxis piratas en el Aeropuerto de Santiago

El Aeropuerto Internacional Arturo Merino Benítez enfrenta una grave problemática: **bandas organizadas de taxis piratas** que estafan a turistas extranjeros con cobros exorbitantes.

## Casos documentados

### Caso 1: Turistas brasileños - $2.5 millones
En julio de 2025, un grupo de turistas brasileños pagó **$2.5 millones de pesos** por un viaje desde el aeropuerto que normalmente cuesta $25.000. El conductor pirata los llevó por rutas alternativas para justificar el cobro.

### Caso 2: Persecución policial - $2.000 dólares
En abril de 2025, un impactante video mostró la persecución de un taxista pirata que había cobrado **$2.000 dólares** a turistas por un viaje al centro de Santiago.

### Modus operandi de las bandas

1. **Captadores bilingües** abordan turistas en la terminal
2. Ofrecen "taxi seguro" a precio "fijo"
3. No muestran taxímetro ni tarifa oficial
4. Usan rutas largas para confundir
5. Al llegar, exigen montos exorbitantes
6. Intimidan si el pasajero se niega a pagar

## Nuevas medidas de las autoridades

### Taxímetro digital obligatorio
A partir de diciembre 2025, todos los taxis que operen en el aeropuerto deben usar **taxímetro digital certificado** que:
- Muestra tarifa en tiempo real
- Conectado a sistema de fiscalización
- Emite boleta electrónica automática
- Registra GPS del recorrido

### Multas más severas

| Infracción | Multa anterior | Nueva multa |
|------------|----------------|-------------|
| Taxi pirata | $200.000 | **$6.900.000** |
| Cobro excesivo | $100.000 | **$3.450.000** |
| Sin distintivo | $50.000 | **$690.000** |
| Captación ilegal | $100.000 | **$1.380.000** |

## Cómo protegerte

### ✅ Qué HACER

1. **Usa solo taxis oficiales** en zonas designadas
2. **Descarga ETAXI** antes de aterrizar
3. **Busca el tótem de ETAXI** en el aeropuerto
4. **Confirma la tarifa** antes de subir
5. **Toma foto** de la patente y credencial
6. **Comparte tu viaje** con un contacto

### ❌ Qué NO hacer

1. **No aceptes ofertas** de personas en la terminal
2. **No subas** a vehículos sin identificación oficial
3. **No pagues en efectivo** grandes sumas
4. **No te dejes intimidar** si el cobro parece excesivo
5. **No compartas taxi** con desconocidos

## Señales de alerta

🚩 El conductor no tiene credencial visible
🚩 El vehículo no tiene distintivo oficial
🚩 No hay taxímetro o está "averiado"
🚩 Te abordan dentro de la terminal
🚩 Insisten en pago solo en efectivo
🚩 La tarifa "fija" parece muy alta

## Qué hacer si eres víctima

1. **Documenta todo**: fotos, patente, hora
2. **Llama a Carabineros**: 133
3. **Denuncia en PDI**: (2) 2708 1000
4. **Reporta en el aeropuerto**: Oficina de seguridad
5. **Guarda comprobantes**: Para reclamo formal

## Por qué ETAXI es seguro en el aeropuerto

| Característica | ETAXI | Taxi pirata |
|----------------|-------|-------------|
| Conductor identificado | ✅ | ❌ |
| Tarifa conocida antes | ✅ | ❌ |
| GPS rastreable | ✅ | ❌ |
| Botón de pánico | ✅ | ❌ |
| Factura formal | ✅ | ❌ |
| Soporte 24/7 | ✅ | ❌ |

## Conclusión

Las estafas a turistas en el Aeropuerto de Santiago son un problema real y creciente. La mejor protección es usar servicios de taxi regulados como ETAXI, donde la tarifa es transparente, el conductor está identificado y tienes respaldo en caso de cualquier problema.

**Viaja seguro. Viaja con ETAXI.**
    `,
    category: 'seguridad',
    image: '/images/blog/aeropuerto-santiago.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-16',
    readTime: 7,
    featured: true,
    tags: ['Seguridad', 'Aeropuerto', 'Estafas', 'Turistas', 'Taxis Piratas'],
    sources: [
      { title: 'Persecución a taxista que cobró $2.000 dólares - T13', url: 'https://www.t13.cl/noticia/nacional/impactante-video-persecucion-taxista-aeropuerto-cobro-2-mil-dolares-turistas-29-4-2025' },
      { title: 'Taxista ilegal cobró $2.5 millones a brasileños - T13', url: 'https://www.t13.cl/noticia/nacional/taxista-ilegal-cobro-2-5-millones-turistas-brasilenos-desde-aeropuerto-santiago-31-7-2025' },
      { title: 'Nuevo taxímetro digital y multas millonarias - BioBioChile', url: 'https://www.biobiochile.cl/biobiotv/programas/expreso-bio-bio/2025/12/01/golpe-a-los-taxis-piratas-en-el-aeropuerto-de-santiago-nuevo-taximetro-digital-y-millonarias-multas.shtml' },
    ],
  },
  {
    slug: 'aumento-tarifas-taxis-colectivos-2025',
    title: 'Sube el pasaje de taxis colectivos a $1.000: Causas y proyecciones 2025',
    excerpt: 'El alza de combustibles y costos operacionales llevó a los taxis colectivos a subir tarifas en múltiples ciudades de Chile.',
    content: `
## Nueva tarifa de $1.000 en taxis colectivos

Desde marzo de 2025, múltiples ciudades de Chile han visto un **aumento en las tarifas de taxis colectivos**, alcanzando en muchos casos la tarifa única de **$1.000 pesos**.

## ¿Por qué subieron las tarifas?

### 1. Alza sostenida de combustibles

El precio de los combustibles ha experimentado aumentos constantes:

| Período | Precio bencina 93 | Variación |
|---------|-------------------|-----------|
| Enero 2024 | $1.180/litro | - |
| Enero 2025 | $1.350/litro | +14.4% |
| Actual | $1.420/litro | +20.3% |

### 2. Costos operacionales

Los taxistas colectiveros enfrentan múltiples alzas:

- **Lubricantes**: +25% en el último año
- **Neumáticos**: +18% promedio
- **Repuestos**: +22% por tipo de cambio
- **Seguros**: +15% anual
- **Mantención**: +20% en mano de obra

### 3. Inflación general

La inflación acumulada ha impactado todos los costos de operación, desde arriendos de paraderos hasta permisos municipales.

## Ciudades afectadas

### Región de Los Ríos
El Sindicato de Taxis Colectivos de La Unión anunció alza a partir del **17 de marzo de 2025**:
- Tarifa anterior: $800
- **Nueva tarifa: $1.000**
- Primera alza desde agosto 2022

### Región del Maule
San Javier implementó tarifa de $1.000:
- Aplica en horario diurno
- Tarifa nocturna: $1.200
- Recorridos extendidos: tarifa especial

### Otras regiones
- **Concepción**: $900 - $1.000 según recorrido
- **Valparaíso**: $800 - $1.100
- **Antofagasta**: $1.000 - $1.200

## Comparativa con otros medios

| Transporte | Tarifa promedio | Cobertura |
|------------|-----------------|-----------|
| Taxi colectivo | $1.000 | Rutas fijas |
| Micro urbana | $600 - $800 | Red extensa |
| Metro (RM) | $640 - $830 | Líneas específicas |
| Taxi básico | $3.000+ | Puerta a puerta |

## Ventajas del taxi colectivo

A pesar del alza, los taxis colectivos mantienen beneficios:

✅ **Rapidez**: Sin múltiples paradas
✅ **Comodidad**: Asiento asegurado
✅ **Frecuencia**: Salidas constantes
✅ **Seguridad**: Conductor identificado
✅ **Flexibilidad**: Pueden desviarse levemente

## Proyecciones para 2025

Los gremios de taxistas colectiveros proyectan:

- Posible nueva alza en segundo semestre si el petróleo sube
- Presión por subsidios gubernamentales
- Demanda de mejores condiciones laborales
- Modernización de flota con incentivos

## ¿Qué dicen los usuarios?

La reacción de los usuarios ha sido mixta:

> "Entiendo que todo sube, pero afecta el bolsillo de los trabajadores"

> "Prefiero pagar $1.000 en colectivo que $600 en micro llena y lenta"

> "Ojalá mejoren el servicio si van a cobrar más"

## Diferencia entre taxi colectivo y taxi básico

| Característica | Taxi colectivo | Taxi básico (ETAXI) |
|----------------|----------------|---------------------|
| Ruta | Fija | Libre |
| Tarifa | Por persona | Por viaje |
| Pasajeros | Compartido (4) | Individual/grupo |
| Flexibilidad | Baja | Alta |
| Disponibilidad | Horarios fijos | 24/7 por app |

## Conclusión

El aumento de tarifas en taxis colectivos refleja la realidad económica que enfrentan los transportistas. Si bien impacta a los usuarios, los costos operacionales hacen inevitable el ajuste.

Para viajes donde necesitas flexibilidad, privacidad y disponibilidad inmediata, ETAXI ofrece taxis básicos regulados con tarifa transparente y servicio 24/7.
    `,
    category: 'noticias',
    image: '/images/blog/historia-taxis.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-15',
    readTime: 5,
    featured: false,
    tags: ['Tarifas', 'Taxis Colectivos', 'Transporte', 'Economía', 'Chile 2025'],
    sources: [
      { title: 'Sindicato de taxis colectivos anuncia alza - Noticias Los Ríos', url: 'https://www.noticiaslosrios.cl/2025/03/11/sindicato-de-taxis-colectivos-de-la-union-anuncia-alza-de-tarifas-a-partir-del-17-de-marzo/' },
      { title: 'Sube pasaje a tarifa única de $1.000 - El Trabajo', url: 'https://eltrabajo.cl/web/sube-el-pasaje-de-taxis-colectivos-en-tarifa-unica-de-1-000/' },
      { title: 'Tarifas de taxis en Chile - Radio Taxis Chile', url: 'https://radiotaxischile.cl/tarifas/' },
    ],
  },
  {
    slug: 'taxis-vs-apps-nuevo-equilibrio',
    title: 'Taxis vs Apps de transporte: El nuevo equilibrio tras la Ley 21.553',
    excerpt: 'Analizamos cómo la regulación ha nivelado el campo entre taxis tradicionales y aplicaciones como Uber y DiDi.',
    content: `
## Un nuevo escenario para el transporte en Chile

La entrada en vigencia de la **Ley 21.553** ha creado un nuevo equilibrio entre taxis tradicionales y aplicaciones de transporte. Por primera vez, ambos deben cumplir requisitos similares.

## Lo que cambió con la Ley 21.553

### Para aplicaciones (Uber, DiDi, Cabify, InDrive)

| Antes | Después |
|-------|---------|
| Sin regulación formal | Registro obligatorio |
| Licencia clase B | Licencia A2 profesional |
| Revisión técnica anual | Cada 6 meses |
| Sin distintivo | Distintivo obligatorio |
| Sin control de antecedentes | Control cada 6 meses |

### Para taxis básicos

| Antes | Después |
|-------|---------|
| Solo taxímetro | Pueden usar apps |
| Trabajo independiente | Pueden afiliarse a plataformas |
| Tarifa oficial fija | Tarifa de app opcional |
| Solo una modalidad | Flexibilidad de operación |

## Comparativa de requisitos actuales

| Requisito | Taxis básicos | Apps de transporte |
|-----------|---------------|-------------------|
| Licencia | A1 (más exigente) | A2 |
| Revisión técnica | Cada 6 meses | Cada 6 meses |
| Antigüedad vehículo | 12 años máx | 12 años máx |
| Seguro pasajeros | Obligatorio | Obligatorio |
| Registro MTT | Sí | Sí |
| Antecedentes | Cada 6 meses | Cada 6 meses |

## Comparativa de seguridad

### Taxis regulados (ETAXI)
✅ Décadas de experiencia regulada
✅ Conductores profesionales de carrera
✅ Historial de cumplimiento verificable
✅ Trazabilidad completa
✅ Botón de pánico integrado
✅ Grabación de respaldo

### Apps de transporte
⚠️ Regulación reciente (2025)
⚠️ Conductores ocasionales posibles
⚠️ Período de adaptación en curso
✅ GPS en tiempo real
✅ Calificaciones de usuarios
✅ Soporte en app

## Comparativa de precios

| Escenario | Taxi regulado | Apps |
|-----------|---------------|------|
| Horario normal | Tarifa fija | Base + km |
| Horario peak | **Sin cambio** | +50% a +200% |
| Lluvia/eventos | **Sin cambio** | Surge pricing |
| Aeropuerto | Tarifa por zona | Variable |
| Factura formal | **Siempre** | A veces |

## ¿Cuándo elegir cada opción?

### Elige taxi regulado (ETAXI) si:

1. **Necesitas factura** para tu empresa
2. Viajas al **aeropuerto** y quieres tarifa fija
3. Es **hora peak** y no quieres pagar de más
4. Valoras la **experiencia profesional** del conductor
5. Requieres **servicio corporativo** recurrente
6. Priorizas **máxima seguridad** verificada

### Considera apps si:

1. Es horario de baja demanda
2. Estás en zona con poca cobertura de taxis
3. Ya tienes la app instalada y créditos
4. No necesitas factura formal

## La integración: Taxis en apps

Una novedad interesante es que los **taxis básicos pueden afiliarse a apps**:

- Usan el sistema de cobro de la aplicación
- El pasajero debe aceptar la modalidad
- Pueden mantener el taxímetro como alternativa
- Operan en múltiples plataformas simultáneamente

## Restricciones para conductores de apps

La ley establece limitaciones importantes:

- Solo pueden operar en la **región donde están inscritos**
- No pueden operar en comunas diferentes sin autorización
- Deben respetar el tipo de servicio inscrito
- Penalizaciones por operar fuera de zona

## El futuro del transporte en Chile

### Tendencias que veremos:

1. **Mayor profesionalización** de conductores de apps
2. **Integración** entre taxis y plataformas
3. **Electromovilidad** en ambos segmentos
4. **Mejora en seguridad** generalizada
5. **Competencia por servicio**, no solo precio

## Conclusión

La Ley 21.553 ha creado un campo de juego más equilibrado. Los usuarios ahora pueden elegir basándose en preferencias de servicio más que en diferencias regulatorias.

Los **taxis regulados** mantienen ventajas clave: experiencia, tarifas predecibles, facturación formal y décadas de cumplimiento. Con ETAXI, accedes a lo mejor del taxi tradicional con la comodidad de la tecnología moderna.
    `,
    category: 'guias',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'Equipo ETAXI',
    publishedAt: '2025-01-14',
    readTime: 8,
    featured: false,
    tags: ['Comparativa', 'Regulación', 'Uber', 'DiDi', 'Taxis', 'Ley 21.553'],
    sources: [
      { title: 'Taxis vs Apps: ¿Cuál es más barato y seguro? - Infobae', url: 'https://www.infobae.com/economia/2025/03/07/taxis-vs-apps-de-movilidad-cual-es-el-servicio-mas-barato-y-seguro-para-moverse-por-la-ciudad/' },
      { title: 'Chile regula apps con Ley Uber - Redimin', url: 'https://www.redimin.cl/chile-regula-apps-de-transporte-con-la-ley-uber-impacto-inminente-en-taxistas-y-empresas-digitales/' },
      { title: 'Multas Uber en Chile - Autofact', url: 'https://www.autofact.cl/blog/mi-auto/infracciones/multa-uber-chile' },
    ],
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
    sources: [
      { title: 'Uber Law in Chile - DEKRA PRT', url: 'https://www.dekraprt.cl/es/ley-uber-en-chile-cuando-entra-en-vigencia-y-que-implica-para-conductores-y-vehiculos/' },
      { title: 'Uber Law: Regulation approved - Cooperativa.cl', url: 'https://cooperativa.cl/noticias/pais/transportes/al-fin-la-ley-uber-ya-tiene-reglamento-y-podra-entrar-en-vigencia/2025-04-07/180013.html' },
      { title: 'Law 21.553 - LexLatin', url: 'https://lexlatin.com/noticias/ley-21553-ley-empresas-aplicacion-chile' },
      { title: 'Uber Law Requirements - El Mostrador', url: 'https://www.elmostrador.cl/datos-utiles/2025/02/09/requisitos-que-establece-la-ley-uber-para-conductores-y-vehiculos-en-chile/' },
    ],
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
    sources: [
      { title: 'Crime and Insecurity in Chile 2025 - CEAD', url: 'https://cead.spd.gov.cl/estadisticas-delictuales/' },
      { title: 'National Urban Safety Survey - INE Chile', url: 'https://www.ine.gob.cl/estadisticas/sociales/seguridad-publica-y-justicia' },
      { title: 'Transport Safety Requirements - MTT', url: 'https://www.mtt.gob.cl/transporte-publico' },
    ],
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
    sources: [
      { title: 'Transport App Companies Law - Chilean Government', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1193003' },
      { title: 'How does the Uber law affect basic taxis? - La Tercera', url: 'https://www.latercera.com/pulso-pm/noticia/como-afecta-la-ley-uber-a-los-taxis-basicos/' },
      { title: 'Regulated taxi vs EAT comparison - Ministry of Transport', url: 'https://www.mtt.gob.cl/transporte-publico' },
    ],
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
    sources: [
      { title: 'Santiago Airport Official Transport - SCL', url: 'https://www.nuevopudahuel.cl/pasajeros/transporte/' },
      { title: 'Transport Options at SCL - Nuevo Pudahuel', url: 'https://www.nuevopudahuel.cl/' },
    ],
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
    sources: [
      { title: 'Corporate Transport Regulation - SII Chile', url: 'https://www.sii.cl/' },
      { title: 'Passenger Transport Requirements - MTT', url: 'https://www.mtt.gob.cl/transporte-publico' },
    ],
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
    sources: [
      { title: 'History of Public Transport in Chile - Memory of Chile', url: 'https://www.memoriachilena.gob.cl/602/w3-article-3502.html' },
      { title: 'Taxi Evolution in Latin America - CEPAL', url: 'https://www.cepal.org/es/publicaciones' },
      { title: 'Urban Transport History Santiago - Museo Histórico Nacional', url: 'https://www.museohistoriconacional.gob.cl/' },
    ],
  },
  {
    slug: 'uber-law-chile-2025',
    title: 'Uber Law Takes Effect: Requirements, Costs and Fines for Drivers in Chile 2025',
    excerpt: 'Law 21.553 is now operational. Learn about the $300,000 CLP in procedures, mandatory A2 license, and fines up to $683,060 for non-compliance.',
    content: `
## The Uber Law is Now a Reality in Chile

After years of debate, **Law 21.553** (known as the "Uber Law" or "EAT Law") finally came into effect in April 2025. This regulation governs transport applications like **Uber, DiDi, Cabify, and InDrive**, establishing mandatory requirements for drivers and vehicles.

## How Much Does Compliance Cost?

The complete process to operate legally as an app driver costs approximately **$300,000 Chilean pesos**, which includes:

| Procedure | Approximate Cost |
|-----------|------------------|
| Class A2 license | $45,000 - $80,000 |
| Professional driving course | $150,000 - $200,000 |
| Background certificate | $2,000 |
| Technical inspection (every 6 months) | $15,000 - $20,000 |
| Mandatory passenger insurance | Variable |

## Requirements for Drivers

### Professional A2 License
- **Mandatory** for all app drivers
- Requires passing a professional driving course
- Drivers have a 12-month grace period to obtain it

### Background Certificate
- Must be updated every **6 months**
- Cannot operate with convictions for:
  - Sexual crimes
  - Drug-related offenses
  - Drunk driving resulting in injuries or death

## Vehicle Requirements

Vehicles must comply with:

- **Maximum age of 12 years** (10 in the Metropolitan Region for new registrations)
- **Technical inspection every 6 months** (twice as often as private vehicles)
- **Visible official badge** mandatory
- Compliance with safety and emissions standards

## Fines for Non-Compliance

Penalties for operating without meeting regulations are severe:

| Infraction | Fine |
|------------|------|
| Operating without registration | Up to **$683,060** (50 UTM) |
| Vehicle without badge | $68,306 - $341,530 |
| Driver without A2 license | 6-month license suspension |
| Repeat offense | Minor imprisonment (61 days to 3 years) |

## What About Basic Taxis?

The law allows **basic taxis to join app platforms**:

- They can use the app's payment system
- They don't need to change to A2 license (they already have A1)
- They keep the option of traditional taximeter
- They can register with multiple apps

## Why Does ETAXI Already Comply?

ETAXI drivers work with **regulated taxis** that:

✅ Have professional A1 license (more demanding than A2)
✅ Have been complying with semi-annual technical inspection for years
✅ Are registered in the National Transport Registry
✅ Have valid passenger insurance

By using ETAXI, you're already traveling with drivers who **exceed Law 21.553 standards**.

## Conclusion

The Uber Law coming into effect represents an important advance for transport safety in Chile. App drivers must now meet requirements similar to traditional taxis, leveling the playing field and protecting passengers.
    `,
    category: 'regulacion',
    image: '/images/blog/ley-21553.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-18',
    readTime: 6,
    featured: true,
    tags: ['Uber Law', 'Law 21.553', 'Regulation', 'Chile 2025', 'Fines'],
    sources: [
      { title: '$300k procedure to operate as a driver - CNN Chile', url: 'https://www.cnnchile.com/pais/tramite-300-mil-pesos-para-operar-como-conductor-aplicacion-de-transporte-ley-uber_20250409/' },
      { title: 'New requirements for drivers with Uber Law - BioBioChile', url: 'https://www.biobiochile.cl/noticias/servicios/toma-nota/2025/04/10/cuales-son-los-nuevos-requisitos-para-ser-chofer-aplicaciones-de-transportes-con-la-ley-uber.shtml' },
      { title: 'Uber Law procedure cost - T13', url: 'https://www.t13.cl/noticia/nacional/te-puede-servir/cuesta-cerca-300-mil-tramite-ley-uber-sera-obligatorio-para-conductores-11-4-2025' },
    ],
  },
  {
    slug: 'electric-taxi-program-government',
    title: 'My Electric Taxi: The Program Revolutionizing Sustainable Transport in Chile',
    excerpt: 'The government offers up to $16 million in co-financing for taxi drivers to switch to electric vehicles. Already 100+ electric taxis operating.',
    content: `
## Chile Bets on Electric Taxis

The **"Mi Taxi Eléctrico"** (My Electric Taxi) program from the Ministry of Energy is transforming passenger transport in Chile. With ambitious co-financing, the government aims to help traditional taxi drivers migrate to zero-emission vehicles.

## What is Mi Taxi Eléctrico?

It's a government program that offers:

- **Co-financing of up to $16 million CLP** per electric vehicle
- Technical support for the transition
- Driver training
- Access to charging network

## Benefits for Taxi Drivers

### Economic
| Concept | Benefit |
|---------|---------|
| Co-financing | Up to $16,000,000 CLP |
| Fuel savings | ~70% less than gasoline |
| Maintenance | 50% cheaper |
| Restriction exemption | Can circulate always |

### Operational
- **Range of 300-400 km** per charge
- Full charge time: 6-8 hours (slow charge)
- Fast charge available: 30 minutes to 80%
- Less brake wear (regenerative braking)

## Program Progress

### 100+ Electric Taxis Already Delivered

The program has benefited taxi drivers in multiple regions:

- **Metropolitan Region**: Highest concentration
- **Biobío**: 21 electric taxis in Los Ángeles, Mulchén, Nacimiento, and Lota
- **Antofagasta**: Mining pilot project
- **Atacama**: Recent expansion

### Taxi Driver Testimonials

> "The fuel savings are impressive. I used to spend $400,000 monthly on gasoline, now I spend less than $100,000 on electricity."
> — Program participant taxi driver

## 2035 Goal: 100% Zero-Emission Public Transport

The Chilean government has committed that by 2035:

- ✅ All new buses will be electric
- ✅ Taxis and collective taxis migrate to electromobility
- ✅ Public charging network expanded nationally
- ✅ Tax incentives for green vehicles

## Requirements to Apply

Interested taxi drivers must:

1. **Have a registered basic taxi** in the National Registry
2. **Current vehicle age** greater than 10 years (preferred)
3. **Be up to date** with permits and documentation
4. **Commit** to operate for minimum 3 years with the electric vehicle

## How to Apply?

1. Visit [www.mitaxielectrico.cl](https://www.mitaxielectrico.cl/)
2. Complete application form
3. Attach required documents
4. Wait for evaluation and selection
5. Sign co-financing agreement

## Environmental Impact

Each electric taxi:
- Avoids **3.5 tons of CO2** annually
- Reduces noise pollution by 90%
- Emits no particulate matter
- Contributes to cleaner cities

## Conclusion

The Mi Taxi Eléctrico program represents a unique opportunity for Chilean taxi drivers to modernize their fleet with significant government support. In addition to economic benefits, they contribute to a more sustainable Chile.

ETAXI supports electromobility and works with drivers committed to the future of transport.
    `,
    category: 'tecnologia',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-17',
    readTime: 5,
    featured: false,
    tags: ['Electromobility', 'Electric Taxis', 'Sustainability', 'Green Chile'],
    sources: [
      { title: 'Mi Taxi Eléctrico Program - Official Site', url: 'https://www.mitaxielectrico.cl/' },
      { title: '100 electric taxis revolutionize transport - Reporte Diario', url: 'https://reportediario.cl/2025/05/27/100-taxis-electricos-revolucionan-el-transporte-sustentable-en-chile/' },
      { title: '21 electric taxis in Biobío - Hora 12', url: 'https://hora12.cl/2025/07/06/biobio-enciende-la-electromovilidad-21-taxis-electricos-revolucionan-el-transporte-publico-en-los-angeles-mulchen-nacimiento-y-lota/' },
    ],
  },
  {
    slug: 'tourist-scams-santiago-airport',
    title: 'Alert: Million-Peso Scams Against Tourists at Santiago Airport and How to Avoid Them',
    excerpt: 'Criminal gangs charge up to $2.5 million for $25,000 trips. Learn about new measures and how to protect yourself.',
    content: `
## Pirate Taxi Crisis at Santiago Airport

Arturo Merino Benítez International Airport faces a serious problem: **organized pirate taxi gangs** that scam foreign tourists with exorbitant charges.

## Documented Cases

### Case 1: Brazilian Tourists - $2.5 Million CLP
In July 2025, a group of Brazilian tourists paid **$2.5 million pesos** for a trip from the airport that normally costs $25,000. The pirate driver took them on alternative routes to justify the charge.

### Case 2: Police Chase - $2,000 USD
In April 2025, a shocking video showed the chase of a pirate taxi driver who had charged **$2,000 dollars** to tourists for a trip to downtown Santiago.

### Gang Modus Operandi

1. **Bilingual recruiters** approach tourists in the terminal
2. Offer "safe taxi" at a "fixed" price
3. Don't show taximeter or official rate
4. Use long routes to confuse
5. Upon arrival, demand exorbitant amounts
6. Intimidate if passenger refuses to pay

## New Authority Measures

### Mandatory Digital Taximeter
Starting December 2025, all taxis operating at the airport must use a **certified digital taximeter** that:
- Shows fare in real-time
- Connected to oversight system
- Issues automatic electronic receipt
- Records GPS route

### More Severe Fines

| Infraction | Previous Fine | New Fine |
|------------|---------------|----------|
| Pirate taxi | $200,000 | **$6,900,000** |
| Excessive charge | $100,000 | **$3,450,000** |
| No badge | $50,000 | **$690,000** |
| Illegal solicitation | $100,000 | **$1,380,000** |

## How to Protect Yourself

### ✅ What TO DO

1. **Use only official taxis** in designated areas
2. **Download ETAXI** before landing
3. **Look for the ETAXI totem** at the airport
4. **Confirm the fare** before getting in
5. **Take a photo** of the license plate and credential
6. **Share your trip** with a contact

### ❌ What NOT to Do

1. **Don't accept offers** from people in the terminal
2. **Don't get in** vehicles without official identification
3. **Don't pay large sums** in cash
4. **Don't be intimidated** if the charge seems excessive
5. **Don't share a taxi** with strangers

## Warning Signs

🚩 Driver has no visible credential
🚩 Vehicle has no official badge
🚩 No taximeter or it's "broken"
🚩 They approach you inside the terminal
🚩 They insist on cash-only payment
🚩 The "fixed" fare seems very high

## What to Do If You're a Victim

1. **Document everything**: photos, license plate, time
2. **Call Carabineros**: 133
3. **Report to PDI**: (2) 2708 1000
4. **Report at the airport**: Security office
5. **Keep receipts**: For formal complaint

## Why ETAXI is Safe at the Airport

| Feature | ETAXI | Pirate Taxi |
|---------|-------|-------------|
| Identified driver | ✅ | ❌ |
| Known fare beforehand | ✅ | ❌ |
| Trackable GPS | ✅ | ❌ |
| Panic button | ✅ | ❌ |
| Formal invoice | ✅ | ❌ |
| 24/7 Support | ✅ | ❌ |

## Conclusion

Tourist scams at Santiago Airport are a real and growing problem. The best protection is to use regulated taxi services like ETAXI, where the fare is transparent, the driver is identified, and you have support in case of any problem.

**Travel safe. Travel with ETAXI.**
    `,
    category: 'seguridad',
    image: '/images/blog/aeropuerto-santiago.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-16',
    readTime: 7,
    featured: true,
    tags: ['Safety', 'Airport', 'Scams', 'Tourists', 'Pirate Taxis'],
    sources: [
      { title: 'Chase of taxi driver who charged $2,000 dollars - T13', url: 'https://www.t13.cl/noticia/nacional/impactante-video-persecucion-taxista-aeropuerto-cobro-2-mil-dolares-turistas-29-4-2025' },
      { title: 'Illegal taxi driver charged $2.5 million to Brazilians - T13', url: 'https://www.t13.cl/noticia/nacional/taxista-ilegal-cobro-2-5-millones-turistas-brasilenos-desde-aeropuerto-santiago-31-7-2025' },
      { title: 'New digital taximeter and million-peso fines - BioBioChile', url: 'https://www.biobiochile.cl/biobiotv/programas/expreso-bio-bio/2025/12/01/golpe-a-los-taxis-piratas-en-el-aeropuerto-de-santiago-nuevo-taximetro-digital-y-millonarias-multas.shtml' },
    ],
  },
  {
    slug: 'taxi-fare-increase-2025',
    title: 'Collective Taxi Fare Rises to $1,000: Causes and 2025 Projections',
    excerpt: 'Rising fuel costs and operational expenses led collective taxis to raise fares in multiple Chilean cities.',
    content: `
## New $1,000 Fare for Collective Taxis

Since March 2025, multiple cities in Chile have seen an **increase in collective taxi fares**, reaching in many cases the flat fare of **$1,000 pesos**.

## Why Did Fares Increase?

### 1. Sustained Fuel Price Increases

Fuel prices have experienced constant increases:

| Period | Gasoline 93 Price | Variation |
|--------|-------------------|-----------|
| January 2024 | $1,180/liter | - |
| January 2025 | $1,350/liter | +14.4% |
| Current | $1,420/liter | +20.3% |

### 2. Operational Costs

Collective taxi drivers face multiple increases:

- **Lubricants**: +25% in the last year
- **Tires**: +18% average
- **Spare parts**: +22% due to exchange rate
- **Insurance**: +15% annually
- **Maintenance**: +20% in labor

### 3. General Inflation

Accumulated inflation has impacted all operational costs, from terminal rentals to municipal permits.

## Affected Cities

### Los Ríos Region
The Collective Taxi Union of La Unión announced an increase starting **March 17, 2025**:
- Previous fare: $800
- **New fare: $1,000**
- First increase since August 2022

### Maule Region
San Javier implemented $1,000 fare:
- Applies during daytime hours
- Nighttime fare: $1,200
- Extended routes: special fare

### Other Regions
- **Concepción**: $900 - $1,000 depending on route
- **Valparaíso**: $800 - $1,100
- **Antofagasta**: $1,000 - $1,200

## Comparison with Other Transportation

| Transport | Average Fare | Coverage |
|-----------|--------------|----------|
| Collective taxi | $1,000 | Fixed routes |
| Urban bus | $600 - $800 | Extensive network |
| Metro (RM) | $640 - $830 | Specific lines |
| Basic taxi | $3,000+ | Door to door |

## Advantages of Collective Taxis

Despite the increase, collective taxis maintain benefits:

✅ **Speed**: No multiple stops
✅ **Comfort**: Guaranteed seat
✅ **Frequency**: Constant departures
✅ **Safety**: Identified driver
✅ **Flexibility**: Can deviate slightly

## 2025 Projections

Collective taxi driver unions project:

- Possible new increase in second semester if oil prices rise
- Pressure for government subsidies
- Demand for better working conditions
- Fleet modernization with incentives

## What Do Users Say?

User reaction has been mixed:

> "I understand everything goes up, but it affects workers' pockets"

> "I'd rather pay $1,000 in a colectivo than $600 on a crowded, slow bus"

> "Hopefully they improve service if they're going to charge more"

## Difference Between Collective Taxi and Basic Taxi

| Feature | Collective Taxi | Basic Taxi (ETAXI) |
|---------|-----------------|-------------------|
| Route | Fixed | Free |
| Fare | Per person | Per trip |
| Passengers | Shared (4) | Individual/group |
| Flexibility | Low | High |
| Availability | Fixed hours | 24/7 by app |

## Conclusion

The fare increase in collective taxis reflects the economic reality facing transporters. While it impacts users, operational costs make the adjustment inevitable.

For trips where you need flexibility, privacy, and immediate availability, ETAXI offers regulated basic taxis with transparent fares and 24/7 service.
    `,
    category: 'noticias',
    image: '/images/blog/historia-taxis.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-15',
    readTime: 5,
    featured: false,
    tags: ['Fares', 'Collective Taxis', 'Transport', 'Economy', 'Chile 2025'],
    sources: [
      { title: 'Collective taxi union announces increase - Noticias Los Ríos', url: 'https://www.noticiaslosrios.cl/2025/03/11/sindicato-de-taxis-colectivos-de-la-union-anuncia-alza-de-tarifas-a-partir-del-17-de-marzo/' },
      { title: 'Fare rises to flat rate of $1,000 - El Trabajo', url: 'https://eltrabajo.cl/web/sube-el-pasaje-de-taxis-colectivos-en-tarifa-unica-de-1-000/' },
      { title: 'Taxi fares in Chile - Radio Taxis Chile', url: 'https://radiotaxischile.cl/tarifas/' },
    ],
  },
  {
    slug: 'taxis-vs-apps-new-balance',
    title: 'Taxis vs Transport Apps: The New Balance After Law 21.553',
    excerpt: 'We analyze how regulation has leveled the field between traditional taxis and apps like Uber and DiDi.',
    content: `
## A New Scenario for Transport in Chile

The implementation of **Law 21.553** has created a new balance between traditional taxis and transport applications. For the first time, both must meet similar requirements.

## What Changed with Law 21.553

### For Apps (Uber, DiDi, Cabify, InDrive)

| Before | After |
|--------|-------|
| No formal regulation | Mandatory registration |
| Class B license | Professional A2 license |
| Annual technical inspection | Every 6 months |
| No badge | Mandatory badge |
| No background checks | Checks every 6 months |

### For Basic Taxis

| Before | After |
|--------|-------|
| Taximeter only | Can use apps |
| Independent work | Can join platforms |
| Official fixed fare | Optional app fare |
| Single mode only | Operational flexibility |

## Current Requirements Comparison

| Requirement | Basic Taxis | Transport Apps |
|-------------|-------------|----------------|
| License | A1 (more demanding) | A2 |
| Technical inspection | Every 6 months | Every 6 months |
| Vehicle age | Max 12 years | Max 12 years |
| Passenger insurance | Mandatory | Mandatory |
| MTT Registration | Yes | Yes |
| Background checks | Every 6 months | Every 6 months |

## Safety Comparison

### Regulated Taxis (ETAXI)
✅ Decades of regulated experience
✅ Career professional drivers
✅ Verifiable compliance history
✅ Complete traceability
✅ Integrated panic button
✅ Backup recording

### Transport Apps
⚠️ Recent regulation (2025)
⚠️ Possible occasional drivers
⚠️ Adaptation period in progress
✅ Real-time GPS
✅ User ratings
✅ In-app support

## Price Comparison

| Scenario | Regulated Taxi | Apps |
|----------|----------------|------|
| Normal hours | Fixed fare | Base + km |
| Peak hours | **No change** | +50% to +200% |
| Rain/events | **No change** | Surge pricing |
| Airport | Zone fare | Variable |
| Formal invoice | **Always** | Sometimes |

## When to Choose Each Option?

### Choose Regulated Taxi (ETAXI) if:

1. You **need an invoice** for your company
2. You're traveling to the **airport** and want a fixed fare
3. It's **peak hour** and you don't want to pay extra
4. You value the driver's **professional experience**
5. You require recurring **corporate service**
6. You prioritize **maximum verified security**

### Consider Apps if:

1. It's low-demand hours
2. You're in an area with low taxi coverage
3. You already have the app installed and credits
4. You don't need a formal invoice

## The Integration: Taxis in Apps

An interesting development is that **basic taxis can join apps**:

- They use the application's payment system
- The passenger must accept the mode
- They can keep the taximeter as an alternative
- They operate on multiple platforms simultaneously

## Restrictions for App Drivers

The law establishes important limitations:

- Can only operate in the **region where they're registered**
- Cannot operate in different communes without authorization
- Must respect the type of service registered
- Penalties for operating outside the zone

## The Future of Transport in Chile

### Trends We'll See:

1. **Greater professionalization** of app drivers
2. **Integration** between taxis and platforms
3. **Electromobility** in both segments
4. **Improved safety** overall
5. **Competition for service**, not just price

## Conclusion

Law 21.553 has created a more level playing field. Users can now choose based on service preferences rather than regulatory differences.

**Regulated taxis** maintain key advantages: experience, predictable fares, formal invoicing, and decades of compliance. With ETAXI, you access the best of traditional taxi service with the convenience of modern technology.
    `,
    category: 'guias',
    image: '/images/blog/taxi-vs-apps.jpg',
    author: 'ETAXI Team',
    publishedAt: '2025-01-14',
    readTime: 8,
    featured: false,
    tags: ['Comparison', 'Regulation', 'Uber', 'DiDi', 'Taxis', 'Law 21.553'],
    sources: [
      { title: 'Taxis vs Apps: Which is cheaper and safer? - Infobae', url: 'https://www.infobae.com/economia/2025/03/07/taxis-vs-apps-de-movilidad-cual-es-el-servicio-mas-barato-y-seguro-para-moverse-por-la-ciudad/' },
      { title: 'Chile regulates apps with Uber Law - Redimin', url: 'https://www.redimin.cl/chile-regula-apps-de-transporte-con-la-ley-uber-impacto-inminente-en-taxistas-y-empresas-digitales/' },
      { title: 'Uber fines in Chile - Autofact', url: 'https://www.autofact.cl/blog/mi-auto/infracciones/multa-uber-chile' },
    ],
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
