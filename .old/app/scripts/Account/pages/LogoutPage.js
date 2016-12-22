import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as AccountActions from '../actions'
import { Loading } from '../../Dashboard/components'
import * as Paths from '../../Paths'


@reactMixin.decorate(Navigation)
class LogoutPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(AccountActions.logout()).then(() => this.transitionTo(Paths.login()))
  }

  render() {
    return (
      <Loading />
    )
  }
}

LogoutPage.propTypes = {
  // Injected by react-redux
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LogoutPage)
