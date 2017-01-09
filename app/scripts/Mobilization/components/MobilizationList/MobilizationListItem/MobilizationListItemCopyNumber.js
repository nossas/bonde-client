import React, { PropTypes } from 'react'

const MobilizationListItemCopyNumber = ({ uses_number }) => (
  <div className='list-item-users px3 col col-2'>
    {uses_number || '-'}
  </div>
)

MobilizationListItemCopyNumber.propTypes = {
  uses_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MobilizationListItemCopyNumber
