import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Atsiliepimai',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Citata',
      type: 'text',
      description: 'Kliento atsiliepimo tekstas',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autorius',
      type: 'string',
      description: 'Kas parasė atsiliepima',
    }),
    defineField({
      name: 'role',
      title: 'Pareigos',
      type: 'string',
      description: 'Autoriaus pareigos (pvz.: Marketing Manager)',
    }),
    defineField({
      name: 'company',
      title: 'Imone',
      type: 'string',
      description: 'Imones pavadinimas',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Nuotrauka',
      type: 'image',
      description: 'Autoriaus nuotrauka (nebūtina)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Rikiavimo eile',
      type: 'number',
      description: 'Mazesnis skaicius = rodomas pirmas',
    }),
  ],
  orderings: [
    {
      title: 'Rikiavimo eile',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'author',
      media: 'avatar',
    },
  },
})
