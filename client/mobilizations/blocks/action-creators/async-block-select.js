// Current module dependencies
import { createAction } from './create-action'
import c from '../constants'

const asyncBlockSelect = where => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/blocks'
  const config = { headers: credentials, params: where }

  dispatch({ type: c.REQUEST_ASYNC_BLOCK_SELECT })
  return axios.get(endpoint, config)
    .then(response => {
      dispatch(createAction(c.SUCCESS_ASYNC_BLOCK_SELECT, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(c.FAILURE_ASYNC_BLOCK_SELECT, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockSelect
