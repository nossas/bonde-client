const prefix = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/matches${path}`

export const matchChoicesMobilizationWidget = (...args) =>
  prefix(...args, '/choices')

export const matchGoalsMobilizationWidget = (...args) =>
  prefix(...args, '/goals')

export const matchWidgetFinish = (...args) =>
  prefix(...args, '/finish')

export const shareMatchWrapper = (widgetId, matchId) =>
  `/widgets/${widgetId}/matches/${matchId}/share`
