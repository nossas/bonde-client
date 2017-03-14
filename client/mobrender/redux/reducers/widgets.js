import * as t from '../action-types'

export const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH_WIDGETS_REQUEST:
    case t.FILTER_WIDGETS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_WIDGETS_SUCCESS:
    case t.FILTER_WIDGETS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_WIDGETS_FAILURE:
    case t.FILTER_WIDGETS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.UPDATE_WIDGET_REQUEST:
      return {...state,
        saving: true
      }
    case t.UPDATE_WIDGET_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(
          w => w.id === action.payload.id ? action.payload : w
        )
      }
    case t.UPDATE_WIDGET_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.ADD_WIDGETS_SUCCESS:
      return {...state,
        data: [...state.data, ...action.payload]
      }
    default:
      return state
  }
}
