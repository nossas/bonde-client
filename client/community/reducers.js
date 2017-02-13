import * as t from './actionTypes'


const initialState = {
  isLoaded: false,
  // @revert To empty array
  data: [{ id: 1 }],
  // @revert To undefined
  currentId: 1
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
        data: action.data,
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
