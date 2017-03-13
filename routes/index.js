// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~client/store'
import serverConfig from '~server/config'
import { showMobilizationPublicView } from '~routes/utils'

export default store => ({
  path: '/',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      const { sourceRequest: { host } } = store.getState()
      const domain = serverConfig.appDomain

      if (showMobilizationPublicView({ host, domain })) {
        injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
        injectAsyncReducer(store, 'blocks', require('~mobilizations/blocks/reducers').default)
        injectAsyncReducer(store, 'widgets', require('~mobilizations/widgets/reducers').default)
        cb(null, {
          component: require('./not-authenticated/custom-domain/page.connected').default
        })
      } else {
        cb(null, {
          component: require('./authenticated/sidebar/mobilizations-list/page.connected').default
        })
      }
    })
  },
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      const { sourceRequest: { host } } = store.getState()
      const domain = serverConfig.appDomain

      if (!showMobilizationPublicView({ host, domain })) {
        injectAsyncReducer(store, 'mobilizations', require('~client/mobrender/redux/reducers').default)
        callback(null, require('./authenticated/sidebar/container.connected').default)
      }
      callback(null, () => {})
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
