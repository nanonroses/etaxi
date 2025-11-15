import { defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración General del Sitio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Sitio',
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
      name: 'primaryCtaLabel',
      title: 'Etiqueta CTA Principal',
      type: 'string',
      description: 'Texto del botón principal (ej: "Pedir Taxi")',
    },
    {
      name: 'secondaryCtaLabel',
      title: 'Etiqueta CTA Secundario',
      type: 'string',
      description: 'Texto del botón secundario (ej: "Descargar App")',
    },
  ],
});
