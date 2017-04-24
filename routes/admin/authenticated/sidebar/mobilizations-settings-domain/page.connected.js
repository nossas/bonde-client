import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import DNSControlSelectors from '~client/community/dns-control-selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).hasCurrentMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization(),
  hostedZones: DNSControlSelectors(state)
    .dnsHostedZones()
    .getList()
})

export default provideHooks(redial)(
  connect(mapStateToProps)(Page)
)
