==== BASE ====
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~client/store'

export default store => ({
  path: '/',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      injectAsyncReducer(store, 'mobilizations', require('~client/mobrender/redux/reducers').default)
      cb(null, {
        component: require('./page.connected').default
      })
    })
  }
})
