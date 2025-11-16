import { defineType } from 'sanity';

export default defineType({
  name: 'businessPage',
  title: 'Empresas & Gremios',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'heroTitle',
      title: 'Título Hero',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
      description: 'Título principal de la página (ej: "Transporte regulado para empresas y gremios")',
    },
    {
      name: 'heroSubtitle',
      title: 'Subtítulo Hero',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Subtítulo que explica la propuesta de valor',
    },

    // Enterprise Benefits
    {
      name: 'enterpriseBenefits',
      title: 'Beneficios para Empresas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(250),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      description: 'Lista de beneficios para empresas (máximo 4)',
    },

    // Guild Section
    {
      name: 'guildIntro',
      title: 'Introducción Gremios',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
      description: 'Párrafo introductorio para la sección de gremios',
    },
    {
      name: 'guildBenefits',
      title: 'Beneficios para Gremios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: 'body',
              title: 'Texto',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(250),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'body',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      description: 'Lista de beneficios para gremios (máximo 4)',
    },

    // CTA Section
    {
      name: 'ctaTitle',
      title: 'Título CTA',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      description: 'Título del llamado a la acción (ej: "Hablemos sobre tu operación")',
    },
    {
      name: 'ctaSubtitle',
      title: 'Subtítulo CTA',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
      description: 'Subtítulo del CTA que explica el siguiente paso',
    },
    {
      name: 'ctaButton',
      title: 'Texto Botón CTA',
      type: 'string',
      validation: (Rule) => Rule.max(30),
      description: 'Texto del botón principal (ej: "Agenda una reunión")',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroSubtitle',
    },
  },
});
