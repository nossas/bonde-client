import { combineReducers } from 'redux'

import templates from '../templates/reducers'
import list from './list'

export default combineReducers({
  list,
  templates
})
