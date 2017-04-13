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
    case t.FETCH_DNS_RECORDS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_DNS_RECORDS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_DNS_RECORDS_FAILURE:
      return {...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
