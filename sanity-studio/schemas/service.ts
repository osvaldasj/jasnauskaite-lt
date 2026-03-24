import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Paslaugos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      description: 'Paslaugos pavadinimas',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Aprasymas',
      type: 'text',
      description: 'Trumpas paslaugos aprasymas',
      rows: 4,
    }),
    defineField({
      name: 'iconType',
      title: 'Ikonos tipas',
      type: 'string',
      description: 'Pasirink ikona, kuri bus rodoma prie paslaugos',
      options: {
        list: [
          {title: 'Reels', value: 'reels'},
          {title: 'Stories', value: 'stories'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'Kampanija', value: 'campaign'},
          {title: 'Ambasadorius', value: 'ambassador'},
          {title: 'Foto', value: 'photo'},
        ],
        layout: 'radio',
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
      title: 'title',
      subtitle: 'iconType',
    },
  },
})
