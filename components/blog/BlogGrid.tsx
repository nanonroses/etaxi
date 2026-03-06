'use client';

import { m } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { BlogCard } from './BlogCard';
import type { BlogArticle } from '@/lib/blog-data';
import { FileX, Zap, Star } from 'lucide-react';

interface BlogGridProps {
  articles: BlogArticle[];
  showFeatured?: boolean;
}

function isRecentArticle(publishedAt: string): boolean {
  const articleDate = new Date(publishedAt);
  const now = new Date();
  const diffDays = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 60;
}

export function BlogGrid({ articles, showFeatured = true }: BlogGridProps) {
  const t = useTranslations('blog');
  const locale = useLocale();

  if (articles.length === 0) {
    return (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <FileX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {t('noArticles.title')}
        </h3>
        <p className="text-gray-500">
          {t('noArticles.description')}
        </p>
      </m.div>
    );
  }

  // Sort all articles by date descending
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featuredArticles = showFeatured ? sortedArticles.filter(a => a.featured) : [];
  const regularArticles = showFeatured
    ? sortedArticles.filter(a => !a.featured)
    : sortedArticles;

  // Split regular articles: recent (last 60 days) vs older
  const recentRegular = regularArticles.filter(a => isRecentArticle(a.publishedAt));
  const olderRegular = regularArticles.filter(a => !isRecentArticle(a.publishedAt));

  const noBreakdown = !showFeatured; // When filtering by category, skip the breakdown

  return (
    <div className="space-y-16">

      {/* Featured articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-6">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-2">
              <span className="w-1 h-8 bg-[#dd1828] rounded-full" />
              <span className="w-1 h-5 bg-[#fff500] rounded-full" />
            </span>
            <h2 className="text-2xl font-bold text-[#182b33] tracking-tight">
              {t('featuredArticles')}
            </h2>
          </m.div>

          {/* First featured: full width hero */}
          {featuredArticles.length >= 1 && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Hero card — takes 2/3 width on desktop */}
              <div className="lg:col-span-2">
                <BlogCard article={featuredArticles[0]} featured={true} index={0} />
              </div>

              {/* Second featured or recent regular fills the 1/3 */}
              <div className="lg:col-span-1">
                {featuredArticles[1] ? (
                  <BlogCard article={featuredArticles[1]} featured={true} index={1} />
                ) : recentRegular[0] ? (
                  <BlogCard article={recentRegular[0]} index={0} />
                ) : null}
              </div>
            </div>
          )}

          {/* Remaining featured in 2-col */}
          {featuredArticles.length > 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.slice(2).map((article, index) => (
                <BlogCard key={article.slug} article={article} featured={true} index={index + 2} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent articles section (non-featured, last 60 days) */}
      {!noBreakdown && recentRegular.length > 0 && (
        <div className="space-y-6">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#dd1828] rounded-full" />
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#182b33] tracking-tight">
                {locale === 'es' ? 'Últimas Noticias' : 'Latest News'}
              </h2>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dd1828]/10 border border-[#dd1828]/20 text-[#dd1828] text-sm font-semibold">
                <Zap className="w-3.5 h-3.5" />
                {locale === 'es' ? 'Reciente' : 'Recent'}
              </span>
            </div>
          </m.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skip the one already shown in featured slot if applicable */}
            {(featuredArticles.length === 1 ? recentRegular.slice(1) : recentRegular).map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Older articles section */}
      {!noBreakdown && olderRegular.length > 0 && (
        <div className="space-y-6">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="w-1.5 h-8 bg-[#fff500] rounded-full" />
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#182b33] tracking-tight">
                {t('allArticles')}
              </h2>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium">
                <Star className="w-3.5 h-3.5" />
                {olderRegular.length} {locale === 'es' ? 'artículos' : 'articles'}
              </span>
            </div>
          </m.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {olderRegular.map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Category filter view: flat grid, no breakdown */}
      {noBreakdown && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
