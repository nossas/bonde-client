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
    case t.FETCH_BLOCKS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_BLOCKS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_BLOCKS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.ADD_BLOCK_REQUEST:
    case t.UPDATE_BLOCK_REQUEST:
    case t.DESTROY_BLOCK_REQUEST:
      return {...state,
        saving: true
      }
    case t.ADD_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: [...state.data, action.payload]
      }
    case t.UPDATE_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(
          b => b.id === action.payload.id ? action.payload : b
        )
      }
    case t.DESTROY_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.filter(b => b.id !== action.payload.id)
      }
    case t.CHANGE_BLOCK_BACKGROUND:
      return {...state,
        data: state.data.map(
          b => b.id === action.payload.id ? action.payload : b
        )
      }
    case t.ADD_BLOCK_FAILURE:
    case t.UPDATE_BLOCK_FAILURE:
    case t.DESTROY_BLOCK_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    case t.MOVE_BLOCK_UP:
      return {...state,
        data: state.data.map((b, index) => {
          if (index + 1 < state.data.length && state.data[index + 1].id === action.payload.id) return action.payload
          else if (b.id === action.payload.id) return state.data[index - 1]
          else return b
        })
      }
    case t.MOVE_BLOCK_DOWN:
      return {...state,
        data: state.data.map((b, index) => {
          if (index > 0 && state.data[index - 1].id === action.payload.id) return action.payload
          else if (b.id === action.payload.id) return state.data[index + 1]
          else return b
        })
      }
    default:
      return state
  }
}
