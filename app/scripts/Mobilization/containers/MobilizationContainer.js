import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SidebarContainer } from '../../Dashboard/containers'
import { Loading } from '../../Dashboard/components'

import { fetch } from '../MobilizationActions'

class MobilizationContainer extends Component {

  componentDidMount () {
    const { fetch, community: { currentId }, mobilization: { loaded } } = this.props
    if (!loaded && currentId) fetch(currentId)
  }

  componentWillReceiveProps (nextProps) {
    const { fetch, mobilization: { communityId }, community: { currentId } } = nextProps
    if (communityId !== currentId) {
      fetch(currentId)
    }
  }

  render () {
    const { children, ...props } = this.props
    const { mobilization: { loading } } = this.props

    return !loading ? (
      <SidebarContainer {...props}>
        {children}
      </SidebarContainer>
    ) : <Loading />
  }
}

const mapStateToProps = (state, ownProps) => ({
  mobilization: state.mobilization,
  auth: state.auth,
  community: state.community
})

const mapActionsToProps = { fetch }

export default connect(mapStateToProps, mapActionsToProps)(MobilizationContainer)
