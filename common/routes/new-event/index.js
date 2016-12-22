if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'account/dashboard/newevent/:id',
    getComponents (location, cb) {
      require.ensure([
        './new-event.connected',
        '../../redux/reducers/new-event'
      ], (require) => {
        const NewEvent = require('./new-event.connected').default
        const newEvent = require('../../redux/reducers/new-event').default
        injectAsyncReducer(store, 'newEvent', newEvent)
        cb(null, NewEvent)
      })
    }
  }
}
