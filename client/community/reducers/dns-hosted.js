import * as t from '../action-types'

const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH_DNS_HOSTED_ZONES_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_DNS_HOSTED_ZONES_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_DNS_HOSTED_ZONES_FAILURE:
      return {...state,
        fetching: false,
        error: action.payload
      }
    case t.ADD_DNS_HOSTED_ZONE_REQUEST:
      return {...state,
        saving: true
      }
    case t.ADD_DNS_HOSTED_ZONE_SUCCESS:
      return {...state,
        saving: false,
        data: [action.payload, ...state.data]
      }
    case t.ADD_DNS_HOSTED_ZONE_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    default:
      return state
  }
}
