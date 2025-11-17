'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function DriverFAQ() {
  const t = useTranslations('driverPage.faq');

  const faqs = [
    {
      question: t('q1.question'),
      answer: t('q1.answer'),
    },
    {
      question: t('q2.question'),
      answer: t('q2.answer'),
    },
    {
      question: t('q3.question'),
      answer: t('q3.answer'),
    },
    {
      question: t('q4.question'),
      answer: t('q4.answer'),
    },
    {
      question: t('q5.question'),
      answer: t('q5.answer'),
    },
    {
      question: t('q6.question'),
      answer: t('q6.answer'),
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto max-w-[900px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-3">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-[#0C1A2B] flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F8D347] flex items-center justify-center text-sm font-bold text-[#0C1A2B]">
                    ?
                  </span>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
