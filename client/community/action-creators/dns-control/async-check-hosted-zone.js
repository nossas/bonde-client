import * as t from '../../action-types'
import { createAction } from '../create-action'

/*CHECK_DNS_HOSTED_ZONE_FAILURE*/

// TODO: Call API method
export default dnsHostedZone => (dispatch, getState, { api }) => {

  dispatch(createAction(t.CHECK_DNS_HOSTED_ZONE_REQUEST))
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updated = { ...dnsHostedZone, ns_ok: true }
      dispatch(createAction(t.CHECK_DNS_HOSTED_ZONE_SUCCESS, updated))
      return resolve(updated)
    }, 500)
  })
}
