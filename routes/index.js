// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { showMobilizationPublicView, getDomain } from '~routes/utils'
import AccountSelectors from '~client/account/redux/selectors'
import * as CommunitySelectors from '~client/community/selectors'
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
          component: require('./not-authenticated/custom-domain/page.connected').default
        })
      } else {
        cb(null, {
          component: require('./authenticated/admin/mobilizations-list/page.connected').default,

          onEnter: (nextState, replace) => {
            const user = AccountSelectors(store.getState()).getUser()
            const community = CommunitySelectors.getCurrent(store.getState())

            if (!community) {
              // Redirect for selection of community
              replace(Paths.list())
            }

            if (!user) {
              // Redirect for login
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
        require('./not-authenticated').default(store),
        require('./authenticated').default(store)
      ])
    })
  }
})
