import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE,
  AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL
} from './../constants/ActionTypes'

export const initialState = {
  loaded: false
}

export default function auth(state = initialState, action = {}) {
  const { type, error } = action

  switch (type) {
    case AUTH_LOAD:
      return {...state,
        loading: true
      }
    case AUTH_LOAD_SUCCESS:
      return {...state,
        loading: false,
        loaded: true,
        user: action.result && action.result.user,
        credentials: action.result && action.result.credentials
      }
    case AUTH_LOAD_FAIL:
      return {...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case AUTH_LOGIN_REQUEST:
      return {...state,
        user: null,
        submitting: true,
        error: null
      }
    case AUTH_LOGIN_SUCCESS:
      return {...state,
        user: action.user,
        credentials: action.credentials,
        submitting: false,
        error: null
      }
    case AUTH_LOGIN_FAILURE:
      return {...state,
        user: null,
        submitting: false,
        error: error
      }
    case AUTH_LOGOUT_REQUEST:
      return {...state,
        submitting: true,
        error: null
      }
    case AUTH_LOGOUT_SUCCESS:
      return {...state,
        user: null,
        submitting: false,
        error: null
      }
    case AUTH_LOGOUT_FAILURE:
      return {...state,
        submitting: false,
        error: error
      }
    default:
      return state
  }
}

export function isLoaded(globalState = {}) {
  return !!(globalState.auth && globalState.auth.loaded)
}

export function load() {
  return {
    types: [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  }
}

export function login(name) {
  return {
    types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  }
}

export function logout() {
  return {
    types: [AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE],
    promise: (client) => client.get('/logout')
  }
}
