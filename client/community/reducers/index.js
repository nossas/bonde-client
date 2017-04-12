import { combineReducers } from 'redux'

import communitiesReducer from './communities'
import dnsHostedReducer from './dns-hosted-zones'

export default combineReducers({
  list: communitiesReducer,
  dnsHostedZones: dnsHostedReducer
})
