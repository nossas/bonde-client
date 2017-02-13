import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch, getState, { auth }) => {
  dispatch(createAction(t.LOGOUT_REQUEST))
  return auth.post('/logout')
    .then(() => {
      dispatch(createAction(t.LOGOUT_SUCCESS))
    })
    .catch(error => {
      dispatch(createAction(t.LOGOUT_FAILURE, error))
    })
}
