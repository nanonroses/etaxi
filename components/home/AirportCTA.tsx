'use client';

import { m } from 'framer-motion';
import { Plane, ArrowRight, Clock, Shield, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function AirportCTA() {
    const locale = useLocale();

    return (
        <section className="w-full py-16 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <m.div
                    animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-10 left-[10%] w-72 h-72 rounded-full bg-[#fff500] blur-[120px]"
                />
                <m.div
                    animate={{ y: [0, 15, 0], opacity: [0.05, 0.08, 0.05] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-10 right-[10%] w-72 h-72 rounded-full bg-[#dd1828] blur-[120px]"
                />

                {/* Floating planes */}
                <m.div
                    animate={{ x: [-50, 600], y: [80, 20] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/4 opacity-5"
                >
                    <Plane className="w-16 h-16 text-white rotate-45" />
                </m.div>
                <m.div
                    animate={{ x: [700, -50], y: [30, 60] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 5 }}
                    className="absolute bottom-1/4 opacity-5"
                >
                    <Plane className="w-12 h-12 text-white -rotate-45 scale-x-[-1]" />
                </m.div>
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <m.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <m.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff500]/20 rounded-full border border-[#fff500]/30 mb-6"
                        >
                            <Plane className="w-4 h-4 text-[#fff500]" />
                            <span className="text-sm font-bold text-[#fff500]">Servicio Aeropuerto SCL</span>
                        </m.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            ¿Llegas o Sales del{' '}
                            <span className="bg-gradient-to-r from-[#fff500] to-[#dd1828] bg-clip-text text-transparent">
                                Aeropuerto
                            </span>
                            ?
                        </h2>

                        <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
                            Counter oficial ETAXI en el Aeropuerto de Santiago. Transporte seguro, tarifas preferenciales y atención 24/7 para turistas y viajeros.
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                            {[
                                { icon: Clock, text: '24/7' },
                                { icon: Shield, text: '100% Seguro' },
                                { icon: MapPin, text: 'Counter Oficial' },
                            ].map((item, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                                >
                                    <item.icon className="w-4 h-4 text-[#fff500]" />
                                    <span className="text-sm text-white/90 font-medium">{item.text}</span>
                                </m.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <m.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/${locale}/aeropuerto`}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#dd1828] to-[#ff4444] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <Plane className="w-5 h-5" />
                                Ver Servicio Aeropuerto
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </m.div>
                    </m.div>

                    {/* Right Visual - Terminal Card */}
                    <m.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative mx-auto max-w-[350px]">
                            {/* Glowing effect */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#fff500]/20 to-[#dd1828]/20 rounded-3xl blur-2xl" />

                            {/* Card */}
                            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <m.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dd1828] to-[#fff500] flex items-center justify-center shadow-lg"
                                    >
                                        <Plane className="w-7 h-7 text-white" />
                                    </m.div>
                                    <div>
                                        <p className="text-[#fff500] text-xs font-bold uppercase tracking-wider">ETAXI</p>
                                        <p className="text-white text-lg font-semibold">Aeropuerto SCL</p>
                                    </div>
                                </div>

                                {/* Terminal Info */}
                                <div className="space-y-3">
                                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-[#fff500]" />
                                        <div>
                                            <p className="text-white/50 text-xs">Terminal</p>
                                            <p className="text-white font-medium text-sm">Nacional e Internacional</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-[#fff500]" />
                                        <div>
                                            <p className="text-white/50 text-xs">Horario</p>
                                            <p className="text-white font-medium text-sm">24 horas, todos los días</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-[#fff500]" />
                                        <div>
                                            <p className="text-white/50 text-xs">Garantía</p>
                                            <p className="text-white font-medium text-sm">Tarifa fija, sin sorpresas</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="mt-6 flex items-center justify-center gap-2 py-3 bg-green-500/20 rounded-xl border border-green-500/30">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-green-400 text-sm font-medium">Counter Disponible</span>
                                </div>
                            </div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
