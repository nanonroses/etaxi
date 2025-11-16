'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/pedir-taxi`, label: t('requestTaxi') },
    { href: `/${locale}/descargar-app`, label: t('downloadApp') },
    { href: `/${locale}/seguridad`, label: t('security') },
    { href: `/${locale}/cumplimiento`, label: t('compliance') },
    { href: `/${locale}/empresas-gremios`, label: t('business') },
    { href: `/${locale}/conductores`, label: t('drivers') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-[1200px]">
        <nav className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-[hsl(var(--primary))]">
              ETAXI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <LanguageSelector />
          </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[hsl(var(--foreground))]" />
          ) : (
            <Menu className="h-6 w-6 text-[hsl(var(--foreground))]" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-[hsl(var(--border))] shadow-lg md:hidden">
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-6 py-3 text-base font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-6 py-3">
                <LanguageSelector />
              </li>
            </ul>
          </div>
        )}
        </nav>
      </div>
    </header>
  );
}
