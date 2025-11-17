import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.etaxi.cl'),
  title: {
    default: 'ETAXI — Taxis regulados y trazables en Chile',
    template: '%s | ETAXI',
  },
  description:
    'ETAXI conecta pasajeros, empresas y gremios con taxis regulados en Chile, con seguridad, trazabilidad y cumplimiento normativo.',
  keywords: ['taxi regulado', 'taxi Chile', 'ETAXI', 'transporte regulado', 'taxi seguro', 'Ley 21.553'],
  authors: [{ name: 'ETAXI' }],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // With next-intl middleware, this layout just passes children
  // The actual <html> and <body> tags are in app/[locale]/layout.tsx
  return children;
}
