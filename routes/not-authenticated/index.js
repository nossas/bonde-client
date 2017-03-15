// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { showMobilizationPublicView, getDomain } from '~routes/utils'
import AccountSelectors from '~account/selectors'
import serverConfig from '~server/config'
import { injectAsyncReducer } from '~client/store'
import * as Paths from '~client/paths'

export default store => ({
  path: '/',

  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      if (showMobilizationPublicView(getDomain(store, serverConfig))) {
        injectAsyncReducer(store, 'mobilizations', require('~mobrender/redux/reducers').default)
        cb(null, {
          component: require('./custom-domain/page.connected').default
        })
      } else {
        cb(null, {
          component: require('./../authenticated/admin/mobilizations-list/page.connected').default,

          onEnter: (nextState, replace) => {
            const user = AccountSelectors(store.getState()).getUser()
            if (!user) {
              // Redirect for selection of community
              replace(Paths.login())
            }
          }
        })
      }
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./external').default(store)
      ])
    })
  }
})
