import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from '~client/account/redux/selectors'

export default values => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  dispatch(createAction(t.ADD_MOBILIZATION_REQUEST))
  return api
    .post('/mobilizations', { mobilization: values }, { headers: credentials })
    .then(res => {
      dispatch(createAction(t.ADD_MOBILIZATION_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_MOBILIZATION_FAILURE, ex))
      return Promise.reject(ex)
    })
}
