'use client';

import { Download, MapPin, Check, Eye, Shield, Star, Clipboard, FileCheck, GraduationCap, Power, Bell, CheckCircle, Phone, FileText, Settings, Users, Activity, BarChart } from 'lucide-react';
import { m } from 'framer-motion';

const iconMap = {
  download: Download,
  map: MapPin,
  check: Check,
  eye: Eye,
  shield: Shield,
  star: Star,
  clipboard: Clipboard,
  fileCheck: FileCheck,
  graduationCap: GraduationCap,
  power: Power,
  bell: Bell,
  checkCircle: CheckCircle,
  phone: Phone,
  fileText: FileText,
  settings: Settings,
  users: Users,
  activity: Activity,
  barChart: BarChart,
};

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface FlowSectionProps {
  title: string;
  subtitle: string;
  steps: Step[];
  bgColor?: string;
  accentColor?: string;
}

export function FlowSection({ title, subtitle, steps, bgColor = 'bg-white', accentColor = 'from-blue-500 to-cyan-500' }: FlowSectionProps) {
  const isDarkBg = bgColor.includes('#030c13');

  return (
    <section className={`w-full py-24 ${bgColor} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDarkBg ? (
          <>
            <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#fff500]/5 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-[#dd1828]/5 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#dd1828]/5 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-[#182b33]/5 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        {/* Header with enhanced styling */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div className={`inline-block px-4 py-2 ${isDarkBg ? 'bg-[#fff500]/20' : 'bg-[#dd1828]/10'} rounded-full mb-6`}>
            <span className={`text-sm font-bold ${isDarkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`}>
              Paso a Paso
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkBg ? 'text-white' : 'text-[#182b33]'}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDarkBg ? 'text-white/80' : 'text-[#596065]'}`}>
            {subtitle}
          </p>
        </m.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <m.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={`w-full rounded-full ${isDarkBg ? 'bg-gradient-to-b from-[#fff500] via-[#dd1828] to-[#fff500]' : 'bg-gradient-to-b from-[#dd1828] via-[#182b33] to-[#dd1828]'}`}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] || Download;
              const isEven = index % 2 === 0;
              const numberBgColor = isDarkBg ? 'bg-[#fff500]' : 'bg-[#dd1828]';
              const numberTextColor = isDarkBg ? 'text-[#030c13]' : 'text-white';

              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 md:py-8 ${isEven ? '' : 'md:direction-rtl'}`}
                >
                  {/* Content Card */}
                  <div className={`${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:col-start-2'}`}>
                    <div
                      className={`
                        ${isDarkBg ? 'bg-white/10 hover:bg-white/15 border-white/20' : 'bg-white border-[#596065]/20'} 
                        rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 
                        border-2 hover:border-[#dd1828] hover:-translate-y-2 group
                        backdrop-blur-sm
                      `}
                    >
                      {/* Icon Header */}
                      <div className={`flex items-center gap-5 mb-6 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className={`flex-1 ${isEven ? 'md:text-right' : ''}`}>
                          <span className={`text-sm font-bold uppercase tracking-wider ${isDarkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`}>
                            Paso {step.number}
                          </span>
                          <h3 className={`text-2xl font-bold ${isDarkBg ? 'text-white' : 'text-[#182b33]'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-lg leading-relaxed ${isDarkBg ? 'text-white/80' : 'text-[#596065]'} ${isEven ? 'md:text-right' : ''}`}>
                        {step.description}
                      </p>

                      {/* Decorative Line */}
                      <div className={`mt-6 h-1 rounded-full bg-gradient-to-r ${accentColor} w-24 group-hover:w-full transition-all duration-500 ${isEven ? 'md:ml-auto' : ''}`} />
                    </div>
                  </div>

                  {/* Timeline Node - Desktop Only */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <m.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                      className={`w-16 h-16 rounded-full ${numberBgColor} flex items-center justify-center shadow-xl ring-4 ${isDarkBg ? 'ring-[#030c13]' : 'ring-white'}`}
                    >
                      <span className={`text-2xl font-bold ${numberTextColor}`}>
                        {step.number}
                      </span>
                    </m.div>
                  </div>

                  {/* Mobile Number Badge */}
                  <div className="md:hidden absolute -left-2 top-8">
                    <div className={`w-12 h-12 rounded-full ${numberBgColor} flex items-center justify-center shadow-lg`}>
                      <span className={`text-xl font-bold ${numberTextColor}`}>
                        {step.number}
                      </span>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: steps.length.toString(), label: 'Pasos Simples' },
            { number: '5', label: 'Minutos Promedio' },
            { number: '100%', label: 'Digital' },
            { number: '24/7', label: 'Disponible' },
          ].map((stat, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`text-center p-6 rounded-2xl ${isDarkBg ? 'bg-white/10' : 'bg-gradient-to-b from-[#dd1828]/5 to-[#dd1828]/10'} backdrop-blur-sm`}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkBg ? 'text-[#fff500]' : 'text-[#dd1828]'}`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium ${isDarkBg ? 'text-white/70' : 'text-[#596065]'}`}>
                {stat.label}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
