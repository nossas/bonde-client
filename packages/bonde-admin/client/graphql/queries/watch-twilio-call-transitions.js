import { gql } from 'react-apollo'

export default gql`
  query watchTwilioCallTransitions($widgetId: Int! $from: String!) {
    watchTwilioCallTransitions(call: {
      widgetId: $widgetId
      from: $from
    }) {
      widgetId
      activistId
      twilioCallId
      twilioCallAccountSid
      twilioCallCallSid
      twilioCallFrom
      twilioCallTo
      twilioCallTransitionId
      twilioCallTransitionSequenceNumber
      twilioCallTransitionStatus
      twilioCallTransitionCallDuration
      twilioCallTransitionCreatedAt
      twilioCallTransitionUpdatedAt
    }
  }
`
