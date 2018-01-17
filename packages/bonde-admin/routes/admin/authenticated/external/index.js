// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./container.connected').default)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./bot').default(store),
        require('./community-list').default(store),
        require('./community-new').default(store)
      ])
    })
  }
})
