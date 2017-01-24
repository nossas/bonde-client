import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as authReducer } from '../authenticate/redux'
const initialState = {
  host: '',
  protocol: ''
}

const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    form: formReducer,
    auth: authReducer,
    ...asyncReducers
  })
}
