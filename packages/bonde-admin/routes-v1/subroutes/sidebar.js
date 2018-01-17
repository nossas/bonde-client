import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Loading } from '~client/components/await'
import SidebarAPI from '~client/components/navigation/sidebar'

// Actions and Selectors
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import DNSControlSelectors from '~client/community/dns-control-selectors'
import * as DNSControlActions from '~client/community/action-creators/dns-control'

// SubRoutes
import CommunitySettings from '~routes/admin/authenticated/sidebar/community-settings/container'
import MobilizationsRoutes from '~root/routes-v1/subroutes/mobilizations'
import AccountPage from '~routes/admin/authenticated/sidebar/account-edit/page.connected'

class SubRoute extends React.Component {
  componentDidMount () {
    const promises = []
    const {
      community,
      loaded,
      loading,
      asyncFetchMobilizations,
      dnsControlSelectors: { dnsHostedZones },
      asyncFetchHostedZones
    } = this.props

    community && !loaded && !loading && promises.push(asyncFetchMobilizations(community.id))
    !dnsHostedZones().isLoaded() && promises.push(asyncFetchHostedZones())
    return Promise.all(promises)
  }

  render () {
    const { community, loaded, loading } = this.props
    const isLoading = community && !loaded && !loading
    return isLoading ? <Loading /> : (
      <SidebarAPI.Sidebar {...this.props.sidebarProps}>
        <Route path='/community' component={CommunitySettings} />
        <Route path='/mobilizations' component={MobilizationsRoutes} />
        <Route exact path='/account/edit' component={AccountPage} />
      </SidebarAPI.Sidebar>
    )
  }
}

const mapStateToProps = (state, props) => ({
  sidebarProps: SidebarAPI.getSidebarProps(state, props),
  community: CommunitySelectors.getCurrent(state),
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  loaded: MobSelectors(state, props).mobilizationsIsLoaded(),
  dnsControlSelectors: DNSControlSelectors(state)
})

const mapDispatchToProps = { ...MobActions, ...DNSControlActions }

export default connect(mapStateToProps, mapDispatchToProps)(SubRoute)
