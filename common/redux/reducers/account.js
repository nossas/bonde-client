import {
  LOAD_ACCOUNT_REQUEST,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_ACCOUNT_ERROR
} from '../constants'

const initialState = {
  account: {},
  loading: false,
  error: null
}

export default function account (state = initialState, action) {
  switch (action.type) {
    case LOAD_ACCOUNT_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case LOAD_ACCOUNT_SUCCESS:
      return { ...state,
        account: action.payload,
        loading: false}
    case LOAD_ACCOUNT_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}
