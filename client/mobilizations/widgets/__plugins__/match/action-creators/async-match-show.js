import * as t from '../action-types'
import { createAction } from './create-action'

const asyncMatchShow = params => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/widgets/${params.widget_id}/match/${params.match_id}`
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_SHOW_REQUEST })
  return axios.get(endpoint, config)
    .then(response => {
      dispatch(createAction(t.WIDGET_MATCH_SHOW_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_SHOW_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncMatchShow
