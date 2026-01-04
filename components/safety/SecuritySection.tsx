'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle, Shield, IdCard, FileCheck, GraduationCap,
  Building, Wrench, Gauge, ShieldCheck, MapPin, Share2,
  Route, Bell, User, Star, Car, Award, TrendingUp,
  AlertCircle, Headphones, Phone, History, Receipt,
  FileText, BarChart, Scale, FileSignature, MapPinned, Lock
} from 'lucide-react';

// Icon mapping
const iconMap = {
  Shield,
  IdCard,
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
  User,
  Star,
  Car,
  Award,
  TrendingUp,
  AlertCircle,
  Headphones,
  Phone,
  History,
  Receipt,
  FileText,
  BarChart,
  Scale,
  FileSignature,
  MapPinned,
  Lock,
} as const;

type IconName = keyof typeof iconMap;

interface Requirement {
  title: string;
  description: string;
  icon: IconName;
}

interface SecuritySectionProps {
  title: string;
  subtitle: string;
  requirements: Requirement[];
  bgColor?: string;
  accentColor?: string;
  darkBg?: boolean;
}

export function SecuritySection({ title, subtitle, requirements, bgColor = 'bg-white', accentColor = 'from-green-500 to-emerald-500', darkBg = false }: SecuritySectionProps) {
  const titleColor = darkBg ? 'text-white' : 'text-[#182b33]';
  const subtitleColor = darkBg ? 'text-white/80' : 'text-[#596065]';

  return (
    <section className={`w-full py-24 ${bgColor} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {darkBg ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#dd1828] blur-[120px]"
            />
          </>
        ) : (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#dd1828] blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#182b33] blur-[100px]"
            />
          </>
        )}
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 ${darkBg ? 'bg-[#fff500]/20 border-[#fff500]/30' : 'bg-[#dd1828]/10 border-[#dd1828]/20'} border rounded-full mb-6`}
          >
            <CheckCircle className={`w-4 h-4 ${darkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`} />
            <span className={`text-sm font-bold ${darkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`}>
              Garantía de Seguridad
            </span>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl font-bold ${titleColor} mb-6`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl ${subtitleColor} max-w-3xl mx-auto leading-relaxed`}>
            {subtitle}
          </p>
        </motion.div>

        {/* Requirements Grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {requirements.map((req, index) => {
            const Icon = iconMap[req.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="group relative"
              >
                {/* Card */}
                <div className={`
                  ${darkBg
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#fff500]/50'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#dd1828]'
                  }
                  rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 
                  border-2 hover:-translate-y-2 backdrop-blur-sm
                  relative overflow-hidden
                `}>
                  {/* Decorative corner gradient */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${accentColor} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`} />

                  <div className="flex items-start gap-5 relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-xl flex-shrink-0 p-4`}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
                        >
                          <CheckCircle className={`w-6 h-6 ${darkBg ? 'text-[#fff500]' : 'text-green-500'} flex-shrink-0 mt-0.5`} />
                        </motion.div>
                        <h3 className={`text-xl font-bold ${darkBg ? 'text-white' : 'text-[#0C1A2B]'}`}>
                          {req.title}
                        </h3>
                      </div>
                      <p className={`${darkBg ? 'text-white/70' : 'text-[#596065]'} leading-relaxed text-base`}>
                        {req.description}
                      </p>

                      {/* Progress bar decoration */}
                      <div className="mt-4">
                        <div className={`h-1 rounded-full ${darkBg ? 'bg-white/10' : 'bg-gray-200'} overflow-hidden`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${accentColor}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: '100%', label: 'Verificado' },
            { number: '24/7', label: 'Monitoreo' },
            { number: '+10K', label: 'Viajes Seguros' },
            { number: '4.9★', label: 'Calificación' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`text-center p-5 rounded-2xl ${darkBg ? 'bg-white/5 border-white/10' : 'bg-gradient-to-b from-[#dd1828]/5 to-[#dd1828]/10 border-[#dd1828]/10'} border backdrop-blur-sm cursor-default`}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${darkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium ${darkBg ? 'text-white/60' : 'text-[#596065]'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
