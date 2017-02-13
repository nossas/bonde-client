import * as t from '../action-types'
import { createAction } from './create-action'

const asyncWidgetSelect = where => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/widgets'
  const config = { headers: credentials, params: where }

  dispatch({ type: t.REQUEST_ASYNC_WIDGET_SELECT })
  return api
    .get(endpoint, config)
    .then(response => {
      dispatch(createAction(t.SUCCESS_ASYNC_WIDGET_SELECT, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.FAILURE_ASYNC_WIDGET_SELECT, failure))
      Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetSelect
