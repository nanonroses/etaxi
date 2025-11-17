'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Shield, Video, AlertCircle, MapPin, UserCheck, Headphones } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SafetyFeaturesProps {
  intro?: string;
}

export function SafetyFeatures({ intro }: SafetyFeaturesProps) {
  const t = useTranslations('safety');
  const locale = useLocale();

  const features = [
    {
      icon: Video,
      title: t('features.recording'),
      description: 'Grabación continua durante todo el viaje',
    },
    {
      icon: AlertCircle,
      title: t('features.panic'),
      description: 'Activación inmediata de alerta de emergencia',
    },
    {
      icon: MapPin,
      title: t('features.tracking'),
      description: 'Ubicación en tiempo real compartida',
    },
    {
      icon: UserCheck,
      title: t('features.verified'),
      description: 'Verificación completa de antecedentes',
    },
    {
      icon: Headphones,
      title: t('features.support'),
      description: 'Equipo disponible 24/7 para asistencia',
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#182b33] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#dd1828] rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/10 text-[#182b33] font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm">Tecnología de Seguridad Avanzada</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema integral de protección para conductores y pasajeros
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#dd1828]/20">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center shadow-lg group-hover:shadow-[#dd1828]/50"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#182b33] mb-2 group-hover:text-[#dd1828] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-[#dd1828] to-[#182b33] rounded-2xl p-8 shadow-2xl mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Viajes Monitoreados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt;2min</div>
              <div className="text-sm opacity-90">Tiempo de Respuesta</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Soporte Activo</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Conoce más sobre nuestro compromiso con tu seguridad
          </p>
          <Link href={`/${locale}/seguridad`}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#dd1828] text-[#dd1828] hover:bg-[#dd1828] hover:text-white transition-all px-8"
            >
              {t('learnMore')} →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
