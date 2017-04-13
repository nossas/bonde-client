import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import { asyncFetchHostedZones, asyncFetchDNSRecords } from '~client/community/action-creators/dns-control'

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

  return {
    dnsHostedZoneIsLoading: selectors.dnsHostedZones().isLoading(),
    dnsRecordsIsLoading: selectors.dnsRecords().isLoading(),
    dnsHostedZones: selectors.dnsHostedZones().getList()
  }
}

const mapActionsToProps = {
  fetchDNSRecords: asyncFetchDNSRecords
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionsToProps)(Page)
)
