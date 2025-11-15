import { defineType } from 'sanity';

export default defineType({
  name: 'compliancePage',
  title: 'Página de Cumplimiento Normativo',
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
      name: 'lawMention',
      title: 'Mención Legal',
      type: 'text',
      rows: 3,
      description: 'Texto mencionando Ley 21.553 y Decreto 212 en lenguaje simple',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'extraNotes',
      title: 'Notas Adicionales',
      type: 'text',
      rows: 5,
      description: 'Información adicional sobre cumplimiento',
    },
    {
      name: 'regulations',
      title: 'Regulaciones',
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
              description: 'Nombre del icono (ej: Scale, FileCheck, MapPin, IdCard)',
            },
          ],
        },
      ],
    },
  ],
});
