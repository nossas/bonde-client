import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from '~client/account/selectors'
import Selectors from '../selectors'

export default widget => (dispatch, getState, { api }) => {
  dispatch(createAction(t.UPDATE_WIDGET_REQUEST))
  const credentials = AuthSelectors(getState()).getCredentials()
  const mobilization = Selectors(getState()).getMobilization()

  return api
    .put(`/mobilizations/${mobilization.id}/widgets/${widget.id}`, { widget }, { headers: credentials })
    .then(res => {
      dispatch(createAction(t.UPDATE_WIDGET_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_WIDGET_FAILURE, ex))
      return Promise.reject(ex)
    })
}
