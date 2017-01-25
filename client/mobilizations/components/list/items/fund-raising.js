import React, { PropTypes } from 'react'

const FundRaising = ({ total_fund_raising: totalFundRaising }) => (
  <div className='item-fund-raising px3 col col-2'>
    R$ {totalFundRaising || '-'}
  </div>
)

FundRaising.propTypes = {
  total_fund_raising: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default FundRaising

const Header = () => (
  <div className='fund-raising-header px3 col col-2'>
    Arrecadações
  </div>
)
FundRaising.Header = Header
