import { getTranslations } from 'next-intl/server';
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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cumplimiento Normativo para Empresas y Gremios | ETAXI',
  description: 'ETAXI se alinea con Ley 21.553 y DS 212 para ofrecer una plataforma que ayuda a empresas y gremios a operar taxis regulados con orden, trazabilidad y reducción de riesgo regulatorio.',
  keywords: 'cumplimiento normativo transporte, Ley 21.553, plataforma taxis regulados, DS 212, compliance transporte Chile, empresas transporte regulado',
  alternates: {
    canonical: 'https://www.etaxi.cl/es/cumplimiento',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/cumplimiento',
      'en-US': 'https://www.etaxi.cl/en/compliance',
    },
  },
  openGraph: {
    title: 'Cumplimiento Normativo para Empresas y Gremios | ETAXI',
    description: 'Plataforma tecnológica alineada con Ley 21.553 y DS 212 para ordenar operaciones de transporte regulado.',
    url: 'https://www.etaxi.cl/cumplimiento',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cumplimiento Normativo para Empresas y Gremios | ETAXI',
    description: 'Plataforma alineada con normativa chilena de transporte regulado.',
  },
};

export default async function CumplimientoPage() {
  const t = await getTranslations('complianceRegulatoryPage');

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
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-[#F8D347]/20 rounded-full mb-4">
                <p className="text-sm font-semibold text-[#F8D347]">
                  {t('hero.badge')}
                </p>
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8D347]/20 mb-6 backdrop-blur-sm">
                <Shield className="w-10 h-10 text-[#F8D347]" />
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
                    className="bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90 font-semibold text-lg px-8 py-6"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Framework Section */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
                {t('regulations.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('regulations.subtitle')}
              </p>
            </div>

            {/* Regulations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regulations.map((regulation, index) => {
                const Icon = regulation.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-[#F8D347] transition-colors shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md flex-shrink-0">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-[#0C1A2B] mb-3">
                            {regulation.title}
                          </CardTitle>
                          <p className="text-muted-foreground leading-relaxed">
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
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
                {t('role.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('role.subtitle')}
              </p>
            </div>

            {/* What ETAXI Does / Doesn't Do */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Does */}
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-xl text-[#0C1A2B] flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    {t('role.does.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600">✓</span>
                      <span>{t('role.does.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600">✓</span>
                      <span>{t('role.does.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600">✓</span>
                      <span>{t('role.does.item3')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600">✓</span>
                      <span>{t('role.does.item4')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Doesn't Do */}
              <Card className="border-2 border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-xl text-[#0C1A2B] flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    {t('role.doesnt.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-orange-600">✗</span>
                      <span>{t('role.doesnt.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-orange-600">✗</span>
                      <span>{t('role.doesnt.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-orange-600">✗</span>
                      <span>{t('role.doesnt.item3')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-orange-600">✗</span>
                      <span>{t('role.doesnt.item4')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Responsibility Table */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0C1A2B] text-white">
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
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="px-6 py-4 font-medium text-[#0C1A2B]">
                          {row.aspect}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {row.responsible}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {row.etaxiSupport}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Risks Section */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
                {t('risks.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('risks.subtitle')}
              </p>
            </div>

            {/* Risks List */}
            <div className="max-w-3xl mx-auto space-y-4 mb-12">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 border-red-200 bg-red-50/30 hover:border-red-300 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-red-600" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {risk.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Counterpoint */}
            <Card className="border-2 border-green-300 bg-green-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C1A2B] mb-3">
                      {t('risks.counterpoint.title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('risks.counterpoint.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
                {t('benefits.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('benefits.subtitle')}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-[#F8D347] transition-all hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md flex-shrink-0">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-[#0C1A2B] mb-3">
                            {benefit.title}
                          </CardTitle>
                          <p className="text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="w-full py-16 bg-gray-100">
          <div className="container mx-auto max-w-[900px] px-4">
            <Card className="border-2 border-gray-300">
              <CardHeader>
                <CardTitle className="text-xl text-[#0C1A2B] flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  {t('disclaimer.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('disclaimer.text1')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('disclaimer.text2')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('disclaimer.text3')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 bg-gradient-to-br from-[#0C1A2B] to-[#182b33] text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
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
                  className="bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90 font-semibold text-lg px-8"
                >
                  {t('finalCta.ctaPrimary')}
                </Button>
              </Link>
              <Link href="/empresas-gremios">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-8"
                >
                  {t('finalCta.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
