// sanity/schemas/featuredContent.js
import SongSelector from '../components/SongSelector'

export default {
  name: 'featuredContent',
  type: 'document',
  title: 'Featured Content',
  fields: [
    {
      name: 'songs',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Songs',
      components: {
        input: (props) => <SongSelector {...props} type="songs" />,
      },
    },
    {
      name: 'artists',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Artists',
      components: {
        input: (props) => <SongSelector {...props} type="artists" />,
      },
    },
    {
      name: 'albums',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Albums',
      components: {
        input: (props) => <SongSelector {...props} type="albums" />,
      },
    },
  ],
}
