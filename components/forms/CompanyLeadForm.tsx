'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function CompanyLeadForm() {
  const t = useTranslations('businessPage.contactForm');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employees: '',
    city: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/company-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          employees: formData.employees ? parseInt(formData.employees) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      setMessage({ type: 'success', text: data.message || t('success') });
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        employees: '',
        city: '',
        message: '',
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre de empresa */}
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('companyNameLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder={t('companyNamePlaceholder')}
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Nombre de contacto */}
          <div className="space-y-2">
            <label
              htmlFor="contactName"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('contactNameLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="contactName"
              name="contactName"
              type="text"
              required
              value={formData.contactName}
              onChange={handleChange}
              placeholder={t('contactNamePlaceholder')}
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('emailLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
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
              {t('phoneLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="w-full"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Número de empleados */}
            <div className="space-y-2">
              <label
                htmlFor="employees"
                className="text-sm font-medium text-[hsl(var(--foreground))]"
              >
                {t('employeesLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
              </label>
              <Input
                id="employees"
                name="employees"
                type="number"
                min="1"
                value={formData.employees}
                onChange={handleChange}
                placeholder={t('employeesPlaceholder')}
                className="w-full"
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {t('messageLabel')} <span className="text-muted-foreground text-xs">(opcional)</span>
            </label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t('messagePlaceholder')}
              className="w-full"
              disabled={loading}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/1000 caracteres
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
        </form>
      </CardContent>
    </Card>
  );
}
