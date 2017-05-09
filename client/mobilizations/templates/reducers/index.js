import { combineReducers } from 'redux'

import list from '~mobilizations/templates/reducers/list'
import filterable from '~client/components/filterable-search-bar/reducers'
import selectable from '~client/components/selectable-list/reducers'

export default combineReducers({
  list,
  filterable,
  selectable
})
