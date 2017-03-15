import { createAction } from './create-action'
import * as t from '../action-types'

export default ({ email, password }) => (dispatch, getState, { api, auth }) => {
  dispatch(createAction(t.LOGIN_REQUEST))
  return api.post('/auth/sign_in', { email, password })
    .then(({ headers, ...res }) => {
      const { data: user } = res.data
      const credentials = {
        'Access-Token': headers['access-token'],
        'Token-Type': headers['token-type'],
        'Expiry': headers['expiry'],
        'Uid': headers['uid'],
        'Client': headers['client']
      }
      // Save user and credentials in session
      // auth.post('/login', { data: { user, credentials } })
      dispatch(createAction(t.LOGIN_SUCCESS, { user, credentials }))
      // next(null)
    })
    .catch(error => {
      dispatch(createAction(t.LOGIN_FAILURE, error))
    })
}
