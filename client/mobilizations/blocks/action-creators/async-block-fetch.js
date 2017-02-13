// Current module dependencies
import { createAction } from './create-action'
import c from '../constants'

const asyncBlockFetch = mobilizationId => (dispatch, getState, { api }) => {
  const { auth: { credentials: headers } } = getState()
  dispatch({ type: c.REQUEST_ASYNC_BLOCK_FETCH })
  return api
    .get(`/mobilizations/${mobilizationId}/blocks`, { headers })
    .then(response => {
      dispatch(createAction(c.SUCCESS_ASYNC_BLOCK_FETCH, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(c.FAILURE_ASYNC_BLOCK_FETCH, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockFetch
