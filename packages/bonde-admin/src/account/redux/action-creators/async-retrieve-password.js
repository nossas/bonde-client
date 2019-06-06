/* eslint-disable prefer-promise-reject-errors */
import { addNotification as notify } from 'reapop'
import { accountPasswordRetrieveSuccess } from 'utils/notifications'
import * as t from '../action-types'
import { createAction } from './create-action'

export default user => (dispatch, getState, { api, intl }) => {
  const endpoint = '/retrieve'
  const body = { user }

  dispatch(createAction(t.ASYNC_RETRIEVE_PASSWORD_REQUEST))
  return api.post(endpoint, body)
    .then(res => {
      if (res.status === 200 && res.data.errors) {
        // Reject request on redux-form
        return Promise.reject({ ...res.data.errors })
      } else if (res.status === 200) {
        dispatch(createAction(t.ASYNC_RETRIEVE_PASSWORD_SUCCESS, res.data))
        dispatch(notify(accountPasswordRetrieveSuccess(intl)))
        return Promise.resolve()
      }
    })
    .catch(ex => {
      dispatch(createAction(t.ASYNC_RETRIEVE_PASSWORD_FAILURE))
      return Promise.reject(ex)
    })
}
