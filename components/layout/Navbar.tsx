'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type DropdownId = 'passengers' | 'drivers' | 'business' | null;

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<Record<string, boolean>>({
    passengers: false,
    drivers: false,
    business: false,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Estructura del menú por audiencias
  const menuStructure = {
    passengers: {
      label: t('passengers'),
      items: [
        { href: `/${locale}/como-funciona`, label: t('howItWorks') },
        { href: `/${locale}/pasajeros`, label: t('passengerInfo') },
        { href: `/${locale}/aeropuerto`, label: t('airport') },
        { href: `/${locale}/descargar-app`, label: t('downloadApp') },
      ],
    },
    drivers: {
      label: t('drivers'),
      items: [
        { href: `/${locale}/conductores`, label: t('driverInfo') },
        { href: `/${locale}/conductores/guia-instalacion`, label: t('installationGuide') },
      ],
    },
    business: {
      label: t('business'),
      items: [
        { href: `/${locale}/empresas-gremios`, label: t('businessInfo') },
        { href: `/${locale}/cumplimiento`, label: t('compliance') },
        { href: `/${locale}/contacto`, label: t('contact') },
      ],
    },
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [locale]);

  // Toggle dropdown desktop
  const handleDropdownToggle = (dropdownId: DropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Toggle accordion mobile
  const handleMobileAccordionToggle = (key: string) => {
    setMobileAccordionOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, dropdownId: DropdownId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDropdownToggle(dropdownId);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-[1200px]">
        <nav className="flex h-16 items-center justify-between px-4" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded"
            aria-label="ETAXI Home"
          >
            <Image
              src="/images/placeholders/firma etaxi_original.webp"
              alt="ETAXI"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6" ref={dropdownRef}>
            {/* Dropdown Pasajeros */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('passengers')}
                onKeyDown={(e) => handleKeyDown(e, 'passengers')}
                className="flex items-center gap-1 text-sm font-medium text-[#0C1A2B] hover:text-[#F8D347] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={activeDropdown === 'passengers'}
                aria-haspopup="true"
              >
                {menuStructure.passengers.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === 'passengers' && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {activeDropdown === 'passengers' && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-[hsl(var(--border))] rounded-md shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {menuStructure.passengers.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/10 hover:text-[#0C1A2B] transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Conductores */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('drivers')}
                onKeyDown={(e) => handleKeyDown(e, 'drivers')}
                className="flex items-center gap-1 text-sm font-medium text-[#0C1A2B] hover:text-[#F8D347] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={activeDropdown === 'drivers'}
                aria-haspopup="true"
              >
                {menuStructure.drivers.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === 'drivers' && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {activeDropdown === 'drivers' && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-[hsl(var(--border))] rounded-md shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {menuStructure.drivers.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/10 hover:text-[#0C1A2B] transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Empresas */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('business')}
                onKeyDown={(e) => handleKeyDown(e, 'business')}
                className="flex items-center gap-1 text-sm font-medium text-[#0C1A2B] hover:text-[#F8D347] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={activeDropdown === 'business'}
                aria-haspopup="true"
              >
                {menuStructure.business.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === 'business' && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {activeDropdown === 'business' && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-[hsl(var(--border))] rounded-md shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {menuStructure.business.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/10 hover:text-[#0C1A2B] transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Seguridad (standalone) */}
            <Link
              href={`/${locale}/seguridad`}
              className="text-sm font-medium text-[#0C1A2B] hover:text-[#F8D347] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded px-2 py-1"
            >
              {t('security')}
            </Link>

            {/* Blog (standalone) */}
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-[#0C1A2B] hover:text-[#F8D347] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded px-2 py-1"
            >
              Blog
            </Link>

            {/* Language Selector */}
            <LanguageSelector />

            {/* CTA Button */}
            <Link
              href={`/${locale}/descargar-app`}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 active:scale-95 h-10 px-4 py-2",
                "bg-[#F8D347] hover:bg-[#F8D347]/90 text-[#0C1A2B] shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D347] focus-visible:ring-offset-2"
              )}
            >
              {t('downloadApp')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:ring-offset-2 rounded p-1"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#0C1A2B]" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-[#0C1A2B]" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[hsl(var(--border))] shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col py-4">
              {/* Accordion Pasajeros */}
              <div className="border-b border-[hsl(var(--border))]">
                <button
                  onClick={() => handleMobileAccordionToggle('passengers')}
                  className="flex items-center justify-between w-full px-6 py-3 text-base font-semibold text-[#0C1A2B] hover:bg-[#F8D347]/10 transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                  aria-expanded={mobileAccordionOpen.passengers}
                >
                  {menuStructure.passengers.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      mobileAccordionOpen.passengers && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordionOpen.passengers && (
                  <div className="bg-gray-50 py-2">
                    {menuStructure.passengers.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-10 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/20 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion Conductores */}
              <div className="border-b border-[hsl(var(--border))]">
                <button
                  onClick={() => handleMobileAccordionToggle('drivers')}
                  className="flex items-center justify-between w-full px-6 py-3 text-base font-semibold text-[#0C1A2B] hover:bg-[#F8D347]/10 transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                  aria-expanded={mobileAccordionOpen.drivers}
                >
                  {menuStructure.drivers.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      mobileAccordionOpen.drivers && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordionOpen.drivers && (
                  <div className="bg-gray-50 py-2">
                    {menuStructure.drivers.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-10 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/20 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion Empresas */}
              <div className="border-b border-[hsl(var(--border))]">
                <button
                  onClick={() => handleMobileAccordionToggle('business')}
                  className="flex items-center justify-between w-full px-6 py-3 text-base font-semibold text-[#0C1A2B] hover:bg-[#F8D347]/10 transition-colors focus:outline-none focus:bg-[#F8D347]/20"
                  aria-expanded={mobileAccordionOpen.business}
                >
                  {menuStructure.business.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      mobileAccordionOpen.business && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordionOpen.business && (
                  <div className="bg-gray-50 py-2">
                    {menuStructure.business.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-10 py-2.5 text-sm text-[#0C1A2B] hover:bg-[#F8D347]/20 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Seguridad (standalone) */}
              <Link
                href={`/${locale}/seguridad`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-3 text-base font-medium text-[#0C1A2B] hover:bg-[#F8D347]/10 transition-colors border-b border-[hsl(var(--border))]"
              >
                {t('security')}
              </Link>

              {/* Blog (standalone) */}
              <Link
                href={`/${locale}/blog`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-3 text-base font-medium text-[#0C1A2B] hover:bg-[#F8D347]/10 transition-colors border-b border-[hsl(var(--border))]"
              >
                Blog
              </Link>

              {/* Divider */}
              <div className="h-2 bg-gray-100"></div>

              {/* Language Selector */}
              <div className="px-6 py-3 border-b border-[hsl(var(--border))]">
                <LanguageSelector />
              </div>

              {/* CTA Button */}
              <div className="px-6 py-4">
                <Link
                  href={`/${locale}/descargar-app`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 active:scale-95 h-10 px-4 py-2",
                    "bg-[#F8D347] hover:bg-[#F8D347]/90 text-[#0C1A2B] shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D347] focus-visible:ring-offset-2"
                  )}
                >
                  {t('downloadApp')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
