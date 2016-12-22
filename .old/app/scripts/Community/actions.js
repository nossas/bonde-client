import * as t from './actionTypes'
import superagent from 'superagent'

export const select = id => dispatch => {
  return dispatch({ type: t.SELECT, id })
}

export const create = community => (dispatch, getState, request) => {

  const { auth: { credentials } } = getState()

  return request
    .post('/communities', { community }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.ADD, community: data })
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export const edit = ({ id, ...community }) => (dispatch, getState, request) => {
  const { auth: { credentials } } = getState()

  return request
    .put(`/communities/${id}`, { community }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.EDIT, community: data })
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export const fetch = credentials => dispatch => {
  dispatch({ type: t.FETCH })
  superagent
    .get(`${process.env.API_URL}/communities`)
    .set(credentials)
    .end((err, res) => {
      if (err || !res.ok) dispatch({ type: t.FETCH_FAIL, error: err || res.body })
      else dispatch({ type: t.FETCH_SUCCESS, data: res.body })
    })
}

export const unset = dispatch => dispatch({ type: t.UNSET })
