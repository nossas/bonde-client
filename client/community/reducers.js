import reactCookie from 'react-cookie'
import * as t from './action-types'

const initialState = {
  isLoaded: false,
  data: [],
  currentId: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH:
      return {
        ...state,
        loading: true
      }
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        data: action.data
      }
    case t.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        isLoaded: false,
        error: action.error
      }
    case t.ADD:
      return {
        ...state,
        data: [...state.data, action.community]
      }
    case t.EDIT:
      return {
        ...state,
        data: state.data.map(
          c => c.id === action.community.id ? action.community : c
        )
      }
    case t.SELECT:
      if (state.currentId !== action.id) {
        const persistedState = { community: {...state, currentId: action.id } }
        reactCookie.save('state', persistedState)
      }
      return {
        ...state,
        currentId: action.id
      }
    case t.UNSET:
      return {
        ...state,
        currentId: null
      }
    default:
      return state
  }
}
