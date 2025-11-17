import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SecuritySection } from '@/components/safety/SecuritySection';
import { SafetyComparison } from '@/components/safety/SafetyComparison';
import { SafetyCTA } from '@/components/safety/SafetyCTA';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  Shield,
  User,
  IdCard,
  Star,
  Car,
  Award,
  TrendingUp,
  Scale,
  FileSignature,
  MapPinned,
  Lock,
  FileCheck,
  GraduationCap,
  Building,
  Wrench,
  Gauge,
  ShieldCheck,
  MapPin,
  Share2,
  Route,
  Bell,
  AlertCircle,
  Headphones,
  Phone,
  History,
  Receipt,
  FileText,
  BarChart,
} from 'lucide-react';
import type { Metadata } from 'next';

// Icon mapping for local rendering
const iconMap = {
  Shield,
  User,
  IdCard,
  Star,
  Car,
  Award,
  TrendingUp,
  Scale,
  FileSignature,
  MapPinned,
  Lock,
  FileCheck,
  GraduationCap,
  Building,
  Wrench,
  Gauge,
  ShieldCheck,
  MapPin,
  Share2,
  Route,
  Bell,
  AlertCircle,
  Headphones,
  Phone,
  History,
  Receipt,
  FileText,
  BarChart,
} as const;

type IconName = keyof typeof iconMap;

export const metadata: Metadata = {
  title: 'Seguridad ETAXI - Viaja Protegido con Taxis 100% Regulados',
  description:
    'Tu seguridad es nuestra máxima prioridad. Conductores verificados, vehículos autorizados, trazabilidad completa y cumplimiento legal total. Viaja tranquilo con ETAXI.',
  keywords: [
    'seguridad ETAXI',
    'taxis seguros',
    'conductores verificados',
    'trazabilidad GPS',
    'botón de pánico',
    'taxis legales',
    'Ley 21.553',
  ],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/seguridad',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/seguridad',
      'en-US': 'https://www.etaxi.cl/en/safety',
    },
  },
  openGraph: {
    title: 'Seguridad ETAXI - Tu Seguridad es Nuestra Máxima Prioridad',
    description:
      'Viaja tranquilo con conductores verificados, vehículos autorizados y trazabilidad completa. 100% legal y seguro.',
    url: 'https://www.etaxi.cl/seguridad',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: 'https://www.etaxi.cl/og-image-safety.jpg',
        width: 1200,
        height: 630,
        alt: 'Seguridad ETAXI - Taxis 100% Seguros y Regulados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguridad ETAXI - Viaja Protegido',
    description:
      'Conductores verificados, vehículos autorizados y trazabilidad completa. 100% legal.',
  },
};

export default function SeguridadPage() {
  const t = useTranslations('safetyPage');

  // Verified Drivers Requirements
  const verifiedDriversReqs = [
    {
      title: t('verifiedDrivers.requirement1.title'),
      description: t('verifiedDrivers.requirement1.description'),
      icon: 'IdCard' as const,
    },
    {
      title: t('verifiedDrivers.requirement2.title'),
      description: t('verifiedDrivers.requirement2.description'),
      icon: 'FileCheck' as const,
    },
    {
      title: t('verifiedDrivers.requirement3.title'),
      description: t('verifiedDrivers.requirement3.description'),
      icon: 'FileSignature' as const,
    },
    {
      title: t('verifiedDrivers.requirement4.title'),
      description: t('verifiedDrivers.requirement4.description'),
      icon: 'GraduationCap' as const,
    },
  ];

  // Authorized Vehicles Requirements
  const authorizedVehiclesReqs = [
    {
      title: t('authorizedVehicles.requirement1.title'),
      description: t('authorizedVehicles.requirement1.description'),
      icon: 'Building' as const,
    },
    {
      title: t('authorizedVehicles.requirement2.title'),
      description: t('authorizedVehicles.requirement2.description'),
      icon: 'Wrench' as const,
    },
    {
      title: t('authorizedVehicles.requirement3.title'),
      description: t('authorizedVehicles.requirement3.description'),
      icon: 'Gauge' as const,
    },
    {
      title: t('authorizedVehicles.requirement4.title'),
      description: t('authorizedVehicles.requirement4.description'),
      icon: 'ShieldCheck' as const,
    },
  ];

  // Live Tracking Features
  const liveTrackingFeatures = [
    {
      title: t('liveTracking.feature1.title'),
      description: t('liveTracking.feature1.description'),
      icon: 'MapPin' as const,
    },
    {
      title: t('liveTracking.feature2.title'),
      description: t('liveTracking.feature2.description'),
      icon: 'Share2' as const,
    },
    {
      title: t('liveTracking.feature3.title'),
      description: t('liveTracking.feature3.description'),
      icon: 'Route' as const,
    },
    {
      title: t('liveTracking.feature4.title'),
      description: t('liveTracking.feature4.description'),
      icon: 'Bell' as const,
    },
  ];

  // Driver Profile Info
  const driverProfileInfo = [
    {
      title: t('driverProfile.info1.title'),
      description: t('driverProfile.info1.description'),
      icon: 'User' as const,
    },
    {
      title: t('driverProfile.info2.title'),
      description: t('driverProfile.info2.description'),
      icon: 'IdCard' as const,
    },
    {
      title: t('driverProfile.info3.title'),
      description: t('driverProfile.info3.description'),
      icon: 'Star' as const,
    },
    {
      title: t('driverProfile.info4.title'),
      description: t('driverProfile.info4.description'),
      icon: 'Car' as const,
    },
    {
      title: t('driverProfile.info5.title'),
      description: t('driverProfile.info5.description'),
      icon: 'TrendingUp' as const,
    },
    {
      title: t('driverProfile.info6.title'),
      description: t('driverProfile.info6.description'),
      icon: 'Award' as const,
    },
  ];

  // Emergency Support Features
  const emergencySupportFeatures = [
    {
      title: t('emergencySupport.feature1.title'),
      description: t('emergencySupport.feature1.description'),
      icon: 'AlertCircle' as const,
    },
    {
      title: t('emergencySupport.feature2.title'),
      description: t('emergencySupport.feature2.description'),
      icon: 'Headphones' as const,
    },
    {
      title: t('emergencySupport.feature3.title'),
      description: t('emergencySupport.feature3.description'),
      icon: 'Shield' as const,
    },
    {
      title: t('emergencySupport.feature4.title'),
      description: t('emergencySupport.feature4.description'),
      icon: 'Phone' as const,
    },
  ];

  // Trip Audit Features
  const tripAuditFeatures = [
    {
      title: t('tripAudit.feature1.title'),
      description: t('tripAudit.feature1.description'),
      icon: 'History' as const,
    },
    {
      title: t('tripAudit.feature2.title'),
      description: t('tripAudit.feature2.description'),
      icon: 'Receipt' as const,
    },
    {
      title: t('tripAudit.feature3.title'),
      description: t('tripAudit.feature3.description'),
      icon: 'FileText' as const,
    },
    {
      title: t('tripAudit.feature4.title'),
      description: t('tripAudit.feature4.description'),
      icon: 'BarChart' as const,
    },
  ];

  // Legal Compliance Laws
  const legalComplianceLaws = [
    {
      title: t('legalCompliance.law1.title'),
      description: t('legalCompliance.law1.description'),
      icon: 'Scale' as const,
    },
    {
      title: t('legalCompliance.law2.title'),
      description: t('legalCompliance.law2.description'),
      icon: 'FileSignature' as const,
    },
    {
      title: t('legalCompliance.law3.title'),
      description: t('legalCompliance.law3.description'),
      icon: 'MapPinned' as const,
    },
    {
      title: t('legalCompliance.law4.title'),
      description: t('legalCompliance.law4.description'),
      icon: 'Lock' as const,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#030c13]">
      {/* Schema.org Structured Data */}
      <StructuredData
        type="service"
        data={{
          serviceType: 'Safe and Regulated Taxi Service',
          catalogName: 'Seguridad y Cumplimiento',
          description:
            'Taxis 100% seguros con conductores verificados, vehículos autorizados, trazabilidad GPS completa y cumplimiento total de Ley 21.553.',
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="w-full bg-white">
          <div className="container mx-auto max-w-[1200px] px-4 py-4">
            <Breadcrumbs />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] py-16 md:py-24 text-white">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -top-10 left-10 h-72 w-72 rounded-full bg-[#fff500] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#dd1828] blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-[1200px] px-4">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center md:flex-row md:text-left">
              {/* Left: copy */}
              <div className="flex-1 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center rounded-full border border-[#fff500]/40 bg-[#fff500]/10 px-4 py-1 text-xs font-semibold tracking-wide text-[#fff500]">
                  {t('hero.badge')}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="max-w-xl text-base text-white/80 md:text-lg">
                  {t('hero.subtitle')}
                </p>

                {/* Trust bullets */}
                <div className="mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-3 md:text-xs lg:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#dd1828] text-xs font-bold">
                      1
                    </span>
                    <span>{t('hero.trustPoint1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#dd1828] text-xs font-bold">
                      2
                    </span>
                    <span>{t('hero.trustPoint2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#dd1828] text-xs font-bold">
                      3
                    </span>
                    <span>{t('hero.trustPoint3')}</span>
                  </div>
                </div>
              </div>

              {/* Right: shield / safe card */}
              <div className="flex flex-1 justify-center md:justify-end">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-3xl bg-[#fff500]/20 blur-xl" />
                  <div className="absolute -bottom-6 -left-4 h-16 w-32 rounded-3xl bg-[#dd1828]/30 blur-xl" />

                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dd1828] to-[#182b33] shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/60">
                          ETAXI • Seguridad
                        </p>
                        <p className="text-sm font-semibold text-white">
                          Taxis regulados y trazables
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-white/80">
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span className="text-xs">Conductor verificado</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#fff500]">
                          <Star className="h-3 w-3 fill-[#fff500] text-[#fff500]" />
                          4.9 / 5
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span className="text-xs">Vehículo autorizado</span>
                        <span className="text-xs font-semibold text-[#fff500]">
                          RNSTP / DS 212
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span className="text-xs">Trazabilidad en tiempo real</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          Activo
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
                      <span>{t('hero.footerLeft')}</span>
                      <span>{t('hero.footerRight')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto max-w-[900px] px-4">
            <div className="text-center">
              <h2 className="mb-6 text-3xl font-bold text-[#182b33] md:text-4xl">
                {t('intro.title')}
              </h2>
              <p className="text-lg leading-relaxed text-[#596065]">
                {t('intro.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Verified Drivers */}
        <SecuritySection
          title={t('verifiedDrivers.title')}
          subtitle={t('verifiedDrivers.subtitle')}
          requirements={verifiedDriversReqs}
          bgColor="bg-gradient-to-b from-white to-[#f3f4f6]"
          accentColor="from-[#dd1828] to-[#182b33]"
        />

        {/* Authorized Vehicles */}
        <SecuritySection
          title={t('authorizedVehicles.title')}
          subtitle={t('authorizedVehicles.subtitle')}
          requirements={authorizedVehiclesReqs}
          bgColor="bg-[#030c13]"
          accentColor="from-[#fff500] to-[#dd1828]"
          darkBg={true}
        />

        {/* Live Tracking */}
        <SecuritySection
          title={t('liveTracking.title')}
          subtitle={t('liveTracking.subtitle')}
          requirements={liveTrackingFeatures}
          bgColor="bg-gradient-to-b from-[#182b33] to-[#030c13]"
          accentColor="from-[#fff500] to-[#dd1828]"
          darkBg={true}
        />

        {/* Driver Profile */}
        <section className="w-full bg-white py-20">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#182b33] md:text-4xl">
                {t('driverProfile.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#596065]">
                {t('driverProfile.subtitle')}
              </p>
            </div>

            {/* Grid 3 columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {driverProfileInfo.map((info, index) => {
                const Icon = iconMap[info.icon as IconName];
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-[#e5e7eb] bg-gradient-to-b from-white to-[#f9fafb] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#dd1828] hover:shadow-xl"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] shadow-md">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-[#182b33]">
                        {info.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#596065]">
                        {info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety Comparison */}
        <SafetyComparison />

        {/* Emergency Support */}
        <SecuritySection
          title={t('emergencySupport.title')}
          subtitle={t('emergencySupport.subtitle')}
          requirements={emergencySupportFeatures}
          bgColor="bg-white"
          accentColor="from-[#dd1828] to-[#fff500]"
        />

        {/* Trip Audit */}
        <SecuritySection
          title={t('tripAudit.title')}
          subtitle={t('tripAudit.subtitle')}
          requirements={tripAuditFeatures}
          bgColor="bg-gradient-to-b from-[#030c13] to-[#182b33]"
          accentColor="from-[#fff500] to-[#dd1828]"
          darkBg={true}
        />

        {/* Legal Compliance */}
        <section className="w-full bg-white py-20">
          <div className="container mx-auto max-w-[1200px] px-4">
            {/* Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#182b33] md:text-4xl">
                {t('legalCompliance.title')}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#596065]">
                {t('legalCompliance.subtitle')}
              </p>
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-[#fff500]/40 bg-[#fff500]/10 px-6 py-3">
                <p className="text-sm font-bold text-[#5b4a00]">
                  {t('legalCompliance.badge')}
                </p>
              </div>
            </div>

            {/* Laws Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {legalComplianceLaws.map((law, index) => {
                const Icon = iconMap[law.icon as IconName];
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#e5e7eb] bg-gradient-to-b from-[#f9fafb] to-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#dd1828] hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#dd1828] to-[#182b33] shadow-md">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 text-xl font-bold text-[#182b33]">
                          {law.title}
                        </h3>
                        <p className="leading-relaxed text-[#596065]">
                          {law.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <SafetyCTA />
      </main>

      <Footer />
    </div>
  );
}
