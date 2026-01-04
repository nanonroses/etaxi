'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileCheck, Award, Scale, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function MinisterioValidation() {
    const locale = useLocale();

    const validations = [
        {
            icon: FileCheck,
            title: 'Ley 21.553',
            description: 'Plataforma registrada según la ley de modernización del transporte',
        },
        {
            icon: Scale,
            title: 'Decreto 212',
            description: 'Cumplimiento total del reglamento de transporte de pasajeros',
        },
        {
            icon: Award,
            title: 'Registro Nacional',
            description: 'Conductores inscritos en el Registro Nacional de Servicios',
        },
        {
            icon: Building2,
            title: 'Permisos Municipales',
            description: 'Todos los taxis con autorización municipal vigente',
        },
    ];

    return (
        <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#dd1828]/5 blur-[100px]" />
                <div className="absolute bottom-20 left-[10%] w-64 h-64 rounded-full bg-[#182b33]/5 blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Badge/Seal */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center lg:justify-start"
                    >
                        <div className="relative">
                            {/* Glowing effect */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -inset-8 bg-gradient-to-br from-[#dd1828]/20 to-[#182b33]/20 rounded-full blur-2xl"
                            />

                            {/* Main seal */}
                            <div className="relative bg-gradient-to-br from-[#182b33] to-[#030c13] rounded-full p-8 md:p-12 shadow-2xl">
                                {/* Inner ring */}
                                <div className="absolute inset-4 border-2 border-[#fff500]/30 rounded-full" />
                                <div className="absolute inset-6 border border-[#fff500]/20 rounded-full" />

                                {/* Content */}
                                <div className="relative w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <Shield className="w-16 h-16 md:w-20 md:h-20 text-[#fff500] mb-3" />
                                    </motion.div>

                                    <p className="text-[#fff500] text-xs font-bold uppercase tracking-widest mb-1">
                                        Validado por
                                    </p>
                                    <p className="text-white text-sm md:text-base font-bold leading-tight">
                                        Ministerio de
                                    </p>
                                    <p className="text-white text-lg md:text-xl font-bold leading-tight">
                                        Transportes
                                    </p>
                                    <p className="text-white/60 text-xs mt-2">
                                        República de Chile
                                    </p>

                                    {/* Verified badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                                        className="absolute -bottom-2 -right-2 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                                    >
                                        <CheckCircle className="w-8 h-8 text-white" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6"
                        >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-700">100% Legal y Regulado</span>
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#182b33] mb-4">
                            La <span className="text-[#dd1828]">Única</span> Plataforma{' '}
                            <span className="bg-gradient-to-r from-[#dd1828] to-[#182b33] bg-clip-text text-transparent">
                                Certificada
                            </span>
                        </h2>

                        <p className="text-lg text-[#596065] mb-8 max-w-xl mx-auto lg:mx-0">
                            ETAXI opera bajo el marco legal chileno, con conductores y vehículos verificados por las autoridades. Tu seguridad está respaldada por la ley.
                        </p>

                        {/* Validation grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {validations.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-[#dd1828]/30 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#182b33] text-sm">{item.title}</p>
                                            <p className="text-[#596065] text-xs leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={`/${locale}/cumplimiento`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#182b33] text-white font-bold rounded-full hover:bg-[#0c1a23] transition-colors shadow-lg"
                            >
                                <FileCheck className="w-5 h-5" />
                                Ver Cumplimiento Legal
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
