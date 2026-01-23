'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { categoryLabels } from '@/lib/blog-data';
import { Newspaper, Shield, Cpu, BookOpen, FileText } from 'lucide-react';

interface BlogCategoriesProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function BlogCategories({ activeCategory, onCategoryChange }: BlogCategoriesProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  const categories = [
    { id: null, icon: Newspaper, label: t('categories.all') },
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
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const Icon = category.icon;

        return (
          <m.button
            key={category.id || 'all'}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
              transition-all duration-300 border
              ${isActive
                ? 'bg-[#dd1828] text-white border-[#dd1828] shadow-lg shadow-[#dd1828]/25'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#dd1828]/50 hover:text-[#dd1828]'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{category.label}</span>
          </m.button>
        );
      })}
    </m.div>
  );
}
