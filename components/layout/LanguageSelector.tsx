'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { locales } from '@/i18n';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Remove the current locale from pathname and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex gap-1 border border-[hsl(var(--border))] rounded-md p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            locale === loc
              ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
              : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
          }`}
          aria-label={`Switch to ${loc.toUpperCase()}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
