// import { showMobilizationPublicView, getDomain } from '~routes/utils'
// import serverConfig from '~server/config'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

// const whitelistedPublicRoutes = [
//   /^\/subscriptions\/\d+\/edit$/ // /subscriptions/:id/edit
// ]

export default store => ({
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      // const { sourceRequest: { url } } = store.getState()
      // const isPublicView = showMobilizationPublicView(getDomain(store, serverConfig))
      // const isPublicWhitelisted = whitelistedPublicRoutes.some(regex => regex.test(url.pathname))

      // if (isPublicView || isPublicWhitelisted) {
      //   cb(null, [
      //     require('./public').default(store)
      //   ])
      // } else {
      cb(null, [
        require('./admin').default(store)
      ])
      // }
    })
  }
})
