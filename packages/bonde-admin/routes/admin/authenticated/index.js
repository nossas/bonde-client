import { injectAsyncReducer } from '~client/store'
import { UserIsLogged } from '~routes/utils'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  onEnter: UserIsLogged(store),

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'auth', require('~client/account/redux/reducers').default)
      callback(null, require('./container').default)
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./external').default(store),
        require('./sidebar').default(store),
        require('./logout').default(store)
      ])
    })
  }
})
