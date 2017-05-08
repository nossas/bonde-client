import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { logout } from '../actions'
import { Loading } from '../../Dashboard/components'
import * as Paths from '../../Paths'

class LogoutPage extends Component {

  componentDidMount () {
    const { logout } = this.props
    logout().then(() => browserHistory.push(Paths.login()))
  }

  render () {
    return <Loading />
  }
}

LogoutPage.propTypes = {
  // Injected by react-redux
  logout: PropTypes.func.isRequired
}

const mapActionsToProps = { logout }

export default connect(null, mapActionsToProps)(LogoutPage)
