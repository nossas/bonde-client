import PropTypes from 'prop-types'
import React from 'react'
import { Loading } from '~client/components/await'
import NotificationSystem from '~client/components/notification-system'

const PublicContainer = ({ children, loading }) => (
  <div>
    {children}
    <NotificationSystem />
    {loading && <Loading />}
  </div>
)

PublicContainer.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default PublicContainer
