import * as t from './actionTypes'

const initialState = {
  loaded: false,
  user: undefined,
  credentials: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD:
      return {
        ...state,
        loading: true
      }
    case t.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result && action.result.user,
        credentials: action.result && action.result.credentials
      }
    case t.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        credentials: action.credentials
      }
    case t.LOGOUT_REQUEST:
      return {...state,
        submitting: true,
        error: null
      }
    case t.LOGOUT_SUCCESS:
      return {...state,
        user: null,
        submitting: false,
        error: null
      }
    case t.LOGOUT_FAILURE:
      return {...state,
        submitting: false,
        error: action.error
      }
    case t.UPDATE:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
