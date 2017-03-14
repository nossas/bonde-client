// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import AccountSelectors from '~account/selectors'
import * as Paths from '~client/paths'
// import { injectAsyncReducer } from '~client/store'
// import { showMobilizationPublicView, getDomain } from '~routes/utils'

export default store => ({
  path: '/',

  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./admin/mobilizations-list/page.connected').default
      })
    })
  },

  onEnter (nextState, replace) {
    const user = AccountSelectors(store.getState()).getUser()
    if (!user) {
      // Redirect for selection of community
      replace(Paths.login())
    }
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./external').default(store),
        require('./admin').default(store)
      ])
    })
  }
})
