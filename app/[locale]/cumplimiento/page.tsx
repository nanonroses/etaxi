'use client';

import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Shield, FileCheck, Scale, AlertTriangle, CheckCircle,
  Building, Users, FileText, TrendingUp, Award
} from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';

export default function CumplimientoPage() {
  const t = useTranslations('complianceRegulatoryPage');

  const regulations = [
    {
      icon: Scale,
      title: t('regulations.law21553.title'),
      description: t('regulations.law21553.description'),
      bullets: [
        t('regulations.law21553.bullet1'),
        t('regulations.law21553.bullet2'),
        t('regulations.law21553.bullet3'),
      ],
    },
    {
      icon: FileCheck,
      title: t('regulations.ds212.title'),
      description: t('regulations.ds212.description'),
      bullets: [
        t('regulations.ds212.bullet1'),
        t('regulations.ds212.bullet2'),
        t('regulations.ds212.bullet3'),
      ],
    },
  ];

  const etaxiRoleTable = [
    {
      aspect: t('roleTable.row1.aspect'),
      responsible: t('roleTable.row1.responsible'),
      etaxiSupport: t('roleTable.row1.etaxiSupport'),
    },
    {
      aspect: t('roleTable.row2.aspect'),
      responsible: t('roleTable.row2.responsible'),
      etaxiSupport: t('roleTable.row2.etaxiSupport'),
    },
    {
      aspect: t('roleTable.row3.aspect'),
      responsible: t('roleTable.row3.responsible'),
      etaxiSupport: t('roleTable.row3.etaxiSupport'),
    },
    {
      aspect: t('roleTable.row4.aspect'),
      responsible: t('roleTable.row4.responsible'),
      etaxiSupport: t('roleTable.row4.etaxiSupport'),
    },
  ];

  const risks = [
    {
      icon: AlertTriangle,
      text: t('risks.risk1'),
    },
    {
      icon: AlertTriangle,
      text: t('risks.risk2'),
    },
    {
      icon: AlertTriangle,
      text: t('risks.risk3'),
    },
    {
      icon: AlertTriangle,
      text: t('risks.risk4'),
    },
  ];

  const benefits = [
    {
      icon: FileText,
      title: t('benefits.benefit1.title'),
      description: t('benefits.benefit1.description'),
    },
    {
      icon: CheckCircle,
      title: t('benefits.benefit2.title'),
      description: t('benefits.benefit2.description'),
    },
    {
      icon: TrendingUp,
      title: t('benefits.benefit3.title'),
      description: t('benefits.benefit3.description'),
    },
    {
      icon: Shield,
      title: t('benefits.benefit4.title'),
      description: t('benefits.benefit4.description'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] animate-gradient-slow" />

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#dd1828] blur-[140px] opacity-30" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-[#fff500]/20 rounded-full mb-4">
                <p className="text-sm font-semibold text-[#fff500]">
                  {t('hero.badge')}
                </p>
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#dd1828]/15 mb-6 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <Shield className="w-10 h-10 text-[#fff500]" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* Brief description */}
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                {t('hero.description')}
              </p>

              {/* CTA */}
              <div className="pt-6">
                <Link href="/contacto">
                  <Button
                    size="lg"
                    className="bg-[#fff500] text-[#182b33] hover:bg-[#fff500]/90 font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Regulatory Framework Section */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
                {t('regulations.title')}
              </h2>
              <p className="text-lg text-[#596065] max-w-3xl mx-auto leading-relaxed">
                {t('regulations.subtitle')}
              </p>
            </div>

            {/* Regulations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regulations.map((regulation, index) => {
                const Icon = regulation.icon;
                const colors = index === 0
                  ? { gradient: 'from-[#dd1828] to-[#182b33]', bg: 'bg-[#dd1828]/5', border: 'border-[#dd1828]/20' }
                  : { gradient: 'from-[#182b33] to-[#030c13]', bg: 'bg-[#182b33]/5', border: 'border-[#182b33]/20' };
                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  >
                    <Card className={`border-2 ${colors.border} ${colors.bg} hover:border-[#dd1828] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group`}>
                      <CardHeader>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl text-[#182b33] mb-3">
                              {regulation.title}
                            </CardTitle>
                            <p className="text-[#596065] leading-relaxed">
                              {regulation.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {regulation.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-2 text-sm text-[#596065]"
                            >
                              <CheckCircle className="w-4 h-4 text-[#dd1828] mt-0.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ETAXI Role Section */}
        <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
                {t('role.title')}
              </h2>
              <p className="text-lg text-[#596065] max-w-3xl mx-auto leading-relaxed">
                {t('role.subtitle')}
              </p>
            </div>

            {/* What ETAXI Does / Doesn't Do */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Does */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Card className="border-2 border-[#dd1828]/30 bg-[#dd1828]/5 hover:border-[#dd1828] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#182b33] flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-[#dd1828] group-hover:scale-110 transition-transform duration-300" />
                      {t('role.does.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#dd1828] font-bold">✓</span>
                        <span>{t('role.does.item1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#dd1828] font-bold">✓</span>
                        <span>{t('role.does.item2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#dd1828] font-bold">✓</span>
                        <span>{t('role.does.item3')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#dd1828] font-bold">✓</span>
                        <span>{t('role.does.item4')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </m.div>

              {/* Doesn't Do */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Card className="border-2 border-[#596065]/30 bg-[#596065]/5 hover:border-[#596065] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#182b33] flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-[#596065] group-hover:scale-110 transition-transform duration-300" />
                      {t('role.doesnt.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#596065] font-bold">✗</span>
                        <span>{t('role.doesnt.item1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#596065] font-bold">✗</span>
                        <span>{t('role.doesnt.item2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#596065] font-bold">✗</span>
                        <span>{t('role.doesnt.item3')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[#596065]">
                        <span className="text-[#596065] font-bold">✗</span>
                        <span>{t('role.doesnt.item4')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </m.div>
            </div>

            {/* Responsibility Table */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-xl shadow-lg border-2 border-[#596065]/20 hover:border-[#dd1828] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#182b33] to-[#030c13] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        {t('roleTable.header.aspect')}
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        {t('roleTable.header.responsible')}
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        {t('roleTable.header.etaxiSupport')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {etaxiRoleTable.map((row, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-[#fff500]/10 transition-colors`}
                      >
                        <td className="px-6 py-4 font-medium text-[#182b33]">
                          {row.aspect}
                        </td>
                        <td className="px-6 py-4 text-[#596065]">
                          {row.responsible}
                        </td>
                        <td className="px-6 py-4 text-[#596065]">
                          {row.etaxiSupport}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          </div>
        </section>

        {/* Risks Section */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
                {t('risks.title')}
              </h2>
              <p className="text-lg text-[#596065] max-w-3xl mx-auto leading-relaxed">
                {t('risks.subtitle')}
              </p>
            </div>

            {/* Risks List */}
            <div className="max-w-3xl mx-auto space-y-4 mb-12">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                  >
                    <Card className="border-2 border-[#dd1828]/30 bg-[#dd1828]/5 hover:border-[#dd1828] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-[#596065] leading-relaxed">
                            {risk.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                );
              })}
            </div>

            {/* Counterpoint */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <Card className="border-2 border-[#dd1828]/30 bg-[#dd1828]/5 hover:border-[#dd1828] hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#182b33] mb-3">
                        {t('risks.counterpoint.title')}
                      </h3>
                      <p className="text-[#596065] leading-relaxed">
                        {t('risks.counterpoint.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
                {t('benefits.title')}
              </h2>
              <p className="text-lg text-[#596065] max-w-3xl mx-auto leading-relaxed">
                {t('benefits.subtitle')}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const colors = [
                  { gradient: 'from-[#dd1828] to-[#182b33]', bg: 'bg-[#dd1828]/5', border: 'border-[#dd1828]/20' },
                  { gradient: 'from-[#182b33] to-[#030c13]', bg: 'bg-[#182b33]/5', border: 'border-[#182b33]/20' },
                  { gradient: 'from-[#fff500] to-[#dd1828]', bg: 'bg-[#fff500]/10', border: 'border-[#fff500]/30' },
                  { gradient: 'from-[#dd1828] to-[#596065]', bg: 'bg-[#dd1828]/5', border: 'border-[#dd1828]/20' },
                ];
                const colorScheme = colors[index % colors.length];
                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  >
                    <Card className={`border-2 ${colorScheme.border} ${colorScheme.bg} hover:border-[#dd1828] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorScheme.gradient} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl text-[#182b33] mb-3">
                              {benefit.title}
                            </CardTitle>
                            <p className="text-[#596065] leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="w-full py-16 bg-gray-100">
          <div className="container mx-auto max-w-[900px] px-4">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Card className="border-2 border-[#fff500]/30 bg-[#fff500]/10 hover:border-[#fff500] hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-xl text-[#182b33] flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-[#fff500] group-hover:scale-110 transition-transform duration-300" />
                    {t('disclaimer.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#596065] leading-relaxed mb-4">
                    {t('disclaimer.text1')}
                  </p>
                  <p className="text-sm text-[#596065] leading-relaxed mb-4">
                    {t('disclaimer.text2')}
                  </p>
                  <p className="text-sm text-[#596065] leading-relaxed">
                    {t('disclaimer.text3')}
                  </p>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] animate-gradient-slow" />

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#dd1828] blur-[120px]" />
          </div>

          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('finalCta.title')}
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                {t('finalCta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button
                    size="lg"
                    className="bg-[#fff500] text-[#182b33] hover:bg-[#fff500]/90 font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {t('finalCta.ctaPrimary')}
                  </Button>
                </Link>
                <Link href="/empresas-gremios">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-8 hover:scale-105 transition-all duration-300"
                  >
                    {t('finalCta.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
