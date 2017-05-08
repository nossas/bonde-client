import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import * as Paths from '~client/paths'
import { Loading } from '~client/components/await'

class LogoutPage extends Component {

  componentDidMount () {
    this.props.logout().then(() => browserHistory.push(Paths.login()))
  }

  render () {
    return <Loading />
  }
}

LogoutPage.propTypes = {
  logout: PropTypes.func.isRequired
}

export default LogoutPage
