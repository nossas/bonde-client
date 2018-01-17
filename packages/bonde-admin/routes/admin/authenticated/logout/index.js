import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /logout
//
export default store => ({
  path: 'logout',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'auth', require('~client/account/redux/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
