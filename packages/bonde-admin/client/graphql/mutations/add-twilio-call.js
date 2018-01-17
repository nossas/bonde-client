import { gql } from 'react-apollo'

export default gql`
  mutation addTwilioCall(
    $widgetId: Int!
    $from: String!
    $to: String!
  ){
    addTwilioCall(input: {
      call: {
        widgetId: $widgetId
        from: $from
        to: $to
      }
    }) {
      twilioCall {
        id
        widgetId
        activistId
        twilioAccountSid
        twilioCallSid
        from
        to
        data
        createdAt
        updatedAt
      }
    }
  }
`
