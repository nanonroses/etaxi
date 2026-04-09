'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { m, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    Plane,
    MapPin,
    Clock,
    Shield,
    CreditCard,
    Smartphone,
    Users,
    CheckCircle,
    Car,
    Star,
    Phone,
    Monitor,
    UserCheck,
    DollarSign,
    ArrowRight,
    Globe,
    Headphones,
    Fingerprint,
    QrCode,
    Wifi,
    Navigation,
    MessageSquare,
    Banknote,
    BadgeCheck
} from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

// Animated Counter Component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(count, target, { duration: 2, ease: 'easeOut' });
        const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [count, rounded, target]);

    return <span>{displayValue.toLocaleString()}{suffix}</span>;
}

export default function AeropuertoPage() {
    const locale = useLocale();
    const t = useTranslations('airportPage');

    const services = [
        {
            icon: Smartphone,
            title: t('services.app.title'),
            description: t('services.app.description'),
            color: 'from-[#dd1828] to-[#182b33]',
        },
        {
            icon: Monitor,
            title: t('services.totem.title'),
            description: t('services.totem.description'),
            color: 'from-[#fff500] to-[#dd1828]',
        },
        {
            icon: UserCheck,
            title: t('services.counter.title'),
            description: t('services.counter.description'),
            color: 'from-[#182b33] to-[#030c13]',
        },
    ];

    const benefits = [
        {
            icon: DollarSign,
            title: t('benefits.rates.title'),
            description: t('benefits.rates.description'),
        },
        {
            icon: Shield,
            title: t('benefits.safe.title'),
            description: t('benefits.safe.description'),
        },
        {
            icon: Clock,
            title: t('benefits.available.title'),
            description: t('benefits.available.description'),
        },
        {
            icon: Globe,
            title: t('benefits.multilingual.title'),
            description: t('benefits.multilingual.description'),
        },
        {
            icon: Car,
            title: t('benefits.fleet.title'),
            description: t('benefits.fleet.description'),
        },
        {
            icon: Headphones,
            title: t('benefits.support.title'),
            description: t('benefits.support.description'),
        },
    ];

    const howItWorksSteps = [
        { step: '1', title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
        { step: '2', title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
        { step: '3', title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
        { step: '4', title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
    ];

    const totemFeatures = [
        { icon: QrCode, label: t('totemCounter.totemFeatures.qr') },
        { icon: Fingerprint, label: t('totemCounter.totemFeatures.touch') },
        { icon: Wifi, label: t('totemCounter.totemFeatures.wifi') },
        { icon: Navigation, label: t('totemCounter.totemFeatures.gps') },
    ];

    const counterFeatures = [
        { icon: MessageSquare, label: t('totemCounter.counterFeatures.personalized') },
        { icon: Globe, label: t('totemCounter.counterFeatures.languages') },
        { icon: Banknote, label: t('totemCounter.counterFeatures.payment') },
        { icon: BadgeCheck, label: t('totemCounter.counterFeatures.certified') },
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Breadcrumbs */}
                <div className="w-full bg-white">
                    <div className="container mx-auto max-w-[1200px] px-4 py-4">
                        <Breadcrumbs />
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] py-20 md:py-32 text-white">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <m.div
                            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-[#fff500] blur-[180px]"
                        />
                        <m.div
                            animate={{ y: [0, 20, 0], opacity: [0.1, 0.15, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                            className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#dd1828] blur-[180px]"
                        />

                        {/* Floating plane */}
                        <m.div
                            animate={{ x: [-100, 800], y: [100, -50] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-1/4 opacity-10"
                        >
                            <Plane className="w-20 h-20 text-white rotate-45" />
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
                                    <Plane className="w-4 h-4 text-[#fff500]" />
                                    <span className="text-sm font-bold text-[#fff500] tracking-wide">
                                        {t('hero.badge')}
                                    </span>
                                </m.div>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    <span className="text-white">{t('hero.title1')} </span>
                                    <span className="bg-gradient-to-r from-[#fff500] to-[#dd1828] bg-clip-text text-transparent">
                                        {t('hero.titleHighlight')}
                                    </span>
                                    <br />
                                    <span className="text-white">{t('hero.title2')}</span>
                                </h1>

                                {/* Subtitle */}
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    {t('hero.description')}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            href={`/${locale}/descargar-app`}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#dd1828] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                                        >
                                            <Smartphone className="w-5 h-5" />
                                            {t('hero.ctaApp')}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </m.div>
                                    <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            href={`/${locale}/contacto`}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                                        >
                                            <Phone className="w-5 h-5" />
                                            {t('hero.ctaContact')}
                                        </Link>
                                    </m.div>
                                </div>

                                {/* Trust indicators */}
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                                    {[
                                        { icon: Shield, text: t('hero.trust.legal') },
                                        { icon: Star, text: t('hero.trust.rating') },
                                        { icon: Users, text: t('hero.trust.trips') },
                                    ].map((item, index) => (
                                        <m.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                            className="flex items-center gap-2 text-white/70"
                                        >
                                            <item.icon className="w-5 h-5 text-[#fff500]" />
                                            <span className="text-sm font-medium">{item.text}</span>
                                        </m.div>
                                    ))}
                                </div>
                            </m.div>

                            {/* Right Visual - Airport Card */}
                            <m.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                                className="relative hidden lg:flex justify-center items-center"
                            >
                                <div className="relative">
                                    {/* Glowing background */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-[#fff500]/20 to-[#dd1828]/20 rounded-3xl blur-2xl" />

                                    {/* Main card */}
                                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dd1828] to-[#fff500] flex items-center justify-center shadow-lg">
                                                <Plane className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[#fff500] text-sm font-bold">{t('heroCard.title')}</p>
                                                <p className="text-white text-lg font-semibold">{t('heroCard.subtitle')}</p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="bg-white/5 rounded-2xl p-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-[#fff500]" />
                                                <div>
                                                    <p className="text-white/60 text-xs">{t('heroCard.locationLabel')}</p>
                                                    <p className="text-white font-medium">{t('heroCard.locationValue')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hours */}
                                        <div className="bg-white/5 rounded-2xl p-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-[#fff500]" />
                                                <div>
                                                    <p className="text-white/60 text-xs">{t('heroCard.scheduleLabel')}</p>
                                                    <p className="text-white font-medium">{t('heroCard.scheduleValue')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Services */}
                                        <div className="flex gap-3 mt-6">
                                            <div className="flex-1 bg-[#dd1828]/20 rounded-xl p-3 text-center">
                                                <Smartphone className="w-6 h-6 text-[#fff500] mx-auto mb-1" />
                                                <p className="text-white/80 text-xs">{t('heroCard.serviceApp')}</p>
                                            </div>
                                            <div className="flex-1 bg-[#dd1828]/20 rounded-xl p-3 text-center">
                                                <Monitor className="w-6 h-6 text-[#fff500] mx-auto mb-1" />
                                                <p className="text-white/80 text-xs">{t('heroCard.serviceTotem')}</p>
                                            </div>
                                            <div className="flex-1 bg-[#dd1828]/20 rounded-xl p-3 text-center">
                                                <UserCheck className="w-6 h-6 text-[#fff500] mx-auto mb-1" />
                                                <p className="text-white/80 text-xs">{t('heroCard.serviceCounter')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </div>
                    </div>
                </section>

                {/* Live Stats Counter Section */}
                <section className="w-full py-12 bg-[#dd1828] relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
                    </div>

                    <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: 50000, suffix: '+', label: t('stats.trips'), icon: Plane },
                                { value: 24, suffix: '/7', label: t('stats.availability'), icon: Clock },
                                { value: 4.9, suffix: '★', label: t('stats.rating'), icon: Star },
                                { value: 100, suffix: '%', label: t('stats.legal'), icon: Shield },
                            ].map((stat, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Interactive Totem & Counter Section */}
                <section className="w-full py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
                    <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#dd1828]/5 blur-[100px]" />
                    <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#fff500]/5 blur-[100px]" />

                    <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#182b33]/10 border border-[#182b33]/20 rounded-full mb-6">
                                <Monitor className="w-4 h-4 text-[#182b33]" />
                                <span className="text-sm font-bold text-[#182b33]">{t('totemCounter.badge')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
                                {t('totemCounter.title')}
                            </h2>
                            <p className="text-lg text-[#596065] max-w-2xl mx-auto">
                                {t('totemCounter.description')}
                            </p>
                        </m.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Totem Visualization */}
                            <m.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="relative"
                            >
                                <div className="relative mx-auto max-w-[280px]">
                                    {/* Totem Frame */}
                                    <div className="relative bg-gradient-to-b from-[#182b33] to-[#030c13] rounded-3xl p-4 shadow-2xl">
                                        {/* Top camera/sensor */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#182b33] border-2 border-[#fff500]" />

                                        {/* Screen */}
                                        <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden aspect-[9/16] relative">
                                            {/* Screen content */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#dd1828]/20 to-[#fff500]/10" />

                                            {/* Header */}
                                            <div className="relative p-4 bg-gradient-to-r from-[#dd1828] to-[#182b33]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                                        <Plane className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-bold">ETAXI</p>
                                                        <p className="text-white/70 text-[10px]">Aeropuerto SCL</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="relative p-4 space-y-3">
                                                <m.div
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-center py-6"
                                                >
                                                    <QrCode className="w-20 h-20 text-white/80 mx-auto" />
                                                    <p className="text-white/60 text-xs mt-2">{t('totemCounter.totemScreen.scanLabel')}</p>
                                                </m.div>

                                                <div className="space-y-2">
                                                    <m.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="bg-[#dd1828] text-white text-center py-3 rounded-xl text-sm font-bold cursor-pointer"
                                                    >
                                                        {t('totemCounter.totemScreen.requestButton')}
                                                    </m.div>
                                                    <m.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="bg-white/10 text-white text-center py-3 rounded-xl text-sm cursor-pointer"
                                                    >
                                                        {t('totemCounter.totemScreen.ratesButton')}
                                                    </m.div>
                                                </div>
                                            </div>

                                            {/* Animated scan line */}
                                            <m.div
                                                animate={{ y: [0, 400, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fff500] to-transparent opacity-50"
                                            />
                                        </div>

                                        {/* Base */}
                                        <div className="mt-4 flex justify-center">
                                            <div className="w-20 h-2 rounded-full bg-[#fff500]/30" />
                                        </div>
                                    </div>

                                    {/* Stand */}
                                    <div className="mx-auto w-16 h-20 bg-gradient-to-b from-[#182b33] to-[#596065] rounded-b-lg" />
                                    <div className="mx-auto w-32 h-4 bg-gradient-to-b from-[#596065] to-[#182b33] rounded-full" />
                                </div>

                                {/* Features around totem */}
                                <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-0 space-y-4">
                                    {totemFeatures.slice(0, 2).map((feature, index) => (
                                        <m.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100"
                                        >
                                            <feature.icon className="w-4 h-4 text-[#dd1828]" />
                                            <span className="text-xs font-medium text-[#182b33]">{feature.label}</span>
                                        </m.div>
                                    ))}
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:right-0 space-y-4">
                                    {totemFeatures.slice(2).map((feature, index) => (
                                        <m.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100"
                                        >
                                            <feature.icon className="w-4 h-4 text-[#dd1828]" />
                                            <span className="text-xs font-medium text-[#182b33]">{feature.label}</span>
                                        </m.div>
                                    ))}
                                </div>

                                <p className="text-center mt-8 text-[#182b33] font-bold text-lg">{t('totemCounter.totemTitle')}</p>
                                <p className="text-center text-[#596065] text-sm">{t('totemCounter.totemSubtitle')}</p>
                            </m.div>

                            {/* Counter Visualization */}
                            <m.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative"
                            >
                                {/* Counter desk visualization */}
                                <div className="relative mx-auto max-w-[400px]">
                                    {/* Counter desk */}
                                    <div className="bg-gradient-to-b from-[#182b33] to-[#030c13] rounded-t-3xl p-6 shadow-2xl">
                                        {/* Top sign */}
                                        <div className="mb-4 text-center">
                                            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#dd1828] to-[#fff500] rounded-full">
                                                <span className="text-white font-bold text-sm tracking-wide">{t('totemCounter.counterSign')}</span>
                                            </div>
                                        </div>

                                        {/* Counter screen/info */}
                                        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                                            {/* Agent avatar area */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <m.div
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#dd1828] to-[#fff500] flex items-center justify-center shadow-lg"
                                                >
                                                    <UserCheck className="w-10 h-10 text-white" />
                                                </m.div>
                                                <div>
                                                    <p className="text-white font-bold text-lg">{t('totemCounter.counterAgent')}</p>
                                                    <p className="text-white/60 text-sm">{t('totemCounter.counterService')}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                        <span className="text-green-400 text-xs">{t('totemCounter.counterAvailable')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info cards */}
                                            <div className="grid grid-cols-2 gap-3">
                                                {counterFeatures.map((feature, index) => (
                                                    <m.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors"
                                                    >
                                                        <feature.icon className="w-6 h-6 text-[#fff500] mx-auto mb-1" />
                                                        <p className="text-white/80 text-[10px]">{feature.label}</p>
                                                    </m.div>
                                                ))}
                                            </div>

                                            {/* Queue/ticket info */}
                                            <div className="mt-4 bg-[#dd1828]/20 rounded-xl p-4 text-center">
                                                <p className="text-white/60 text-xs mb-1">{t('totemCounter.counterWait')}</p>
                                                <p className="text-[#fff500] text-2xl font-bold">2-5 min</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Counter desk surface */}
                                    <div className="h-4 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-b shadow-lg" />
                                </div>

                                <p className="text-center mt-8 text-[#182b33] font-bold text-lg">{t('totemCounter.counterTitle')}</p>
                                <p className="text-center text-[#596065] text-sm">{t('totemCounter.counterSubtitle')}</p>
                            </m.div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="w-full py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#dd1828]/5 blur-[100px]" />

                    <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd1828]/10 border border-[#dd1828]/20 rounded-full mb-6">
                                <CreditCard className="w-4 h-4 text-[#dd1828]" />
                                <span className="text-sm font-bold text-[#dd1828]">{t('services.badge')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
                                {t('services.title')}
                            </h2>
                            <p className="text-lg text-[#596065] max-w-2xl mx-auto">
                                {t('services.description')}
                            </p>
                        </m.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#dd1828] transition-all duration-300 group"
                                >
                                    <m.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg mb-6`}
                                    >
                                        <service.icon className="w-10 h-10 text-white" />
                                    </m.div>
                                    <h3 className="text-2xl font-bold text-[#182b33] mb-3">{service.title}</h3>
                                    <p className="text-[#596065] leading-relaxed">{service.description}</p>

                                    <div className="mt-6 h-1 rounded-full bg-gray-200 overflow-hidden">
                                        <m.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.2 }}
                                            className={`h-full rounded-full bg-gradient-to-r ${service.color}`}
                                        />
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="w-full py-24 bg-gradient-to-br from-[#030c13] to-[#182b33] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <m.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-20 left-20 w-96 h-96 border border-[#fff500] rounded-full"
                        />
                    </div>

                    <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff500]/20 border border-[#fff500]/30 rounded-full mb-6">
                                <CheckCircle className="w-4 h-4 text-[#fff500]" />
                                <span className="text-sm font-bold text-[#fff500]">{t('howItWorks.badge')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {t('howItWorks.title')}
                            </h2>
                            <p className="text-lg text-white/80 max-w-2xl mx-auto">
                                {t('howItWorks.description')}
                            </p>
                        </m.div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {howItWorksSteps.map((step, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="relative"
                                >
                                    {/* Connector line */}
                                    {index < howItWorksSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#fff500] to-[#dd1828]" />
                                    )}

                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#fff500]/50 transition-colors relative">
                                        <m.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fff500] to-[#dd1828] flex items-center justify-center text-2xl font-bold text-[#182b33] shadow-lg mx-auto mb-4"
                                        >
                                            {step.step}
                                        </m.div>
                                        <h3 className="text-xl font-bold text-white mb-2 text-center">{step.title}</h3>
                                        <p className="text-white/70 text-sm text-center">{step.description}</p>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="w-full py-24 bg-white">
                    <div className="container mx-auto max-w-[1200px] px-4">
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd1828]/10 border border-[#dd1828]/20 rounded-full mb-6">
                                <Star className="w-4 h-4 text-[#dd1828]" />
                                <span className="text-sm font-bold text-[#dd1828]">{t('benefits.badge')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
                                {t('benefits.title')}
                            </h2>
                            <p className="text-lg text-[#596065] max-w-2xl mx-auto">
                                {t('benefits.description')}
                            </p>
                        </m.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#dd1828] transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <benefit.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-[#182b33] mb-2">{benefit.title}</h3>
                                            <p className="text-[#596065] text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="w-full py-20 bg-gradient-to-br from-[#dd1828] to-[#182b33] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <Plane className="absolute top-10 right-20 w-40 h-40 text-white rotate-12" />
                        <Plane className="absolute bottom-10 left-20 w-32 h-32 text-white -rotate-12" />
                    </div>

                    <div className="container mx-auto max-w-[900px] px-4 text-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                {t('cta.title')}
                            </h2>
                            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                                {t('cta.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={`/${locale}/descargar-app`}
                                        className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#dd1828] font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                                    >
                                        <Smartphone className="w-6 h-6" />
                                        {t('cta.button')}
                                    </Link>
                                </m.div>
                            </div>

                            <p className="mt-8 text-white/60 text-sm">
                                {t('cta.footer')}
                            </p>
                        </m.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
