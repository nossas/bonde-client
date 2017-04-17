import React, { PropTypes } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

const DropdownMenu = ({ items }) => (
  <div className='dropdown--menu'>
    <i className='fa fa-ellipsis-h' />
    <div className='dropdown--content'>
      {items.map((item, index) => (
        <div key={`dropdown-item-${index}`} className='dropdown--item' onClick={item.onClick}>
          {item.icon && (<i className={item.icon} />)}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
)

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.text,
    onClick: PropTypes.func
  })).isRequired,
}

export default DropdownMenu
