// Current module dependencies
import { createAction } from './create-action'
import * as t from '../action-types'

export default where => (dispatch, getState, { api }) => {
  // const { auth: { credentials } } = getState()

  const endpoint = '/blocks'
  const config = { params: where }

  dispatch({ type: t.FILTER_BLOCKS_REQUEST })
  return api
    .get(endpoint, config)
    .then(response => {
      dispatch(createAction(t.FILTER_BLOCKS_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.FILTER_BLOCKS_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}
