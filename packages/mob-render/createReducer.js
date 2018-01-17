import { combineReducers } from 'redux'
// Thirdy apps
import { Reducer as MobilizationReducer } from './webviewer/webviewer'
import { reducer as intlReducer } from './intlReducer'
import apolloClient from './apolloClient'

// Source Request reducer
const LOAD_SOURCE_REQUEST = 'sourceRequest/LOAD_SOURCE_REQUEST'
const sourceReqInitialState = {
  host: '',
  protocol: ''
}
export const sourceReqCreateReducer = initialState =>
  (state = initialState, action = {}) => {
    switch (action.type) {
      case LOAD_SOURCE_REQUEST:
        return Object.assign({}, state, action.payload)
      default:
        return state
    }
  }

// createReducer
export default (initialState = {}) => combineReducers({
  intl: intlReducer,
  sourceRequest: sourceReqCreateReducer(sourceReqInitialState),
  apollo: apolloClient().reducer(),
  mobilizations: MobilizationReducer.reducer,
  ...initialState
})
