import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /mobilizations/:mobilization_id/widgets/:widget_id/pressure
//
export default store => ({
  path: 'mobilizations/:mobilization_id/widgets/:widget_id/pressure',
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
        require('./email').default(store),
        require('./autofire').default(store),
        require('./finish').default(store)
      ])
    })
  }
})
