import PropTypes from 'prop-types';
import React from 'react';

const CopyNumber = ({ uses_number: usesNumber }) => (
  <div className='users px3 col col-2'>
    {usesNumber || '-'}
  </div>
)

CopyNumber.propTypes = {
  uses_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default CopyNumber

const Header = () => (
  <div className='copy-number-header px3 col col-2'>
    Núm. Cópias
  </div>
)
CopyNumber.Header = Header
