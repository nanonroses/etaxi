import type { MetadataRoute } from 'next';
import { blogArticlesES, blogArticlesEN } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.etaxi.cl';
  const locales = ['es', 'en'];
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/descargar-app', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/como-funciona', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/seguridad', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/cumplimiento', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/pasajeros', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/conductores', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/empresas-gremios', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/aeropuerto', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contacto', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/ayuda', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/politica-privacidad', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/politica-cookies', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terminos-y-condiciones', priority: 0.4, changeFrequency: 'yearly' as const },
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  // Add blog articles to sitemap
  blogArticlesES.forEach((article) => {
    sitemap.push({
      url: `${baseUrl}/es/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  blogArticlesEN.forEach((article) => {
    sitemap.push({
      url: `${baseUrl}/en/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemap;
}
