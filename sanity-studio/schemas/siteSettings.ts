import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Svetaines nustatymai',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vardas',
      type: 'string',
      description: 'Rodomas vardas svetaineje',
    }),
    defineField({
      name: 'tagline',
      title: 'Soluganas',
      type: 'string',
      description: 'Trumpas soluganas po vardu',
    }),
    defineField({
      name: 'bio',
      title: 'Biografija',
      type: 'text',
      description: 'Trumpa biografija "Apie mane" sekcijai',
      rows: 6,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profilio nuotrauka',
      type: 'image',
      description: 'Pagrindinė profilio nuotrauka',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero video nuoroda',
      type: 'url',
      description: 'Video nuoroda hero sekcijai (nebūtina, ateities funkcijai)',
    }),
    defineField({
      name: 'stats',
      title: 'Statistikos',
      type: 'array',
      description: 'Svarbiausios statistikos (pvz.: 200K+ followers)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Pavadinimas',
              type: 'string',
              description: 'Pvz.: Instagram followers',
            }),
            defineField({
              name: 'value',
              title: 'Reiksme',
              type: 'string',
              description: 'Pvz.: 200K+',
            }),
            defineField({
              name: 'suffix',
              title: 'Priesdelis',
              type: 'string',
              description: 'Pvz.: + arba % (nebūtinas)',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Socialiniai tinklai',
      type: 'array',
      description: 'Nuorodos i socialinius tinklus',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platforma',
              type: 'string',
              description: 'Pvz.: Instagram, TikTok, YouTube',
            }),
            defineField({
              name: 'url',
              title: 'Nuoroda',
              type: 'url',
            }),
            defineField({
              name: 'handle',
              title: 'Vartotojo vardas',
              type: 'string',
              description: 'Pvz.: @jasnauskaite',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'handle',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontaktinis el. pastas',
      type: 'string',
      description: 'El. pastas bendradarbiavimui',
    }),
    defineField({
      name: 'clients',
      title: 'Klientai / Brendai',
      type: 'array',
      description: 'Brendai su kuriais dirbta (logo juostai)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Pavadinimas',
              type: 'string',
              description: 'Brendo pavadinimas',
            }),
            defineField({
              name: 'longterm',
              title: 'Ilgalaikis partneris?',
              type: 'boolean',
              description: 'Ar tai ilgalaikis partneris?',
              initialValue: false,
            }),
            defineField({
              name: 'logo',
              title: 'Logotipas',
              type: 'image',
              description: 'Brendo logotipas (nebūtinas)',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'longterm',
              media: 'logo',
            },
            prepare({title, subtitle, media}) {
              return {
                title,
                subtitle: subtitle ? 'Ilgalaikis partneris' : 'Klientas',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Svetaines nustatymai',
      }
    },
  },
})
