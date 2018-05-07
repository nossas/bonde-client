import { combineReducers } from 'redux'

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
  home
})
