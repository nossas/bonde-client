import * as t from './action-types'

export const initialState = {
  isLoaded: false,
  loading: false,
  data: [],
  currentId: undefined,
  menuActiveIndex: undefined,
  error: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.ADD:
      return {
        ...state,
        data: [action.payload, ...state.data],
        currentId: action.payload.id
      }
    case t.UPDATE:
      return {
        ...state,
        data: state.data.map(m => m.id === action.payload.id ? action.payload : m)
      }
    case t.FETCH:
      return {
        ...state,
        loading: true,
        data: [],
        currentId: undefined
      }
    case t.LOAD:
      return {
        ...state,
        isLoaded: true,
        loading: false,
        data: action.payload,
        currentId: undefined
      }
    case t.SELECT:
      return {
        ...state,
        currentId: action.payload
      }
    case t.UNSELECT:
      return {
        ...state,
        currentId: undefined
      }
    case t.TOGGLE_MENU:
      return {
        ...state,
        menuActiveIndex: action.payload === state.menuActiveIndex ? undefined : action.payload
      }

    case t.ASYNC_FILTER_REQUEST:
      return { ...state, loading: true }
    case t.ASYNC_FILTER_SUCCESS:
      return { ...state, loading: false, isLoaded: true, data: action.payload }
    case t.ASYNC_FILTER_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
