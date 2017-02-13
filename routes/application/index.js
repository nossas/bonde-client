// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

export default store => ({
  path: '/',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
      callback(null, require('./container.connected').default)
    })
  },
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./mobilizations-list/page.connected').default
      })
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./mobilizations-edit').default(store),
        require('./mobilizations-list').default(store),
        require('./mobilizations-new').default(store),
        require('./mobilizations-settings-analytics').default(store),
        require('./mobilizations-settings-basics').default(store),
        require('./mobilizations-settings-domain').default(store),
        require('./mobilizations-settings-sharing').default(store),
        require('./templates-choose').default(store),
        require('./templates-choose-custom').default(store),
        require('./templates-choose-global').default(store),
        require('./templates-create').default(store),
        require('./templates-list').default(store),

        require('~common/routes/not-found').default
      ])
    })
  }
})
