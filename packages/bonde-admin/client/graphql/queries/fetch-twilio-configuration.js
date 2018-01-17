import { gql } from 'react-apollo'

export default gql`
  query fetchTwilioConfiguration($communityId: Int!) {
    configs: allTwilioConfigurations(condition: {
      communityId: $communityId
    }) {
      list: nodes {
        id
        communityId
        twilioAccountSid
        twilioAuthToken
        twilioNumber
        createdAt
        updatedAt
      }
    }
  }
`
