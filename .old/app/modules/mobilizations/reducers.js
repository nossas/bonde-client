import * as t from './action-types'


const initialState = {
  loading: false,
  isLoaded: false,
  data: [],
  relationshipId: undefined,
  currentId: undefined
}


export default (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_FETCH:
      return {
        ...state,
        loading: true,
        relationshipId: action.relationshipId
      }
    case t.REQUEST_FILTER:
      return {
        ...state,
        loading: true
      }
    case t.SUCCESS_FETCH:
    case t.SUCCESS_FILTER:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        data: action.data
      }
    case t.FAILURE_FETCH:
    case t.FAILURE_FILTER:
      return {
        ...state,
        loading: false,
        isLoaded: false,
        error: action.error
      }
    case t.SELECT:
      return {
        ...state,
        currentId: action.currentId
      }
    default:
      return state
  }
}
