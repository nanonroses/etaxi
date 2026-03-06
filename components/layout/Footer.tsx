'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'framer-motion';
import {
  Smartphone,
  Building2,
  Headphones,
  Scale,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  Apple,
  PlayCircle,
  Mail,
  Phone
} from 'lucide-react';
import { PASSENGER_APP_URLS } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { href: `/${locale}/como-funciona`, label: locale === 'es' ? 'Cómo Funciona' : 'How It Works' },
    { href: `/${locale}/descargar-app`, label: locale === 'es' ? 'Descargar App' : 'Download App' },
    { href: `/${locale}/seguridad`, label: locale === 'es' ? 'Seguridad' : 'Security' },
  ];

  const companyLinks = [
    { href: `/${locale}/empresas-gremios`, label: locale === 'es' ? 'Empresas & Gremios' : 'Business & Guilds' },
    { href: `/${locale}/conductores`, label: locale === 'es' ? 'Conductores' : 'Drivers' },
    { href: `/${locale}/cumplimiento`, label: locale === 'es' ? 'Cumplimiento' : 'Compliance' },
  ];

  const supportLinks = [
    { href: `/${locale}/ayuda`, label: locale === 'es' ? 'Ayuda' : 'Help' },
    { href: `/${locale}/contacto`, label: locale === 'es' ? 'Contacto' : 'Contact' },
  ];

  const legalLinks = [
    { href: `/${locale}/terminos-y-condiciones`, label: t('legal.terms') },
    { href: `/${locale}/politica-privacidad`, label: t('legal.privacy') },
    { href: `/${locale}/politica-cookies`, label: t('legal.cookies') },
    { href: `/${locale}/cumplimiento`, label: t('legal.compliance') },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/etaxichile', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/etaxi_cl', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: 'https://x.com/etaxi_cl', label: 'Twitter/X', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: 'https://www.youtube.com/@etaxichile6351', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  const stats = [
    { icon: Users, value: '500+', label: locale === 'es' ? 'Conductores' : 'Drivers' },
    { icon: CheckCircle, value: '50,000+', label: locale === 'es' ? 'Viajes' : 'Trips' },
    { icon: Star, value: '4.8★', label: 'Rating' },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#dd1828] blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#fff500] blur-[120px]" />
      </div>

      {/* Top decorative wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 5C120 10 240 20 360 25C480 30 600 30 720 25C840 20 960 10 1080 10C1200 10 1320 20 1380 25L1440 30V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="currentColor" className="text-gray-100" />
        </svg>
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 py-16 relative z-10">
        {/* Header Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Logo with glow */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#dd1828] to-[#fff500] blur-xl opacity-30 rounded-full" />
            <h2 className="relative text-5xl font-bold bg-gradient-to-r from-[#dd1828] to-[#fff500] bg-clip-text text-transparent">
              ETAXI
            </h2>
          </div>

          {/* Badge */}
          <div className="block mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff500]/10 border border-[#fff500]/30">
              <Shield className="w-4 h-4 text-[#fff500]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#fff500]">
                {locale === 'es' ? '100% Regulado - Ley 21.553' : '100% Regulated - Law 21.553'}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg text-white/80 mb-6">
            {locale === 'es' ? 'Taxis 100% Regulados en Chile' : '100% Regulated Taxis in Chile'}
          </p>

          {/* Mini Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </m.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          {/* Services */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff500] to-[#dd1828] flex items-center justify-center shadow-lg">
                <Smartphone className="w-5 h-5 text-[#182b33]" aria-hidden="true" />
              </div>
              <h4 className="text-base font-bold text-white">
                {locale === 'es' ? 'Servicios' : 'Services'}
              </h4>
            </div>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-[#fff500] transition-all duration-300"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Company */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h4 className="text-base font-bold text-white">
                {locale === 'es' ? 'Empresa' : 'Company'}
              </h4>
            </div>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-[#dd1828] transition-all duration-300"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Support & Contact */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182b33] to-[#030c13] flex items-center justify-center shadow-lg border border-white/20">
                <Headphones className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h4 className="text-base font-bold text-white">
                {locale === 'es' ? 'Contacto' : 'Contact'}
              </h4>
            </div>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-300"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contacto@etaxichile.cl"
                  className="group flex items-center gap-2 text-sm text-white/70 hover:text-[#fff500] transition-all duration-300"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">contacto@etaxichile.cl</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56962116017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-white/70 hover:text-green-400 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">+56 9 6211 6017</span>
                </a>
              </li>
            </ul>
          </m.div>

          {/* Legal */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#596065] to-[#182b33] flex items-center justify-center shadow-lg">
                <Scale className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h4 className="text-base font-bold text-white">Legal</h4>
            </div>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-[#596065] transition-all duration-300"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Social Links */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h4 className="text-center text-sm font-semibold text-white/60 mb-4">
            {locale === 'es' ? 'Síguenos en Redes Sociales' : 'Follow Us on Social Media'}
          </h4>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:border-white/40 hover:shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              );
            })}
          </div>
        </m.div>

        {/* CTA Download */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-[#fff500] to-[#dd1828] rounded-2xl p-8 mb-12 text-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-[#182b33] mb-4">
            {locale === 'es' ? 'Descarga ETAXI' : 'Download ETAXI'}
          </h3>
          <p className="text-[#182b33]/80 mb-6">
            {locale === 'es' ? 'Disponible en iOS y Android' : 'Available on iOS and Android'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PASSENGER_APP_URLS.ios}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar ETAXI en App Store"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#182b33] text-white rounded-lg font-semibold hover:bg-[#030c13] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Apple className="w-5 h-5" aria-hidden="true" />
              App Store
            </a>
            <a
              href={PASSENGER_APP_URLS.android}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar ETAXI en Google Play"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#182b33] text-white rounded-lg font-semibold hover:bg-[#030c13] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <PlayCircle className="w-5 h-5" aria-hidden="true" />
              Google Play
            </a>
          </div>
        </m.div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          {/* Copyright */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Shield className="w-4 h-4 text-[#fff500]" aria-hidden="true" />
              <span suppressHydrationWarning>© {currentYear} ETAXI - {locale === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}</span>
            </div>
            <p className="text-xs text-white/40 text-center max-w-2xl">
              {locale === 'es'
                ? 'ETAXI es una plataforma 100% regulada bajo la Ley 21.553 de Chile. Todos nuestros conductores están certificados y cumplen con la normativa vigente.'
                : 'ETAXI is a 100% regulated platform under Chilean Law 21.553. All our drivers are certified and comply with current regulations.'}
            </p>
          </m.div>
        </div>
      </div>
    </footer>
  );
}
