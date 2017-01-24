// Parent module dependencies
import { actions as WidgetsActions } from '~mobilizations/widgets'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

// Current module dependencies
import { createAction } from './create-action'
import * as t from '../action-types'

const asyncMatchCreate = ({ match, props }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = WidgetSelectors.getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match`
  const body = { match }
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_CREATE_REQUEST })
  return axios.post(endpoint, body, config)
    .then(response => {
      dispatch({ type: t.WIDGET_MATCH_CREATE_SUCCESS })
      dispatch(WidgetsActions.setWidgetList(
        updateWidgetList(state, response.data)
      ))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidgetList = (state, match) => {
  return WidgetSelectors.getWidgets(state).map(widget => {
    if (widget.id === match.widget_id) {
      if (!widget.match_list.includes(match)) {
        widget.match_list.push(match)
      }
    }
    return widget
  })
}

export default asyncMatchCreate
