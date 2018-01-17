import { createAction } from './create-action'
import * as t from '../action-types'

export default user => (dispatch, getState) => {
  return dispatch(createAction(t.LOAD_SUCCESS, { user }))
}
