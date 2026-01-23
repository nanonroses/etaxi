import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogHero, BlogContent, BlogCTA } from '@/components/blog';
import { getAllArticles } from '@/lib/blog-data';

export default async function BlogPage() {
  const locale = await getLocale();

  // Pre-load all articles on the server
  const allArticles = getAllArticles(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <BlogHero />

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogContent articles={allArticles} />
          </div>
        </section>

        <BlogCTA />
      </main>

      <Footer />
    </div>
  );
}
