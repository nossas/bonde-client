export const getMobilization = (state, props = { params: { mobilization_id: null } }) => {
  const { mobilization: { data: mobilizations, currentId } } = state
  const { params: { mobilization_id: mobilizationId } } = props

  const id = currentId ? currentId : parseInt(mobilizationId, 10)
  return mobilizations.filter(mobilization => mobilization.id === id)[0]
}