export const getCurrent = (state, ownProps) => {
  const { data, currentId } = state.community
  return data.filter(obj => obj.id === currentId)[0]
}
