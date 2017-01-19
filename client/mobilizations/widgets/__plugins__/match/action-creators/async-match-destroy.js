// Parent module dependencies
import * as WidgetSelectors from '../../../../../modules/widgets/selectors'
import * as WidgetsActions from '../../../../../modules/widgets/action-creators'

// Current module dependencies
import { createAction } from './create-action'
import * as t from '../../../../../modules/widgets/__plugins__/match/action-types'


const asyncMatchDestroy = ({ props, where }) => (dispatch, getState, axios) => {
  const state = getState()
  const { auth: { credentials } } = state
  const widget = WidgetSelectors.getWidget(state, props)

  const endpoint = `/widgets/${widget.id}/match/delete_where`
  const config = { headers: credentials, params: where }

  dispatch({ type: t.WIDGET_MATCH_DESTROY_REQUEST })
  return axios.delete(endpoint, config)
    .then(response => {
      dispatch({ type: t.WIDGET_MATCH_DESTROY_SUCCESS })
      dispatch(WidgetsActions.setWidgetList(
        updateWidgetList(state, response.data)
      ))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_MATCH_DESTROY_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidgetList = (state, match) => {
  return WidgetSelectors.getList(state).map(widget => {
    if (widget.id === parseInt(match.widget_id)) {
      widget.match_list = widget.match_list.filter(match => {
        return !match.deleted_matches.includes(match.id)
      })
    }
    return widget
  })
}

export default asyncMatchDestroy
