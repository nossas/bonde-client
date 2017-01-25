export const donation = (mobilizationId, widgetId) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/donation`

export const donationFinish = (mobilizationId, widgetId) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/donation/finish`
