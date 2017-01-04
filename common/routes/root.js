// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/app'
import Home from '../components/home'

export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./new-event').default(store),
          require('./dashboard').default(store),
          require('./event').default(store),
          require('./account').default(store),
          require('./login').default,
          require('./not-found').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }

  return root
}
