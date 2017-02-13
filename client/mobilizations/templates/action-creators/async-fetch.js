import * as t from '../action-types'

const AsyncFetch = () => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  dispatch({ type: t.REQUEST_TEMPLATE_FETCH })
  return api
    .get('/templates', { headers: credentials })
    .then(({ status, data }) => {
      dispatch({ type: t.SUCCESS_TEMPLATE_FETCH, templates: data })
      return Promise.resolve()
    })
    .catch(error => {
      dispatch({ type: t.FAILURE_TEMPLATE_FETCH, error })
      return Promise.reject({ _error: `Response ${error}` })
    })
}

export default AsyncFetch
