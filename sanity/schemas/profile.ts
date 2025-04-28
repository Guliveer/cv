import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: () => '👤',

  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required(), }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({ name: 'email', title: 'Contact Email', type: 'string', validation: (Rule) => Rule.email() }),

    defineField({ name: 'birthday', title: 'Birthday', type: 'date', options: { dateFormat: 'DD-MM-YYYY' } }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'city', title: 'City', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),

    defineField({ name: 'bio', title: 'Bio', type: 'text' }),

    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            { name: 'type', title: 'Type', type: 'string', options: {
              list: [
                'Website',
                'GitHub',
                'LinkedIn',
                'Other',
              ]},
            validation: (Rule) => Rule.required()
            },
            { name: 'name', title: 'Name', type: 'string'},
            { name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'prof',
              title: 'Proficiency',
              type: 'string',
              options: {
                list: ['Beginner', 'Intermediate', 'Advanced', 'Native']
              }
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'prof',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      }
    }),

  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      description: 'bio',
    },
  },
})