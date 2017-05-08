import PropTypes from 'prop-types';
import React from 'react';

const CreatedAt = ({ created_at }) => (
  <div className='created-at px3 col col-3'>
    {new Date(Date.parse(created_at)).toLocaleString()}
  </div>
)

CreatedAt.propTypes = {
  created_at: PropTypes.string.isRequired
}

export default CreatedAt

const Header = () => (
  <div className='created-at-header px3 col col-2'>
    Criada em
  </div>
)
CreatedAt.Header = Header
