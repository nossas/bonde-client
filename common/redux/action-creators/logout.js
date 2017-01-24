import { createAction } from './create-action'
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../constants'


export const logout = () => (dispatch, getState, { auth }) => {
  dispatch(createAction(LOGOUT_REQUEST))
  auth.post('/logout')
    .then(data => {
      dispatch(createAction(LOGOUT_SUCCESS, data))
    })
    .catch(error => {
      dispatch(createAction(LOGOUT_ERROR, error))
    })
}
