import React, { PropTypes } from 'react'
import moment from 'moment'

const MobilizationListItemCreatedAt = ({ created_at }) => (
  <div className='list-item-created-at px3 col col-2'>
    {moment(created_at).format('DD/MM/YYYY')}
  </div>
)

MobilizationListItemCreatedAt.propTypes = {
  created_at: PropTypes.string.isRequired
}

export default MobilizationListItemCreatedAt
