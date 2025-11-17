'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Building2, Mail, Phone, User, MapPin, MessageSquare, Briefcase, Users } from 'lucide-react';

export function B2BContactForm() {
  const t = useTranslations('businessPage.contactForm');
  const [formData, setFormData] = useState({
    type: 'enterprise',
    companyName: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    employees: '',
    city: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/company-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          type: 'enterprise',
          companyName: '',
          contactName: '',
          position: '',
          email: '',
          phone: '',
          employees: '',
          city: '',
          message: '',
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white">
      <div className="container mx-auto max-w-[900px] px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F8D347]/20 rounded-full mb-4">
            <p className="text-sm font-semibold text-[#F8D347]">
              Contacto B2B
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/80">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Organization Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t('typeLabel')} *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
              >
                <option value="enterprise" className="text-[#0C1A2B]">{t('typeEnterprise')}</option>
                <option value="guild" className="text-[#0C1A2B]">{t('typeGuild')}</option>
                <option value="municipality" className="text-[#0C1A2B]">{t('typeMunicipality')}</option>
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                {t('companyNameLabel')} *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder={t('companyNamePlaceholder')}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
              />
            </div>

            {/* Contact Name and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {t('contactNameLabel')} *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder={t('contactNamePlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  {t('positionLabel')} *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder={t('positionPlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {t('emailLabel')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {t('phoneLabel')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('phonePlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
            </div>

            {/* Employees and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  {t('employeesLabel')}
                </label>
                <input
                  type="text"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  placeholder={t('employeesPlaceholder')}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {t('cityLabel')} *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t('cityPlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                {t('messageLabel')} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F8D347] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {status === 'sending' ? t('sending') : t('submitButton')}
            </Button>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
                <p className="text-green-300 font-semibold">{t('success')}</p>
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
                <p className="text-red-300 font-semibold">{t('error')}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
