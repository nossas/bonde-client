import gql from 'graphql-tag'

export default gql`
  query tags ($tagType: String!) {
    allTags (condition: { tagType: $tagType }) {
      nodes {
	name,
	label
      }
    }
  }
`
