import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'

export default () => (dispatch, getState, { api }) => {
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_REQUEST))
  return api.get(`/communities/${community.id}/dns_hosted_zones`)
    .then(res => {
      dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_FAILURE, ex))
      return Promise.reject(ex)
    })
}
