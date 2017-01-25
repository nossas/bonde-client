export const getCurrent = (state, ownProps) => {
  const { data, currentId } = state.community
  return data.filter(c => c.id === currentId)[0]
}
