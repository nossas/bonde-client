// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

export default store => ({
  path: '/',
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
      injectAsyncReducer(store, 'blocks', require('~mobilizations/blocks/reducers').default)
      injectAsyncReducer(store, 'widgets', require('~mobilizations/widgets/reducers').default)
      cb(null, {
        component: require('./page.connected').default
      })
    })
  }
})
