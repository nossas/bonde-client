// Current module dependencies
import { createAction } from './create-action'
import c from '../constants'

const asyncBlockDestroy = ({ block, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks/${block.id}`
  const config = { headers: credentials }

  dispatch({ type: c.REQUEST_ASYNC_BLOCK_DESTROY })
  return axios.delete(endpoint, config)
    .then(response => {
      dispatch(createAction(c.SUCCESS_ASYNC_BLOCK_DESTROY, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(c.FAILURE_ASYNC_BLOCK_DESTROY, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockDestroy
