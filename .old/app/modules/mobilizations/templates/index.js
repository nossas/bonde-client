import { combineReducers } from 'redux'
import * as actionCreators from './action-creators'

import { reducer as filterableReducer } from '../../../components/FilterableSearchBar'
import { reducer as selectableReducer } from '../../../components/SelectableList'

import templatesReducer from './reducers'

export default {
  actionCreators,
  reducers: combineReducers(
    {
      list: templatesReducer,
      filterable: filterableReducer,
      selectable: selectableReducer
    }
  ),
}
