/* eslint-disable prefer-promise-reject-errors */
import { addNotification as notify } from 'reapop'
import { createAction } from 'utils/redux'
import * as t from 'community/action-types'
import * as AwaitActions from 'components/await/redux/action-creators'
import { genericRequestError, communityInviteSuccess } from 'utils/notifications'

const COMMUNITY_USER_ROLES = {
  owner: 1,
  admin: 2,
  participant: 3
}

export default ({ communityId, email }) => (dispatch, getState, { api, intl }) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/communities/${communityId}/invitation`
  const body = { invitation: { email, role: COMMUNITY_USER_ROLES.admin } }
  const options = { headers: credentials }

  dispatch(AwaitActions.setLoading(true))
  dispatch(createAction(t.ASYNC_INVITE_REQUEST))

  return api
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      dispatch(AwaitActions.setLoading(false))

      if (status === 400 && data.errors) {
        dispatch(notify(genericRequestError(intl)))
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch(notify(communityInviteSuccess(intl, email)))
        dispatch(createAction(t.ASYNC_INVITE_SUCCESS, data))
        return Promise.resolve()
      }
    })
    .catch(error => {
      dispatch(notify(genericRequestError(intl)))
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_INVITE_FAILURE, error))
      return Promise.reject(error)
    })
}
