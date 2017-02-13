// Sibling module dependencies
import * as WidgetActions from '~mobilizations/widgets/action-creators'

// Current module dependencies
import { createAction } from './create-action'
import c from '../constants'

const asyncBlockCreate = ({ block, mobilization, next }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state

  const endpoint = `/mobilizations/${mobilization.id}/blocks`
  const body = { block }
  const config = { headers: credentials }

  dispatch({ type: c.REQUEST_ASYNC_BLOCK_CREATE })
  return axios.post(endpoint, body, config)
    .then(response => {
      dispatch(createAction(c.SUCCESS_ASYNC_BLOCK_CREATE, response.data))
      dispatch(WidgetActions.asyncWidgetFetch(mobilization.id))
      next()
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(c.FAILURE_ASYNC_BLOCK_CREATE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockCreate
