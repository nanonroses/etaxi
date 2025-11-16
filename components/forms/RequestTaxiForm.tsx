'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function RequestTaxiForm() {
  const t = useTranslations('requestTaxiPage.form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupAddress: '',
    dropoffAddress: '',
    when: 'ahora',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/ride-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      setMessage({ type: 'success', text: data.message || t('success') });
      setFormData({
        name: '',
        phone: '',
        email: '',
        pickupAddress: '',
        dropoffAddress: '',
        when: 'ahora',
        notes: '',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : t('error')
      });
    } finally {
      setLoading(false);
    }
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
    <Card className="border-[hsl(var(--border))]">
      <CardHeader>
        <CardTitle className="text-2xl">
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('nameLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              className="w-full"
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {/* Dirección de origen */}
          <div className="space-y-2">
            <label
              htmlFor="pickupAddress"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('originLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="pickupAddress"
              name="pickupAddress"
              type="text"
              required
              value={formData.pickupAddress}
              onChange={handleChange}
              placeholder={t('originPlaceholder')}
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Dirección de destino (opcional) */}
          <div className="space-y-2">
            <label
              htmlFor="dropoffAddress"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('destinationLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Input
              id="dropoffAddress"
              name="dropoffAddress"
              type="text"
              value={formData.dropoffAddress}
              onChange={handleChange}
              placeholder={t('destinationPlaceholder')}
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Cuándo */}
          <div className="space-y-2">
            <label
              htmlFor="when"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('whenLabel')}
            </label>
            <select
              id="when"
              name="when"
              value={formData.when}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
              disabled={loading}
            >
              <option value="ahora">{t('whenNow')}</option>
              <option value="15min">{t('when15min')}</option>
              <option value="30min">{t('when30min')}</option>
              <option value="1hora">{t('when1hour')}</option>
            </select>
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
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder={t('notesPlaceholder')}
              className="w-full"
              disabled={loading}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {formData.notes.length}/500 caracteres
            </p>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? t('sending') : t('submitButton')}
          </Button>

          {/* Note */}
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center mt-4">
            {t('note')}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
