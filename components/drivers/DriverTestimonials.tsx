'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function DriverTestimonials() {
  const t = useTranslations('driverPage.testimonials');

  const testimonials = [
    {
      name: t('testimonial1.name'),
      experience: t('testimonial1.experience'),
      city: t('testimonial1.city'),
      text: t('testimonial1.text'),
      rating: 5,
      color: 'from-[#dd1828] to-[#182b33]',
      bgColor: 'bg-[#dd1828]/5',
      borderColor: 'border-[#dd1828]/20',
    },
    {
      name: t('testimonial2.name'),
      experience: t('testimonial2.experience'),
      city: t('testimonial2.city'),
      text: t('testimonial2.text'),
      rating: 5,
      color: 'from-[#182b33] to-[#030c13]',
      bgColor: 'bg-[#182b33]/5',
      borderColor: 'border-[#182b33]/20',
    },
    {
      name: t('testimonial3.name'),
      experience: t('testimonial3.experience'),
      city: t('testimonial3.city'),
      text: t('testimonial3.text'),
      rating: 5,
      color: 'from-[#fff500] to-[#dd1828]',
      bgColor: 'bg-[#fff500]/10',
      borderColor: 'border-[#fff500]/30',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className={`${testimonial.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative border-2 ${testimonial.borderColor} hover:border-[#dd1828] group`}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#fff500] text-[#fff500]" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-[#182b33] leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-[#596065]/20 space-y-2">
                  <p className="font-bold text-[#182b33] text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#596065]">
                    {testimonial.experience}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-[#596065]">
                    <MapPin className="w-4 h-4" />
                    {testimonial.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
