import { gql } from 'react-apollo'

export default gql`
  mutation updateTwilioConfiguration(
    $communityId: Int!
    $twilioAccountSid: String!
    $twilioAuthToken: String!
    $twilioNumber: String!
  ) {
    updateTwilioConfiguration(input: {
      config: {
        communityId: $communityId
        twilioAccountSid: $twilioAccountSid
        twilioAuthToken: $twilioAuthToken
        twilioNumber: $twilioNumber
      }
    }) {
      twilioConfiguration {
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
