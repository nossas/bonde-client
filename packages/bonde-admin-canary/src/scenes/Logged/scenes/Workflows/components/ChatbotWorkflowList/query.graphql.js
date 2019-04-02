import gql from 'graphql-tag'


export default gql`
  query chatbotWorkflows($communityId: Int!) {
    chatbotWorkflows(communityId: $communityId) {
      edges {
        node {
          id,
          name,
          lastLevel,
          draft
        }
      }
    }
  }
`