import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'DUK (Dazniausiai uzduodami klausimai)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Klausimas',
      type: 'string',
      description: 'Dazniausiai uzduodamas klausimas',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Atsakymas',
      type: 'text',
      description: 'Atsakymas i klausima',
      rows: 4,
      validation: (rule) => rule.required(),
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
      title: 'question',
    },
  },
})
