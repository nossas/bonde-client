import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  path: 'community',

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'community', require('~client/community/reducers').default)
      callback(null, require('./container').default)
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./domain').default(store),
        require('./domain-create').default(store),
        require('./info').default(store),
        require('./invite').default(store),
        require('./mailchimp').default(store),
        require('./recipient').default(store),
        require('./report').default(store),
        require('./twilio').default(store)
      ])
    })
  }
})
