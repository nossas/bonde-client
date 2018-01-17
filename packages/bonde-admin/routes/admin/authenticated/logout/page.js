import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as Paths from '~client/paths'
import { Loading } from '~client/components/await'

class LogoutPage extends Component {
  componentDidMount () {
    const { logout, history } = this.props
    logout().then(() => history.push(Paths.login()))
  }

  render () {
    return <Loading />
  }
}

LogoutPage.propTypes = {
  logout: PropTypes.func.isRequired
}

export default LogoutPage
