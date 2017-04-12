import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import { asyncFetchHostedZones } from '~client/community/action-creators/dns-control'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []

    !DNSControlSelectors(state).dnsHostedZones().isLoaded() && promises.push(
      dispatch(asyncFetchHostedZones())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  loading: DNSControlSelectors(state).dnsHostedZones().isLoading(),
  domain_list: DNSControlSelectors(state).dnsHostedZones().getList()
})

export default provideHooks(redial)(
  connect(mapStateToProps)(Page)
)
