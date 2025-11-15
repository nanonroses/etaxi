import { defineType } from 'sanity';

export default defineType({
  name: 'safetyPage',
  title: 'Página de Seguridad',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Introducción',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Secciones de Seguridad',
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
              description: 'Nombre del icono (ej: Shield, Activity, Users, FileCheck)',
            },
          ],
        },
      ],
    },
  ],
});
