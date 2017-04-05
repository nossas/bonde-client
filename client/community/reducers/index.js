import { combineReducers } from 'redux'

import communitiesReducer from './communities'
import dnsHostedReducer from './dns-hosted'

export default combineReducers({
  list: communitiesReducer
})
