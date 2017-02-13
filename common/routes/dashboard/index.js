if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'account/dashboard',
    getComponents (location, cb) {
      require.ensure([
        './dashboard.connected',
        '../../redux/reducers/dashboard'
      ], (require) => {
        const Dashboard = require('./dashboard.connected').default
        const dashboard = require('../../redux/reducers/dashboard').default
        injectAsyncReducer(store, 'dashboard', dashboard)
        cb(null, Dashboard)
      })
    }
  }
}
