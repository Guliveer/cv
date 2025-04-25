import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: () => '🎓',

  fields: [
    defineField({ name: 'school', title: 'School / University', type: 'string', validation: (Rule) => Rule.required(),}),
    defineField({ name: 'degree', title: 'Degree', type: 'string' }),
    defineField({ name: 'field', title: 'Field of Study', type: 'string' }),
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
})