import * as actionTypes from './actionTypes'

const initialState = {
  user: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: undefined
      }
    default:
      return state
  }
}
