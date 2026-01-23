'use client';

import { useState, useMemo } from 'react';
import { BlogCategories } from './BlogCategories';
import { BlogGrid } from './BlogGrid';
import type { BlogArticle } from '@/lib/blog-data';

interface BlogContentProps {
  articles: BlogArticle[];
}

export function BlogContent({ articles }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Memoize filtered articles to avoid recalculation on every render
  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <>
      <BlogCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <BlogGrid
        articles={filteredArticles}
        showFeatured={!activeCategory}
      />
    </>
  );
}
