import { combineReducers } from 'redux'

import dataExport from './data-export'
import list from './list'
import plugins from '../__plugins__/reducers'

export default combineReducers({
  dataExport,
  list,
  plugins
})
