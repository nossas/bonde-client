if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'account',
    getComponents (location, cb) {
      require.ensure([
        './account.connected',
        '../../redux/reducers/account'
      ], (require) => {
        const Account = require('./account.connected').default
        const account = require('../../redux/reducers/account').default
        injectAsyncReducer(store, 'account', account)
        cb(null, Account)
      })
    }
  }
}
