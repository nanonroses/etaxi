'use client';

import { m } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { BlogArticle } from '@/lib/blog-data';
import { categoryLabels } from '@/lib/blog-data';

// Hoisted outside component to avoid recreation on each render
const CATEGORY_COLORS: Record<string, string> = {
  regulacion: 'bg-blue-100 text-blue-700 border-blue-200',
  seguridad: 'bg-green-100 text-green-700 border-green-200',
  tecnologia: 'bg-purple-100 text-purple-700 border-purple-200',
  noticias: 'bg-orange-100 text-orange-700 border-orange-200',
  guias: 'bg-[#dd1828]/10 text-[#dd1828] border-[#dd1828]/20',
} as const;

const DEFAULT_CATEGORY_COLOR = 'bg-gray-100 text-gray-700 border-gray-200';

// Pure function hoisted outside component
function formatArticleDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'es' ? 'es-CL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
  const categoryColor = CATEGORY_COLORS[article.category] || DEFAULT_CATEGORY_COLOR;
  const formattedDate = formatArticleDate(article.publishedAt, locale);

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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#182b33] to-[#030c13] p-1">
            <div className="relative overflow-hidden rounded-xl bg-white">
              {/* Image placeholder with gradient */}
              <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#dd1828]/20 via-[#182b33]/30 to-[#fff500]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}>
                    {categoryLabel}
                  </span>
                </div>

                {/* Featured badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fff500] text-[#182b33]">
                    {t('featured')}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#fff500] transition-colors">
                    {article.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#dd1828] font-semibold group-hover:gap-3 transition-all">
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
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
        <div className="h-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#dd1828]/30 transition-all duration-300">
          {/* Image placeholder with gradient */}
          <div className="relative h-48 bg-gradient-to-br from-[#dd1828]/10 via-[#182b33]/20 to-[#fff500]/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}>
                {categoryLabel}
              </span>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#fff500]/20 to-transparent rounded-tl-full" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-[#182b33] mb-2 line-clamp-2 group-hover:text-[#dd1828] transition-colors">
              {article.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime} min</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-[#dd1828] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </m.article>
  );
}
