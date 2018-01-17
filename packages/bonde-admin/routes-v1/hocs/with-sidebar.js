import React from 'react'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import DNSControlSelectors from '~client/community/dns-control-selectors'
import * as DNSControlActions from '~client/community/action-creators/dns-control'
import SidebarModule from '~client/components/navigation/sidebar'
import { Loading } from '~client/components/await'

const mapStateToProps = (state, props) => ({
  community: CommunitySelectors.getCurrent(state),
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  loaded: MobSelectors(state, props).mobilizationsIsLoaded(),
  sidebarProps: SidebarModule.getSidebarProps(state, props),
  dnsControlSelectors: DNSControlSelectors(state)
})

const mapDispatchToProps = { ...MobActions, ...DNSControlActions }

const withSidebar = Component => connect(mapStateToProps, mapDispatchToProps)(
  class SidebarHOC extends React.Component {
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
      const { loading, sidebarProps } = this.props
      return (
        <div>
          {loading ? <Loading /> : (
            <SidebarModule.Sidebar {...sidebarProps}>
              <Component {...this.props} />
            </SidebarModule.Sidebar>
          )}
        </div>
      )
    }
  }
)

export default withSidebar
