'use client';

import { m } from 'framer-motion';
import { Play } from 'lucide-react';

interface DownloadButtonProps {
  label?: string;
  className?: string;
}

export function DownloadButton({
  label = 'Descargar ETAXI',
  className = '',
}: DownloadButtonProps) {
  return (
    <m.a
      href="https://play.google.com/store/apps/details?id=com.liberty.driver.etaxichile"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-3 px-6 py-3 bg-[#182b33] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg">
        <Play className="w-4 h-4 fill-current" />
      </div>
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-wider text-white/70">
          Disponible en
        </p>
        <p className="text-sm font-bold leading-tight">Google Play</p>
      </div>
    </m.a>
  );
}
