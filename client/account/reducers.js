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
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case t.LOAD_SUCCESS:
      const auth = reactCookie.load('auth') || {}

      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        ...auth  // insert user and credentials
      }
    case t.LOGIN_SUCCESS:
      reactCookie.save('auth', action.payload)

      return {
        ...state,
        isLoading: false,
        ...action.payload  // insert user and credentials
      }
    case t.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        user: undefined,
        credentials: undefined
      }
    case t.LOGOUT_FAILURE:
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
