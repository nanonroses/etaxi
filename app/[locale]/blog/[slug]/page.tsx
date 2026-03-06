import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleHeader, ArticleContent, RelatedArticles, BlogCTA } from '@/components/blog';
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/blog-data';
import type { Metadata } from 'next';

interface BlogArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found | ETAXI Blog',
    };
  }

  return {
    title: `${article.title} | ETAXI Blog`,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: `https://www.etaxi.cl${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: `https://www.etaxi.cl/${locale}/blog/${slug}`,
      languages: {
        'es-CL': `https://www.etaxi.cl/es/blog/${slug}`,
        'en-US': `https://www.etaxi.cl/en/blog/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const esArticles = getAllArticles('es');
  const enArticles = getAllArticles('en');

  const params = [
    ...esArticles.map((article) => ({
      locale: 'es',
      slug: article.slug,
    })),
    ...enArticles.map((article) => ({
      locale: 'en',
      slug: article.slug,
    })),
  ];

  return params;
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, locale, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <ArticleHeader article={article} />

        <section className="py-12 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleContent article={article} />
          </div>
        </section>

        <RelatedArticles articles={relatedArticles} />

        <BlogCTA />
      </main>

      <Footer />
    </div>
  );
}
