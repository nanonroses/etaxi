import { defineType } from 'sanity';

export default defineType({
  name: 'appDownload',
  title: 'Descarga de App',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Subtítulo',
      type: 'string',
    },
    {
      name: 'playStoreUrl',
      title: 'URL Play Store',
      type: 'url',
      description: 'Link a Google Play Store',
    },
    {
      name: 'appStoreUrl',
      title: 'URL App Store',
      type: 'url',
      description: 'Link a Apple App Store',
    },
    {
      name: 'qrImage',
      title: 'Imagen QR (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
});
