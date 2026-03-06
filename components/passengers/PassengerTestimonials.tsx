'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star } from 'lucide-react';

export function PassengerTestimonials() {
  const t = useTranslations('passengerPage.testimonials');

  const testimonials = [
    {
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      city: t('testimonial1.city'),
      text: t('testimonial1.text'),
      rating: 5,
    },
    {
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
      city: t('testimonial2.city'),
      text: t('testimonial2.text'),
      rating: 5,
    },
    {
      name: t('testimonial3.name'),
      role: t('testimonial3.role'),
      city: t('testimonial3.city'),
      text: t('testimonial3.text'),
      rating: 5,
    },
    {
      name: t('testimonial4.name'),
      role: t('testimonial4.role'),
      city: t('testimonial4.city'),
      text: t('testimonial4.text'),
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347] relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-[#F8D347]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F8D347] text-[#F8D347]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground italic mb-6 relative z-10 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-[#0C1A2B]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} · {testimonial.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
