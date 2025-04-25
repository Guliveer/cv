import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: () => '💼',

  fields: [

    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'Company URL',
      type: 'url',
    }),

    defineField({
      name: 'companyLogo',
      title: 'Company website Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: "MMMM YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: "MMMM YYYY",
      },
      description: "Leave empty if still ongoing"
    }),

    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
  preview: {
    select: {
      media: 'companyLogo',
      title: 'position',
      subtitle: 'company',
      description: 'startDate',
    },
  },
})