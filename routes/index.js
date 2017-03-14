// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  path: '/',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./not-authenticated').default(store),
        require('./authenticated').default(store)
      ])
    })
  }
})
