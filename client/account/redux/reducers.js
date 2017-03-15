import reactCookie from 'react-cookie'
import * as t from './action-types'

const initialState = {
  isLoaded: false,
  isLoading: false,
  user: undefined,
  credentials: undefined,
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case t.LOAD_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false
      }
    case t.LOGIN_SUCCESS:
      const newState = {
        ...state,
        isLoading: false,
        ...action.payload  // insert user and credentials
      }
      reactCookie.save('auth', newState)

      return newState
    case t.LOGOUT_SUCCESS:
      reactCookie.remove('auth')
      reactCookie.remove('state')
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        user: undefined,
        credentials: undefined
      }
    case t.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return {...state}
  }
}
