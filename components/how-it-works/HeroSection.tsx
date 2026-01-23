'use client';

import { useTranslations } from 'next-intl';
import { Info, ChevronDown, User, Car, Building2 } from 'lucide-react';
import { m } from 'framer-motion';

export function HeroSection() {
    const t = useTranslations('howItWorksPage');

    const scrollToContent = () => {
        window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' });
    };

    return (
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(255,245,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,245,0,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <m.div
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-[#fff500] blur-[180px] opacity-20"
                />
                <m.div
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#dd1828] blur-[180px] opacity-20"
                />
                <m.div
                    animate={{
                        x: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#fff500] blur-[200px] opacity-10"
                />
            </div>

            {/* Floating Icons Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <m.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[20%] left-[15%] w-16 h-16 rounded-2xl bg-[#dd1828]/20 backdrop-blur-sm flex items-center justify-center"
                >
                    <User className="w-8 h-8 text-[#fff500]/50" />
                </m.div>
                <m.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-[30%] right-[20%] w-20 h-20 rounded-2xl bg-[#fff500]/10 backdrop-blur-sm flex items-center justify-center"
                >
                    <Car className="w-10 h-10 text-[#fff500]/50" />
                </m.div>
                <m.div
                    animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-[25%] left-[25%] w-14 h-14 rounded-2xl bg-[#dd1828]/15 backdrop-blur-sm flex items-center justify-center"
                >
                    <Building2 className="w-7 h-7 text-[#fff500]/50" />
                </m.div>
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <m.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-center lg:text-left space-y-8"
                    >
                        {/* Badge */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff500]/20 rounded-full border border-[#fff500]/30"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#fff500] animate-pulse" />
                            <span className="text-sm font-bold text-[#fff500] tracking-wide">
                                {t('hero.badge')}
                            </span>
                        </m.div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-white">{t('hero.title').split(' ').slice(0, -1).join(' ')} </span>
                            <span className="bg-gradient-to-r from-[#fff500] to-[#dd1828] bg-clip-text text-transparent">
                                {t('hero.title').split(' ').slice(-1)}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {t('hero.subtitle')}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToContent}
                                className="px-8 py-4 bg-[#dd1828] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                Ver Flujo Pasajero
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </m.button>
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                            >
                                Ver Video Demo
                            </m.button>
                        </div>
                    </m.div>

                    {/* Right Visual - 3D-like Cards */}
                    <m.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                        className="relative hidden lg:flex justify-center items-center"
                    >
                        <div className="relative w-[400px] h-[400px]">
                            {/* Central Circle */}
                            <m.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                            />

                            {/* Inner Circle */}
                            <m.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-12 rounded-full border border-[#fff500]/30"
                            />

                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <m.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="w-32 h-32 rounded-full bg-gradient-to-br from-[#dd1828] to-[#fff500] flex items-center justify-center shadow-2xl"
                                >
                                    <Info className="w-16 h-16 text-white" />
                                </m.div>
                            </div>

                            {/* Orbiting Cards */}
                            {[
                                { icon: User, label: 'Pasajero', color: 'from-[#dd1828] to-[#182b33]', delay: 0 },
                                { icon: Car, label: 'Conductor', color: 'from-[#fff500] to-[#dd1828]', delay: 0.33 },
                                { icon: Building2, label: 'Empresa', color: 'from-[#182b33] to-[#030c13]', delay: 0.66 },
                            ].map((item, index) => (
                                <m.div
                                    key={index}
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: item.delay * 20,
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: '100%',
                                        height: '100%',
                                        transformOrigin: 'center center',
                                    }}
                                    className="pointer-events-none"
                                >
                                    <m.div
                                        animate={{ rotate: -360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: 'linear',
                                            delay: item.delay * 20,
                                        }}
                                        className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto"
                                    >
                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer`}>
                                            <item.icon className="w-8 h-8 text-white mb-1" />
                                            <span className="text-[10px] font-bold text-white/90">{item.label}</span>
                                        </div>
                                    </m.div>
                                </m.div>
                            ))}
                        </div>
                    </m.div>
                </div>

                {/* Scroll Indicator */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <m.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white/80 transition-colors"
                        onClick={scrollToContent}
                    >
                        <span className="text-xs font-medium tracking-wider">SCROLL</span>
                        <ChevronDown className="w-5 h-5" />
                    </m.div>
                </m.div>
            </div>
        </section>
    );
}
