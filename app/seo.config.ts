// SEO Configuration for ETAXI
// Centralized metadata for all pages

export const defaultTitle = 'ETAXI — Taxis regulados y trazables';
export const defaultDescription =
  'ETAXI conecta pasajeros, empresas y gremios con taxis regulados en Chile, con seguridad, trazabilidad y cumplimiento normativo.';

export const seoConfig = {
  home: {
    title: 'ETAXI — Tu taxi regulado, siempre a mano',
    description:
      'Pide taxis regulados, con conductores autorizados, viajes trazables y cumplimiento de la normativa chilena.',
    keywords: 'taxi regulado, taxi Chile, ETAXI, transporte regulado, taxi seguro, Ley 21.553',
  },
  descargarApp: {
    title: 'Descargar app ETAXI — Taxis regulados en tu celular',
    description:
      'Instala ETAXI y accede a taxis regulados, con seguridad, trazabilidad y transparencia en cada viaje.',
    keywords: 'descargar ETAXI, app taxi Chile, taxi regulado app, descargar taxi',
  },
  pedirTaxi: {
    title: 'Pedir taxi con ETAXI — Viajes regulados y seguros',
    description:
      'Aprende cómo pedir un taxi regulado con ETAXI y viaja con conductores autorizados y viajes registrados.',
    keywords: 'pedir taxi, taxi regulado, solicitar taxi Chile, taxi autorizado',
  },
  seguridad: {
    title: 'Seguridad ETAXI — Viajes trazables y conductores autorizados',
    description:
      'Conoce las medidas de seguridad de ETAXI: trazabilidad del viaje, identificación del conductor y soporte al pasajero.',
    keywords: 'seguridad taxi, trazabilidad, conductor autorizado, viaje seguro',
  },
  cumplimiento: {
    title: 'Cumplimiento normativo ETAXI — Ley 21.553 y Decreto 212',
    description:
      'ETAXI opera con taxis regulados, alineados con la Ley 21.553 y el Decreto 212, explicado en lenguaje simple.',
    keywords: 'Ley 21.553, Decreto 212, cumplimiento normativo, taxi regulado Chile',
  },
  cumplimientoNormativo: {
    title: 'Cumplimiento Normativo para Empresas y Gremios | ETAXI',
    description:
      'ETAXI se alinea con Ley 21.553 y DS 212 para ofrecer una plataforma que ayuda a empresas y gremios a operar taxis regulados con orden, trazabilidad y reducción de riesgo regulatorio.',
    keywords: 'cumplimiento normativo transporte, Ley 21.553, plataforma taxis regulados, DS 212, compliance transporte Chile, empresas transporte regulado',
  },
  empresasGremios: {
    title: 'ETAXI para empresas y gremios — Transporte regulado',
    description:
      'Solución tecnológica para empresas y gremios que operan taxis regulados, con trazabilidad, reportes y control.',
    keywords: 'taxi empresas, gremio taxistas, transporte corporativo, gestión flota taxis',
  },
  conductores: {
    title: 'Conduce con ETAXI — Plataforma para taxis regulados',
    description:
      'Si eres conductor de taxi regulado, conoce cómo integrarte a ETAXI y trabajar dentro de la normativa vigente.',
    keywords: 'conductor taxi, trabajo taxi, taxi regulado conductor, Ley 21.553 conductor',
  },
  guiaInstalacion: {
    title: 'Guía de Instalación App Conductor ETAXI — Paso a Paso',
    description:
      'Aprende a instalar y configurar la app de conductor ETAXI. Guía visual completa con todos los pasos y permisos necesarios.',
    keywords: 'instalar ETAXI conductor, configurar app taxi, tutorial ETAXI, permisos app conductor',
  },
  ayuda: {
    title: 'Ayuda y Reclamos ETAXI — Soporte 24/7',
    description:
      'Encuentra respuestas a tus preguntas sobre ETAXI o presenta un reclamo. Soporte disponible para pasajeros y conductores.',
    keywords: 'ayuda ETAXI, soporte taxi, reclamos taxi, FAQ ETAXI',
  },
  contacto: {
    title: 'Contacto ETAXI — Escríbenos',
    description:
      'Comunícate con ETAXI para consultas, soporte o información comercial. Estamos disponibles para ayudarte.',
    keywords: 'contacto ETAXI, soporte ETAXI, consultas taxi regulado',
  },
  blog: {
    title: 'Blog ETAXI — Noticias y Guías de Transporte en Chile',
    description:
      'Mantente informado sobre regulación, seguridad y novedades del transporte de pasajeros en Chile. Artículos sobre Ley 21.553, taxis regulados y más.',
    keywords: 'blog taxi Chile, noticias transporte, Ley 21.553, Ley Uber Chile, seguridad pasajeros',
  },
} as const;

// Open Graph defaults
export const ogDefaults = {
  siteName: 'ETAXI',
  locale: 'es_CL',
  type: 'website',
};

// Twitter Card defaults
export const twitterDefaults = {
  card: 'summary_large_image' as const,
  site: '@etaxi_cl', // Placeholder - actualizar cuando exista cuenta oficial
};

// Canonical URL base
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://etaxi.cl';

// Helper function to generate full metadata
export function generateMetadata(
  page: keyof typeof seoConfig,
  locale: string = 'es'
) {
  const config = seoConfig[page];

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      siteName: ogDefaults.siteName,
      locale: ogDefaults.locale,
      type: ogDefaults.type,
    },
    twitter: {
      card: twitterDefaults.card,
      title: config.title,
      description: config.description,
    },
  };
}
