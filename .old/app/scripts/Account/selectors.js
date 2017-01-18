// Selector
export const isLoaded = (state, ownProps) => {
  return state.auth && state.auth.loaded
}

export const getUser = (state, ownProps) => {
  return state.auth.user
}
