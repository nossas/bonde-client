import { combineReducers } from 'redux'

import * as selectors from './selectors'
import * as actionCreators from './action-creators'

import mobilizationReducers from './reducers'
import { reducers as templateReducers } from './templates'

export default {
  selectors,
  reducers: combineReducers({
    list: mobilizationReducers,
    templates: templateReducers
  }),
  actionCreators
}
