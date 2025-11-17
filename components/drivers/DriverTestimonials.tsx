'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star, MapPin } from 'lucide-react';

export function DriverTestimonials() {
  const t = useTranslations('driverPage.testimonials');

  const testimonials = [
    {
      name: t('testimonial1.name'),
      experience: t('testimonial1.experience'),
      city: t('testimonial1.city'),
      text: t('testimonial1.text'),
      rating: 5,
    },
    {
      name: t('testimonial2.name'),
      experience: t('testimonial2.experience'),
      city: t('testimonial2.city'),
      text: t('testimonial2.text'),
      rating: 5,
    },
    {
      name: t('testimonial3.name'),
      experience: t('testimonial3.experience'),
      city: t('testimonial3.city'),
      text: t('testimonial3.text'),
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-3">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative border-2 border-gray-100"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 rounded-full bg-[#F8D347] flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-[#0C1A2B]" />
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <p className="font-bold text-[#0C1A2B] text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.experience}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {testimonial.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
