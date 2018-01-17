// import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /bot
//
export default store => ({
  path: 'bot',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page').default)
    })
  }
})
