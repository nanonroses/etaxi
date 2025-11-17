'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function DriverFAQ() {
  const t = useTranslations('driverPage.faq');

  const faqs = [
    {
      question: t('q1.question'),
      answer: t('q1.answer'),
      color: 'from-[#dd1828] to-[#182b33]',
    },
    {
      question: t('q2.question'),
      answer: t('q2.answer'),
      color: 'from-[#182b33] to-[#030c13]',
    },
    {
      question: t('q3.question'),
      answer: t('q3.answer'),
      color: 'from-[#fff500] to-[#dd1828]',
    },
    {
      question: t('q4.question'),
      answer: t('q4.answer'),
      color: 'from-[#dd1828] to-[#596065]',
    },
    {
      question: t('q5.question'),
      answer: t('q5.answer'),
      color: 'from-[#182b33] to-[#596065]',
    },
    {
      question: t('q6.question'),
      answer: t('q6.answer'),
      color: 'from-[#dd1828] to-[#182b33]',
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto max-w-[900px] px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
              {t('title')}
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
            >
              <Card className="border-2 border-[#596065]/20 hover:border-[#dd1828] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-lg text-[#182b33] flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${faq.color} flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      ?
                    </span>
                    <span className="pt-0.5">{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#596065] leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
