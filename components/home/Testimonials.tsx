'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: t('items.passenger1.name'),
      role: t('items.passenger1.role'),
      text: t('items.passenger1.text'),
      rating: 5,
      verified: true,
    },
    {
      name: t('items.passenger2.name'),
      role: t('items.passenger2.role'),
      text: t('items.passenger2.text'),
      rating: 5,
      verified: true,
    },
    {
      name: t('items.driver1.name'),
      role: t('items.driver1.role'),
      text: t('items.driver1.text'),
      rating: 5,
      verified: true,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#dd1828]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#182b33]/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/10 text-[#182b33] font-medium mb-6"
          >
            <Quote className="w-4 h-4" />
            <span className="text-sm">Testimonios Verificados</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lo que dicen nuestros usuarios y conductores
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={previous}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#182b33] group-hover:text-[#dd1828]" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#182b33] group-hover:text-[#dd1828]" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="h-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#dd1828]/5 to-transparent rounded-full blur-2xl" />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center shadow-lg">
                        <Quote className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      {testimonials[currentIndex].verified && (
                        <span className="ml-2 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                          ✓ Viaje Verificado
                        </span>
                      )}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="flex-1 mb-8">
                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-[#182b33]">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-[#dd1828] to-[#182b33] rounded-full'
                    : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200"
        >
          {[
            { value: '4.8/5.0', label: 'Rating Promedio' },
            { value: '15,000+', label: 'Viajes Completados' },
            { value: '98%', label: 'Satisfacción' },
            { value: '500+', label: 'Conductores Activos' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#182b33] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
