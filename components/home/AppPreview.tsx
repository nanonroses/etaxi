'use client';

import { motion } from 'framer-motion';
import { Star, Download, Smartphone, Apple, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PASSENGER_APP_URLS } from '@/lib/constants';

// Phone mockup component
function PhoneMockup({
    imageSrc,
    alt,
    rotation = 0,
    scale = 1,
    delay = 0,
    zIndex = 10
}: {
    imageSrc: string;
    alt: string;
    rotation?: number;
    scale?: number;
    delay?: number;
    zIndex?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -10, scale: scale * 1.02 }}
            style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
                zIndex
            }}
            className="relative"
        >
            {/* Glow effect behind phone */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#fff500]/20 via-[#dd1828]/10 to-[#fff500]/20 rounded-[3rem] blur-xl opacity-60" />

            {/* Phone frame - Silver/Light gray with gradient border */}
            <div className="relative bg-gradient-to-b from-[#e8e8e8] via-[#d0d0d0] to-[#c0c0c0] rounded-[2.5rem] p-[3px] shadow-2xl">
                {/* Inner dark bezel */}
                <div className="bg-[#2a2a2a] rounded-[2.4rem] p-2">
                    {/* Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#2a2a2a] rounded-b-xl z-20" />

                    {/* Screen */}
                    <div className="relative bg-[#0f0f0f] rounded-[2rem] overflow-hidden aspect-[9/19.5] w-[180px] md:w-[220px]">
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 180px, 220px"
                            />
                        ) : (
                            // Placeholder gradient when no image
                            <div className="absolute inset-0 bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center">
                                <Smartphone className="w-16 h-16 text-white/30" />
                            </div>
                        )}
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                </div>
            </div>

            {/* Subtle reflection highlight on frame */}
            <div className="absolute top-2 left-4 right-4 h-8 bg-gradient-to-b from-white/30 to-transparent rounded-t-[2rem] pointer-events-none" />
        </motion.div>
    );
}

export function AppPreview() {
    const locale = useLocale();

    // Screenshots - Cambiar estas rutas cuando tengas las imágenes reales
    const screenshots = [
        {
            src: '/images/placeholders/Screenshot_20190428-185723_Etaxi Chile.webp', // Pantalla Home/Mapa
            alt: 'Pantalla principal de ETAXI',
        },
        {
            src: '/images/placeholders/Screenshot_20190929-165858_Etaxi Chile.webp', // Pantalla Solicitar
            alt: 'Solicitar taxi en ETAXI',
        },
        {
            src: '/images/placeholders/Screenshot_20190428-185735_Etaxi Chile.webp', // Pantalla Tracking
            alt: 'Seguimiento GPS en ETAXI',
        },
    ];

    return (
        <section className="w-full py-24 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 left-[20%] w-80 h-80 rounded-full bg-[#dd1828] blur-[150px]"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], opacity: [0.05, 0.08, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-20 right-[20%] w-80 h-80 rounded-full bg-[#fff500] blur-[150px]"
                />
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff500]/20 border border-[#fff500]/30 rounded-full mb-6"
                    >
                        <Smartphone className="w-4 h-4 text-[#fff500]" />
                        <span className="text-sm font-bold text-[#fff500]">Disponible Gratis</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Conoce la App{' '}
                        <span className="bg-gradient-to-r from-[#fff500] to-[#dd1828] bg-clip-text text-transparent">
                            ETAXI
                        </span>
                    </h2>

                    <p className="text-lg text-white/70 max-w-2xl mx-auto mb-6">
                        Interfaz intuitiva, fácil de usar y diseñada para tu seguridad. Pide tu taxi en segundos.
                    </p>

                    {/* Rating badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-[#fff500] fill-[#fff500]" />
                            ))}
                        </div>
                        <span className="text-white font-medium">4.8</span>
                        <span className="text-white/60 text-sm">• +10,000 descargas</span>
                    </div>
                </motion.div>

                {/* Phone Showcase */}
                <div className="flex justify-center items-center gap-4 md:gap-8 mb-16">
                    {/* Left Phone */}
                    <div className="hidden md:block">
                        <PhoneMockup
                            imageSrc={screenshots[0].src}
                            alt={screenshots[0].alt}
                            rotation={-12}
                            scale={0.85}
                            delay={0.2}
                            zIndex={5}
                        />
                    </div>

                    {/* Center Phone (main) */}
                    <PhoneMockup
                        imageSrc={screenshots[1].src}
                        alt={screenshots[1].alt}
                        rotation={0}
                        scale={1}
                        delay={0}
                        zIndex={10}
                    />

                    {/* Right Phone */}
                    <div className="hidden md:block">
                        <PhoneMockup
                            imageSrc={screenshots[2].src}
                            alt={screenshots[2].alt}
                            rotation={12}
                            scale={0.85}
                            delay={0.2}
                            zIndex={5}
                        />
                    </div>
                </div>

                {/* Download Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* App Store */}
                    <motion.a
                        href={PASSENGER_APP_URLS.ios}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <Apple className="w-8 h-8 text-[#182b33]" />
                        <div className="text-left">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Descargar en</p>
                            <p className="text-lg font-bold text-[#182b33] -mt-1">App Store</p>
                        </div>
                    </motion.a>

                    {/* Google Play */}
                    <motion.a
                        href={PASSENGER_APP_URLS.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <Play className="w-8 h-8 text-[#182b33] fill-[#182b33]" />
                        <div className="text-left">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Disponible en</p>
                            <p className="text-lg font-bold text-[#182b33] -mt-1">Google Play</p>
                        </div>
                    </motion.a>
                </motion.div>

                {/* Features row - improved with check icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
                >
                    {[
                        'Reserva en segundos',
                        'Pago seguro integrado',
                        'Seguimiento en tiempo real',
                        'Historial completo de viajes',
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                            className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                        >
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-white/80 text-sm">{feature}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
