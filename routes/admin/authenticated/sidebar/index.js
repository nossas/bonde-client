import { injectAsyncReducer } from '~client/store'
import { IsCommunitySelected } from '~routes/utils'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  onEnter: IsCommunitySelected(store),

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~client/mobrender/redux/reducers').default)
      callback(null, require('./container.connected').default)
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./account-edit').default(store),
        require('./activists').default(store),
        require('./blocks-create').default(store),
        require('./communication').default(store),
        require('./community-settings').default(store),
        require('./mobilizations-edit').default(store),
        require('./mobilizations-launch').default(store),
        require('./mobilizations-launch-end').default(store),
        require('./mobilizations-list').default(store),
        require('./mobilizations-new').default(store),
        require('./mobilizations-settings-analytics').default(store),
        require('./mobilizations-settings-basics').default(store),
        require('./mobilizations-settings-domain').default(store),
        require('./mobilizations-settings-metrics').default(store),
        require('./mobilizations-settings-sharing').default(store),
        require('./templates-choose').default(store),
        require('./templates-choose-custom').default(store),
        require('./templates-choose-global').default(store),
        require('./templates-create').default(store),
        require('./templates-list').default(store),
        require('./widgets-donation-settings').default(store),
        require('./widgets-form-settings').default(store),
        require('./widgets-pressure-settings').default(store)
      ])
    })
  }
})
