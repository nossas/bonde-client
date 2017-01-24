import { createAction } from './create-action'
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../constants'

export const login = user => (dispatch, getState, { api, auth }) => {
  dispatch(createAction(LOGIN_REQUEST))
  return api.post('/auth/sign_in', user)
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
      auth.post('/login', { data: { user, credentials } })
      dispatch(createAction(LOGIN_SUCCESS, { user, credentials }))
    })
    .catch(error => {
      dispatch(createAction(LOGIN_ERROR, error))
    })
}
