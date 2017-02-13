export const getCurrent = (state, ownProps) => {
  const { data, currentId } = state.community
  // @revert the "|| 1"
  return data.filter(c => c.id === (currentId || 1))[0]
}
