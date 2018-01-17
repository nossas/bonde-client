export default (state) => ({
  isLoaded: () => state.auth.isLoaded,
  getCredentials: () => state.auth.credentials,
  getUser: () => state.auth.user,
  getError: () => state.auth.error
})
