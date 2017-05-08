import PropTypes from 'prop-types'
import React from 'react'
import { Loading } from '~client/components/await'

const NotificationsSystem = require('exenv').canUseDOM
  ? require('reapop').default
  : () => <div />

if (require('exenv').canUseDOM) {
  require('~client/styles/main.scss')
  var theme = require('reapop-theme-wybo')
}

const PublicContainer = ({ children, loading }) => (
  <div>
    {children}
    <NotificationsSystem {...{ theme }} />
    {loading && <Loading />}
  </div>
)

PublicContainer.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default PublicContainer
