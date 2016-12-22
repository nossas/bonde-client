import React, { PropTypes } from 'react'

const MobilizationListItemUsers = ({ users_count }) => (
  <div className="list-item-users px3 col col-2">
    {users_count || '-'}
  </div>
)

MobilizationListItemUsers.propTypes = {
  users_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MobilizationListItemUsers
