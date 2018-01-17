import { gql } from 'react-apollo'

export default gql`
  query fetchDonationGoalStats($widgetId: Int!) {
    data: getWidgetDonationStats(widgetId: $widgetId)
  }
`
