// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./background').default(store),
        require('./sidebar').default(store)
      ])
    })
  }
})
