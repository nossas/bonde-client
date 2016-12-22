import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  LOAD_FB_EVENT_REQUEST,
  LOAD_FB_EVENT_SUCCESS,
  LOAD_FB_EVENT_ERROR
} from '../constants'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function newEvent (state = initialState, action) {
  switch (action.type) {
    case LOAD_FB_EVENT_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case LOAD_FB_EVENT_SUCCESS:
      return { ...state,
        data: action.payload,
        loading: false}
    case LOAD_FB_EVENT_ERROR:
      return { ...state,
        error: action.payload}

    case CREATE_EVENT_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case CREATE_EVENT_SUCCESS:
      return { ...state,
        eventCreate: true,
        loading: false}
    case CREATE_EVENT_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}
