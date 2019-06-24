import * as actionTypes from './actionTypes'

export const register = (queryName) => dispatch => {
  dispatch({ type: actionTypes.REGISTER, payload: queryName })
}

export const done = ({ queryName, length }) => dispatch => {
  dispatch({ type: actionTypes.DONE, payload: { queryName, length } })
}

