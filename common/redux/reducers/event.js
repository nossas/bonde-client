import {
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_ERROR
} from '../constants'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

export default function event (state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENT_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case LOAD_EVENT_SUCCESS:
      return {...state,
        data: action.payload,
        loading: false}
    case LOAD_EVENT_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}
