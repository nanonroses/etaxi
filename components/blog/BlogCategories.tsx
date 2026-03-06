'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { categoryLabels } from '@/lib/blog-data';
import type { BlogArticle } from '@/lib/blog-data';
import { Newspaper, Shield, Cpu, BookOpen, FileText, LayoutGrid } from 'lucide-react';

interface BlogCategoriesProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  articles: BlogArticle[];
}

export function BlogCategories({ activeCategory, onCategoryChange, articles }: BlogCategoriesProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  const countByCategory = (categoryId: string | null) => {
    if (!categoryId) return articles.length;
    return articles.filter(a => a.category === categoryId).length;
  };

  const categories = [
    { id: null, icon: LayoutGrid, label: t('categories.all') },
    { id: 'regulacion', icon: FileText, label: categoryLabels[locale as 'es' | 'en']?.regulacion },
    { id: 'seguridad', icon: Shield, label: categoryLabels[locale as 'es' | 'en']?.seguridad },
    { id: 'tecnologia', icon: Cpu, label: categoryLabels[locale as 'es' | 'en']?.tecnologia },
    { id: 'noticias', icon: Newspaper, label: categoryLabels[locale as 'es' | 'en']?.noticias },
    { id: 'guias', icon: BookOpen, label: categoryLabels[locale as 'es' | 'en']?.guias },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-2.5 mb-12"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const Icon = category.icon;
        const count = countByCategory(category.id);

        return (
          <m.button
            key={category.id || 'all'}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
              transition-all duration-300 border
              ${isActive
                ? 'bg-[#dd1828] text-white border-[#dd1828] shadow-lg shadow-[#dd1828]/25'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#dd1828]/40 hover:text-[#dd1828] hover:shadow-sm'
              }
            `}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{category.label}</span>
            <span className={`
              inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold
              ${isActive
                ? 'bg-white/25 text-white'
                : 'bg-slate-100 text-slate-500'
              }
            `}>
              {count}
            </span>
          </m.button>
        );
      })}
    </m.div>
  );
}
