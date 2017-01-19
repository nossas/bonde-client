import { combineReducers } from 'redux'

import match from './match/reducers'
import pressure from './pressure/reducers'
import form from './form/reducers'
import donation from './donation/reducers'
import content from './content/reducers'

export default combineReducers({
  match,
  pressure,
  form,
  donation,
  content
})
