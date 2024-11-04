import {defineField, defineType} from 'sanity'

export default {
  name: 'highlight',
  title: 'Highlight',
  type: 'document',
  fields: [
    {
      name: 'background',
      title: 'background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
    },

    {
      name: 'header',
      title: 'Header',
      type: 'string',
    },
    {
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
    },
    {
      name: 'highlightIDs',
      title: 'Highlight IDs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'name',
              type: 'string',
            },
            {
              name: 'id',
              title: 'ID',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
