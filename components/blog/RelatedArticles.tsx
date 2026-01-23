'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BlogCard } from './BlogCard';
import type { BlogArticle } from '@/lib/blog-data';

interface RelatedArticlesProps {
  articles: BlogArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const t = useTranslations('blog');

  if (articles.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#182b33] mb-8 flex items-center gap-3"
        >
          <span className="w-1.5 h-8 bg-[#dd1828] rounded-full" />
          {t('relatedArticles')}
        </m.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <BlogCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
