'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const WHATSAPP_NUMBER = '56962116017';

export function DriverLeadForm() {
  const t = useTranslations('driversPage.joinForm');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    hasTaxi: false,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir mensaje para WhatsApp
    const whatsappMessage = `*Solicitud de Conductor ETAXI*

*Nombre completo:* ${formData.fullName}
*Teléfono:* ${formData.phone}
*Email:* ${formData.email || 'No proporcionado'}
*Ciudad:* ${formData.city || 'No especificada'}
*¿Tiene taxi propio?:* ${formData.hasTaxi ? 'Sí' : 'No'}

*Notas adicionales:*
${formData.notes || 'Sin notas'}`;

    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <Card className="border-[hsl(var(--border))]">
      <CardHeader>
        <CardTitle className="text-2xl">
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre completo */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('fullNameLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t('fullNamePlaceholder')}
              className="w-full"
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('phoneLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="w-full"
            />
          </div>

          {/* Email (opcional) */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('emailLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className="w-full"
            />
          </div>

          {/* Ciudad */}
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('cityLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder={t('cityPlaceholder')}
              className="w-full"
            />
          </div>

          {/* ¿Tiene taxi propio? */}
          <div className="flex items-center space-x-3">
            <input
              id="hasTaxi"
              name="hasTaxi"
              type="checkbox"
              checked={formData.hasTaxi}
              onChange={handleChange}
              className="w-4 h-4 text-[hsl(var(--primary))] border-gray-300 rounded focus:ring-[hsl(var(--ring))]"
            />
            <label
              htmlFor="hasTaxi"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('hasTaxiLabel')}
            </label>
          </div>

          {/* Notas adicionales */}
          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('notesLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder={t('notesPlaceholder')}
              className="w-full"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {formData.notes.length}/500 caracteres
            </p>
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            className="w-full"
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
