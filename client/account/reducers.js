import * as t from './action-types'

const initialState = {
  isLoaded: true,
  isLoading: false,
  user: { email: 'foo@bar.com', first_name: 'Foo Bar' },
  credentials: {
    'access-token': 'QFrr9zA1-wnGcvE624WUjg',
    'client': '7Wb0PWycB1y8ac34I28PWg',
    'expiry': ':1490213663',
    'token-type': 'Bearer',
    'uid': 'foo@bar.com'
  },
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_REQUEST:
    case t.LOGIN_REQUEST:
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case t.LOAD_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        ...action.payload  // insert user and credentials
      }
    case t.LOGIN_SUCCESS:
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
    case t.LOAD_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        error: action.payload
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
