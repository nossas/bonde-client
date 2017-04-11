import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
// Dependency module
import AuthSelectors from '~client/account/redux/selectors'

export default ({ id, ...dnsHostedZone }) => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.EDIT_DNS_HOSTED_ZONE_REQUEST))
  return api
    .put(`/communities/${community.id}/dns_hosted_zones/${id}`,
          { dns_hosted_zone: dnsHostedZone },
          { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.EDIT_DNS_HOSTED_ZONE_SUCCESS, resp.data))
      return Promise.resolve(resp.data)
    })
    .catch(ex => {
      dispatch(createAction(t.EDIT_DNS_HOSTED_ZONE_FAILURE, ex))
      return Promise.reject(ex)
    })
}
