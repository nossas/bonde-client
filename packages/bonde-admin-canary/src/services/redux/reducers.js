import { combineReducers } from 'redux'
// Import used reducers
import { reducer as authReducer } from '../auth/redux'

// Reducer example
const home = (state = '', action) => {
  switch (action.type) {
    case 'home/CHANGE_NAME':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  // insert your reducers function
  home,
  auth: authReducer
})
