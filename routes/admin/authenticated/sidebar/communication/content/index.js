// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /communication
//
export default store => ({
  path: 'communication',
  
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page.connected.js').default)
    })
  }
})
