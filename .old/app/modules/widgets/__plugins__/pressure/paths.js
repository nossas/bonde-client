const makePressureWidget = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/pressure${path}`

export const formPressureWidget = (mid, wid) => makePressureWidget(mid, wid, '/form')
export const emailPressureWidget = (mid, wid) => makePressureWidget(mid, wid, '/email')
export const finishPressureWidget = (mid, wid) => makePressureWidget(mid, wid, '/finish')
