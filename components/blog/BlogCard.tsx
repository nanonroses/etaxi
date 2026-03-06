'use client';

import { m } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { BlogArticle } from '@/lib/blog-data';
import { categoryLabels } from '@/lib/blog-data';

// Hoisted outside component to avoid recreation on each render
const CATEGORY_COLORS: Record<string, { badge: string; bar: string; glow: string }> = {
  regulacion: {
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    bar: 'from-blue-500 to-blue-700',
    glow: 'from-blue-900/30 via-[#182b33]/40 to-[#030c13]/60',
  },
  seguridad: {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bar: 'from-emerald-500 to-emerald-700',
    glow: 'from-emerald-900/30 via-[#182b33]/40 to-[#030c13]/60',
  },
  tecnologia: {
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    bar: 'from-purple-500 to-purple-700',
    glow: 'from-purple-900/30 via-[#182b33]/40 to-[#030c13]/60',
  },
  noticias: {
    badge: 'bg-orange-100 text-orange-700 border-orange-200',
    bar: 'from-orange-500 to-orange-600',
    glow: 'from-orange-900/30 via-[#182b33]/40 to-[#030c13]/60',
  },
  guias: {
    badge: 'bg-[#dd1828]/10 text-[#dd1828] border-[#dd1828]/20',
    bar: 'from-[#dd1828] to-[#b01020]',
    glow: 'from-[#dd1828]/20 via-[#182b33]/40 to-[#030c13]/60',
  },
};

const DEFAULT_CATEGORY = {
  badge: 'bg-gray-100 text-gray-700 border-gray-200',
  bar: 'from-gray-500 to-gray-700',
  glow: 'from-gray-800/30 via-[#182b33]/40 to-[#030c13]/60',
};

const dateFormatters: Record<string, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
  en: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
};

function formatArticleDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const formatter = dateFormatters[locale] || dateFormatters.es;
  return formatter.format(date);
}

function isNewArticle(publishedAt: string): boolean {
  const articleDate = new Date(publishedAt);
  const now = new Date();
  const diffDays = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 45;
}

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ article, featured = false, index = 0 }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  const categoryLabel = categoryLabels[locale as 'es' | 'en']?.[article.category] || article.category;
  const colors = CATEGORY_COLORS[article.category] || DEFAULT_CATEGORY;
  const formattedDate = formatArticleDate(article.publishedAt, locale);
  const isNew = isNewArticle(article.publishedAt);

  if (featured) {
    return (
      <m.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative"
      >
        <Link href={`/${locale}/blog/${article.slug}`}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#182b33] to-[#030c13] p-[1px]">
            <div className="relative overflow-hidden rounded-2xl bg-white">
              {/* Image area */}
              <div className={`relative h-64 sm:h-80 bg-gradient-to-br ${colors.glow} overflow-hidden`}>
                {/* Animated shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,245,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,245,0,0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge}`}>
                    {categoryLabel}
                  </span>
                  {isNew && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#dd1828] text-white shadow-lg shadow-[#dd1828]/40 animate-pulse">
                      <Zap className="w-3 h-3" />
                      NUEVO
                    </span>
                  )}
                </div>

                {/* Featured badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fff500] text-[#182b33] shadow-md">
                    {t('featured')}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-[#fff500] transition-colors duration-300 leading-tight">
                    {article.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#dd1828] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Category accent bar at bottom */}
              <div className={`h-1 w-full bg-gradient-to-r ${colors.bar}`} />
            </div>
          </div>
        </Link>
      </m.article>
    );
  }

  return (
    <m.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/${locale}/blog/${article.slug}`}>
        <div className="h-full flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#dd1828]/20 transition-all duration-300">

          {/* Image area */}
          <div className={`relative h-44 bg-gradient-to-br ${colors.glow} overflow-hidden flex-shrink-0`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Category badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.badge}`}>
                {categoryLabel}
              </span>
              {isNew && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#dd1828] text-white shadow-md">
                  <Zap className="w-2.5 h-2.5" />
                  NUEVO
                </span>
              )}
            </div>

            {/* Read time pill */}
            <div className="absolute bottom-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            <h3 className="text-base font-bold text-[#182b33] mb-2 line-clamp-2 group-hover:text-[#dd1828] transition-colors duration-200 leading-snug">
              {article.title}
            </h3>

            <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <span>{formattedDate}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#dd1828] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" aria-hidden="true" />
            </div>
          </div>

          {/* Category accent bar */}
          <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${colors.bar} transition-all duration-500`} />
        </div>
      </Link>
    </m.article>
  );
}
