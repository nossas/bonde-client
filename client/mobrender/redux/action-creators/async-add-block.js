import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from '~client/account/selectors'

export default ({ mobilization_id, ...block }) => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  dispatch(createAction(t.ADD_BLOCK_REQUEST))
  return api
    .post(`/mobilizations/${mobilization_id}/blocks`, { block }, { headers: credentials })
    .then(res => {
      const { widgets_attributes, ...data } = res.data
      dispatch(createAction(t.ADD_BLOCK_SUCCESS, data))
      dispatch(createAction(t.ADD_WIDGETS_SUCCESS, widgets_attributes))
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
