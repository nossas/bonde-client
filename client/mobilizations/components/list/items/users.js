import React, { PropTypes } from 'react'

const Users = ({ users_count: usersCount }) => (
  <div className='item-users px3 col col-2'>
    {usersCount || '-'}
  </div>
)

Users.propTypes = {
  users_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Users

const Header = () => (
  <div className='users-header px3 col col-2'>
    Usuários
  </div>
)
Users.Header = Header
