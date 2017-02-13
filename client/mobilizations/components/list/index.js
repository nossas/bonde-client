import React, { PropTypes } from 'react'

const List = ({ children }) => (
  <div className='list gray20 content-box'>
    {children}
  </div>
)

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
}

export default List
