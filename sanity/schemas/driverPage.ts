import { defineType } from 'sanity';

export default defineType({
  name: 'driverPage',
  title: 'Para Conductores',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'heroTitle',
      title: 'Título Hero',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
      description: 'Título principal (ej: "Conduce con una plataforma legal y transparente")',
    },
    {
      name: 'heroSubtitle',
      title: 'Subtítulo Hero',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Subtítulo explicando la propuesta de valor para conductores',
    },

    // Beneficios para conductores
    {
      name: 'benefits',
      title: 'Beneficios para conductores',
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
      description: 'Lista de beneficios para conductores (máximo 4)',
    },

    // Requisitos
    {
      name: 'requirementsIntro',
      title: 'Introducción Requisitos',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
      description: 'Párrafo introductorio para la sección de requisitos',
    },
    {
      name: 'requirements',
      title: 'Requisitos',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(6),
      description: 'Lista de requisitos principales (máximo 6)',
    },

    // Pasos para comenzar
    {
      name: 'stepsTitle',
      title: 'Título pasos',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      description: 'Título de la sección de pasos (ej: "Cómo empezar a trabajar con ETAXI")',
    },
    {
      name: 'steps',
      title: 'Pasos para comenzar',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5),
      description: 'Pasos secuenciales para comenzar a trabajar (máximo 5)',
    },

    // CTA Section
    {
      name: 'ctaTitle',
      title: 'Título CTA',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      description: 'Título del llamado a la acción (ej: "¿Eres conductor de taxi regulado?")',
    },
    {
      name: 'ctaSubtitle',
      title: 'Subtítulo CTA',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
      description: 'Subtítulo del CTA explicando el siguiente paso',
    },
    {
      name: 'ctaButton',
      title: 'Texto Botón CTA',
      type: 'string',
      validation: (Rule) => Rule.max(30),
      description: 'Texto del botón principal (ej: "Quiero postular")',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroSubtitle',
    },
  },
});
