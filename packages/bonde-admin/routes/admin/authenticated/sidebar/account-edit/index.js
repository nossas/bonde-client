import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /account/edit
//
export default store => ({
  path: 'account/edit',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'auth', require('~client/account/redux/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
