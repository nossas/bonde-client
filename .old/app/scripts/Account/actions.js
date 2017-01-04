import * as t from './actionTypes'
import superagent from 'superagent'

// redux-form action
export const register = user => (dispatch, getState, request) => {
  return request
    .post('/users', { user })
    .then(({ status, data }) => {
      if (status === 200 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 201) {
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export const edit = ({ id, ...user }) => (dispatch, getState, request) => {
  const headers = { ...getState().auth.credentials }
  return request
    .put(`/users/${id}`, { user }, { headers })
    .then(({ status, data }) => {
      if (status === 200) {
        // update reducers
        dispatch({ type: t.UPDATE, user: data })
        return Promise.resolve()
      }
      return Promise.reject({ _error: `Response code ${status}` })
    })
    .catch(error => Promise.reject(error))
}

export const login = values => (dispatch, getState, request) => {
  dispatch({ type: t.SIGNIN })
  return request
    .post('/auth/sign_in', values)
    .then(({ headers, data }) => {
      const { data: user } = data
      const credentials = {
        'Access-Token': headers['access-token'],
        'Token-Type': headers['token-type'],
        'Expiry': headers['expiry'],
        'Uid': headers['uid'],
        'Client': headers['client']
      }

      // Create a session into the server-side rendering server
      // Use axios to replace request api to request proxy server
      // TODO: Change axios to proxy argument (dispatch, getState, { request, proxy })
      superagent.post('/auth/login', { credentials, user })

      dispatch({ type: t.LOGIN, user, credentials })
    })
    .catch(({ message, response }) => {
      if (response) {
        const { data: { errors }, status } = response
        if (status === 401) return Promise.reject({ _error: errors.join('') })
      }
      return Promise.reject({ _error: `${message}` })
    })
}

export const logout = () => dispatch => {
  // TODO: Change axios to proxy argument (dispatch, getState, { request, proxy })
  return new Promise((resolve, reject) => {
    superagent.get('/auth/logout')
    dispatch({ type: t.LOGOUT })
    return resolve()
  })
}

export const load = () => dispatch => {
  // TODO: Change axios to proxy argument (dispatch, getState, { request, proxy })
  dispatch({ type: t.FETCH })
  return new Promise((resolve, reject) => {
    superagent
      .get('/auth/load')
      .end((err, res) => {
        dispatch({
          type: t.FETCH_SUCCESS,
          user: res.user,
          credentials: res.credentials
        })
        return resolve()
      })
  })
}
