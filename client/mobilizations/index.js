import { combineReducers } from 'redux'

import routes from './routes'
import * as selectors from './selectors'
import * as actionCreators from './action-creators'

import mobilizationReducers from './reducers'
import templateReducers from './templates/reducers'

export default {
  selectors,
  reducers: combineReducers({
    list: mobilizationReducers,
    templates: templateReducers
  }),
  actionCreators,
  routes
}
