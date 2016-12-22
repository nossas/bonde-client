if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'venues/:venueId/events/:eventId',
    getComponents (location, cb) {
      require.ensure([
        './event.connected',
        '../../redux/reducers/event'
      ], (require) => {
        const Event = require('./event.connected').default
        const event = require('../../redux/reducers/event').default
        injectAsyncReducer(store, 'event', event)
        cb(null, Event)
      })
    }
  }
}
