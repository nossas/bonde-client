import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DashboardSidebar, Loading } from '../components'
import { decorate } from 'react-mixin'
import { Navigation } from 'react-router'

import { paths } from '../../Community'


@decorate(Navigation)
class SidebarContainer extends Component {

  componentDidMount() {
    const { community: { currentId } } = this.props
    if (!currentId) {
      this.transitionTo(paths.list())
    }
  }

  render() {
    const { children, ...props } = this.props

    return props.mobilization.loading ? <Loading /> : (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <DashboardSidebar {...props} />
        {children && React.cloneElement(children)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mobilization: state.mobilization,
  auth: state.auth,
  community: state.community
})

export default connect(mapStateToProps)(SidebarContainer)
