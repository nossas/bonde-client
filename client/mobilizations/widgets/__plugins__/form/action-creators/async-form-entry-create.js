// Parent module dependencies
import AnalyticsEvents from '~mobilizations/widgets/utils/analytics-events'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'
import { actions as WidgetActions } from '~mobilizations/widgets'

// Current module dependencies
import * as t from '../action-types'
import { createAction } from './create-action'

const asyncFormEntryCreate = ({ mobilization, formEntry }) => (dispatch, getState, axios) => {
  const state = getState()

  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const body = { form_entry: formEntry }

  dispatch({ type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST })
  return axios.post(endpoint, body)
    .then(response => {
      dispatch({ type: t.WIDGET_FORM_ENTRY_CREATE_SUCCESS })
      dispatch(WidgetActions.setWidgetList(
        updateWidgetList(state, response.data)
      ))

      AnalyticsEvents.formSavedData()

      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidgetList = (state, payload) => {
  return WidgetSelectors.getList(state).map(widget =>
    widget.id === payload.widget_id
      ? { ...widget, form_entries_count: widget.form_entries_count + 1 }
      : widget
  )
}

export default asyncFormEntryCreate
