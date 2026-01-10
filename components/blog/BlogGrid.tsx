'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BlogCard } from './BlogCard';
import type { BlogArticle } from '@/lib/blog-data';
import { FileX } from 'lucide-react';

interface BlogGridProps {
  articles: BlogArticle[];
  showFeatured?: boolean;
}

export function BlogGrid({ articles, showFeatured = true }: BlogGridProps) {
  const t = useTranslations('blog');

  if (articles.length === 0) {
    return (
      <motion.div
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
      </motion.div>
    );
  }

  const featuredArticles = showFeatured ? articles.filter(a => a.featured) : [];
  const regularArticles = showFeatured
    ? articles.filter(a => !a.featured)
    : articles;

  return (
    <div className="space-y-12">
      {/* Featured articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#182b33] flex items-center gap-3"
          >
            <span className="w-1.5 h-8 bg-[#dd1828] rounded-full" />
            {t('featuredArticles')}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <BlogCard
                key={article.slug}
                article={article}
                featured={true}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular articles */}
      {regularArticles.length > 0 && (
        <div className="space-y-6">
          {showFeatured && featuredArticles.length > 0 && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-[#182b33] flex items-center gap-3"
            >
              <span className="w-1.5 h-8 bg-[#fff500] rounded-full" />
              {t('allArticles')}
            </motion.h2>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <BlogCard
                key={article.slug}
                article={article}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
