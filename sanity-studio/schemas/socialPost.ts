import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'socialPost',
  title: 'Socialiniai irasai',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platforma',
      type: 'string',
      description: 'Kurioje platformoje publikuota',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'TikTok', value: 'tiktok'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'postUrl',
      title: 'Iraso nuoroda',
      type: 'url',
      description: 'Nuoroda i originalu irasa',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniatiura',
      type: 'image',
      description: 'Iraso cover nuotrauka',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Aprasymas',
      type: 'text',
      description: 'Iraso aprasymas (nebūtinas)',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikavimo data',
      type: 'datetime',
      description: 'Kada buvo publikuota',
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
      title: 'Publikavimo data',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Rikiavimo eile',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'caption',
      media: 'thumbnail',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Be platformos',
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media,
      }
    },
  },
})
