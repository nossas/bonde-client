import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import { logout } from '../actions'
import { Loading } from '../../Dashboard/components'
import * as Paths from '../../Paths'


@reactMixin.decorate(Navigation)
class LogoutPage extends Component {

  componentDidMount() {
    const { logout } = this.props
    logout()
      .then(() => this.transitionTo(Paths.login()))
  }

  render() {
    return <Loading />
  }
}

LogoutPage.propTypes = {
  // Injected by react-redux
  logout: PropTypes.func.isRequired,
}

const mapActionsToProps = { logout }

export default connect(null, mapActionsToProps)(LogoutPage)
