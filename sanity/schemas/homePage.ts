import { defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Título del Hero',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Subtítulo del Hero',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icono',
              type: 'string',
              description: 'Nombre del icono de lucide-react (ej: Shield, DollarSign, FileCheck, Car)',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'safetyIntro',
      title: 'Introducción de Seguridad',
      type: 'text',
      rows: 3,
      description: 'Texto que acompaña la sección de características de seguridad',
    },
  ],
});
