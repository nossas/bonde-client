import { createAction } from './create-action'
import {
  LOAD_ACCOUNT_REQUEST,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_ACCOUNT_ERROR
} from '../constants'

export const loadAccount = (id) => (dispatch, getState, { auth }) => {
  dispatch({ type: LOAD_ACCOUNT_REQUEST })
  return auth.get('/load')
    .then(data => {
      dispatch(createAction(LOAD_ACCOUNT_SUCCESS, data))
    })
    .catch(error => {
      dispatch(createAction(LOAD_ACCOUNT_ERROR, error))
    })
}
