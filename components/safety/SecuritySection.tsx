'use client';

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
    <section className={`w-full py-20 ${bgColor}`}>
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${subtitleColor} max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {requirements.map((req, index) => {
            const Icon = iconMap[req.icon];
            return (
              <div
                key={index}
                className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347]"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <h3 className="text-xl font-bold text-[#0C1A2B]">
                        {req.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
