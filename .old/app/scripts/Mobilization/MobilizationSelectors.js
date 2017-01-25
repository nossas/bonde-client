export const getMobilization = (state, props = { params: { mobilization_id: null } }) => {
  const { params: { mobilization_id: mobilizationId } } = props

  const id = state.mobilization.list.currentId || parseInt(mobilizationId, 10)
  return getList(state).filter(mobilization => mobilization.id === id)[0]
}

export const getList = state => state.mobilization.list.data
