import { selectors as MobilizationSelectors } from '../../mobilizations'
import * as t from '../action-types'
import { createAction } from './create-action'

const asyncWidgetUpdate = widget => (dispatch, getState, axios) => {
  const state = getState()
  const mobilization = MobilizationSelectors.getCurrent(state)
  const { auth: { credentials } } = state

  const endpoint = `/mobilizations/${mobilization.id}/widgets/${widget.id}`
  const body = { widget }
  const config = { headers: credentials }

  dispatch({ type: t.REQUEST_ASYNC_WIDGET_UPDATE })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(t.SUCCESS_ASYNC_WIDGET_UPDATE, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.FAILURE_ASYNC_WIDGET_UPDATE, failure))
      Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetUpdate
