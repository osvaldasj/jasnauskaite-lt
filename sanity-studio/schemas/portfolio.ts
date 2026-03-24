import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      description: 'Projekto pavadinimas',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL dalis (generuojama is pavadinimo)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'type',
      title: 'Bendradarbiavimo tipas',
      type: 'string',
      options: {
        list: [
          {title: 'Ilgalaikis partneris', value: 'Ilgalaikis partneris'},
          {title: 'Kampanija', value: 'Kampanija'},
          {title: 'Vienkartinis', value: 'Vienkartinis'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'client',
      title: 'Klientas / Brendas',
      type: 'string',
      description: 'Brendo pavadinimas',
    }),
    defineField({
      name: 'image',
      title: 'Nuotrauka',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video nuoroda',
      type: 'url',
      description: 'Nuoroda i video (nebūtina)',
    }),
    defineField({
      name: 'description',
      title: 'Aprasymas',
      type: 'text',
      description: 'Trumpas projekto aprasymas',
      rows: 4,
    }),
    defineField({
      name: 'stats',
      title: 'Statistika',
      type: 'object',
      fields: [
        defineField({
          name: 'reach',
          title: 'Pasiekiamumas (Reach)',
          type: 'string',
          description: 'Pvz.: 150K',
        }),
        defineField({
          name: 'engagement',
          title: 'Isitraukimas (Engagement)',
          type: 'string',
          description: 'Pvz.: 8.5%',
        }),
        defineField({
          name: 'views',
          title: 'Perziuros (Views)',
          type: 'string',
          description: 'Pvz.: 500K',
        }),
      ],
    }),
    defineField({
      name: 'longterm',
      title: 'Ilgalaikis partneris?',
      type: 'boolean',
      description: 'Ar tai ilgalaikio bendradarbiavimo dalis?',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Rikiavimo eile',
      type: 'number',
      description: 'Mazesnis skaicius = rodomas pirmas',
    }),
    defineField({
      name: 'featured',
      title: 'Rodyti pagrindiniame?',
      type: 'boolean',
      description: 'Ar rodyti pagrindiniame puslapyje kaip isskirtini?',
      initialValue: false,
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
      subtitle: 'client',
      media: 'image',
    },
  },
})
