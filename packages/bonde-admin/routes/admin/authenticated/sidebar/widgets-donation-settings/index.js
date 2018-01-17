import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /mobilizations/:mobilization_id/widgets/:widget_id/donation
//
export default store => ({
  path: 'mobilizations/:mobilization_id/widgets/:widget_id/donation',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./adjustments/page.connected').default
      })
    })
  },
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~client/mobrender/redux/reducers').default)
      callback(null, require('./container.connected').default)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./autofire').default(store),
        require('./export').default(store),
        require('./finish').default(store),
        require('./donation').default(store)
      ])
    })
  }
})
