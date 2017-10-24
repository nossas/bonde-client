// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /communication
//
export default store => ({
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./container.js').default)
    })
  },
  
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./content').default(store)
      ])
    })
  }
})
