import * as t from './actionTypes'

const initialState = {
  loaded: false,
  loading: false,
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

    case t.FETCH:
      return {
        ...state,
        loading: true
      }
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result && action.result.user,
        credentials: action.result && action.result.credentials
      }
    case t.LOGIN:
      return {
        ...state,
        user: action.user,
        credentials: action.credentials
      }
    case t.LOGOUT:
      return {
        ...state,
        loaded: false,
        user: undefined,
        credentials: undefined
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
