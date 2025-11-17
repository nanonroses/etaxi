'use client';

import { Download, MapPin, Check, Eye, Shield, Star, Clipboard, FileCheck, GraduationCap, Power, Bell, CheckCircle, Phone, FileText, Settings, Users, Activity, BarChart } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className={`w-full py-20 ${bgColor}`}>
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkBg ? 'text-white' : 'text-[#182b33]'}`}>
            {title}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkBg ? 'text-white/80' : 'text-[#596065]'}`}>
            {subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Download;
            const isLast = index === steps.length - 1;
            const numberBgColor = isDarkBg ? 'bg-[#fff500]' : 'bg-[#dd1828]';
            const numberTextColor = isDarkBg ? 'text-[#030c13]' : 'text-white';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                className="relative"
              >
                {/* Mobile and Desktop Layout */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full ${numberBgColor} flex items-center justify-center shadow-lg z-10 relative`}>
                      <span className={`text-2xl font-bold ${numberTextColor}`}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ${isDarkBg ? 'bg-white/5 hover:bg-white/10' : 'bg-gradient-to-b from-white to-gray-50'} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#596065]/20 hover:border-[#dd1828] hover:-translate-y-1 group`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold ${isDarkBg ? 'text-white' : 'text-[#182b33]'} mb-3`}>
                          {step.title}
                        </h3>
                        <p className={`${isDarkBg ? 'text-white/80' : 'text-[#596065]'} leading-relaxed`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector - Only show if not last step */}
                {!isLast && (
                  <div className="flex justify-center my-4 md:ml-8">
                    <ArrowRight className={`w-8 h-8 ${isDarkBg ? 'text-[#fff500]' : 'text-[#dd1828]'} transform rotate-90 md:rotate-0`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
