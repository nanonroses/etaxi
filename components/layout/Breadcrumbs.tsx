'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('breadcrumbs');

  // Remove locale from pathname and split into segments
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  const segments = pathWithoutLocale.split('/').filter((segment) => segment);

  // Don't show breadcrumbs on home page
  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href={`/${locale}`}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
          >
            {t('home')}
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;

          // Format segment for display
          const label = segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <li key={segment} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              {isLast ? (
                <span className="text-[hsl(var(--foreground))] font-medium">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
