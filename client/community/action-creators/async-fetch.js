import * as t from '~client/community/action-types'

const asyncFetch = () => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/communities'
  const config = { headers: credentials }

  dispatch({ type: t.FETCH })
  return api
    .get(endpoint, config)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        dispatch({ type: t.FETCH_FAIL, error: data.errors })
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.FETCH_SUCCESS, data })
        return Promise.resolve()
      }
    })
}

export default asyncFetch
