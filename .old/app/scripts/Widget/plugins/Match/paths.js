export const matchChoicesMobilizationWidget = (mobilization_id, widget_id) => {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/matches/choices`
}

export const matchGoalsMobilizationWidget = (mobilization_id, widget_id) => {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/matches/goals`
}

export const shareMatchWrapper = (widget_id, match_id) => {
  return `/widgets/${widget_id}/matches/${match_id}/share`
}
