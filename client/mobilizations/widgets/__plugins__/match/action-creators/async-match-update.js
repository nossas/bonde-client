// Parent module dependencies
import * as WidgetSelectors from '~mobilizations/widgets/selectors'
import * as WidgetsActions from '~mobilizations/widgets/action-creators'

// Current module dependencies
import { createAction } from './create-action'
import * as t from '../action-types'

const asyncMatchUpdate = ({ match, props }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = WidgetSelectors.getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match/${match.id}`
  const body = { match }
  const config = { headers: credentials }

  dispatch({ type: t.WIDGET_MATCH_UPDATE_REQUEST })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch({ type: t.WIDGET_MATCH_UPDATE_SUCCESS })
      dispatch(WidgetsActions.setWidgetList(
        updateWidgetList(state, response.data)
      ))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_UPDATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidgetList = (state, match) => {
  return WidgetSelectors.getList(state).map(widget => {
    if (widget.id === match.widget_id) {
      const mapMatch = entity => entity.id === match.id ? match : entity
      widget.match_list = widget.match_list.map(mapMatch)
    }
    return widget
  })
}

export default asyncMatchUpdate
