import React, { PropTypes } from 'react'

const TabMenu = ({ title, children }) => {
  return (
    <div className='bg-white px3 clearfix'>
      <h2 className='mb3'>{title}</h2>
      <div><ul className='list-reset mb0'>{children}</ul></div>
    </div>
  )
}

TabMenu.propTypes = {
  children: PropTypes.array.isRequired
}

export default TabMenu
