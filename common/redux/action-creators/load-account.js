import { createAction } from './create-action'
import {
  LOAD_ACCOUNT_REQUEST,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_ACCOUNT_ERROR, ROOT_URL
} from '../constants'

export function loadAccount (id) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_ACCOUNT_REQUEST })
    return axios.get(`${ROOT_URL}/users`)
      .then(res => {
        dispatch(createAction(LOAD_ACCOUNT_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(LOAD_ACCOUNT_ERROR, error))
      })
  }
}
