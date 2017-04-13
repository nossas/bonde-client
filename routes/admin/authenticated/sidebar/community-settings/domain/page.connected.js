import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import {
  asyncFetchHostedZones,
  asyncFetchDNSRecords,
  asyncDeleteHostedZone
} from '~client/community/action-creators/dns-control'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    const selectors = DNSControlSelectors(state)
    !selectors.dnsHostedZones().isLoaded() && promises.push(
      dispatch(asyncFetchHostedZones())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const selectors = DNSControlSelectors(state)

  const dnsHostedZoneIsLoading = (
    selectors.dnsHostedZones().isLoading()
    || selectors.dnsHostedZones().isSaving()
  )

  return {
    dnsHostedZoneIsLoading,
    dnsRecordsIsLoading: selectors.dnsRecords().isLoading(),
    dnsHostedZones: selectors.dnsHostedZones().getList()
  }
}

const mapActionsToProps = {
  fetchDNSRecords: asyncFetchDNSRecords,
  deleteHostedZone: asyncDeleteHostedZone
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionsToProps)(Page)
)
