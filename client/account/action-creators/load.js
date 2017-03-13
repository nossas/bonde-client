import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch, getState, { auth }) => {
  dispatch(createAction(t.LOAD_REQUEST))
  return auth.get('/load')
    .then(({ user, credentials }) => {
      dispatch(createAction(t.LOAD_SUCCESS, { user, credentials }))
    })
    .catch(error => {
      dispatch(createAction(t.LOAD_FAILURE, error))
    })
}

