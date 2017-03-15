import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch, getState, { auth }) => {
  return dispatch(createAction(t.LOGOUT_SUCCESS))
}
