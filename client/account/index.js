import reducers from './reducers'
import selectors from './selectors'
import * as actionTypes from './action-types'
import * as actions from './action-creators'

module.exports = {
  actionTypes,
  actions,
  reducers,
  selectors
}

// import createRoutes from './createRoutes'
// import * as actions from './actions'
// import * as selectors from './selectors'
// import reducers from './reducers'
//
// export default {
//   createRoutes,
//   actions,
//   reducers,
//   selectors,
//   requireLoginWrapper: (store, redirectUrl) => (nextState, transition) => {
//     // Redirect to LOGIN when not user authenticated
//     const { auth } = store.getState()
//     if (!auth.user && redirectUrl) {
//       transition.to(redirectUrl)
//     }
//   }
// }
