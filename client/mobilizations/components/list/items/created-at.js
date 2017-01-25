import React, { PropTypes } from 'react'
import moment from 'moment'

const CreatedAt = ({ created_at }) => (
  <div className='item-created-at px3 col col-2'>
    {moment(created_at).format('DD/MM/YYYY')}
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
