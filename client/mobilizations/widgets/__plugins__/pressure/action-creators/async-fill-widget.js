// Parent module dependencies
import * as WidgetSelectors from '~mobilizations/widgets/selectors'
import { actions as WidgetsActions } from '~mobilizations/widgets'

// Current module dependencies
import * as t from '../action-types'
import { createAction } from './create-action'

//
// The name of this action needs to be refactored to make more sense.
// Besides to have to refact this action name, needs to refact
// API endpoint too.
//
const asyncFillWidget = ({ payload: fill, widget }) => (dispatch, getState, axios) => {
  const state = getState()

  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  const endpoint = `/widgets/${widget.id}/fill`
  const body = { fill }

  dispatch({ type: t.WIDGET_PRESSURE_FILL_REQUEST })
  return axios.post(endpoint, body)
    .then(response => {
      dispatch({ type: t.WIDGET_PRESSURE_FILL_SUCCESS })
      dispatch(WidgetsActions.setWidgetList(
        updateWidgetList(state, response.data)
      ))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_PRESSURE_FILL_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidgetList = (state, payload) => {
  const { widget_id: id, count } = payload

  return WidgetSelectors.getList(state).map(
    widget => widget.id === id
      ? { ...widget, count }
      : widget
  )
}

export default asyncFillWidget
