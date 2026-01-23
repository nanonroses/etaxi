'use client';

import { motion } from 'framer-motion';
import {
  Download,
  LogIn,
  Settings,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

const iconMap = {
  Download,
  LogIn,
  Settings,
  ShieldCheck,
  Smartphone,
};

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  stepsCount: number;
}

interface OnboardingPhaseNavProps {
  phases: Phase[];
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
}

export function OnboardingPhaseNav({
  phases,
  activePhase,
  onPhaseChange,
}: OnboardingPhaseNavProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-3 min-w-max md:flex-wrap md:justify-center">
        {phases.map((phase) => {
          const Icon = iconMap[phase.icon as keyof typeof iconMap] || Download;
          const isActive = activePhase === phase.id;

          return (
            <motion.button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[140px] ${
                isActive
                  ? 'border-transparent shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              style={{
                backgroundColor: isActive ? phase.color : undefined,
                color: isActive
                  ? phase.color === '#fff500'
                    ? '#182b33'
                    : '#ffffff'
                  : '#182b33',
              }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight whitespace-nowrap">
                  {phase.title}
                </p>
                <p
                  className={`text-xs ${
                    isActive
                      ? phase.color === '#fff500'
                        ? 'text-[#182b33]/70'
                        : 'text-white/70'
                      : 'text-[#596065]'
                  }`}
                >
                  {phase.stepsCount} pasos
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
