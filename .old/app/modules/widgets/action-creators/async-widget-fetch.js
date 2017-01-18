import * as t from '../action-types'
import { createAction } from './create-action'

const asyncWidgetFetch = mobilizationId => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilizationId}/widgets`
  const config = { headers: credentials }

  dispatch({ type: t.REQUEST_ASYNC_WIDGET_FETCH })
  return axios.get(endpoint, config)
    .then(response => {
      dispatch(createAction(t.SUCCESS_ASYNC_WIDGET_FETCH, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.FAILURE_ASYNC_WIDGET_FETCH, failure))
      Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetFetch
