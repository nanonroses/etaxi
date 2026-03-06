'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WHATSAPP_NUMBER = '56962116017';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir mensaje para WhatsApp
    const typeLabels: Record<string, string> = {
      general: 'Consulta General',
      support: 'Soporte',
      business: 'Negocios',
    };

    const whatsappMessage = `*Nuevo mensaje de contacto ETAXI*

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone || 'No proporcionado'}
*Tipo:* ${typeLabels[formData.type] || formData.type}

*Mensaje:*
${formData.message}`;

    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{useTranslations('contact')('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2"
            >
              {t('name')}
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('name')}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2"
            >
              {t('email')}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              spellCheck={false}
              value={formData.email}
              onChange={handleChange}
              placeholder={t('email')}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2"
            >
              {t('phone')}
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phone')}
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2"
            >
              {t('type')}
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
            >
              <option value="general">{useTranslations('contact.types')('general')}</option>
              <option value="support">{useTranslations('contact.types')('support')}</option>
              <option value="business">{useTranslations('contact.types')('business')}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2"
            >
              {t('message')}
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={t('message')}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            {t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
