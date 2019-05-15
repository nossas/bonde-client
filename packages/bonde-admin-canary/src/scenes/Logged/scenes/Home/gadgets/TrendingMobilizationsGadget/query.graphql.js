import gql from 'graphql-tag'

export default gql`
  query TrendingMobilizations($limit: Int) {
    trendingMobilizations(first: $limit) {
      nodes {
        id
        name
        goal
        facebookShareImage
        customDomain
        slug
        community {
          name
        }
      }
    }
  }
`
