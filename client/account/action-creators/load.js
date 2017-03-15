import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch, getState) => {
  return dispatch(createAction(t.LOAD_SUCCESS))
}
