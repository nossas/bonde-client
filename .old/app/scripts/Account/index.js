import createRoutes from './createRoutes'
import * as actions from './actions'
import reducers from './reducers'

export default {
  createRoutes,
  actions,
  reducers,
  requireLoginWrapper: (store, redirectUrl) => (nextState, transition) => {
    // Redirect to LOGIN when not user authenticated
    const { auth } = store.getState()
    if (!auth.user && redirectUrl) {
      transition.to(redirectUrl)
    }
  }
}
