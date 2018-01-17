import { gql } from 'react-apollo'

export default gql`
  query CountTwilioCallsByWidget($widgetId: Int!) {
    allTwilioCalls(condition: {
      widgetId: $widgetId
    }) {
      totalCount
    }
  }
`
