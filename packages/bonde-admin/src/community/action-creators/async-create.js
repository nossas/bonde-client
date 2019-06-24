/* eslint-disable prefer-promise-reject-errors */
import * as t from 'community/action-types'

const asyncCreate = community => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/communities'
  const body = { community }
  const config = { headers: credentials }

  return api
    .post(endpoint, body, config)
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

export default asyncCreate
