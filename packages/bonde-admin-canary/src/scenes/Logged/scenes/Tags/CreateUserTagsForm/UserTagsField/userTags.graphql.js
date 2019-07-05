import gql from 'graphql-tag'

export default gql`
  query UserTags {
    allTags (condition: { tagType: "user" }) {
      nodes {
        name,
        label
      }
    }
  }
`
