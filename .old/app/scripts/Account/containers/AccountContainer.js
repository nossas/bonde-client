import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SidebarContainer } from '../../Dashboard/containers'


class AccountContainer extends Component {

  render() {
    const { children, ...sidebarProps } = this.props
    return <SidebarContainer {...sidebarProps}>{children}</SidebarContainer>
  }
}

const mapStateToProps = (state, ownProps) => ({
  mobilization: state.mobilization,
  auth: state.auth,
  community: state.community
})

export default connect(mapStateToProps)(AccountContainer)
