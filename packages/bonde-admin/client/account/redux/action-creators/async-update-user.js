import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from '../selectors'

export default ({ id, ...user }) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  dispatch(createAction(t.UPDATE_USER_REQUEST))
  return api.put(`/users/${id}`, { user }, { headers })
    .then(res => {
      dispatch(createAction(t.UPDATE_USER_SUCCESS, {
        id: res.data.id,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        email: res.data.email,
        avatar: res.data.avatar_url
      }))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_USER_FAILURE, ex))
      return Promise.reject(ex)
    })
}
