/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import { createAction } from './create-action'

export default user => (dispatch, getState, { api }) => {
  dispatch(createAction(t.ADD_USER_REQUEST))
  return api.post('/users', { user })
    .then(res => {
      if (res.status === 200 && res.data.errors) {
        // Reject request on redux-form
        return Promise.reject({ ...res.data.errors })
      } else if (res.status === 201) {
        dispatch(createAction(t.ADD_USER_SUCCESS, res.data))
        return Promise.resolve()
      }
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_USER_FAILURE))
      return Promise.reject(ex)
    })
}
