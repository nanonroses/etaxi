'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogHero, BlogCategories, BlogGrid, BlogCTA } from '@/components/blog';
import { getAllArticles, getArticlesByCategory } from '@/lib/blog-data';

export default function BlogPage() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allArticles = getAllArticles(locale);
  const filteredArticles = activeCategory
    ? getArticlesByCategory(activeCategory, locale)
    : allArticles;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <BlogHero />

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogCategories
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <BlogGrid
              articles={filteredArticles}
              showFeatured={!activeCategory}
            />
          </div>
        </section>

        <BlogCTA />
      </main>

      <Footer />
    </div>
  );
}
