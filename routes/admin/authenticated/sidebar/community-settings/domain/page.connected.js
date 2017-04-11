import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as DNSControlSelectors from '~client/community/dns-control-selectors'
import { asyncFetchHostedZones } from '~client/community/action-creators/dns-control'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []

    !DNSControlSelectors.isLoaded(state) && promises.push(
      dispatch(asyncFetchHostedZones())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  loading: DNSControlSelectors.isLoading(state),
  domain_list: DNSControlSelectors.getDomains(state)
})

export default provideHooks(redial)(
  connect(mapStateToProps)(Page)
)
