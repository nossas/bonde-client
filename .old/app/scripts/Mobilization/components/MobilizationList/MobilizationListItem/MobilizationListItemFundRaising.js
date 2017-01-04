import React, { PropTypes } from 'react'

const MobilizationListItemFundRaising = ({ total_fund_raising }) => (
  <div className="list-item-fund-raising px3 col col-2">
    R$ {total_fund_raising || '-'}
  </div>
)

MobilizationListItemFundRaising.propTypes = {
  total_fund_raising: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MobilizationListItemFundRaising
