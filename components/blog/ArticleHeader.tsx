'use client';

import { m } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { BlogArticle } from '@/lib/blog-data';
import { categoryLabels } from '@/lib/blog-data';

interface ArticleHeaderProps {
  article: BlogArticle;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  const categoryLabel = categoryLabels[locale as 'es' | 'en']?.[article.category] || article.category;

  // Use Intl.DateTimeFormat for better i18n support
  const dateFormatter = new Intl.DateTimeFormat(locale === 'es' ? 'es-CL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return dateFormatter.format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      regulacion: 'bg-blue-100 text-blue-700',
      seguridad: 'bg-green-100 text-green-700',
      tecnologia: 'bg-purple-100 text-purple-700',
      noticias: 'bg-orange-100 text-orange-700',
      guias: 'bg-[#dd1828]/10 text-[#dd1828]',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] pt-8 pb-20 lg:pt-12 lg:pb-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#dd1828] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fff500] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t('backToBlog')}</span>
          </Link>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-300 mb-8">
            {article.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#dd1828] flex items-center justify-center">
                <User className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-medium">{article.author}</p>
                <p className="text-sm text-gray-400">{t('author')}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            {/* Read time */}
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5" aria-hidden="true" />
              <span>{article.readTime} {t('minRead')}</span>
            </div>

            {/* Share button */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              aria-label={t('share')}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#182b33]"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('share')}</span>
            </m.button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-white/5 text-gray-300 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </m.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
