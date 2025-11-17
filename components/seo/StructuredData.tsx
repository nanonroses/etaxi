import Script from 'next/script';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'localBusiness' | 'faqPage' | 'service';
  data?: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://www.etaxi.cl';

    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ETAXI',
          legalName: 'ETAXI SpA',
          url: baseUrl,
          logo: `${baseUrl}/logo-etaxi.png`,
          description: 'Plataforma de taxis 100% legales y regulados en Chile. Cumplimiento total de Ley 21.553 y Decreto Supremo 212.',
          email: 'contacto@etaxi.cl',
          telephone: '+56912345678',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CL',
            addressLocality: 'Santiago',
            addressRegion: 'Región Metropolitana',
          },
          sameAs: [
            'https://www.facebook.com/etaxichile',
            'https://www.instagram.com/etaxichile',
            'https://www.linkedin.com/company/etaxi',
            'https://twitter.com/etaxichile',
          ],
          areaServed: {
            '@type': 'Country',
            name: 'Chile',
          },
          founder: {
            '@type': 'Organization',
            name: 'ETAXI SpA',
          },
          foundingDate: '2024',
          slogan: 'El taxi legal que Chile necesita',
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'ETAXI',
          url: baseUrl,
          description: 'Plataforma de taxis 100% legales y regulados en Chile',
          publisher: {
            '@type': 'Organization',
            name: 'ETAXI',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo-etaxi.png`,
            },
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/buscar?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          inLanguage: ['es-CL', 'en-US'],
        };

      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#localbusiness`,
          name: 'ETAXI',
          image: `${baseUrl}/logo-etaxi.png`,
          url: baseUrl,
          telephone: '+56912345678',
          email: 'contacto@etaxi.cl',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CL',
            addressLocality: 'Santiago',
            addressRegion: 'Región Metropolitana',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -33.4489,
            longitude: -70.6693,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
          areaServed: [
            {
              '@type': 'City',
              name: 'Santiago',
            },
            {
              '@type': 'City',
              name: 'Valparaíso',
            },
            {
              '@type': 'City',
              name: 'Concepción',
            },
          ],
          paymentAccepted: 'Efectivo, Tarjeta de crédito, Tarjeta de débito',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '1250',
            bestRating: '5',
            worstRating: '1',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Servicios de Taxi',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Viajes Urbanos',
                  description: 'Traslados dentro de la ciudad en taxis regulados',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Viajes al Aeropuerto',
                  description: 'Traslados desde/hacia aeropuertos',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Transporte Corporativo',
                  description: 'Soluciones de movilidad para empresas',
                },
              },
            ],
          },
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: data?.serviceType || 'Taxi Service',
          provider: {
            '@type': 'Organization',
            name: 'ETAXI',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Chile',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: data?.catalogName || 'Servicios ETAXI',
            itemListElement: data?.services || [],
          },
          ...data,
        };

      case 'faqPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.faqs || [],
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Helper para crear breadcrumbs JSON-LD
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.etaxi.cl${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}
