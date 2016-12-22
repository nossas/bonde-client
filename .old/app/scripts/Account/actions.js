import axios from 'axios'
import * as t from './actionTypes'

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
  const headers = {
    ...getState().auth.credentials,
  }
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

const loginSuccess = (user, credentials) => ({ type: t.LOGIN_SUCCESS, user, credentials })
const loginRequest = values => axios.post(`${process.env.API_URL}/auth/sign_in`, values)
export const login = values => dispatch => loginRequest(values)
  .then(response => {
    const { headers, data: { data: user } } = response
    const credentials = {
      'Access-Token': headers['access-token'],
      'Token-Type': headers['token-type'],
      Expiry: headers['expiry'],
      Uid: headers['uid'],
      Client: headers['client']
    }

    // Create a session into the server-side rendering server
    axios.post(`/auth/login`, { credentials, user })

    dispatch(loginSuccess(user, credentials))
  })
  .catch(error => {
    if (error.response) {
      const { response: { data: { errors }, status } } = error
      if (status === 401) return Promise.reject({ _error: errors.join('') })
    }
    return Promise.reject({ _error: `Response ${error}` })
  })


// Use clientMiddleware pattern
export const logout = () => ({
  types: [t.LOGOUT_REQUEST, t.LOGOUT_SUCCESS, t.LOGOUT_FAILURE],
  promise: client => client.get('/logout')
})

// Selector
export const isLoaded = globalState => {
  return globalState.auth && globalState.auth.loaded
}

export const load = () => ({
  types: [t.LOAD, t.LOAD_SUCCESS, t.LOAD_FAIL],
  promise: (client) => client.get('/loadAuth')
})
